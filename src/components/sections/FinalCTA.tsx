"use client";

import { FINAL_CTA } from "@/lib/sections";
import { SpringReveal } from "@/components/motion/SpringReveal";
import { TechIndexTag } from "@/components/ui/TechIndexTag";
import { AnimatedLaserBeam } from "@/components/motion/AnimatedLaserBeam";

export function FinalCTA() {
  return (
    <section
      id="cta"
      style={{
        padding: "112px 0 120px",
        background: "#221f22",
        color: "#fefdfd",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(254, 253, 253, 0.1)",
      }}
    >
      <div className="container" style={{ textAlign: "center", maxWidth: 840, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SpringReveal>
          {/* Section Monospace Technical Index Tag */}
          <div style={{ marginBottom: 20 }}>
            <TechIndexTag
              tag="[07 // DEPLOY COMMAND // ZERO-IMPACT EVALUATION]"
              status="AUDIT_READY"
              dark={true}
            />
          </div>

          <h2
            className="display"
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(34px, 4.6vw, 58px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              textWrap: "balance",
              color: "#fefdfd",
              margin: "0 0 20px",
            }}
          >
            {FINAL_CTA.headline}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body), Inter, sans-serif",
              fontSize: "clamp(16px, 1.8vw, 18px)",
              color: "#a09a9c",
              lineHeight: 1.65,
              maxWidth: "60ch",
              margin: "0 auto 36px",
            }}
          >
            {FINAL_CTA.lede}
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 48,
            }}
          >
            <a
              href="/demo"
              className="btn btn-primary"
              style={{
                fontSize: 14,
                padding: "14px 28px",
                background: "#f45532",
                color: "#221f22",
                fontWeight: 600,
                borderRadius: 4,
              }}
            >
              {FINAL_CTA.ctaPrimary} →
            </a>
            <a
              href="/platform#observability"
              className="btn btn-secondary"
              style={{
                fontSize: 14,
                padding: "14px 28px",
                border: "1px solid rgba(254, 253, 253, 0.2)",
                color: "#fefdfd",
                borderRadius: 4,
              }}
            >
              {FINAL_CTA.ctaSecondary}
            </a>
          </div>

          <AnimatedLaserBeam variant="horizontal" style={{ marginBottom: 40 }} />

          {/* ─── Exposed 1px Grid Architecture: Technical Governance Strip ─── */}
          <div
            style={{
              border: "1px solid rgba(254, 253, 253, 0.1)",
              background: "#2a272a",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              }}
              className="cta-facts-grid"
            >
              <div
                style={{
                  padding: "18px 20px",
                  borderRight: "1px solid rgba(254, 253, 253, 0.1)",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11.5,
                  color: "#a09a9c",
                  textAlign: "center",
                }}
              >
                <span style={{ color: "#f45532", fontWeight: 700 }}>[EVALUATION]</span>
                <span style={{ display: "block", marginTop: 4, color: "#fefdfd" }}>
                  Live Estate or Guided Proof
                </span>
              </div>

              <div
                style={{
                  padding: "18px 20px",
                  borderRight: "1px solid rgba(254, 253, 253, 0.1)",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11.5,
                  color: "#a09a9c",
                  textAlign: "center",
                }}
              >
                <span style={{ color: "#f45532", fontWeight: 700 }}>[GOVERNANCE]</span>
                <span style={{ display: "block", marginTop: 4, color: "#fefdfd" }}>
                  Policy-Bound Human Sign-off
                </span>
              </div>

              <div
                style={{
                  padding: "18px 20px",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11.5,
                  color: "#a09a9c",
                  textAlign: "center",
                }}
              >
                <span style={{ color: "#f45532", fontWeight: 700 }}>[AUDIT]</span>
                <span style={{ display: "block", marginTop: 4, color: "#fefdfd" }}>
                  Cryptographic WORM Audit Log
                </span>
              </div>
            </div>
          </div>
        </SpringReveal>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .cta-facts-grid {
            grid-template-columns: 1fr !important;
          }
          .cta-facts-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(254, 253, 253, 0.1);
          }
          .cta-facts-grid > div:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
