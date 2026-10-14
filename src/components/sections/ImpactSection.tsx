"use client";

import { IMPACT } from "@/lib/sections";
import { useReveal } from "@/lib/useReveal";
import { TextReveal } from "@/components/ui/TextReveal";

export function ImpactSection() {
  const sectionRef = useReveal<HTMLElement>({ y: 35 });

  return (
    <section
      ref={sectionRef}
      id="impact"
      style={{
        padding: "96px 0",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div className="container">
        <div className="reveal-on-scroll">
          <div className="eyebrow text-blur-in" style={{ marginBottom: 20 }}>
            <span className="eyebrow-dot" />
            {IMPACT.eyebrow}
          </div>

          <TextReveal
            as="h2"
            className="display"
            text={IMPACT.headline}
            stagger={0.035}
            style={{
              fontSize: "clamp(30px, 4vw, 50px)",
              maxWidth: "24ch",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          />
        </div>

        {/* Stat numbers */}
        {(() => {
          const isProd = process.env.NODE_ENV === "production";
          // Task 6: Keep '30-50% more infrastructure managed with the same team'. Mark 'Up to 80% lower MTTR' and 'Up to 60% less handoff effort' as [VERIFY] and hide them in production.
          const visibleStats = IMPACT.stats.filter(
            (s) => s.status === "verified" || !isProd
          );

          return (
            <div
              className="reveal-on-scroll reveal-stagger"
              style={{
                marginTop: 56,
                display: "grid",
                gridTemplateColumns: `repeat(${Math.max(1, visibleStats.length)}, minmax(260px, 1fr))`,
                gap: 20,
              }}
            >
              {visibleStats.map((s) => (
                <div
                  key={s.label}
                  className="card-hover"
                  style={{
                    padding: "32px 26px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    position: "relative",
                  }}
                >
                  {s.status === "verify" && (
                    <div
                      style={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        fontFamily: 'var(--font-mono), "IBM Plex Mono", monospace',
                        fontSize: 10,
                        letterSpacing: "0.08em",
                        padding: "2px 6px",
                        borderRadius: 3,
                        background: "rgba(253, 71, 3, 0.12)",
                        color: "var(--orange-ink, #b93608)",
                        fontWeight: 600,
                      }}
                    >
                      [VERIFY]
                    </div>
                  )}
                  <div
                    className="stat-glow"
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: "clamp(38px, 4.8vw, 58px)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.03em",
                      color: "var(--orange)",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 500,
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: 16.5, marginTop: 16, fontWeight: 600, color: "var(--ink)" }}>
                    {s.label}
                  </div>
                  <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 8, lineHeight: 1.55 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Qualitative items */}
        <div
          className="reveal-on-scroll reveal-stagger"
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {IMPACT.qualitative.map((q) => (
            <div
              key={q.title}
              className="card-hover"
              style={{
                padding: "26px 26px",
                background: "var(--surface-raised)",
                border: "1px solid var(--border)",
                borderRadius: 8,
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--orange)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: 22,
                    letterSpacing: "-0.01em",
                    fontWeight: 500,
                  }}
                >
                  {q.title}
                </span>
              </div>
              <p style={{ fontSize: 14.5, color: "var(--muted)", marginTop: 10, paddingLeft: 20, lineHeight: 1.55 }}>
                {q.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
