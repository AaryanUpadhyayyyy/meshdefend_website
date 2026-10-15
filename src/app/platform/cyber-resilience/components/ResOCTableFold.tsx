"use client";

import { useState } from "react";

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
              fontFamily: "var(--font-mono), monospace",
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
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 4 — CONTINUOUS POSTURE MANAGEMENT
          </span>
        </div>

        {/* Display H2 & Narrative */}
        <div style={{ maxWidth: 960, marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: "var(--font-serif), serif",
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
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 19,
              lineHeight: 1.55,
              color: "var(--ink)",
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            Resilience isn&apos;t something you should discover during an incident. ResOC operates continuously to expose recovery risks and improve readiness before the attack happens.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 16,
              lineHeight: 1.65,
              color: "var(--muted)",
              maxWidth: 820,
            }}
          >
            Traditional disaster recovery relies on an annual tabletop exercise or an expensive weekend failover drill that leaves teams exhausted. The Resilience Operations Center (ResOC) transforms resilience into a live, continuous discipline. It constantly evaluates application recovery posture, flags silent configuration drift, validates clean recovery candidates, and prescribes concrete actions before an adversary strikes.
          </p>
        </div>

        {/* The ResOC Readiness Table */}
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
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  color: "var(--ink)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                RESOC APPLICATION RECOVERY READINESS TABLE
              </span>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)" }}>
                (continuous evaluation cycle)
              </span>
            </div>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)" }}>
              MeshDefend Continuous Monitor
            </span>
          </div>

          {/* Clean, border-top tabular list of applications */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                minWidth: 760,
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid var(--border)",
                    backgroundColor: "var(--surface-raised, #f7f6f5)",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    color: "var(--muted)",
                  }}
                >
                  <th style={{ padding: "14px 20px" }}>Application</th>
                  <th style={{ padding: "14px 16px" }}>MVC Tier</th>
                  <th style={{ padding: "14px 16px" }}>Backup Health</th>
                  <th style={{ padding: "14px 16px" }}>Recovery Posture Score</th>
                  <th style={{ padding: "14px 20px", textAlign: "right" }}>Action</th>
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
                        backgroundColor: isExpanded ? "var(--surface-raised, #f7f6f5)" : "var(--bg)",
                        transition: "background-color 0.15s ease",
                      }}
                    >
                      <td style={{ padding: "16px 20px", fontFamily: "var(--font-body), sans-serif", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                        {row.application}
                      </td>

                      <td style={{ padding: "16px 16px", fontFamily: "var(--font-mono), monospace", fontSize: 12, color: "var(--ink)" }}>
                        {row.mvcTier}
                      </td>

                      <td style={{ padding: "16px 16px", fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--ink)" }}>
                        {row.backupHealth}
                      </td>

                      <td style={{ padding: "16px 16px", fontFamily: "var(--font-mono), monospace", fontSize: 12 }}>
                        {row.postureScoreFormatted}
                      </td>

                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <button
                          type="button"
                          onClick={() => setExpandedApp(isExpanded ? null : row.id)}
                          style={{
                            fontFamily: "var(--font-mono), monospace",
                            fontSize: 11,
                            letterSpacing: "0.03em",
                            padding: "6px 14px",
                            border: isExpanded ? "1px solid var(--orange, #f45532)" : "1px solid var(--ink)",
                            color: isExpanded ? "var(--orange, #f45532)" : "var(--ink)",
                            backgroundColor: "var(--bg)",
                            cursor: "pointer",
                          }}
                        >
                          [ {isExpanded ? "Close Drawer" : "Investigate"} ]
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Drawer showing the recommended action to improve readiness */}
          {expandedApp && (
            <div
              style={{
                borderTop: "1px solid var(--border)",
                backgroundColor: "var(--surface-raised, #f7f6f5)",
                padding: "28px 24px",
              }}
            >
              {(() => {
                const current = rows.find((r) => r.id === expandedApp);
                if (!current) return null;

                return (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                        borderBottom: "1px solid var(--border)",
                        paddingBottom: 10,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontFamily: "var(--font-serif), serif", fontSize: 22, color: "var(--ink)" }}>
                          ResOC Investigation: {current.application}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)" }}>
                          ({current.mvcTier})
                        </span>
                      </div>
                      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)" }}>
                        Live Evaluation Record
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
                      <div style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg)", padding: 18 }}>
                        <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>
                          OBSERVED POSTURE RISK EVIDENCE
                        </div>
                        <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, lineHeight: 1.55, color: "var(--ink)", margin: 0 }}>
                          {current.evidence}
                        </p>
                      </div>

                      <div style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg)", padding: 18 }}>
                        <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--orange, #f45532)", fontWeight: 600, marginBottom: 8 }}>
                          RECOMMENDED ACTION TO IMPROVE READINESS
                        </div>
                        <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, lineHeight: 1.55, color: "var(--ink)", margin: "0 0 8px 0" }}>
                          {current.recommendedAction}
                        </p>
                        <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)" }}>
                          {current.actionDetails}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <a
                        href="#bridge-action"
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 11,
                          letterSpacing: "0.04em",
                          color: "var(--ink)",
                          textDecoration: "none",
                          padding: "8px 16px",
                          border: "1px solid var(--ink)",
                          backgroundColor: "var(--bg)",
                        }}
                      >
                        Act on this in Incident Resolution →
                      </a>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
