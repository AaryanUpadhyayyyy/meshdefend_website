"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SecurityMatrixFold() {
  const [activeRow, setActiveRow] = useState<number | null>(0);

  const rows = [
    {
      id: "SEC-01",
      title: "Zero-Trust Data Handling",
      description:
        "Telemetry is ingested read-only. No customer payload data or PII is ever transmitted to the MeshDefend control plane.",
      specs: [
        "Metadata-only ingestion: backup job logs, catalog indexes, and deduplication hashes.",
        "Zero customer database rows, files, or payload bytes leave customer perimeter.",
        "Air-gap appliance option operates fully disconnected with zero outbound internet egress.",
      ],
      complianceTag: "SOC 2 TYPE II PRIVACY & CONFIDENTIALITY // ISO 27001 ANNEX A.8.24",
    },
    {
      id: "SEC-02",
      title: "HITL Policy Enforcement",
      description:
        "No state-changing execution can bypass the cryptographic Human-in-the-Loop approval gate.",
      specs: [
        "State transitions require non-repudiable Ed25519 signatures from designated operators.",
        "M-of-N dual-control quorum enforcement for Tier-0 core banking and ERP recovery jobs.",
        "FIDO2 / WebAuthn hardware token confirmation integrated into execution pipelines.",
      ],
      complianceTag: "NIST SP 800-53 REV. 5 AC-2(4) // DORA ARTICLE 11 DUAL CONTROL",
    },
    {
      id: "SEC-03",
      title: "Isolated LLM Boundaries",
      description:
        "Agent Mesh reasoning uses ring-fenced, ephemeral model instances. No cross-tenant model training or data leakage.",
      specs: [
        "Inference memory is destroyed immediately upon consensus agreement; zero context caching.",
        "Dedicated VPC Nitro / Confidential Compute enclaves with hardware memory encryption.",
        "Bring-Your-Own-LLM (BYOLLM) support: route via private Azure OpenAI or local models.",
      ],
      complianceTag: "EU AI ACT TRANSPARENCY & TENANT ENCLAVE ATTESTATION",
    },
    {
      id: "SEC-04",
      title: "Compliance & Audit",
      description:
        "Continuous WORM-compliant audit logs generated for SOC 2, ISO 27001, and DORA verification.",
      specs: [
        "Append-only cryptographic hash chain seals every agent consensus vote and human approval.",
        "Write Once, Read Many (WORM) storage compliant with SEC Rule 17a-4 and FINRA 4511.",
        "Automated one-click evidence export bundles formatted for third-party regulatory examiners.",
      ],
      complianceTag: "DORA ARTICLE 16 / SOC 2 WORM COMPLIANT IMMUTABLE LEDGER",
    },
  ];

  const handleToggle = (index: number) => {
    setActiveRow(activeRow === index ? null : index);
  };

  return (
    <section
      id="vendor-risk"
      aria-label="Address Vendor Risk"
      style={{
        padding: "120px 0 130px",
        backgroundColor: "#221f22",
        color: "#fefdfd",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Header Eyebrow & Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 28,
            borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            paddingBottom: 14,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.6)",
              letterSpacing: "0.05em",
            }}
          >
            [ ADDRESS VENDOR RISK ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "rgba(255, 255, 255, 0.4)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 3 — THE SECURITY ARCHITECTURE MATRIX
          </span>
        </div>

        {/* Verbatim H2 & Hook */}
        <div style={{ maxWidth: 960, marginBottom: 54 }}>
          <h2
            style={{
              fontFamily:
                'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(38px, 4.4vw, 58px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#fefdfd",
              fontWeight: 400,
              marginBottom: 18,
            }}
          >
            Enterprise readiness is more than handling enterprise scale.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 18,
              lineHeight: 1.55,
              color: "rgba(255, 255, 255, 0.75)",
              margin: 0,
            }}
          >
            Is MeshDefend itself introducing another risk into the environment? See our structural countermeasures.
          </p>
        </div>

        {/* 4-Row Expandable Security Matrix Accordion */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            backgroundColor: "transparent",
          }}
        >
          {rows.map((row, idx) => {
            const isOpen = activeRow === idx;

            return (
              <div
                key={row.id}
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                  borderLeft: isOpen
                    ? "3px solid var(--orange, #f45532)"
                    : "3px solid transparent",
                  backgroundColor: isOpen
                    ? "rgba(255, 255, 255, 0.03)"
                    : "transparent",
                  transition: "border-left 0.2s ease, background-color 0.2s ease",
                }}
              >
                {/* Accordion Header Row */}
                <button
                  onClick={() => handleToggle(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    padding: "24px 28px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    color: "#fefdfd",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: isOpen
                          ? "var(--orange, #f45532)"
                          : "rgba(255, 255, 255, 0.4)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      [{row.id}]
                    </span>
                    <span
                      style={{
                        fontFamily:
                          'var(--font-body), Inter, sans-serif',
                        fontSize: 19,
                        fontWeight: 600,
                        color: "#fefdfd",
                      }}
                    >
                      {row.title}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        color: isOpen
                          ? "var(--orange, #f45532)"
                          : "rgba(255, 255, 255, 0.45)",
                        display: "none",
                      }}
                      className="md:inline"
                    >
                      {isOpen ? "[ ACTIVE COUNTERMEASURE ]" : "[ INSPECT ]"}
                    </span>
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 16,
                        color: isOpen
                          ? "var(--orange, #f45532)"
                          : "rgba(255, 255, 255, 0.5)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease, color 0.2s ease",
                      }}
                    >
                      +
                    </span>
                  </div>
                </button>

                {/* Accordion Expandable Content with Framer Motion Spring Physics */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { type: "spring", stiffness: 320, damping: 30 },
                          opacity: { duration: 0.25, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.25, ease: "easeInOut" },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          padding: "0 28px 32px 28px",
                        }}
                      >
                        {/* Verbatim Description Callout */}
                        <div
                          style={{
                            padding: "16px 20px",
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            borderLeft: "2px solid var(--orange, #f45532)",
                            marginBottom: 20,
                          }}
                        >
                          <div
                            style={{
                              fontFamily:
                                'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 10,
                              color: "rgba(255, 255, 255, 0.45)",
                              marginBottom: 4,
                            }}
                          >
                            DEFENSE SPECIFICATION // VERBATIM
                          </div>
                          <div
                            style={{
                              fontFamily:
                                'var(--font-body), Inter, sans-serif',
                              fontSize: 16,
                              fontWeight: 500,
                              color: "#fefdfd",
                              lineHeight: 1.5,
                            }}
                          >
                            {row.description}
                          </div>
                        </div>

                        {/* 3 Structural Specifications */}
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: 14,
                            marginBottom: 20,
                          }}
                        >
                          {row.specs.map((spec, sIdx) => (
                            <div
                              key={sIdx}
                              style={{
                                border:
                                  "1px solid rgba(255, 255, 255, 0.1)",
                                backgroundColor:
                                  "rgba(255, 255, 255, 0.02)",
                                padding: "16px 14px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "baseline",
                                  gap: 8,
                                  fontSize: 13,
                                  fontFamily:
                                    'var(--font-body), Inter, sans-serif',
                                  color: "rgba(255, 255, 255, 0.75)",
                                  lineHeight: 1.45,
                                }}
                              >
                                <span
                                  style={{
                                    color: "var(--orange, #f45532)",
                                    fontSize: 11,
                                  }}
                                >
                                  ■
                                </span>
                                <span>{spec}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Compliance & Audit Footer Tag */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 8,
                            paddingTop: 12,
                            borderTop: "1px dashed rgba(255, 255, 255, 0.12)",
                          }}
                        >
                          <span
                            style={{
                              fontFamily:
                                'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 10.5,
                              color: "rgba(255, 255, 255, 0.4)",
                            }}
                          >
                            VERIFIED AUDIT FRAMEWORK:
                          </span>
                          <span
                            style={{
                              fontFamily:
                                'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 10.5,
                              color: "var(--orange, #f45532)",
                              fontWeight: 600,
                            }}
                          >
                            [ {row.complianceTag} ]
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
