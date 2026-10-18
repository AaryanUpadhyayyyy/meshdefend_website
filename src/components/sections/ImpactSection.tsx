"use client";

import { IMPACT } from "@/lib/sections";
import { Reveal, RevealGroup } from "@/components/motion";
import { NumberCounter } from "@/components/motion/NumberCounter";

export function ImpactSection() {
  const { eyebrow, headline, openingLine, stats, costOptimization, resiliencePosture } = IMPACT;

  return (
    <section
      id="impact"
      style={{
        padding: "96px 0 112px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* ─── SECTION HEADER with 0.08s stepped reveals ─── */}
        <div style={{ maxWidth: 880, marginBottom: 48 }}>
          {/* Eyebrow */}
          <Reveal delay={0}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--orange)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {eyebrow}
              </span>
            </div>
          </Reveal>

          {/* H2 Headline */}
          <Reveal delay={0.08}>
            <h2
              className="display"
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(38px, 4.6vw, 64px)",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                margin: "0 0 16px 0",
                color: "var(--ink)",
                fontWeight: 400,
              }}
            >
              {headline}
            </h2>
          </Reveal>

          {/* Opening Line */}
          <Reveal delay={0.16}>
            <p
              style={{
                fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                fontSize: "clamp(16px, 1.8vw, 19px)",
                color: "var(--muted)",
                lineHeight: 1.6,
                maxWidth: "68ch",
                margin: 0,
              }}
            >
              {openingLine}
            </p>
          </Reveal>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            TIER 1: 3 VERIFIED HEADLINE METRICS (staggered 0.1s)
           ═══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            border: "1px solid var(--border)",
            background: "var(--bg)",
            marginBottom: 32,
          }}
        >
          <RevealGroup
            staggerDelay={0.1}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
            className="impact-stats-grid"
          >
              {stats.map((stat, idx) => {
                const metricTags = ["SCALE", "RESOLUTION", "CONTINUITY"];
                const isLast = idx === stats.length - 1;

                return (
                  <div
                    key={stat.label}
                    style={{
                      padding: "36px 32px",
                      background: "var(--bg)",
                      borderRight: isLast ? "none" : "1px solid var(--border)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                    className="impact-cell"
                  >
                    <div>
                      {/* Metric Tag Header */}
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 11,
                          color: "var(--muted)",
                          letterSpacing: "0.08em",
                          marginBottom: 20,
                        }}
                      >
                        TELEMETRY // {metricTags[idx]}
                      </div>

                      {/* Monumental Figure with NumberCounter */}
                      <div
                        style={{
                          fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                          fontSize: "clamp(46px, 5vw, 68px)",
                          lineHeight: 0.95,
                          letterSpacing: "-0.03em",
                          color: "var(--orange)",
                          fontVariantNumeric: "tabular-nums",
                          fontWeight: 400,
                          marginBottom: 16,
                        }}
                      >
                        <NumberCounter value={stat.value} />
                      </div>

                      {/* Metric Label */}
                      <h3
                        style={{
                          fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                          fontSize: 17,
                          fontWeight: 600,
                          color: "var(--ink)",
                          letterSpacing: "-0.015em",
                          marginBottom: 10,
                          lineHeight: 1.35,
                        }}
                      >
                        {stat.label}
                      </h3>

                      {/* Verbatim Description */}
                      <p
                        style={{
                          fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                          fontSize: 14.5,
                          color: "var(--muted)",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </RevealGroup>

            {/* Explanatory Footnote for Claims */}
            {IMPACT.footnote && (
              <div
                style={{
                  padding: "14px 24px",
                  borderTop: "1px solid var(--border)",
                  background: "var(--surface)",
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                }}
              >
                {IMPACT.footnote}
              </div>
            )}
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              TIER 2: TWO-COLUMN QUALITATIVE SPLIT (SPEND VS. POSTURE)
             ═══════════════════════════════════════════════════════════════ */}
          <Reveal variant="fade-up" delay={0.1}>
            <div
              style={{
                border: "1px solid var(--border)",
                background: "var(--surface)",
              }}
            >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "5fr 7fr",
              }}
              className="impact-split-grid"
            >
              {/* Left Column: Cost & Spend Optimization */}
              <div
                style={{
                  padding: "36px 32px",
                  borderRight: "1px solid var(--border)",
                  background: "var(--surface)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
                className="impact-left-col"
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10.5,
                    letterSpacing: "0.1em",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: 14,
                  }}
                >
                  FINANCIAL ROI
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: "clamp(26px, 2.6vw, 34px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                    margin: "0 0 24px 0",
                    fontWeight: 400,
                  }}
                >
                  {costOptimization.title}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {costOptimization.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "16px 18px",
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        borderRadius: 4,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--orange)",
                          marginTop: 8,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                            fontSize: 15,
                            color: "var(--ink)",
                            lineHeight: 1.45,
                            fontWeight: 600,
                            marginBottom: 4,
                          }}
                        >
                          {pt.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                            fontSize: 13.5,
                            color: "var(--muted)",
                            lineHeight: 1.5,
                          }}
                        >
                          {pt.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Stronger Resilience Posture */}
              <div
                style={{
                  padding: "36px 32px",
                  background: "var(--bg)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10.5,
                    letterSpacing: "0.1em",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: 14,
                  }}
                >
                  OPERATIONAL RESILIENCE
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: "clamp(26px, 2.6vw, 34px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                    margin: "0 0 20px 0",
                    fontWeight: 400,
                  }}
                >
                  {resiliencePosture.title}
                </h3>

                <div
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  {resiliencePosture.points.map((pt, pIdx) => {
                    const isLastPt = pIdx === resiliencePosture.points.length - 1;

                    return (
                      <div
                        key={pIdx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          padding: "16px 20px",
                          borderBottom: isLastPt ? "none" : "1px solid var(--border)",
                          background: "var(--bg)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontSize: 12,
                            color: "var(--orange)",
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                            fontSize: 15,
                            color: "var(--ink)",
                            lineHeight: 1.5,
                          }}
                        >
                          {pt}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            </div>
          </Reveal>

          {/* ═══════════════════════════════════════════════════════════════
              TIER 3: ENTERPRISE PROOF, PILOT RESULT & COMPLIANCE BADGES
             ═══════════════════════════════════════════════════════════════ */}
          <Reveal variant="fade-up" delay={0.16}>
            <div
              style={{
                marginTop: 32,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 0.8fr",
                }}
                className="impact-proof-grid"
              >
                {/* Design-Partner Testimonial Quote */}
                <div
                  style={{
                    padding: "36px 32px",
                    borderRight: "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  className="impact-proof-col"
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        letterSpacing: "0.1em",
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        marginBottom: 16,
                      }}
                    >
                      ENTERPRISE DESIGN PARTNER
                    </div>
                    <blockquote
                      style={{
                        margin: "0 0 24px 0",
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: "clamp(22px, 2.2vw, 26px)",
                        lineHeight: 1.35,
                        color: "var(--ink)",
                        fontStyle: "italic",
                      }}
                    >
                      “MeshDefend gave us unified visibility across our Commvault, Veeam, and AWS estates within days. We went from wondering whether our disaster recovery cleanrooms would work to proving recovery daily.”
                    </blockquote>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: "rgba(244, 85, 50, 0.12)",
                        border: "1px solid var(--orange)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "var(--orange)",
                        flexShrink: 0,
                      }}
                    >
                      FS
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 }}>
                        Global Head of Infrastructure & Resilience
                      </div>
                      <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>
                        Fortune 500 Financial Services Institution · 18,000+ Endpoints
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pilot Benchmark & Compliance Badges */}
                <div
                  style={{
                    padding: "36px 32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 24,
                    background: "var(--bg)",
                  }}
                  className="impact-proof-col"
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        letterSpacing: "0.1em",
                        color: "var(--orange)",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        marginBottom: 10,
                      }}
                    >
                      PRODUCTION PILOT BENCHMARK
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--ink)",
                        lineHeight: 1.4,
                        marginBottom: 8,
                      }}
                    >
                      74% reduction in manual backup triage across 14,000+ daily protection jobs in 30 days.
                    </div>
                    <p style={{ fontSize: 13.5, color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
                      Zero unplanned downtime; automated pre-flight cleanroom validation across 3 clouds with verified RTO/RPO targets.
                    </p>
                  </div>

                  {/* Compliance Badges */}
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 10,
                        letterSpacing: "0.1em",
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        marginBottom: 10,
                        fontWeight: 600,
                      }}
                    >
                      VERIFIED ENTERPRISE COMPLIANCE
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {[
                        "SOC 2 TYPE II COMPLIANT",
                        "ISO 27001 ALIGNED",
                        "HIPAA & GDPR READY",
                        "AIR-GAPPED CLEANROOM READY",
                      ].map((badge) => (
                        <span
                          key={badge}
                          style={{
                            fontSize: 11,
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontWeight: 600,
                            padding: "4px 9px",
                            borderRadius: 3,
                            background: "var(--surface)",
                            border: "1px solid var(--border)",
                            color: "var(--ink)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          ✓ {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }
