import * as THREE from "three";

export interface BackupSpineThemeColors {
  bg: string;
  ink: string;
  orange: string;
  border: string;
  muted: string;
}

export class BackupSpineScene {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  private canvas: HTMLCanvasElement;

  // 4 Continuous morphing strands
  private lineMeshes: THREE.Line[] = [];
  // Central operational spine reference line
  private spineRefLine!: THREE.Line;
  // 6 Governed Milestone node meshes on the spine
  private milestoneMeshes: THREE.Mesh[] = [];
  // Telemetry pulses along feeder strands
  private telemetryPacketsMesh!: THREE.InstancedMesh;
  // 600 Quiet background job hairlines for Beat 3
  private quietJobsMesh!: THREE.InstancedMesh;
  // Ambient subtle dust particles
  private ambientDustMesh!: THREE.InstancedMesh;

  private clock: THREE.Clock = new THREE.Clock();

  // Progress and state
  public progress: number = 0;
  public targetProgress: number = 0;
  public activeMorningStep: number = 0;
  public hoveredMilestone: number = -1;
  public pointerNdc: THREE.Vector2 = new THREE.Vector2(0, 0);
  private currentPointer: THREE.Vector2 = new THREE.Vector2(0, 0);
  public theme: BackupSpineThemeColors;

  // Screen Projected Points for DOM Labels
  public trackedPoints: Map<string, THREE.Vector3> = new Map();
  public screenPoints: Map<string, { x: number; y: number; visible: boolean }> = new Map();

  private isRunning: boolean = false;
  private animFrameId: number = 0;

  // 4 Enterprise Backup Engines
  public static readonly VENDORS = [
    { id: "commvault", name: "Commvault", lane: 0 },
    { id: "veeam", name: "Veeam", lane: 1 },
    { id: "dpdm", name: "Dell PowerProtect Data Manager", lane: 2 },
    { id: "networker", name: "Dell NetWorker", lane: 3 },
  ];

  // 6 Governed Spine Milestones
  public static readonly MILESTONES = [
    { id: "health", label: "01 Health", t: 0.40 },
    { id: "exceptions", label: "02 Exceptions", t: 0.50 },
    { id: "triage", label: "03 Triage", t: 0.60 },
    { id: "remediation", label: "04 Remediation", t: 0.70 },
    { id: "reporting", label: "05 Reporting", t: 0.80 },
    { id: "readiness", label: "06 Recovery readiness", t: 0.90 },
  ];

  // 3 Morning Operations Stages
  public static readonly MORNING_STAGES = [
    {
      id: "stage1",
      time: "07:45",
      title: "What changed overnight",
      desc: "ServiceNow change modified volume mapping on payments-db",
      t: 0.22,
      tier: 0.24,
    },
    {
      id: "stage2",
      time: "07:52",
      title: "What needs attention",
      desc: "Veeam backup window extended · DataDomain replication lag rising",
      t: 0.54,
      tier: 0.50,
    },
    {
      id: "stage3",
      time: "08:00",
      title: "What needs action",
      desc: "1 guided remediation staged for operator approval",
      t: 0.84,
      tier: 0.76,
    },
  ];

  constructor(canvas: HTMLCanvasElement, theme: BackupSpineThemeColors) {
    this.canvas = canvas;
    this.theme = theme;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(theme.bg);
    this.scene.fog = new THREE.Fog(theme.bg, 8.0, 30.0);

    const aspect = canvas.clientWidth / canvas.clientHeight || 1.4;
    this.camera = new THREE.PerspectiveCamera(28, aspect, 0.1, 50);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    this.renderer.setPixelRatio(Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.75));

    // Build 3D objects
    this.buildStrands();
    this.buildMilestones();
    this.buildTelemetryPackets();
    this.buildQuietBackgroundJobs();
    this.buildAmbientDust();

