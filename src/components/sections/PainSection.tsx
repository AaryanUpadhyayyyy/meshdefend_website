"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/motion";
import { PAIN } from "@/lib/sections";
import { MeshDefendBackground } from "@/components/hero/MeshDefendBackground";

const ChevronLeftIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const PAIN_CARDS = [
  {
    num: "01",
    group: "Recovery Confidence",
    tag: "RECOVERY CONFIDENCE",
    image: "/images/img/backup-success-recovery-unproven.png",
    summary:
      "Successful backups do not prove application recovery. Modern cyber recovery lags AI-driven attacks, while recovery objectives (RTO/RPO) remain untested assumptions.",
    items: [
      {
        label: "Cyber Recovery Lags AI-Driven Attacks",
        desc: "Recovery strategies struggle to match the speed, scale, and complexity of modern cyberattacks.",
      },
      {
        label: "Low Recovery Confidence",
        desc: "Teams lack continuous proof that critical workloads can be recovered when needed.",
      },
      {
        label: "Unverified Application Recovery",
        desc: "Application-level recovery remains unproven. Successful backups do not prove applications can be restored and operated correctly.",
      },
      {
        label: "Unproven RTO/RPO",
        desc: "Recovery objectives often remain assumptions until they are actually tested.",
      },
    ],
  },
  {
    num: "02",
    group: "Complexity at Scale",
    tag: "COMPLEXITY AT SCALE",
    image: "/images/img/fragmented-systems-missing-single-view.png",
    summary:
      "Disconnected platforms, clouds, and protection vendors leave teams operating in silos with no single view connecting protection health to business risk.",
    items: [
      {
        label: "Data and Platform Sprawl",
        desc: "Data and dependencies span multiple platforms, clouds, and protection vendors.",
      },
      {
        label: "Heterogeneous Environments",
        desc: "Multi-cloud, multi-vendor environments are increasingly difficult to operate consistently at scale.",
      },
      {
        label: "Siloed Visibility",
        desc: "No single view connects protection health, failures, dependencies, and recovery risk.",
      },
    ],
  },
  {
    num: "03",
    group: "Operational Friction",
    tag: "OPERATIONAL FRICTION",
    image: "/images/img/context-loss-support.png",
    summary:
      "Critical operational context is lost across L1, L2, L3, and specialist escalations, while brittle automation and scattered knowledge create constant friction.",
    items: [
      {
        label: "Fragmented knowledge",
        desc: "Critical expertise is scattered across runbooks, tickets, tools, and specialists.",
      },
      {
        label: "Slow investigation",
        desc: "Teams manually correlate signals across systems before identifying root cause.",
      },
      {
        label: "Context-Losing Handoffs",
        desc: "Critical context is lost across L1, L2, L3, and specialist escalations.",
      },
      {
        label: "Brittle Automation",
        desc: "Scripts and workflows break as infrastructure changes, creating constant maintenance.",
      },
    ],
  },
];

