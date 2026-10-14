"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { AGENT_MESH } from "@/lib/content";
import { TextReveal } from "@/components/ui/TextReveal";

/* ─── Procedural 3D Point Generation for the Human Bust + Dust Field ─── */
interface Point3D {
  x: number;
  y: number;
  z: number;
  nx: number;
  ny: number;
  nz: number;
  fresnel: number;
  baseAlpha: number;
  size: number;
}

interface DustParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
}

/**
 * Procedurally sample ~14,000 points on the surface of a human bust (head, neck, shoulders).
 * Uses analytical normals to compute exact Fresnel silhouette rim-lighting.
 */
function generateBustPoints(count: number): Point3D[] {
  const points: Point3D[] = [];

  // 1. Head (Superellipsoid with anatomical jaw taper) — 65% of points
  const headCount = Math.floor(count * 0.65);
  const headRx = 92;
  const headRy = 124;
  const headRz = 100;

  for (let i = 0; i < headCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0) - Math.PI / 2.0;

    let rx = headRx;
    let rz = headRz;
    if (phi < 0) {
      const taper = 1.0 + 0.32 * Math.sin(phi);
      rx *= taper;
      rz *= taper;
    }

    let px = rx * Math.cos(phi) * Math.sin(theta);
    let py = headRy * Math.sin(phi) + 72;
    let pz = rz * Math.cos(phi) * Math.cos(theta);

    if (py > 72) {
      px *= 1.02;
      pz *= 1.04;
    }

    const nx = px / (rx * rx);
    const ny = (py - 72) / (headRy * headRy);
    const nz = pz / (rz * rz);
    const len = Math.hypot(nx, ny, nz) || 1;
    const nnx = nx / len;
    const nny = ny / len;
    const nnz = nz / len;

    const fresnel = Math.pow(1.0 - Math.min(1.0, Math.abs(nnz)), 2.2);
    const jitter = (Math.random() - 0.5) * 2.2;
    px += nnx * jitter;
    py += nny * jitter;
    pz += nnz * jitter;

    const baseAlpha = 0.08 + fresnel * 0.88;
    const size = fresnel > 0.65 ? 1.8 : 1.2;

    points.push({
      x: px,
      y: py,
      z: pz,
      nx: nnx,
      ny: nny,
      nz: nnz,
      fresnel,
      baseAlpha,
      size,
    });
  }

  // 2. Neck (Tapered Cylinder) — 12% of points
  const neckCount = Math.floor(count * 0.12);
  for (let i = 0; i < neckCount; i++) {
    const t = Math.random();
    const py = -10 - t * 65;
    const rNeck = 44 + t * 8;
    const theta = Math.random() * 2.0 * Math.PI;

    const px = rNeck * Math.sin(theta);
    const pz = (rNeck * 0.92) * Math.cos(theta);

    const nnx = Math.sin(theta);
    const nny = 0.1;
    const nnz = Math.cos(theta);
    const fresnel = Math.pow(1.0 - Math.min(1.0, Math.abs(nnz)), 2.0);
    const baseAlpha = 0.09 + fresnel * 0.86;

    points.push({
      x: px,
      y: py,
      z: pz,
      nx: nnx,
      ny: nny,
      nz: nnz,
      fresnel,
      baseAlpha,
      size: fresnel > 0.6 ? 1.7 : 1.2,
    });
  }

  // 3. Shoulders and Trapezius / Upper Torso — 23% of points
  const shoulderCount = count - headCount - neckCount;
  for (let i = 0; i < shoulderCount; i++) {
    const t = Math.random();
    const py = -75 - t * 145;
    const theta = Math.random() * 2.0 * Math.PI;

    const spreadX = 52 + Math.pow(t, 1.15) * 250;
    const spreadZ = 40 + t * 48;

    const px = spreadX * Math.sin(theta);
    const pz = spreadZ * Math.cos(theta);

    const nnx = Math.sin(theta) * 0.9;
    const nny = -0.35;
    const nnz = Math.cos(theta) * 0.8;
    const len = Math.hypot(nnx, nny, nnz) || 1;
    const fresnel = Math.pow(1.0 - Math.min(1.0, Math.abs(nnz / len)), 1.9);
    const baseAlpha = 0.08 + fresnel * 0.85;

    points.push({
      x: px,
      y: py,
      z: pz,
      nx: nnx / len,
      ny: nny / len,
      nz: nnz / len,
      fresnel,
      baseAlpha,
      size: fresnel > 0.65 ? 1.8 : 1.2,
    });
  }

  return points;
}

