"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Reveal } from "@/components/motion";
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
          {/* ─── TOP EDITORIAL HEADER with 0.08s stepped reveals ─── */}
          <div style={{ maxWidth: 960, marginBottom: 36 }}>
            {/* Eyebrow */}
            <Reveal delay={0}>
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
            </Reveal>

            {/* H2 Headline */}
            <Reveal delay={0.08}>
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
            </Reveal>

            {/* Opening Lead */}
            <Reveal delay={0.16}>
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
            </Reveal>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              12-COLUMN ARCHITECTURAL SPLIT-SCREEN STAGE
             ═══════════════════════════════════════════════════════════════ */}
          <Reveal variant="scale-in" delay={0.24}>
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
                  justifyContent: "flex-start",
                  gap: 20,
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
                      marginBottom: 20,
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
                      gap: 12,
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
                            padding: "16px 18px",
                            background: isActive ? "var(--bg)" : "transparent",
                            border: "1px solid",
                            borderColor: isActive ? "var(--border)" : "transparent",
                            borderRadius: 4,
                            cursor: "pointer",
                            outline: "none",
                            position: "relative",
                            opacity: isActive ? 1 : 0.45,
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
              </div>

              {/* ─── RIGHT COLUMN (COLS 6–12, EXPOSED 1PX ARCHITECTURAL GRID) ─── */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--bg)",
                }}
              >
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
                        const itemTag = `${(current as any).tag || "FAILURE FACTOR"} · 0${iIdx + 1}`;

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

                            {/* Semantic Domain Indicator (e.g. RECOVERY GAP · 01) */}
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
                                letterSpacing: "0.06em",
                                transition: "color 0.2s ease",
                              }}
                            >
                              {itemTag}
                            </div>

                            {/* Exact Sitemap Title (Inter 18px semibold --ink) */}
                            <h3
                              style={{
                                fontFamily:
                                  "var(--font-body), Inter, -apple-system, sans-serif",
                                fontSize: 18,
                                fontWeight: 600,
                                color: "var(--ink)",
                                lineHeight: 1.35,
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
              </div>
            </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
