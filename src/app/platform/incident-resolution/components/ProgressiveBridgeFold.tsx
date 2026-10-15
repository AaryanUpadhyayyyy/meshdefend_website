"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { SpringReveal } from "@/components/motion/SpringReveal";

export function ProgressiveBridgeFold() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animStage, setAnimStage] = useState<"idle" | "traveling" | "completed">("idle");
  const [isHovered, setIsHovered] = useState(false);

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
          setAnimStage("traveling");
          observer.disconnect();

          const timer = setTimeout(() => {
            setAnimStage("completed");
          }, 1100);

          return () => clearTimeout(timer);
        }
      },
      { threshold: [0.35, 0.45] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="progressive-bridge"
      style={{
        background: "#221f22",
        color: "#fefdfd",
        position: "relative",
        padding: "120px 0 100px",
        overflow: "hidden",
        borderTop: "1px solid rgba(254, 253, 253, 0.08)",
      }}
      aria-labelledby="bridge-display-heading"
    >
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <SpringReveal>
          {/* Progression Step Strip */}
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
            aria-label="Resilience progression"
          >
            <Link
              href="/platform/observability"
              style={{ color: "rgba(254, 253, 253, 0.65)", textDecoration: "none" }}
            >
              See what matters
            </Link>
            <span style={{ color: "rgba(254, 253, 253, 0.3)" }}>→</span>
            <span style={{ color: "#fefdfd", fontWeight: 600 }}>Resolve what needs action</span>
            <span style={{ color: "rgba(254, 253, 253, 0.3)" }}>→</span>
            <Link
              href="/platform/cyber-resilience"
              style={{ color: "rgba(254, 253, 253, 0.65)", textDecoration: "none" }}
            >
              Learn from what happened
            </Link>
          </div>

          {/* Display H2 Heading */}
          <div style={{ maxWidth: 880, marginBottom: 48 }}>
            <h2
              id="bridge-display-heading"
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
                See what matters. Resolve what needs action.
              </span>
              <span style={{ display: "block", color: "var(--orange)", fontStyle: "italic" }}>
                Learn from what happened.
              </span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                fontSize: "clamp(16px, 1.8vw, 18.5px)",
                color: "rgba(254, 253, 253, 0.7)",
                lineHeight: 1.6,
                maxWidth: "60ch",
                marginTop: 20,
              }}
            >
              Every resolved incident becomes institutional memory. The correlation models, approval records, and verified remediation recipes update Agent Mesh™ to prevent recurring false alarms.
            </p>
          </div>

          {/* ─── Animated 1px Signal Line & Morphing Bead ─── */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 120,
              margin: "24px 0 48px",
              borderTop: "1px solid rgba(254, 253, 253, 0.1)",
              borderBottom: "1px solid rgba(254, 253, 253, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
            }}
          >
            {/* Origin Node */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                zIndex: 2,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--orange)",
                  boxShadow: "0 0 12px var(--orange)",
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 12,
                  color: "#fefdfd",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                [ Incident Resolved ]
              </span>
            </div>

            {/* Traveling Laser Rail across the container */}
            <div
              style={{
                position: "absolute",
                left: 190,
                right: 280,
                height: 1,
                background: "rgba(254, 253, 253, 0.15)",
                overflow: "visible",
              }}
            >
              {/* Traveling Pulse Line */}
              <div
                style={{
                  height: "100%",
                  width: animStage === "idle" ? "0%" : "100%",
                  background: "linear-gradient(90deg, transparent, var(--orange))",
                  transition: "width 1.0s cubic-bezier(0.65, 0, 0.15, 1)",
                }}
              />

              {/* Glowing Pulse Bead */}
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  left: animStage === "idle" ? "0%" : "100%",
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: "#ffffff",
                  boxShadow: "0 0 16px var(--orange), 0 0 8px var(--orange)",
                  transform: "translateX(-50%)",
                  transition: "left 1.0s cubic-bezier(0.65, 0, 0.15, 1)",
                  opacity: animStage === "completed" ? 0.3 : 1,
                }}
              />
            </div>

            {/* Target Node */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 12,
                  color: animStage === "completed" ? "var(--orange)" : "rgba(254, 253, 253, 0.6)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  transition: "color 0.3s ease",
                }}
              >
                [ Agent Mesh™ Memory Updated ]
              </span>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: animStage === "completed" ? "var(--orange)" : "rgba(254, 253, 253, 0.2)",
                  boxShadow: animStage === "completed" ? "0 0 12px var(--orange)" : "none",
                  transition: "all 0.3s ease",
                }}
              />
            </div>
          </div>

          {/* Asymmetric Transition Link to Cyber Resilience */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
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
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "clamp(32px, 3.8vw, 52px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: isHovered ? "var(--orange)" : "#fefdfd",
                  transition: "color 0.24s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                Explore Cyber Resilience ↗
              </span>
            </Link>
          </div>
        </SpringReveal>
      </div>
    </section>
  );
}
