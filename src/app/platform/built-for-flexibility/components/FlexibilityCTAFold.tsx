"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function FlexibilityCTAFold() {
  const assurances = [
    {
      label: "NO VENDOR LOCK-IN",
      desc: "Retain your existing contracts with Commvault, Veeam, NetApp, and Pure Storage.",
    },
    {
      label: "MODEL AGNOSTIC",
      desc: "Switch between private Azure OpenAI, Anthropic Claude, or local air-gapped models in seconds.",
    },
    {
      label: "ZERO DISRUPTION",
      desc: "Read-only catalog sync ensures 100% continuous operation of your production backup jobs.",
    },
  ];

  return (
    <section
      id="flexibility-cta"
      aria-label="Validate Your Technology Stack"
      style={{
        padding: "140px 0 120px",
        backgroundColor: "var(--dark, #221f22)",
        color: "#fefdfd",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Eyebrow & Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 32,
            borderBottom: "1px solid rgba(254, 253, 253, 0.12)",
            paddingBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "rgba(254, 253, 253, 0.6)",
            }}
          >
            COMMITMENT MATCHING · INTEROPERABILITY VALIDATION
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "rgba(254, 253, 253, 0.4)",
            }}
          >
            FIG. 6 — DIRECT ECOSYSTEM SCOPING
          </span>
        </div>

        {/* Display H2 Heading & Text */}
        <div style={{ maxWidth: 940, marginBottom: 54 }}>
          <h2
            style={{
              fontFamily:
                'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(40px, 4.6vw, 68px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "#fefdfd",
              fontWeight: 400,
              marginBottom: 22,
            }}
          >
            Bring your stack. We’ll show you how MeshDefend fits.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 18,
              lineHeight: 1.55,
              color: "rgba(254, 253, 253, 0.72)",
              maxWidth: 780,
              margin: 0,
            }}
          >
            Someone evaluating interoperability wants to validate their own stack, not just see a generic demo.
            Bring your AI models, backup software, storage arrays, and ITSM platforms to see how MeshDefend fits.
          </p>
        </div>

        {/* Action Buttons: General CTA & Scoped CTAs */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 72,
          }}
        >
          {/* General CTA: Book a demo (/demo) */}
          <Link
            href="/demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: "var(--orange, #f45532)",
              color: "#ffffff",
              padding: "16px 28px",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              border: "1px solid var(--orange, #f45532)",
              transition: "opacity 0.2s ease",
            }}
          >
            <span>Book a demo</span>
            <span>→</span>
          </Link>

          {/* Scoped CTA: Review your stack (/contact?topic=stack-review) */}
          <Link
            href="/demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: "transparent",
              color: "#fefdfd",
              padding: "16px 28px",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              border: "1px solid rgba(254, 253, 253, 0.3)",
              transition: "all 0.2s ease",
            }}
          >
            <span>Review your stack</span>
            <span>→</span>
          </Link>

          {/* Scoped CTA: Check compatibility (/platform/integrations) */}
          <Link
            href="/platform/integrations"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: "transparent",
              color: "#fefdfd",
              padding: "16px 28px",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              border: "1px solid rgba(254, 253, 253, 0.3)",
              transition: "all 0.2s ease",
            }}
          >
            <span>Check compatibility</span>
            <span>→</span>
          </Link>
        </div>

        {/* 3 Structural Assurance Cards */}
        <div
          style={{
            borderTop: "1px solid rgba(254, 253, 253, 0.12)",
            paddingTop: 48,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {assurances.map((as, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                style={{
                  border: "1px solid rgba(254, 253, 253, 0.1)",
                  padding: "24px 20px",
                  backgroundColor: "rgba(254, 253, 253, 0.02)",
                }}
              >
                <div
                  style={{
                    fontFamily:
                      'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--orange, #f45532)",
                    marginBottom: 10,
                    letterSpacing: "0.05em",
                  }}
                >
                  [ {as.label} ]
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: 13.5,
                    color: "rgba(254, 253, 253, 0.65)",
                    lineHeight: 1.5,
                  }}
                >
                  {as.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
