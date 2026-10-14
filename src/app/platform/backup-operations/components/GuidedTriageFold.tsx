"use client";

import { useState } from "react";
import { SpringReveal } from "@/components/motion/SpringReveal";

interface ContextRow {
  index: string;
  dimension: string;
  evidence: string;
  source: string;
  detail: string;
}

const CONTEXT_ROWS: ContextRow[] = [
  {
    index: "01",
    dimension: "Job history",
    evidence: "Succeeded 14 consecutive nights; failed at 02:41 after configuration update",
    source: "Veeam Backup & Replication",
    detail: "14 prior successful runs averaged 18m duration. Failure occurred on volume snapshot creation at 02:41:18 UTC.",
  },
  {
    index: "02",
    dimension: "Infrastructure state",
    evidence: "Stale snapshot handle held on primary storage volume vol-094",
    source: "Dell PowerProtect DataDomain",
    detail: "Storage controller reports active lock lease expired at 02:15 UTC but handle was not cleanly released.",
  },
  {
    index: "03",
    dimension: "Protection configuration",
    evidence: "4-hour RPO policy; next scheduled backup window in 1h 18m",
    source: "Policy configuration",
    detail: "RPO objective is 240 minutes. Current data aging is at 162 minutes, requiring remediation before 04:00 UTC.",
  },
  {
    index: "04",
    dimension: "Recent changes",
    evidence: "ServiceNow CHG0019201 updated storage multipath policy at 01:50",
    source: "ServiceNow ITSM & CMDB",
    detail: "Change executed by Infrastructure Automation team caused transient path failover, leaving snapshot lock orphaned.",
  },
  {
    index: "05",
    dimension: "Capacity",
    evidence: "Target protection storage pool at 78% utilization; snapshot reserve within threshold",
    source: "Dell PowerProtect DataDomain",
    detail: "Storage headroom is healthy. Volume snapshot pool has 420 GB available capacity; no quota exhaustion.",
  },
  {
    index: "06",
    dimension: "Asset criticality",
    evidence: "Tier-1 database · 3 dependent customer-facing applications",
    source: "Application dependency map",
    detail: "Core billing, checkout-api, and merchant-portal depend on payments-db recovery point availability.",
  },
];

const GROUNDING_NODES = [
  "Ticket intelligence",
  "Runbook & SOP repositories",
  "Configuration lineage",
];

const DECISION_OPTIONS = [
  { id: "stage", label: "Stage for approval", status: "Decision recorded: Staged for Backup Lead approval" },
  { id: "schedule", label: "Schedule for window", status: "Decision recorded: Scheduled for next approved maintenance window (02:00 UTC)" },
  { id: "escalate", label: "Escalate to specialist", status: "Decision recorded: Escalated to Storage Engineering specialist queue" },
];

