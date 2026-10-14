import * as THREE from "three";

export interface LoomThemeColors {
  bg: string;
  ink: string;
  orange: string;
  border: string;
  muted: string;
}

export class LoomScene {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  private canvas: HTMLCanvasElement;

  // Meshes & Groups
  private lineMeshes: THREE.Line[] = [];
  private ghostLine1!: THREE.Line; // "two nights ago" (peaks at 68%)
  private ghostLine2!: THREE.Line; // "last night" (peaks at 80%)
  private lanePlanesGroup!: THREE.Group;
  private sharedAxisGroup!: THREE.Group;
  private thresholdLine!: THREE.Line;
  private beadsMesh!: THREE.InstancedMesh;
  private faintHairlinesMesh!: THREE.InstancedMesh;
  private ambientParticlesMesh!: THREE.InstancedMesh;
  private particleInitialPositions: Float32Array = new Float32Array(0);
  private packetPulseMesh!: THREE.InstancedMesh;
  private hairlinesBasePositions: Float32Array = new Float32Array(0);
  private clock: THREE.Clock = new THREE.Clock();
  private currentPointer: THREE.Vector2 = new THREE.Vector2(0, 0);

  // Progress & State
  public progress: number = 0;
  public targetProgress: number = 0;
  public hoveredStrand: number = -1;
  public pointerNdc: THREE.Vector2 = new THREE.Vector2(0, 0);
  public theme: LoomThemeColors;

  // Tracked 3D Points for DOM labels (projected to screen pixels)
  public trackedPoints: Map<string, THREE.Vector3> = new Map();
  public screenPoints: Map<string, { x: number; y: number; visible: boolean }> = new Map();

  private isRunning: boolean = false;
  private animFrameId: number = 0;

  // 6 Real Overnight Events (22:00 to 07:00 = 9h span)
  // Exact formula: t = (hours since 22:00) / 9.0
  // Security 00:12 = 2.2 / 9 = 0.244444
  // CMDB 01:45 = 3.75 / 9 = 0.416667
  // Cloud 02:05 = 4.083333 / 9 = 0.453704
  // ITSM 02:14 = 4.233333 / 9 = 0.470370
  // Storage 02:28 = 4.466667 / 9 = 0.496296
  // Backup 02:31 = 4.516667 / 9 = 0.501852
  public static readonly EVENTS = [
    { strand: 0, name: "Backup", metric: "job duration", hour: 2, minute: 31, t: (4 + 31 / 60) / 9, time: "02:31", event: "Job completed with warnings", isWarning: true },
    { strand: 1, name: "Storage", metric: "replication lag", hour: 2, minute: 28, t: (4 + 28 / 60) / 9, time: "02:28", event: "Replication lag · within threshold", isWarning: false },
    { strand: 2, name: "Cloud", metric: "snapshot age", hour: 2, minute: 5, t: (4 + 5 / 60) / 9, time: "02:05", event: "Snapshot completed", isWarning: false },
    { strand: 3, name: "ITSM", metric: "open changes", hour: 2, minute: 14, t: (4 + 14 / 60) / 9, time: "02:14", event: "Change approved · config update", isWarning: false },
    { strand: 4, name: "CMDB", metric: "dependent applications", hour: 1, minute: 45, t: (3 + 45 / 60) / 9, time: "01:45", event: "payments-db · 3 dependents", isWarning: false },
    { strand: 5, name: "Security", metric: "open findings", hour: 0, minute: 12, t: (2 + 12 / 60) / 9, time: "00:12", event: "Scan completed · no findings", isWarning: false },
  ];

  constructor(canvas: HTMLCanvasElement, theme: LoomThemeColors) {
    this.canvas = canvas;
    this.theme = theme;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(theme.bg);
    this.scene.fog = new THREE.Fog(theme.bg, 8.0, 24.0);

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

    // Build the 3D scene elements
    this.buildLanesAndLines();
    this.buildGhostLines();
    this.buildSharedAxis();
    this.buildThresholdLine();
    this.buildEventBeads();
    this.buildBeat3FaintHairlines();
    this.buildAmbientParticles();
    this.buildTelemetryPackets();

    this.updateCamera(0);
    this.updateData(0);
    this.render();
  }

