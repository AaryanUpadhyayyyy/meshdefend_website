"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type RoleId = "backup-admin" | "ciso";

export function RoleLensSwitcherFold() {
  const [activeRole, setActiveRole] = useState<RoleId>("backup-admin");

  return (
    <section
      id="role-lens-switcher"
      aria-label="One Reality, Different Views"
      style={{
        padding: "120px 0",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Header Block */}
        <div style={{ maxWidth: "860px", marginBottom: "56px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 10px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--ink)",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "var(--orange, #f45532)",
                display: "inline-block",
              }}
            />
            [ STAKEHOLDER PERSPECTIVES // FUNCTIONAL COHESION ]
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(34px, 4.4vw, 54px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "20px",
              fontWeight: 400,
            }}
          >
            Same evidence. Different decisions.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: "16px",
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "760px",
            }}
          >
            Both experiences genuinely derive from the same underlying operational data and evidence.
            An operational signal directly feeds executive posture and board reporting without creating
            separate sources of truth or competing departmental dashboards.
          </p>
        </div>

        {/* 12-Column Blueprint Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {/* Left Column: Underlying Raw Event Layer (5 Cols) */}
          <div
            style={{
              gridColumn: "span 5",
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            className="col-span-12 lg:col-span-5"
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "16px",
                  borderBottom: "1px solid var(--border)",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#16a34a",
                      display: "inline-block",
                      boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.15)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    UNDERLYING RAW EVENT STREAM
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: "11px",
                    color: "var(--muted)",
                  }}
                >
                  LIVE TELEMETRY
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: "12px",
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  marginBottom: "24px",
                }}
              >
                Raw telemetry captured at source storage engines, hypervisors, and immutable WORM vaults.
                Single point of truth ingested before role projection.
              </div>

              {/* Event Payload Visual */}
              <div
                style={{
                  backgroundColor: "var(--bg)",
                  border: "1px solid var(--border)",
                  padding: "16px",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: "11px",
                  lineHeight: 1.7,
                  color: "var(--ink)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--muted)" }}>SIGNAL_ID</span>
                  <span>EVT-2026-0924-8841</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--muted)" }}>WORKLOAD</span>
                  <span style={{ fontWeight: 600 }}>oracle-prod-rac-db01 (24.8 TB)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--muted)" }}>SOURCE ENGINE</span>
                  <span>Commvault Complete + NetApp WORM</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--muted)" }}>COMPLETION TIMESTAMP</span>
                  <span>02:14:09 UTC (Duration 42m)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--muted)" }}>WORM COMPLIANCE</span>
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>LOCKED (SEC 17a-4 VERIFIED)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--muted)" }}>INTEGRITY SCAN</span>
                  <span style={{ color: "#16a34a" }}>0 Dormant Malware Signatures</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--muted)" }}>ESTIMATED RTO</span>
                  <span style={{ color: "var(--orange, #f45532)", fontWeight: 600 }}>18 min (SLA: 30 min)</span>
                </div>
              </div>
            </div>

            {/* Projection Indicators */}
            <div
              style={{
                marginTop: "24px",
                paddingTop: "16px",
                borderTop: "1px dashed var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: "11px",
              }}
            >
              <span style={{ color: "var(--muted)" }}>DATA PIPELINE:</span>
              <span style={{ color: "var(--orange, #f45532)", fontWeight: 600 }}>
                1 INGESTION STREAM → 2 DIVERGENT LENSES
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Role Lens Projection (7 Cols) */}
          <div
            style={{
              gridColumn: "span 7",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg)",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
            }}
            className="col-span-12 lg:col-span-7"
          >
            {/* Role Lens Switcher Controls */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid var(--border)",
                marginBottom: "28px",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveRole("backup-admin")}
                style={{
                  flex: 1,
                  padding: "12px 18px",
                  background: activeRole === "backup-admin" ? "var(--ink)" : "transparent",
                  color: activeRole === "backup-admin" ? "var(--bg)" : "var(--ink)",
                  border: "none",
                  borderRight: "1px solid var(--border)",
                  cursor: "pointer",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.15s ease",
                }}
              >
                <span>[ 01 · BACKUP ADMIN VIEW ]</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveRole("ciso")}
                style={{
                  flex: 1,
                  padding: "12px 18px",
                  background: activeRole === "ciso" ? "var(--ink)" : "transparent",
                  color: activeRole === "ciso" ? "var(--bg)" : "var(--ink)",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.15s ease",
                }}
              >
                <span>[ 02 · CISO & EXECUTIVE VIEW ]</span>
              </button>
            </div>

            {/* Dynamic Animated Content */}
            <AnimatePresence mode="wait">
              {activeRole === "backup-admin" ? (
                <motion.div
                  key="backup-admin-view"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <div style={{ marginBottom: "20px" }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: "10px",
                        letterSpacing: "0.08em",
                        color: "var(--orange, #f45532)",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      PERSPECTIVE: OPERATIONAL EXECUTION & TRIAGE
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: "26px",
                        color: "var(--ink)",
                        margin: 0,
                        fontWeight: 400,
                      }}
                    >
                      Operational detail to run the estate without blind spots.
                    </h3>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "var(--muted)",
                      marginBottom: "24px",
                    }}
                  >
                    The Backup Admin requires concrete asset-level telemetry: which job failed, why it failed,
                    deduplication ratios, and the direct mechanical action needed to restore nominal operational state.
                  </p>

                  {/* Operational Metrics Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "12px",
                      marginBottom: "24px",
                    }}
                  >
                    <div
                      style={{
                        border: "1px solid var(--border)",
                        padding: "14px",
                        backgroundColor: "var(--surface)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "10px",
                          color: "var(--muted)",
                          marginBottom: "4px",
                        }}
                      >
                        JOB COMPLETION
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                          fontSize: "24px",
                          color: "#16a34a",
                        }}
                      >
                        99.72%
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "10px",
                          color: "var(--muted)",
                          marginTop: "2px",
                        }}
                      >
                        1,428 / 1,432 Success
                      </div>
                    </div>

                    <div
                      style={{
                        border: "1px solid var(--border)",
                        padding: "14px",
                        backgroundColor: "var(--surface)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "10px",
                          color: "var(--muted)",
                          marginBottom: "4px",
                        }}
                      >
                        DEDUPE RATIO
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                          fontSize: "24px",
                          color: "var(--ink)",
                        }}
                      >
                        18.4x
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "10px",
                          color: "var(--muted)",
                          marginTop: "2px",
                        }}
                      >
                        Data Domain + NetApp
                      </div>
                    </div>

                    <div
                      style={{
                        border: "1px solid var(--border)",
                        padding: "14px",
                        backgroundColor: "var(--surface)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "10px",
                          color: "var(--muted)",
                          marginBottom: "4px",
                        }}
                      >
                        ACTIVE EXCEPTIONS
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                          fontSize: "24px",
                          color: "var(--orange, #f45532)",
                        }}
                      >
                        4 Jobs
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "10px",
                          color: "var(--muted)",
                          marginTop: "2px",
                        }}
                      >
                        Auto-Retry Scheduled
                      </div>
                    </div>
                  </div>

                  {/* Actionable Incident Card */}
                  <div
                    style={{
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--surface)",
                      padding: "16px",
                      marginTop: "auto",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        ROOT-CAUSE ANALYSIS: EXCEPTION #4109
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "10px",
                          color: "#16a34a",
                          backgroundColor: "rgba(22, 163, 74, 0.1)",
                          padding: "2px 6px",
                        }}
                      >
                        AUTO-RESOLVED
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: "11px",
                        lineHeight: 1.6,
                        color: "var(--muted)",
                      }}
                    >
                      VSS quiesce freeze timeout on Hyper-V Host 07 during differential backup.
                      MeshDefend triggered automated VSS writer restart script; job retry passed on attempt 2 without engineer intervention.
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="ciso-view"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <div style={{ marginBottom: "20px" }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: "10px",
                        letterSpacing: "0.08em",
                        color: "var(--orange, #f45532)",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      PERSPECTIVE: GOVERNANCE, RISK & BOARD ATTESTATION
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: "26px",
                        color: "var(--ink)",
                        margin: 0,
                        fontWeight: 400,
                      }}
                    >
                      Enterprise posture, risk exposure, and provable recovery.
                    </h3>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "var(--muted)",
                      marginBottom: "24px",
                    }}
                  >
                    The CISO needs the same operational signal translated into business survivability:
                    are Tier-0 financial ledgers clean of dormant ransomware, can the firm meet SEC RTO requirements,
                    and is evidence audit-ready?
                  </p>

                  {/* Executive Posture Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "12px",
                      marginBottom: "24px",
                    }}
                  >
                    <div
                      style={{
                        border: "1px solid var(--border)",
                        padding: "14px",
                        backgroundColor: "var(--surface)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "10px",
                          color: "var(--muted)",
                          marginBottom: "4px",
                        }}
                      >
                        CLEAN RECOVERY POSTURE
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                          fontSize: "24px",
                          color: "#16a34a",
                        }}
                      >
                        94.8%
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "10px",
                          color: "var(--muted)",
                          marginTop: "2px",
                        }}
                      >
                        Zero Dormant Malware
                      </div>
                    </div>

                    <div
                      style={{
                        border: "1px solid var(--border)",
                        padding: "14px",
                        backgroundColor: "var(--surface)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "10px",
                          color: "var(--muted)",
                          marginBottom: "4px",
                        }}
                      >
                        BLAST RADIUS RISK
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                          fontSize: "24px",
                          color: "var(--ink)",
                        }}
                      >
                        0 Tier-0
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "10px",
                          color: "var(--muted)",
                          marginTop: "2px",
                        }}
                      >
                        Isolated Vault Enclaves
                      </div>
                    </div>

                    <div
                      style={{
                        border: "1px solid var(--border)",
                        padding: "14px",
                        backgroundColor: "var(--surface)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "10px",
                          color: "var(--muted)",
                          marginBottom: "4px",
                        }}
                      >
                        RTO ATTESTATION
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                          fontSize: "24px",
                          color: "var(--orange, #f45532)",
                        }}
                      >
                        18 min
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "10px",
                          color: "var(--muted)",
                          marginTop: "2px",
                        }}
                      >
                        Regulatory Cap: 4.0 hrs
                      </div>
                    </div>
                  </div>

                  {/* Governance Card */}
                  <div
                    style={{
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--surface)",
                      padding: "16px",
                      marginTop: "auto",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        BOARD COMPLIANCE & CYBER INSURANCE PACK
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: "10px",
                          color: "#16a34a",
                          backgroundColor: "rgba(22, 163, 74, 0.1)",
                          padding: "2px 6px",
                        }}
                      >
                        AUDIT READY
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: "11px",
                        lineHeight: 1.6,
                        color: "var(--muted)",
                      }}
                    >
                      Cryptographically verified recovery proof for SEC 17a-4 and DORA Article 11 automatically generated.
                      Eliminates 3 weeks of manual engineering spreadsheet preparation prior to board audits.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
