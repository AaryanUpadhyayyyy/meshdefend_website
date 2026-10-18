"use client";

import { useState } from "react";

export function PostureSplitFold() {
  const [activeBento, setActiveBento] = useState<number>(0);

  const bentoItems = [
    {
      title: "Clean recovery-point unavailable",
      status: "AT RISK",
      score: "75%",
      detail:
        "Anomalous file encryption entropy spike detected 32 minutes prior to backup window. Restoring the latest snapshot restores the dormant ransomware payload.",
      auditNote: "Traditional backup treats encrypted bytes as successful writes.",
    },
    {
      title: "Dependency readiness gap",
      status: "AT RISK",
      score: "65%",
      detail:
        "Redis session cache cluster and IAM token mounts excluded from the disaster recovery protection plan. The database restore boots into cascading 503 gateway timeouts.",
      auditNote: "Standard backup evaluates host VMs, not application topology.",
    },
    {
      title: "Infrastructure mismatch",
      status: "AT RISK",
      score: "76%",
      detail:
        "Target recovery availability zone lacks reserved compute instance quota for parallel database rehydration. Projected restoration duration expands by +14 hours.",
      auditNote: "Storage admins do not monitor cloud VPC compute quotas.",
    },
  ];

  return (
    <section
      id="posture-drift"
      aria-label="From Backup Posture to Recovery Posture"
      style={{
        padding: "120px 0",
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Eyebrow & Figure Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 28,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 14,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              fontWeight: 500,
              color: "var(--muted)",
              letterSpacing: "0.04em",
            }}
          >
            [ RECOVERY VERIFICATION // POSTURE DRIFT ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 3 — POSTURE DRIFT CORRELATION
          </span>
        </div>

        {/* Display H2 & Verbatim Narrative (NO FAKE PARAGRAPHS) */}
        <div style={{ maxWidth: 960, marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(36px, 4vw, 56px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 20,
            }}
          >
            Your backups can be healthy while your application still isn’t ready to recover.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 19,
              lineHeight: 1.55,
              color: "var(--ink)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Shift from asking &apos;Are my backups healthy?&apos; to &apos;Can this application
            actually recover?&apos; Good backup posture does not automatically mean good recovery
            posture.
          </p>
        </div>

        {/* 12-Column Split Posture Dashboard (5 cols vs 7 cols) */}
        <div
          className="posture-split-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 7fr",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
          }}
        >
          {/* Left Column (5 cols): BACKUP POSTURE */}
          <div
            style={{
              padding: "36px 32px",
              backgroundColor: "var(--surface-raised, #f7f6f5)",
              borderRight: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--muted)",
                    letterSpacing: "0.05em",
                  }}
                >
                  TRADITIONAL METRIC
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--ink)",
                    padding: "2px 8px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--bg)",
                  }}
                >
                  100% SUCCESS
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: 28,
                  color: "var(--ink)",
                  marginBottom: 8,
                }}
              >
                BACKUP POSTURE
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  marginBottom: 28,
                }}
              >
                Traditional vendor consoles report 100% backup success every morning:
              </p>

              {/* Vendor Success Metrics */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
                <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--muted)",
                      marginBottom: 4,
                    }}
                  >
                    COMMVAULT & VEEAM JOB EXECUTION
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#4a825e", fontWeight: 700 }}>✓</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--ink)",
                      }}
                    >
                      100% Completed on Schedule
                    </span>
                  </div>
                </div>

                <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--muted)",
                      marginBottom: 4,
                    }}
                  >
                    STORAGE REPOSITORY DEDUPLICATION
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#4a825e", fontWeight: 700 }}>✓</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--ink)",
                      }}
                    >
                      99.4% Compression & Immutability Lock
                    </span>
                  </div>
                </div>

                <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--muted)",
                      marginBottom: 4,
                    }}
                  >
                    RETENTION COMPLIANCE WINDOW
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#4a825e", fontWeight: 700 }}>✓</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--ink)",
                      }}
                    >
                      30/30 Daily Points Stored
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              Operations dashboard verdict: All green. Nothing to fix.
            </div>
          </div>

          {/* Right Column (7 cols): RECOVERY POSTURE */}
          <div
            style={{
              padding: "36px 36px",
              backgroundColor: "var(--bg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--orange, #f45532)",
                    letterSpacing: "0.05em",
                    fontWeight: 600,
                  }}
                >
                  MESHDEFEND REALITY
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--orange, #f45532)",
                    padding: "2px 8px",
                    border: "1px solid rgba(244, 85, 50, 0.4)",
                    backgroundColor: "rgba(244, 85, 50, 0.06)",
                    fontWeight: 600,
                  }}
                >
                  HIGH RESILIENCE RISK
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: 28,
                  color: "var(--ink)",
                  marginBottom: 8,
                }}
              >
                RECOVERY POSTURE
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  marginBottom: 24,
                }}
              >
                The 3 hidden posture drift failures uncovered when simulating full workload restoration:
              </p>

              {/* Bento Grid: 3 Concrete Posture Failures */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {bentoItems.map((item, idx) => {
                  const isSelected = activeBento === idx;

                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveBento(idx)}
                      style={{
                        padding: "16px 20px",
                        border: isSelected
                          ? "1px solid var(--orange, #f45532)"
                          : "1px solid var(--border)",
                        backgroundColor: isSelected
                          ? "rgba(244, 85, 50, 0.04)"
                          : "var(--surface-raised, #f7f6f5)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-body), Inter, sans-serif',
                            fontSize: 14,
                            fontWeight: 600,
                            color: "var(--ink)",
                          }}
                        >
                          {item.title}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 11,
                              color: "var(--orange, #f45532)",
                              fontWeight: 700,
                            }}
                          >
                            {item.status} ({item.score})
                          </span>
                        </div>
                      </div>

                      <p
                        style={{
                          fontFamily: 'var(--font-body), Inter, sans-serif',
                          fontSize: 13,
                          lineHeight: 1.5,
                          color: "var(--muted)",
                          margin: "0 0 8px 0",
                        }}
                      >
                        {item.detail}
                      </p>

                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 11,
                          color: "var(--orange, #f45532)",
                        }}
                      >
                        Blind spot: {item.auditNote}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                Calculated Tier-0 Recovery Readiness: 72% (Weighted Composite: Snapshot Cleanliness 75% · Dependency Topology 65% · Infrastructure Quota 76%)
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--orange, #f45532)",
                  fontWeight: 600,
                }}
              >
                Immediate Runbook Prescribed →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
