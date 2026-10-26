"use client";

import { motion } from "framer-motion";

export function DualProofBenchmarkFold() {
  const boutiqueSequence = [
    {
      step: "01. REQUIREMENT",
      time: "T+00h",
      title: "Client-Specific ITSM & Backup Silo",
      desc: "Client CIO required real-time bi-directional sync between ServiceNow incident queue and on-prem Dell NetWorker backup catalogs.",
    },
    {
      step: "02. API & SCHEMA",
      time: "T+08h",
      title: "OpenAPI 3.1 & Webhook Ingest",
      desc: "Partner engineers imported MeshDefend OpenAPI schema; spun up deterministic mock cluster in partner sandbox with zero credential exposure.",
    },
    {
      step: "03. INTEGRATION",
      time: "T+28h",
      title: "Bidirectional Automation Script",
      desc: "Wrote lightweight Python adapter leveraging MeshDefend DAG execution engine to trigger automated non-destructive restore dry runs.",
    },
    {
      step: "04. TIME TAKEN",
      time: "T+48h",
      title: "Production Client Sign-Off",
      desc: "Delivered fully automated, audit-logged failover runbook to client operations team. Zero platform roadblocks encountered.",
    },
  ];

  const globalSequence = [
    {
      step: "01. STRATEGIC PILOT",
      phase: "Phase 1",
      title: "Initial Banking Deployment",
      desc: "Global SI delivered initial cyber resilience posture assessment for a European multinational retail bank facing strict DORA mandates.",
    },
    {
      step: "02. PRACTICE ENABLEMENT",
      phase: "Phase 2",
      title: "Architecture & Practice Enablement",
      desc: "Designed for enterprise infrastructure architects and certified cloud recovery practitioners across regional delivery centers.",
    },
    {
      step: "03. REGIONAL ENCLAVES",
      phase: "Phase 3",
      title: "Federated Sovereign Architecture",
      desc: "Deployed sovereign multi-tenant orchestration consoles across distinct cloud and on-premises regulatory enclaves.",
    },
    {
      step: "04. MEASURABLE SCALE",
      phase: "Phase 4",
      title: "Recurring Resilience Practice",
      desc: "Formalized as standard resilience offering across multi-tenant and sovereign client enclaves with sustained retainer revenues.",
    },
  ];

  return (
    <section
      id="dual-proof-benchmark"
      aria-label="Prove It at the Scale That Matters"
      style={{
        padding: "130px 0 120px",
        backgroundColor: "var(--dark, #221f22)",
        color: "#fefdfd",
        position: "relative",
        borderTop: "1px solid rgba(254, 253, 253, 0.12)",
        borderBottom: "1px solid rgba(254, 253, 253, 0.12)",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
            borderBottom: "1px solid rgba(254, 253, 253, 0.12)",
            paddingBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--orange, #f45532)",
              fontWeight: 600,
            }}
          >
            [ BENCHMARK VERIFICATION · FALSIFIABLE EVIDENCE ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "rgba(254, 253, 253, 0.6)",
            }}
          >
            FIG. 4 — DUAL PROOF ARCHITECTURE
          </span>
        </div>

        {/* H2 Heading */}
        <div style={{ maxWidth: 940, marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(38px, 4.8vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#fefdfd",
              fontWeight: 400,
              marginBottom: 18,
            }}
          >
            Prove it at the scale that matters.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 16,
              lineHeight: 1.6,
              color: "rgba(254, 253, 253, 0.75)",
              maxWidth: 820,
              margin: 0,
            }}
          >
            Each audience trusts evidence that reflects its own operational reality. A boutique builder
            needs proof of how quickly they can ship and deliver; a global alliance leader needs proof
            that the platform operates cleanly across multiple teams, clients, and sovereign regions.
          </p>
        </div>

        {/* =================================================================== */}
        {/* DUAL PROOF CARDS (DELIBERATELY DISTINCT CONTRAST)                  */}
        {/* =================================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 32,
          }}
        >
          {/* ─────────────────────────────────────────────────────────────
              LEFT CARD: BOUTIQUE PROOF (Build Speed & API Agility)
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              backgroundColor: "rgba(254, 253, 253, 0.03)",
              border: "1px solid rgba(254, 253, 253, 0.14)",
              padding: "36px 30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <div>
              {/* Card Meta & Benchmark Tag */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                  borderBottom: "1px solid rgba(254, 253, 253, 0.12)",
                  paddingBottom: 12,
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      color: "var(--orange, #f45532)",
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    BOUTIQUE BUILD BENCHMARK
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "rgba(254, 253, 253, 0.5)",
                    }}
                  >
                    (Illustrative benchmark)
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    padding: "3px 8px",
                    backgroundColor: "rgba(244, 85, 50, 0.15)",
                    color: "var(--orange, #f45532)",
                    border: "1px solid rgba(244, 85, 50, 0.3)",
                    fontWeight: 600,
                  }}
                >
                  SPEED TO DELIVER
                </span>
              </div>

              {/* Exact Hook Headline */}
              <h3
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "clamp(26px, 2.6vw, 34px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#fefdfd",
                  margin: "0 0 16px",
                  fontWeight: 400,
                }}
              >
                “From API to working integration in 48 hours.”
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: "rgba(254, 253, 253, 0.7)",
                  marginBottom: 24,
                }}
              >
                Scope: Custom bidirectional integration between ServiceNow CMDB, Dell NetWorker
                catalogs, and automated recovery orchestration for a regional banking engagement.
              </p>

              {/* Step Sequence: Requirement -> API -> Working Integration -> Time Taken */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {boutiqueSequence.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "12px 14px",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(254, 253, 253, 0.08)",
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
                          color: "var(--orange, #f45532)",
                          fontWeight: 600,
                        }}
                      >
                        {item.step}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          color: "rgba(254, 253, 253, 0.4)",
                        }}
                      >
                        {item.time}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#fefdfd",
                        marginBottom: 2,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 11,
                        color: "rgba(254, 253, 253, 0.65)",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Metric Strip */}
            <div
              style={{
                borderTop: "1px solid rgba(254, 253, 253, 0.12)",
                paddingTop: 18,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                textAlign: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 22,
                    fontWeight: 600,
                    color: "var(--orange, #f45532)",
                  }}
                >
                  48h
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9,
                    color: "rgba(254, 253, 253, 0.5)",
                    marginTop: 2,
                  }}
                >
                  START TO SHIP
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#fefdfd",
                  }}
                >
                  100%
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9,
                    color: "rgba(254, 253, 253, 0.5)",
                    marginTop: 2,
                  }}
                >
                  OPEN SCHEMA
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#a5d6a7",
                  }}
                >
                  0
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9,
                    color: "rgba(254, 253, 253, 0.5)",
                    marginTop: 2,
                  }}
                >
                  BLOCKED TICKETS
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT CARD: GLOBAL PROOF (Practice Multi-Region Scale)
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              backgroundColor: "rgba(254, 253, 253, 0.03)",
              border: "1px solid rgba(254, 253, 253, 0.14)",
              padding: "36px 30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <div>
              {/* Card Meta & Benchmark Tag */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                  borderBottom: "1px solid rgba(254, 253, 253, 0.12)",
                  paddingBottom: 12,
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      color: "var(--orange, #f45532)",
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    GLOBAL ALLIANCE BENCHMARK
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "rgba(254, 253, 253, 0.5)",
                    }}
                  >
                    (Illustrative benchmark)
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    padding: "3px 8px",
                    backgroundColor: "rgba(244, 85, 50, 0.15)",
                    color: "var(--orange, #f45532)",
                    border: "1px solid rgba(244, 85, 50, 0.3)",
                    fontWeight: 600,
                  }}
                >
                  PRACTICE SCALE
                </span>
              </div>

              {/* Exact Hook Headline */}
              <h3
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "clamp(26px, 2.6vw, 34px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#fefdfd",
                  margin: "0 0 16px",
                  fontWeight: 400,
                }}
              >
                “From one integration to a practice spanning 12 global regions.”
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: "rgba(254, 253, 253, 0.7)",
                  marginBottom: 24,
                }}
              >
                Scope: Tier-1 Global Systems Integrator launching sovereign cyber resilience
                service lines across North America, Europe, and Asia-Pacific enterprise clients.
              </p>

              {/* Step Sequence: Pilot -> Enablement -> Regional Enclaves -> Practice Scale */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {globalSequence.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "12px 14px",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(254, 253, 253, 0.08)",
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
                          color: "var(--orange, #f45532)",
                          fontWeight: 600,
                        }}
                      >
                        {item.step}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          color: "rgba(254, 253, 253, 0.4)",
                        }}
                      >
                        {item.phase}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#fefdfd",
                        marginBottom: 2,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 11,
                        color: "rgba(254, 253, 253, 0.65)",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Metric Strip */}
            <div
              style={{
                borderTop: "1px solid rgba(254, 253, 253, 0.12)",
                paddingTop: 18,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                textAlign: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 22,
                    fontWeight: 600,
                    color: "var(--orange, #f45532)",
                  }}
                >
                  12
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9,
                    color: "rgba(254, 253, 253, 0.5)",
                    marginTop: 2,
                  }}
                >
                  GLOBAL REGIONS
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#fefdfd",
                    paddingTop: 4,
                  }}
                >
                  ALIGNED
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9,
                    color: "rgba(254, 253, 253, 0.5)",
                    marginTop: 2,
                  }}
                >
                  MCRA ARCHITECTURE
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#a5d6a7",
                    paddingTop: 4,
                  }}
                >
                  SOVEREIGN
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9,
                    color: "rgba(254, 253, 253, 0.5)",
                    marginTop: 2,
                  }}
                >
                  MULTI-TENANT ENCLAVES
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Disclaimer */}
        <div
          style={{
            marginTop: 36,
            textAlign: "center",
            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
            fontSize: 11,
            color: "rgba(254, 253, 253, 0.4)",
            letterSpacing: "0.04em",
          }}
        >
          NOTE: METRICS REPRESENT ANONYMIZED ILLUSTRATIVE PARTNER PRACTICE BENCHMARKS. ACTUAL CLIENT ENGAGEMENT TIMELINES AND DEPLOYMENT METRICS DEPEND ON INFRASTRUCTURE TOPOLOGY.
        </div>
      </div>
    </section>
  );
}
