"use client";

import { useState } from "react";

export function PostureSplitFold() {
  const [activeBento, setActiveBento] = useState<number>(0);

  const bentoItems = [
    {
      title: "Clean recovery-point unavailable",
      status: "AT RISK",
      score: "42%",
      detail:
        "Anomalous file encryption entropy spike detected 32 minutes prior to backup window. Restoring the latest snapshot restores the dormant ransomware payload.",
      auditNote: "Traditional backup treats encrypted bytes as successful writes.",
    },
    {
      title: "Dependency readiness gap",
      status: "FAILED",
      score: "0%",
      detail:
        "Redis session cache cluster and IAM token mounts excluded from the disaster recovery protection plan. The database restore boots into cascading 503 gateway timeouts.",
      auditNote: "Standard backup evaluates host VMs, not application topology.",
    },
    {
      title: "Infrastructure mismatch",
      status: "AT RISK",
      score: "50%",
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
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              fontWeight: 500,
              color: "var(--muted)",
              letterSpacing: "0.04em",
            }}
          >
            The Contrast Effect
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 3 — POSTURE DRIFT CORRELATION
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
            Your backups can be healthy while your application still isn’t ready to recover.
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
            Shift from asking &apos;Are my backups healthy?&apos; to &apos;Can this application actually recover?&apos; Good backup posture does not automatically mean good recovery posture.
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
            Backup posture measures job execution: did snapshots trigger, did storage deduplicate, did logs truncate? Recovery posture measures business survivability: are recovery points clean of malware, are dependencies mapped, are compute resources reserved, and is the recovery sequence proven? MeshDefend evaluates all five pillars continuously.
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
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    color: "var(--muted)",
                    letterSpacing: "0.05em",
                  }}
                >
                  TRADITIONAL METRIC
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
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
                  fontFamily: "var(--font-serif), serif",
                  fontSize: 28,
                  color: "var(--ink)",
                  marginBottom: 8,
                }}
              >
                BACKUP POSTURE
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  marginBottom: 28,
                }}
              >
                Boring 100% success metrics reported every morning to operations:
              </p>

              {/* Boring 100% Success Metrics */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
                <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>
                    PRIMARY BACKUP JOB
                  </div>
                  <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>
                    Commvault Job: OK
                  </div>
                  <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--muted)", marginTop: 2 }}>
                    Finished on schedule · 0 transport timeouts
                  </div>
                </div>

                <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>
                    STORAGE LAYER
                  </div>
                  <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>
                    Storage: OK
                  </div>
                  <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--muted)", marginTop: 2 }}>
                    Dell DataDomain repository verified within capacity
                  </div>
                </div>

                <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>
                    DAILY SLA EVALUATION
                  </div>
                  <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>
                    SLA Compliance: 100%
                  </div>
                  <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--muted)", marginTop: 2 }}>
                    Signoff granted by storage automation
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "16px 18px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg)",
              }}
            >
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "var(--muted)", marginBottom: 4 }}>
                OPERATIONAL ILLUSION
              </div>
              <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                Every dashboard is green. No alarms are triggered. The enterprise believes it is resilient.
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): RECOVERY POSTURE: AT RISK (Exposed 1px Bento Box) */}
          <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    color: "var(--muted)",
                    letterSpacing: "0.05em",
                  }}
                >
                  APPLICATION REALITY
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    color: "var(--orange, #f45532)",
                    fontWeight: 600,
                    padding: "2px 8px",
                    border: "1px solid rgba(244,85,50,0.3)",
                    backgroundColor: "rgba(244,85,50,0.06)",
                  }}
                >
                  RECOVERY POSTURE: AT RISK
                </span>
              </div>

              <div
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: 28,
                  color: "var(--ink)",
                  marginBottom: 8,
                }}
              >
                RECOVERY POSTURE: AT RISK
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  marginBottom: 28,
                }}
              >
                Exposed 1px bento box highlighting exactly what is preventing recovery:
              </p>

              {/* Exposed 1px Bento Box */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                {bentoItems.map((item, idx) => {
                  const isSelected = activeBento === idx;

                  return (
                    <div
                      key={item.title}
                      onClick={() => setActiveBento(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setActiveBento(idx);
                      }}
                      style={{
                        padding: "16px 20px",
                        border: isSelected
                          ? "1px solid var(--orange, #f45532)"
                          : "1px solid var(--border)",
                        backgroundColor: isSelected
                          ? "rgba(244, 85, 50, 0.04)"
                          : "var(--bg)",
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
                            fontFamily: "var(--font-body), sans-serif",
                            fontSize: 15,
                            fontWeight: 600,
                            color: "var(--ink)",
                          }}
                        >
                          {item.title}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono), monospace",
                            fontSize: 11,
                            color: "var(--orange, #f45532)",
                            fontWeight: 600,
                          }}
                        >
                          [{item.status}]
                        </span>
                      </div>

                      <p
                        style={{
                          fontFamily: "var(--font-body), sans-serif",
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
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 11,
                          color: "var(--ink)",
                          opacity: 0.7,
                        }}
                      >
                        Observation: {item.auditNote}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                padding: "14px 18px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--surface-raised, #f7f6f5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>
                Finding: Backups are healthy, yet the application cannot recover.
              </span>
              <a
                href="#resoc-operationalize"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  color: "var(--ink)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--ink)",
                  flexShrink: 0,
                }}
              >
                Meet ResOC ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
