"use client";

import { useState } from "react";
import { SpringReveal } from "@/components/motion/SpringReveal";

export function ExceptionDrivenFold() {
  const [selectedException, setSelectedException] = useState<number>(0);

  return (
    <section
      id="exception-driven"
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
            FIG. 3 — CORRELATED EXCEPTIONS OVER REPETITIVE CHECKING
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
              Your team shouldn’t have to check what’s already working.
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
              Operators lose hours verifying thousands of successful jobs just to spot the two failures that actually threaten recovery. MeshDefend correlates backup, storage, and infrastructure signals upstream—keeping routine success quiet and surfacing only the exceptions that break protection.
            </p>
          </div>

          {/* ─── SIGNAL COMPRESSION MATRIX (7 / 5 ASYMMETRIC SPLIT) ─── */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            {/* Top Bar Meta */}
            <div
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
                background: "var(--bg)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--ink)",
                    opacity: 0.6,
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    color: "var(--ink)",
                    textTransform: "uppercase",
                  }}
                >
                  SIGNAL COMPRESSION MATRIX // 2,418 SIGNALS INGESTED
                </span>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--orange)",
                  fontWeight: 600,
                }}
              >
                2 EXCEPTIONS CORRELATED (99.92% NOISE SUPPRESSED)
              </span>
            </div>

            {/* Split View */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
              }}
              className="compression-split-grid"
            >
              {/* Left Column: 2,400+ Calm Overnight Jobs */}
              <div
                style={{
                  padding: "32px 28px",
                  borderRight: "1px solid var(--border)",
                  background: "var(--surface)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                className="compression-left-col"
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 16,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      ROUTINE OVERNIGHT JOBS (QUIET · WITHIN POLICY)
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--muted)",
                      }}
                    >
                      2,416 / 2,418 OK
                    </span>
                  </div>

                  {/* Dense Pattern of 12% Opacity Ink Ticks */}
                  <div
                    style={{
                      padding: "20px 16px",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(24, 1fr)",
                        gap: "6px 4px",
                        opacity: 0.28,
                      }}
                    >
                      {Array.from({ length: 144 }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            height: 10,
                            background: "var(--ink)",
                            borderRadius: 1,
                          }}
                          title={`Routine backup job #${1800 + i} · Verified`}
                        />
                      ))}
                    </div>
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    2,416 scheduled VMware snapshots, SQL transaction logs, and cloud storage replication cycles verified and indexed in the background without triggering alerts or operator paging.
                  </p>
                </div>

                {/* Upstream correlation note */}
                <div
                  style={{
                    marginTop: 24,
                    paddingTop: 16,
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
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
                    UPSTREAM CORRELATION FILTER:
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13,
                      color: "var(--muted)",
                    }}
                  >
                    Suppresses repetitive success logs across Veeam, Commvault & NetWorker
                  </span>
                </div>
              </div>

              {/* Right Column: 2 Correlated Operational Exceptions */}
              <div
                style={{
                  padding: "32px 28px",
                  background: "var(--bg)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--orange)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  SURFACED CORRELATED EXCEPTIONS (2)
                </div>

                {/* Exception 01 */}
                <div
                  onClick={() => setSelectedException(0)}
                  style={{
                    padding: "20px 22px",
                    background: selectedException === 0 ? "var(--surface)" : "var(--bg)",
                    border: "1px solid var(--border)",
                    borderLeft: "2px solid var(--orange)",
                    borderRadius: 4,
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: "var(--orange)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      EXCEPTION 01 // CRITICAL PATH
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        color: "var(--muted)",
                      }}
                    >
                      02:41 UTC
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--ink)",
                      lineHeight: 1.35,
                      margin: "0 0 8px 0",
                    }}
                  >
                    Snapshot lock contention on payments-db
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      margin: "0 0 12px 0",
                    }}
                  >
                    Correlated across Veeam job error log (VSS timeout) and primary SAN volume state (stale snapshot lock remaining active).
                  </p>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--ink)",
                      background: "rgba(244, 85, 50, 0.08)",
                      padding: "4px 8px",
                      borderRadius: 3,
                      display: "inline-block",
                    }}
                  >
                    Veeam Job Log + SAN Volume Array State
                  </div>
                </div>

                {/* Exception 02 */}
                <div
                  onClick={() => setSelectedException(1)}
                  style={{
                    padding: "20px 22px",
                    background: selectedException === 1 ? "var(--surface)" : "var(--bg)",
                    border: "1px solid var(--border)",
                    borderLeft: "2px solid var(--orange)",
                    borderRadius: 4,
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: "var(--orange)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      EXCEPTION 02 // COVERAGE GAP
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        color: "var(--muted)",
                      }}
                    >
                      04:12 UTC
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--ink)",
                      lineHeight: 1.35,
                      margin: "0 0 8px 0",
                    }}
                  >
                    Unprotected production asset drift
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      margin: "0 0 12px 0",
                    }}
                  >
                    Correlated across newly provisioned AWS EC2 workloads in us-east-1 and Commvault protection policy group catalog.
                  </p>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--ink)",
                      background: "rgba(244, 85, 50, 0.08)",
                      padding: "4px 8px",
                      borderRadius: 3,
                      display: "inline-block",
                    }}
                  >
                    AWS Cloud Inventory + Commvault Policy Catalog
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SpringReveal>
      </div>
    </section>
  );
}
