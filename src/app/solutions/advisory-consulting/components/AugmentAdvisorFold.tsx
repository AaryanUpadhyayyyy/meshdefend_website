"use client";

import React from "react";
import { motion } from "framer-motion";

export function AugmentAdvisorFold() {
  return (
    <section
      id="augment-advisor"
      style={{
        position: "relative",
        paddingTop: "calc(76px + 64px)", // Navbar clearance + breathing room
        paddingBottom: "96px",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border, rgba(34, 31, 34, 0.1))",
        overflow: "hidden",
      }}
    >
      {/* Exposed 1px Grid Background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, var(--border, rgba(34, 31, 34, 0.1)) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border, rgba(34, 31, 34, 0.1)) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          opacity: 0.45,
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Eyebrow */}
        <div style={{ marginBottom: 20 }}>
          <span
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "var(--orange, #f45532)",
              textTransform: "uppercase",
              display: "inline-block",
              fontWeight: 600,
            }}
          >
            [ SOLUTIONS · ADVISORY &amp; CONSULTING ]
          </span>
        </div>

        {/* Massive H1 */}
        <h1
          style={{
            fontFamily: "var(--font-serif, 'Instrument Serif', Georgia, serif)",
            fontSize: "clamp(44px, 5.4vw, 84px)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            color: "var(--ink, #221f22)",
            maxWidth: 1040,
            margin: "0 0 28px",
            fontWeight: 400,
          }}
        >
          Your expertise goes further when the evidence is already working for you.
        </h1>

        {/* Body Paragraph */}
        <p
          style={{
            fontFamily: "var(--font-body, Inter, sans-serif)",
            fontSize: 18,
            lineHeight: 1.6,
            color: "var(--muted, #6b6568)",
            maxWidth: 780,
            margin: "0 0 64px",
          }}
        >
          The advisor discovers the risks, gaps, and opportunities. MeshDefend builds on those findings to help visualize, analyze, solutionize, and ultimately operationalize what the advisory engagement uncovered.
        </p>

        {/* Interactive Value Chain Flow Diagram */}
        <div
          style={{
            position: "relative",
            background: "var(--bg, #fefdfd)",
            border: "1px solid var(--border, rgba(34, 31, 34, 0.1))",
            borderRadius: 4,
            padding: "48px 36px",
            boxShadow: "0 20px 48px -24px rgba(34, 31, 34, 0.08)",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 32,
              alignItems: "center",
            }}
          >
            {/* SVG Connecting Pipeline (Desktop & Tablet) */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "50%",
                left: "12%",
                right: "12%",
                height: 2,
                transform: "translateY(-50%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              <svg
                width="100%"
                height="100%"
                style={{ overflow: "visible" }}
                preserveAspectRatio="none"
              >
                {/* Background Track Line */}
                <line
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="var(--border, rgba(34, 31, 34, 0.15))"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Animated 1px Pipeline drawing Left-to-Right */}
                <motion.line
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="var(--orange, #f45532)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
            </div>

            {/* Left Node: Advisor Expertise (Orange emphasis) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                position: "relative",
                zIndex: 1,
                background: "var(--bg, #fefdfd)",
                border: "1.5px solid var(--orange, #f45532)",
                borderRadius: 4,
                padding: "28px 24px",
                boxShadow: "0 8px 24px -8px rgba(244, 85, 50, 0.2)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--orange, #f45532)",
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                }}
              >
                [ Advisor Expertise: Discovery &amp; Assessment ]
              </div>
            </motion.div>

            {/* Middle Node: MeshDefend (Ink emphasis) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{
                position: "relative",
                zIndex: 1,
                background: "var(--bg, #fefdfd)",
                border: "1.5px solid var(--ink, #221f22)",
                borderRadius: 4,
                padding: "28px 24px",
                boxShadow: "0 8px 24px -8px rgba(34, 31, 34, 0.14)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--ink, #221f22)",
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                }}
              >
                [ MeshDefend: Visualize &amp; Operationalize ]
              </div>
            </motion.div>

            {/* Right Node: Client Outcome */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                position: "relative",
                zIndex: 1,
                background: "var(--bg, #fefdfd)",
                border: "1px solid var(--border, rgba(34, 31, 34, 0.2))",
                borderRadius: 4,
                padding: "28px 24px",
                boxShadow: "0 8px 20px -8px rgba(34, 31, 34, 0.06)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--ink, #221f22)",
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                }}
              >
                [ Client Outcome ]
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