/**
 * Generate 3,000 Depth Dust Particles for ambient field drift
 */
function generateDust(count: number, width: number, height: number): DustParticle[] {
  const dust: DustParticle[] = [];
  for (let i = 0; i < count; i++) {
    const z = (Math.random() - 0.5) * 400;
    const isForeground = z > 60;
    dust.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18 - 0.05,
      vz: (Math.random() - 0.5) * 0.1,
      size: isForeground ? 2.2 : 1.1,
      alpha: isForeground ? 0.22 + Math.random() * 0.18 : 0.06 + Math.random() * 0.10,
    });
  }
  return dust;
}

export function AgentMeshSection() {
  const [activeBeat, setActiveBeat] = useState<0 | 1 | 2>(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bustPointsRef = useRef<Point3D[]>([]);
  const dustParticlesRef = useRef<DustParticle[]>([]);

  // Check reduced motion & breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      mq.removeEventListener("change", handler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Parallax mouse movement handler (capped at max 12px)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({
      x: normX * 12,
      y: normY * 12,
    });
  }, []);

  // ─── High-Performance WebGL/Canvas Particle Renderer ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const bustPointCount = isMobile ? 5500 : 14000;
    const dustCount = isMobile ? 1200 : 3000;
    bustPointsRef.current = generateBustPoints(bustPointCount);

    const resize = () => {
      if (!sectionRef.current) return;
      width = sectionRef.current.clientWidth;
      height = sectionRef.current.clientHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      dustParticlesRef.current = generateDust(dustCount, width, height);
    };

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // ─── 1. RENDER DUST FIELD ───
      const dust = dustParticlesRef.current;
      for (let i = 0; i < dust.length; i++) {
        const d = dust[i];
        if (!reducedMotion) {
          d.x += d.vx + Math.sin(time * 0.4 + d.y * 0.008) * 0.15;
          d.y += d.vy + Math.cos(time * 0.4 + d.x * 0.008) * 0.10;
          d.z += d.vz;

          if (d.x < 0) d.x = width;
          if (d.x > width) d.x = 0;
          if (d.y < 0) d.y = height;
          if (d.y > height) d.y = 0;
          if (d.z < -200) d.z = 200;
          if (d.z > 200) d.z = -200;
        }

        const depthFactor = (d.z + 200) / 400;
        const px = d.x + mouseOffset.x * depthFactor * 0.8;
        const py = d.y + mouseOffset.y * depthFactor * 0.8;

        ctx.fillStyle = `rgba(254, 253, 253, ${d.alpha})`;
        ctx.fillRect(px, py, d.size, d.size);
      }

      // ─── 2. RENDER THE HUMAN BUST (Positioned at 70% from left to give left content ample space) ───
      const bust = bustPointsRef.current;
      const bustCenterX = width * (isMobile ? 0.50 : 0.70) + mouseOffset.x;
      const bustCenterY = height * (isMobile ? 0.38 : 0.46) + mouseOffset.y;
      const scale = isMobile ? Math.min(width / 360, 1.05) : Math.min(height / 480, 1.45) * 1.35;

      for (let i = 0; i < bust.length; i++) {
        const p = bust[i];

        const rotY = mouseOffset.x * 0.01;
        const cosR = Math.cos(rotY);
        const sinR = Math.sin(rotY);

        const rx = p.x * cosR - p.z * sinR;

        const sx = bustCenterX + rx * scale;
        const sy = bustCenterY - p.y * scale;

        if (sx < -10 || sx > width + 10 || sy < -10 || sy > height + 20) continue;

        ctx.fillStyle = `rgba(254, 253, 253, ${p.baseAlpha})`;
        ctx.fillRect(sx, sy, p.size, p.size);
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [isMobile, reducedMotion, mouseOffset]);

  return (
    <section
      id="agent-mesh"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        background: `
          radial-gradient(circle at 70% 42%, #2a2629 0%, #221f22 66%),
          #221f22
        `,
        color: "#fefdfd",
        position: "relative",
        padding: "64px 0 56px",
        overflow: "hidden",
      }}
    >
      {/* ─── FULL-BLEED PARTICLE CANVAS (Bust + Dust Field) ─── */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ─── CONTENT CONTAINER SHIFTED TO THE LEFT WITH GENEROUS BREATHING ROOM ─── */}
      <div
        style={{
          width: "100%",
          maxWidth: "1480px",
          marginInline: "auto",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "5.5fr 6.5fr",
            gap: isMobile ? 32 : 48,
            alignItems: "center",
          }}
        >
          {/* ─── LEFT COLUMN: Headline, 1 sentence, and 3 Beats List ─── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 560 }}>
            {/* Display Headline: Locked to 2 Clean Lines */}
            <div className="reveal-on-scroll">
              <h2
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "clamp(38px, 4.2vw, 60px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                  color: "#fefdfd",
                  margin: "0 0 14px",
                }}
              >
                <TextReveal
                  as="span"
                  text="The intelligence to act."
                  style={{ display: "block" }}
                  delay={0}
                  stagger={0.045}
                />
                <TextReveal
                  as="span"
                  text="The discipline to stop."
                  style={{
                    color: "#f45532",
                    fontStyle: "italic",
                    display: "block",
                  }}
                  delay={0.2}
                  stagger={0.045}
                />
              </h2>

              <p
                className="text-blur-in"
                style={{
                  fontFamily: "var(--font-body), Inter, sans-serif",
                  fontSize: 15.5,
                  lineHeight: 1.55,
                  color: "#a09a9c",
                  margin: 0,
                  maxWidth: 500,
                  transitionDelay: "0.38s",
                }}
              >
                Agent Mesh™ connects the evidence, recommends the next step, and waits for a person to approve it before anything changes.
              </p>
            </div>

            {/* Vertical Beats List with 1px Progress Rail (Compact Spacing) */}
            <div
              className="reveal-on-scroll reveal-delay-1"
              style={{
                position: "relative",
                paddingLeft: 20,
                display: "flex",
                flexDirection: "column",
                gap: 22,
                marginTop: 4,
              }}
            >
              {/* 1px Vertical Progress Rail */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 6,
                  bottom: 6,
                  width: 1,
                  background: "rgba(254, 253, 253, 0.15)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: activeBeat === 0 ? "0%" : activeBeat === 1 ? "33%" : "66%",
                    height: "34%",
                    width: 1,
                    background: "#f45532",
                    transition: "top 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                />
              </div>

              {/* BEAT 1: LEARN */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <button
                  type="button"
                  className="beat-btn"
                  onClick={() => setActiveBeat(0)}
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    WebkitTapHighlightColor: "transparent",
                    padding: 0,
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 38,
                    lineHeight: 1.1,
                    color: activeBeat === 0 ? "#fefdfd" : "rgba(254, 253, 253, 0.35)",
                    transition: "color 0.22s ease",
                  }}
                >
                  Learn
                </button>
                {activeBeat === 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <p
                      style={{
                        fontFamily: "var(--font-body), Inter, sans-serif",
                        fontSize: 15,
                        lineHeight: 1.5,
                        color: "#e5e2e3",
                        margin: 0,
                        maxWidth: 480,
                      }}
                    >
                      Agents map your backup, storage, application, security, ITSM and cloud tools. They read; they change nothing.
                    </p>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11.5,
                        color: "#d5d2d3",
                        letterSpacing: "0.04em",
                      }}
                    >
                      OBSERVES · NO CHANGES
                    </span>
                  </div>
                )}
              </div>

              {/* BEAT 2: REASON */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <button
                  type="button"
                  className="beat-btn"
                  onClick={() => setActiveBeat(1)}
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    WebkitTapHighlightColor: "transparent",
                    padding: 0,
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 38,
                    lineHeight: 1.1,
                    color: activeBeat === 1 ? "#fefdfd" : "rgba(254, 253, 253, 0.35)",
                    transition: "color 0.22s ease",
                  }}
                >
                  Reason
                </button>
                {activeBeat === 1 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <p
                      style={{
                        fontFamily: "var(--font-body), Inter, sans-serif",
                        fontSize: 15,
                        lineHeight: 1.5,
                        color: "#e5e2e3",
                        margin: 0,
                        maxWidth: 480,
                      }}
                    >
                      They join the signals, trace the cause and propose a fix, with the evidence attached.
                    </p>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11.5,
                        color: "#d5d2d3",
                        letterSpacing: "0.04em",
                      }}
                    >
                      RECOMMENDS · NO CHANGES
                    </span>
                  </div>
                )}
              </div>

              {/* BEAT 3: ACT */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <button
                  type="button"
                  className="beat-btn"
                  onClick={() => setActiveBeat(2)}
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    WebkitTapHighlightColor: "transparent",
                    padding: 0,
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 38,
                    lineHeight: 1.1,
                    color: activeBeat === 2 ? "#fefdfd" : "rgba(254, 253, 253, 0.35)",
                    transition: "color 0.22s ease",
                  }}
                >
                  Act
                </button>
                {activeBeat === 2 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <p
                      style={{
                        fontFamily: "var(--font-body), Inter, sans-serif",
                        fontSize: 15,
                        lineHeight: 1.5,
                        color: "#e5e2e3",
                        margin: 0,
                        maxWidth: 480,
                      }}
                    >
                      The approved step runs inside policy limits, and the result is saved as audit-ready evidence.
                    </p>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11.5,
                        color: "#f45532",
                        letterSpacing: "0.04em",
                      }}
                    >
                      REQUIRES HUMAN APPROVAL
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Stage Area for the Human Bust ─── */}
          <div
            style={{
              height: isMobile ? 320 : 460,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* The Bust renders directly onto the canvas behind this area */}
          </div>
        </div>
      </div>

      {/* ─── C) AFTER THE STAGE: 5 RESOC PILLARS AS A CALM TYPOGRAPHIC LIST ─── */}
      <div
        className="reveal-on-scroll"
        style={{
          width: "100%",
          maxWidth: "1480px",
          marginInline: "auto",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
          marginTop: 48,
          borderTop: "1px solid rgba(255, 255, 255, 0.14)",
          paddingTop: 36,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          className="reveal-stagger"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "28px 56px",
            marginBottom: 36,
          }}
        >
          {AGENT_MESH.pillars.map((pillar, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            return (
              <div
                key={pillar.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  paddingBottom: 18,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 18,
                    color: "rgba(254, 253, 253, 0.4)",
                  }}
                >
                  {num}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 26,
                    fontWeight: 400,
                    color: "#fefdfd",
                    margin: 0,
                    lineHeight: 1.15,
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 14.5,
                    lineHeight: 1.45,
                    color: "#a09a9c",
                    margin: 0,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Single Plain Closing Estate Sentence */}
        <p
          className="reveal-on-scroll reveal-delay-2"
          style={{
            fontFamily: "var(--font-body), Inter, sans-serif",
            fontSize: 13.5,
            color: "#a09a9c",
            margin: 0,
            textAlign: "center",
          }}
        >
          Works across on-prem, public cloud and hybrid estates.
        </p>
      </div>

      <style jsx global>{`
        .beat-btn,
        .beat-btn:focus,
        .beat-btn:active,
        .beat-btn:hover {
          outline: none !important;
          box-shadow: none !important;
          border: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        .beat-btn:focus-visible {
          outline: 2px solid #f45532 !important;
          outline-offset: 4px !important;
        }
      `}</style>
    </section>
  );
}
