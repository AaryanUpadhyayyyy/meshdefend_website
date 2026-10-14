"use client";

import { useState } from "react";
import { SpringReveal } from "@/components/motion/SpringReveal";

interface TimelineStep {
  time: string;
  step: string;
  summary: string;
  actor: string;
  highlightField: "action" | "reason" | "approver" | "evidence" | "outcome";
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    time: "02:41 UTC",
    step: "Recommendation",
    summary: "Remediation proposed with context",
    actor: "MeshDefend correlation engine",
    highlightField: "reason",
  },
  {
    time: "02:44 UTC",
    step: "Approval",
    summary: "Authorized by Backup Lead",
    actor: "Backup Lead (Role: Tier-1 Storage Admin)",
    highlightField: "approver",
  },
  {
    time: "02:44 UTC",
    step: "Execution",
    summary: "Snapshot lock released & job retried",
    actor: "Storage controller & Veeam agent",
    highlightField: "action",
  },
  {
    time: "02:51 UTC",
    step: "Result",
    summary: "Backup & replication verified",
    actor: "Veeam + DataDomain verifier",
    highlightField: "outcome",
  },
];

const RECORD_FIELDS = [
  {
    key: "action",
    label: "Action",
    value: "Release stale snapshot handle on primary storage volume and retry Veeam incremental backup job",
    meta: "Target volume: vol-094 · Task ID #JOB-1849",
  },
  {
    key: "reason",
    label: "Reason",
    value: "Snapshot lock remained active after ServiceNow change CHG0019201 modified multipath configuration at 01:50",
    meta: "Root cause correlated across storage controller telemetry & CMDB",
  },
  {
    key: "approver",
    label: "Approver",
    value: "Authorized by Backup Lead · Role policy: Tier-1 storage & backup operations",
    meta: "Explicit human sign-off recorded via ResOC governance console",
  },
  {
    key: "evidence",
    label: "Evidence",
    value: "Correlated across Veeam job log, Dell PowerProtect DataDomain volume state, and ServiceNow change record (sample)",
    meta: "Zero telemetry discrepancies detected during verification scan",
  },
  {
    key: "outcome",
    label: "Outcome",
    value: "Incremental backup completed with zero warnings · replication lag returned within 4-hour RPO target",
    meta: "Clean restore point committed at 02:51:04 UTC",
  },
];

