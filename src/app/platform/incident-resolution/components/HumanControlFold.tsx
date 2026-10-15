"use client";

import { SpringReveal } from "@/components/motion/SpringReveal";

interface BoundaryColumn {
  tag: string;
  title: string;
  badge: string;
  badgeType: "autonomous" | "approval" | "forbidden" | "rollback";
  rule: string;
  items: { text: string; sub: string }[];
}

const COLUMNS: BoundaryColumn[] = [
  {
    tag: "MODE 01",
    title: "Autonomous",
    badge: "Agent Acts Alone",
    badgeType: "autonomous",
    rule: "Read-only diagnostics, upstream correlation, and continuous health evaluation run 24/7 without waiting for operator intervention.",
    items: [
      { text: "Cross-Engine Telemetry Ingestion", sub: "Polling Veeam, Commvault, Dell DataDomain & NetWorker APIs" },
      { text: "Change & Context Correlation", sub: "Mapping ServiceNow RFCs to active storage I/O alerts" },
      { text: "Application Dependency Mapping", sub: "Tracing impact from storage volume to tier-1 service tier" },
      { text: "Remediation Recipe Formulation", sub: "Assembling verified, reversible action proposals" },
    ],
  },
  {
    tag: "MODE 02",
    title: "Requires Approval",
    badge: "Human-in-the-Loop",
    badgeType: "approval",
    rule: "Any corrective action that alters storage controller state, restarts production jobs, or modifies policy boundaries pauses for explicit sign-off.",
    items: [
      { text: "SAN Snapshot Lock Releases", sub: "Terminating orphaned volume snapshot lease handles" },
      { text: "On-Demand Backup Retries", sub: "Re-triggering failed incremental or full backup schedules" },
      { text: "Policy & SLA Target Adjustments", sub: "Modifying retention windows or priority queue assignments" },
      { text: "Target Replication Resynchronization", sub: "Restarting delayed replication streams across data centers" },
    ],
  },
  {
    tag: "MODE 03",
    title: "Forbidden",
    badge: "Structurally Blocked",
    badgeType: "forbidden",
    rule: "Destructive operations are permanently disabled at the platform adapter layer. No agent routine or autonomous script can execute them.",
    items: [
      { text: "Primary Retention Copy Deletion", sub: "Hard-blocked: Retention copies cannot be purged autonomously" },
      { text: "Air-Gap & Isolation Bypass", sub: "Hard-blocked: Network isolation rules cannot be overridden" },
      { text: "Security Policy Downgrades", sub: "Hard-blocked: Encryption & immutability configurations are locked" },
      { text: "Production Change-Freeze Override", sub: "Hard-blocked: Actions pause outside authorized maintenance windows" },
    ],
  },
  {
    tag: "MODE 04",
    title: "Rollback Triggers",
    badge: "Fail-Safe Revert",
    badgeType: "rollback",
    rule: "Execution is continuously monitored in real time. If post-action verification detects unexpected behavior, the agent automatically executes rollback.",
    items: [
      { text: "Lock Release API Rejection", sub: "Reverts immediately if storage array returns error response" },
      { text: "Job Latency Spike (>120% SLA)", sub: "Aborts retry if database I/O queue latency degrades" },
      { text: "Replication Lag Divergence", sub: "Stops stream if secondary replica checksum mismatches" },
      { text: "Immediate Shift Escalation", sub: "Notifies on-call Storage Lead with complete failure trace" },
    ],
  },
];

export function HumanControlFold() {
  return (
    <section
      id="human-control"
      style={{
        padding: "120px 0",
        background: "var(--bg)",
        color: "var(--ink)",
        borderTop: "1px solid var(--border)",
      }}
      aria-labelledby="human-control-heading"
    >
      <div className="container">
        <SpringReveal>
          {/* Section Header */}
          <div style={{ maxWidth: 860, marginBottom: 56 }}>
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "var(--orange)",
                textTransform: "uppercase",
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              [ BOUNDARY DEFINITION · STRUCTURAL AUTHORITY MATRIX ]
            </div>

            <h2
              id="human-control-heading"
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
              Autonomous where you allow it. Human-controlled where it matters.
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
              What stops the agent from taking the wrong action without me? Autonomy isn&apos;t a black box. Define structural boundaries indicating what AI can do alone, what requires approval, and what is completely forbidden.
            </p>
          </div>

          {/* 4-Column Boundary Grid */}
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: 4,
              overflow: "hidden",
              background: "var(--bg)",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
            className="authority-matrix-grid"
          >
            {COLUMNS.map((col, idx) => {
              const isLast = idx === COLUMNS.length - 1;

              return (
                <div
                  key={col.tag}
                  style={{
                    padding: "28px 24px",
                    borderRight: isLast ? "none" : "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: idx === 1 ? "rgba(244, 85, 50, 0.02)" : "transparent",
                  }}
                  className="authority-col"
                >
                  <div>
                    {/* Header: Tag + Badge */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10.5,
                          letterSpacing: "0.06em",
                          color: "var(--muted)",
                          fontWeight: 600,
                        }}
                      >
                        {col.tag}
                      </span>

                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          padding: "2px 7px",
                          borderRadius: 3,
                          fontWeight: 600,
                          background:
                            col.badgeType === "approval"
                              ? "rgba(244, 85, 50, 0.1)"
                              : col.badgeType === "autonomous"
                              ? "rgba(34, 31, 34, 0.06)"
                              : col.badgeType === "forbidden"
                              ? "rgba(34, 31, 34, 0.06)"
                              : "rgba(34, 31, 34, 0.06)",
                          color:
                            col.badgeType === "approval"
                              ? "var(--orange)"
                              : "var(--ink)",
                          border:
                            col.badgeType === "approval"
                              ? "1px solid var(--orange)"
                              : "1px solid var(--border)",
                        }}
                      >
                        {col.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: 26,
                        lineHeight: 1.15,
                        color: "var(--ink)",
                        fontWeight: 400,
                        margin: "0 0 10px 0",
                      }}
                    >
                      {col.title}
                    </h3>

                    {/* Rule text */}
                    <p
                      style={{
                        fontFamily: "var(--font-body), Inter, sans-serif",
                        fontSize: 13,
                        color: "var(--muted)",
                        lineHeight: 1.5,
                        margin: "0 0 24px 0",
                      }}
                    >
                      {col.rule}
                    </p>

                    {/* Structural Items List */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      {col.items.map((item) => (
                        <div
                          key={item.text}
                          style={{
                            borderTop: "1px solid var(--border)",
                            paddingTop: 10,
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-body), Inter, sans-serif",
                              fontSize: 12.5,
                              fontWeight: 600,
                              color: "var(--ink)",
                              marginBottom: 2,
                            }}
                          >
                            {item.text}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 10.5,
                              color: "var(--muted)",
                              lineHeight: 1.35,
                            }}
                          >
                            {item.sub}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SpringReveal>
      </div>
    </section>
  );
}
