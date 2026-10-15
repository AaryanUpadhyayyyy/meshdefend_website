"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HandoffPair {
  id: string;
  inputTitle: string;
  inputCategory: string;
  inputDescription: string;
  outputTitle: string;
  outputType: string;
  outputDescription: string;
  outputArtifact: string;
}

const HANDOFF_PAIRS: HandoffPair[] = [
  {
    id: "01",
    inputTitle: "Assessment Findings & System Inventory",
    inputCategory: "ADVISORY INPUT // DISCOVERY",
    inputDescription: "Advisor catalogs client application tiers, backup jobs, off-site storage targets, and stated recovery SLAs.",
    outputTitle: "Live Dependency DAG & State Topology",
    outputType: "MESHDEFEND OUTPUT // VISUALIZATION",
    outputDescription: "Autonomous deterministic reconstruction of Minimum Viable Company (MVC) asset graph based on advisor's tiering baseline.",
    outputArtifact: "DAG_SYNTHESIS // MVC Tier-0 Banking Application Graph // 48 Nodes Correlated",
  },
  {
    id: "02",
    inputTitle: "Identified Gaps & Recovery Blind Spots",
    inputCategory: "ADVISORY INPUT // AUDIT EVIDENCE",
    inputDescription: "Advisor exposes unverified database replicas, missing secondary cache layers, and untested snapshot recovery scripts.",
    outputTitle: "Automated Gap Remediation Engine",
    outputType: "MESHDEFEND OUTPUT // SOLUTIONING",
    outputDescription: "Real-time posture drift alerting, simulated restore drills, and step-by-step technical runbooks to close each identified hole.",
    outputArtifact: "REMEDIATION_MATRIX // 14 Infrastructure Gaps Sequenced // Actionable Playbooks",
  },
  {
    id: "03",
    inputTitle: "Compliance & Regulatory Exposures",
    inputCategory: "ADVISORY INPUT // GOVERNANCE",
    inputDescription: "Advisor maps gaps against DORA Article 11, NIS2 operational resilience, SEC 17a-4, and APRA CPS 230 standards.",
    outputTitle: "Continuous WORM Audit & Board Reporting",
    outputType: "MESHDEFEND OUTPUT // OPERATIONALIZATION",
    outputDescription: "Immutable cryptographic ledger verifying daily recovery posture scores, with automated executive PDFs for board examiners.",
    outputArtifact: "COMPLIANCE_PROOF // DORA Article 11 Certified Audit Chain // WORM Sealed",
  },
  {
    id: "04",
    inputTitle: "Architecture Roadmap & Target State",
    inputCategory: "ADVISORY INPUT // STRATEGY",
    inputDescription: "Advisor delivers multi-year cyber resilience transformation architecture and target recovery posture thresholds.",
    outputTitle: "ResOC Daily Operational Platform",
    outputType: "MESHDEFEND OUTPUT // SUSTAINED RETENTION",
    outputDescription: "Turns static slide decks into a live resilience control plane where the advisor chairs quarterly posture governance reviews.",
    outputArtifact: "RESOC_CONSOLE // Client Recovery Posture: 94% // Advisory Retainer Active",
  },
];

