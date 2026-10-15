"use client";

import React from "react";
import { motion } from "framer-motion";

export function AdvisorImpactFold() {
  return (
    <section
      id="advisor-impact"
      aria-label="Prove the Advisory Impact"
      style={{
        padding: "110px 0 120px",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border, rgba(34, 31, 34, 0.1))",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Header Block */}
        <div style={{ maxWidth: 940, marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: "var(--font-serif, 'Instrument Serif', Georgia, serif)",
              fontSize: "clamp(36px, 4.2vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--ink, #221f22)",
              fontWeight: 400,
              margin: 0,
            }}
          >
            More client engagements. More value from every assessment.
          </h2>
        </div>

        {/* Advisor Metric Bento (Exposed 1px Grid with 2 Primary Metrics) */}
        <div
          style={{
            border: "1px solid var(--border, rgba(34, 31, 34, 0.15))",
            borderRadius: 4,
            backgroundColor: "var(--bg, #fefdfd)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            boxShadow: "0 16px 40px -20px rgba(34, 31, 34, 0.08)",
            overflow: "hidden",
          }}
        >
          {/* Metric 1: Assessment Turnaround (Visual comparison: X weeks vs Y weeks) */}
          <div
            style={{
              padding: "40px 36px",
              borderRight: "1px solid var(--border, rgba(34, 31, 34, 0.12))",
              borderBottom: "1px solid var(--border, rgba(34, 31, 34, 0.12))",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 12,
                  color: "var(--orange, #f45532)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  marginBottom: 16,
                  textTransform: "uppercase",
                }}
              >
                [ METRIC 01 ]
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-body, Inter, sans-serif)",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "var(--ink, #221f22)",
                  marginBottom: 32,
                }}
              >
                Assessment Turnaround
              </h3>

              {/* Visual Comparison: X weeks vs Y weeks */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Traditional: X weeks */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 12,
                      color: "var(--muted, #6b6568)",
                      marginBottom: 8,
                    }}
                  >
                    <span>Traditional Assessment</span>
                    <span style={{ fontWeight: 600, color: "var(--ink, #221f22)" }}>X weeks</span>
                  </div>
                  <div
                    style={{
                      height: 12,
                      width: "100%",
                      backgroundColor: "var(--surface-raised, #f0eee9)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      style={{
                        height: "100%",
                        backgroundColor: "var(--muted, #8e8789)",
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: "90%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>

                {/* With MeshDefend: Y weeks */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 12,
                      color: "var(--orange, #f45532)",
                      marginBottom: 8,
                    }}
                  >
                    <span>With MeshDefend Evidence</span>
                    <span style={{ fontWeight: 600, color: "var(--orange, #f45532)" }}>Y weeks</span>
                  </div>
                  <div
                    style={{
                      height: 12,
                      width: "100%",
                      backgroundColor: "var(--surface-raised, #f0eee9)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      style={{
                        height: "100%",
                        backgroundColor: "var(--orange, #f45532)",
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: "35%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 32,
                paddingTop: 16,
                borderTop: "1px dashed var(--border, rgba(34, 31, 34, 0.15))",
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 11,
                color: "var(--muted, #6b6568)",
              }}
            >
              Visual comparison: X weeks vs Y weeks
            </div>
          </div>

          {/* Metric 2: Engagement Scope (Visual: Expanded follow-on retainers created) */}
          <div
            style={{
              padding: "40px 36px",
              borderBottom: "1px solid var(--border, rgba(34, 31, 34, 0.12))",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "var(--surface-raised, #faf9f8)",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 12,
                  color: "var(--ink, #221f22)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  marginBottom: 16,
                  textTransform: "uppercase",
                }}
              >
                [ METRIC 02 ]
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-body, Inter, sans-serif)",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "var(--ink, #221f22)",
                  marginBottom: 32,
                }}
              >
                Engagement Scope
              </h3>

              {/* Visual: Expanded follow-on retainers created */}
              <div
                style={{
                  padding: "24px 20px",
                  backgroundColor: "var(--bg, #fefdfd)",
                  border: "1px solid var(--border, rgba(34, 31, 34, 0.14))",
                  borderRadius: 3,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-serif, 'Instrument Serif', Georgia, serif)",
                    fontSize: "clamp(26px, 2.5vw, 34px)",
                    lineHeight: 1.15,
                    color: "var(--ink, #221f22)",
                    marginBottom: 12,
                  }}
                >
                  Expanded follow-on retainers created
                </div>

                {/* Animated Scope Expansion Visualization */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 2fr",
                    alignItems: "center",
                    gap: 12,
                    marginTop: 16,
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "var(--surface-raised, #f4f3f2)",
                      border: "1px solid var(--border, rgba(34, 31, 34, 0.15))",
                      textAlign: "center",
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 11,
                      color: "var(--muted, #6b6568)",
                    }}
                  >
                    Assessment
                  </div>
                  <span style={{ color: "var(--orange, #f45532)", fontWeight: 700 }}>→</span>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                      padding: "10px",
                      backgroundColor: "var(--bg, #fefdfd)",
                      border: "1.5px solid var(--orange, #f45532)",
                      textAlign: "center",
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 11,
                      color: "var(--orange, #f45532)",
                      fontWeight: 600,
                    }}
                  >
                    Ongoing Retainers &amp; Oversight
                  </motion.div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 32,
                paddingTop: 16,
                borderTop: "1px dashed var(--border, rgba(34, 31, 34, 0.15))",
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 11,
                color: "var(--muted, #6b6568)",
              }}
            >
              Visual: Expanded follow-on retainers created
            </div>
          </div>
        </div>

        {/* Small Disclaimer */}
        <div style={{ marginTop: 20 }}>
          <span
            style={{
              fontFamily: "var(--font-body, Inter, sans-serif)",
              fontSize: 12,
              color: "var(--muted, #6b6568)",
              fontStyle: "italic",
            }}
          >
            (Illustrative advisory metrics)
          </span>
        </div>
      </div>
    </section>
  );
}
