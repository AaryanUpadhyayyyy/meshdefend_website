"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface AgentSilhouetteProps {
  width?: number;
  height?: number;
  className?: string;
  activePillar?: number; // 0: Discovery, 1: Reasoning, 2: Policy-Bound
  hideOverlays?: boolean;
}

export function AgentSilhouette({
  width = 460,
  height = 520,
  className = "",
  activePillar = 0,
  hideOverlays = false,
}: AgentSilhouetteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // ─── Continuous Clockwise Perimeter Contour of Human Silhouette ───
    const contour = [
      // Left shoulder base & slope
      { x: 0.06, y: 0.96 },
      { x: 0.12, y: 0.92 },
      { x: 0.19, y: 0.87 },
      { x: 0.27, y: 0.82 },
      { x: 0.34, y: 0.77 },
      // Left neck
      { x: 0.39, y: 0.71 },
      { x: 0.40, y: 0.63 },
      // Left jaw & chin
      { x: 0.41, y: 0.55 },
      { x: 0.43, y: 0.49 },
      // Left cheek & temple
      { x: 0.38, y: 0.42 },
      { x: 0.35, y: 0.34 },
      { x: 0.34, y: 0.25 },
      { x: 0.36, y: 0.18 },
      { x: 0.41, y: 0.12 },
      { x: 0.46, y: 0.085 },
      // Crown Apex
      { x: 0.50, y: 0.075 },
      // Right skull & temple
      { x: 0.54, y: 0.085 },
      { x: 0.59, y: 0.12 },
      { x: 0.64, y: 0.18 },
      { x: 0.66, y: 0.25 },
      { x: 0.65, y: 0.34 },
      // Right cheek & jaw
      { x: 0.62, y: 0.42 },
      { x: 0.57, y: 0.49 },
      { x: 0.59, y: 0.55 },
      // Right neck
      { x: 0.60, y: 0.63 },
      { x: 0.61, y: 0.71 },
      // Right shoulder slope & base
      { x: 0.66, y: 0.77 },
      { x: 0.73, y: 0.82 },
      { x: 0.81, y: 0.87 },
      { x: 0.88, y: 0.92 },
      { x: 0.94, y: 0.96 },
    ];

    // Helper: test if point is inside the humanoid silhouette
    const isInsideSilhouette = (px: number, py: number) => {
      // Head
      if (py >= 0.08 && py <= 0.55) {
        const dx = Math.abs(px - 0.50);
        const maxDistX = py < 0.25 ? 0.16 : 0.15 - (py - 0.25) * 0.15;
        return dx <= maxDistX;
      }
      // Neck
      if (py > 0.55 && py <= 0.72) {
        return Math.abs(px - 0.50) <= 0.11;
      }
      // Shoulders / Torso
      if (py > 0.72 && py <= 0.98) {
        const shoulderSpread = 0.11 + (py - 0.72) * 1.5;
        return Math.abs(px - 0.50) <= shoulderSpread;
      }
      return false;
    };

    // ─── Generate Interior Nebula Particles strictly inside the body ───
    interface Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      speed: number;
      offset: number;
      isCore: boolean;
    }

    const interiorParticles: Particle[] = [];
    const TOTAL_PARTICLES = 220;

    let attempts = 0;
    while (interiorParticles.length < TOTAL_PARTICLES && attempts < 2000) {
      attempts++;
      const rx = 0.05 + Math.random() * 0.90;
      const ry = 0.08 + Math.random() * 0.88;
      if (isInsideSilhouette(rx, ry)) {
        const isCore = ry <= 0.38 && Math.abs(rx - 0.50) <= 0.12;
        interiorParticles.push({
          x: rx,
          y: ry,
          baseX: rx,
          baseY: ry,
          vx: (Math.random() - 0.5) * 0.0006,
          vy: (Math.random() - 0.5) * 0.0006,
          radius: isCore ? (Math.random() > 0.8 ? 2.2 : 1.4) : (Math.random() > 0.85 ? 1.8 : 1.1),
          alpha: 0.2 + Math.random() * 0.65,
          speed: 0.02 + Math.random() * 0.04,
          offset: Math.random() * Math.PI * 2,
          isCore,
        });
      }
    }

    let time = 0;
    let animId = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.025;

      const orange = "244, 85, 50";
      const amber = "255, 130, 70";

      // ─── 1. ATMOSPHERIC COGNITIVE GLOW (Behind the head) ───
      const headX = width * 0.50;
      const headY = height * 0.26;
      const glowPulse = 1 + Math.sin(time * 1.2) * 0.08;

      const gradHead = ctx.createRadialGradient(
        headX, headY, 10,
        headX, headY, width * 0.42 * glowPulse
      );
      gradHead.addColorStop(0, `rgba(${orange}, 0.22)`);
      gradHead.addColorStop(0.35, `rgba(${orange}, 0.09)`);
      gradHead.addColorStop(0.7, `rgba(${orange}, 0.03)`);
      gradHead.addColorStop(1, "transparent");
      ctx.fillStyle = gradHead;
      ctx.fillRect(0, 0, width, height);

      // ─── 2. UPWARD NEURAL SCAN / ENERGY WAVE ───
      // A luminous energy wave traveling upwards through the body
      const scanPhase = (time * 0.25) % 1.2;
      const scanY = height * (1.05 - scanPhase * 0.95);

      // ─── 3. INTERIOR CONSTELLATION MESH (NEURAL CONNECTIONS) ───
      ctx.lineWidth = 0.7;
      for (let i = 0; i < interiorParticles.length; i += 2) {
        const p1 = interiorParticles[i];
        for (let j = i + 1; j < Math.min(i + 7, interiorParticles.length); j++) {
          const p2 = interiorParticles[j];
          const dx = (p1.x - p2.x) * width;
          const dy = (p1.y - p2.y) * height;
          const dist = Math.hypot(dx, dy);

          const maxDist = p1.isCore || p2.isCore ? 52 : 38;
          if (dist < maxDist) {
            // Neural pulse intensity based on distance and scanwave proximity
            const distRatio = 1 - dist / maxDist;
            const midY = (p1.y + p2.y) * 0.5 * height;
            const scanDist = Math.abs(midY - scanY);
            const scanBoost = scanDist < 60 ? (1 - scanDist / 60) * 0.45 : 0;

            const alphaLine = Math.min(0.75, distRatio * 0.22 + scanBoost);
            ctx.strokeStyle = `rgba(${orange}, ${alphaLine})`;
            ctx.beginPath();
            ctx.moveTo(p1.x * width, p1.y * height);
            ctx.lineTo(p2.x * width, p2.y * height);
            ctx.stroke();
          }
        }
      }

      // ─── 4. INTERIOR PARTICLES & COGNITIVE FLASHES ───
      interiorParticles.forEach((p) => {
        // Natural gentle organic drift
        p.x = p.baseX + Math.sin(time * 0.8 + p.offset) * 0.006;
        p.y = p.baseY + Math.cos(time * 0.8 + p.offset) * 0.006;

        // Interaction with mouse if hovered
        if (mousePos) {
          const mdx = p.x * width - mousePos.x;
          const mdy = p.y * height - mousePos.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < 70) {
            const force = (1 - mDist / 70) * 0.015;
            p.x += (mdx / mDist) * force;
            p.y += (mdy / mDist) * force;
          }
        }

        const px = p.x * width;
        const py = p.y * height;

        // Scan wave glow boost
        const dScan = Math.abs(py - scanY);
        const scanBright = dScan < 45 ? (1 - dScan / 45) * 0.6 : 0;

        // Intrinsic pulse
        const pulse = Math.sin(time * p.speed * 50 + p.offset);
        const alpha = Math.min(1, Math.max(0.12, p.alpha + pulse * 0.25 + scanBright));

        // Core points glow brighter with white centers
        if (p.isCore && alpha > 0.55) {
          ctx.fillStyle = `rgba(${orange}, ${alpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(px, py, p.radius + 3.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255, 235, 225, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, p.radius * 0.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${orange}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // ─── 5. SMOOTH CONTINUOUS PERIMETER CONTOUR (ZERO ZIG-ZAG) ───
      ctx.save();
      ctx.beginPath();
      contour.forEach((pt, idx) => {
        const x = pt.x * width;
        const y = pt.y * height;
        if (idx === 0) {
          ctx.moveTo(x, y);
        } else {
          // Spline smooth midpoint interpolation
          const prev = contour[idx - 1];
          const prevX = prev.x * width;
          const prevY = prev.y * height;
          const midX = (prevX + x) / 2;
          const midY = (prevY + y) / 2;
          ctx.quadraticCurveTo(prevX, prevY, midX, midY);
        }
      });
      // Final segment to last point
      const last = contour[contour.length - 1];
      ctx.lineTo(last.x * width, last.y * height);

      // Crisp glowing stroke
      ctx.strokeStyle = `rgba(${orange}, 0.55)`;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Outer halo stroke
      ctx.strokeStyle = `rgba(${orange}, 0.18)`;
      ctx.lineWidth = 4.5;
      ctx.stroke();
      ctx.restore();

      // ─── 6. PERIMETER GLOWING BEADS ───
      contour.forEach((pt, idx) => {
        const px = pt.x * width;
        const py = pt.y * height;

        // Wave traveling around perimeter
        const beadPulse = Math.sin(time * 2.5 + idx * 0.35);
        const radius = 2.0 + (beadPulse > 0 ? beadPulse * 1.5 : 0);
        const beadAlpha = 0.65 + Math.sin(time * 2 + idx * 0.25) * 0.35;

        // Outer bloom
        ctx.fillStyle = `rgba(${orange}, ${beadAlpha * 0.38})`;
        ctx.beginPath();
        ctx.arc(px, py, radius + 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Core white-orange bead
        ctx.fillStyle = `rgba(255, 245, 240, ${beadAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, radius * 0.85, 0, Math.PI * 2);
        ctx.fill();
      });

      // ─── 7. ACTIVE PILLAR SPECIALIZED OVERLAY ───
      // Mode 0: Discovery (Radar rings radiating from crown)
      if (activePillar === 0) {
        const ringRadius = ((time * 30) % (width * 0.32));
        const ringAlpha = (1 - ringRadius / (width * 0.32)) * 0.45;
        ctx.save();
        ctx.strokeStyle = `rgba(${orange}, ${ringAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(headX, headY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      // Mode 1: Reasoning (Brain cognitive nexus glowing intensely)
      else if (activePillar === 1) {
        const nexusPulse = 1 + Math.sin(time * 4) * 0.2;
        const nexusGrad = ctx.createRadialGradient(
          headX, headY * 0.85, 4,
          headX, headY * 0.85, 48 * nexusPulse
        );
        nexusGrad.addColorStop(0, `rgba(${amber}, 0.55)`);
        nexusGrad.addColorStop(0.5, `rgba(${orange}, 0.2)`);
        nexusGrad.addColorStop(1, "transparent");
        ctx.fillStyle = nexusGrad;
        ctx.beginPath();
        ctx.arc(headX, headY * 0.85, 48 * nexusPulse, 0, Math.PI * 2);
        ctx.fill();
      }
      // Mode 2: Policy-Bound (Cryptographic perimeter security aura)
      else if (activePillar === 2) {
        ctx.save();
        ctx.strokeStyle = `rgba(${orange}, 0.55)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 6]);
        ctx.strokeRect(width * 0.16, height * 0.05, width * 0.68, height * 0.88);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [width, height, mousePos, activePillar]);

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />

      {/* Cybernetic HUD Overlays */}
      {!hideOverlays && (
        <>
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 18,
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10,
              color: "rgba(254, 253, 253, 0.75)",
              letterSpacing: "0.08em",
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(34, 31, 34, 0.6)",
              padding: "4px 10px",
              borderRadius: 4,
              border: "1px solid rgba(244, 85, 50, 0.25)",
              backdropFilter: "blur(6px)",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--orange)",
                boxShadow: "0 0 6px var(--orange)",
                display: "inline-block",
              }}
            />
            <span>AGENT MESH™ CORE v2.4</span>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 18,
              fontFamily: "var(--font-mono), monospace",
              fontSize: 9.5,
              color: "rgba(254, 253, 253, 0.65)",
              letterSpacing: "0.06em",
              background: "rgba(34, 31, 34, 0.55)",
              padding: "4px 8px",
              borderRadius: 3,
              border: "1px solid rgba(254, 253, 253, 0.1)",
              pointerEvents: "none",
            }}
          >
            REASONING: DETERMINISTIC
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 16,
              right: 18,
              fontFamily: "var(--font-mono), monospace",
              fontSize: 9.5,
              color: "rgba(244, 85, 50, 0.85)",
              letterSpacing: "0.06em",
              background: "rgba(34, 31, 34, 0.55)",
              padding: "4px 8px",
              borderRadius: 3,
              border: "1px solid rgba(244, 85, 50, 0.25)",
              pointerEvents: "none",
            }}
          >
            HUMAN GATE: ENFORCED
          </div>
        </>
      )}

      {/* Cybernetic Corner Accents */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          width: 14,
          height: 14,
          borderTop: "2px solid rgba(244, 85, 50, 0.4)",
          borderLeft: "2px solid rgba(244, 85, 50, 0.4)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 14,
          height: 14,
          borderTop: "2px solid rgba(244, 85, 50, 0.4)",
          borderRight: "2px solid rgba(244, 85, 50, 0.4)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 8,
          width: 14,
          height: 14,
          borderBottom: "2px solid rgba(244, 85, 50, 0.4)",
          borderLeft: "2px solid rgba(244, 85, 50, 0.4)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          width: 14,
          height: 14,
          borderBottom: "2px solid rgba(244, 85, 50, 0.4)",
          borderRight: "2px solid rgba(244, 85, 50, 0.4)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
