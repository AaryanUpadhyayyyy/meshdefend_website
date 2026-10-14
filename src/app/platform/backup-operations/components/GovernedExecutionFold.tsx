"use client";

import { useState } from "react";
import { SpringReveal } from "@/components/motion/SpringReveal";

interface GateInfo {
  index: string;
  name: string;
  shortStatus: string;
  isPassed: boolean;
  boundaryRule: string;
  autoRuns: string;
  pausesAtGate: string;
  evaluation: string;
}

const GATES: GateInfo[] = [
  {
    index: "01",
    name: "Policy guardrails",
    shortStatus: "Pass ✓",
    isPassed: true,
    boundaryRule: "Diagnostics run automatically without approval; state-changing SAN actions are strictly bound by policy.",
    autoRuns: "Storage telemetry polling, snapshot lease queries, error log correlation.",
    pausesAtGate: "Any volume unmap, lock release, or script execution requires explicit policy rule match.",
    evaluation: "Policy #POL-089 active. Action identified as state-changing storage operation (lock release on primary storage).",
  },
  {
    index: "02",
    name: "Role permissions",
    shortStatus: "Pass ✓",
    isPassed: true,
    boundaryRule: "Requires authorized Backup Lead or Storage Administrator role for snapshot lease termination.",
    autoRuns: "User directory credential verification, team role mapping, permission tier check.",
    pausesAtGate: "Unassigned operators or read-only viewers cannot trigger or authorize execution.",
    evaluation: "Active operator holds role: Backup Lead. Role policy authorizes SAN snapshot manipulation on Tier-1 workloads.",
  },
  {
    index: "03",
    name: "Change windows",
    shortStatus: "Pass ✓",
    isPassed: true,
    boundaryRule: "Validated against approved maintenance windows in ServiceNow ITSM & CMDB.",
    autoRuns: "CMDB schedule lookup, emergency change request validation, freeze-period verification.",
    pausesAtGate: "Actions outside approved maintenance windows require emergency override authorization.",
    evaluation: "CHG0019201 approved window: 02:00–05:00 UTC. Current time: 02:44 UTC. Maintenance window is open.",
  },
  {
    index: "04",
    name: "Confidence thresholds",
    shortStatus: "Pass ✓",
    isPassed: true,
    boundaryRule: "Diagnostic correlation confidence must exceed policy threshold before staging recommendation.",
    autoRuns: "Cross-signal vector comparison, historical resolution similarity scoring, telemetry validation.",
    pausesAtGate: "Low-confidence recommendations (<90%) are routed to engineering specialist queue.",
    evaluation: "Match score: 96% across job log, SAN volume handle, and ServiceNow multipath change. Exceeds 90% threshold.",
  },
  {
    index: "05",
    name: "Approval gate",
    shortStatus: "Requires human",
    isPassed: false,
    boundaryRule: "State-changing action pauses here. API command is only dispatched upon explicit human sign-off.",
    autoRuns: "Staging execution payload, generating reversible rollback recipe, preparing audit entry.",
    pausesAtGate: "No storage API commands are dispatched until the operator explicitly authorizes execution.",
    evaluation: "Action payload staged. Waiting for Backup Lead authorization to dispatch SAN lock release and trigger Veeam retry.",
  },
];

