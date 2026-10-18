"use client";

import React from "react";
import { motion } from "framer-motion";

const PHASES = [
  {
    num: "01",
    title: "Assessment",
    accent: "rgba(255, 255, 255, 0.4)",
  },
  {
    num: "02",
    title: "Findings & Gaps",
    accent: "rgba(255, 255, 255, 0.6)",
  },
  {
    num: "03",
    title: "MeshDefend Solutioning",
    accent: "var(--orange, #f45532)",
  },
  {
    num: "04",
    title: "Follow-on Opportunity & Ongoing Client Value",
    accent: "var(--orange, #f45532)",
  },
];

export function RevenueExpansionFold() {
  return (
    <section
      id="revenue-expansion"
      aria-label="Make the Advisory Model More Valuable"
      style={{
        padding: "120px 0 130px",
        backgroundColor: "#221f22",
        color: "#fefdfd",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Header Block */}
        <div style={{ maxWidth: 940, marginBottom: 64 }}>
          <h2
            style={{
              fontFamily: "var(--font-serif, 'Instrument Serif', Georgia, serif)",
              fontSize: "clamp(38px, 4.4vw, 58px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#fefdfd",
              fontWeight: 400,
              margin: "0 0 18px",
            }}
          >
            Don’t just deliver the assessment. Build what comes next.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body, Inter, sans-serif)",
              fontSize: 18,
              lineHeight: 1.6,
              color: "rgba(255, 255, 255, 0.72)",
              margin: 0,
              maxWidth: 780,
            }}
          >
            Turning advisory findings into structured remediation architecture and operational workflows creates sustained economic opportunity for the advisory firm.
          </p>
        </div>

        {/* Commercial Journey Timeline: Vertical 1px line connecting 4 expanding business phases */}
        <div
          style={{
            position: "relative",
            maxWidth: 820,
            margin: "0 auto",
            paddingLeft: 40,
          }}
        >
          {/* Vertical 1px Line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 16,
              bottom: 16,
              left: 11,
              width: 1,
              backgroundColor: "rgba(255, 255, 255, 0.18)",
            }}
          >
            <motion.div
              style={{
                width: 1,
                backgroundColor: "var(--orange, #f45532)",
                height: "100%",
                originY: 0,
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* 4 Expanding Phases */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {PHASES.map((phase, idx) => (
              <motion.div
                key={phase.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* Node Dot on 1px Line */}
                <div
                  style={{
                    position: "absolute",
                    left: -40,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 23,
                    height: 23,
                    borderRadius: "50%",
                    backgroundColor: "#221f22",
                    border: `1.5px solid ${phase.accent}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      backgroundColor: phase.accent,
                    }}
                  />
                </div>

                {/* Phase Block */}
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#181618",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 3,
                    padding: "24px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                        fontSize: 12,
                        color: phase.accent,
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                      }}
                    >
                      PHASE {phase.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body, Inter, sans-serif)",
                        fontSize: "clamp(16px, 1.8vw, 20px)",
                        fontWeight: 600,
                        color: "#fefdfd",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {phase.title}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 11,
                      color: "rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    [ EXPANDING VALUE ]
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
