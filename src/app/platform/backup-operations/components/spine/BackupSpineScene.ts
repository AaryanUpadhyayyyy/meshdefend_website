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

  // Groups and Meshes
  private vendorTracksGroup!: THREE.Group;
  private centralSpineLine!: THREE.Line;
  private milestoneMarkersGroup!: THREE.Group;
  private morningSequenceGroup!: THREE.Group;
  private quietJobsMesh!: THREE.InstancedMesh;
  private exceptionThreadsGroup!: THREE.Group;
  private telemetryBeadsMesh!: THREE.InstancedMesh;
  private clock: THREE.Clock = new THREE.Clock();

  // Progress and state
  public progress: number = 0;
  public targetProgress: number = 0;
  public activeMorningStep: number = 0;
  public pointerNdc: THREE.Vector2 = new THREE.Vector2(0, 0);
  private currentPointer: THREE.Vector2 = new THREE.Vector2(0, 0);
  public theme: BackupSpineThemeColors;

  // Screen Projected Points for DOM Labels
  public trackedPoints: Map<string, THREE.Vector3> = new Map();
  public screenPoints: Map<string, { x: number; y: number; visible: boolean }> = new Map();

  private isRunning: boolean = false;
  private animFrameId: number = 0;

  // 4 Enterprise Engines
  public static readonly VENDORS = [
    { id: "commvault", name: "Commvault", yOffset: 1.8, zOffset: -1.2 },
    { id: "veeam", name: "Veeam", yOffset: 0.6, zOffset: -0.4 },
    { id: "dpdm", name: "Dell PowerProtect Data Manager", yOffset: -0.6, zOffset: 0.4 },
    { id: "networker", name: "Dell NetWorker", yOffset: -1.8, zOffset: 1.2 },
  ];

  // 6 Governed Spine Milestones
  public static readonly MILESTONES = [
    { id: "health", label: "Health", x: -2.0 },
    { id: "exceptions", label: "Exceptions", x: -1.1 },
    { id: "triage", label: "Triage", x: -0.2 },
    { id: "remediation", label: "Remediation", x: 0.7 },
    { id: "reporting", label: "Reporting", x: 1.6 },
    { id: "readiness", label: "Recovery Readiness", x: 2.6 },
  ];

  // 3 Morning Operations Stages
  public static readonly MORNING_STAGES = [
    { id: "stage1", time: "07:45", title: "What changed overnight", x: -2.2, y: 0.7 },
    { id: "stage2", time: "07:52", title: "What needs attention", x: 0.0, y: 0.0 },
    { id: "stage3", time: "08:00", title: "What needs action", x: 2.2, y: -0.7 },
  ];

  constructor(canvas: HTMLCanvasElement, theme: BackupSpineThemeColors) {
    this.canvas = canvas;
    this.theme = theme;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(theme.bg);
    this.scene.fog = new THREE.Fog(theme.bg, 6.0, 20.0);

    const aspect = canvas.clientWidth / canvas.clientHeight || 1.4;
    this.camera = new THREE.PerspectiveCamera(28, aspect, 0.1, 40);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    this.renderer.setPixelRatio(Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.75));

    // Construct 3D elements
    this.buildVendorTracksAndSpine();
    this.buildMilestones();
    this.buildMorningSequenceArcs();
    this.buildQuietBackgroundJobs();
    this.buildExceptionThreads();
    this.buildTelemetryBeads();

    this.updateCamera(0);
    this.updateData(0);
    this.render();
  }

  // ─── Screen Bounds Calculation ─────────────────────────────────────
  public getPlotBounds() {
    const W = this.canvas.clientWidth || 800;
    const H = this.canvas.clientHeight || 520;
    const left = 24;
    const right = W - 32;
    const top = 48;
    const bottom = H - 48;
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

  // ─── 1. 4 Feeder Curves Converging into Central Spine ───────────────
  private buildVendorTracksAndSpine() {
    this.vendorTracksGroup = new THREE.Group();

    const inkColor = new THREE.Color(this.theme.ink);
    const borderColor = new THREE.Color(this.theme.border);

    // Build 4 curved tracks from x = -5.0 to x = -2.5 (where they meet the central spine)
    BackupSpineScene.VENDORS.forEach((vendor, idx) => {
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-4.8, vendor.yOffset, vendor.zOffset),
        new THREE.Vector3(-3.8, vendor.yOffset * 0.9, vendor.zOffset * 0.5),
        new THREE.Vector3(-3.0, 0, 0),
        new THREE.Vector3(-2.4, 0, 0)
      );

      const points = curve.getPoints(40);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: idx === 1 ? this.theme.orange : this.theme.border,
        linewidth: 1.5,
        transparent: true,
        opacity: idx === 1 ? 0.9 : 0.45,
      });

      const line = new THREE.Line(geometry, material);
      line.name = `vendor_track_${vendor.id}`;
      this.vendorTracksGroup.add(line);

      // Tracked point for DOM label at feeder origin
      this.trackedPoints.set(`vendor_${idx}`, new THREE.Vector3(-4.8, vendor.yOffset, vendor.zOffset));
    });

    this.scene.add(this.vendorTracksGroup);

    // Central Operational Spine: x = -2.4 to x = 3.6
    const spinePoints = [
      new THREE.Vector3(-2.4, 0, 0),
      new THREE.Vector3(3.6, 0, 0),
    ];
    const spineGeo = new THREE.BufferGeometry().setFromPoints(spinePoints);
    const spineMat = new THREE.LineBasicMaterial({
      color: inkColor,
      linewidth: 2,
      transparent: true,
      opacity: 0.85,
    });
    this.centralSpineLine = new THREE.Line(spineGeo, spineMat);
    this.scene.add(this.centralSpineLine);
  }

  // ─── 2. 6 Governed Spine Milestones ─────────────────────────────────
  private buildMilestones() {
    this.milestoneMarkersGroup = new THREE.Group();

    BackupSpineScene.MILESTONES.forEach((m, idx) => {
      // Small vertical tick across spine
      const tickGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(m.x, 0.16, 0),
        new THREE.Vector3(m.x, -0.16, 0),
      ]);
      const tickMat = new THREE.LineBasicMaterial({
        color: this.theme.ink,
        transparent: true,
        opacity: 0.7,
      });
      const tickLine = new THREE.Line(tickGeo, tickMat);
      this.milestoneMarkersGroup.add(tickLine);

      // Small sphere node at tick
      const sphereGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: idx === 1 ? this.theme.orange : this.theme.ink,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(m.x, 0, 0);
      this.milestoneMarkersGroup.add(sphere);

      this.trackedPoints.set(`milestone_${idx}`, new THREE.Vector3(m.x, 0, 0));
    });

    this.scene.add(this.milestoneMarkersGroup);
  }

  // ─── 3. Morning Sequence Arcs (Beat 2) ───────────────────────────────
  private buildMorningSequenceArcs() {
    this.morningSequenceGroup = new THREE.Group();
    this.morningSequenceGroup.visible = false;

    // Arcs connecting Stage 1 (07:45) -> Stage 2 (07:52) -> Stage 3 (08:00)
    const arc1 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-2.2, 0.7, 0),
      new THREE.Vector3(-1.1, 1.2, 0.3),
      new THREE.Vector3(0.0, 0.0, 0)
    );
    const arc1Geo = new THREE.BufferGeometry().setFromPoints(arc1.getPoints(30));
    const arc1Mat = new THREE.LineBasicMaterial({
      color: this.theme.border,
      transparent: true,
      opacity: 0.6,
    });
    this.morningSequenceGroup.add(new THREE.Line(arc1Geo, arc1Mat));

    const arc2 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0.0, 0.0, 0),
      new THREE.Vector3(1.1, -1.1, 0.3),
      new THREE.Vector3(2.2, -0.7, 0)
    );
    const arc2Geo = new THREE.BufferGeometry().setFromPoints(arc2.getPoints(30));
    const arc2Mat = new THREE.LineBasicMaterial({
      color: this.theme.orange,
      transparent: true,
      opacity: 0.85,
    });
    this.morningSequenceGroup.add(new THREE.Line(arc2Geo, arc2Mat));

    // Nodes for the 3 morning stages
    BackupSpineScene.MORNING_STAGES.forEach((stage, idx) => {
      const geo = new THREE.SphereGeometry(0.08, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: idx === 1 || idx === 2 ? this.theme.orange : this.theme.ink,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(stage.x, stage.y, 0);
      this.morningSequenceGroup.add(mesh);

      this.trackedPoints.set(`morning_${idx}`, new THREE.Vector3(stage.x, stage.y, 0));
    });

    this.scene.add(this.morningSequenceGroup);
  }

  // ─── 4. Quiet Background Jobs Field (Beat 3) ─────────────────────────
  private buildQuietBackgroundJobs() {
    const count = 480;
    const geometry = new THREE.BoxGeometry(0.12, 0.015, 0.015);
    const material = new THREE.MeshBasicMaterial({
      color: this.theme.ink,
      transparent: true,
      opacity: 0.08,
    });

    this.quietJobsMesh = new THREE.InstancedMesh(geometry, material, count);
    const matrix = new THREE.Matrix4();

    // Spread across 3D volume behind the spine
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 8.0;
      const y = (Math.random() - 0.5) * 3.6;
      const z = -0.5 - Math.random() * 3.5;

      matrix.setPosition(x, y, z);
      this.quietJobsMesh.setMatrixAt(i, matrix);
    }
    this.quietJobsMesh.instanceMatrix.needsUpdate = true;
    this.quietJobsMesh.visible = false;
    this.scene.add(this.quietJobsMesh);
  }

  // ─── 5. Foreground Exception Threads (Beat 3) ─────────────────────────
  private buildExceptionThreads() {
    this.exceptionThreadsGroup = new THREE.Group();
    this.exceptionThreadsGroup.visible = false;

    // Exception 1: Snapshot lock contention on payments-db
    const curve1 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-2.8, 0.8, 0.2),
      new THREE.Vector3(-1.0, 1.1, 0.4),
      new THREE.Vector3(0.8, 0.6, 0.4),
      new THREE.Vector3(2.6, 0.7, 0.3)
    );
    const geo1 = new THREE.BufferGeometry().setFromPoints(curve1.getPoints(50));
    const mat1 = new THREE.LineBasicMaterial({
      color: this.theme.orange,
      linewidth: 2,
    });
    const line1 = new THREE.Line(geo1, mat1);
    this.exceptionThreadsGroup.add(line1);

    // Pulse node on Exception 1
    const p1Geo = new THREE.SphereGeometry(0.09, 16, 16);
    const p1Mat = new THREE.MeshBasicMaterial({ color: this.theme.orange });
    const p1 = new THREE.Mesh(p1Geo, p1Mat);
    p1.position.copy(curve1.getPoint(0.5));
    this.exceptionThreadsGroup.add(p1);

    this.trackedPoints.set("exception_0", new THREE.Vector3(0.0, 0.9, 0.4));

    // Exception 2: Unprotected production asset drift
    const curve2 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-2.8, -0.6, 0.1),
      new THREE.Vector3(-1.2, -0.9, 0.3),
      new THREE.Vector3(0.6, -0.5, 0.3),
      new THREE.Vector3(2.4, -0.6, 0.2)
    );
    const geo2 = new THREE.BufferGeometry().setFromPoints(curve2.getPoints(50));
    const mat2 = new THREE.LineBasicMaterial({
      color: this.theme.ink,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.8,
    });
    const line2 = new THREE.Line(geo2, mat2);
    this.exceptionThreadsGroup.add(line2);

    this.trackedPoints.set("exception_1", new THREE.Vector3(0.0, -0.7, 0.3));

    this.scene.add(this.exceptionThreadsGroup);
  }

  // ─── 6. Telemetry Beads Running Along Tracks ─────────────────────────
  private buildTelemetryBeads() {
    const beadCount = 36;
    const geo = new THREE.SphereGeometry(0.04, 12, 12);
    const mat = new THREE.MeshBasicMaterial({ color: this.theme.ink });

    this.telemetryBeadsMesh = new THREE.InstancedMesh(geo, mat, beadCount);
    const dummy = new THREE.Matrix4();

    for (let i = 0; i < beadCount; i++) {
      dummy.setPosition(-10, 0, 0);
      this.telemetryBeadsMesh.setMatrixAt(i, dummy);
    }
    this.telemetryBeadsMesh.instanceMatrix.needsUpdate = true;
    this.scene.add(this.telemetryBeadsMesh);
  }

  // ─── Camera & Viewport Management ────────────────────────────────────
  public updateCamera(progress: number) {
    const p = Math.max(0, Math.min(1, progress));

    // Beat 1 (0.0 .. 0.30): Oblique angle showing 3D depth convergence
    // Beat 2 (0.30 .. 0.64): Frontal-oblique dolly in on morning sequence
    // Beat 3 (0.64 .. 1.00): Slow pull-back revealing calm field + foreground exceptions
    const pointerX = this.currentPointer.x * 0.35;
    const pointerY = this.currentPointer.y * 0.25;

    if (p <= 0.30) {
      const t = p / 0.30;
      this.camera.position.set(
        -0.4 + pointerX,
        0.3 + pointerY,
        7.8 - t * 0.4
      );
      this.camera.lookAt(-0.4, 0, 0);
    } else if (p <= 0.64) {
      const t = (p - 0.30) / 0.34;
      this.camera.position.set(
        -0.4 + t * 0.5 + pointerX,
        0.3 - t * 0.15 + pointerY,
        7.4 - t * 0.6
      );
      this.camera.lookAt(0, 0, 0);
    } else {
      const t = (p - 0.64) / 0.36;
      this.camera.position.set(
        0.1 + pointerX,
        0.15 + pointerY,
        6.8 + t * 0.8
      );
      this.camera.lookAt(0, 0, 0);
    }
  }

  // ─── Data & State Interpolation ──────────────────────────────────────
  public updateData(progress: number) {
    const p = Math.max(0, Math.min(1, progress));

    // Visibility toggling according to beat
    const isBeat1 = p < 0.30;
    const isBeat2 = p >= 0.30 && p < 0.64;
    const isBeat3 = p >= 0.64;

    this.vendorTracksGroup.visible = isBeat1 || p < 0.35;
    this.centralSpineLine.visible = isBeat1 || isBeat2;
    this.milestoneMarkersGroup.visible = isBeat1;
    this.morningSequenceGroup.visible = isBeat2;
    this.quietJobsMesh.visible = isBeat3;
    this.exceptionThreadsGroup.visible = isBeat3;

    // In Beat 3, fade quiet hairlines to 8%
    if (this.quietJobsMesh.visible) {
      const mat = this.quietJobsMesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.08;
    }
  }

  // ─── Screen Point Projection for DOM Labels ──────────────────────────
  private updateScreenPoints() {
    const W = this.canvas.clientWidth || 800;
    const H = this.canvas.clientHeight || 520;

    this.trackedPoints.forEach((worldPos, key) => {
      const projected = worldPos.clone().project(this.camera);

      // Check if behind camera
      const visible = projected.z < 1.0;
      const x = Math.round(((projected.x + 1) * W) / 2);
      const y = Math.round(((-projected.y + 1) * H) / 2);

      this.screenPoints.set(key, { x, y, visible });
    });
  }

  // ─── Animation Frame Render ──────────────────────────────────────────
  public render() {
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth progress interpolation
    this.progress += (this.targetProgress - this.progress) * 0.08;

    // Smooth pointer parallax
    this.currentPointer.x += (this.pointerNdc.x - this.currentPointer.x) * 0.05;
    this.currentPointer.y += (this.pointerNdc.y - this.currentPointer.y) * 0.05;

    this.updateCamera(this.progress);
    this.updateData(this.progress);

    // Animate telemetry beads flowing along tracks
    if (this.telemetryBeadsMesh && this.vendorTracksGroup.visible) {
      const dummy = new THREE.Matrix4();
      const count = 36;
      for (let i = 0; i < count; i++) {
        const vIdx = i % 4;
        const vendor = BackupSpineScene.VENDORS[vIdx];
        const t = (elapsedTime * 0.35 + i * 0.08) % 1.0;

        // Position from feeder x = -4.8 to central spine end x = 3.2
        let bx = -4.8 + t * 8.0;
        let by = 0;
        let bz = 0;

        if (bx < -2.4) {
          const ratio = (bx - -4.8) / 2.4;
          by = vendor.yOffset * (1 - ratio);
          bz = vendor.zOffset * (1 - ratio);
        }

        dummy.setPosition(bx, by, bz);
        this.telemetryBeadsMesh.setMatrixAt(i, dummy);
      }
      this.telemetryBeadsMesh.instanceMatrix.needsUpdate = true;
    }

    this.updateScreenPoints();
    this.renderer.render(this.scene, this.camera);
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.clock.start();

    const loop = () => {
      if (!this.isRunning) return;
      this.render();
      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  public stop() {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  public resize(width: number, height: number) {
    if (!width || !height) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.render();
  }

  public updateTheme(theme: BackupSpineThemeColors) {
    this.theme = theme;
    this.scene.background = new THREE.Color(theme.bg);
    if (this.scene.fog) {
      this.scene.fog.color = new THREE.Color(theme.bg);
    }
    this.render();
  }

  public destroy() {
    this.stop();
    this.renderer.dispose();
  }
}
