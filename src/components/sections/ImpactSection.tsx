"use client";

import { IMPACT } from "@/lib/sections";
import { Reveal, RevealGroup } from "@/components/motion";
import { NumberCounter } from "@/components/motion/NumberCounter";

export function ImpactSection({
  content,
  showQualitativeSplit = true,
  isHomepage = false,
}: {
  content?: Partial<typeof IMPACT>;
  showQualitativeSplit?: boolean;
  isHomepage?: boolean;
} = {}) {
  const copy = {
    ...IMPACT,
    ...content,
    costOptimization: {
      ...IMPACT.costOptimization,
      ...content?.costOptimization,
    },
    resiliencePosture: {
      ...IMPACT.resiliencePosture,
      ...content?.resiliencePosture,
    },
  };
  const { eyebrow, headline, metricPrefix, stats, costOptimization, resiliencePosture } = copy;
  const costPoints = costOptimization.points;

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
          {eyebrow && <Reveal delay={0}>
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
          </Reveal>}

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
                      {metricPrefix} {stat.tag}
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
            TIER 2: TWO-COLUMN QUALITATIVE SPLIT
           ═══════════════════════════════════════════════════════════════ */}
        {showQualitativeSplit && (
        <Reveal variant="fade-up" delay={0.1}>
          <div
            style={{
              border: isHomepage ? "none" : "1px solid var(--border)",
              background: isHomepage ? "transparent" : "var(--surface)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isHomepage ? "1fr 1fr" : "5fr 7fr",
                gap: isHomepage ? "clamp(28px, 4vw, 56px)" : 0,
                alignItems: "start",
              }}
              className="impact-split-grid"
            >
              {/* Left Column: Cost Optimization */}
              <div
                style={{
                  padding: isHomepage ? "8px 0" : "36px 32px",
                  borderRight: isHomepage ? "none" : "1px solid var(--border)",
                  background: isHomepage ? "transparent" : "var(--surface)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
                className="impact-left-col"
              >
                {!isHomepage && <div
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
                  {costOptimization.label}
                </div>}

                {!isHomepage && <h3
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
                </h3>}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: isHomepage ? 0 : 14,
                  }}
                >
                  {costPoints.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: isHomepage ? 16 : 12,
                        padding: isHomepage ? "24px 0" : "16px 18px",
                        background: isHomepage ? "transparent" : "var(--bg)",
                        border: isHomepage ? "none" : "1px solid var(--border)",
                        borderBottom:
                          isHomepage && pIdx < costPoints.length - 1
                            ? "1px solid var(--border)"
                            : undefined,
                        borderRadius: isHomepage ? 0 : 4,
                      }}
                    >
                      {isHomepage ? (
                        <span
                          aria-hidden="true"
                          style={{
                            display: "grid",
                            width: 34,
                            height: 34,
                            placeItems: "center",
                            flexShrink: 0,
                            border: "1px solid color-mix(in srgb, var(--orange) 28%, var(--border))",
                            borderRadius: "50%",
                            background: "color-mix(in srgb, var(--orange) 8%, var(--bg))",
                            color: "var(--orange)",
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {String(pIdx + 1).padStart(2, "0")}
                        </span>
                      ) : (
                        <span
                          aria-hidden="true"
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "var(--orange)",
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <div
                        style={{
                          fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                          fontSize: isHomepage ? 16 : 15,
                          color: "var(--ink)",
                          lineHeight: 1.45,
                          fontWeight: 500,
                        }}
                      >
                        <div>{pt.title}</div>
                        {pt.desc && (
                          <div style={{ marginTop: 4, color: "var(--muted)", fontSize: 13 }}>
                            {pt.desc}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Stronger Resilience Posture */}
              <div
                style={{
                  padding: isHomepage ? "8px 0" : "36px 32px",
                  background: "var(--bg)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                {!isHomepage && <div
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
                  {resiliencePosture.label}
                </div>}

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
                    borderRadius: 10,
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
                          padding: "18px 20px",
                          borderBottom: isLastPt ? "none" : "1px solid var(--border)",
                          background: "var(--bg)",
                        }}
                      >
                        <span
                          style={{
                            display: "grid",
                            width: 24,
                            height: 24,
                            placeItems: "center",
                            flexShrink: 0,
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontSize: 13,
                            color: "var(--orange)",
                            fontWeight: 700,
                            lineHeight: 1,
                            borderRadius: "50%",
                            background: "color-mix(in srgb, var(--orange) 9%, var(--bg))",
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
        )}
      </div>
    </section>
  );
}
