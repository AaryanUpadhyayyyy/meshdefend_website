"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function CrossStackTraceFold() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      stepNum: "01",
      vendor: "Veeam",
      category: "BACKUP EVENT",
      actionTitle: "Backup Execution & Log Ingestion",
      eventLog: "VBR_JOB_COMPLETED // ledger-core-vm // synthetic-full // 1.4TB processed",
      details: "Read-only parser extracts job completion headers, changed-block checksums, and execution timestamps from Veeam Backup & Replication.",
    },
    {
      stepNum: "02",
      vendor: "Dell DataDomain",
      category: "STORAGE CONTEXT",
      actionTitle: "Retention Lock & Immutability Audit",
      eventLog: "DD_MTREE_VERIFIED // mtree-finance-01 // RetentionLock: COMPLIANCE // 2027-10-15",
      details: "Dell DD OS REST API confirms the snapshot is cryptographically immutable and cannot be deleted or modified by compromised credentials.",
    },
    {
      stepNum: "03",
      vendor: "Anthropic",
      category: "AGENT INTELLIGENCE",
      actionTitle: "Multi-Agent Consensus & Anomaly Check",
      eventLog: "AGENT_CONSENSUS // claude-3-5-sonnet // IOC_MATCH: 0 // CLEAN_RECOVERY_POINT",
      details: "Private inference evaluates block entropy drift, cross-system dependency readiness, and validates that no dormant encryption payload exists.",
    },
    {
      stepNum: "04",
      vendor: "ServiceNow",
      category: "ITSM ACTION",
      actionTitle: "CMDB Relationship Sync & Audit Seal",
      eventLog: "SN_CHANGE_UPDATED // CHG0098412 // CI: ledger-core // Score: 98% // WORM_SEALED",
      details: "MeshDefend pushes verified recovery readiness score to ServiceNow CMDB and updates enterprise compliance audit trail.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="cross-stack-trace"
      aria-label="Prove It Across a Real Stack"
      style={{
        padding: "110px 0 120px",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 14,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              fontWeight: 600,
              color: "var(--orange, #f45532)",
              letterSpacing: "0.05em",
            }}
          >
            [ MULTI-VENDOR WORKFLOW TRACE ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 4 — END-TO-END OPERATIONAL CORRELATION
          </span>
        </div>

        {/* Verbatim H2 */}
        <div style={{ maxWidth: 940, marginBottom: 54 }}>
          <h2
            style={{
              fontFamily:
                'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(34px, 4vw, 50px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 16,
            }}
          >
            Different vendors. Different systems. One operation.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 17,
              lineHeight: 1.5,
              color: "var(--muted)",
              margin: 0,
              maxWidth: 780,
            }}
          >
            Interoperability becomes believable when you can watch multiple technologies work together in one
            continuous workflow: Veeam backup event → DataDomain storage lock → Anthropic intelligence → ServiceNow action.
          </p>
        </div>

        {/* The Cross-Stack Trace Board */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              padding: "14px 24px",
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--surface-raised, #f7f6f5)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 7,
                  backgroundColor: "var(--orange, #f45532)",
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "0.04em",
                }}
              >
                LIVE CROSS-SYSTEM CORRELATION TRACE // 4 NODES
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              ZERO DATA SILOING // FULL SYSTEM PROVENANCE
            </span>
          </div>

          {/* SVG Animated 1px Wireline with Traveling Pulse */}
          <div style={{ position: "relative", height: 16, overflow: "visible" }}>
            <svg
              width="100%"
              height="16"
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <line
                x1="8%"
                y1="8"
                x2="92%"
                y2="8"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
              {isInView && (
                <motion.line
                  x1="8%"
                  y1="8"
                  x2="92%"
                  y2="8"
                  stroke="var(--orange, #f45532)"
                  strokeWidth="2.5"
                  strokeDasharray="80 320"
                  animate={{ strokeDashoffset: [-320, 400] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
              )}
            </svg>
          </div>

          {/* 4 Nodes Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              backgroundColor: "var(--border)",
              gap: 1,
            }}
            className="hidden md:grid"
          >
            {steps.map((st, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={st.stepNum}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    backgroundColor: isSelected
                      ? "var(--surface-raised, #faf9f8)"
                      : "var(--bg)",
                    borderTop: isSelected
                      ? "2px solid var(--orange, #f45532)"
                      : "2px solid transparent",
                    padding: "32px 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div>
                    {/* Step Num & Category */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: 14,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 13,
                          fontWeight: 700,
                          color: isSelected ? "var(--orange, #f45532)" : "var(--muted)",
                        }}
                      >
                        STAGE {st.stepNum}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9.5,
                          padding: "2px 6px",
                          backgroundColor: isSelected ? "var(--ink)" : "var(--surface-raised, #f7f6f5)",
                          color: isSelected ? "#fefdfd" : "var(--muted)",
                          border: "1px solid var(--border)",
                          fontWeight: 600,
                        }}
                      >
                        {st.category}
                      </span>
                    </div>

                    {/* Vendor Name */}
                    <div
                      style={{
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: 26,
                        color: "var(--ink)",
                        lineHeight: 1.1,
                        marginBottom: 6,
                      }}
                    >
                      {st.vendor}
                    </div>

                    {/* Action Title */}
                    <div
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginBottom: 12,
                      }}
                    >
                      {st.actionTitle}
                    </div>

                    {/* Details */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 12.5,
                        lineHeight: 1.45,
                        color: "var(--muted)",
                        margin: "0 0 16px 0",
                      }}
                    >
                      {st.details}
                    </p>
                  </div>

                  {/* Monospace Event Log Snippet */}
                  <div
                    style={{
                      padding: "8px 10px",
                      backgroundColor: "rgba(34, 31, 34, 0.04)",
                      borderLeft: isSelected ? "2px solid var(--orange, #f45532)" : "2px solid var(--border)",
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 9.5,
                      color: isSelected ? "var(--ink)" : "var(--muted)",
                      wordBreak: "break-all",
                    }}
                  >
                    {st.eventLog}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Fallback */}
          <div className="flex flex-col md:hidden divide-y divide-[var(--border)]">
            {steps.map((st) => (
              <div key={st.stepNum} style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "var(--orange, #f45532)" }}>
                    STAGE {st.stepNum} · {st.vendor}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--muted)" }}>
                    {st.category}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>
                  {st.actionTitle}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--muted)", lineHeight: 1.45 }}>
                  {st.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
