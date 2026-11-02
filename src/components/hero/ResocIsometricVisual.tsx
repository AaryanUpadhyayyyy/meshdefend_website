"use client";

import { useEffect, useRef } from "react";

type Point = [number, number];
type Position = [number, number, number];
type HitZone = { index: number; points: Point[] };
type PlatformKind = "bars" | "racks" | "wall";
type Platform = {
  family: number;
  at: Point;
  from: Position;
  kind: PlatformKind;
  path: Point[];
  label: [number, number, number, number];
  phase: number;
  lift: number;
};

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);
const FAMILY_COLORS = ["#b7852a", "#2e4a78", "#7a3b5e"];
const PLATFORMS: Platform[] = [
  { family: 0, at: [-5.4, 0], from: [-6.5, -0.3, 0.8], kind: "bars", path: [[-3.6, 0], [-1.4, 0]], label: [-1.8, -1.8, 0, -2.2], phase: 0, lift: 0 },
  { family: 1, at: [0, -5.4], from: [-0.3, -6.5, 0.25], kind: "racks", path: [[0, -3.6], [0, -1.4]], label: [-1.8, -1.8, 0, -2.2], phase: 1.7, lift: 0 },
  { family: 2, at: [4.4, 4.4], from: [5.3, 4.9, 0.45], kind: "wall", path: [[4.4, 2.6], [4.4, 0], [1.4, 0]], label: [-1.8, 1.8, 0, 0], phase: 3.4, lift: 0 },
];

class IsometricHeroScene {
  private width = 0;
  private height = 0;
  private scale = 1;
  private originX = 0;
  private originY = 0;
  private mouseX: number | null = null;
  private mouseY = 0;
  private hitZones: HitZone[] = [];
  private selectedPlatform = -1;
  private readonly platforms: Platform[] = PLATFORMS.map((platform) => ({
    ...platform,
    at: [...platform.at] as Point,
    from: [...platform.from] as Position,
    path: platform.path.map((point) => [...point] as Point),
    label: [...platform.label] as Platform["label"],
  }));
  private readonly mesh: Point[] = [[0, 0], ...Array.from({ length: 6 }, (_, index) => [
    Math.cos(index * Math.PI / 3) * 0.78,
    Math.sin(index * Math.PI / 3) * 0.78,
  ] as Point)];
  private readonly monoFamily: string;
  private colors: {
    accent: string;
    ink: string;
    outline: string;
    dot: string;
    shadow: string;
    top: string;
    front: string;
    side: string;
  };

  constructor(private readonly canvas: HTMLCanvasElement, private readonly ctx: CanvasRenderingContext2D) {
    const styles = getComputedStyle(canvas.parentElement || canvas);
    this.monoFamily = styles.getPropertyValue("--font-jetbrains-mono").trim() || '"JetBrains Mono", monospace';
    this.colors = { accent: "#f45532", ink: "#221f22", outline: "#8e897d", dot: "rgba(34,31,34,.14)", shadow: "34,31,34", top: "#fff", front: "#f0eeea", side: "#e3e0d9" };
    this.refreshColors();
  }

  refreshColors() {
    const styles = getComputedStyle(this.canvas.parentElement || this.canvas);
    this.colors = {
      accent: styles.getPropertyValue("--orange").trim() || "#f45532",
      ink: styles.getPropertyValue("--ink").trim() || "#221f22",
      outline: styles.getPropertyValue("--resoc-scene-outline").trim() || "#8e897d",
      dot: styles.getPropertyValue("--resoc-scene-dot").trim() || "rgba(34,31,34,.14)",
      shadow: styles.getPropertyValue("--resoc-scene-shadow").trim() || "34,31,34",
      top: styles.getPropertyValue("--resoc-scene-top").trim() || "#fff",
      front: styles.getPropertyValue("--resoc-scene-front").trim() || "#f0eeea",
      side: styles.getPropertyValue("--resoc-scene-side").trim() || "#e3e0d9",
    };
  }

  setPointer(x: number | null, y = 0) {
    this.mouseX = x;
    this.mouseY = y;
  }