export function OperationalEvidenceFold() {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(1); // Default to Approval step
  const [isHovered, setIsHovered] = useState(false);

  const activeStep = TIMELINE_STEPS[activeStepIdx];

  return (
    <section
      id="operational-evidence"
      style={{
        padding: "120px 0",
        background: "var(--bg)",
        color: "var(--ink)",
        borderTop: "1px solid var(--border)",
      }}
      aria-labelledby="operational-evidence-heading"
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
              FIG. 6 — AUDIT-READY OPERATIONAL TRACE
            </div>

            <h2
              id="operational-evidence-heading"
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
              Every action should leave the environment easier to understand.
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
              Governance doesn&apos;t end when an action is approved. Every recommendation, human sign-off, execution step, and verification outcome is recorded as a permanent operational timeline—useful to the next shift operator and ready for compliance audits.
            </p>
          </div>

          {/* 12-Column Grid: 5 Cols Timeline Selector / 7 Cols Archival Record Sheet */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "5fr 7fr",
              gap: 48,
              alignItems: "start",
            }}
            className="evidence-split-grid"
          >
            {/* ─── LEFT COLUMN (5 COLS): TRACEABLE TIMELINE SELECTOR ─── */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  marginBottom: 18,
                  fontWeight: 600,
                }}
              >
                SHIFT INCIDENT TIMELINE
              </div>

              {/* Vertical Timeline Track */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
                role="tablist"
                aria-label="Incident timeline steps"
              >
                {/* 1px Vertical Rail */}
                <div
                  style={{
                    position: "absolute",
                    left: 7,
                    top: 16,
                    bottom: 24,
                    width: 1,
                    background: "var(--border)",
                  }}
                  aria-hidden="true"
                />

                {TIMELINE_STEPS.map((step, idx) => {
                  const isSelected = activeStepIdx === idx;

                  return (
                    <button
                      key={step.step}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveStepIdx(idx)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 16,
                        textAlign: "left",
                        background: isSelected ? "var(--surface)" : "transparent",
                        border: isSelected ? "1px solid var(--border)" : "1px solid transparent",
                        borderRadius: 4,
                        padding: "12px 14px",
                        cursor: "pointer",
                        position: "relative",
                        transition: "all 0.18s ease",
                        width: "100%",
                      }}
                    >
                      {/* Timeline Dot */}
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          borderRadius: "50%",
                          background: isSelected ? "var(--orange)" : "var(--bg)",
                          border: isSelected ? "2px solid var(--orange)" : "2px solid var(--border)",
                          flexShrink: 0,
                          marginTop: 2,
                          zIndex: 2,
                          boxShadow: isSelected ? "0 0 0 3px rgba(244, 85, 50, 0.15)" : "none",
                        }}
                      />

                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 11,
                              color: isSelected ? "var(--orange)" : "var(--muted)",
                              fontWeight: 600,
                            }}
                          >
                            {step.time}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-body), Inter, sans-serif",
                              fontSize: 13.5,
                              fontWeight: isSelected ? 600 : 500,
                              color: "var(--ink)",
                            }}
                          >
                            {step.step}
                          </span>
                        </div>

                        <span
                          style={{
                            fontFamily: "var(--font-body), Inter, sans-serif",
                            fontSize: 12.5,
                            color: "var(--muted)",
                            lineHeight: 1.4,
                          }}
                        >
                          {step.summary}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ─── RIGHT COLUMN (7 COLS): CSS-3D ARCHIVAL RECORD SHEET ─── */}
            <div style={{ perspective: 1200 }}>
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  boxShadow: isHovered
                    ? "0 24px 48px rgba(34, 31, 34, 0.09)"
                    : "0 16px 40px rgba(34, 31, 34, 0.05)",
                  transform: isHovered
                    ? "rotateX(1deg) rotateY(-1.2deg) translateY(-2px)"
                    : "rotateX(0deg) rotateY(0deg) translateY(0)",
                  transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease",
                  padding: "32px 30px",
                  position: "relative",
                }}
              >
                {/* Paper Header / Document Metadata */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: 18,
                    marginBottom: 24,
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-body), Inter, sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--muted)",
                        marginBottom: 4,
                      }}
                    >
                      MeshDefend · Operational audit record
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: 26,
                        color: "var(--ink)",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      Incident Remediation Trace: payments-db
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--muted)",
                      }}
                    >
                      Ref #INC-8849-02
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-body), Inter, sans-serif",
                        fontSize: 11,
                        color: "var(--orange)",
                        fontWeight: 600,
                      }}
                    >
                      Verified &amp; Sealed (illustrative)
                    </span>
                  </div>
                </div>

                {/* Exact 5 Sitemap Row 12 Fields */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {RECORD_FIELDS.map((field) => {
                    const isHighlighted = field.key === activeStep.highlightField;

                    return (
                      <div
                        key={field.key}
                        style={{
                          borderLeft: isHighlighted ? "2px solid var(--orange)" : "2px solid var(--border)",
                          paddingLeft: 14,
                          background: isHighlighted ? "rgba(244, 85, 50, 0.03)" : "transparent",
                          paddingTop: isHighlighted ? 6 : 0,
                          paddingBottom: isHighlighted ? 6 : 0,
                          borderRadius: 2,
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 2,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 10,
                              letterSpacing: "0.06em",
                              color: isHighlighted ? "var(--orange)" : "var(--muted)",
                              textTransform: "uppercase",
                              fontWeight: 600,
                            }}
                          >
                            {field.label}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 10,
                              color: "var(--muted)",
                            }}
                          >
                            {field.meta}
                          </span>
                        </div>

                        <div
                          style={{
                            fontFamily: "var(--font-body), Inter, sans-serif",
                            fontSize: 13,
                            color: "var(--ink)",
                            lineHeight: 1.45,
                            fontWeight: isHighlighted ? 500 : 400,
                          }}
                        >
                          {field.value}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Archival Guarantee Bar (Exact Sitemap Row 12 Intent) */}
                <div
                  style={{
                    marginTop: 24,
                    paddingTop: 18,
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 12.5,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    Every action leaves a complete record—recommendation, reason, approver, evidence, and outcome—so the next shift and compliance teams can trace exactly what happened.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SpringReveal>
      </div>
    </section>
  );
}
