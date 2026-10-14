"use client";

import { useEffect, useRef, useState } from "react";

interface MeshNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  isOrange: boolean;
  pulsePhase: number;
  pulseSpeed: number;
}

interface SignalPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  alpha: number;
}

interface AmbientDust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  phase: number;
}

interface MeshDefendBackgroundProps {
  variant?: "hero" | "subtle";
  density?: "normal" | "sparse";
}

export function MeshDefendBackground({
  variant = "hero",
  density = "normal",
}: MeshDefendBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // Pause rendering when offscreen for high efficiency
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let nodes: MeshNode[] = [];
    let packets: SignalPacket[] = [];
    let dustParticles: AmbientDust[] = [];

    const initSimulation = () => {
      nodes = [];
      packets = [];
      dustParticles = [];

      const isMobile = width < 768;
      const isSubtle = variant === "subtle";
      const isSparse = density === "sparse" || isSubtle;

      const nodeCount = isMobile ? (isSparse ? 18 : 32) : (isSparse ? 36 : 68);
      const dustCount = isMobile ? (isSparse ? 20 : 28) : (isSparse ? 42 : 58);

      // 1. Initialize Defensive Mesh Nodes
      for (let i = 0; i < nodeCount; i++) {
        const isOrange = Math.random() < 0.35; // ~35% warm brand orange
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.28),
          vy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.28),
          radius: isOrange ? (isSubtle ? 1.8 + Math.random() : 2.2 + Math.random() * 1.3) : 1.5 + Math.random(),
          baseAlpha: isSubtle
            ? (isOrange ? 0.25 + Math.random() * 0.2 : 0.12 + Math.random() * 0.15)
            : (isOrange ? 0.35 + Math.random() * 0.35 : 0.18 + Math.random() * 0.22),
          isOrange,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02,
        });
      }

      // 2. Initialize Ambient Orange Dust Particles (floating depth field)
      for (let d = 0; d < dustCount; d++) {
        const baseAlpha = isSubtle
          ? 0.12 + Math.random() * 0.25
          : 0.15 + Math.random() * 0.35;
        dustParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.16,
          vy: -0.10 - Math.random() * 0.22, // Slow upward ambient drift
          size: 1.0 + Math.random() * (isSubtle ? 1.4 : 1.8),
          alpha: baseAlpha,
          baseAlpha,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initSimulation();
    };

    resize();
    window.addEventListener("resize", resize);

    // Subtle mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const maxDist = width < 768 ? 90 : (variant === "subtle" ? 120 : 140);
    const maxDistSq = maxDist * maxDist;

    let tick = 0;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      tick++;
      ctx.clearRect(0, 0, width, height);

      // Determine theme colors dynamically
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark" ||
        document.body.classList.contains("dark");

      const inkRgb = isDark ? "254, 253, 253" : "34, 31, 34";
      const orangeRgb = "244, 85, 50";
      const isSubtle = variant === "subtle";

      // ─── 1. RENDER AMBIENT ORANGE DUST FIELD (Depth) ───
      for (let i = 0; i < dustParticles.length; i++) {
        const p = dustParticles[i];

        if (!reducedMotion) {
          p.x += p.vx + Math.sin(tick * 0.015 + p.phase) * 0.08;
          p.y += p.vy;

          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        p.alpha = p.baseAlpha * (0.65 + 0.35 * Math.sin(tick * 0.02 + p.phase));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${orangeRgb}, ${p.alpha})`;
        ctx.fill();
      }

      // ─── 2. UPDATE & DRAW MESH CONNECTIONS (Hairline Defend Mesh) ───
      const mouse = mouseRef.current;
      const mouseRangeSq = 120 * 120;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!reducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 15) { n.x = 15; n.vx *= -1; }
          else if (n.x > width - 15) { n.x = width - 15; n.vx *= -1; }
          if (n.y < 15) { n.y = 15; n.vy *= -1; }
          else if (n.y > height - 15) { n.y = height - 15; n.vy *= -1; }

          if (mouse.active) {
            const dx = n.x - mouse.x;
            const dy = n.y - mouse.y;
            const dSq = dx * dx + dy * dy;
            if (dSq < mouseRangeSq && dSq > 0) {
              const d = Math.sqrt(dSq);
              const force = (1 - d / 120) * 0.6;
              n.x += (dx / d) * force;
              n.y += (dy / d) * force;
            }
          }
        }

        n.pulsePhase += n.pulseSpeed;
      }

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dSq = dx * dx + dy * dy;

          if (dSq < maxDistSq) {
            const d = Math.sqrt(dSq);
            const factor = Math.pow(1 - d / maxDist, 1.4);

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);

            if (n1.isOrange || n2.isOrange) {
              const alpha = factor * (isSubtle ? 0.12 : 0.18);
              ctx.strokeStyle = `rgba(${orangeRgb}, ${alpha})`;
              ctx.lineWidth = 0.8;
            } else {
              const alpha = factor * (isSubtle ? 0.07 : 0.10);
              ctx.strokeStyle = `rgba(${inkRgb}, ${alpha})`;
              ctx.lineWidth = 0.65;
            }
            ctx.stroke();

            // Occasional signal pulse
            if (!reducedMotion && !isSubtle && Math.random() < 0.0003 && packets.length < 6) {
              packets.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: 0.008 + Math.random() * 0.012,
                alpha: 0.75,
              });
            }
          }
        }
      }

      // ─── 3. RENDER SIGNAL PACKETS (Telemetry Pulses) ───
      for (let pIdx = packets.length - 1; pIdx >= 0; pIdx--) {
        const pkt = packets[pIdx];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(pIdx, 1);
          continue;
        }

        const nA = nodes[pkt.fromNode];
        const nB = nodes[pkt.toNode];
        if (!nA || !nB) {
          packets.splice(pIdx, 1);
          continue;
        }

        const px = nA.x + (nB.x - nA.x) * pkt.progress;
        const py = nA.y + (nB.y - nA.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${orangeRgb}, ${pkt.alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${orangeRgb}, ${pkt.alpha * 0.22})`;
        ctx.fill();
      }

      // ─── 4. RENDER MESH NODES (Defensive Nodes) ───
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = Math.sin(n.pulsePhase);
        const currentAlpha = n.baseAlpha * (0.8 + 0.2 * pulse);
        const currentRadius = n.radius * (0.92 + 0.08 * pulse);

        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);

        if (n.isOrange) {
          ctx.fillStyle = `rgba(${orangeRgb}, ${currentAlpha})`;
          ctx.fill();

          if (!isSubtle) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, currentRadius * 2.0, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${orangeRgb}, ${currentAlpha * 0.14})`;
            ctx.fill();
          }
        } else {
          ctx.fillStyle = `rgba(${inkRgb}, ${currentAlpha})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [variant, density, reducedMotion]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {/* ─── LAYER 1: AMBIENT VIGNETTE GLOW ─── */}
      {variant === "hero" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle 700px at 78% 22%, rgba(244, 85, 50, 0.045) 0%, transparent 70%),
              radial-gradient(circle 500px at 15% 35%, rgba(244, 85, 50, 0.02) 0%, transparent 60%)
            `,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ─── LAYER 2: INTERACTIVE DEFENSE MESH & DUST CANVAS ─── */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          pointerEvents: "none",
        }}
      />

      {/* ─── LAYER 3: SEAMLESS BOTTOM FADE TO PAGE ─── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 140,
          background: "linear-gradient(to bottom, transparent, var(--bg))",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