    this.updateCamera(0);
    this.updateData(0, 0);
    this.render();
  }

  // ─── SAFE PLOT BOUNDS IN SCREEN PIXELS ──────────────────────────────
  // Left margin 140px ensures vendor labels (Commvault, Veeam, DPDM, NetWorker)
  // fit in the 0..130px left gutter with zero collision or clipping!
  public getPlotBounds() {
    const W = this.canvas.clientWidth || 800;
    const H = this.canvas.clientHeight || 520;
    const left = 140;
    const right = W - 40;
    const top = 56;
    const bottom = H - 64;
    return {
      left,
      right,
      top,
      bottom,
      width: Math.max(20, right - left),
      height: Math.max(20, bottom - top),
      canvasWidth: W,
      canvasHeight: H,
    };
  }

  // Exact screen-to-world conversion at plane z=z
  public screenToWorld(screenX: number, screenY: number, z: number = 0): THREE.Vector3 {
    const W = this.canvas.clientWidth || 800;
    const H = this.canvas.clientHeight || 520;
    const ndcX = (screenX / W) * 2 - 1;
    const ndcY = -(screenY / H) * 2 + 1;

    const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
    vec.unproject(this.camera);
    vec.sub(this.camera.position).normalize();
    const distance = (z - this.camera.position.z) / vec.z;
    return new THREE.Vector3().copy(this.camera.position).add(vec.multiplyScalar(distance));
  }

  // ─── 1. BUILD 4 CONTINUOUS MORPHING STRANDS ─────────────────────────
  private buildStrands() {
    const sampleCount = 300;

    for (let s = 0; s < 4; s++) {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(sampleCount * 3);
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

      const isPrimary = s === 1; // Veeam
      const mat = new THREE.LineBasicMaterial({
        color: isPrimary ? new THREE.Color(this.theme.orange) : new THREE.Color(this.theme.ink),
        transparent: true,
        opacity: isPrimary ? 0.95 : 0.45,
        linewidth: 1.5,
      });

      const line = new THREE.Line(geo, mat);
      line.name = `strand_${s}`;
      this.lineMeshes.push(line);
      this.scene.add(line);
    }

    // Spine hairline guide
    const spineGeo = new THREE.BufferGeometry();
    spineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(2 * 3), 3));
    const spineMat = new THREE.LineDashedMaterial({
      color: new THREE.Color(this.theme.border),
      dashSize: 0.1,
      gapSize: 0.06,
      transparent: true,
      opacity: 0.35,
    });
    this.spineRefLine = new THREE.Line(spineGeo, spineMat);
    this.scene.add(this.spineRefLine);
  }

  // ─── 2. BUILD MILESTONE MARKERS (6 NODES) ──────────────────────────
  private buildMilestones() {
    BackupSpineScene.MILESTONES.forEach((m, idx) => {
      const geo = new THREE.SphereGeometry(0.045, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(this.theme.border),
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.name = `milestone_${idx}`;
      this.milestoneMeshes.push(mesh);
      this.scene.add(mesh);
    });
  }

  // ─── 3. BUILD TELEMETRY PULSES ─────────────────────────────────────
  private buildTelemetryPackets() {
    const count = 6;
    const geo = new THREE.SphereGeometry(0.032, 12, 12);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(this.theme.orange),
      transparent: true,
      opacity: 0.85,
    });
    this.telemetryPacketsMesh = new THREE.InstancedMesh(geo, mat, count);
    this.telemetryPacketsMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(0, 0, 0);
      dummy.updateMatrix();
      this.telemetryPacketsMesh.setMatrixAt(i, dummy.matrix);
    }
    this.telemetryPacketsMesh.instanceMatrix.needsUpdate = true;
    this.scene.add(this.telemetryPacketsMesh);
  }

  // ─── 4. BUILD 600 QUIET BACKGROUND JOBS (BEAT 3) ───────────────────
  private buildQuietBackgroundJobs() {
    const count = 600;
    // 1-unit horizontal line segment centered at origin
    const geo = new THREE.BufferGeometry();
    const pts = [new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(0.5, 0, 0)];
    geo.setFromPoints(pts);

    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color(this.theme.ink),
      transparent: true,
      opacity: 0.08,
    });

    this.quietJobsMesh = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.006, 0.006, 1.0, 4),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(this.theme.ink),
        transparent: true,
        opacity: 0.0,
      }),
      count
    );
    this.quietJobsMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      // Deterministic spread across canvas width and height in 3D
      const u1 = (Math.sin(i * 127.1 + 0.3) * 43758.5453) % 1;
      const u2 = (Math.sin(i * 311.7 + 0.7) * 23421.6312) % 1;
      const u3 = (Math.sin(i * 74.3 + 0.9) * 31415.9265) % 1;

      const x = (Math.abs(u1) - 0.5) * 6.5;
      const y = (Math.abs(u2) - 0.5) * 3.8;
      const z = -0.5 - Math.abs(u3) * 1.8;

      dummy.position.set(x, y, z);
      dummy.rotation.z = Math.PI / 2;
      dummy.scale.set(1, 0.2 + Math.abs(u1) * 0.5, 1);
      dummy.updateMatrix();
      this.quietJobsMesh.setMatrixAt(i, dummy.matrix);
    }
    this.quietJobsMesh.instanceMatrix.needsUpdate = true;
    this.scene.add(this.quietJobsMesh);
  }

  // ─── 5. BUILD AMBIENT DUST ─────────────────────────────────────────
  private buildAmbientDust() {
    const count = 70;
    const geo = new THREE.SphereGeometry(0.012, 6, 6);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(this.theme.muted),
      transparent: true,
      opacity: 0.15,
    });
    this.ambientDustMesh = new THREE.InstancedMesh(geo, mat, count);
    this.ambientDustMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const u1 = (Math.sin(i * 43.1 + 1.1) * 43758.5453) % 1;
      const u2 = (Math.sin(i * 89.7 + 2.2) * 23421.6312) % 1;
      const u3 = (Math.sin(i * 17.3 + 3.3) * 31415.9265) % 1;

      dummy.position.set(
        (Math.abs(u1) - 0.5) * 7.5,
        (Math.abs(u2) - 0.5) * 4.5,
        (Math.abs(u3) - 0.5) * 3.0
      );
      dummy.updateMatrix();
      this.ambientDustMesh.setMatrixAt(i, dummy.matrix);
    }
    this.ambientDustMesh.instanceMatrix.needsUpdate = true;
    this.scene.add(this.ambientDustMesh);
  }

  // ─── 6. EVALUATE STRAND SCREEN POSITION (CONTINUOUS 3-BEAT MORPH) ──
  // Returns screen (x, y) and 3D depth z at normalized time t (0..1)
  private evaluateStrandPoint(
    t: number,
    s: number,
    kBeat2: number,
    kBeat3: number
  ): { screenX: number; screenY: number; z: number } {
    const bounds = this.getPlotBounds();
    const screenX = bounds.left + t * bounds.width;

    // ─── BEAT 1 BASELINE: 4 FEEDERS BRAIDING INTO CENTRAL SPINE ─────
    // Lane heights at left edge (t = 0)
    const laneY1 = bounds.top + bounds.height * (0.16 + s * 0.22);
    const laneZ1 = (1.5 - s) * 0.45;

    // Convergence point at t = 0.32
    const spineY1 = bounds.top + bounds.height * 0.50;
    const spineZ1 = 0.0;

    let y1: number;
    let z1: number;

    if (t < 0.32) {
      const u = t / 0.32;
      const ease = u * u * (3 - 2 * u); // Smooth S-curve
      y1 = THREE.MathUtils.lerp(laneY1, spineY1, ease);
      z1 = THREE.MathUtils.lerp(laneZ1, spineZ1, ease);
    } else {
      y1 = spineY1;
      z1 = spineZ1;
    }

    // ─── BEAT 2 TARGET: 3-TIER MORNING OPERATIONS SEQUENCE ──────────
    // Unfolds into 3 sequenced stages across time:
    // 07:45 (t = 0.22, tier = 0.24) -> 07:52 (t = 0.54, tier = 0.50) -> 08:00 (t = 0.84, tier = 0.76)
    const tier0Y = bounds.top + bounds.height * 0.24;
    const tier1Y = bounds.top + bounds.height * 0.50;
    const tier2Y = bounds.top + bounds.height * 0.76;

    let y2 = spineY1;
    let z2 = 0.0;

    if (s === 1) {
      // Primary Veeam strand traces the complete morning workflow
      if (t < 0.22) {
        const u = Math.max(0, t / 0.22);
        y2 = THREE.MathUtils.lerp(tier0Y - 14, tier0Y, u);
      } else if (t < 0.54) {
        const u = (t - 0.22) / (0.54 - 0.22);
        const ease = u * u * (3 - 2 * u);
        y2 = THREE.MathUtils.lerp(tier0Y, tier1Y, ease);
      } else if (t < 0.84) {
        const u = (t - 0.54) / (0.84 - 0.54);
        const ease = u * u * (3 - 2 * u);
        y2 = THREE.MathUtils.lerp(tier1Y, tier2Y, ease);
      } else {
        const u = Math.min(1, (t - 0.84) / 0.16);
        y2 = THREE.MathUtils.lerp(tier2Y, tier2Y + 8, u);
      }
    } else if (s === 0) {
      // Commvault traces the overnight ServiceNow change into Stage 1
      const u = Math.min(1, t / 0.35);
      y2 = THREE.MathUtils.lerp(tier0Y - 24, tier0Y, u * u);
    } else if (s === 2) {
      // DPDM traces replication lag into Stage 2
      const u = (t - 0.3) / 0.4;
      y2 = THREE.MathUtils.lerp(tier1Y, tier1Y + 16, Math.sin(Math.max(0, Math.min(1, u)) * Math.PI));
    } else {
      // NetWorker stays flat along bottom
      y2 = tier2Y + 18;
    }

    // ─── BEAT 3 TARGET: EXCEPTION-DRIVEN FOCUS ───────────────────────
    // Exception 1: Strand 1 (Veeam) -> Snapshot lock contention · payments-db
    // Exception 2: Strand 2 (DPDM) -> Unprotected workload drift
    let y3 = spineY1;
    let z3 = 0.0;

    if (s === 1) {
      // Sharp distinct anomaly arc peaking at t = 0.65
      const bump = Math.exp(-Math.pow((t - 0.65) / 0.16, 2)) * (bounds.height * 0.36);
      y3 = spineY1 - bump;
      z3 = 0.15;
    } else if (s === 2) {
      // Drift anomaly arc dipping at t = 0.45
      const dip = Math.exp(-Math.pow((t - 0.45) / 0.14, 2)) * (bounds.height * 0.28);
      y3 = spineY1 + dip;
      z3 = 0.08;
    } else if (s === 0) {
      y3 = spineY1 - 10;
      z3 = -0.15;
    } else {
      y3 = spineY1 + 10;
      z3 = -0.15;
    }

    // Continuous smooth interpolation across the beats
    const y1to2 = THREE.MathUtils.lerp(y1, y2, kBeat2);
    const z1to2 = THREE.MathUtils.lerp(z1, z2, kBeat2);

    const finalY = THREE.MathUtils.lerp(y1to2, y3, kBeat3);
    const finalZ = THREE.MathUtils.lerp(z1to2, z3, kBeat3);

    return { screenX, screenY: finalY, z: finalZ };
  }

  // ─── 7. UPDATE CAMERA ──────────────────────────────────────────────
  private updateCamera(p: number) {
    // Parallax
    this.currentPointer.lerp(this.pointerNdc, 0.06);

    const baseZ = 7.2;
    const baseY = 0.0;

    // Slight camera dolly across beats matching Observability Loom
    const cameraY = baseY + (p - 0.5) * 0.18 + this.currentPointer.y * 0.12;
    const cameraX = this.currentPointer.x * 0.16;
    const cameraZ = baseZ - (p > 0.3 && p < 0.65 ? 0.35 : 0.0);

    this.camera.position.set(cameraX, cameraY, cameraZ);
    this.camera.lookAt(cameraX * 0.5, 0, 0);
  }

  // ─── 8. UPDATE DATA PER FRAME ──────────────────────────────────────
  public updateData(p: number, elapsedTime: number) {
    const bounds = this.getPlotBounds();

    const kBeat2 = THREE.MathUtils.smoothstep(p, 0.22, 0.40);
    const kBeat3 = THREE.MathUtils.smoothstep(p, 0.58, 0.76);

    const sampleCount = 300;

    // 1. Update 4 Strand Lines
    for (let s = 0; s < 4; s++) {
      const lineMesh = this.lineMeshes[s];
      const posAttr = lineMesh.geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < sampleCount; i++) {
        const t = i / (sampleCount - 1);
        const pt = this.evaluateStrandPoint(t, s, kBeat2, kBeat3);
        const worldPt = this.screenToWorld(pt.screenX, pt.screenY, pt.z);
        posAttr.setXYZ(i, worldPt.x, worldPt.y, worldPt.z);

        // Track left feeder port at t = 0
        if (i === 0) {
          this.trackedPoints.set(`vendor_${s}`, worldPt.clone());
        }
      }
      posAttr.needsUpdate = true;

      // Adjust strand styling and opacity per beat
      const mat = lineMesh.material as THREE.LineBasicMaterial;
      if (kBeat3 > 0.01) {
        // Beat 3: Only Exception 1 (s=1 orange) and Exception 2 (s=2 ink) remain crisp
        if (s === 1) {
          mat.color.set(this.theme.orange);
          mat.opacity = 1.0;
        } else if (s === 2) {
          mat.color.set(this.theme.ink);
          mat.opacity = 0.90;
        } else {
          mat.color.set(this.theme.muted);
          mat.opacity = THREE.MathUtils.lerp(0.45, 0.08, kBeat3);
        }
      } else if (kBeat2 > 0.01) {
        // Beat 2: Sequence active
        if (s === 1) {
          mat.color.set(this.theme.orange);
          mat.opacity = 1.0;
        } else {
          mat.color.set(this.theme.ink);
          mat.opacity = THREE.MathUtils.lerp(0.45, 0.65, kBeat2);
        }
      } else {
        // Beat 1: 4 feeder strands
        if (s === 1) {
          mat.color.set(this.theme.orange);
          mat.opacity = 0.95;
        } else {
          mat.color.set(this.theme.ink);
          mat.opacity = 0.55;
        }
      }
    }

    // 2. Update Central Spine Reference Hairline
    if (this.spineRefLine) {
      const spinePosAttr = this.spineRefLine.geometry.attributes.position as THREE.BufferAttribute;
      const spineY = bounds.top + bounds.height * 0.50;
      const ptA = this.screenToWorld(bounds.left + 0.32 * bounds.width, spineY, 0.0);
      const ptB = this.screenToWorld(bounds.right, spineY, 0.0);
      spinePosAttr.setXYZ(0, ptA.x, ptA.y, ptA.z);
      spinePosAttr.setXYZ(1, ptB.x, ptB.y, ptB.z);
      spinePosAttr.needsUpdate = true;
      this.spineRefLine.computeLineDistances();
      (this.spineRefLine.material as THREE.LineDashedMaterial).opacity =
        (1.0 - kBeat2) * 0.35;
    }

    // 3. Update Milestones (Beat 1)
    BackupSpineScene.MILESTONES.forEach((m, idx) => {
      const pt = this.evaluateStrandPoint(m.t, 1, 0, 0);
      const worldPt = this.screenToWorld(pt.screenX, pt.screenY, pt.z);
      this.trackedPoints.set(`milestone_${idx}`, worldPt.clone());

      const mesh = this.milestoneMeshes[idx];
      if (mesh) {
        mesh.position.copy(worldPt);

        const isHovered = this.hoveredMilestone === idx;
        const scale = isHovered ? 1.6 : 1.0;
        mesh.scale.set(scale, scale, scale);

        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.color.set(isHovered ? this.theme.orange : idx === 1 ? this.theme.orange : this.theme.ink);
        mat.opacity = (1.0 - kBeat2) * (isHovered ? 1.0 : 0.75);
        mesh.visible = kBeat2 < 0.95;
      }
    });

    // 4. Update Morning Stages (Beat 2)
    BackupSpineScene.MORNING_STAGES.forEach((stage, idx) => {
      const pt = this.evaluateStrandPoint(stage.t, 1, 1.0, 0);
      const worldPt = this.screenToWorld(pt.screenX, pt.screenY, pt.z);
      this.trackedPoints.set(`morning_${idx}`, worldPt.clone());
    });

    // 5. Update Exception Points (Beat 3)
    const ex1Pt = this.evaluateStrandPoint(0.65, 1, 0, 1.0);
    this.trackedPoints.set("exception_0", this.screenToWorld(ex1Pt.screenX, ex1Pt.screenY, ex1Pt.z));

    const ex2Pt = this.evaluateStrandPoint(0.45, 2, 0, 1.0);
    this.trackedPoints.set("exception_1", this.screenToWorld(ex2Pt.screenX, ex2Pt.screenY, ex2Pt.z));

    // 6. Update Telemetry Packets
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 6; i++) {
      const strandIdx = i % 4;
      const speed = 0.28 + (i % 3) * 0.05;
      const progressT = ((elapsedTime * speed + i * 0.17) % 1.0);

      // In Beat 1 & 2, pulses travel into the spine
      const pt = this.evaluateStrandPoint(progressT, strandIdx, kBeat2, kBeat3);
      const worldPt = this.screenToWorld(pt.screenX, pt.screenY, pt.z);
      dummy.position.copy(worldPt);
      dummy.scale.setScalar(1.0 - kBeat3 * 0.8);
      dummy.updateMatrix();
      this.telemetryPacketsMesh.setMatrixAt(i, dummy.matrix);
    }
    this.telemetryPacketsMesh.instanceMatrix.needsUpdate = true;

    // 7. Update Quiet Jobs Mesh Opacity (Beat 3)
    const quietMat = this.quietJobsMesh.material as THREE.MeshBasicMaterial;
    quietMat.opacity = kBeat3 * 0.08;
    this.quietJobsMesh.visible = kBeat3 > 0.01;

    // 8. Update 3D-to-2D Screen Projections for DOM overlay
    const W = this.canvas.clientWidth || 800;
    const H = this.canvas.clientHeight || 520;
    const tempVec = new THREE.Vector3();

    this.trackedPoints.forEach((worldPos, key) => {
      tempVec.copy(worldPos).project(this.camera);
      const screenX = ((tempVec.x + 1) / 2) * W;
      const screenY = ((-tempVec.y + 1) / 2) * H;
      const visible = tempVec.z < 1.0 && screenX >= -20 && screenX <= W + 40 && screenY >= -20 && screenY <= H + 40;
      this.screenPoints.set(key, { x: screenX, y: screenY, visible });
    });
  }

  public resize(width: number, height: number) {
    if (width <= 0 || height <= 0) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.render();
  }

  public updateTheme(theme: BackupSpineThemeColors) {
    this.theme = theme;
    this.scene.background = new THREE.Color(theme.bg);
    if (this.scene.fog) {
      this.scene.fog.color.set(theme.bg);
    }
    this.render();
  }

  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.clock.start();

    const loop = () => {
      if (!this.isRunning) return;
      this.animFrameId = requestAnimationFrame(loop);

      const delta = this.clock.getDelta();
      const elapsedTime = this.clock.getElapsedTime();

      // Smooth progress lerp
      this.progress = THREE.MathUtils.damp(this.progress, this.targetProgress, 6.0, delta);

      this.updateCamera(this.progress);
      this.updateData(this.progress, elapsedTime);
      this.render();
    };

    loop();
  }

  public destroy() {
    this.isRunning = false;
    cancelAnimationFrame(this.animFrameId);
    this.renderer.dispose();
  }
}