  hitTest(x: number, y: number) {
    for (let zoneIndex = this.hitZones.length - 1; zoneIndex >= 0; zoneIndex--) {
      const zone = this.hitZones[zoneIndex];
      let inside = false;
      for (let i = 0, j = zone.points.length - 1; i < zone.points.length; j = i++) {
        const [xi, yi] = zone.points[i];
        const [xj, yj] = zone.points[j];
        const crosses = (yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (crosses) inside = !inside;
      }
      if (inside) return zone.index;
    }
    return -1;
  }

  selectPlatform(index: number) {
    this.selectedPlatform = this.selectedPlatform === index ? -1 : index;
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.scale = Math.min(width / 16, height / 13.6);
    this.originX = width / 2;
    this.originY = height * 0.53;
  }

  private project(x: number, y: number, z: number): Point {
    return [
      this.originX + (x - y) * 0.866 * this.scale,
      this.originY + (x + y) * 0.5 * this.scale - z * this.scale,
    ];
  }

  private polygon(points: Point[], fill?: string | null, stroke?: string | null) {
    const ctx = this.ctx;
    ctx.beginPath();
    points.forEach(([x, y], index) => index ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
  }

  private tileTop(x: number, y: number, z: number, width: number, depth: number): Point[] {
    return [
      this.project(x, y, z), this.project(x + width, y, z),
      this.project(x + width, y + depth, z), this.project(x, y + depth, z),
    ];
  }

  private box(x: number, y: number, z: number, width: number, depth: number, height: number, topFill?: string, ghost = false) {
    const q = this.colors;
    const p = (px: number, py: number, pz: number) => this.project(px, py, pz);
    const front = [p(x, y + depth, z), p(x + width, y + depth, z), p(x + width, y + depth, z + height), p(x, y + depth, z + height)];
    const side = [p(x + width, y, z), p(x + width, y + depth, z), p(x + width, y + depth, z + height), p(x + width, y, z + height)];
    const top = this.tileTop(x, y, z + height, width, depth);
    const previousDash = this.ctx.getLineDash();
    if (ghost) this.ctx.setLineDash([3, 3]);
    this.ctx.lineWidth = 1;
    this.ctx.lineJoin = "round";
    this.polygon(front, ghost ? null : q.front, q.outline);
    this.polygon(side, ghost ? null : q.side, q.outline);
    this.polygon(top, ghost ? null : (topFill || q.top), q.outline);
    if (ghost) this.ctx.setLineDash(previousDash);
  }

  private shadow(x: number, y: number, width: number, depth: number, z: number) {
    const safeZ = Math.max(0, z);
    const spread = safeZ * 0.18;
    const alpha = 0.13 * clamp(1 - safeZ / 7);
    this.polygon(
      this.tileTop(x - spread + safeZ * 0.25, y - spread + safeZ * 0.25, 0, width + spread * 2, depth + spread * 2),
      `rgba(${this.colors.shadow},${alpha})`,
    );
  }

  private dots(count: number) {
    this.ctx.fillStyle = this.colors.dot;
    for (let x = -count; x <= count; x++) for (let y = -count; y <= count; y++) {
      if ((x + y) % 2) continue;
      const [px, py] = this.project(x, y, 0);
      this.ctx.fillRect(px - 0.75, py - 0.75, 1.5, 1.5);
    }
  }

  private tag(x: number, y: number, label: string, fill: string, color: string) {
    const ctx = this.ctx;
    ctx.font = `600 12px ${this.monoFamily}`;
    const width = ctx.measureText(label).width + 16;
    ctx.fillStyle = fill;
    ctx.fillRect(x - width / 2, y - 20, width, 20);
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x, y - 9.5);
  }

  private route(platform: Platform, position: Position): Point[] {
    return [[position[0], position[1]], ...platform.path].map(([x, y]) => this.project(x, y, 0.02));
  }

  private along(points: Point[], progress: number): [number, number, number] {
    const lengths: number[] = [];
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      const length = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
      lengths.push(length);
      total += length;
    }
    let remaining = clamp(progress) * total;
    let segment = 0;
    while (segment < lengths.length - 1 && remaining > lengths[segment]) {
      remaining -= lengths[segment];
      segment++;
    }
    const ratio = lengths[segment] ? remaining / lengths[segment] : 0;
    return [
      points[segment][0] + (points[segment + 1][0] - points[segment][0]) * ratio,
      points[segment][1] + (points[segment + 1][1] - points[segment][1]) * ratio,
      total,
    ];
  }

