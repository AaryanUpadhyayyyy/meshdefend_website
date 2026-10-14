"use client";

import { AUDIENCE } from "@/lib/sections";
import { SpringReveal } from "@/components/motion/SpringReveal";
import { TechIndexTag } from "@/components/ui/TechIndexTag";

export function AudienceSection() {
  return (
    <section
      id="audience"
      style={{
        padding: "96px 0 112px",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        position: "relative",
      }}
    >
      <div className="container">
        <SpringReveal>
          {/* Section Monospace Technical Index Tag */}
          <div style={{ marginBottom: 16 }}>
            <TechIndexTag
              tag="[06 // DEPLOYMENT TARGETS & OPERATOR PERSONAS]"
              status="MULTI_TENANT_READY"
            />
          </div>

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
            {AUDIENCE.headline}
          </h2>

          {/* ─── Exposed 1px Grid Architecture (divide-x divide-y) ─── */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--bg)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              }}
              className="audience-grid"
            >
              {AUDIENCE.segments.map((seg, idx) => (
                <a
                  key={seg.title}
                  href={seg.href}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "36px 32px",
                    background: "var(--bg)",
                    borderRight: idx % 2 === 0 ? "1px solid var(--border)" : "none",
                    borderBottom: idx < 2 ? "1px solid var(--border)" : "none",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "background 0.2s ease",
                  }}
                  className="audience-cell"
                >
                  <div>
                    {/* HUD Coordinate / Tag Header */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 11,
                          color: "var(--orange)",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                        }}
                      >
                        TARGET 0{idx + 1}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9.5,
                          padding: "2px 6px",
                          borderRadius: 2,
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          color: "var(--muted)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {seg.badge}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: 26,
                        lineHeight: 1.15,
                        letterSpacing: "-0.03em",
                        fontWeight: 400,
                        color: "var(--ink)",
                        marginBottom: 12,
                      }}
                    >
                      {seg.title}
                    </h3>

                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--muted)",
                        lineHeight: 1.6,
                        margin: "0 0 20px",
                      }}
                    >
                      {seg.desc}
                    </p>

                    {/* Deliverables Checklist */}
                    {seg.deliverables && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                          paddingTop: 16,
                          borderTop: "1px solid var(--border)",
                        }}
                      >
                        {seg.deliverables.map((item) => (
                          <div
                            key={item}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              fontSize: 12.5,
                              color: "var(--ink)",
                              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            }}
                          >
                            <span style={{ color: "var(--orange)", fontWeight: 700 }}>+</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: 28,
                      fontSize: 12,
                      color: "var(--orange)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      letterSpacing: "0.04em",
                    }}
                  >
                    DEPLOYMENT SPECIFICATION →
                  </div>
                </a>
              ))}
            </div>
          </div>
        </SpringReveal>
      </div>

      <style jsx>{`
        .audience-cell:hover {
          background: var(--surface) !important;
        }
        @media (max-width: 800px) {
          .audience-grid {
            grid-template-columns: 1fr !important;
          }
          .audience-grid > a {
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
          }
          .audience-grid > a:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
