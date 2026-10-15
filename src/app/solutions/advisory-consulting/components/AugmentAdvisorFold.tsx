"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function AugmentAdvisorFold() {
  const [activePhase, setActivePhase] = useState<number>(0);

  const phases = [
    {
      step: "01",
      role: "FOUNDATIONAL EXPERTISE",
      nodeType: "advisor",
      title: "Advisor Expertise",
      sub: "Discovery, Evidence, Gaps & Recommendations",
      details: [
        "Identifies governance blind spots & compliance exposures (DORA, NIS2, SEC)",
        "Discovers undocumented application & infrastructure dependencies",
        "Formulates strategic architectural recommendations & board-level roadmap",
      ],
      badge: "HUMAN EXPERTISE ANCHOR",
    },
    {
      step: "02",
      role: "ACCELERATION ENGINE",
      nodeType: "engine",
      title: "MeshDefend Engine",
      sub: "Visualize, Analyze & Solutionize",
      details: [
        "Autonomously ingests backup catalogs & storage WORM metadata",
        "Synthesizes deterministic DAG graphs from the advisor's findings",
        "Models failover scenarios and calculates real RTO/RPO posture scores",
      ],
      badge: "EVIDENCE SCALING FABRIC",
    },
    {
      step: "03",
      role: "SUSTAINED ENGAGEMENT",
      nodeType: "outcome",
      title: "Operational Outcome",
      sub: "Continuous Client Readiness",
      details: [
        "Transforms one-off assessment reports into ongoing managed advisory retainers",
        "Automated continuous posture audits validating client SLA adherence",
        "Advisor chairs recurring quarterly resilience posture reviews",
      ],
      badge: "EXPANDED BILLABLE LIFETIME",
    },
  ];

  return (
    <section
      id="augment-advisor"
      aria-label="Augment the Advisor, Don't Replace Them"
      style={{
        padding: "160px 0 100px",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blueprint Grid Canvas */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.35,
          zIndex: 0,
        }}
      >
        <defs>
          <pattern
            id="advisory-grid-pattern"
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
        <rect width="100%" height="100%" fill="url(#advisory-grid-pattern)" />
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
        {/* Eyebrow & Figure Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 32,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 14,
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
            [ SOLUTIONS · ADVISORY & CONSULTING PARTNERS ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 1 — THE VALUE CHAIN PIPELINE
          </span>
        </div>

        {/* Display H1 & Verbatim Hook */}
        <div style={{ maxWidth: 1040, marginBottom: 54 }}>
          <h1
            style={{
              fontFamily:
                'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(46px, 5.5vw, 82px)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 20,
            }}
          >
            Your expertise goes further when the evidence is already working for you.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: 820,
              margin: 0,
            }}
          >
            You discover the risks, gaps, and opportunities. MeshDefend builds on those findings
            to help visualize, analyze, solutionize, and ultimately operationalize what your advisory engagement uncovered.
          </p>
        </div>

        {/* Interactive Value Chain Pipeline Box */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: "14px 24px",
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--surface-raised, #f7f6f5)",
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
                THE DIVISION OF VALUE // ADVISOR ANCHORED ARCHITECTURE
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              ADVISOR FOUNDATION → MESHDEFEND ACCELERATION → EXPANDED PRACTICE
            </span>
          </div>

          {/* Horizontal 1px SVG Flow Diagram Connecting 3 Nodes */}
          <div style={{ position: "relative", height: 16, overflow: "visible" }}>
            <svg width="100%" height="16" style={{ position: "absolute", top: 0, left: 0 }}>
              <line x1="16%" y1="8" x2="84%" y2="8" stroke="var(--border)" strokeWidth="1.5" />
              {/* Traveling Pulse from Advisor -> Engine -> Outcome */}
              <motion.line
                x1="16%"
                y1="8"
                x2="84%"
                y2="8"
                stroke="var(--orange, #f45532)"
                strokeWidth="2.5"
                strokeDasharray="60 300"
                animate={{ strokeDashoffset: [-300, 360] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
              />
            </svg>
          </div>

          {/* 3 Sequential Nodes Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              backgroundColor: "var(--border)",
              gap: 1,
            }}
            className="hidden md:grid"
          >
            {phases.map((ph, idx) => {
              const isSelected = activePhase === idx;
              const isOrangeNode = ph.nodeType === "advisor";

              return (
                <div
                  key={ph.step}
                  onClick={() => setActivePhase(idx)}
                  style={{
                    backgroundColor: isSelected ? "var(--surface-raised, #faf9f8)" : "var(--bg)",
                    borderTop: isSelected ? "2px solid var(--orange, #f45532)" : "2px solid transparent",
                    padding: "36px 32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div>
                    {/* Header Step & Badge */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: 16,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 14,
                          fontWeight: 700,
                          color: isOrangeNode ? "var(--orange, #f45532)" : "var(--ink)",
                        }}
                      >
                        PHASE {ph.step}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9.5,
                          padding: "2px 6px",
                          backgroundColor: isSelected ? "var(--ink)" : "var(--surface-raised, #f7f6f5)",
                          color: isSelected ? "#fefdfd" : "var(--muted)",
                          border: "1px solid var(--border)",
                          fontWeight: 600,
                        }}
                      >
                        {ph.badge}
                      </span>
                    </div>

                    {/* Role Tag */}
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        color: "var(--muted)",
                        letterSpacing: "0.05em",
                        marginBottom: 6,
                      }}
                    >
                      {ph.role}
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: 28,
                        lineHeight: 1.15,
                        color: "var(--ink)",
                        fontWeight: 400,
                        marginBottom: 10,
                      }}
                    >
                      {ph.title}
                    </h3>

                    {/* Subtitle */}
                    <div
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 14,
                        fontWeight: 500,
                        color: isOrangeNode ? "var(--orange, #f45532)" : "var(--ink)",
                        marginBottom: 20,
                        lineHeight: 1.35,
                      }}
                    >
                      {ph.sub}
                    </div>

                    {/* Bullet Points */}
                    <div
                      style={{
                        borderTop: "1px solid var(--border)",
                        paddingTop: 16,
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      {ph.details.map((d, dIdx) => (
                        <div
                          key={dIdx}
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 8,
                            fontSize: 13,
                            fontFamily: 'var(--font-body), Inter, sans-serif',
                            color: "var(--muted)",
                            lineHeight: 1.45,
                          }}
                        >
                          <span style={{ color: "var(--orange, #f45532)", fontSize: 11 }}>▸</span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Indicator */}
                  <div
                    style={{
                      marginTop: 24,
                      paddingTop: 12,
                      borderTop: "1px dashed var(--border)",
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: isSelected ? "var(--orange, #f45532)" : "var(--muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span>{isSelected ? "● ACTIVE PERSPECTIVE" : "○ CLICK TO INSPECT"}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Fallback: Vertical Cards */}
          <div className="flex flex-col md:hidden divide-y divide-[var(--border)]">
            {phases.map((ph) => (
              <div key={ph.step} style={{ padding: "24px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--orange, #f45532)" }}>
                    PHASE {ph.step} · {ph.title}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--muted)" }}>
                    {ph.badge}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>
                  {ph.sub}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {ph.details.map((d, dIdx) => (
                    <div key={dIdx} style={{ fontSize: 12.5, fontFamily: "var(--font-body)", color: "var(--muted)" }}>
                      • {d}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Core Philosophy Banner */}
          <div
            style={{
              padding: "18px 24px",
              backgroundColor: "var(--surface-raised, #f7f6f5)",
              borderTop: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--ink)",
              }}
            >
              RULE OF ARCHITECTURE:{" "}
              <span style={{ color: "var(--orange, #f45532)", fontWeight: 600 }}>
                MeshDefend never conducts independent client discovery.
              </span>{" "}
              It builds directly upon the advisor&apos;s findings.
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 10.5,
                color: "var(--muted)",
              }}
            >
              PROTECTING PRACTICE IP
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