  private drawPlatform(platform: Platform, x: number, y: number, z: number, assembled: number, time: number, highlight: number, alert: number) {
    this.box(x - 1.8, y - 1.8, z, 3.6, 3.6, 0.3);
    if (highlight > 0) {
      this.ctx.globalAlpha = highlight;
      this.ctx.lineWidth = 2;
      this.polygon(this.tileTop(x - 1.8, y - 1.8, z + 0.3, 3.6, 3.6), null, this.colors.accent);
      this.ctx.globalAlpha = 1;
      this.ctx.lineWidth = 1;
    }
    const zTop = z + 0.3;
    const wobble = (index: number) => 1 + 0.3 * Math.sin(time * 0.004 + index * 1.9 + platform.phase) * (1 - assembled);
    if (platform.kind === "bars") {
      [0.6, 1.1, 1.6].forEach((height, index) => this.box(x - 1.35 + index * 0.95, y - 0.35, zTop, 0.7, 0.7, height * wobble(index)));
    }
    if (platform.kind === "racks") {
      [[-1.3, 1.7], [0.2, 1.25]].forEach(([dx, height], index) => {
        const rackHeight = height * wobble(index);
        this.box(x + dx, y - 0.6, zTop, 1.05, 0.9, rackHeight);
        this.ctx.strokeStyle = this.colors.outline;
        this.ctx.beginPath();
        for (let row = 1; row < 4; row++) {
          const a = this.project(x + dx + 0.15, y + 0.3, zTop + rackHeight * row / 4);
          const b = this.project(x + dx + 0.9, y + 0.3, zTop + rackHeight * row / 4);
          this.ctx.moveTo(...a); this.ctx.lineTo(...b);
        }
        this.ctx.stroke();
      });
    }
    if (platform.kind === "wall") {
      const height = 0.55 * wobble(0);
      this.box(x - 1.5, y - 1.5, zTop, 3, 0.18, height);
      this.box(x - 1.5, y - 1.5, zTop, 0.18, 3, height);
      this.box(x - 0.5, y - 0.5, zTop, 1, 1, 0.8 * wobble(1));
      this.box(x - 1.5, y + 1.32, zTop, 3, 0.18, height);
      this.box(x + 1.32, y - 1.5, zTop, 0.18, 3, height);
    }
    if (alert > 0) {
      const [px, py] = this.project(x + 1.55, y + 1.55, zTop + 0.05);
      const pulse = (performance.now() % 900) / 900;
      this.ctx.globalAlpha = alert;
      this.ctx.fillStyle = "#c2412d";
      this.ctx.beginPath(); this.ctx.arc(px, py, 3.6, 0, Math.PI * 2); this.ctx.fill();
      this.ctx.globalAlpha = alert * (1 - pulse);
      this.ctx.strokeStyle = "#c2412d";
      this.ctx.lineWidth = 1.2;
      this.ctx.beginPath(); this.ctx.arc(px, py, 3.6 + pulse * 9, 0, Math.PI * 2); this.ctx.stroke();
      this.ctx.globalAlpha = 1;
      this.ctx.lineWidth = 1;
    }
  }

