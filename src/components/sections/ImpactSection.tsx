"use client";

import { IMPACT } from "@/lib/sections";
import { SpringReveal } from "@/components/motion/SpringReveal";
import { TechIndexTag } from "@/components/ui/TechIndexTag";
import { NumberCounter } from "@/components/motion/NumberCounter";

export function ImpactSection() {
  const isProd = process.env.NODE_ENV === "production";

  // Filter stats based on production/verification status
  const visibleStats = IMPACT.stats.filter(
    (s) => s.status === "verified" || !isProd
  );

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
        <SpringReveal>
          {/* Section Monospace Technical Index Tag */}
          <div style={{ marginBottom: 16 }}>
            <TechIndexTag
              tag="[05 // CONTINUOUS RECOVERY ASSURANCE]"
              status="AUDIT_VERIFIED"
            />
          </div>

          {/* Heading with tight tracking */}
          <h2
            className="display"
            style={{
              fontSize: "clamp(34px, 4.2vw, 56px)",
              maxWidth: "24ch",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: "0 0 48px",
              color: "var(--ink)",
            }}
          >
            {IMPACT.headline}
          </h2>

          {/* ─── Exposed 1px Grid Architecture: Quantitative Assurance ─── */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              marginBottom: -1, // collapse border with next row
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.max(1, visibleStats.length)}, minmax(0, 1fr))`,
              }}
              className="impact-stats-grid"
            >
              {visibleStats.map((s, idx) => (
                <div
                  key={s.label}
                  style={{
                    padding: "36px 32px",
                    background: "var(--bg)",
                    borderRight:
                      idx < visibleStats.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                    position: "relative",
                    transition: "background 0.2s ease",
                  }}
                  className="impact-cell"
                >
                  {/* Verification Status Flag */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      METRIC 0{idx + 1}
                    </span>
                    {s.status === "verify" ? (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9.5,
                          letterSpacing: "0.08em",
                          padding: "2px 6px",
                          borderRadius: 2,
                          background: "rgba(244, 85, 50, 0.12)",
                          color: "var(--orange)",
                          fontWeight: 700,
                        }}
                      >
                        [VERIFY]
                      </span>
                    ) : (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9.5,
                          letterSpacing: "0.08em",
                          padding: "2px 6px",
                          borderRadius: 2,
                          background: "rgba(34, 31, 34, 0.06)",
                          color: "var(--ink)",
                          fontWeight: 600,
                        }}
                      >
                        VERIFIED PROOF
                      </span>
                    )}
                  </div>

                  {/* Tabular Numerals with Scroll-Triggered Counter */}
                  <div
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: "clamp(46px, 5.2vw, 68px)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.03em",
                      color: "var(--orange)",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 400,
                      marginBottom: 16,
                    }}
                  >
                    <NumberCounter value={s.value} />
                  </div>

                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--ink)",
                      letterSpacing: "-0.015em",
                      marginBottom: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.label}
                  </div>

                  <p
                    style={{
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Exposed 1px Grid: Qualitative Governance Pillars ─── */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              }}
              className="impact-qual-grid"
            >
              {IMPACT.qualitative.map((q, idx) => (
                <div
                  key={q.title}
                  style={{
                    padding: "32px 32px",
                    background: "var(--surface)",
                    borderRight: idx === 0 ? "1px solid var(--border)" : "none",
                    transition: "background 0.2s ease",
                  }}
                  className="impact-cell"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 12,
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
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      ASSURANCE PILLAR 0{idx + 1}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 24,
                      letterSpacing: "-0.025em",
                      fontWeight: 500,
                      color: "var(--ink)",
                      marginBottom: 10,
                      lineHeight: 1.2,
                    }}
                  >
                    {q.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--muted)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {q.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SpringReveal>
      </div>

      <style jsx>{`
        .impact-cell:hover {
          background: var(--surface) !important;
        }
        @media (max-width: 840px) {
          .impact-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .impact-stats-grid > div {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
          .impact-qual-grid {
            grid-template-columns: 1fr !important;
          }
          .impact-qual-grid > div {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
        }
      `}</style>
    </section>
  );
}
