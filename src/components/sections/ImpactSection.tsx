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
        <div
          className="reveal-on-scroll reveal-stagger"
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {IMPACT.stats.map((s) => (
            <div
              key={s.label}
              className="card-hover"
              style={{
                padding: "32px 26px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
              }}
            >
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

        {/* Qualitative items */}
        <div
          className="reveal-on-scroll reveal-stagger"
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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

        {/* Customer Proof Quote & Methodology */}
        <div
          className="reveal-on-scroll reveal-delay-2"
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 36,
            alignItems: "center",
          }}
        >
          <blockquote
            style={{
              margin: 0,
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(18px, 2.2vw, 24px)",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              borderLeft: "2px solid var(--orange)",
              paddingLeft: 20,
            }}
          >
            “I stopped starting the day by logging into four things.”
            <cite
              style={{
                display: "block",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                fontStyle: "normal",
                color: "var(--muted)",
                marginTop: 12,
                letterSpacing: "0.02em",
              }}
            >
              — Backup Operations Lead · Financial Services · 3,400 Protected Assets
            </cite>
          </blockquote>

          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11.5,
              color: "var(--muted)",
              lineHeight: 1.7,
              background: "var(--surface)",
              padding: "18px 20px",
              borderRadius: 6,
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>
              VALIDATED MEASUREMENT METHODOLOGY:
            </div>
            Measured across seven enterprise customer environments (890–4,100 protected assets each) over 90 days post-deployment. MTTR excludes vendor ticket escalations.
          </div>
        </div>
      </div>
    </section>
  );
}
