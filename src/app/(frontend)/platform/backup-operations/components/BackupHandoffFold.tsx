"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";

const READINESS_SIGNALS = [
  {
    label: "Protection status",
    detail: "All tier-1 workloads protected · payments-db incremental job restored",
  },
  {
    label: "Recovery-point availability",
    detail: "Latest clean recovery point verified on Dell PowerProtect DataDomain",
  },
  {
    label: "Policy compliance",
    detail: "RPO & retention policies aligned across Commvault, Veeam, and NetWorker",
  },
  {
    label: "Application dependencies",
    detail: "payments-db mapped to 3 dependent services · ready for deeper recovery validation",
  },
];

export function BackupHandoffFold() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
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

  const chipW = chipRef.current?.offsetWidth || 340;
  const chipSlideX = lineCoords ? Math.max(24, lineCoords.targetX - chipW - 28) : 0;

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
            margin: "0 0 52px 0",
          }}
        >
          Everyday backup operations establish the foundation—healthy jobs, verified replication, and policy compliance. See how MeshDefend extends operational health into continuous application dependency mapping and clean-room recovery assurance.
        </p>

        {/* ─── OPERATIONAL RECOVERY READINESS SIGNALS (SITEMAP ROW 14) ─── */}
        <div
          style={{
            border: "1px solid rgba(254, 253, 253, 0.14)",
            borderRadius: 4,
            background: "rgba(254, 253, 253, 0.03)",
            marginBottom: 56,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 20px",
              borderBottom: "1px solid rgba(254, 253, 253, 0.1)",
              fontFamily: "var(--font-body), Inter, sans-serif",
              fontSize: 11.5,
              fontWeight: 600,
              color: "#fefdfd",
              letterSpacing: "0.02em",
            }}
          >
            Operational readiness signals before handoff:
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
            className="readiness-signals-grid"
          >
            {READINESS_SIGNALS.map((sig, idx) => {
              const isLast = idx === READINESS_SIGNALS.length - 1;

              return (
                <div
                  key={sig.label}
                  style={{
                    padding: "20px 20px",
                    borderRight: isLast ? "none" : "1px solid rgba(254, 253, 253, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                  className="readiness-signal-cell"
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--orange)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      fontWeight: 700,
                    }}
                  >
                    {sig.label}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13,
                      lineHeight: 1.45,
                      color: "rgba(254, 253, 253, 0.8)",
                      margin: 0,
                    }}
                  >
                    {sig.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Giant Link Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: 20,
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
                color:
                  animStage === "completed" || isHovered
                    ? isHovered
                      ? "var(--orange)"
                      : "#fefdfd"
                    : "rgba(254, 253, 253, 0.45)",
                transition: "color 0.24s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Cyber Resilience ↗
            </span>
          </Link>
        </div>
      </div>

      {/* ─── Animated 1px Line & Moving Chip (Stops 28px before link, fades on complete) ─── */}
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
            ref={chipRef}
            style={{
              position: "absolute",
              left: 0,
              top: -14,
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
                  : "translateX(24px)",
              opacity: animStage === "drawing" ? 1 : 0,
              transition: "transform 0.9s cubic-bezier(0.65, 0, 0.15, 1), opacity 0.3s ease",
            }}
          >
            payments-db · backup healthy → verify application recovery
          </div>
        </div>
      )}
    </section>
  );
}