  render(time: number, elapsed: number, staticScene: boolean) {
    const ctx = this.ctx;
    const accent = this.colors.accent;
    this.hitZones = [];
    this.dots(9);

    const hubProgress = staticScene ? 1 : clamp((elapsed - 450) / 700);
    const sinceLanding = elapsed - 1150;
    let hubZ = 4.2 * Math.pow(1 - hubProgress, 2.2);
    if (!staticScene && sinceLanding > 0 && sinceLanding < 320) hubZ = 0.28 * Math.sin(Math.PI * sinceLanding / 320);
    const hubAlpha = staticScene ? 1 : clamp((elapsed - 300) / 280);
    const hubTop = hubZ + 1.4;
    const assembled = this.platforms.map((_, index) => staticScene ? 1 : easeOut(clamp((elapsed - 1000 - index * 180) / 1000)));
    const hovered = this.mouseX == null ? -1 : this.platforms.findIndex((platform) => {
      const point = this.project(platform.at[0], platform.at[1], 1);
      return Math.hypot(point[0] - this.mouseX!, point[1] - this.mouseY) < this.scale * 2.3;
    });
    const positions = this.platforms.map((platform, index): Position => {
      const progress = assembled[index];
      const liftTarget = (hovered === index || this.selectedPlatform === index) && progress >= 1 ? 0.45 : 0;
      platform.lift = staticScene ? liftTarget : platform.lift + (liftTarget - platform.lift) * 0.15;
      return [
        platform.from[0] + (platform.at[0] - platform.from[0]) * progress,
        platform.from[1] + (platform.at[1] - platform.from[1]) * progress,
        platform.from[2] * (1 - progress) + (1 - progress) * 0.35 * Math.sin(time * 0.0016 + platform.phase) + platform.lift,
      ];
    });
    const wireProgress = this.platforms.map((_, index) => staticScene ? 1 : clamp((elapsed - 2300 - index * 160) / 520));
    const meshProgress = staticScene ? 1 : clamp((elapsed - 2450) / 520);

    const incident = { index: -1, ms: 0 };
    const incidentClock = elapsed - 3600;
    if (!staticScene && incidentClock > 0) {
      const cycle = incidentClock / 4200;
      incident.index = Math.floor(cycle) % 3;
      incident.ms = (cycle % 1) * 4200;
    }
    const alertFor = (index: number) => {
      if (!staticScene && assembled[index] < 1) return 0.5 + 0.5 * (Math.sin(time * 0.006 + index * 2) > 0 ? 1 : 0);
      if (incident.index !== index) return 0;
      return incident.ms < 2900 ? 1 : clamp(1 - (incident.ms - 2900) / 300);
    };
    const highlightFor = (index: number) => incident.index === index && incident.ms > 2900 ? clamp(1 - (incident.ms - 2900) / 1100) : 0;

    this.platforms.forEach((platform, index) => this.shadow(positions[index][0] - 1.8, positions[index][1] - 1.8, 3.6, 3.6, positions[index][2]));
    if (hubAlpha > 0) this.shadow(-1.4, -1.4, 2.8, 2.8, hubZ);
    if (!staticScene && sinceLanding > 0 && sinceLanding < 900) {
      const progress = sinceLanding / 900;
      ctx.globalAlpha = (1 - progress) * 0.6;
      ctx.strokeStyle = accent; ctx.lineWidth = 1.2;
      this.drawRing(0, 0, 0, 1.8 + progress * 3.2);
      ctx.globalAlpha = 1;
    }

    const silo = staticScene ? 0 : 1 - Math.min(...assembled);
    if (silo > 0) {
      ctx.setLineDash([3, 4]); ctx.strokeStyle = this.colors.outline; ctx.lineWidth = 1; ctx.globalAlpha = silo * 0.55;
      [[0, 1], [1, 2], [2, 0]].forEach(([a, b]) => {
        const start = this.project(positions[a][0], positions[a][1], positions[a][2]);
        const end = this.project(positions[b][0], positions[b][1], positions[b][2]);
        ctx.beginPath(); ctx.moveTo(...start);
        ctx.lineTo(start[0] + (end[0] - start[0]) * 0.38, start[1] + (end[1] - start[1]) * 0.38);
        ctx.moveTo(start[0] + (end[0] - start[0]) * 0.62, start[1] + (end[1] - start[1]) * 0.62);
        ctx.lineTo(...end); ctx.stroke();
      });
      ctx.setLineDash([]); ctx.globalAlpha = 1;
    }

    this.platforms.forEach((platform, index) => {
      const points = this.route(platform, positions[index]);
      const progress = wireProgress[index];
      if (progress <= 0 || assembled[index] < 1) return;
      const totalLength = this.along(points, 1)[2];
      ctx.strokeStyle = accent; ctx.lineWidth = hovered === index ? 2.6 : 2; ctx.globalAlpha = 1;
      ctx.beginPath(); ctx.moveTo(...points[0]);
      let remaining = totalLength * progress;
      for (let segment = 1; segment < points.length && remaining > 0; segment++) {
        const length = Math.hypot(points[segment][0] - points[segment - 1][0], points[segment][1] - points[segment - 1][1]);
        const ratio = Math.min(1, remaining / length);
        ctx.lineTo(points[segment - 1][0] + (points[segment][0] - points[segment - 1][0]) * ratio,
          points[segment - 1][1] + (points[segment][1] - points[segment - 1][1]) * ratio);
        remaining -= length;
      }
      ctx.stroke();
      if (progress >= 1 && !staticScene) for (let dot = 0; dot < 2; dot++) {
        const point = this.along(points, (time * 0.00028 + dot / 2 + index * 0.17) % 1);
        ctx.globalAlpha = 0.45; ctx.fillStyle = accent; ctx.fillRect(point[0] - 2, point[1] - 3, 4, 4);
      }
      ctx.globalAlpha = 1;
      if (incident.index === index) {
        if (incident.ms > 300 && incident.ms < 1300) {
          const point = this.along(points, (incident.ms - 300) / 1000); ctx.fillStyle = "#c2412d"; ctx.fillRect(point[0] - 3, point[1] - 5, 6, 6);
        }
        if (incident.ms > 1700 && incident.ms < 2900) {
          const point = this.along(points, 1 - (incident.ms - 1700) / 1200);
          ctx.fillStyle = accent; ctx.fillRect(point[0] - 4, point[1] - 7, 8, 8); ctx.strokeStyle = this.colors.ink; ctx.lineWidth = 1; ctx.strokeRect(point[0] - 4, point[1] - 7, 8, 8);
        }
      }
    });

    const draws = this.platforms.map((platform, index) => ({
      depth: positions[index][0] + positions[index][1],
      draw: () => this.drawPlatform(platform, positions[index][0], positions[index][1], positions[index][2], assembled[index], time, highlightFor(index), alertFor(index)),
    }));
    this.platforms.forEach((_, index) => {
      const [x, y, z] = positions[index];
      const center = this.project(x, y, z + 0.9);
      const hitRadius = this.scale * 3.7;
      this.hitZones.push({
        index,
        points: Array.from({ length: 32 }, (_, pointIndex) => {
          const angle = (pointIndex / 32) * Math.PI * 2;
          return [center[0] + Math.cos(angle) * hitRadius, center[1] + Math.sin(angle) * hitRadius];
        }),
      });
    });
    if (hubAlpha > 0) draws.push({ depth: 0, draw: () => {
      ctx.globalAlpha = hubAlpha;
      this.box(-1.4, -1.4, hubZ, 2.8, 2.8, 0.4, accent);
      this.box(-1, -1, hubZ + 0.4, 2, 2, 1, accent);
      ctx.globalAlpha = 1;
      if (meshProgress > 0) {
        const nodes = this.mesh.map(([x, y]) => this.project(x * meshProgress, y * meshProgress, hubTop));
        ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = 1; ctx.beginPath();
        for (let index = 1; index < 7; index++) {
          ctx.moveTo(...nodes[0]); ctx.lineTo(...nodes[index]);
          ctx.moveTo(...nodes[index]); ctx.lineTo(...nodes[index % 6 + 1]);
        }
        ctx.globalAlpha = meshProgress; ctx.stroke();
        nodes.forEach((point, index) => {
          const busy = incident.index >= 0 && incident.ms > 1100 && incident.ms < 1900;
          const pulse = busy ? 0.6 + 0.4 * Math.sin(time * 0.03 + index) : 0.75 + 0.25 * Math.sin(time * 0.004 + index * 1.3);
          ctx.globalAlpha = meshProgress * pulse; ctx.fillStyle = "#fff"; ctx.fillRect(point[0] - 2.5, point[1] - 2.5, 5, 5);
        });
        ctx.globalAlpha = 1;
      }
    } });
    draws.sort((a, b) => a.depth - b.depth).forEach(({ draw }) => draw());

    const labelAlpha = staticScene ? 1 : clamp((elapsed - 2100) / 450);
    ctx.lineWidth = 1; ctx.textBaseline = "middle";
    this.platforms.forEach((platform, index) => {
      const [labelX, labelY, offsetX, offsetY] = platform.label;
      const start = this.project(positions[index][0] + labelX, positions[index][1] + labelY, positions[index][2] + 0.3);
      const end: Point = this.width < 520
        ? index === 0
          ? [this.width * 0.05, 18]
          : index === 1
            ? [this.width * 0.95, 18]
            : [this.width * 0.06, clamp(this.height * 0.72, 16, this.height - 16)]
        : index === 2
          ? [this.width * 0.06, clamp(this.height * 0.72, 16, this.height - 16)]
          : [start[0] + this.scale * offsetX, clamp(start[1] + this.scale * offsetY, 16, this.height - 16)];
      ctx.globalAlpha = labelAlpha; ctx.strokeStyle = this.colors.outline;
      ctx.beginPath(); ctx.moveTo(...start); ctx.lineTo(...end); ctx.stroke();
      ctx.fillStyle = FAMILY_COLORS[platform.family]; ctx.fillRect(end[0] - 3, end[1] - 3, 6, 6);
      ctx.font = `500 10.5px ${this.monoFamily}`; ctx.fillStyle = this.colors.ink;
      const label = `0${index + 1}  ${["BUSINESS", "INFRASTRUCTURE", "SECURITY"][platform.family]}`;
      const labelWidth = ctx.measureText(label).width;
      const alignRight = end[0] + 8 + labelWidth > this.width - 6;
      ctx.textAlign = alignRight ? "right" : "left";
      const textX = alignRight ? end[0] - 8 : end[0] + 8;
      ctx.fillText(label, textX, end[1]);
      const labelLeft = alignRight ? textX - labelWidth : textX;
      this.hitZones.push({
        index,
        points: [[labelLeft - 8, end[1] - 12], [labelLeft + labelWidth + 8, end[1] - 12], [labelLeft + labelWidth + 8, end[1] + 12], [labelLeft - 8, end[1] + 12]],
      });
    });
    if (hubAlpha > 0) {
      const start = this.project(0, 0, hubTop + 0.1);
      const end: Point = [start[0], start[1] - this.scale * 1.5];
      ctx.globalAlpha = hubAlpha; ctx.strokeStyle = this.colors.outline;
      ctx.beginPath(); ctx.moveTo(...start); ctx.lineTo(...end); ctx.stroke();
      this.tag(end[0], end[1], "ResOC", this.colors.ink, "#fff");
    }
    if (meshProgress > 0) {
      const start = this.project(-0.9, 0.9, hubTop);
      const end: Point = [start[0] - this.scale * 2.6, start[1] + this.scale * 1.4];
      ctx.globalAlpha = meshProgress; ctx.strokeStyle = this.colors.outline;
      ctx.beginPath(); ctx.moveTo(...start); ctx.lineTo(end[0] + this.scale * 0.6, end[1]); ctx.lineTo(...end); ctx.stroke();
      ctx.font = `500 10.5px ${this.monoFamily}`; ctx.fillStyle = accent; ctx.textAlign = "right";
      ctx.fillText("AGENT MESH", end[0] - 6, end[1]);
    }
    ctx.globalAlpha = 1;
  }

