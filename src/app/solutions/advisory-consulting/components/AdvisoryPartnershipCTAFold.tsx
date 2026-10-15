"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function AdvisoryPartnershipCTAFold() {
  const commitments = [
    {
      label: "NO CLIENT DISINTERMEDIATION",
      desc: "MeshDefend never bypasses the advisory firm to sell directly to your audited clients.",
    },
    {
      label: "WHITE-LABEL COMPATIBLE",
      desc: "Optionally brand posture scoreboards and executive compliance packs with your practice identity.",
    },
    {
      label: "DEDICATED ALLIANCE LEAD",
      desc: "Direct access to partner solutions engineers who assist with client proposals and proof-of-concepts.",
    },
  ];

  return (
    <section
      id="partnership-cta"
      aria-label="Build the Partnership"
      style={{
        padding: "130px 0 110px",
        backgroundColor: "var(--surface-raised, #f3f1f1)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        color: "var(--ink)",
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
            borderBottom: "1px solid var(--border)",
            paddingBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "var(--muted)",
              fontWeight: 600,
            }}
          >
            COMMITMENT MATCHING · STRATEGIC ALLIANCES
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            FIG. 6 — ADVISORY ALLIANCE ENGAGEMENT
          </span>
        </div>

        {/* Display H2 Heading & Text */}
        <div style={{ maxWidth: 940, marginBottom: 52 }}>
          <h2
            style={{
              fontFamily:
                'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(40px, 4.8vw, 68px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 22,
            }}
          >
            Your expertise starts the engagement. Let’s build what comes next together.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: 780,
              margin: 0,
            }}
          >
            An advisor who sees MeshDefend as a way to extend their engagements needs a partnership conversation,
            not a generic buyer demo. Discuss partner structures, referral margins, and how to co-deliver
            cyber resilience transformations.
          </p>
        </div>

        {/* Action Buttons: Primary (#f45532) and Secondary (Outline) */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 64,
          }}
        >
          {/* Primary: Talk to our partnership team (/contact) */}
          <Link
            href="/contact"
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
            <span>Talk to our partnership team</span>
            <span>→</span>
          </Link>

          {/* Secondary: Explore a partnership (/contact) */}
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: "transparent",
              color: "var(--ink)",
              padding: "16px 28px",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              border: "1px solid var(--ink)",
              transition: "all 0.2s ease",
            }}
          >
            <span>Explore a partnership</span>
            <span>→</span>
          </Link>
        </div>

        {/* 3 Partnership Guarantees */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 44,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {commitments.map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                style={{
                  border: "1px solid var(--border)",
                  padding: "24px 22px",
                  backgroundColor: "var(--bg, #fefdfd)",
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--orange, #f45532)",
                    marginBottom: 10,
                    letterSpacing: "0.05em",
                    fontWeight: 600,
                  }}
                >
                  [ {c.label} ]
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: 13.5,
                    color: "var(--muted)",
                    lineHeight: 1.5,
                  }}
                >
                  {c.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
