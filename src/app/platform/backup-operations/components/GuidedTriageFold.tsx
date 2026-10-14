"use client";

import { useState } from "react";
import { SpringReveal } from "@/components/motion/SpringReveal";

interface ContextRow {
  index: string;
  dimension: string;
  evidence: string;
  source: string;
}

const CONTEXT_ROWS: ContextRow[] = [
  {
    index: "01",
    dimension: "Job history",
    evidence: "Succeeded 14 consecutive nights; failed at 02:41 after config change",
    source: "Veeam B&R Telemetry Log",
  },
  {
    index: "02",
    dimension: "Infrastructure state",
    evidence: "Stale snapshot handle held on primary storage array volume vol-094",
    source: "Pure/Dell SAN Array API",
  },
  {
    index: "03",
    dimension: "Protection configuration",
    evidence: "4-hour RPO policy; next scheduled window in 1h 18m",
    source: "ResOC Policy Catalog",
  },
  {
    index: "04",
    dimension: "Recent changes",
    evidence: "ServiceNow CHG0019201 updated storage multipath policy at 01:50",
    source: "ServiceNow CMDB Sync",
  },
  {
    index: "05",
    dimension: "Asset criticality",
    evidence: "Tier-1 database · 3 dependent customer-facing applications",
    source: "MVC Application Map",
  },
];

export function GuidedTriageFold() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="guided-triage"
      style={{
        padding: "112px 0 120px",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div className="container">
        <SpringReveal>
          {/* Figure Caption */}
          <div
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--muted)",
              textTransform: "uppercase",
              marginBottom: 20,
              fontWeight: 600,
            }}
          >
            FIG. 4 — CONTEXT-ASSEMBLED DIAGNOSTICS
          </div>

          {/* Section Header */}
          <div style={{ maxWidth: 840, marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(38px, 4.4vw, 62px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                fontWeight: 400,
                margin: "0 0 18px 0",
              }}
            >
              A failed job shouldn’t start a scavenger hunt.
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                fontSize: "clamp(16px, 1.8vw, 18.5px)",
                color: "var(--muted)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              When a backup or replication job fails, operators shouldn&apos;t have to hunt through storage consoles, change tickets, and runbooks to understand why. MeshDefend assembles the evidence behind every recommendation so the operator can verify the reasoning in seconds.
            </p>
          </div>

          {/* ─── INTERACTIVE EVIDENCE GRAPH (7/5 ASYMMETRIC SPLIT) ─── */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "5fr 7fr",
              }}
              className="triage-split-grid"
            >
              {/* Left Column (5 Cols): Active Exception & Guided Recommendation */}
              <div
                style={{
                  padding: "36px 32px",
                  borderRight: "1px solid var(--border)",
                  background: "var(--surface)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                className="triage-left-col"
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 16,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--orange)",
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: "var(--orange)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      ACTIVE EXCEPTION // TRIAGE VERDICT
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 28,
                      lineHeight: 1.15,
                      color: "var(--ink)",
                      marginBottom: 8,
                    }}
                  >
                    Backup failure · payments-db
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 12,
                      color: "var(--muted)",
                      marginBottom: 24,
                    }}
                  >
                    Error: Snapshot lock timeout (0x80042306)
                  </div>

                  {/* Recommendation Box on Paper */}
                  <div
                    style={{
                      padding: "20px",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderLeft: "2px solid var(--orange)",
                      borderRadius: 4,
                      marginBottom: 24,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        fontWeight: 700,
                        color: "var(--orange)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      RECOMMENDED REMEDIATION ACTION
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-body), Inter, sans-serif",
                        fontSize: 14.5,
                        fontWeight: 600,
                        color: "var(--ink)",
                        lineHeight: 1.45,
                        margin: "0 0 10px 0",
                      }}
                    >
                      Release stale SAN snapshot lock and re-trigger incremental job.
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body), Inter, sans-serif",
                        fontSize: 13,
                        color: "var(--muted)",
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      Root-cause correlated to SAN volume vol-094 lock handle remaining active after 01:50 multipath change. Releasing lock clears buffer for instant retry.
                    </p>
                  </div>
                </div>

                {/* Grounding Confidence Strip */}
                <div
                  style={{
                    padding: "12px 16px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--ink)",
                      fontWeight: 600,
                    }}
                  >
                    CONFIDENCE: 98%
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      color: "var(--muted)",
                    }}
                  >
                    GROUNDED IN 5 SIGNALS →
                  </span>
                </div>
              </div>

              {/* Right Column (7 Cols): 5 Connected Context Rows */}
              <div
                style={{
                  background: "var(--bg)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    padding: "20px 28px",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "var(--surface)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    CONNECTED CONTEXT CORRELATIONS (5 SIGNALS)
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      color: "var(--muted)",
                    }}
                  >
                    HOVER TO INSPECT
                  </span>
                </div>

                {CONTEXT_ROWS.map((row, idx) => {
                  const isHovered = hoveredIdx === idx;
                  const isLast = idx === CONTEXT_ROWS.length - 1;

                  return (
                    <div
                      key={row.index}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      style={{
                        padding: "24px 28px",
                        borderBottom: isLast ? "none" : "1px solid var(--border)",
                        background: isHovered ? "var(--surface)" : "var(--bg)",
                        position: "relative",
                        transition: "background 0.18s ease",
                        cursor: "default",
                      }}
                    >
                      {/* Left Orange Accent on Hover */}
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 2,
                          background: "var(--orange)",
                          transform: isHovered ? "scaleY(1)" : "scaleY(0)",
                          transition: "transform 0.2s ease",
                        }}
                      />

                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                          marginBottom: 8,
                          gap: 12,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 11,
                              color: isHovered ? "var(--orange)" : "var(--muted)",
                              fontWeight: 700,
                            }}
                          >
                            {row.index}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-body), Inter, sans-serif",
                              fontSize: 14,
                              fontWeight: 600,
                              color: "var(--ink)",
                              textTransform: "capitalize",
                            }}
                          >
                            {row.dimension}
                          </span>
                        </div>

                        <span
                          style={{
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontSize: 10,
                            color: "var(--muted)",
                          }}
                        >
                          {row.source}
                        </span>
                      </div>

                      <p
                        style={{
                          fontFamily: "var(--font-body), Inter, sans-serif",
                          fontSize: 14,
                          lineHeight: 1.5,
                          color: isHovered ? "var(--ink)" : "var(--muted)",
                          margin: 0,
                          paddingLeft: 22,
                          transition: "color 0.18s ease",
                        }}
                      >
                        {row.evidence}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </SpringReveal>
      </div>
    </section>
  );
}