  // ─── PLOT BOUNDS IN SCREEN PIXELS ──────────────────────────────────
  // Left margin: 24px (24px inset per user requirement)
  // Right margin: 110px (strictly reserved for direct labels so lines never touch the edge)
  // Top margin: 52px (fully inside stage, never cut by top of viewport)
  // Bottom margin: 68px (room for persistent time axis 22:00 to 07:00 below baseline)
  public getPlotBounds() {
    const W = this.canvas.clientWidth || 800;
    const H = this.canvas.clientHeight || 520;
    const left = 24;
    const right = W - 110;
    const top = 52;
    const bottom = H - 68;
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

  // Mathematical screen-to-world conversion at plane z=0
  // Uses camera unproject so that project(unproject(screenX, screenY)) === (screenX, screenY) to 0.000px
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

  // ─── 1. SIX LANES & DATA LINES (FOLDING PLANES 3D MOTION) ──────────
  private buildLanesAndLines() {
    this.lanePlanesGroup = new THREE.Group();

    for (let s = 0; s < 6; s++) {
      // Lane frame for Beat 1
      const frameGeo = new THREE.BufferGeometry();
      const pts = [
        new THREE.Vector3(-2.8, -0.22, 0),
        new THREE.Vector3(2.8, -0.22, 0),
        new THREE.Vector3(2.8, 0.22, 0),
        new THREE.Vector3(-2.8, 0.22, 0),
        new THREE.Vector3(-2.8, -0.22, 0),
      ];
      frameGeo.setFromPoints(pts);
      const frameMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(this.theme.border),
        transparent: true,
        opacity: 0.45,
      });
      const laneFrame = new THREE.Line(frameGeo, frameMat);
      laneFrame.name = `laneFrame_${s}`;
      this.lanePlanesGroup.add(laneFrame);

      // Lane tiny y-scale ticks at left end for Beat 1
      const tickGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2.8, -0.15, 0),
        new THREE.Vector3(-2.68, -0.15, 0),
        new THREE.Vector3(-2.8, 0.0, 0),
        new THREE.Vector3(-2.68, 0.0, 0),
        new THREE.Vector3(-2.8, 0.15, 0),
        new THREE.Vector3(-2.68, 0.15, 0),
      ]);
      const laneTicks = new THREE.LineSegments(tickGeo, frameMat.clone());
      laneTicks.name = `laneTicks_${s}`;
      this.lanePlanesGroup.add(laneTicks);

      // Data Line for each strand (300 samples)
      const sampleCount = 300;
      const linePositions = new Float32Array(sampleCount * 3);
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

      const isBackup = s === 0;
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(isBackup ? this.theme.orange : this.theme.ink),
        transparent: true,
        opacity: isBackup ? 1.0 : 0.60,
        linewidth: isBackup ? 2 : 1,
      });

      const lineMesh = new THREE.Line(lineGeo, lineMat);
      lineMesh.name = `dataLine_${s}`;
      this.lineMeshes.push(lineMesh);
      this.scene.add(lineMesh);
    }

    this.scene.add(this.lanePlanesGroup);
  }

  // ─── 2. GHOST TRACES FOR "3 NIGHTS" STORY (BEAT 2) ──────────────────
  private buildGhostLines() {
    const sampleCount = 200;

    // Ghost 1: "two nights ago" (peaks at ~68%)
    const geo1 = new THREE.BufferGeometry();
    geo1.setAttribute("position", new THREE.BufferAttribute(new Float32Array(sampleCount * 3), 3));
    const mat1 = new THREE.LineDashedMaterial({
      color: new THREE.Color(this.theme.ink),
      transparent: true,
      opacity: 0.20, // ink at 20%
      dashSize: 0.12,
      gapSize: 0.08,
    });
    this.ghostLine1 = new THREE.Line(geo1, mat1);
    this.ghostLine1.name = "ghostLine_twoNightsAgo";
    this.ghostLine1.visible = false;
    this.scene.add(this.ghostLine1);

    // Ghost 2: "last night" (peaks at ~80%)
    const geo2 = new THREE.BufferGeometry();
    geo2.setAttribute("position", new THREE.BufferAttribute(new Float32Array(sampleCount * 3), 3));
    const mat2 = new THREE.LineDashedMaterial({
      color: new THREE.Color(this.theme.ink),
      transparent: true,
      opacity: 0.20, // ink at 20%
      dashSize: 0.12,
      gapSize: 0.08,
    });
    this.ghostLine2 = new THREE.Line(geo2, mat2);
    this.ghostLine2.name = "ghostLine_lastNight";
    this.ghostLine2.visible = false;
    this.scene.add(this.ghostLine2);
  }

  // ─── 3. BEAT 2 SHARED SCALE AXIS & GRIDLINES ───────────────────────
  private buildSharedAxis() {
    this.sharedAxisGroup = new THREE.Group();

    // Vertical Y-axis line at Left margin (24px)
    const axisGeo = new THREE.BufferGeometry();
    axisGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(2 * 3), 3));
    const axisMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(this.theme.border),
      transparent: true,
      opacity: 0.6,
    });
    const axisLine = new THREE.Line(axisGeo, axisMat);
    axisLine.name = "yAxisLine";
    this.sharedAxisGroup.add(axisLine);

    // Gridline at 0% (baseline)
    const grid0Geo = new THREE.BufferGeometry();
    grid0Geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(2 * 3), 3));
    const grid0Line = new THREE.Line(grid0Geo, axisMat);
    grid0Line.name = "grid0Line";
    this.sharedAxisGroup.add(grid0Line);

    // Gridline at 50%
    const grid50Geo = new THREE.BufferGeometry();
    grid50Geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(2 * 3), 3));
    const grid50Mat = new THREE.LineDashedMaterial({
      color: new THREE.Color(this.theme.border),
      transparent: true,
      opacity: 0.45,
      dashSize: 0.10,
      gapSize: 0.08,
    });
    const grid50Line = new THREE.Line(grid50Geo, grid50Mat);
    grid50Line.name = "grid50Line";
    this.sharedAxisGroup.add(grid50Line);

    this.sharedAxisGroup.visible = false;
    this.scene.add(this.sharedAxisGroup);
  }

  // ─── 4. SINGLE SLA THRESHOLD LINE (DASHED AT 100%) ──────────────────
  private buildThresholdLine() {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(2 * 3), 3));

    const mat = new THREE.LineDashedMaterial({
      color: new THREE.Color(this.theme.ink),
      dashSize: 0.16,
      gapSize: 0.10,
      transparent: true,
      opacity: 0.75,
    });

    this.thresholdLine = new THREE.Line(geo, mat);
    this.thresholdLine.name = "slaThresholdLine";
    this.thresholdLine.visible = false;
    this.scene.add(this.thresholdLine);
  }

  // ─── 5. EVENT BEADS (ONLY VISIBLE IN BEAT 1) ───────────────────────
  private buildEventBeads() {
    const beadGeo = new THREE.SphereGeometry(0.048, 16, 16);
    const beadMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(this.theme.ink) });

    this.beadsMesh = new THREE.InstancedMesh(beadGeo, beadMat, 6);
    this.beadsMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < 6; i++) {
      dummy.position.set(0, 0, 0);
      dummy.updateMatrix();
      this.beadsMesh.setMatrixAt(i, dummy.matrix);
      this.beadsMesh.setColorAt(
        i,
        i === 0 ? new THREE.Color(this.theme.orange) : new THREE.Color(this.theme.ink)
      );
    }
    this.beadsMesh.instanceMatrix.needsUpdate = true;
    if (this.beadsMesh.instanceColor) this.beadsMesh.instanceColor.needsUpdate = true;

    this.scene.add(this.beadsMesh);
  }

  // ─── 6. BEAT 3 FAINT HAIRLINES (~600 LINES AT 8% ALPHA) ────────────
  private buildBeat3FaintHairlines() {
    const count = 600;
    const geo = new THREE.BufferGeometry();
    const pts = [new THREE.Vector3(-0.35, 0, 0), new THREE.Vector3(0.35, 0, 0)];
    geo.setFromPoints(pts);

    this.faintHairlinesMesh = new THREE.InstancedMesh(
      geo,
      new THREE.LineBasicMaterial({
        color: new THREE.Color(this.theme.ink),
        transparent: true,
        opacity: 0.08, // exactly 8% opacity per rule
      }),
      count
    );
    this.faintHairlinesMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.hairlinesBasePositions = new Float32Array(count * 2);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const t = (i / count) * 4.6 - 2.3;
      const y = ((Math.sin(i * 12.3) + Math.cos(i * 4.7)) * 0.5) * 1.2;
      this.hairlinesBasePositions[i * 2 + 0] = t;
      this.hairlinesBasePositions[i * 2 + 1] = y;

      dummy.position.set(t, y, 0);
      dummy.updateMatrix();
      this.faintHairlinesMesh.setMatrixAt(i, dummy.matrix);
    }
    this.faintHairlinesMesh.instanceMatrix.needsUpdate = true;
    this.faintHairlinesMesh.visible = false;
    this.scene.add(this.faintHairlinesMesh);
  }

  // ─── 6B. AMBIENT 3D TELEMETRY DUST PARTICLES ──────────────────────
  private buildAmbientParticles() {
    const count = 90;
    const geo = new THREE.SphereGeometry(0.016, 8, 8);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(this.theme.muted),
      transparent: true,
      opacity: 0.12,
    });

    this.ambientParticlesMesh = new THREE.InstancedMesh(geo, mat, count);
    this.ambientParticlesMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.particleInitialPositions = new Float32Array(count * 3);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      // Deterministic pseudorandom distribution
      const u1 = (Math.sin(i * 91.34 + 1.2) * 43758.5453) % 1;
      const u2 = (Math.sin(i * 57.71 + 3.4) * 23421.6312) % 1;
      const u3 = (Math.sin(i * 19.93 + 5.6) * 31415.9265) % 1;

      const x = (Math.abs(u1) - 0.5) * 8.2;
      const y = (Math.abs(u2) - 0.5) * 5.2;
      const z = (Math.abs(u3) - 0.5) * 3.6;

      this.particleInitialPositions[i * 3 + 0] = x;
      this.particleInitialPositions[i * 3 + 1] = y;
      this.particleInitialPositions[i * 3 + 2] = z;

      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      this.ambientParticlesMesh.setMatrixAt(i, dummy.matrix);
    }

    this.ambientParticlesMesh.instanceMatrix.needsUpdate = true;
    this.scene.add(this.ambientParticlesMesh);
  }

  // ─── 6C. LIVING TELEMETRY PACKET PULSES (6 STRANDS) ────────────────
  private buildTelemetryPackets() {
    const count = 6;
    const geo = new THREE.SphereGeometry(0.038, 16, 16);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(this.theme.ink),
      transparent: true,
      opacity: 0.85,
    });

    this.packetPulseMesh = new THREE.InstancedMesh(geo, mat, count);
    this.packetPulseMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(0, 0, 0);
      dummy.updateMatrix();
      this.packetPulseMesh.setMatrixAt(i, dummy.matrix);
      this.packetPulseMesh.setColorAt(
        i,
        i === 0 ? new THREE.Color(this.theme.orange) : new THREE.Color(this.theme.ink)
      );
    }

    this.packetPulseMesh.instanceMatrix.needsUpdate = true;
    if (this.packetPulseMesh.instanceColor) this.packetPulseMesh.instanceColor.needsUpdate = true;
    this.scene.add(this.packetPulseMesh);
  }

  // ─── 7. VALUE EVALUATION (DISTANCE TO THRESHOLD 0..1) ──────────────
  // Evaluates vertical value v (0 to 1.0) at normalized time t (0..1)
  // Replaces sharp kinks with a perfectly smooth monotone curve from ~01:30 (t=0.3889) to 92%
  // Evaluates vertical value v (0 to 1.0) at normalized time t (0..1)
  // Replaces sharp kinks with a perfectly smooth monotone curve from ~01:30 (t=0.3889) to 92%
  public static evaluateStrandValue(t: number, s: number): number {
    if (s === 0) {
      // Backup Line (Orange):
      // Stays steady at constant 24% baseline from 22:00 until 01:30 (t=0.3889)
      // Drifts upward as a smooth monotone curve with zero derivative at 01:30, reaching 92% at 07:00 (t=1.0)
      if (t <= 0.3889) {
        return 0.24;
      }
      const u = (t - 0.3889) / (1.0 - 0.3889); // 0..1
      const sCurve = u * u * (3 - 2 * u); // Smoothstep S-curve: C1 continuous, derivative 0 at u=0
      return 0.24 + (0.92 - 0.24) * sCurve;
    }

    // Five other lines stay low (10% to 32% of threshold) in ink 60%, with clear distinct levels at line ends
    if (s === 1) {
      // Storage: baseline ~28%, gentle bump at 02:28 (t=0.496) to 33%, ends at 32%
      const bump = Math.exp(-Math.pow((t - 0.496) / 0.12, 2)) * 0.04;
      return 0.28 + bump + (t - 0.5) * 0.02;
    }
    if (s === 2) {
      // Cloud: baseline ~23%, ends at 26%
      return 0.23 + Math.sin(t * Math.PI) * 0.015 + t * 0.03;
    }
    if (s === 3) {
      // ITSM: baseline ~18%, ends at 20%
      return 0.18 + Math.sin(t * Math.PI) * 0.01 + t * 0.02;
    }
    if (s === 4) {
      // CMDB: baseline ~14%, ends at 15%
      return 0.14 + Math.sin(t * Math.PI) * 0.008 + t * 0.01;
    }
    // s === 5 (Security): baseline ~9%, ends at 10%
    return 0.09 + Math.sin(t * Math.PI) * 0.006 + t * 0.01;
  }

  // Ghost trace values for previous two nights
  public static evaluateGhostValue(t: number, night: 1 | 2): number {
    const peak = night === 1 ? 0.68 : 0.80; // night 1 = "two nights ago" (68%), night 2 = "last night" (80%)
    const base = night === 1 ? 0.20 : 0.22;
    if (t <= 0.3889) {
      return base;
    }
    const u = (t - 0.3889) / (1.0 - 0.3889);
    const sCurve = u * u * (3 - 2 * u);
    return base + (peak - base) * sCurve;
  }

  // Evaluates 3D position of strand s at time t given fold progression kFold
  public evaluateStrandPos(t: number, s: number, kFold: number): THREE.Vector3 {
    const bounds = this.getPlotBounds();
    const screenX = bounds.left + t * bounds.width;

    // --- BEAT 2 SCREEN Y & WORLD POSITION (Flat plane z=0) ---
    const val = LoomScene.evaluateStrandValue(t, s);
    const b2ScreenY = bounds.bottom - val * bounds.height;
    const b2Pos = this.screenToWorld(screenX, b2ScreenY, 0.0);

    // --- BEAT 1 (Tilted Perspective Lanes) ---
    // 6 distinct lanes stacked vertically across plot height bounds
    const laneSlotH = bounds.height / 6;
    const laneCenterY = bounds.top + (s + 0.5) * laneSlotH;
    // Each strand wanders gently inside its own lane (never jumps into another lane)
    const wanderPx = (Math.sin(t * 10.0 + s * 1.7) * 0.35 + Math.cos(t * 18.0 + s * 2.3) * 0.20) * (laneSlotH * 0.38);
    const b1ScreenY = laneCenterY + wanderPx;
    const b1Z = (2.5 - s) * 0.35; // 3D depth tilt
    // Unproject to 3D world ray so screen X is mathematically identical to screenX across full width
    const b1Pos = this.screenToWorld(screenX, b1ScreenY, b1Z);

    // Smooth 3D Folding Interpolation
    return new THREE.Vector3().lerpVectors(b1Pos, b2Pos, kFold);
  }

  // ─── 8. UPDATE DATA & POSITIONS PER FRAME ─────────────────────────
  public updateData(p: number, elapsedTime: number = 0) {
    this.progress = p;

    // kFold: 0.0 (Beat 1 tilted) -> 1.0 (Beat 2 shared scale)
    // Brisk fold between 0.16 and 0.36 so Beat 2 is completely flat early
    const kFold = THREE.MathUtils.smoothstep(p, 0.16, 0.36);

    // kQuiet: Beat 3 quiet attenuation (p in 0.62..0.85)
    const kQuiet = THREE.MathUtils.smoothstep(p, 0.62, 0.85);

    const bounds = this.getPlotBounds();

    // Update dynamic 3D telemetry and atmospheric craft
    this.updateAmbientParticles(elapsedTime);
    this.updateTelemetryPackets(elapsedTime, kFold, p);
    this.updateBeat3Hairlines(elapsedTime, p);

    // 1. Update 6 Data Lines
    const sampleCount = 300;
    for (let s = 0; s < 6; s++) {
      const lineMesh = this.lineMeshes[s];
      const posAttr = lineMesh.geometry.attributes.position as THREE.BufferAttribute;
      const isBackup = s === 0;

      for (let i = 0; i < sampleCount; i++) {
        const t = i / (sampleCount - 1);
        const pt = this.evaluateStrandPos(t, s, kFold);
        posAttr.setXYZ(i, pt.x, pt.y, pt.z);
      }
      posAttr.needsUpdate = true;

      // Opacity and hover
      const mat = lineMesh.material as THREE.LineBasicMaterial;
      if (kQuiet > 0.01) {
        if (s === 0 || s === 1) {
          mat.opacity = isBackup ? 1.0 : 0.80;
        } else {
          mat.opacity = THREE.MathUtils.lerp(0.60, 0.08, kQuiet);
        }
      } else {
        if (this.hoveredStrand >= 0) {
          mat.opacity = s === this.hoveredStrand ? 1.0 : 0.25;
        } else {
          mat.opacity = isBackup ? 1.0 : 0.60;
        }
      }
    }

    // 2. Update Ghost Traces ("two nights ago" and "last night")
    const ghostSampleCount = 200;
    if (this.ghostLine1 && this.ghostLine2) {
      const isBeat2Visible = p >= 0.26 && p <= 0.88;
      this.ghostLine1.visible = isBeat2Visible;
      this.ghostLine2.visible = isBeat2Visible;

      if (isBeat2Visible) {
        const pos1 = this.ghostLine1.geometry.attributes.position as THREE.BufferAttribute;
        const pos2 = this.ghostLine2.geometry.attributes.position as THREE.BufferAttribute;

        for (let i = 0; i < ghostSampleCount; i++) {
          const t = i / (ghostSampleCount - 1);
          const screenX = bounds.left + t * bounds.width;

          const val1 = LoomScene.evaluateGhostValue(t, 1);
          const sY1 = bounds.bottom - val1 * bounds.height;
          const pt1 = this.screenToWorld(screenX, sY1, 0.0);
          pos1.setXYZ(i, pt1.x, pt1.y, pt1.z);

          const val2 = LoomScene.evaluateGhostValue(t, 2);
          const sY2 = bounds.bottom - val2 * bounds.height;
          const pt2 = this.screenToWorld(screenX, sY2, 0.0);
          pos2.setXYZ(i, pt2.x, pt2.y, pt2.z);
        }
        pos1.needsUpdate = true;
        pos2.needsUpdate = true;
        this.ghostLine1.computeLineDistances();
        this.ghostLine2.computeLineDistances();

        const ghostAlpha = THREE.MathUtils.clamp((p - 0.26) / 0.12, 0, 1) * (1.0 - kQuiet);
        (this.ghostLine1.material as THREE.LineDashedMaterial).opacity = 0.20 * ghostAlpha;
        (this.ghostLine2.material as THREE.LineDashedMaterial).opacity = 0.20 * ghostAlpha;
      }
    }

    // 3. Update Shared Axis & Gridlines
    this.sharedAxisGroup.visible = kFold > 0.05;
    if (this.sharedAxisGroup.visible) {
      const yAxisLine = this.sharedAxisGroup.getObjectByName("yAxisLine") as THREE.Line;
      const grid0Line = this.sharedAxisGroup.getObjectByName("grid0Line") as THREE.Line;
      const grid50Line = this.sharedAxisGroup.getObjectByName("grid50Line") as THREE.Line;

      const pTop = this.screenToWorld(bounds.left, bounds.top, 0.0);
      const pBottom = this.screenToWorld(bounds.left, bounds.bottom, 0.0);
      const pRight0 = this.screenToWorld(bounds.right, bounds.bottom, 0.0);

      const midY = bounds.top + bounds.height * 0.5;
      const pLeft50 = this.screenToWorld(bounds.left, midY, 0.0);
      const pRight50 = this.screenToWorld(bounds.right, midY, 0.0);

      if (yAxisLine) {
        const pos = yAxisLine.geometry.attributes.position as THREE.BufferAttribute;
        pos.setXYZ(0, pTop.x, pTop.y, pTop.z);
        pos.setXYZ(1, pBottom.x, pBottom.y, pBottom.z);
        pos.needsUpdate = true;
        (yAxisLine.material as THREE.LineBasicMaterial).opacity = kFold * 0.6;
      }

      if (grid0Line) {
        const pos = grid0Line.geometry.attributes.position as THREE.BufferAttribute;
        pos.setXYZ(0, pBottom.x, pBottom.y, pBottom.z);
        pos.setXYZ(1, pRight0.x, pRight0.y, pRight0.z);
        pos.needsUpdate = true;
        (grid0Line.material as THREE.LineBasicMaterial).opacity = kFold * 0.5;
      }

      if (grid50Line) {
        const pos = grid50Line.geometry.attributes.position as THREE.BufferAttribute;
        pos.setXYZ(0, pLeft50.x, pLeft50.y, pLeft50.z);
        pos.setXYZ(1, pRight50.x, pRight50.y, pRight50.z);
        pos.needsUpdate = true;
        grid50Line.computeLineDistances();
        (grid50Line.material as THREE.LineDashedMaterial).opacity = kFold * 0.35;
      }
    }

    // 4. Update SLA Threshold Line (Dashed at 100%, Horizontal in Screen Space)
    this.thresholdLine.visible = p >= 0.28;
    if (this.thresholdLine.visible) {
      const pLeft100 = this.screenToWorld(bounds.left, bounds.top, 0.0);
      const pRight100 = this.screenToWorld(bounds.right, bounds.top, 0.0);

      const pos = this.thresholdLine.geometry.attributes.position as THREE.BufferAttribute;
      pos.setXYZ(0, pLeft100.x, pLeft100.y, pLeft100.z);
      pos.setXYZ(1, pRight100.x, pRight100.y, pRight100.z);
      pos.needsUpdate = true;
      this.thresholdLine.computeLineDistances();
    }

    // 5. Update Lane Frames for Beat 1
    this.lanePlanesGroup.visible = kFold < 0.98;
    this.lanePlanesGroup.children.forEach((child) => {
      const match = child.name.match(/_(.+)$/);
      if (!match) return;
      const s = parseInt(match[1], 10);
      const laneY = (2.5 - s) * 0.42;
      const laneZ = (2.5 - s) * 0.40;

      child.position.y = THREE.MathUtils.lerp(laneY, 0, kFold);
      child.position.z = THREE.MathUtils.lerp(laneZ, 0, kFold);
      child.rotation.x = THREE.MathUtils.lerp(0.12, 0, kFold);

      const line = child as THREE.Line;
      (line.material as THREE.LineBasicMaterial).opacity = (1.0 - kFold) * 0.45;
    });

    // 6. Update Beat 3 Faint Hairlines
    this.faintHairlinesMesh.visible = p >= 0.60;

    // 7. Event Beads disabled (Crisp 7px DOM dots track projected positions continuously)
    this.beadsMesh.visible = false;

    // 8. Track Points for DOM labels & callouts
    for (let s = 0; s < 6; s++) {
      // Beat 1 Left Ends (t = 0.0)
      const leftPos = this.evaluateStrandPos(0.0, s, kFold);
      this.trackedPoints.set(`left_end_${s}`, leftPos);

      // Beat 2 Right Ends (t = 1.0, strictly at right margin bounds.right)
      const rightPos = this.evaluateStrandPos(1.0, s, kFold);
      this.trackedPoints.set(`right_end_${s}`, rightPos);
    }

    // 6 Event Dots positions (tracked continuously on actual line vertices)
    LoomScene.EVENTS.forEach((evt, idx) => {
      const pos = this.evaluateStrandPos(evt.t, evt.strand, kFold);
      this.trackedPoints.set(`event_${idx}`, pos);
    });

    // SLA Threshold tag point at right end of 100% line
    const slaTagPos = this.screenToWorld(bounds.right, bounds.top, 0.0);
    this.trackedPoints.set("sla_threshold_tag", slaTagPos);

    // Backup line end callout & leader line attachment (at t = 1.0, v = 0.92)
    const backupEndPos = this.screenToWorld(bounds.right, bounds.bottom - 0.92 * bounds.height, 0.0);
    this.trackedPoints.set("backup_callout_anchor", backupEndPos);

    // Gap annotation "8% to go" (midway between 92% and 100% threshold at bounds.right)
    const gapPos = this.screenToWorld(bounds.right, bounds.bottom - 0.96 * bounds.height, 0.0);
    this.trackedPoints.set("gap_annotation", gapPos);

    this.updateScreenTracking();
  }

  // ─── 8B. UPDATE VOLUMETRIC DUST DRIFT ─────────────────────────────
  private updateAmbientParticles(elapsedTime: number) {
    if (!this.ambientParticlesMesh) return;
    const count = 90;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const x0 = this.particleInitialPositions[i * 3 + 0];
      const y0 = this.particleInitialPositions[i * 3 + 1];
      const z0 = this.particleInitialPositions[i * 3 + 2];

      const driftX = Math.sin(elapsedTime * 0.25 + i * 0.35) * 0.15;
      const driftY = Math.cos(elapsedTime * 0.30 + i * 0.45) * 0.12;

      dummy.position.set(x0 + driftX, y0 + driftY, z0);
      dummy.updateMatrix();
      this.ambientParticlesMesh.setMatrixAt(i, dummy.matrix);
    }
    this.ambientParticlesMesh.instanceMatrix.needsUpdate = true;
  }

  // ─── 8C. UPDATE TELEMETRY PACKET PULSES ───────────────────────────
  private updateTelemetryPackets(elapsedTime: number, kFold: number, p: number) {
    if (!this.packetPulseMesh) return;

    if (p > 0.65) {
      this.packetPulseMesh.visible = false;
      return;
    }
    this.packetPulseMesh.visible = true;

    const dummy = new THREE.Object3D();
    for (let s = 0; s < 6; s++) {
      const speed = s === 0 ? 0.14 : 0.11;
      const phase = s * 0.18;
      const t = (elapsedTime * speed + phase) % 1.0;

      // Smooth entry and exit scaling (fade in at t=0..0.05, fade out at t=0.95..1.0)
      const edgeScale = Math.sin(t * Math.PI);
      const scale = Math.max(0.001, edgeScale);

      const pt = this.evaluateStrandPos(t, s, kFold);
      dummy.position.copy(pt);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      this.packetPulseMesh.setMatrixAt(s, dummy.matrix);
    }
    this.packetPulseMesh.instanceMatrix.needsUpdate = true;
  }

  // ─── 8D. UPDATE BEAT 3 HARMONIC BREATHING ─────────────────────────
  private updateBeat3Hairlines(elapsedTime: number, p: number) {
    if (!this.faintHairlinesMesh || p < 0.60) return;
    const count = 600;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const bx = this.hairlinesBasePositions[i * 2 + 0];
      const by = this.hairlinesBasePositions[i * 2 + 1];

      // Subtle sinusoidal wave at 8% alpha
      const microWave = Math.sin(elapsedTime * 1.4 + i * 0.08) * 0.022;

      dummy.position.set(bx, by + microWave, 0);
      dummy.updateMatrix();
      this.faintHairlinesMesh.setMatrixAt(i, dummy.matrix);
    }
    this.faintHairlinesMesh.instanceMatrix.needsUpdate = true;
  }

  // ─── 9. CAMERA PATH UPDATE (PIECEWISE LOCKED IN BEAT 2) ───────────
  public updateCamera(p: number, delta: number = 0.016) {
    const clampedP = Math.max(0, Math.min(1, p));

    let camX = 0;
    let camY = 0;
    let camZ = 7.0;
    let targetX = 0;
    let targetY = 0;

    if (clampedP <= 0.18) {
      // Beat 1: Oblique perspective view of tilted planes
      camX = -1.8;
      camY = 0.8;
      camZ = 7.6;
      targetX = -0.3;
      targetY = 0.0;
    } else if (clampedP <= 0.36) {
      // Smooth camera transition to frontal view matching the plane fold
      const k = THREE.MathUtils.smoothstep(clampedP, 0.18, 0.36);
      camX = THREE.MathUtils.lerp(-1.8, 0.0, k);
      camY = THREE.MathUtils.lerp(0.8, 0.0, k);
      camZ = THREE.MathUtils.lerp(7.6, 7.0, k);
      targetX = THREE.MathUtils.lerp(-0.3, 0.0, k);
      targetY = 0.0;
    } else if (clampedP <= 0.65) {
      // Beat 2: LOCKED FRONTAL VIEW
      // Zero pitch, zero roll, zero overshoot
      camX = 0.0;
      camY = 0.0;
      camZ = 7.0;
      targetX = 0.0;
      targetY = 0.0;
    } else if (clampedP <= 0.88) {
      // Beat 3: Pull back slightly for quiet hairlines
      const k = THREE.MathUtils.smoothstep(clampedP, 0.65, 0.85);
      camX = 0.0;
      camY = 0.0;
      camZ = THREE.MathUtils.lerp(7.0, 7.8, k);
      targetX = 0.0;
    } else {
      // Release to right
      const k = THREE.MathUtils.smoothstep(clampedP, 0.88, 1.0);
      camX = THREE.MathUtils.lerp(0.0, 1.6, k);
      camZ = THREE.MathUtils.lerp(7.8, 8.6, k);
      targetX = THREE.MathUtils.lerp(0.0, 0.8, k);
    }

    // Critically damped spring physics for pointer parallax (smooth tactile weight)
    const smoothFactor = Math.min(1.0, delta * 6.0);
    this.currentPointer.lerp(this.pointerNdc, smoothFactor);

    const yawOffset = this.currentPointer.x * 0.0105 * 5.0;
    const pitchOffset = this.currentPointer.y * 0.0105 * 3.0;

    this.camera.position.set(camX + yawOffset, camY + pitchOffset, camZ);
    this.camera.lookAt(targetX, targetY, 0.0);
  }

  // ─── 10. 3D TO 2D SCREEN PROJECTION ───────────────────────────────
  private updateScreenTracking() {
    const width = this.canvas.clientWidth || 800;
    const height = this.canvas.clientHeight || 520;

    this.trackedPoints.forEach((worldPos, id) => {
      const projected = worldPos.clone().project(this.camera);
      const visible = projected.z < 1.0 && projected.z > -1.0;
      const x = (projected.x * 0.5 + 0.5) * width;
      const y = (projected.y * -0.5 + 0.5) * height;

      this.screenPoints.set(id, { x, y, visible });
    });
  }

  // ─── 11. HOVER DETECTION ──────────────────────────────────────────
  public updateHover(screenX: number, screenY: number) {
    let closestStrand = -1;
    let minDistance = 24; // px

    const kFold = THREE.MathUtils.smoothstep(this.progress, 0.22, 0.52);

    for (let s = 0; s < 6; s++) {
      for (let i = 0; i <= 30; i++) {
        const t = i / 30;
        const pt = this.evaluateStrandPos(t, s, kFold);
        const projected = pt.project(this.camera);
        const sx = (projected.x * 0.5 + 0.5) * this.canvas.clientWidth;
        const sy = (projected.y * -0.5 + 0.5) * this.canvas.clientHeight;

        const dist = Math.hypot(screenX - sx, screenY - sy);
        if (dist < minDistance) {
          minDistance = dist;
          closestStrand = s;
        }
      }
    }

    this.hoveredStrand = closestStrand;
  }

  // ─── 12. THEME SYNC ───────────────────────────────────────────────
  public updateTheme(newTheme: LoomThemeColors) {
    this.theme = newTheme;
    this.scene.background = new THREE.Color(newTheme.bg);
    this.scene.fog = new THREE.Fog(newTheme.bg, 8.0, 24.0);

    for (let s = 0; s < 6; s++) {
      const isBackup = s === 0;
      (this.lineMeshes[s].material as THREE.LineBasicMaterial).color.set(
        isBackup ? newTheme.orange : newTheme.ink
      );
    }

    if (this.ghostLine1) (this.ghostLine1.material as THREE.LineDashedMaterial).color.set(newTheme.ink);
    if (this.ghostLine2) (this.ghostLine2.material as THREE.LineDashedMaterial).color.set(newTheme.ink);
    if (this.thresholdLine) (this.thresholdLine.material as THREE.LineDashedMaterial).color.set(newTheme.ink);

    if (this.ambientParticlesMesh) {
      (this.ambientParticlesMesh.material as THREE.MeshBasicMaterial).color.set(newTheme.muted);
    }
    if (this.packetPulseMesh) {
      (this.packetPulseMesh.material as THREE.MeshBasicMaterial).color.set(newTheme.ink);
      for (let s = 0; s < 6; s++) {
        this.packetPulseMesh.setColorAt(
          s,
          s === 0 ? new THREE.Color(newTheme.orange) : new THREE.Color(newTheme.ink)
        );
      }
      if (this.packetPulseMesh.instanceColor) this.packetPulseMesh.instanceColor.needsUpdate = true;
    }
    if (this.faintHairlinesMesh) {
      (this.faintHairlinesMesh.material as THREE.LineBasicMaterial).color.set(newTheme.ink);
    }
  }

  public resize(width: number, height: number) {
    if (width === 0 || height === 0) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.updateScreenTracking();
    this.render();
  }

  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.clock.start();

    let lastTime = performance.now();
    const loop = (now: number) => {
      if (!this.isRunning) return;
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const pDiff = Math.abs(this.targetProgress - this.progress);
      if (pDiff > 0.0001) {
        this.progress += (this.targetProgress - this.progress) * 0.12;
      }

      const elapsedTime = this.clock.getElapsedTime();
      this.updateCamera(this.progress, delta);
      this.updateData(this.progress, elapsedTime);
      this.render();

      this.animFrameId = requestAnimationFrame(loop);
    };

    loop(performance.now());
  }

  public stop() {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = 0;
    }
  }

  public destroy() {
    this.stop();
    this.renderer.dispose();
    this.scene.clear();
  }
}
