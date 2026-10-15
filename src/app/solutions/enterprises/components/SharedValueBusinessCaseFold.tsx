"use client";

import { motion } from "framer-motion";

export function SharedValueBusinessCaseFold() {
  const stakeholders = [
    {
      role: "Operations",
      arrow: "Efficiency",
      mandate: "Automate daily triage and scale without headcount expansion.",
      metrics: "4.5 hrs saved / day",
      metricLabel: "Per backup engineer on manual log parsing",
      outcomes: [
        "Automated root-cause analysis resolves 80% of daily backup exceptions without human ticketing.",
        "Engineers manage 30–50% more enterprise workloads with existing staff.",
        "Eliminates late-night panic over stalled overnight deduplication jobs.",
      ],
      procurementDefense: "Prevents hiring 2–3 additional L2 backup engineers as storage estates expand.",
    },
    {
      role: "Security",
      arrow: "Reduced Exposure",
      mandate: "Ensure backups are not dormant malware delivery mechanisms.",
      metrics: "0 Dormant IOCs",
      metricLabel: "Continuous snapshot threat validation",
      outcomes: [
        "Continuous non-destructive inspection of backup images before restoration is requested.",
        "Cryptographic Ed25519 human-in-the-loop controls protect immutable snapshots from malicious deletion.",
        "Guaranteed clean restore points eliminate post-recovery ransomware reinfection.",
      ],
      procurementDefense: "Closes the critical operational gap between EDR detection and disaster recovery.",
    },
    {
      role: "Compliance",
      arrow: "Evidence & Readiness",
      mandate: "Continuous regulatory auditability without engineering fire drills.",
      metrics: "100% Automated",
      metricLabel: "Attestation for DORA, SEC 17a-4, NIS2",
      outcomes: [
        "Cryptographic append-only WORM ledger tracks every operational state transition.",
        "Cuts quarterly compliance exam preparation time from 3 weeks to a 10-second export.",
        "Fulfills DORA Article 11 and SEC Rule 17a-4 disaster testing mandates automatically.",
      ],
      procurementDefense: "Protects against multimillion-dollar regulatory non-compliance penalties.",
    },
    {
      role: "Leadership",
      arrow: "Business Resilience",
      mandate: "Mathematical proof of survivability and lower insurance costs.",
      metrics: "80% Lower MTTR",
      metricLabel: "Defensible business interruption reduction",
      outcomes: [
        "Single executive posture index (0–100%) maps directly to Tier-0 revenue systems.",
        "Demonstrable recovery testing lowers annual cyber insurance renewal premiums.",
        "Board-ready RTO/RPO attestation backed by cryptographic proof, not hope.",
      ],
      procurementDefense: "Guarantees enterprise continuity and protects corporate valuation in a systemic crisis.",
    },
  ];

  return (
    <section
      id="shared-value-business-case"
      aria-label="Make the Internal Case"
      style={{
        padding: "120px 0",
        backgroundColor: "var(--dark, #221f22)",
        color: "#fefdfd",
        position: "relative",
        borderBottom: "1px solid rgba(254, 253, 253, 0.12)",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Header Block */}
        <div style={{ maxWidth: "900px", marginBottom: "64px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 10px",
              backgroundColor: "rgba(254, 253, 253, 0.08)",
              border: "1px solid rgba(254, 253, 253, 0.16)",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#fefdfd",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "var(--orange, #f45532)",
                display: "inline-block",
              }}
            />
            [ FOLD 03 · THE SHARED-VALUE BUSINESS CASE ]
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(34px, 4.4vw, 54px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#fefdfd",
              marginBottom: "20px",
              fontWeight: 400,
            }}
          >
            Security wants resilience. Operations wants efficiency. Leadership wants less risk. One investment can answer all three.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: "16px",
              lineHeight: 1.6,
              color: "rgba(254, 253, 253, 0.72)",
              maxWidth: "800px",
            }}
          >
            Stop competing for single-department budget. MeshDefend converges disparate departmental mandates
            into one defensible enterprise business case that secures immediate consensus across procurement,
            architecture, and executive leadership.
          </p>
        </div>

        {/* 4-Column Stakeholder Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            backgroundColor: "rgba(254, 253, 253, 0.12)",
            border: "1px solid rgba(254, 253, 253, 0.12)",
            marginBottom: "32px",
          }}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {stakeholders.map((s, idx) => (
            <motion.div
              key={s.role}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              style={{
                backgroundColor: "var(--dark, #221f22)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* Role & Lens Tag */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: "12px",
                    borderBottom: "1px solid rgba(254, 253, 253, 0.1)",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      color: "#fefdfd",
                    }}
                  >
                    {s.role}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      color: "var(--orange, #f45532)",
                      textTransform: "uppercase",
                    }}
                  >
                    → {s.arrow}
                  </span>
                </div>

                {/* Mandate */}
                <div
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: "13px",
                    lineHeight: 1.5,
                    color: "rgba(254, 253, 253, 0.65)",
                    marginBottom: "24px",
                    minHeight: "40px",
                  }}
                >
                  {s.mandate}
                </div>

                {/* Big Metric Display */}
                <div
                  style={{
                    border: "1px solid rgba(254, 253, 253, 0.1)",
                    backgroundColor: "rgba(254, 253, 253, 0.03)",
                    padding: "16px",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: "30px",
                      color: "#fefdfd",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}
                  >
                    {s.metrics}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: "10px",
                      color: "rgba(254, 253, 253, 0.5)",
                      lineHeight: 1.4,
                    }}
                  >
                    {s.metricLabel}
                  </div>
                </div>

                {/* Specific Deliverables */}
                <div style={{ marginBottom: "24px" }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: "10px",
                      color: "rgba(254, 253, 253, 0.45)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    DELIVERED CAPABILITIES
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {s.outcomes.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          fontFamily: 'var(--font-body), Inter, sans-serif',
                          fontSize: "12px",
                          lineHeight: 1.5,
                          color: "rgba(254, 253, 253, 0.8)",
                          marginBottom: "10px",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--orange, #f45532)",
                            fontWeight: 700,
                            lineHeight: 1,
                            marginTop: "2px",
                          }}
                        >
                          +
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Procurement Defense Pitch */}
              <div
                style={{
                  borderTop: "1px dashed rgba(254, 253, 253, 0.15)",
                  paddingTop: "14px",
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: "9px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(254, 253, 253, 0.4)",
                    marginBottom: "4px",
                  }}
                >
                  PROCUREMENT JUSTIFICATION
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: "11px",
                    lineHeight: 1.5,
                    color: "rgba(254, 253, 253, 0.9)",
                  }}
                >
                  "{s.procurementDefense}"
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Converged Enterprise Outcome Banner */}
        <div
          style={{
            border: "1px solid rgba(254, 253, 253, 0.16)",
            backgroundColor: "rgba(254, 253, 253, 0.04)",
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px", maxWidth: "800px" }}>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: "11px",
                padding: "4px 8px",
                backgroundColor: "var(--orange, #f45532)",
                color: "#fefdfd",
                fontWeight: 600,
              }}
            >
              CONVERGED ROI
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body), Inter, sans-serif',
                fontSize: "14px",
                lineHeight: 1.5,
                color: "rgba(254, 253, 253, 0.9)",
              }}
            >
              One investment that eliminates departmental blind spots, satisfies external audit scrutiny,
              and returns measurable hours back to high-value infrastructure teams.
            </span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: "11px",
              color: "rgba(254, 253, 253, 0.5)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>ESTIMATED ENTERPRISE PAYBACK:</span>
            <span style={{ color: "#fefdfd", fontWeight: 600 }}>&lt; 4.2 MONTHS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