export function GovernedExecutionFold() {
  const [selectedGate, setSelectedGate] = useState<number>(4); // Default to Gate 05 (Approval Gate)
  const [autonomyMode, setAutonomyMode] = useState<"hitl" | "hiol">("hitl");
  const [isApproved, setIsApproved] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleApprove = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setIsApproved(true);
    }, 850);
  };

  const handleReset = () => {
    setIsApproved(false);
    setIsExecuting(false);
  };

  const gate = GATES[selectedGate];

  // Pipeline progress fill: 80% if unapproved (Gates 1-4 passed, pausing at Gate 5), 100% if approved
  const progressFill = isApproved ? 100 : 80;

  return (
    <section
      id="governed-execution"
      style={{
        padding: "120px 0",
        background: "var(--bg)",
        color: "var(--ink)",
        borderTop: "1px solid var(--border)",
      }}
      aria-labelledby="governed-execution-heading"
    >
      <div className="container">
        <SpringReveal>
          {/* Section Header */}
          <div style={{ maxWidth: 840, marginBottom: 56 }}>
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "var(--muted)",
                textTransform: "uppercase",
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              FIG. 5 — POLICY GUARDRAILS &amp; HUMAN APPROVAL GATES
            </div>

            <h2
              id="governed-execution-heading"
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

          {/* ─── TOP INTERACTIVE PIPELINE TRACK (FULL WIDTH) ─── */}
          <div
            style={{
              position: "relative",
              marginBottom: 48,
              padding: "24px 0",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {/* Connecting Hairline Rail */}
            <div
              style={{
                position: "absolute",
                top: 48,
                left: "10%",
                right: "10%",
                height: 1,
                background: "var(--border)",
                zIndex: 1,
              }}
            >
              {/* Animated Progress Fill */}
              <div
                style={{
                  height: "100%",
                  width: `${progressFill}%`,
                  background: "var(--orange)",
                  transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>

            {/* 5 Clickable Gate Nodes */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                position: "relative",
                zIndex: 2,
              }}
              role="tablist"
              aria-label="Control pipeline gates"
            >
              {GATES.map((g, idx) => {
                const isSelected = selectedGate === idx;
                const isGate5 = idx === 4;
                const passed = isGate5 ? isApproved : g.isPassed;

                return (
                  <button
                    key={g.index}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedGate(idx)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      background: "transparent",
                      cursor: "pointer",
                      padding: "8px 12px",
                      position: "relative",
                    }}
                  >
                    {/* Node Dot */}
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: passed ? "var(--orange)" : isSelected ? "var(--ink)" : "var(--bg)",
                        border: passed ? "2px solid var(--orange)" : "2px solid var(--border)",
                        marginBottom: 14,
                        boxShadow: isSelected ? "0 0 0 4px rgba(244, 85, 50, 0.15)" : "none",
                        transition: "all 0.2s ease",
                      }}
                    />

                    {/* Gate Index */}
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        color: isSelected ? "var(--orange)" : "var(--muted)",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        marginBottom: 2,
                      }}
                    >
                      GATE {g.index}
                    </span>

                    {/* Gate Title */}
                    <span
                      style={{
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: "clamp(18px, 1.8vw, 24px)",
                        lineHeight: 1.15,
                        color: "var(--ink)",
                        fontWeight: 400,
                        marginBottom: 4,
                      }}
                    >
                      {g.name}
                    </span>

                    {/* Status Pill */}
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        color: passed ? "var(--orange)" : isGate5 ? "var(--muted)" : "var(--ink)",
                        fontWeight: 600,
                      }}
                    >
                      {isGate5 ? (isApproved ? "Approved ✓" : "Requires human") : g.shortStatus}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── BOTTOM 7/5 SPLIT INSPECTOR PANEL (PAPER & INK) ─── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "7fr 5fr",
              gap: 48,
              alignItems: "start",
            }}
            className="governed-split-grid"
          >
            {/* Left 7 Cols: Gate Inspector Details */}
            <div
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                padding: "32px 30px",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <div>
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
                      fontSize: 11,
                      color: "var(--orange)",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    GATE {gate.index} INSPECTOR · {gate.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--muted)",
                    }}
                  >
                    Policy-governed autonomy
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 28,
                    lineHeight: 1.15,
                    color: "var(--ink)",
                    fontWeight: 400,
                    margin: 0,
                  }}
                >
                  {gate.boundaryRule}
                </h3>
              </div>

              {/* Boundary Rule Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    padding: "16px",
                    background: "var(--surface)",
                    borderRadius: 3,
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      color: "var(--ink)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    What runs automatically
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13,
                      color: "var(--muted)",
                      lineHeight: 1.45,
                    }}
                  >
                    {gate.autoRuns}
                  </div>
                </div>

                <div
                  style={{
                    padding: "16px",
                    background: "var(--surface)",
                    borderRadius: 3,
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      color: "var(--orange)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    What pauses at gate
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13,
                      color: "var(--muted)",
                      lineHeight: 1.45,
                    }}
                  >
                    {gate.pausesAtGate}
                  </div>
                </div>
              </div>

              {/* Specific Evaluation for payments-db */}
              <div
                style={{
                  padding: "16px 18px",
                  background: "var(--surface)",
                  borderLeft: "2px solid var(--orange)",
                  borderRadius: 3,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10.5,
                    color: "var(--ink)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Active evaluation on payments-db
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 13.5,
                    color: "var(--ink)",
                    lineHeight: 1.5,
                  }}
                >
                  {gate.evaluation}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Human-in-the-Loop Execution Control Box */}
            <div
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                padding: "32px 28px",
                boxShadow: "0 16px 40px rgba(34, 31, 34, 0.07)",
              }}
            >
              {/* Box Top Meta */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 16,
                  borderBottom: "1px solid var(--border)",
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  Execution control
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: isApproved ? "var(--ink)" : "var(--orange)",
                    fontWeight: 600,
                  }}
                >
                  {isApproved ? "Executed ✓" : "Pending sign-off"}
                </span>
              </div>

              {/* Autonomy Mode Toggle */}
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 12,
                    color: "var(--muted)",
                    marginBottom: 8,
                  }}
                >
                  Autonomy mode:
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 6,
                    padding: 3,
                    background: "var(--surface)",
                    borderRadius: 4,
                    border: "1px solid var(--border)",
                  }}
                  role="radiogroup"
                  aria-label="Autonomy mode"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={autonomyMode === "hitl"}
                    onClick={() => setAutonomyMode("hitl")}
                    style={{
                      padding: "8px 10px",
                      background: autonomyMode === "hitl" ? "var(--bg)" : "transparent",
                      border: autonomyMode === "hitl" ? "1px solid var(--border)" : "1px solid transparent",
                      borderRadius: 3,
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 11.5,
                      fontWeight: 500,
                      color: autonomyMode === "hitl" ? "var(--ink)" : "var(--muted)",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Human in the loop
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={autonomyMode === "hiol"}
                    onClick={() => setAutonomyMode("hiol")}
                    style={{
                      padding: "8px 10px",
                      background: autonomyMode === "hiol" ? "var(--bg)" : "transparent",
                      border: autonomyMode === "hiol" ? "1px solid var(--border)" : "1px solid transparent",
                      borderRadius: 3,
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 11.5,
                      fontWeight: 500,
                      color: autonomyMode === "hiol" ? "var(--ink)" : "var(--muted)",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Human on the loop
                  </button>
                </div>
              </div>

              {/* Staged Action Payload */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 3,
                  padding: "14px",
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 4,
                  }}
                >
                  STAGED ACTION
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 4,
                  }}
                >
                  Release SAN volume vol-094 snapshot lock
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--muted)",
                  }}
                >
                  Target: Dell PowerProtect DataDomain · payments-db
                </div>
              </div>

              {/* Action Button */}
              {!isApproved ? (
                <button
                  type="button"
                  disabled={isExecuting}
                  onClick={handleApprove}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    fontSize: 13,
                    padding: "12px 16px",
                    justifyContent: "center",
                    cursor: isExecuting ? "wait" : "pointer",
                  }}
                >
                  {isExecuting ? "Executing remediation..." : "Approve & execute remediation"}
                </button>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div
                    style={{
                      padding: "12px 14px",
                      background: "rgba(244, 85, 50, 0.06)",
                      border: "1px solid var(--orange)",
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)" }} />
                    <span
                      style={{
                        fontFamily: "var(--font-body), Inter, sans-serif",
                        fontSize: 12.5,
                        color: "var(--ink)",
                        fontWeight: 600,
                      }}
                    >
                      Remediation executed &amp; verified ✓
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      padding: "6px 12px",
                      background: "transparent",
                      border: "1px solid var(--border)",
                      borderRadius: 3,
                      color: "var(--muted)",
                      cursor: "pointer",
                    }}
                  >
                    Reset Gate State
                  </button>
                </div>
              )}
            </div>
          </div>
        </SpringReveal>
      </div>
    </section>
  );
}
