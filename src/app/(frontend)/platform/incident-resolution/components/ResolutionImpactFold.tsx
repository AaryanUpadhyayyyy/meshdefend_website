"use client";

import { SpringReveal } from "@/components/motion/SpringReveal";

export function ResolutionImpactFold() {
  return (
    <section
      id="resolution-impact"
      style={{
        padding: "120px 0",
        background: "var(--surface)",
        color: "var(--ink)",
        borderTop: "1px solid var(--border)",
      }}
      aria-labelledby="resolution-impact-heading"
    >
      <div className="container">
        <SpringReveal>
          {/* Section Header */}
          <div style={{ maxWidth: 840, marginBottom: 56 }}>
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "var(--orange)",
                textTransform: "uppercase",
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              [ RESOLUTION METRICS · MEASURED OPERATIONAL IMPACT ]
            </div>

            <h2
              id="resolution-impact-heading"
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(38px, 4.4vw, 62px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                fontWeight: 400,
                margin: "0 0 18px 0",
              }}
            >
              From hours of hunting to minutes of action.
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                fontSize: "clamp(16px, 1.8vw, 18.5px)",
                color: "var(--muted)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Incident resolution delivers measurable results where outages cost the most—in the first golden hour of an outage. See how automated correlation and governed execution eliminate escalation bounce.
            </p>
          </div>

          {/* ─── 7/5 ASYMMETRIC BENTO GRID ─── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "7fr 5fr",
              gap: 32,
              marginBottom: 32,
            }}
            className="impact-bento-grid"
          >
            {/* Left 7 Cols: Massive Hero MTTR Reduction Metric */}
            <div
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                padding: "48px 44px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 12px 32px rgba(34, 31, 34, 0.04)",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    marginBottom: 20,
                    fontWeight: 600,
                  }}
                >
                  MEAN TIME TO RESOLUTION (MTTR) · ENTERPRISE RECOVERY INCIDENTS
                </div>

                {/* Massive Tabular Numerals */}
                <div
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: "clamp(48px, 5.8vw, 84px)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                    marginBottom: 24,
                    display: "flex",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    gap: 16,
                  }}
                >
                  <span style={{ color: "var(--muted)", textDecoration: "line-through", opacity: 0.65 }}>
                    47 min
                  </span>
                  <span style={{ color: "var(--orange)", fontStyle: "italic", fontSize: "0.85em" }}>
                    →
                  </span>
                  <span style={{ color: "var(--ink)", fontWeight: 400 }}>
                    12 min
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "var(--ink)",
                    fontWeight: 500,
                    maxWidth: "52ch",
                    margin: "0 0 32px 0",
                  }}
                >
                  Average time to resolve an incident across heterogeneous enterprise environments.
                </p>
              </div>

              {/* Sub-breakdown Lifecycle Rail */}
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: 20,
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 12,
                }}
                className="impact-rail-grid"
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 10, color: "var(--muted)", marginBottom: 4 }}>
                    DETECTION
                  </div>
                  <div style={{ fontFamily: "var(--font-body), Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                    &lt; 15s
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 10, color: "var(--muted)", marginBottom: 4 }}>
                    CORRELATION
                  </div>
                  <div style={{ fontFamily: "var(--font-body), Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                    14s
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 10, color: "var(--muted)", marginBottom: 4 }}>
                    DIAGNOSIS
                  </div>
                  <div style={{ fontFamily: "var(--font-body), Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                    22s
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 10, color: "var(--orange)", marginBottom: 4, fontWeight: 600 }}>
                    DECISION GATE
                  </div>
                  <div style={{ fontFamily: "var(--font-body), Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "var(--orange)" }}>
                    &lt; 60s
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Stacked Evidence Blocks */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {/* Evidence Block 1 */}
              <div
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  padding: "32px 28px",
                  boxShadow: "0 12px 32px rgba(34, 31, 34, 0.04)",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        color: "var(--muted)",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                      }}
                    >
                      TRIAGE EFFICIENCY
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        color: "var(--ink)",
                        fontWeight: 600,
                      }}
                    >
                      100% Context Retained
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 28,
                      lineHeight: 1.15,
                      color: "var(--ink)",
                      fontWeight: 400,
                      margin: "0 0 10px 0",
                    }}
                  >
                    Zero escalation bounce
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    Preserve complete technical evidence across L1, L2, and L3 shift handoffs. Stop ping-ponging tickets between storage and backup teams while trying to recreate failure conditions.
                  </p>
                </div>
              </div>

              {/* Evidence Block 2 */}
              <div
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  padding: "32px 28px",
                  boxShadow: "0 12px 32px rgba(34, 31, 34, 0.04)",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        color: "var(--muted)",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                      }}
                    >
                      EXECUTION LATENCY
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        color: "var(--orange)",
                        fontWeight: 600,
                      }}
                    >
                      Sub-Minute Remediation
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 28,
                      lineHeight: 1.15,
                      color: "var(--ink)",
                      fontWeight: 400,
                      margin: "0 0 10px 0",
                    }}
                  >
                    &lt; 60s Approval-to-Action
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    Remediate instantly via API once authorized. MeshDefend dispatches vendor-native commands directly to storage controllers and backup management planes with automated verification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Bottom Testimonial Strip ─── */}
          <div
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 4,
              padding: "28px 36px",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(20px, 2.2vw, 26px)",
                lineHeight: 1.35,
                color: "var(--ink)",
                fontStyle: "italic",
                margin: 0,
                maxWidth: "68ch",
              }}
            >
              &ldquo;We no longer spend the first 40 minutes of an outage just trying to agree on what broke. The evidence is assembled before the bridge call even starts.&rdquo;
            </p>

            <span
              style={{
                fontFamily: "var(--font-body), Inter, sans-serif",
                fontSize: 12.5,
                color: "var(--muted)",
                whiteSpace: "nowrap",
                fontWeight: 500,
              }}
            >
              — Enterprise Infrastructure Lead (sample)
            </span>
          </div>
        </SpringReveal>
      </div>
    </section>
  );
}