  private drawRing(x: number, y: number, z: number, radius: number) {
    this.ctx.beginPath();
    for (let index = 0; index <= 40; index++) {
      const angle = index / 40 * Math.PI * 2;
      const point = this.project(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius, z);
      index ? this.ctx.lineTo(...point) : this.ctx.moveTo(...point);
    }
    this.ctx.stroke();
  }
}

export function ResocIsometricVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const scene = new IsometricHeroScene(canvas, ctx);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let dpr = 1;
    let visible = false;
    let running = false;
    let elapsed = 0;
    let lastFrame = 0;
    let animationFrame = 0;
    let pointerStart: { x: number; y: number; time: number } | null = null;
    let reducedMotionSequence = false;
    let reducedMotionAutoplayed = false;

    const draw = (time: number, animate: boolean) => {
      if (!width || !height) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      scene.render(time, animate ? elapsed : 1e9, !animate);
    };

    const tick = (time: number) => {
      if (!running) return;
      if (lastFrame) elapsed += Math.min(48, time - lastFrame);
      lastFrame = time;
      draw(time, true);
      if (reducedMotionSequence && elapsed >= 3600) {
        running = false;
        reducedMotionSequence = false;
        lastFrame = 0;
        draw(time, false);
        return;
      }
      animationFrame = window.requestAnimationFrame(tick);
    };

    const updateMotion = () => {
      if (reducedMotion.matches && visible && !reducedMotionAutoplayed) {
        reducedMotionSequence = true;
        reducedMotionAutoplayed = true;
      }
      const shouldRun = visible && !document.hidden && (!reducedMotion.matches || reducedMotionSequence);
      if (shouldRun && !running) {
        running = true;
        lastFrame = 0;
        animationFrame = window.requestAnimationFrame(tick);
      } else if (!shouldRun && running) {
        running = false;
        window.cancelAnimationFrame(animationFrame);
        lastFrame = 0;
      }
      if (reducedMotion.matches && !reducedMotionSequence && reducedMotionAutoplayed) draw(0, false);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      scene.resize(width, height);
      const shouldDrawMotion = running || !reducedMotion.matches || reducedMotionSequence || !reducedMotionAutoplayed;
      draw(performance.now(), shouldDrawMotion);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = canvas.getBoundingClientRect();
      scene.setPointer(event.clientX - bounds.left, event.clientY - bounds.top);
    };
    const replay = () => {
      elapsed = 0;
      lastFrame = 0;
      if (reducedMotion.matches) {
        reducedMotionSequence = true;
        reducedMotionAutoplayed = true;
        if (visible && !document.hidden) {
          running = true;
          animationFrame = window.requestAnimationFrame(tick);
        }
        return;
      }
      reducedMotionSequence = false;
      if (visible && !document.hidden) updateMotion();
      else draw(0, false);
    };
    const onPointerDown = (event: PointerEvent) => {
      pointerStart = { x: event.clientX, y: event.clientY, time: performance.now() };
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!pointerStart) return;
      const moved = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
      const duration = performance.now() - pointerStart.time;
      pointerStart = null;
      if (moved < 12 && duration < 650) {
        const bounds = canvas.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        scene.setPointer(event.pointerType === "touch" ? null : x, y);
        const selected = scene.hitTest(x, y);
        if (selected >= 0) {
          scene.selectPlatform(selected);
          if (reducedMotion.matches && !running) draw(performance.now(), false);
        } else {
          replay();
        }
      }
    };
    const onPointerCancel = () => { pointerStart = null; };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        replay();
      }
    };
    const onPointerLeave = () => scene.setPointer(null);
    const onVisibilityChange = () => updateMotion();
    const onMotionPreferenceChange = () => updateMotion();
    const themeObserver = new MutationObserver(() => {
      scene.refreshColors();
      draw(performance.now(), running);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    if (document.body) themeObserver.observe(document.body, { attributes: true, attributeFilter: ["class", "data-theme"] });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateMotion();
    }, { threshold: 0.12, rootMargin: "48px 0px" });
    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerCancel);
    canvas.addEventListener("keydown", onKeyDown);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onMotionPreferenceChange);
    resize();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      canvas.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="home-hero__isometric-canvas"
      role="button"
      tabIndex={0}
      aria-label="ResOC isometric animation. Select a business, infrastructure, or security platform to lift it, or activate an empty area to replay the scene."
    >
      Business, infrastructure, and security platforms connect to the ResOC hub through Agent Mesh.
    </canvas>
  );
}
