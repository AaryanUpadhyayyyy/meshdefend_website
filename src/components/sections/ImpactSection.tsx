"use client";

import { IMPACT } from "@/lib/sections";
import { Reveal, RevealGroup } from "@/components/motion";
import { NumberCounter } from "@/components/motion/NumberCounter";

export function ImpactSection() {
  const { eyebrow, headline, stats, costOptimization, resiliencePosture } = IMPACT;

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
        {/* ─── SECTION HEADER ─── */}
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
                margin: 0,
                color: "var(--ink)",
                fontWeight: 400,
              }}
            >
              {headline}
            </h2>
          </Reveal>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            TIER 1: 3 HEADLINE IMPACT CARDS (staggered 0.1s)
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
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            TIER 2: TWO-COLUMN QUALITATIVE SPLIT (FINANCIAL ROI & POSTURE)
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
              {/* Left Column: Financial ROI */}
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

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {costOptimization.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        display: "flex",
                        alignItems: "center",
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
                          flexShrink: 0,
                        }}
                      />
                      <div
                        style={{
                          fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                          fontSize: 15,
                          color: "var(--ink)",
                          lineHeight: 1.45,
                          fontWeight: 500,
                        }}
                      >
                        {pt.title}
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
                          alignItems: "flex-start",
                          gap: 14,
                          padding: "16px 20px",
                          borderBottom: isLastPt ? "none" : "1px solid var(--border)",
                          background: "var(--bg)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontSize: 13,
                            color: "var(--orange)",
                            fontWeight: 700,
                            lineHeight: 1.5,
                          }}
                        >
                          ✓
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                            fontSize: 14.5,
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
      </div>
    </section>
  );
}
