"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Reveal } from "@/components/motion";
import { PAIN } from "@/lib/sections";
import { MeshDefendBackground } from "@/components/hero/MeshDefendBackground";

const ChevronLeftIcon = () => (
  <svg
    width="18"
    height="18"
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
    width="18"
    height="18"
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
    image: "/images/img/backup-success-recovery-unproven.png",
    summary:
      "Successful backups do not prove application recovery. Modern cyber recovery lags AI-driven attacks, while recovery objectives (RTO/RPO) remain untested assumptions.",
  },
  {
    num: "02",
    group: "Complexity at Scale",
    image: "/images/img/fragmented-systems-missing-single-view.png",
    summary:
      "Disconnected platforms, clouds, and protection vendors leave teams operating in silos with no unified view connecting protection health to business risk.",
  },
  {
    num: "03",
    group: "Operational Friction",
    image: "/images/img/context-loss-support.png",
    summary:
      "Critical operational context is lost across L1, L2, L3, and specialist escalations, while brittle automation and scattered knowledge create constant friction.",
  },
];

export function PainSection() {
  // Virtual index supports infinite circular scrolling (1 -> 2 -> 3 -> 1 -> 2 -> 3 ...)
  const [virtualIndex, setVirtualIndex] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState<number>(1200);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Measure container width
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
    setVirtualIndex((v) => v - 1);
  }, []);

  const handleNext = useCallback(() => {
    setVirtualIndex((v) => v + 1);
  }, []);

  const handleJumpTo = useCallback((targetRealIdx: number) => {
    setVirtualIndex((currentV) => {
      const currentReal = ((currentV % 3) + 3) % 3;
      let diff = targetRealIdx - currentReal;
      if (diff > 1) diff -= 3;
      if (diff < -1) diff += 3;
      return currentV + diff;
    });
  }, []);

  // Gentle auto-rotation loop (pauses when hovered, touched, or document hidden)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setVirtualIndex((v) => v + 1);
    }, 4800);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Pause when browser tab is inactive
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
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
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  // Dimensions
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1080;
  const cardWidth = isMobile
    ? Math.max(280, Math.min(380, viewportWidth - 48))
    : isTablet
    ? Math.min(460, viewportWidth * 0.52)
    : Math.min(500, Math.max(420, viewportWidth * 0.36));

  // Active real card index (0, 1, or 2)
  const activeRealIdx = ((virtualIndex % 3) + 3) % 3;

  // Generate 7 virtual slots around active virtualIndex: [v - 3 ... v + 3]
  // Pre-mounting ensures smooth incoming and outgoing 3D rotation with zero layout flash
  const slots: number[] = [
    virtualIndex - 3,
    virtualIndex - 2,
    virtualIndex - 1,
    virtualIndex,
    virtualIndex + 1,
    virtualIndex + 2,
    virtualIndex + 3,
  ];

  // Helper to compute 3D rotating carousel parameters for each slot
  const getSlot3DStyle = (s: number) => {
    const dist = s - virtualIndex;
    const sign = Math.sign(dist);
    const abs = Math.abs(dist);

    if (abs === 0) {
      return {
        transform: "translateX(0px) translateZ(0px) rotateY(0deg) scale(1)",
        opacity: 1,
        zIndex: 20,
        pointerEvents: "auto" as const,
        cursor: "default",
        filter: "none",
        boxShadow: "0 20px 48px -12px rgba(34, 31, 34, 0.12), 0 2px 8px rgba(0,0,0,0.04)",
      };
    }

    if (abs === 1) {
      const xOffset = sign * (cardWidth * (isMobile ? 0.82 : 0.78));
      const zOffset = isMobile ? -80 : -110;
      // Rotates inward towards the center stage: left card tilts right (+28deg), right card tilts left (-28deg)
      const yRot = -sign * (isMobile ? 22 : 28);
      return {
        transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${yRot}deg) scale(${isMobile ? 0.9 : 0.88})`,
        opacity: isMobile ? 0.45 : 0.68,
        zIndex: 10,
        pointerEvents: "auto" as const,
        cursor: "pointer",
        filter: "blur(0.3px)",
        boxShadow: "0 10px 28px -10px rgba(0,0,0,0.08)",
      };
    }

    if (abs === 2) {
      const xOffset = sign * (cardWidth * (isMobile ? 1.45 : 1.48));
      const zOffset = isMobile ? -160 : -240;
      const yRot = -sign * (isMobile ? 35 : 46);
      return {
        transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${yRot}deg) scale(${isMobile ? 0.78 : 0.76})`,
        opacity: 0.18,
        zIndex: 5,
        pointerEvents: "none" as const,
        cursor: "default",
        filter: "blur(1.2px)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
      };
    }

    // abs >= 3 (pre-mounted buffer slots offstage)
    const xOffset = sign * (cardWidth * 2.1);
    const zOffset = -360;
    const yRot = -sign * 56;
    return {
      transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${yRot}deg) scale(0.65)`,
      opacity: 0,
      zIndex: 1,
      pointerEvents: "none" as const,
      cursor: "default",
      filter: "blur(2px)",
      boxShadow: "none",
    };
  };

  return (
    <section
      id="pain"
      className="pain-section-wrap"
      style={{
        background: "var(--bg)",
        position: "relative",
        padding: "64px 0 76px",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <MeshDefendBackground variant="subtle" density="sparse" />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* ─── TOP EDITORIAL HEADER ─── */}
        <div style={{ maxWidth: 860, margin: "0 auto 36px", textAlign: "center" }}>
          {/* Eyebrow */}
          <Reveal delay={0}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
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
                  fontWeight: 500,
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
                fontSize: "clamp(30px, 3.8vw, 50px)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                margin: "0 0 12px 0",
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
                fontSize: "clamp(14.5px, 1.2vw, 16.5px)",
                color: "var(--muted)",
                lineHeight: 1.55,
                maxWidth: 620,
                margin: "0 auto",
                fontWeight: 400,
              }}
            >
              {PAIN.openingLine}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ─── 3D ROTATING CIRCULAR CAROUSEL STAGE ─── */}
      <div
        ref={stageRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? 420 : 455,
          padding: "6px 0 16px",
          overflow: "hidden",
          perspective: isMobile ? "900px" : "1300px",
          perspectiveOrigin: "50% 48%",
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
            zIndex: 25,
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
            zIndex: 25,
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
            left: isMobile ? 8 : "max(18px, calc((100% - 1140px) / 2))",
            top: "50%",
            transform: "translateY(-50%)",
            width: isMobile ? 38 : 42,
            height: isMobile ? 38 : 42,
            borderRadius: "50%",
            background: "var(--card-bg, #ffffff)",
            border: "1px solid var(--border)",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 35,
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
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
            right: isMobile ? 8 : "max(18px, calc((100% - 1140px) / 2))",
            top: "50%",
            transform: "translateY(-50%)",
            width: isMobile ? 38 : 42,
            height: isMobile ? 38 : 42,
            borderRadius: "50%",
            background: "var(--card-bg, #ffffff)",
            border: "1px solid var(--border)",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 35,
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
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

        {/* ─── 3D Rotating Cards Track ─── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
          }}
        >
          {slots.map((s) => {
            const cardData = PAIN_CARDS[((s % 3) + 3) % 3];
            const dist = s - virtualIndex;
            const isActive = dist === 0;
            const style3D = getSlot3DStyle(s);

            return (
              <div
                key={`slot-${s}`}
                onClick={() => {
                  if (!isActive) setVirtualIndex(s);
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  width: cardWidth,
                  marginLeft: -cardWidth / 2,
                  transform: style3D.transform,
                  opacity: style3D.opacity,
                  zIndex: style3D.zIndex,
                  cursor: style3D.cursor,
                  pointerEvents: style3D.pointerEvents,
                  filter: style3D.filter,
                  boxShadow: style3D.boxShadow,
                  borderRadius: 16,
                  background: "var(--card-bg, #ffffff)",
                  border: "1px solid var(--border)",
                  padding: isMobile ? "14px 12px" : "18px 16px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  transition:
                    "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, filter 0.45s ease, box-shadow 0.4s ease",
                  willChange: "transform, opacity, filter",
                }}
              >
                {/* Visual Part: Problem Diagram Image (Border removed) */}
                <div
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    overflow: "hidden",
                    border: "none",
                    background: "transparent",
                    position: "relative",
                  }}
                >
                  <img
                    src={cardData.image}
                    alt={`${cardData.group} Architecture Diagram`}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      objectFit: "contain",
                      border: "none",
                    }}
                  />
                </div>

                {/* Editorial Content Part (Title + Summary Only, non-bold) */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: 24,
                        lineHeight: 1,
                        color: "var(--orange)",
                        fontWeight: 400,
                      }}
                    >
                      {cardData.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: "clamp(21px, 1.8vw, 26px)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.02em",
                        color: "var(--ink)",
                        margin: 0,
                        fontWeight: 400,
                      }}
                    >
                      {cardData.group}
                    </h3>
                  </div>

                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13.5,
                      lineHeight: 1.5,
                      color: "var(--muted)",
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    {cardData.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── BOTTOM DOT INDICATORS (Reflects Active 01 / 02 / 03) ─── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
          marginTop: 14,
        }}
      >
        {PAIN_CARDS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleJumpTo(idx)}
            aria-label={`Go to problem ${idx + 1}`}
            style={{
              width: activeRealIdx === idx ? 22 : 6,
              height: 6,
              borderRadius: 3,
              background: activeRealIdx === idx ? "var(--orange)" : "var(--border)",
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