export function HandoffArchitectureFold() {
  const [selectedPair, setSelectedPair] = useState<number>(0);
  const current = HANDOFF_PAIRS[selectedPair];

  return (
    <section
      id="handoff-architecture"
      aria-label="Put MeshDefend Inside the Engagement"
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
            [ PUT MESHDEFEND INSIDE THE ENGAGEMENT ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 2 — THE HANDOFF ARCHITECTURE
          </span>
        </div>

        {/* Verbatim H2 */}
        <div style={{ maxWidth: 960, marginBottom: 54 }}>
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
            You uncover what needs to change. MeshDefend helps turn it into what happens next.
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
            Concreteness reduces uncertainty. Showing exactly where MeshDefend fits into an advisory workflow
            demonstrates that the advisor&apos;s work is the indispensable foundation MeshDefend operationalizes.
          </p>
        </div>

        {/* Split Screen Layout: Left (Advisory Inputs) / Right (MeshDefend Outputs) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Left Column (5 Cols): Advisory Inputs */}
          <div
            style={{
              gridColumn: "span 5",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 10.5,
                fontWeight: 600,
                color: "var(--ink)",
                letterSpacing: "0.05em",
                marginBottom: 4,
                paddingLeft: 4,
              }}
            >
              1. ADVISORY INPUTS (YOUR EXPERTISE):
            </div>

            {HANDOFF_PAIRS.map((pair, idx) => {
              const isSelected = selectedPair === idx;
              return (
                <button
                  key={pair.id}
                  onClick={() => setSelectedPair(idx)}
                  style={{
                    backgroundColor: isSelected
                      ? "var(--surface-raised, #faf9f8)"
                      : "var(--bg)",
                    border: "1px solid var(--border)",
                    borderLeft: isSelected
                      ? "3px solid var(--orange, #f45532)"
                      : "3px solid transparent",
                    padding: "20px 18px",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: isSelected
                        ? "var(--orange, #f45532)"
                        : "var(--muted)",
                      letterSpacing: "0.04em",
                      marginBottom: 6,
                    }}
                  >
                    {pair.inputCategory}
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 6,
                    }}
                  >
                    {pair.inputTitle}
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 12.5,
                      lineHeight: 1.45,
                      color: "var(--muted)",
                      margin: 0,
                    }}
                  >
                    {pair.inputDescription}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column (7 Cols): MeshDefend Outputs (Animated Box) */}
          <div
            style={{
              gridColumn: "span 7",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg)",
              position: "sticky",
              top: 100,
            }}
          >
            {/* Box Header Bar */}
            <div
              style={{
                padding: "14px 20px",
                borderBottom: "1px solid var(--border)",
                backgroundColor: "var(--surface-raised, #f7f6f5)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
                    fontFamily:
                      'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  2. MESHDEFEND OPERATIONALIZATION // OUTPUT
                </span>
              </div>
              <span
                style={{
                  fontFamily:
                    'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "var(--muted)",
                }}
              >
                LIVE HANDOFF CONDUIT
              </span>
            </div>

            {/* Dynamic Animated Output Stage */}
            <div style={{ padding: "32px 28px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Output Category & Badge */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        color: "var(--orange, #f45532)",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {current.outputType}
                    </span>
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        color: "var(--ink)",
                        fontWeight: 600,
                      }}
                    >
                      [ HANDOFF MATCHED ]
                    </span>
                  </div>

                  {/* Output Title */}
                  <h3
                    style={{
                      fontFamily:
                        'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 32,
                      lineHeight: 1.15,
                      color: "var(--ink)",
                      fontWeight: 400,
                      marginBottom: 12,
                    }}
                  >
                    {current.outputTitle}
                  </h3>

                  {/* Output Description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: "var(--muted)",
                      marginBottom: 24,
                    }}
                  >
                    {current.outputDescription}
                  </p>

                  {/* Visual Handoff Wire Diagram */}
                  <div
                    style={{
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--surface-raised, #faf9f8)",
                      padding: "20px 18px",
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          padding: "3px 8px",
                          backgroundColor: "var(--bg)",
                          border: "1px solid var(--border)",
                          color: "var(--ink)",
                        }}
                      >
                        INPUT: {current.inputTitle}
                      </span>
                      <span style={{ color: "var(--orange, #f45532)", fontSize: 13 }}>➔</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          padding: "3px 8px",
                          backgroundColor: "var(--ink)",
                          color: "var(--bg)",
                        }}
                      >
                        MESHDEFEND ENGINE
                      </span>
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        color: "var(--ink)",
                        backgroundColor: "var(--bg)",
                        padding: "10px 12px",
                        borderLeft: "2px solid var(--orange, #f45532)",
                      }}
                    >
                      ARTIFACT: {current.outputArtifact}
                    </div>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 13,
                      color: "var(--muted)",
                    }}
                  >
                    ✦ Result: The advisory firm stays in governance control, converting periodic project findings
                    into automated operational resilience without writing custom code.
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