export function PainSection() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState<number>(1200);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Update viewport width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (stageRef.current) {
        setViewportWidth(stageRef.current.offsetWidth);
      } else {
        setViewportWidth(window.innerWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : PAIN_CARDS.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev < PAIN_CARDS.length - 1 ? prev + 1 : 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 45) {
      handlePrev();
    } else if (deltaX < -45) {
      handleNext();
    }
    touchStartX.current = null;
  };

  // Dimensions
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1080;
  const cardWidth = isMobile
    ? Math.max(300, viewportWidth - 48)
    : isTablet
    ? Math.min(640, viewportWidth * 0.75)
    : Math.min(740, viewportWidth * 0.58);
  const cardGap = isMobile ? 18 : 28;

  // Center offset formula
  const translateX = (viewportWidth - cardWidth) / 2 - activeIdx * (cardWidth + cardGap);

  return (
    <section
      id="pain"
      className="pain-section-wrap"
      style={{
        background: "var(--bg)",
        position: "relative",
        padding: "88px 0 100px",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <MeshDefendBackground variant="subtle" density="sparse" />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* ─── TOP EDITORIAL HEADER ─── */}
        <div style={{ maxWidth: 940, margin: "0 auto 44px", textAlign: "center" }}>
          {/* Eyebrow */}
          <Reveal delay={0}>
            <div
              style={{
                display: "inline-flex",
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
                fontSize: "clamp(34px, 4.4vw, 58px)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
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
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(16px, 1.4vw, 18.5px)",
                color: "var(--muted)",
                lineHeight: 1.6,
                maxWidth: 720,
                margin: "0 auto",
              }}
            >
              {PAIN.openingLine}
            </p>
          </Reveal>
        </div>

        {/* ─── 3 PILLAR SELECTOR TABS ─── */}
        <div
          role="tablist"
          aria-label="Core Failure Domains"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 36,
          }}
        >
          {PAIN_CARDS.map((card, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={card.num}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIdx(idx)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 20px",
                  borderRadius: 30,
                  background: isActive ? "var(--ink)" : "var(--surface)",
                  color: isActive ? "var(--bg)" : "var(--muted)",
                  border: `1px solid ${isActive ? "var(--ink)" : "var(--border)"}`,
                  cursor: "pointer",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <span style={{ color: isActive ? "var(--orange)" : "var(--muted)", fontWeight: 600 }}>
                  {card.num}
                </span>
                <span>{card.group}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── INTERACTIVE CAROUSEL STAGE (Reference Image 2 UI) ─── */}
      <div
        ref={stageRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "relative",
          width: "100%",
          padding: "12px 0 24px",
          overflow: "hidden",
        }}
      >
        {/* Soft edge vignette fades */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: isMobile ? 16 : 80,
            background: "linear-gradient(to right, var(--bg) 0%, transparent 100%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: isMobile ? 16 : 80,
            background: "linear-gradient(to left, var(--bg) 0%, transparent 100%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        {/* Floating Left Arrow Navigation Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous failure domain"
          style={{
            position: "absolute",
            left: isMobile ? 12 : "max(24px, calc((100% - 1280px) / 2))",
            top: "40%",
            transform: "translateY(-50%)",
            width: isMobile ? 40 : 48,
            height: isMobile ? 40 : 48,
            borderRadius: "50%",
            background: "var(--card-bg, #ffffff)",
            border: "1px solid var(--border)",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 20,
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
            e.currentTarget.style.borderColor = "var(--orange)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          <ChevronLeftIcon />
        </button>

        {/* Floating Right Arrow Navigation Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next failure domain"
          style={{
            position: "absolute",
            right: isMobile ? 12 : "max(24px, calc((100% - 1280px) / 2))",
            top: "40%",
            transform: "translateY(-50%)",
            width: isMobile ? 40 : 48,
            height: isMobile ? 40 : 48,
            borderRadius: "50%",
            background: "var(--card-bg, #ffffff)",
            border: "1px solid var(--border)",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 20,
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
            e.currentTarget.style.borderColor = "var(--orange)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          <ChevronRightIcon />
        </button>

        {/* Sliding Cards Track */}
        <motion.div
          animate={{ x: translateX }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 28,
          }}
          style={{
            display: "flex",
            gap: cardGap,
            alignItems: "stretch",
            willChange: "transform",
          }}
        >
          {PAIN_CARDS.map((card, idx) => {
            const isActive = activeIdx === idx;
            return (
              <motion.div
                key={card.num}
                onClick={() => setActiveIdx(idx)}
                animate={{
                  scale: isActive ? 1 : 0.94,
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: cardWidth,
                  flexShrink: 0,
                  cursor: isActive ? "default" : "pointer",
                  borderRadius: 20,
                  background: "var(--card-bg, #ffffff)",
                  border: "1px solid var(--border)",
                  boxShadow: isActive
                    ? "0 20px 48px -12px rgba(34, 31, 34, 0.12)"
                    : "0 4px 16px rgba(0,0,0,0.04)",
                  padding: isMobile ? "20px 16px" : "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  position: "relative",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                {/* Visual Part: Problem Diagram Image */}
                <div
                  style={{
                    width: "100%",
                    borderRadius: 14,
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    background: "#fbfbfb",
                    position: "relative",
                  }}
                >
                  <img
                    src={card.image}
                    alt={`${card.group} Architecture Diagram`}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Editorial Content Part */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: 32,
                        lineHeight: 1,
                        color: "var(--orange)",
                      }}
                    >
                      {card.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: "clamp(26px, 2.2vw, 34px)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.02em",
                        color: "var(--ink)",
                        margin: 0,
                        fontWeight: 400,
                      }}
                    >
                      {card.group}
                    </h3>
                  </div>

                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: "var(--muted)",
                      margin: 0,
                    }}
                  >
                    {card.summary}
                  </p>

                  {/* 3-4 Detailed Failure Items */}
                  <div
                    style={{
                      marginTop: 8,
                      borderTop: "1px solid var(--border)",
                      paddingTop: 16,
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                      gap: "12px 20px",
                    }}
                  >
                    {card.items.map((item, iIdx) => (
                      <div
                        key={item.label}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 13.5,
                            fontWeight: 600,
                            color: "var(--ink)",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          <span
                            style={{
                              width: 5,
                              height: 5,
                              borderRadius: "50%",
                              background: "var(--orange)",
                              display: "inline-block",
                              flexShrink: 0,
                            }}
                          />
                          <span>{item.label}</span>
                        </div>
                        <p
                          style={{
                            fontSize: 12.5,
                            lineHeight: 1.45,
                            color: "var(--muted)",
                            margin: 0,
                            paddingLeft: 11,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ─── BOTTOM DOT INDICATORS ─── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          marginTop: 20,
        }}
      >
        {PAIN_CARDS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIdx(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            style={{
              width: activeIdx === idx ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: activeIdx === idx ? "var(--orange)" : "var(--border)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