export function GuidedTriageFold() {
  const [selectedIdx, setSelectedIdx] = useState<number>(1); // Default to Infrastructure state
  const [selectedDecision, setSelectedDecision] = useState<number>(0);

  const activeRow = CONTEXT_ROWS[selectedIdx];

  return (
    <section
      id="guided-triage"
      style={{
        padding: "120px 0",
        background: "var(--bg)",
        color: "var(--ink)",
        borderTop: "1px solid var(--border)",
      }}
      aria-labelledby="triage-section-heading"
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
              FIG. 4 — CONTEXT-ASSEMBLED DIAGNOSTICS
            </div>

            <h2
              id="triage-section-heading"
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
              A failed job shouldn’t start a scavenger hunt.
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
              When a backup or replication job fails, operators shouldn&apos;t have to hunt through storage consoles, change tickets, and runbooks to understand why. MeshDefend assembles the evidence behind every recommendation so the operator can verify the reasoning in seconds.
            </p>
          </div>

          {/* 12-Column Grid: 7 Cols Left Context Index / 5 Cols Right Sticky Diagnostic Sheet */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "7fr 5fr",
              gap: 56,
              alignItems: "start",
            }}
            className="triage-main-grid"
          >
            {/* ─── LEFT COLUMN (7 COLS): INTERACTIVE CONTEXT ROWS ─── */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "1px solid var(--border)",
                }}
                role="tablist"
                aria-label="Context dimensions"
              >
                {CONTEXT_ROWS.map((row, idx) => {
                  const isSelected = selectedIdx === idx;

                  return (
                    <button
                      key={row.index}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setSelectedIdx(idx)}
                      onMouseEnter={() => setSelectedIdx(idx)}
                      onFocus={() => setSelectedIdx(idx)}
                      style={{
                        minHeight: 74,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        padding: isSelected ? "18px 16px" : "18px 0",
                        borderBottom: "1px solid var(--border)",
                        borderLeft: isSelected ? "2px solid var(--orange)" : "2px solid transparent",
                        background: isSelected ? "var(--surface)" : "transparent",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
                        width: "100%",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: "70%" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 10.5,
                              color: isSelected ? "var(--orange)" : "var(--muted)",
                              fontWeight: 600,
                            }}
                          >
                            {row.index}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                              fontSize: 28,
                              lineHeight: 1.1,
                              color: "var(--ink)",
                              fontWeight: 400,
                              letterSpacing: "-0.015em",
                            }}
                          >
                            {row.dimension}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: "var(--font-body), Inter, sans-serif",
                            fontSize: 13.5,
                            color: "var(--muted)",
                            lineHeight: 1.45,
                            paddingLeft: 24,
                          }}
                        >
                          {row.evidence}
                        </span>
                      </div>

                      <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-body), Inter, sans-serif",
                            fontSize: 12.5,
                            color: isSelected ? "var(--ink)" : "var(--muted)",
                            fontWeight: isSelected ? 600 : 400,
                          }}
                        >
                          {row.source}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Knowledge Base Grounding Strip (Sitemap Row 10) */}
              <div
                style={{
                  marginTop: 32,
                  padding: "16px 0",
                  borderTop: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 12.5,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    {GROUNDING_NODES.map((node, idx) => (
                      <div key={node} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ color: "var(--ink)", fontWeight: 500 }}>{node}</span>
                        {idx < GROUNDING_NODES.length - 1 && (
                          <span style={{ color: "var(--border)", fontWeight: 300 }}>──</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)" }} />
                    <span style={{ color: "var(--muted)", fontSize: 12 }}>
                      Context assembled (illustrative)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── RIGHT COLUMN (5 COLS): STICKY PAPER DIAGNOSTIC SHEET ─── */}
            <div
              style={{
                position: "sticky",
                top: 110,
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                padding: "32px 28px",
                boxShadow: "0 16px 40px rgba(34, 31, 34, 0.07)",
              }}
              aria-label="Diagnostic recommendation sheet"
            >
              {/* Sheet Top Meta */}
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
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    MeshDefend
                  </span>
                  <span style={{ color: "var(--muted)", fontSize: 13 }}>· Guided triage</span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 11.5,
                    color: "var(--muted)",
                    border: "1px solid var(--border)",
                    padding: "2px 8px",
                    borderRadius: 3,
                  }}
                >
                  Illustrative
                </span>
              </div>

              {/* Incident Title */}
              <div style={{ marginBottom: 24 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 30,
                    lineHeight: 1.1,
                    letterSpacing: "-0.015em",
                    color: "var(--ink)",
                    fontWeight: 400,
                    margin: "0 0 6px 0",
                  }}
                >
                  Backup failure · payments-db
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11.5,
                    color: "var(--muted)",
                  }}
                >
                  02:41 UTC · Correlated with storage controller
                </span>
              </div>

              {/* 3 Structured Hairline-Left Sections (Sitemap Row 10 Flow) */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                <div style={{ borderLeft: "2px solid var(--border)", paddingLeft: 14 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      letterSpacing: "0.06em",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Exception
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13,
                      color: "var(--ink)",
                      lineHeight: 1.45,
                    }}
                  >
                    Incremental backup job failed at 02:41 · snapshot lock timeout
                  </div>
                </div>

                <div style={{ borderLeft: "2px solid var(--border)", paddingLeft: 14 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      letterSpacing: "0.06em",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Why it happened
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13,
                      color: "var(--ink)",
                      lineHeight: 1.45,
                    }}
                  >
                    Stale snapshot handle on primary storage volume after 01:50 multipath config update
                  </div>
                </div>

                <div style={{ borderLeft: "2px solid var(--orange)", paddingLeft: 14 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      letterSpacing: "0.06em",
                      color: "var(--orange)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginBottom: 2,
                    }}
                  >
                    Recommended action
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13.5,
                      fontWeight: 500,
                      color: "var(--ink)",
                      lineHeight: 1.45,
                    }}
                  >
                    Release stale snapshot handle and re-run incremental backup job
                  </div>
                </div>
              </div>

              {/* Active Context Dimension Inspection */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 3,
                  padding: "12px 14px",
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--orange)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    Context: {activeRow.index} {activeRow.dimension}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 11,
                      color: "var(--muted)",
                    }}
                  >
                    {activeRow.source}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 12.5,
                    color: "var(--ink)",
                    lineHeight: 1.45,
                  }}
                >
                  {activeRow.detail}
                </div>
              </div>

              {/* Operator Decision Controls (Sitemap Row 10) */}
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 18 }}>
                <div
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 12,
                    color: "var(--muted)",
                    marginBottom: 10,
                    fontWeight: 500,
                  }}
                >
                  Operator decision:
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 6,
                    marginBottom: 10,
                  }}
                  role="radiogroup"
                  aria-label="Operator decision options"
                >
                  {DECISION_OPTIONS.map((opt, idx) => {
                    const isActive = selectedDecision === idx;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        onClick={() => setSelectedDecision(idx)}
                        style={{
                          padding: "8px 6px",
                          background: isActive ? "var(--ink)" : "var(--surface)",
                          color: isActive ? "#ffffff" : "var(--ink)",
                          border: isActive ? "1px solid var(--ink)" : "1px solid var(--border)",
                          borderRadius: 3,
                          fontFamily: "var(--font-body), Inter, sans-serif",
                          fontSize: 11,
                          fontWeight: 500,
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "all 0.18s ease",
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--orange)",
                    fontWeight: 600,
                  }}
                >
                  {DECISION_OPTIONS[selectedDecision].status}
                </div>
              </div>
            </div>
          </div>
        </SpringReveal>
      </div>
    </section>
  );
}
