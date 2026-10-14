"use client";

import { AUDIENCE } from "@/lib/sections";
import { useReveal } from "@/lib/useReveal";
import { TextReveal } from "@/components/ui/TextReveal";

export function AudienceSection() {
  const sectionRef = useReveal<HTMLElement>({ y: 35 });

  return (
    <section
      ref={sectionRef}
      id="audience"
      style={{
        padding: "96px 0",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface-raised)",
        position: "relative",
      }}
    >
      <div className="container">
        <div className="reveal-on-scroll">
          <div className="eyebrow text-blur-in" style={{ marginBottom: 20 }}>
            <span className="eyebrow-dot" />
            {AUDIENCE.eyebrow}
          </div>

          <TextReveal
            as="h2"
            className="display"
            text={AUDIENCE.headline}
            stagger={0.04}
            style={{
              fontSize: "clamp(30px, 4vw, 50px)",
              maxWidth: "22ch",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          />
        </div>

        {/* Audience cards grid */}
        <div
          className="reveal-on-scroll reveal-stagger"
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {AUDIENCE.segments.map((seg, idx) => (
            <a
              key={seg.title}
              href={seg.href}
              className="card-hover"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "32px 26px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                textDecoration: "none",
                color: "inherit",
                transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
              }}
            >
              <div>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--orange)", marginBottom: 12 }}>
                  SEGMENT 0{idx + 1}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: 24,
                    lineHeight: 1.2,
                    letterSpacing: "-0.012em",
                    fontWeight: 500,
                  }}
                >
                  {seg.title}
                </div>
                <p style={{ fontSize: 14.5, color: "var(--muted)", marginTop: 12, lineHeight: 1.6 }}>
                  {seg.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: 24,
                  fontSize: 13,
                  color: "var(--orange)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontWeight: 600,
                  fontFamily: "var(--font-mono), monospace",
                }}
              >
                Explore Solutions →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
