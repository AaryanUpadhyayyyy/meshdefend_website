"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import shieldImage from "../../../../../public/images/incident-agent-shield.png";

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

interface IncidentPhase {
  id: string;
  time: string;
  title: string;
  tag: string;
  subtitle: string;
  detail: string;
  telemetry: { label: string; value: string }[];
  source: string;
  shieldStatus: string;
}

const PHASES: IncidentPhase[] = [
  {
    id: "detection",
    time: "T-00:00",
    title: "Raw Failure Signal",
    tag: "PHASE 01 // DETECTION",
    subtitle: "Veeam API socket timeout · payments-db job #1849",
    detail:
      "Backup job for Tier-1 database payments-db failed at volume snapshot step. Telemetry indicates connection reset after 180s timeout.",
    telemetry: [
      { label: "ENGINE", value: "Veeam Backup & Replication" },
      { label: "TARGET", value: "payments-db-primary (vol-094)" },
      { label: "ERROR", value: "ERR_STORAGE_BUSY_TIMEOUT" },
      { label: "SEVERITY", value: "Critical · Tier-1 Workload" },
    ],
    source: "Veeam Backup API",
    shieldStatus: "Anomaly Detected · Sentinel Alerted",
  },
  {
    id: "correlation",
    time: "T+00:14",
    title: "Signals Correlated",
    tag: "PHASE 02 // CORRELATION",
    subtitle: "3 telemetry streams converged upstream into one trace",
    detail:
      "MeshDefend correlation engine ingests storage telemetry, CMDB change records, and cloud latency metrics, linking disconnected alarms within 14 seconds.",
    telemetry: [
      { label: "FEED 1", value: "Dell DataDomain: Active lock handle on vol-094" },
      { label: "FEED 2", value: "ServiceNow CMDB: Change RFC-88421 multipath update at 01:50" },
      { label: "FEED 3", value: "Host Agent: Latency spike observed during path rebalance" },
    ],
    source: "Agent Mesh™ Correlation Bus",
    shieldStatus: "Correlation Matrix Synchronized",
  },
  {
    id: "isolation",
    time: "T+00:22",
    title: "Likely Cause Identified",
    tag: "PHASE 03 // ROOT CAUSE",
    subtitle: "Cause: Stale snapshot lock on SAN volume vol-094",
    detail:
      "Cross-platform root-cause isolated: The 01:50 multipath configuration update orphaned an active storage lock lease, blocking Veeam snapshot creation.",
    telemetry: [
      { label: "ROOT CAUSE", value: "Orphaned SAN volume lock handle" },
      { label: "CONFIDENCE", value: "96% match across 3 signals" },
      { label: "SOP REFERENCE", value: "Grounded in Runbook SOP-STR-042" },
      { label: "FALSE POSITIVE", value: "Zero storage hardware fault detected" },
    ],
    source: "Diagnostics & Lineage Model",
    shieldStatus: "Blast Radius Contained: SAN vol-094",
  },
  {
    id: "remediation",
    time: "T+00:45",
    title: "Remediation Plan Drafted",
    tag: "PHASE 04 // REMEDIATION",
    subtitle: "Targeted lock release & automated retry recipe staged",
    detail:
      "Safe remediation recipe formulated: Terminate expired storage volume lease handle on vol-094, verify path symmetry, and re-trigger incremental backup job.",
    telemetry: [
      { label: "COMMAND", value: "storage_array.release_lease('vol-094')" },
      { label: "RETRY ACTION", value: "veeam.retry_job('1849', mode='incremental')" },
      { label: "ROLLBACK", value: "Pre-staged automated rollback on failure" },
      { label: "WINDOW", value: "Within approved maintenance window" },
    ],
    source: "Policy-Bound Action Engine",
    shieldStatus: "Remediation Staged · Awaiting Human Gate",
  },
  {
    id: "authority",
    time: "T+00:48",
    title: "Paused for Human Approval",
    tag: "PHASE 05 // AUTHORITY GATE",
    subtitle: "Execution paused at vertical policy barrier line",
    detail:
      "MeshDefend draws an unbreachable structural line: State-changing storage operations require operator sign-off. The agent waits at the gate with full evidence assembled.",
    telemetry: [
      { label: "GATE STATUS", value: "Awaiting Operator Sign-off" },
      { label: "REQUIRED ROLE", value: "Backup Lead or Storage Admin" },
      { label: "AUTONOMY LEVEL", value: "Human-in-the-Loop (Policy #POL-089)" },
      { label: "RECORD", value: "Permanent audit timeline prepared" },
    ],
    source: "Structural Authority Gate",
    shieldStatus: "Authority Barrier Locked · Operator Sign-off Required",
  },
];

