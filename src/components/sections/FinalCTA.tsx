"use client";

import { motion } from "framer-motion";
import { FINAL_CTA } from "@/lib/sections";
import { Reveal } from "@/components/motion";

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
      {/* ─── Subtle Geometric Grid Texture ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.12,
          zIndex: 0,
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="finalCtaGrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(254, 253, 253, 0.35)" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="1.5" fill="var(--orange)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#finalCtaGrid)" />
        </svg>
      </div>

      <div
        className="container"
        style={{
          textAlign: "center",
          maxWidth: 820,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Eyebrow */}
        <Reveal delay={0}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              padding: "4px 12px",
              borderRadius: 3,
              background: "rgba(254, 253, 253, 0.06)",
              border: "1px solid rgba(254, 253, 253, 0.1)",
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
                letterSpacing: "0.1em",
                color: "#d5d2d3",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {FINAL_CTA.eyebrow}
            </span>
          </div>
        </Reveal>

        {/* H2 Headline */}
        <Reveal delay={0.08}>
          <h2
            className="display"
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(36px, 4.8vw, 60px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              color: "#fefdfd",
              margin: "0 0 20px",
            }}
          >
            {FINAL_CTA.headline}
          </h2>
        </Reveal>

        {/* Exact Sitemap Lede */}
        <Reveal delay={0.16}>
          <p
            style={{
              fontFamily: "var(--font-body), Inter, sans-serif",
              fontSize: "clamp(16px, 1.8vw, 19px)",
              color: "#a09a9c",
              lineHeight: 1.65,
              maxWidth: "58ch",
              margin: "0 auto 40px",
            }}
          >
            {FINAL_CTA.lede}
          </p>
        </Reveal>

        {/* Action CTAs */}
        <Reveal delay={0.24}>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <motion.a
              href="/demo"
              className="btn btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                fontSize: 14,
                padding: "14px 28px",
                background: "#f45532",
                color: "#fefdfd",
                fontWeight: 600,
                borderRadius: 4,
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              {FINAL_CTA.ctaPrimary}
            </motion.a>

            <motion.a
              href="/platform/observability"
              className="btn btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                fontSize: 14,
                padding: "14px 28px",
                border: "1px solid rgba(254, 253, 253, 0.2)",
                color: "#fefdfd",
                borderRadius: 4,
                textDecoration: "none",
              }}
            >
              {FINAL_CTA.ctaSecondary}
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
