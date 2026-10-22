"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

const HERO_SLIDES = [
  {
    step: "01",
    label: "CONNECT",
    src: "/images/img/slide 1.png",
    alt: "ResOC Connect: Agent Mesh unifying Business, Infrastructure and Security",
    prompt: "Connect payments, databases & clouds to Agent Mesh",
  },
  {
    step: "02",
    label: "ASK",
    src: "/images/img/slide 2.png",
    alt: "ResOC Ask: Can we recover payments right now?",
    prompt: 'Ask ResOC: "Can we recover payments right now?"',
  },
  {
    step: "03",
    label: "REASON",
    src: "/images/img/slide 3.png",
    alt: "ResOC Reason: Probable cause diagnosis across telemetry",
    prompt: "Probable cause: Resource contention from leftover artifacts",
  },
  {
    step: "04",
    label: "APPROVE",
    src: "/images/img/slide 4.png",
    alt: "ResOC Approve: Human-in-the-loop decision and policy check",
    prompt: 'Proposed fix: "Clean up leftover artifacts"',
  },
  {
    step: "05",
    label: "PROVE",
    src: "/images/img/slide 5.png",
    alt: "ResOC Prove: Audit-ready evidence record and restore proof",
    prompt: "Evidence record: Audit-ready restore test passed",
  },
  {
    step: "06",
    label: "REPEAT",
    src: "/images/img/slide 6.png",
    alt: "ResOC Repeat: Automated daily continuous resilience cycle",
    prompt: "Continuous resilience: Mon-Sun continuous verify",
  },
];

export function HeroSlideStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const total = HERO_SLIDES.length;
  const fullPrompt = HERO_SLIDES[activeIndex].prompt;

  // Typing animation effect whenever active slide changes
  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);

    let charIndex = 0;
    // Types out smoothly across the first ~850ms of the 2-second slide interval
    const charDelay = Math.max(15, Math.floor(850 / Math.max(fullPrompt.length, 1)));

    const timer = setInterval(() => {
      charIndex++;
      if (charIndex <= fullPrompt.length) {
        setDisplayedText(fullPrompt.slice(0, charIndex));
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, charDelay);

    return () => clearInterval(timer);
  }, [activeIndex, fullPrompt]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-changes every 2 seconds (2000ms) with typing effect
  // Pauses on hover/touch so user can inspect any frame
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  // Pause when browser tab is inactive to preserve battery/CPU
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

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 460,
        minHeight: 485,
        borderRadius: 22,
        overflow: "hidden",
        border: "1px solid var(--border)",
        background:
          "radial-gradient(ellipse at 50% 20%, rgba(244, 85, 50, 0.08) 0%, var(--surface, #f5f4f2) 75%)",
        boxShadow: "0 20px 48px -14px rgba(34, 31, 34, 0.12)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        userSelect: "none",
        padding: "2px 0",
      }}
    >
      {/* ─── Top Step Pills & Live Status ─── */}
      <div
        style={{
          position: "relative",
          zIndex: 15,
          padding: "14px 18px 6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--orange)",
              display: "inline-block",
              boxShadow: "0 0 8px rgba(244, 85, 50, 0.6)",
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 10.5,
              letterSpacing: "0.08em",
              color: "var(--muted)",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Step {HERO_SLIDES[activeIndex].step}/06 · {HERO_SLIDES[activeIndex].label}
          </span>
        </div>

        {/* 6 Step Dials */}
        <div style={{ display: "flex", alignItems: "center", gap: 3.5 }}>
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Jump to slide ${s.step}`}
              style={{
                width: activeIndex === idx ? 18 : 5,
                height: 4.5,
                borderRadius: 2.5,
                background: activeIndex === idx ? "var(--orange)" : "var(--border)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ─── Single Active Card Stage (No background images, full image visible) ─── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 365,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "2px 0 6px",
        }}
      >
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={slide.step}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: "68%",
                maxWidth: 310,
                transform: `translateX(-50%) scale(${isActive ? 1 : 0.96})`,
                zIndex: isActive ? 10 : 1,
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow:
                  "0 18px 40px -8px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.06)",
                transition:
                  "opacity 0.35s ease, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  border: "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ─── Floating Action / Prompt Pill with Real-Time Typing Animation ─── */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          margin: "6px auto 12px",
          width: "calc(100% - 32px)",
          maxWidth: 410,
          background: "var(--card-bg, #ffffff)",
          border: "1px solid var(--border)",
          borderRadius: 40,
          padding: "7px 10px 7px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          boxShadow: "0 6px 20px -4px rgba(0, 0, 0, 0.12)",
          transition: "all 0.25s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Spark icon */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "rgba(244, 85, 50, 0.12)",
              color: "var(--orange)",
              fontSize: 12,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            ✳
          </span>

          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 12.5,
              color: "var(--ink)",
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {displayedText}
            {/* Blinking / typing cursor */}
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 13,
                background: "var(--orange)",
                marginLeft: 3,
                verticalAlign: "middle",
                opacity: isTyping ? 1 : 0.4,
                transition: "opacity 0.15s ease",
              }}
            />
          </span>
        </div>

        {/* Action arrow button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "var(--ink)",
            color: "var(--bg)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "transform 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.background = "var(--orange)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = "var(--ink)";
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