/**
 * Generate 2,500 Depth Dust Particles for cosmic ambient drift
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
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16 - 0.04,
      vz: (Math.random() - 0.5) * 0.1,
      size: isForeground ? 2.0 : 1.1,
      alpha: isForeground ? 0.22 + Math.random() * 0.18 : 0.05 + Math.random() * 0.08,
    });
  }
  return dust;
}

export function IncidentCanvasFold() {
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState<number>(4); // Default to Phase 05 (Authority Gate)
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dustRef = useRef<DustParticle[]>([]);

  // Responsive check
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

  // Parallax mouse movement handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({
      x: normX * 18,
      y: normY * 18,
    });
  }, []);

  // Auto-play loop
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setSelectedPhaseIdx((prev) => (prev + 1) % PHASES.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Ambient Dust Field Canvas Renderer
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

    const dustCount = isMobile ? 1000 : 2500;

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

      dustRef.current = generateDust(dustCount, width, height);
    };

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Render 3D Ambient Cosmic Dust Field (Transparent background)
      const dust = dustRef.current;
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

        ctx.fillStyle = `rgba(255, 255, 255, ${d.alpha})`;
        ctx.fillRect(px, py, d.size, d.size);
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

  const activePhase = PHASES[selectedPhaseIdx];

  return (
    <section
      id="forensic-canvas"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        background: "#000000",
        color: "#ffffff",
        position: "relative",
        padding: "176px 0 100px",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        minHeight: "100vh",
      }}
      aria-labelledby="incident-resolution-h1"
    >
      {/* ─── FULL-BLEED 3D COSMIC DUST CANVAS (In Front of Image) ─── */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      <div
        className="container"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ─── MAIN HERO STAGE: LEFT STACK WITH MONUMENTAL SENTINEL BEHIND ─── */}
        <div
          style={{
            position: "relative",
            minHeight: isMobile ? "auto" : 660,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 64,
          }}
        >
          {/* Left Column Content Stack (Title, Paragraph, Timeline) */}
          <div
            style={{
              maxWidth: isMobile ? "100%" : 580,
              position: "relative",
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "#f45532",
                marginBottom: 20,
                background: "rgba(244, 85, 50, 0.1)",
                padding: "4px 10px",
                border: "1px solid rgba(244, 85, 50, 0.25)",
                borderRadius: 3,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f45532" }} />
              [ PLATFORM · INCIDENT RESOLUTION ]
            </div>

            <h1
              id="incident-resolution-h1"
              style={{
                fontFamily: 'var(--font-serif), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(46px, 5.2vw, 80px)",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                color: "#ffffff",
                fontWeight: 400,
                margin: "0 0 24px 0",
                textWrap: "balance",
              }}
            >
              From &lsquo;something failed&rsquo; to &lsquo;here&rsquo;s what we do next.&rsquo;
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                fontSize: "clamp(17px, 1.8vw, 19.5px)",
                color: "rgba(255, 255, 255, 0.82)",
                lineHeight: 1.6,
                margin: "0 0 36px 0",
              }}
            >
              MeshDefend draws a sharp line between detecting a problem and resolving it. Watch
              how an incident moves from detection through correlation, proposed action, and human
              approval.
            </p>

            {/* Interactive Timeline Selector Box */}
            <div
              style={{
                border: "1px solid rgba(255, 255, 255, 0.14)",
                background: "rgba(10, 10, 10, 0.88)",
                borderRadius: 4,
                overflow: "hidden",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 48px rgba(0, 0, 0, 0.6)",
              }}
            >
              {/* Header bar of Timeline */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 16px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  background: "rgba(255, 255, 255, 0.02)",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  letterSpacing: "0.06em",
                }}
              >
                <span style={{ color: "rgba(255, 255, 255, 0.55)" }}>
                  FORENSIC RESOLUTION PIPELINE
                </span>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    background: isPlaying ? "rgba(244, 85, 50, 0.15)" : "transparent",
                    border: "1px solid rgba(244, 85, 50, 0.4)",
                    color: "#f45532",
                    fontSize: 10,
                    padding: "3px 8px",
                    borderRadius: 2,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {isPlaying ? "Auto: ON" : "Auto: PAUSED"}
                </button>
              </div>

              {/* 5 Incident Milestones */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {PHASES.map((phase, idx) => {
                  const isSelected = idx === selectedPhaseIdx;
                  const isPassed = idx < selectedPhaseIdx;

                  return (
                    <button
                      key={phase.id}
                      type="button"
                      onClick={() => {
                        setSelectedPhaseIdx(idx);
                        setIsPlaying(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "13px 18px",
                        background: isSelected ? "rgba(244, 85, 50, 0.12)" : "transparent",
                        border: "none",
                        borderLeft: isSelected ? "3px solid #f45532" : "3px solid transparent",
                        borderBottom:
                          idx < PHASES.length - 1 ? "1px solid rgba(255, 255, 255, 0.06)" : "none",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontSize: 11,
                            fontWeight: 600,
                            color: isSelected
                              ? "#f45532"
                              : isPassed
                              ? "#ffffff"
                              : "rgba(255, 255, 255, 0.4)",
                          }}
                        >
                          {phase.time}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-body), Inter, sans-serif",
                            fontSize: 13,
                            fontWeight: isSelected ? 600 : 400,
                            color: isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.75)",
                          }}
                        >
                          {phase.title}
                        </span>
                      </div>

                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          color: isSelected ? "#f45532" : "rgba(255, 255, 255, 0.4)",
                        }}
                      >
                        [{phase.tag.split("// ")[1]}]
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── BIG SENTINEL IMAGE AT THE BEHIND OF THE STACK (Layered Right / Center) ─── */}
          <div
            style={{
              position: isMobile ? "relative" : "absolute",
              right: isMobile ? "auto" : "-30px",
              top: isMobile ? "auto" : "50%",
              transform: isMobile ? "none" : "translateY(-50%)",
              width: isMobile ? "100%" : "clamp(620px, 56vw, 860px)",
              maxWidth: 880,
              marginTop: isMobile ? 36 : 0,
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            {/* Ambient HUD Coordinates Tag */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 20,
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 10.5,
                color: "rgba(255, 255, 255, 0.45)",
                textAlign: "right",
                zIndex: 4,
                pointerEvents: "none",
              }}
            >
              <div>AGENT MESH™ SENTINEL + MESHDEFEND SHIELD</div>
              <div style={{ color: "#f45532", fontWeight: 600 }}>
                STATUS: {activePhase.shieldStatus.toUpperCase()}
              </div>
              <div>ACTIVE TELEMETRY STREAM // ENCLAVE SECURE</div>
            </div>

            {/* Interactive 3D Parallax Stage */}
            <motion.div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1337 / 1176",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateX: reducedMotion ? 0 : mouseOffset.y * -0.32,
                rotateY: reducedMotion ? 0 : mouseOffset.x * 0.32,
              }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
            >
              {/* Pulsing Luminous Orange Aura Behind the Shield */}
              <div
                style={{
                  position: "absolute",
                  top: "61%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "55%",
                  height: "55%",
                  background:
                    "radial-gradient(circle, rgba(244, 85, 50, 0.50) 0%, rgba(244, 85, 50, 0.18) 48%, transparent 72%)",
                  filter: "blur(36px)",
                  zIndex: 1,
                  pointerEvents: "none",
                  animation: "pulseAura 3.6s ease-in-out infinite alternate",
                }}
              />

              {/* The User-Provided Masterpiece Artwork (Tightly Cropped, Big Presence) */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={shieldImage}
                  alt="MeshDefend AI Sentinel holding the luminous Orange MeshDefend Shield"
                  priority
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: 6,
                    filter: "contrast(1.06) brightness(1.02)",
                    mixBlendMode: "screen",
                  }}
                />
              </div>

              {/* Radial Light Glow Flare in Front of the Shield */}
              <div
                style={{
                  position: "absolute",
                  top: "61%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "50%",
                  height: "50%",
                  background:
                    "radial-gradient(circle, rgba(244, 85, 50, 0.40) 0%, rgba(244, 85, 50, 0.12) 45%, transparent 70%)",
                  filter: "blur(24px)",
                  mixBlendMode: "screen",
                  zIndex: 3,
                  pointerEvents: "none",
                }}
              />

              {/* Vertical Laser Authority Gate Barrier (Active on Phase 05) */}
              <AnimatePresence>
                {selectedPhaseIdx === 4 && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 5,
                      pointerEvents: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Laser Line directly through the center of the shield */}
                    <div
                      style={{
                        position: "absolute",
                        top: "10%",
                        bottom: "10%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 2,
                        background:
                           "linear-gradient(to bottom, transparent, #f45532 20%, #f45532 80%, transparent)",
                        boxShadow: "0 0 18px rgba(244, 85, 50, 0.85)",
                      }}
                    />

                    {/* Authority Gate Tag Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "14%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(8, 8, 8, 0.92)",
                        border: "1px solid #f45532",
                        boxShadow: "0 0 18px rgba(244, 85, 50, 0.45)",
                        padding: "6px 14px",
                        borderRadius: 3,
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        color: "#f45532",
                        letterSpacing: "0.08em",
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#f45532",
                          display: "inline-block",
                        }}
                      />
                      AUTHORITY BARRIER · OPERATOR SIGN-OFF REQUIRED
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Framing Tag */}
              <div
                style={{
                  position: "absolute",
                  bottom: -16,
                  right: 20,
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "rgba(255, 255, 255, 0.35)",
                  letterSpacing: "0.06em",
                  pointerEvents: "none",
                }}
              >
                FIG. 1.2 — SOVEREIGN RESILIENCE CORE // REAL-TIME MESH
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── Bottom Live Forensic Inspection Dossier ─── */}
        <div
          style={{
            border: "1px solid rgba(255, 255, 255, 0.12)",
            background: "rgba(8, 8, 8, 0.95)",
            backdropFilter: "blur(14px)",
            borderRadius: 4,
            padding: "28px 32px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
                gap: 36,
                alignItems: "start",
              }}
              className="forensic-dossier-grid"
            >
              {/* Left Side: Summary & Description */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "#f45532",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {activePhase.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      color: "rgba(255, 255, 255, 0.45)",
                    }}
                  >
                    Source: {activePhase.source}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif), "Instrument Serif", Georgia, serif',
                    fontSize: "clamp(24px, 2.4vw, 32px)",
                    fontWeight: 400,
                    color: "#ffffff",
                    margin: "0 0 10px 0",
                    lineHeight: 1.15,
                  }}
                >
                  {activePhase.title} — {activePhase.subtitle}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 14.5,
                    color: "rgba(255, 255, 255, 0.72)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {activePhase.detail}
                </p>

                {/* Sign-off button on Phase 05 */}
                {selectedPhaseIdx === 4 && (
                  <div style={{ marginTop: 20 }}>
                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          "Operator Sign-off confirmed for INC-8849-PAYMENTS-DB. Storage lock release executed safely under Policy POL-089."
                        )
                      }
                      style={{
                        background: "#f45532",
                        color: "#ffffff",
                        border: "none",
                        padding: "10px 20px",
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11.5,
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        borderRadius: 2,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        boxShadow: "0 0 20px rgba(244, 85, 50, 0.35)",
                      }}
                    >
                      <span>SIGN-OFF & EXECUTE REMEDIATION</span>
                      <span>→</span>
                    </button>
                    <span
                      style={{
                        marginLeft: 14,
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        color: "rgba(255, 255, 255, 0.45)",
                      }}
                    >
                      Audit Trail ID: #AUD-2026-9921
                    </span>
                  </div>
                )}
              </div>

              {/* Right Side: Structured Forensic Telemetry Key-Value Matrix */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10.5,
                    letterSpacing: "0.08em",
                    color: "rgba(255, 255, 255, 0.45)",
                    marginBottom: 12,
                  }}
                >
                  FORENSIC TELEMETRY PARAMETERS // INC-8849-PAYMENTS-DB
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 1,
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {activePhase.telemetry.map((t, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        background: "#0d0d0d",
                        fontSize: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          color: "rgba(255, 255, 255, 0.45)",
                          fontSize: 11,
                        }}
                      >
                        {t.label}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          color:
                            t.label === "ERROR" || t.label === "ROOT CAUSE" ? "#f45532" : "#ffffff",
                          fontWeight: 500,
                          textAlign: "right",
                        }}
                      >
                        {t.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulseAura {
          0% {
            opacity: 0.55;
            transform: translate(-50%, -50%) scale(0.92);
          }
          100% {
            opacity: 0.95;
            transform: translate(-50%, -50%) scale(1.12);
          }
        }
      `}</style>
    </section>
  );
}
