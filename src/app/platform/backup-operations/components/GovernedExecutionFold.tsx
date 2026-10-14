"use client";

import { useState } from "react";
import { SpringReveal } from "@/components/motion/SpringReveal";

export function GovernedExecutionFold() {
  const [isApproved, setIsApproved] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleApprove = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setIsApproved(true);
    }, 900);
  };

  const handleReset = () => {
    setIsApproved(false);
    setIsExecuting(false);
  };

  return (
    <section
      id="governed-execution"
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
            FIG. 5 — POLICY GUARDRAILS &amp; HUMAN APPROVAL GATES
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
              Automate the work. Keep control of what gets executed.
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
              Trust in operational automation comes from clear boundaries. MeshDefend enforces policy-governed autonomy—human in the loop and human on the loop—so routine checks run automatically while state-changing actions pause at explicit permission, change-window, and operator approval gates.
            </p>
          </div>

          {/* ─── 5-COLUMN GOVERNED EXECUTION CONTROL MECHANISMS ─── */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            {/* Header Bar */}
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
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  Policy-governed autonomy · Human in the loop and human on the loop
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: isApproved ? "var(--ink)" : "var(--orange)",
                    fontWeight: 600,
                  }}
                >
                  {isApproved
                    ? "Status: Remediation executed & verified"
                    : "Status: Paused at Gate 05 for operator approval"}
                </span>
                {isApproved && (
                  <button
                    type="button"
                    onClick={handleReset}
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      padding: "3px 8px",
                      background: "transparent",
                      border: "1px solid var(--border)",
                      borderRadius: 3,
                      cursor: "pointer",
                      color: "var(--muted)",
                    }}
                  >
                    Reset Gate
                  </button>
                )}
              </div>
            </div>

            {/* 5-Column Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
              }}
              className="governed-gate-5grid"
            >
              {/* Mechanism 01: Policy Guardrails */}
              <div
                style={{
                  padding: "24px 20px",
                  borderRight: "1px solid var(--border)",
                  background: "var(--bg)",
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
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        color: "var(--muted)",
                        fontWeight: 600,
                      }}
                    >
                      01
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 9.5,
                        padding: "2px 6px",
                        background: "rgba(34,31,34,0.06)",
                        borderRadius: 3,
                        color: "var(--ink)",
                        fontWeight: 600,
                      }}
                    >
                      Verified ✓
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 20,
                      lineHeight: 1.2,
                      color: "var(--ink)",
                      marginBottom: 8,
                    }}
                  >
                    Policy Guardrails
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    Read-only diagnostics run automatically; state-changing storage actions bound by policy.
                  </p>
                </div>
              </div>

              {/* Mechanism 02: Role Permissions */}
              <div
                style={{
                  padding: "24px 20px",
                  borderRight: "1px solid var(--border)",
                  background: "var(--bg)",
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
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        color: "var(--muted)",
                        fontWeight: 600,
                      }}
                    >
                      02
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 9.5,
                        padding: "2px 6px",
                        background: "rgba(34,31,34,0.06)",
                        borderRadius: 3,
                        color: "var(--ink)",
                        fontWeight: 600,
                      }}
                    >
                      Verified ✓
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 20,
                      lineHeight: 1.2,
                      color: "var(--ink)",
                      marginBottom: 8,
                    }}
                  >
                    Role Permissions
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    Requires authorized Backup Lead or Storage Admin role for snapshot lock release.
                  </p>
                </div>
              </div>

              {/* Mechanism 03: Change Windows */}
              <div
                style={{
                  padding: "24px 20px",
                  borderRight: "1px solid var(--border)",
                  background: "var(--bg)",
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
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        color: "var(--muted)",
                        fontWeight: 600,
                      }}
                    >
                      03
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 9.5,
                        padding: "2px 6px",
                        background: "rgba(34,31,34,0.06)",
                        borderRadius: 3,
                        color: "var(--ink)",
                        fontWeight: 600,
                      }}
                    >
                      Verified ✓
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 20,
                      lineHeight: 1.2,
                      color: "var(--ink)",
                      marginBottom: 8,
                    }}
                  >
                    Change Windows
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    Validated against approved maintenance window (02:00–05:00 UTC) in ServiceNow.
                  </p>
                </div>
              </div>

              {/* Mechanism 04: Confidence Thresholds */}
              <div
                style={{
                  padding: "24px 20px",
                  borderRight: "1px solid var(--border)",
                  background: "var(--bg)",
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
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        color: "var(--muted)",
                        fontWeight: 600,
                      }}
                    >
                      04
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 9.5,
                        padding: "2px 6px",
                        background: "rgba(34,31,34,0.06)",
                        borderRadius: 3,
                        color: "var(--ink)",
                        fontWeight: 600,
                      }}
                    >
                      Verified ✓
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 20,
                      lineHeight: 1.2,
                      color: "var(--ink)",
                      marginBottom: 8,
                    }}
                  >
                    Confidence Thresholds
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    Root-cause match exceeds policy threshold across job history, storage state, and change records.
                  </p>
                </div>
              </div>

              {/* Mechanism 05: Approval Gate (Interactive) */}
              <div
                style={{
                  padding: "24px 20px",
                  background: isApproved ? "rgba(244, 85, 50, 0.04)" : "var(--surface)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  borderLeft: isApproved ? "2px solid var(--orange)" : "none",
                  transition: "all 0.25s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        color: isApproved ? "var(--ink)" : "var(--orange)",
                        fontWeight: 700,
                      }}
                    >
                      05
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 9.5,
                        padding: "2px 6px",
                        background: isApproved ? "var(--orange)" : "rgba(244, 85, 50, 0.12)",
                        color: isApproved ? "#ffffff" : "var(--orange)",
                        borderRadius: 3,
                        fontWeight: 700,
                      }}
                    >
                      {isApproved ? "Executed ✓" : "Pending sign-off"}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 20,
                      lineHeight: 1.2,
                      color: "var(--ink)",
                      marginBottom: 8,
                    }}
                  >
                    Approval Gate
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 12.5,
                      color: "var(--muted)",
                      lineHeight: 1.45,
                      margin: "0 0 14px 0",
                    }}
                  >
                    {isApproved
                      ? "Approved by R. Sharma. Stale snapshot handle released; Veeam backup job #1849 active."
                      : "Operator sign-off required to release SAN volume snapshot lock on payments-db."}
                  </p>
                </div>

                <div>
                  {!isApproved ? (
                    <button
                      type="button"
                      disabled={isExecuting}
                      onClick={handleApprove}
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                        fontSize: 12,
                        padding: "9px 12px",
                        justifyContent: "center",
                        cursor: isExecuting ? "wait" : "pointer",
                      }}
                    >
                      {isExecuting ? "Executing..." : "Approve & execute remediation"}
                    </button>
                  ) : (
                    <div
                      style={{
                        padding: "6px 10px",
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--orange)" }} />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10.5,
                          color: "var(--ink)",
                          fontWeight: 600,
                        }}
                      >
                        Verification running
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SpringReveal>
      </div>
    </section>
  );
}
