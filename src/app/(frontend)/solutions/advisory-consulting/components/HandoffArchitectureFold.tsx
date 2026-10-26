"use client";

import React from "react";
import { motion } from "framer-motion";

const ADVISORY_INPUTS = [
  { id: "input-1", label: "Evidence" },
  { id: "input-2", label: "Gaps" },
  { id: "input-3", label: "Findings" },
  { id: "input-4", label: "Risks" },
];

const ENGINE_STEPS = [
  { id: "step-1", label: "Visualize", stepNum: "01" },
  { id: "step-2", label: "Analyze", stepNum: "02" },
  { id: "step-3", label: "Architect", stepNum: "03" },
  { id: "step-4", label: "Operationalize", stepNum: "04" },
];

export function HandoffArchitectureFold() {
  return (
    <section
      id="handoff-architecture"
      aria-label="Put MeshDefend Inside the Engagement"
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
        <div style={{ maxWidth: 960, marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: "var(--font-serif, 'Instrument Serif', Georgia, serif)",
              fontSize: "clamp(36px, 4.2vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--ink, #221f22)",
              fontWeight: 400,
              margin: "0 0 18px",
            }}
          >
            You uncover what needs to change. MeshDefend helps turn it into what happens next.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body, Inter, sans-serif)",
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--muted, #6b6568)",
              margin: 0,
              maxWidth: 780,
            }}
          >
            See how the evidence, gaps, risks, and findings discovered during the advisory engagement become inputs to MeshDefend.
          </p>
        </div>

        {/* The Handoff Architecture Component */}
        <div
          style={{
            border: "1px solid var(--border, rgba(34, 31, 34, 0.15))",
            borderRadius: 4,
            backgroundColor: "var(--bg, #fefdfd)",
            overflow: "hidden",
            boxShadow: "0 16px 40px -20px rgba(34, 31, 34, 0.08)",
          }}
        >
          {/* Split Screen Layout (5 Cols / 7 Cols) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              minHeight: 400,
            }}
          >
            {/* Left Side: 5 Cols - Static Advisory Inputs */}
            <div
              style={{
                gridColumn: "span 5",
                padding: "36px 32px",
                borderRight: "1px solid var(--border, rgba(34, 31, 34, 0.12))",
                backgroundColor: "var(--surface-raised, #faf9f8)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 28,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 8,
                      backgroundColor: "var(--orange, #f45532)",
                      borderRadius: "50%",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "var(--ink, #221f22)",
                      textTransform: "uppercase",
                    }}
                  >
                    Advisory Inputs
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {ADVISORY_INPUTS.map((item, idx) => (
                    <div
                      key={item.id}
                      style={{
                        padding: "16px 20px",
                        backgroundColor: "var(--bg, #fefdfd)",
                        border: "1px solid var(--border, rgba(34, 31, 34, 0.12))",
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body, Inter, sans-serif)",
                          fontSize: 15,
                          fontWeight: 500,
                          color: "var(--ink, #221f22)",
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                          fontSize: 11,
                          color: "var(--orange, #f45532)",
                          fontWeight: 600,
                        }}
                      >
                        [0{idx + 1}]
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative note */}
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 16,
                  borderTop: "1px dashed var(--border, rgba(34, 31, 34, 0.15))",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 11,
                  color: "var(--muted, #6b6568)",
                }}
              >
                Foundation Layer · Established by Advisor
              </div>
            </div>

            {/* Right Side: 7 Cols - MeshDefend Engine */}
            <div
              style={{
                gridColumn: "span 7",
                padding: "36px 36px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "var(--bg, #fefdfd)",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 28,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 8,
                      backgroundColor: "var(--ink, #221f22)",
                      borderRadius: "50%",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "var(--ink, #221f22)",
                      textTransform: "uppercase",
                    }}
                  >
                    MeshDefend Engine
                  </span>
                </div>

                {/* Staggered Engine Steps */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  {ENGINE_STEPS.map((step, idx) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: idx * 0.14,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        padding: "16px 22px",
                        backgroundColor: "var(--bg, #fefdfd)",
                        border: "1px solid var(--border, rgba(34, 31, 34, 0.14))",
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <span
                          style={{
                            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                            fontSize: 11,
                            color: "var(--muted, #6b6568)",
                            fontWeight: 600,
                          }}
                        >
                          {step.stepNum}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-body, Inter, sans-serif)",
                            fontSize: 16,
                            fontWeight: 600,
                            color: "var(--ink, #221f22)",
                          }}
                        >
                          {step.label}
                        </span>
                      </div>
                      <span
                        style={{
                          color: "var(--orange, #f45532)",
                          fontSize: 16,
                          fontWeight: 600,
                        }}
                      >
                        {idx < ENGINE_STEPS.length - 1 ? "↓" : "✓"}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Engine Flow Sequence summary */}
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 16,
                  borderTop: "1px dashed var(--border, rgba(34, 31, 34, 0.15))",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 11,
                  color: "var(--muted, #6b6568)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>Pipeline:</span>
                <span style={{ color: "var(--ink, #221f22)", fontWeight: 500 }}>
                  Visualize → Analyze → Architect → Operationalize
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar Spanning Both Columns */}
          <div
            style={{
              padding: "18px 32px",
              backgroundColor: "var(--surface-raised, #f4f3f2)",
              borderTop: "1px solid var(--border, rgba(34, 31, 34, 0.15))",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 7,
                  backgroundColor: "var(--orange, #f45532)",
                  borderRadius: "50%",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body, Inter, sans-serif)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--ink, #221f22)",
                }}
              >
                Advisor &amp; client continue to govern the outcome.
              </span>
            </div>

            <span
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 11,
                color: "var(--muted, #6b6568)",
                letterSpacing: "0.04em",
              }}
            >
              [ GOVERNANCE INTACT ]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
