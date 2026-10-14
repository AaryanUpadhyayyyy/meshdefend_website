"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { PAIN } from "@/lib/sections";
import { MeshDefendBackground } from "@/components/hero/MeshDefendBackground";

export function PainSection() {
  const [activeCluster, setActiveCluster] = useState<number>(0);
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isUserClicking = useRef<boolean>(false);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  // Scroll tracking across 3 beats for desktop scroll-pinning
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Don't override if user recently clicked a pillar tab
      if (isUserClicking.current) return;

      if (latest < 0.33) {
        setActiveCluster(0);
      } else if (latest < 0.66) {
        setActiveCluster(1);
      } else {
        setActiveCluster(2);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const handlePillarSelect = useCallback((idx: number) => {
    setActiveCluster(idx);
    isUserClicking.current = true;
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      isUserClicking.current = false;
    }, 900);
  }, []);

  const current = PAIN.clusters[activeCluster];

  return (
    <section
      id="pain"
      ref={sectionRef}
      className="pain-section-wrap"
      style={{
        background: "var(--bg)",
        position: "relative",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Living Resilience Mesh Background */}
      <MeshDefendBackground variant="subtle" density="sparse" />

      {/* Sticky Stage Container */}
      <div className="pain-sticky-stage">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* ─── TOP EDITORIAL HEADER ─── */}
          <div style={{ maxWidth: 960, marginBottom: 32 }}>
            {/* Eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--orange)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {PAIN.eyebrow}
              </span>
            </div>

            {/* H2 Headline */}
            <h2
              className="display"
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(38px, 4.6vw, 64px)",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                margin: "0 0 16px 0",
                color: "var(--ink)",
                fontWeight: 400,
              }}
            >
              {PAIN.headline}
            </h2>

            {/* Opening Lead */}
            <p
              className="display-italic"
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(22px, 2.3vw, 30px)",
                fontStyle: "italic",
                color: "var(--orange)",
                letterSpacing: "-0.015em",
                lineHeight: 1.25,
                maxWidth: "46ch",
                margin: 0,
              }}
            >
              {PAIN.openingLine}
            </p>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              12-COLUMN ARCHITECTURAL SPLIT-SCREEN STAGE
             ═══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--bg)",
            }}
          >
            <div
              className="pain-split-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "5fr 7fr",
              }}
            >
              {/* ─── LEFT COLUMN (COLS 1–5, STICKY ON DESKTOP) ─── */}
              <div
                className="pain-left-rail"
                style={{
                  padding: "36px 32px",
                  borderRight: "1px solid var(--border)",
                  background: "var(--surface)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 28,
                  position: "relative",
                }}
              >
                {/* 3 Pillar Selectors with Glide Indicator */}
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      letterSpacing: "0.1em",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      marginBottom: 16,
                      fontWeight: 600,
                    }}
                  >
                    THREE CORE FAILURE DOMAINS
                  </div>

                  {/* Vertical Rail Line with Animated 2px Glide Indicator */}
                  <div
                    style={{
                      position: "relative",
                      borderLeft: "1px solid var(--border)",
                      paddingLeft: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {PAIN.clusters.map((cluster, cIdx) => {
                      const isActive = activeCluster === cIdx;

                      return (
                        <button
                          type="button"
                          key={cluster.num}
                          onClick={() => handlePillarSelect(cIdx)}
                          onMouseEnter={() => handlePillarSelect(cIdx)}
                          style={{
                            textAlign: "left",
                            padding: "14px 16px",
                            background: isActive ? "var(--bg)" : "transparent",
                            border: "1px solid",
                            borderColor: isActive ? "var(--border)" : "transparent",
                            borderRadius: 4,
                            cursor: "pointer",
                            outline: "none",
                            position: "relative",
                            opacity: isActive ? 1 : 0.38,
                            transition:
                              "opacity 0.2s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s ease, border-color 0.2s ease",
                            display: "flex",
                            alignItems: "baseline",
                            gap: 16,
                          }}
                          className="pillar-selector-btn"
                        >
                          {/* Animated 2px Active Indicator Bar Gliding along the Rail */}
                          {isActive && (
                            <motion.div
                              layoutId="activePillarRailBar"
                              transition={{
                                type: "spring",
                                stiffness: 220,
                                damping: 26,
                              }}
                              style={{
                                position: "absolute",
                                left: -14,
                                top: 4,
                                bottom: 4,
                                width: 2,
                                background: "var(--orange)",
                                borderRadius: 1,
                              }}
                            />
                          )}

                          {/* 01 / 02 / 03 Numeral */}
                          <span
                            style={{
                              fontFamily:
                                'var(--font-display), "Instrument Serif", Georgia, serif',
                              fontSize: 36,
                              lineHeight: 1,
                              color: isActive ? "var(--orange)" : "var(--ink)",
                              letterSpacing: "-0.03em",
                              transition: "color 0.2s ease",
                            }}
                          >
                            {cluster.num}
                          </span>

                          {/* Pillar Group Title */}
                          <span
                            style={{
                              fontFamily:
                                'var(--font-display), "Instrument Serif", Georgia, serif',
                              fontSize: 28,
                              lineHeight: 1.15,
                              letterSpacing: "-0.02em",
                              color: "var(--ink)",
                              fontWeight: 400,
                            }}
                          >
                            {cluster.group}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ─── MINIMALIST PAPER-AND-INK ARCHITECTURAL SVG DIAGRAM ─── */}
                <div
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    padding: "18px 18px 14px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      marginBottom: 14,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>ARCHITECTURAL STATE MODEL</span>
                    <span style={{ color: "var(--orange)", fontWeight: 700 }}>
                      DOMAIN 0{activeCluster + 1}
                    </span>
                  </div>

                  {/* SVG DIAGRAM 01: Assumed Backup Success vs. Provable Application Recovery */}
                  {activeCluster === 0 && (
                    <svg width="100%" height="86" viewBox="0 0 340 86" fill="none">
                      {/* Left Node: Backup Job [Completed] */}
                      <rect
                        x="2"
                        y="14"
                        width="112"
                        height="58"
                        rx="2"
                        stroke="var(--ink)"
                        strokeWidth="1"
                        fill="var(--bg)"
                      />
                      <text
                        x="10"
                        y="33"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="9"
                        fontWeight="700"
                        letterSpacing="0.04em"
                        fill="var(--muted)"
                      >
                        JOB STATUS
                      </text>
                      <text
                        x="10"
                        y="49"
                        fontFamily="var(--font-body), sans-serif"
                        fontSize="12"
                        fontWeight="600"
                        fill="var(--ink)"
                      >
                        Backup Job
                      </text>
                      <text
                        x="10"
                        y="63"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="9.5"
                        fill="var(--ink)"
                      >
                        [Completed ✓]
                      </text>

                      {/* Middle Broken Connector Line with Orange Alert Tick */}
                      <line
                        x1="116"
                        y1="43"
                        x2="152"
                        y2="43"
                        stroke="var(--ink)"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <circle
                        cx="170"
                        cy="43"
                        r="10"
                        stroke="var(--orange)"
                        strokeWidth="1.5"
                        fill="var(--bg)"
                      />
                      <path
                        d="M170 38v5M170 47v1"
                        stroke="var(--orange)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <line
                        x1="188"
                        y1="43"
                        x2="224"
                        y2="43"
                        stroke="var(--ink)"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <text
                        x="170"
                        y="66"
                        textAnchor="middle"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="8"
                        letterSpacing="0.04em"
                        fill="var(--orange)"
                        fontWeight="700"
                      >
                        GAP
                      </text>

                      {/* Right Node: Application Restore & RTO/RPO [Unverified] */}
                      <rect
                        x="226"
                        y="14"
                        width="112"
                        height="58"
                        rx="2"
                        stroke="var(--orange)"
                        strokeWidth="1"
                        strokeDasharray="4 2"
                        fill="var(--bg)"
                      />
                      <text
                        x="234"
                        y="33"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="9"
                        fontWeight="700"
                        letterSpacing="0.04em"
                        fill="var(--orange)"
                      >
                        APP RESTORE
                      </text>
                      <text
                        x="234"
                        y="49"
                        fontFamily="var(--font-body), sans-serif"
                        fontSize="12"
                        fontWeight="600"
                        fill="var(--ink)"
                      >
                        App Recovery
                      </text>
                      <text
                        x="234"
                        y="63"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="9.5"
                        fill="var(--muted)"
                      >
                        [Unverified]
                      </text>
                    </svg>
                  )}

                  {/* SVG DIAGRAM 02: 5 Parallel Horizontal Vendor/Cloud Planes at Disconnected Heights */}
                  {activeCluster === 1 && (
                    <svg width="100%" height="86" viewBox="0 0 340 86" fill="none">
                      {/* Plane 1: Backup */}
                      <line
                        x1="12"
                        y1="12"
                        x2="260"
                        y2="12"
                        stroke="var(--border)"
                        strokeWidth="1"
                      />
                      <circle cx="90" cy="12" r="3" fill="var(--ink)" />
                      <text
                        x="16"
                        y="9"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="8"
                        fill="var(--muted)"
                      >
                        BACKUP
                      </text>

                      {/* Plane 2: Storage */}
                      <line
                        x1="45"
                        y1="28"
                        x2="310"
                        y2="28"
                        stroke="var(--border)"
                        strokeWidth="1"
                      />
                      <circle cx="210" cy="28" r="3" fill="var(--ink)" />
                      <text
                        x="50"
                        y="25"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="8"
                        fill="var(--muted)"
                      >
                        STORAGE
                      </text>

                      {/* Plane 3: Cloud (Drift) */}
                      <line
                        x1="8"
                        y1="46"
                        x2="280"
                        y2="46"
                        stroke="var(--border)"
                        strokeWidth="1"
                      />
                      <circle cx="140" cy="46" r="3.5" fill="var(--orange)" />
                      <text
                        x="12"
                        y="42"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="8"
                        fill="var(--orange)"
                        fontWeight="700"
                      >
                        CLOUD DRIFT
                      </text>

                      {/* Plane 4: Security */}
                      <line
                        x1="60"
                        y1="64"
                        x2="330"
                        y2="64"
                        stroke="var(--border)"
                        strokeWidth="1"
                      />
                      <circle cx="270" cy="64" r="3" fill="var(--ink)" />
                      <text
                        x="65"
                        y="60"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="8"
                        fill="var(--muted)"
                      >
                        SECURITY
                      </text>

                      {/* Plane 5: ITSM */}
                      <line
                        x1="25"
                        y1="80"
                        x2="295"
                        y2="80"
                        stroke="var(--border)"
                        strokeWidth="1"
                      />
                      <circle cx="175" cy="80" r="3" fill="var(--ink)" />
                      <text
                        x="30"
                        y="77"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="8"
                        fill="var(--muted)"
                      >
                        ITSM
                      </text>

                      {/* Vertical Disconnected Break Marker (No Unifying Line) */}
                      <line
                        x1="140"
                        y1="16"
                        x2="140"
                        y2="42"
                        stroke="var(--orange)"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <text
                        x="146"
                        y="24"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="7.5"
                        fill="var(--orange)"
                      >
                        SILOED
                      </text>
                    </svg>
                  )}

                  {/* SVG DIAGRAM 03: Escalation Chain with Context-Losing Handoffs */}
                  {activeCluster === 2 && (
                    <svg width="100%" height="86" viewBox="0 0 340 86" fill="none">
                      {/* Node 1: L1 Triage */}
                      <rect
                        x="6"
                        y="16"
                        width="84"
                        height="52"
                        rx="2"
                        stroke="var(--ink)"
                        strokeWidth="1.2"
                        fill="var(--bg)"
                      />
                      <text
                        x="48"
                        y="34"
                        textAnchor="middle"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="9"
                        fontWeight="700"
                        fill="var(--muted)"
                      >
                        L1 TRIAGE
                      </text>
                      <text
                        x="48"
                        y="52"
                        textAnchor="middle"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="9"
                        fill="var(--ink)"
                      >
                        100% signal
                      </text>

                      {/* Connector 1: ✕ Break (-58%) */}
                      <line
                        x1="92"
                        y1="42"
                        x2="108"
                        y2="42"
                        stroke="var(--ink)"
                        strokeWidth="1.2"
                      />
                      <text
                        x="113"
                        y="45"
                        textAnchor="middle"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="10"
                        fill="var(--orange)"
                        fontWeight="700"
                      >
                        ✕
                      </text>
                      <line
                        x1="118"
                        y1="42"
                        x2="134"
                        y2="42"
                        stroke="var(--ink)"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <text
                        x="113"
                        y="32"
                        textAnchor="middle"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="7.5"
                        fill="var(--orange)"
                        fontWeight="700"
                      >
                        -58%
                      </text>

                      {/* Node 2: L2 Ops */}
                      <rect
                        x="136"
                        y="16"
                        width="84"
                        height="52"
                        rx="2"
                        stroke="var(--ink)"
                        strokeWidth="1"
                        fill="var(--bg)"
                      />
                      <text
                        x="178"
                        y="34"
                        textAnchor="middle"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="9"
                        fontWeight="700"
                        fill="var(--muted)"
                      >
                        L2 OPS
                      </text>
                      <text
                        x="178"
                        y="52"
                        textAnchor="middle"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="9"
                        fill="var(--ink)"
                      >
                        Ticket recap
                      </text>

                      {/* Connector 2: ✕ Break (-82%) */}
                      <line
                        x1="222"
                        y1="42"
                        x2="238"
                        y2="42"
                        stroke="var(--ink)"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <text
                        x="243"
                        y="45"
                        textAnchor="middle"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="10"
                        fill="var(--orange)"
                        fontWeight="700"
                      >
                        ✕
                      </text>
                      <line
                        x1="248"
                        y1="42"
                        x2="264"
                        y2="42"
                        stroke="var(--border)"
                        strokeWidth="0.75"
                        strokeDasharray="1 2"
                      />
                      <text
                        x="243"
                        y="32"
                        textAnchor="middle"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="7.5"
                        fill="var(--orange)"
                        fontWeight="700"
                      >
                        -82%
                      </text>

                      {/* Node 3: L3 Specialist */}
                      <rect
                        x="266"
                        y="16"
                        width="70"
                        height="52"
                        rx="2"
                        stroke="var(--border)"
                        strokeWidth="1"
                        strokeDasharray="3 2"
                        fill="var(--bg)"
                      />
                      <text
                        x="301"
                        y="34"
                        textAnchor="middle"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="8.5"
                        fontWeight="700"
                        fill="var(--muted)"
                      >
                        L3 SPEC
                      </text>
                      <text
                        x="301"
                        y="52"
                        textAnchor="middle"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="8.5"
                        fill="var(--orange)"
                      >
                        Context lost
                      </text>
                    </svg>
                  )}
                </div>
              </div>

              {/* ─── RIGHT COLUMN (COLS 6–12, EXPOSED 1PX ARCHITECTURAL GRID) ─── */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--bg)",
                }}
              >
                {/* Figure Caption Header Bar */}
                <div
                  style={{
                    padding: "20px 32px",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "var(--bg)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      letterSpacing: "0.08em",
                      color: "var(--muted)",
                      fontWeight: 600,
                    }}
                  >
                    {current.diagramCaption}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--orange)",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {current.items.length} MODES OF RECOVERY FAILURE
                  </span>
                </div>

                {/* Exposed 1px Hairline Architectural Grid */}
                <div style={{ flex: 1 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.num}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={
                        current.items.length === 4
                          ? "pain-grid-4"
                          : "pain-grid-3"
                      }
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          current.items.length === 4 ? "repeat(2, 1fr)" : "1fr",
                        height: "100%",
                      }}
                    >
                      {current.items.map((item, iIdx) => {
                        const isHovered = hoveredCell === iIdx;
                        const itemNum = `${current.num}.${iIdx + 1}`;

                        // Calculate shared 1px borders
                        const is4 = current.items.length === 4;
                        const hasRightBorder = is4 && iIdx % 2 === 0;
                        const hasBottomBorder = is4
                          ? iIdx < 2
                          : iIdx < current.items.length - 1;

                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.28,
                              delay: iIdx * 0.05,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            onMouseEnter={() => setHoveredCell(iIdx)}
                            onMouseLeave={() => setHoveredCell(null)}
                            style={{
                              padding: "36px 32px",
                              borderRight: hasRightBorder
                                ? "1px solid var(--border)"
                                : "none",
                              borderBottom: hasBottomBorder
                                ? "1px solid var(--border)"
                                : "none",
                              position: "relative",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              background: "var(--bg)",
                              cursor: "default",
                            }}
                          >
                            {/* Animated 1px #f45532 Top Border Line on Hover */}
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 1,
                                background: "var(--orange)",
                                transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                                transformOrigin: "left",
                                transition:
                                  "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
                              }}
                            />

                            {/* Subtle Index Number (e.g. 01.1, 01.2) */}
                            <div
                              style={{
                                fontFamily:
                                  'var(--font-mono), "JetBrains Mono", monospace',
                                fontSize: 11,
                                color: isHovered
                                  ? "var(--orange)"
                                  : "var(--muted)",
                                marginBottom: 14,
                                fontWeight: 600,
                                transition: "color 0.2s ease",
                              }}
                            >
                              {itemNum}
                            </div>

                            {/* Exact Sitemap Title (Inter 19px semibold --ink) */}
                            <h3
                              style={{
                                fontFamily:
                                  "var(--font-body), Inter, -apple-system, sans-serif",
                                fontSize: 19,
                                fontWeight: 600,
                                color: "var(--ink)",
                                lineHeight: 1.3,
                                letterSpacing: "-0.015em",
                                margin: "0 0 10px 0",
                              }}
                            >
                              {item.label}
                            </h3>

                            {/* Exact Sitemap Description (Inter 15px --muted, line-height 1.6) */}
                            <p
                              style={{
                                fontFamily:
                                  "var(--font-body), Inter, -apple-system, sans-serif",
                                fontSize: 15,
                                color: "var(--muted)",
                                lineHeight: 1.6,
                                margin: 0,
                              }}
                            >
                              {item.desc}
                            </p>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Status / Navigation Bar */}
                <div
                  style={{
                    padding: "18px 32px",
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 12,
                    background: "var(--surface)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--muted)",
                    }}
                  >
                    ESTATE CONTEXT: 100% UNOWNED BETWEEN CONSOLES
                  </span>
                  <a
                    href="#solution"
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11.5,
                      color: "var(--orange)",
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span>EXPLORE RESOC FABRIC</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pain-section-wrap {
          min-height: 200vh;
          padding: 0;
        }

        .pain-sticky-stage {
          position: sticky;
          top: 80px;
          padding: 40px 0 60px;
        }

        .pillar-selector-btn:hover {
          opacity: 0.85 !important;
        }

        @media (max-width: 960px) {
          .pain-section-wrap {
            min-height: auto !important;
            padding: 48px 0 !important;
          }

          .pain-sticky-stage {
            position: relative !important;
            top: auto !important;
            padding: 0 !important;
          }

          .pain-split-grid {
            grid-template-columns: 1fr !important;
          }

          .pain-left-rail {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }

          .pain-grid-4 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
