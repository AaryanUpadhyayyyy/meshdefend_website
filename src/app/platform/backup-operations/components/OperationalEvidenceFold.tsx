"use client";

import { useState } from "react";
import { SpringReveal } from "@/components/motion/SpringReveal";

interface AuditEntry {
  timestamp: string;
  step: string;
  actor: string;
  detail: string;
  hash: string;
}

const AUDIT_TRAIL: AuditEntry[] = [
  {
    timestamp: "02:41:12 UTC",
    step: "Recommendation",
    actor: "Agent Mesh™",
    detail: "Agent Mesh™ isolated stale snapshot lock on payments-db; proposed lock release + job retry.",
    hash: "sig_e8a209b4",
  },
  {
    timestamp: "02:44:05 UTC",
    step: "Approval",
    actor: "R. Sharma (Backup Lead)",
    detail: "Approved by R. Sharma (Backup Lead) via ResOC Console · Policy Gate: HITL-Tier1.",
    hash: "sig_710bc82a",
  },
  {
    timestamp: "02:44:19 UTC",
    step: "Execution",
    actor: "ResOC Controller",
    detail: "Snapshot handle released; Veeam incremental backup job #1849 triggered.",
    hash: "sig_f932aa11",
  },
  {
    timestamp: "02:51:04 UTC",
    step: "Outcome & Evidence",
    actor: "Veeam + DataDomain Verifier",
    detail: "Backup completed (0 warnings) · DataDomain replication synced · Audit record signed.",
    hash: "sig_004bb6c9",
  },
];

export function OperationalEvidenceFold() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="operational-evidence"
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
            FIG. 6 — IMMUTABLE OPERATIONAL AUDIT RECORD
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

          {/* ─── CSS-3D PERSPECTIVE ARCHIVAL AUDIT SHEET ─── */}
          <div style={{ perspective: 1200, maxWidth: 960, margin: "0 auto" }}>
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
                padding: "36px 36px 32px",
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
                  paddingBottom: 20,
                  marginBottom: 28,
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      letterSpacing: "0.1em",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    CERTIFIED OPERATIONAL INCIDENT RECORD // RESOC-AUDIT-V2
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 24,
                      color: "var(--ink)",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    Incident Remediation Trace: INC-8849-payments-db
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--ink)",
                      fontWeight: 600,
                    }}
                  >
                    SHA-256: 8f4e91cd88a107ef4c...
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--orange)",
                      fontWeight: 600,
                    }}
                  >
                    IMMUTABLE LEDGER · VERIFIED
                  </div>
                </div>
              </div>

              {/* 4-Step Chronological Audit Record */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {AUDIT_TRAIL.map((entry, idx) => {
                  const isLast = idx === AUDIT_TRAIL.length - 1;

                  return (
                    <div
                      key={entry.timestamp}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "130px 180px 1fr 90px",
                        alignItems: "baseline",
                        gap: 20,
                        padding: "18px 0",
                        borderBottom: isLast ? "none" : "1px solid var(--border)",
                      }}
                      className="audit-row-grid"
                    >
                      {/* Timestamp */}
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 12,
                          color: "var(--ink)",
                          fontWeight: 600,
                        }}
                      >
                        {entry.timestamp}
                      </span>

                      {/* Step & Actor */}
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-body), Inter, sans-serif",
                            fontSize: 14,
                            fontWeight: 600,
                            color: "var(--ink)",
                            lineHeight: 1.3,
                          }}
                        >
                          {entry.step}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontSize: 10.5,
                            color: "var(--muted)",
                          }}
                        >
                          {entry.actor}
                        </div>
                      </div>

                      {/* Detail */}
                      <p
                        style={{
                          fontFamily: "var(--font-body), Inter, sans-serif",
                          fontSize: 13.5,
                          color: "var(--muted)",
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {entry.detail}
                      </p>

                      {/* Signature Hash */}
                      <span
                        style={{
                          textAlign: "right",
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          color: "var(--muted)",
                        }}
                      >
                        {entry.hash}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Archival Guarantee Bar */}
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 18,
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
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 12.5,
                    color: "var(--muted)",
                  }}
                >
                  Preserves operational context between shifts and satisfies SOC 2 Type II / DORA Article 11 recovery verification.
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10.5,
                    color: "var(--ink)",
                    background: "var(--surface)",
                    padding: "3px 8px",
                    borderRadius: 3,
                    border: "1px solid var(--border)",
                  }}
                >
                  CHAIN-OF-CUSTODY COMPLIANT
                </span>
              </div>
            </div>
          </div>
        </SpringReveal>
      </div>
    </section>
  );
}
