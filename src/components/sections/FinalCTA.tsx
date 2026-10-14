"use client";

import { FINAL_CTA } from "@/lib/sections";
import { useReveal } from "@/lib/useReveal";
import { TextReveal } from "@/components/ui/TextReveal";

export function FinalCTA() {
  const sectionRef = useReveal<HTMLElement>({ y: 30 });

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{
        padding: "110px 0 120px",
        background: "#0d0f12",
        color: "#fefdfd",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Subtle background radiant aura */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 400,
          background: "radial-gradient(circle, rgba(242, 86, 45, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="reveal-on-scroll">
          <div
            className="text-blur-in"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--orange)",
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            BE READY BEFORE YOU NEED TO BE
          </div>

          <TextReveal
            as="h2"
            text={FINAL_CTA.headline}
            stagger={0.035}
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(32px, 4.5vw, 54px)",
              lineHeight: 1.08,
              letterSpacing: "-0.024em",
              fontWeight: 400,
              textWrap: "balance",
            }}
          />

          <p
            className="text-blur-in"
            style={{
              fontSize: "clamp(16px, 1.8vw, 18px)",
              color: "#a09a9c",
              marginTop: 24,
              lineHeight: 1.65,
              maxWidth: "58ch",
              margin: "24px auto 0",
              transitionDelay: "0.22s",
            }}
          >
            {FINAL_CTA.lede}
          </p>

          <div
            className="reveal-on-scroll reveal-delay-1"
            style={{
              marginTop: 40,
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/demo"
              className="btn btn-primary"
              style={{
                fontSize: 15,
                padding: "15px 32px",
                boxShadow: "0 6px 24px rgba(242, 86, 45, 0.35)",
              }}
            >
              {FINAL_CTA.ctaPrimary} →
            </a>
            <a
              href="/demo"
              className="btn btn-secondary"
              style={{
                fontSize: 15,
                padding: "15px 30px",
                borderColor: "rgba(254, 253, 253, 0.25)",
                color: "#fefdfd",
              }}
            >
              {FINAL_CTA.ctaSecondary}
            </a>
          </div>

          {/* Facts strip */}
          <div
            className="reveal-on-scroll reveal-delay-2"
            style={{
              marginTop: 56,
              paddingTop: 32,
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              justifyContent: "center",
              gap: "36px 48px",
              flexWrap: "wrap",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11.5,
              color: "#a09a9c",
            }}
          >
            <div>
              <span style={{ color: "var(--orange)", fontWeight: 600 }}>EVALUATION:</span> Live Estate or Guided Proof
            </div>
            <div>
              <span style={{ color: "var(--orange)", fontWeight: 600 }}>GOVERNANCE:</span> Policy-governed autonomy: human in the loop and human on the loop
            </div>
            <div>
              <span style={{ color: "var(--orange)", fontWeight: 600 }}>AUDIT:</span> WORM Immutable Evidence Log
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
