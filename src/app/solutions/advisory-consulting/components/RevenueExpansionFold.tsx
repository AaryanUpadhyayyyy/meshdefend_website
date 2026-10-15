"use client";

import { motion } from "framer-motion";

export function RevenueExpansionFold() {
  const steps = [
    {
      num: "01",
      title: "Initial Assessment",
      phaseType: "SPEED & REPEATABILITY",
      commercialModel: "Accelerated Fixed-Fee Engagement",
      lead: "Deliver findings faster with automated evidence gathering.",
      details: [
        "Automated catalog and storage telemetry extraction cuts discovery time from 6 weeks to 10 days.",
        "Delivers comprehensive Minimum Viable Company (MVC) dependency maps without manual spreadsheet assembly.",
        "Allows advisory partners to complete 3x more assessments per quarter with identical partner headcount.",
      ],
      expansionImpact: "3x Assessment Capacity",
    },
    {
      num: "02",
      title: "Solutioning & Implementation",
      phaseType: "FOLLOW-ON ENGAGEMENT EXPANSION",
      commercialModel: "Phase 2 Technical Remediation Engagement",
      lead: "Convert static reports into billable remediation engagements using MeshDefend.",
      details: [
        "Findings don’t sit in an unread PDF—they become actionable engineering playbooks.",
        "Advisory practice leads the implementation of dependency realignment and immutable lock configurations.",
        "High-margin advisory oversight for enterprise failover sequencing and policy governance.",
      ],
      expansionImpact: "3.4x Billable Revenue vs. Audit Only",
    },
    {
      num: "03",
      title: "Ongoing Managed Advisory",
      phaseType: "ANNUAL RECURRING RETAINER",
      commercialModel: "Quarterly Posture & Governance Retainer",
      lead: "Transition the client to a recurring retainer based on continuous posture monitoring.",
      details: [
        "Client retains the advisory firm to chair quarterly board-level cyber resilience reviews.",
        "Continuous ResOC telemetry verifies ongoing compliance with DORA, SEC, and NIS2 directives.",
        "Guarantees long-term customer lock-in without the overhead of operating a 24/7 SOC/NOC.",
      ],
      expansionImpact: "Recurring Annual Advisory Retainer",
    },
  ];

  return (
    <section
      id="revenue-expansion"
      aria-label="Make the Advisory Model More Valuable"
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
            [ COMMERCIAL MODEL · ECONOMIC EXPANSION ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 3 — THE REVENUE EXPANSION TRACK
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
            Don’t just deliver the assessment. Build what comes next.
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
            Economic uncertainty reduction: turning advisory findings into something that can be solutionized
            and operationalized through MeshDefend creates sustained commercial opportunity for your advisory practice.
          </p>
        </div>

        {/* Vertical 3-Step Timeline with Exposed Hairline Borders */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
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
                PRACTICE COMMERCIAL LIFECYCLE // 3-PHASE VALUE EXPANSION
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              FROM ONE-OFF AUDIT TO MULTI-YEAR ENGAGEMENT
            </span>
          </div>

          {/* 3 Sequential Timeline Nodes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              backgroundColor: "var(--border)",
              gap: 1,
            }}
          >
            {steps.map((st, idx) => (
              <motion.div
                key={st.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.15 }}
                style={{
                  backgroundColor: "var(--bg, #fefdfd)",
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {/* Step Num & Commercial Tag */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 16,
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 14,
                        fontWeight: 700,
                        color: "var(--orange, #f45532)",
                      }}
                    >
                      STEP {st.num}
                    </span>
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 9.5,
                        padding: "3px 8px",
                        backgroundColor: "var(--surface-raised, #f7f6f5)",
                        border: "1px solid var(--border)",
                        color: "var(--ink)",
                        fontWeight: 600,
                      }}
                    >
                      {st.phaseType}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily:
                        'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 30,
                      lineHeight: 1.15,
                      color: "var(--ink)",
                      fontWeight: 400,
                      marginBottom: 8,
                    }}
                  >
                    {st.title}
                  </h3>

                  {/* Commercial Model */}
                  <div
                    style={{
                      fontFamily:
                        'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--orange, #f45532)",
                      marginBottom: 12,
                    }}
                  >
                    {st.commercialModel}
                  </div>

                  {/* Lead */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: "var(--ink)",
                      fontWeight: 500,
                      marginBottom: 20,
                    }}
                  >
                    {st.lead}
                  </p>

                  {/* Details List */}
                  <div
                    style={{
                      borderTop: "1px solid var(--border)",
                      paddingTop: 16,
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {st.details.map((d, dIdx) => (
                      <div
                        key={dIdx}
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 8,
                          fontSize: 13,
                          fontFamily: 'var(--font-body), Inter, sans-serif',
                          color: "var(--muted)",
                          lineHeight: 1.45,
                        }}
                      >
                        <span style={{ color: "var(--orange, #f45532)", fontSize: 11 }}>▸</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expansion Metric Footer */}
                <div
                  style={{
                    marginTop: 28,
                    paddingTop: 14,
                    borderTop: "1px dashed var(--border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--muted)",
                    }}
                  >
                    COMMERCIAL IMPACT
                  </span>
                  <span
                    style={{
                      fontFamily:
                        'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--ink)",
                      fontWeight: 700,
                    }}
                  >
                    {st.expansionImpact}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
