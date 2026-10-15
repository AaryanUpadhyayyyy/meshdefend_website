"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ApplicationRow {
  id: string;
  application: string;
  mvcTier: string;
  backupHealth: string;
  postureScoreFormatted: React.ReactNode;
  recommendedAction: string;
  actionDetails: string;
  evidence: string;
}

export function ResOCTableFold() {
  const [expandedApp, setExpandedApp] = useState<string | null>("ledger-core");

  const rows: ApplicationRow[] = [
    {
      id: "ledger-core",
      application: "ledger-core",
      mvcTier: "Tier-0",
      backupHealth: "100% OK",
      postureScoreFormatted: (
        <span style={{ color: "var(--orange, #f45532)", fontWeight: 600 }}>
          72% (Risk Detected)
        </span>
      ),
      recommendedAction:
        "Quarantine compromised snapshot snap-09fa41; promote verified clean pre-encryption snapshot snap-09fa40 (02:40 UTC) as authoritative candidate, and attach Redis session cluster to Tier-0 backup policy.",
      actionDetails:
        "Automated simulation projects Recovery Posture score returning to 96% upon runbook execution.",
      evidence:
        "41% byte-entropy surge detected on /dev/sdb volume 32 min prior to job. Unprotected Redis dependency causes 503 boot loops upon restore.",
    },
    {
      id: "auth-vault",
      application: "auth-vault",
      mvcTier: "Tier-0",
      backupHealth: "100% OK",
      postureScoreFormatted: <span>96% (Ready)</span>,
      recommendedAction:
        "Maintain current policy. Verified clean candidate snapshot with cross-region KMS envelope ready.",
      actionDetails: "Continuous automated verification running on 60-minute evaluation cycle.",
      evidence: "0 byte entropy anomalies detected. All 4 Vault KMS replica keys accessible in DR VPC.",
    },
    {
      id: "checkout-api",
      application: "checkout-api",
      mvcTier: "Tier-1",
      backupHealth: "98% OK",
      postureScoreFormatted: (
        <span style={{ color: "var(--orange, #f45532)", fontWeight: 600 }}>
          64% (Risk Detected)
        </span>
      ),
      recommendedAction:
        "Submit EC2 quota increase for c5.4xlarge instances in secondary failover region to eliminate +14h RTO breach.",
      actionDetails: "Compute quota deficit blocks parallel restoration of worker pool.",
      evidence: "Secondary availability zone lacks allocated compute reservation for target container cluster.",
    },
    {
      id: "settlement-batch",
      application: "settlement-batch",
      mvcTier: "Tier-1",
      backupHealth: "100% OK",
      postureScoreFormatted: <span>91% (Ready)</span>,
      recommendedAction:
        "Maintain scheduled policy. Target batch queue workers verified staged in secondary cluster.",
      actionDetails: "Scheduled dry-run validation passed on last execution.",
      evidence: "Immutable blocks verified on Dell DataDomain storage repository.",
    },
  ];

  return (
    <section
      id="resoc-operationalize"
      aria-label="Operationalize Resilience with ResOC"
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
            Operational Layer · ResOC
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 4 — CONTINUOUS POSTURE MANAGEMENT
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
            Meet ResOC — where recovery readiness becomes an everyday operation.
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
            Resilience isn&apos;t something you should discover during an incident. ResOC operates
            continuously to expose recovery risks and improve readiness before the attack happens.
          </p>
        </div>

        {/* The ResOC Readiness Table with Expandable Drawer */}
        <div
          id="resoc-console"
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--surface-raised, #f7f6f5)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--ink)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                RESOC LIVE CONSOLE // TIER-0 & TIER-1 APPLICATION HEALTH
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                (continuous posture verification)
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: "#4a825e",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                Evaluation Cycle: 60s
              </span>
            </div>
          </div>

          {/* Table Container */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid var(--border)",
                    backgroundColor: "var(--bg)",
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10.5,
                    letterSpacing: "0.05em",
                    color: "var(--muted)",
                  }}
                >
                  <th style={{ padding: "14px 20px", fontWeight: 500 }}>APPLICATION</th>
                  <th style={{ padding: "14px 16px", fontWeight: 500 }}>MVC TIER</th>
                  <th style={{ padding: "14px 16px", fontWeight: 500 }}>BACKUP HEALTH</th>
                  <th style={{ padding: "14px 16px", fontWeight: 500 }}>RECOVERY POSTURE</th>
                  <th style={{ padding: "14px 20px", fontWeight: 500, textAlign: "right" }}>
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const isExpanded = expandedApp === row.id;

                  return (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: "1px solid var(--border)",
                        backgroundColor: isExpanded
                          ? "var(--surface-raised, #f7f6f5)"
                          : "var(--bg)",
                        transition: "background-color 0.15s ease",
                      }}
                    >
                      <td
                        style={{
                          padding: "16px 20px",
                          fontFamily: 'var(--font-body), Inter, sans-serif',
                          fontSize: 14,
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        {row.application}
                      </td>

                      <td
                        style={{
                          padding: "16px 16px",
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 12,
                          color: "var(--ink)",
                        }}
                      >
                        {row.mvcTier}
                      </td>

                      <td
                        style={{
                          padding: "16px 16px",
                          fontFamily: 'var(--font-body), Inter, sans-serif',
                          fontSize: 13,
                          color: "var(--ink)",
                        }}
                      >
                        {row.backupHealth}
                      </td>

                      <td
                        style={{
                          padding: "16px 16px",
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 12,
                        }}
                      >
                        {row.postureScoreFormatted}
                      </td>

                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        {/* Raw Monospace Technical Trigger (No background fill) */}
                        <button
                          type="button"
                          onClick={() => setExpandedApp(isExpanded ? null : row.id)}
                          style={{
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontSize: 11.5,
                            letterSpacing: "0.04em",
                            padding: "4px 8px",
                            border: "none",
                            background: "transparent",
                            color: isExpanded ? "var(--orange, #f45532)" : "var(--ink)",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "color 0.15s ease",
                          }}
                        >
                          [ {isExpanded ? "Close Drawer ×" : "Investigate &rarr;"} ]
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Sleek Inline Drawer using Framer Motion AnimatePresence */}
          <AnimatePresence>
            {expandedApp && (
              <motion.div
                key={expandedApp}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  overflow: "hidden",
                  borderTop: "1px solid var(--border)",
                  backgroundColor: "var(--surface-raised, #f7f6f5)",
                }}
              >
                {(() => {
                  const current = rows.find((r) => r.id === expandedApp);
                  if (!current) return null;

                  return (
                    <div style={{ padding: "28px 24px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 18,
                          borderBottom: "1px solid var(--border)",
                          paddingBottom: 10,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span
                            style={{
                              fontFamily:
                                'var(--font-display), "Instrument Serif", Georgia, serif',
                              fontSize: 24,
                              color: "var(--ink)",
                            }}
                          >
                            ResOC Investigation: {current.application}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 11,
                              color: "var(--muted)",
                            }}
                          >
                            ({current.mvcTier})
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontSize: 11,
                            color: "var(--muted)",
                          }}
                        >
                          Live Evaluation Record #REC-0982
                        </span>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                          gap: 20,
                          marginBottom: 20,
                        }}
                      >
                        <div
                          style={{
                            border: "1px solid var(--border)",
                            backgroundColor: "var(--bg)",
                            padding: 20,
                          }}
                        >
                          <div
                            style={{
                              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 10.5,
                              color: "var(--muted)",
                              letterSpacing: "0.04em",
                              marginBottom: 8,
                            }}
                          >
                            OBSERVED POSTURE RISK EVIDENCE
                          </div>
                          <p
                            style={{
                              fontFamily: 'var(--font-body), Inter, sans-serif',
                              fontSize: 13.5,
                              lineHeight: 1.55,
                              color: "var(--ink)",
                              margin: 0,
                            }}
                          >
                            {current.evidence}
                          </p>
                        </div>

                        <div
                          style={{
                            border: "1px solid rgba(244, 85, 50, 0.3)",
                            backgroundColor: "rgba(244, 85, 50, 0.04)",
                            padding: 20,
                          }}
                        >
                          <div
                            style={{
                              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 10.5,
                              color: "var(--orange, #f45532)",
                              letterSpacing: "0.04em",
                              fontWeight: 600,
                              marginBottom: 8,
                            }}
                          >
                            RECOMMENDED REMEDIATION ACTION
                          </div>
                          <p
                            style={{
                              fontFamily: 'var(--font-body), Inter, sans-serif',
                              fontSize: 13.5,
                              lineHeight: 1.55,
                              color: "var(--ink)",
                              fontWeight: 500,
                              margin: 0,
                            }}
                          >
                            {current.recommendedAction}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          paddingTop: 12,
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
                          Simulation Result: {current.actionDetails}
                        </span>
                        <a
                          href="/platform/incident-resolution"
                          style={{
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontSize: 11.5,
                            color: "var(--orange, #f45532)",
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                        >
                          Stage in Incident Resolution &rarr;
                        </a>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
