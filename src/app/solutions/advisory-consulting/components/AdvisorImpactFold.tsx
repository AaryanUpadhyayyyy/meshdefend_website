"use client";

import { motion } from "framer-motion";

export function AdvisorImpactFold() {
  const metrics = [
    {
      tag: "METRIC 01 // EFFICIENCY",
      num: "6 Wks → 10 Days",
      label: "Assessment Turnaround Acceleration",
      desc: "Automated catalog parsing and dependency synthesis cuts manual evidence collection by 75%, delivering board-ready roadmaps while client urgency is highest.",
    },
    {
      tag: "METRIC 02 // EXPANSION",
      num: "3.4x",
      label: "Follow-On Engagement Multiplier",
      desc: "Advisory partners generate 3.4x more revenue per audit by converting gap findings into billable engineering phases and ongoing posture retainers.",
    },
    {
      tag: "METRIC 03 // CAPACITY",
      num: "4x",
      label: "Quarterly Assessment Throughput",
      desc: "Senior advisory partners scale their practice to four times the concurrent client load without expanding junior analyst spreadsheet headcount.",
    },
  ];

  return (
    <section
      id="advisor-impact"
      aria-label="Prove the Advisory Impact"
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
        {/* Eyebrow & Meta */}
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
              color: "var(--orange, #f45532)",
              letterSpacing: "0.06em",
            }}
          >
            [ PROVE THE ADVISORY IMPACT ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "rgba(255, 255, 255, 0.4)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 4 — ADVISORY PRACTICE BENCHMARKS
          </span>
        </div>

        {/* Display H2 (White, Instrument Serif) */}
        <div style={{ maxWidth: 940, marginBottom: 54 }}>
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
            More client engagements. More value from every assessment.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 17.5,
              lineHeight: 1.55,
              color: "rgba(255, 255, 255, 0.72)",
              margin: 0,
              maxWidth: 780,
            }}
          >
            Advisory firms need evidence measured against how their own business creates value—not generic IT
            uptime metrics. See how partners convert discovery into scalable practice growth.
          </p>
        </div>

        {/* The Advisor Metric Bento (Exposed 1px Hairline Grid) */}
        <div
          style={{
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backgroundColor: "#181618",
          }}
        >
          {/* Top 3-Metric Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              gap: 1,
            }}
          >
            {metrics.map((m, idx) => (
              <motion.div
                key={m.tag}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
                style={{
                  padding: "36px 30px",
                  backgroundColor: "#181618",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily:
                        'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      color: "var(--orange, #f45532)",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      marginBottom: 16,
                    }}
                  >
                    {m.tag}
                  </div>

                  <div
                    style={{
                      fontFamily:
                        'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: "clamp(36px, 3.8vw, 50px)",
                      lineHeight: 1.0,
                      color: "#fefdfd",
                      marginBottom: 10,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {m.num}
                  </div>

                  <div
                    style={{
                      fontFamily:
                        'var(--font-body), Inter, sans-serif',
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#fefdfd",
                      marginBottom: 12,
                    }}
                  >
                    {m.label}
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "rgba(255, 255, 255, 0.65)",
                      margin: 0,
                    }}
                  >
                    {m.desc}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: 24,
                    paddingTop: 12,
                    borderTop: "1px dashed rgba(255, 255, 255, 0.12)",
                    fontFamily:
                      'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  AUDIT BENCHMARK: VERIFIED
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row: Partner Case Narrative */}
          <div
            style={{
              padding: "40px 36px",
              backgroundColor: "#1c1a1c",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 10.5,
                color: "var(--orange, #f45532)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                marginBottom: 12,
              }}
            >
              PARTNER ENGAGEMENT CASE // FINANCIAL SERVICES ADVISORY PRACTICE
            </div>

            <div
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(24px, 2.6vw, 36px)",
                color: "#fefdfd",
                lineHeight: 1.2,
                fontStyle: "italic",
                marginBottom: 18,
              }}
            >
              &ldquo;Before MeshDefend, our cyber resilience audits ended with a static 40-page PDF and a debrief call.
              Most findings languished. Now, our assessment findings feed directly into MeshDefend’s live DAG, and 85% of our clients
              immediately sign a 12-month follow-on advisory retainer to supervise the remediation.&rdquo;
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                paddingTop: 16,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "#fefdfd",
                  fontWeight: 600,
                }}
              >
                — Principal & Lead Partner, Cyber Risk & Operational Resilience Practice
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  color: "rgba(255, 255, 255, 0.45)",
                }}
              >
                TIER-1 GLOBAL MANAGEMENT CONSULTING FIRM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
