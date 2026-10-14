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

          {/* ─── INTERACTIVE GOVERNED EXECUTION GATE PIPELINE ─── */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            {/* Stage Pipeline Header Bar */}
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
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "var(--ink)",
                    textTransform: "uppercase",
                  }}
                >
                  AUTONOMY LEVEL // POLICY-BOUND (HITL &amp; HIOL)
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
                    ? "STATUS: REMEDIATION EXECUTED &amp; VERIFIED"
                    : "STATUS: PAUSED AT GATE 04 FOR OPERATOR APPROVAL"}
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

            {/* 4-Stage Horizontal Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
              }}
              className="governed-gate-grid"
            >
              {/* Gate 01 */}
              <div
                style={{
                  padding: "28px 24px",
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
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        letterSpacing: "0.06em",
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      GATE 01
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
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
                      fontSize: 22,
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
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    Read-only diagnostics allowed; destructive storage deletes blocked by policy.
                  </p>
                </div>

                <div
                  style={{
                    marginTop: 20,
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--muted)",
                  }}
                >
                  SEC-POL-882 · ACTIVE
                </div>
              </div>

              {/* Gate 02 */}
              <div
                style={{
                  padding: "28px 24px",
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
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        letterSpacing: "0.06em",
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      GATE 02
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
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
                      fontSize: 22,
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
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    Requires Backup Lead or Storage Admin role for storage handle release.
                  </p>
                </div>

                <div
                  style={{
                    marginTop: 20,
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--muted)",
                  }}
                >
                  RBAC: BACKUP-LEAD
                </div>
              </div>

              {/* Gate 03 */}
              <div
                style={{
                  padding: "28px 24px",
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
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        letterSpacing: "0.06em",
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      GATE 03
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
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
                      fontSize: 22,
                      lineHeight: 1.2,
                      color: "var(--ink)",
                      marginBottom: 8,
                    }}
                  >
                    Change Window
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    Within approved maintenance window (02:00–05:00 UTC). Current: 02:44 UTC.
                  </p>
                </div>

                <div
                  style={{
                    marginTop: 20,
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--muted)",
                  }}
                >
                  WINDOW OPEN (2h 16m LEFT)
                </div>
              </div>

              {/* Gate 04: Human Sign-Off (Interactive) */}
              <div
                style={{
                  padding: "28px 24px",
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
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        letterSpacing: "0.06em",
                        color: isApproved ? "var(--ink)" : "var(--orange)",
                        textTransform: "uppercase",
                        fontWeight: 700,
                      }}
                    >
                      GATE 04 // FINAL SIGN-OFF
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        padding: "2px 6px",
                        background: isApproved ? "var(--orange)" : "rgba(244, 85, 50, 0.12)",
                        color: isApproved ? "#ffffff" : "var(--orange)",
                        borderRadius: 3,
                        fontWeight: 700,
                      }}
                    >
                      {isApproved ? "Executed ✓" : "Pending Sign-off"}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 22,
                      lineHeight: 1.2,
                      color: "var(--ink)",
                      marginBottom: 8,
                    }}
                  >
                    Human Sign-Off
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                      margin: "0 0 16px 0",
                    }}
                  >
                    {isApproved
                      ? "Approved by R. Sharma (Shift Lead). Released stale snapshot handle; Veeam backup job #1849 triggered."
                      : "Action paused. Operator review required before releasing storage locks on payments-db."}
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
                        fontSize: 12.5,
                        padding: "10px 14px",
                        justifyContent: "center",
                        cursor: isExecuting ? "wait" : "pointer",
                      }}
                    >
                      {isExecuting ? "Executing Action..." : "Approve & Execute Remediation"}
                    </button>
                  ) : (
                    <div
                      style={{
                        padding: "8px 12px",
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)" }} />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 11,
                          color: "var(--ink)",
                          fontWeight: 600,
                        }}
                      >
                        Verification running · Job #1849
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
