"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";

export function BackupHandoffFold() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const [animStage, setAnimStage] = useState<"idle" | "drawing" | "completed">("idle");
  const [isHovered, setIsHovered] = useState(false);
  const [lineCoords, setLineCoords] = useState<{ targetX: number; targetY: number } | null>(null);

  const updateCoords = useCallback(() => {
    if (!sectionRef.current || !titleTextRef.current) return;
    const sRect = sectionRef.current.getBoundingClientRect();
    const tRect = titleTextRef.current.getBoundingClientRect();

    const targetX = Math.max(0, tRect.left - sRect.left);
    const targetY = tRect.top - sRect.top + tRect.height * 0.5;

    setLineCoords({ targetX, targetY });
  }, []);

  useEffect(() => {
    updateCoords();
    window.addEventListener("resize", updateCoords, { passive: true });
    return () => window.removeEventListener("resize", updateCoords);
  }, [updateCoords]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimStage("completed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          updateCoords();
          setAnimStage("drawing");
          observer.disconnect();

          const timer = setTimeout(() => {
            setAnimStage("completed");
          }, 900);

          return () => clearTimeout(timer);
        }
      },
      { threshold: [0.35, 0.45] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [updateCoords]);

  const chipWidth = 320;
  const chipSlideX = lineCoords ? Math.max(0, lineCoords.targetX - chipWidth - 16) : 0;

  return (
    <section
      ref={sectionRef}
      id="cyber-resilience"
      style={{
        background: "#221f22",
        color: "#fefdfd",
        position: "relative",
        padding: "120px 0 130px",
        overflow: "hidden",
        borderTop: "1px solid rgba(254, 253, 253, 0.1)",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Top Progression Strip (Inter 13px, ink 60%) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 36,
            fontFamily: "var(--font-body), Inter, sans-serif",
            fontSize: 13,
            color: "rgba(254, 253, 253, 0.55)",
            flexWrap: "wrap",
          }}
          role="navigation"
          aria-label="Resilience Progression"
        >
          <span style={{ color: "#fefdfd", fontWeight: 600 }}>Run clean daily operations</span>
          <span style={{ color: "rgba(254, 253, 253, 0.3)" }}>→</span>
          <span style={{ color: "rgba(254, 253, 253, 0.65)" }}>Validate application recovery</span>
          <span style={{ color: "rgba(254, 253, 253, 0.3)" }}>→</span>
          <span style={{ color: "rgba(254, 253, 253, 0.65)" }}>Prove cyber resilience</span>
        </div>

        {/* Display H2 (Two-line balance) */}
        <div style={{ maxWidth: 880, marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(38px, 4.8vw, 68px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              margin: 0,
            }}
          >
            <span style={{ display: "block", color: "#fefdfd" }}>
              Recovery readiness isn&apos;t something you want to discover
            </span>
            <span style={{ display: "block", color: "var(--orange)", fontStyle: "italic" }}>
              during recovery.
            </span>
          </h2>
        </div>

        {/* Body Copy */}
        <p
          style={{
            fontFamily: "var(--font-body), Inter, sans-serif",
            fontSize: "clamp(16px, 1.8vw, 18.5px)",
            lineHeight: 1.6,
            color: "rgba(254, 253, 253, 0.7)",
            maxWidth: "68ch",
            margin: "0 0 64px 0",
          }}
        >
          Everyday backup operations establish the foundation—healthy jobs, verified replication, and policy compliance. See how MeshDefend extends operational health into continuous application dependency mapping and clean-room recovery assurance.
        </p>

        {/* Asymmetric Giant Link Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Link
            href="/platform/cyber-resilience"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              textDecoration: "none",
              color: "#fefdfd",
              transition: "transform 0.25s ease",
              transform: isHovered ? "translateX(6px)" : "none",
            }}
          >
            <span
              ref={titleTextRef}
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(34px, 4.2vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: isHovered ? "var(--orange)" : "#fefdfd",
                transition: "color 0.2s ease",
              }}
            >
              Cyber Resilience ↗
            </span>
          </Link>
        </div>
      </div>

      {/* ─── Animated 1px Line & Moving Chip ─── */}
      {lineCoords && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: lineCoords.targetY,
            width: "100%",
            height: 1,
            pointerEvents: "none",
            zIndex: 1,
          }}
          aria-hidden="true"
        >
          {/* Base hairline */}
          <div
            style={{
              position: "absolute",
              left: 0,
              width: lineCoords.targetX,
              height: 1,
              background: "rgba(254, 253, 253, 0.15)",
              transform: animStage === "idle" ? "scaleX(0)" : "scaleX(1)",
              transformOrigin: "left",
              transition: "transform 0.9s cubic-bezier(0.65, 0, 0.15, 1)",
            }}
          />

          {/* Traveling Chip */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: -14,
              width: chipWidth,
              padding: "4px 10px",
              background: "rgba(34, 31, 34, 0.95)",
              border: "1px solid rgba(254, 253, 253, 0.25)",
              borderLeft: "2px solid var(--orange)",
              borderRadius: 3,
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 10,
              color: "#fefdfd",
              whiteSpace: "nowrap",
              transform:
                animStage === "drawing" || animStage === "completed"
                  ? `translateX(${chipSlideX}px)`
                  : "translateX(20px)",
              opacity: animStage === "drawing" ? 1 : animStage === "completed" ? 0.8 : 0,
              transition: "transform 0.9s cubic-bezier(0.65, 0, 0.15, 1), opacity 0.4s ease",
            }}
          >
            payments-db · backup healthy → verify application recovery
          </div>
        </div>
      )}
    </section>
  );
}
