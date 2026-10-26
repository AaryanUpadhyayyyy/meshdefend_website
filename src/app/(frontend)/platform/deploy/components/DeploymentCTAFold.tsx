"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function DeploymentCTAFold() {
  const assurances = [
    {
      label: "NO DISRUPTIVE AGENTS",
      desc: "Zero kernel drivers or database hooks installed across primary workloads.",
    },
    {
      label: "NON-INTRUSIVE SCOPE",
      desc: "Starts with read-only catalog audits; zero automated state changes without signed authorization.",
    },
    {
      label: "EXPERT ENGAGEMENT",
      desc: "Direct architecture review with founding systems engineers who built enterprise backup appliances.",
    },
  ];

  return (
    <section
      id="deploy-cta"
      aria-label="Deployment Architecture Evaluation"
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
            DEPLOYMENT ARCHITECTURE &amp; SCOPING
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            FIG. 6 — DIRECT ARCHITECTURE ENGAGEMENT
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
            Bring your architecture. We’ll show you how MeshDefend fits.
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
            Someone who has evaluated deployment constraints needs an architectural conversation,
            not a scripted sales pitch. Walk through your network topology, backup catalogs, and isolation
            policies with our systems engineering team.
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
          {/* Primary: Discuss your deployment (/company/contact) */}
          <Link
            href="/company/contact?intent=arch-review"
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
            <span>Discuss your deployment</span>
            <span>→</span>
          </Link>

          {/* Secondary: Review your architecture (/demo) */}
          <Link
            href="/demo"
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
            <span>Review your architecture</span>
            <span>→</span>
          </Link>
        </div>

        {/* 3 Structural Assurance Cards */}
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
            {assurances.map((as, idx) => (
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
                  [ {as.label} ]
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: 13.5,
                    color: "var(--muted)",
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
