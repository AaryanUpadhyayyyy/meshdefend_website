"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function DeploymentPipelineFold() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: "01",
      stepName: "Requirements",
      title: "Scope & Sizing",
      timing: "DAY 0",
      desc: "Identify target backup media agents, storage arrays, and cloud accounts. Provision lightweight broker host (2 vCPU, 4GB RAM) or deploy pre-built OVF/OVA appliance.",
      checkpoints: ["Host sizing confirmed", "Read-only service accounts prepped", "Egress firewall rules opened (Port 443)"],
    },
    {
      num: "02",
      stepName: "Connect",
      title: "Read-Only API Handshake",
      timing: "< 60 MINS",
      desc: "Authenticate local broker with backup platforms (Commvault, Veeam, Dell, NetApp). All credentials stored locally in customer-managed KMS; zero private keys transmitted.",
      checkpoints: ["mTLS 1.3 certificate pinned", "Catalog API permissions verified", "Zero inbound port requirement validated"],
    },
    {
      num: "03",
      stepName: "Configure",
      title: "Telemetry Ingestion & Parsing",
      timing: "DAY 1",
      desc: "Broker parses job logs, deduplication hashes, and snapshot timestamps. Local filtering strips any payload data before metadata sync begins.",
      checkpoints: ["Zero-payload boundary confirmed", "Initial catalog indexing completed", "Asset inventory reconciled"],
    },
    {
      num: "04",
      stepName: "Validate",
      title: "Dependency Graph Synthesis",
      timing: "DAY 2",
      desc: "Agent Mesh deterministically reconstructs cross-system application dependencies. Flags recovery posture gaps, missing secondary storage targets, and RTO/RPO drifts.",
      checkpoints: ["MVC tiering mapped", "Unverified dependency gaps flagged", "Clean recovery-point baseline established"],
    },
    {
      num: "05",
      stepName: "Operational",
      title: "Continuous ResOC Active",
      timing: "ONGOING",
      desc: "Resilience Operations Center begins 24/7 continuous posture monitoring. Cryptographic WORM audit ledger actively records all posture determinations and HITL gates.",
      checkpoints: ["Continuous WORM ledger sealed", "Cryptographic HITL gates active", "Automated executive compliance reporting"],
    },
  ];

  return (
    <section
      ref={containerRef}
      id="deployment-pipeline"
      aria-label="From Architecture to Deployment"
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
            [ THE IMPLEMENTATION JOURNEY ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 5 — 5-STAGE SEQUENTIAL PIPELINE
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
            It fits your architecture. Now see what it takes to get running.
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
            A predictable, phased deployment progression from initial sizing through read-only API connection,
            automated dependency discovery, and live resilience operations.
          </p>
        </div>

        {/* Horizontal Deployment Pipeline: Wireline + 5 Sequential Nodes */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
            position: "relative",
          }}
        >
          {/* Top Console Bar */}
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
                DEPLOYMENT PROGRESSION // 5 SEQUENTIAL PHASES
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              TIME-TO-VALUE: 48 HOURS TO FULL MVC GRAPH
            </span>
          </div>

          {/* SVG Animated 1px Connecting Wireline */}
          <div style={{ position: "relative", height: 16, overflow: "visible" }}>
            <svg
              width="100%"
              height="16"
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              {/* Background 1px Hairline */}
              <line
                x1="5%"
                y1="8"
                x2="95%"
                y2="8"
                stroke="var(--border)"
                strokeWidth="1.5"
              />

              {/* Animated Orange Pulse traveling along wireline */}
              {isInView && (
                <motion.line
                  x1="5%"
                  y1="8"
                  x2="95%"
                  y2="8"
                  stroke="var(--orange, #f45532)"
                  strokeWidth="2"
                  strokeDasharray="60 400"
                  animate={{ strokeDashoffset: [-400, 460] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
                />
              )}
            </svg>
          </div>

          {/* 5 Sequential Nodes Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              backgroundColor: "var(--border)",
              gap: 1,
            }}
            className="hidden md:grid"
          >
            {steps.map((st, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={st.num}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    backgroundColor: isSelected
                      ? "var(--surface-raised, #faf9f8)"
                      : "var(--bg)",
                    borderTop: isSelected
                      ? "2px solid var(--orange, #f45532)"
                      : "2px solid transparent",
                    padding: "28px 20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div>
                    {/* Step Num & Timing */}
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
                          fontFamily:
                            'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 14,
                          fontWeight: 700,
                          color: isSelected
                            ? "var(--orange, #f45532)"
                            : "var(--muted)",
                        }}
                      >
                        {st.num}
                      </span>
                      <span
                        style={{
                          fontFamily:
                            'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9.5,
                          padding: "2px 6px",
                          backgroundColor: isSelected
                            ? "var(--ink)"
                            : "var(--surface-raised, #f7f6f5)",
                          color: isSelected ? "#fefdfd" : "var(--muted)",
                          border: "1px solid var(--border)",
                          fontWeight: 600,
                        }}
                      >
                        {st.timing}
                      </span>
                    </div>

                    {/* Step Name */}
                    <div
                      style={{
                        fontFamily:
                          'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        marginBottom: 6,
                      }}
                    >
                      {st.stepName}
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 15,
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginBottom: 12,
                        lineHeight: 1.3,
                      }}
                    >
                      {st.title}
                    </h3>

                    {/* Desc */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 12.5,
                        lineHeight: 1.5,
                        color: "var(--muted)",
                        margin: 0,
                      }}
                    >
                      {st.desc}
                    </p>
                  </div>

                  {/* Active Indicator Bar */}
                  <div
                    style={{
                      marginTop: 20,
                      paddingTop: 10,
                      borderTop: "1px dashed var(--border)",
                      fontFamily:
                        'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 9.5,
                      color: isSelected
                        ? "var(--orange, #f45532)"
                        : "var(--muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span>{isSelected ? "● ACTIVE PHASE" : "○ INSPECT"}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Fallback: Vertical Stack */}
          <div className="flex flex-col md:hidden divide-y divide-[var(--border)]">
            {steps.map((st, idx) => (
              <div key={st.num} style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--orange, #f45532)" }}>
                    {st.num} {st.stepName}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>
                    {st.timing}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>
                  {st.title}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--muted)", lineHeight: 1.45 }}>
                  {st.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Active Phase Deep Checklist Banner */}
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid var(--border)",
              backgroundColor: "var(--surface-raised, #faf9f8)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: "var(--ink)",
                }}
              >
                PHASE {steps[activeStep].num} DELIVERABLES:
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: 18,
                flexWrap: "wrap",
              }}
            >
              {steps[activeStep].checkpoints.map((cp, cIdx) => (
                <div
                  key={cIdx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--ink)",
                  }}
                >
                  <span style={{ color: "var(--orange, #f45532)" }}>✓</span>
                  <span>{cp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
