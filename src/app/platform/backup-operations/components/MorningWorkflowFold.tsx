"use client";

import { useState } from "react";
import { SpringReveal } from "@/components/motion/SpringReveal";

interface TimelineStep {
  time: string;
  stageTitle: string;
  category: string;
  summary: string;
  telemetrySignal: string;
  sourceSystems: string[];
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    time: "07:45",
    stageTitle: "What Changed Overnight",
    category: "ENVIRONMENT & CONFIGURATION CHANGES",
    summary:
      "ServiceNow RFC-88421 modified storage volume mapping on payments-db; 2 new VMs provisioned in AWS without protection policy.",
    telemetrySignal:
      "Telemetry correlated across ServiceNow ITSM + AWS CloudWatch inventory sync. Detected configuration change at 01:50 UTC preceding backup window.",
    sourceSystems: ["ServiceNow RFC-88421", "AWS us-east-1", "CMDB Asset Map"],
  },
  {
    time: "07:52",
    stageTitle: "What Needs Attention",
    category: "DRIFT & SLA THRESHOLD WARNINGS",
    summary:
      "Veeam backup window on payments-db extended +34m; DataDomain replication lag crossed 85% of target RPO.",
    telemetrySignal:
      "Replication lag on primary SAN volume crossed 85% of 4-hour RPO envelope. Stale snapshot hold detected on Dell DataDomain MTree.",
    sourceSystems: ["Veeam B&R v12", "Dell PowerProtect DataDomain", "SAN Controller"],
  },
  {
    time: "08:00",
    stageTitle: "What Needs Action",
    category: "GOVERNED REMEDIATION QUEUE",
    summary:
      "1 guided remediation staged for operator approval; 1 unprotected workload policy assignment queued.",
    telemetrySignal:
      "Agent Mesh™ prepared snapshot handle release and incremental retry script. Paused at Gate 04 awaiting Backup Lead sign-off.",
    sourceSystems: ["ResOC Orchestrator", "HITL Policy Gate", "Shift Lead Approval"],
  },
];

export function MorningWorkflowFold() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section
      id="morning-workflow"
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
            FIG. 2 — START-OF-DAY OPERATIONAL SEQUENCE
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
              Know what changed before the first escalation arrives.
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
              Instead of piecing together overnight job logs across four consoles, start the morning with a single operational sequence: what changed in the environment, what drifted out of policy, and what requires a decision right now.
            </p>
          </div>

          {/* ─── 3-STEP HORIZONTAL ARCHITECTURAL TIMELINE ─── */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            {/* 3-Column Timeline Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
              className="morning-timeline-grid"
            >
              {TIMELINE_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                const isLast = idx === TIMELINE_STEPS.length - 1;

                return (
                  <button
                    key={step.time}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    style={{
                      textAlign: "left",
                      padding: "28px 24px",
                      background: isActive ? "var(--bg)" : "transparent",
                      borderRight: isLast ? "none" : "1px solid var(--border)",
                      borderTop: "none",
                      borderBottom: "1px solid var(--border)",
                      borderLeft: "none",
                      position: "relative",
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                    }}
                  >
                    {/* Active 2px Orange Top Bar that glides across steps */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: "var(--orange)",
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    />

                    {/* Time & Sequence Meta */}
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
                          fontSize: 14,
                          fontWeight: 700,
                          color: isActive ? "var(--orange)" : "var(--ink)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {step.time}
                      </span>

                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          letterSpacing: "0.06em",
                          color: "var(--muted)",
                          textTransform: "uppercase",
                        }}
                      >
                        SEQUENCE 0{idx + 1}
                      </span>
                    </div>

                    {/* Stage Title */}
                    <div
                      style={{
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: 24,
                        lineHeight: 1.15,
                        color: "var(--ink)",
                        marginBottom: 8,
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {step.stageTitle}
                    </div>

                    {/* Category */}
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        color: "var(--muted)",
                        marginBottom: 14,
                        textTransform: "uppercase",
                      }}
                    >
                      {step.category}
                    </div>

                    {/* Exact Sitemap Description */}
                    <p
                      style={{
                        fontFamily: "var(--font-body), Inter, sans-serif",
                        fontSize: 14,
                        lineHeight: 1.55,
                        color: isActive ? "var(--ink)" : "var(--muted)",
                        margin: 0,
                      }}
                    >
                      {step.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Telemetry Detail Strip */}
            <div
              style={{
                padding: "20px 24px",
                background: "var(--bg)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, maxWidth: 740 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--orange)",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  DEEP TELEMETRY:
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 13.5,
                    color: "var(--muted)",
                    lineHeight: 1.5,
                  }}
                >
                  {TIMELINE_STEPS[activeStep].telemetrySignal}
                </span>
              </div>

              {/* Source systems pills */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                {TIMELINE_STEPS[activeStep].sourceSystems.map((sys) => (
                  <span
                    key={sys}
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      padding: "3px 8px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 3,
                      color: "var(--ink)",
                    }}
                  >
                    {sys}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SpringReveal>
      </div>
    </section>
  );
}
