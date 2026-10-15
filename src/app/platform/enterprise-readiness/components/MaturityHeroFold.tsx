"use client";

import { motion } from "framer-motion";

export function MaturityHeroFold() {
  const h1Lines = [
    "Enterprise-ready means working",
    "when the environment gets complicated.",
  ];

  return (
    <section
      id="enterprise-maturity"
      aria-label="Establish Enterprise Maturity"
      style={{
        padding: "160px 0 100px",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Faint 1px Graph-Paper SVG Background */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.45,
          zIndex: 0,
        }}
      >
        <defs>
          <pattern
            id="hero-graph-paper"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-graph-paper)" />
      </svg>

      <div
        className="container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Eyebrow & Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 36,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              fontWeight: 600,
              color: "var(--orange, #f45532)",
              letterSpacing: "0.06em",
            }}
          >
            [ PLATFORM CAPABILITIES · ENTERPRISE READINESS ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 1 — FALSIFIABLE TRUST & OPERATIONAL MATURITY
          </span>
        </div>

        {/* Display H1: Masked Line-by-Line Staggered Reveal */}
        <div style={{ maxWidth: 1060, marginBottom: 32 }}>
          <h1
            style={{
              fontFamily:
                'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(52px, 6.2vw, 86px)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              fontWeight: 400,
              margin: 0,
            }}
          >
            {h1Lines.map((line, idx) => (
              <span
                key={idx}
                style={{
                  display: "block",
                  overflow: "hidden",
                  paddingBottom: "4px",
                }}
              >
                <motion.span
                  style={{ display: "block" }}
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: idx * 0.18 + 0.1,
                    ease: [0.16, 1, 0.3, 1], // Spring-like cubic bezier
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Body Text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          style={{
            fontFamily: 'var(--font-body), Inter, sans-serif',
            fontSize: 18,
            lineHeight: 1.55,
            color: "var(--muted)",
            maxWidth: 820,
            margin: "0 0 64px 0",
          }}
        >
          We establish MeshDefend’s operating maturity through verifiable facts, scale metrics,
          and governed architecture, not marketing adjectives.
        </motion.p>

        {/* Structural Spec Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: 7,
                backgroundColor: "var(--orange, #f45532)",
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                fontWeight: 600,
                color: "var(--ink)",
                letterSpacing: "0.04em",
              }}
            >
              SCRUTINY VERIFICATION BASELINE
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            INDEPENDENTLY AUDITABLE PRODUCTION ATTRIBUTES
          </span>
        </motion.div>
      </div>
    </section>
  );
}
