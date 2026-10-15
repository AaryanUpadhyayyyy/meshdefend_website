"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function EnterpriseReadinessCTA() {
  const criteria = [
    {
      step: "STAGE 01",
      title: "Data Boundary & Ingestion Audit",
      desc: "Deep-dive with our security team into read-only metadata ingestion, zero payload transmission, and ephemeral model enclaves.",
    },
    {
      step: "STAGE 02",
      title: "Cryptographic HITL Gate",
      desc: "Inspect non-repudiable Ed25519 signature verification, hardware token binds (FIDO2), and WORM audit ledger integrity.",
    },
    {
      step: "STAGE 03",
      title: "Proof of Fit & Topology Scoping",
      desc: "Validate recovery posture and dependency discovery against a staged environment with zero production impact.",
    },
  ];

  return (
    <section
      id="enterprise-cta"
      aria-label="Enterprise Requirements Evaluation"
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
            COMMITMENT MATCHING · TECHNICAL SCRUTINY
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "rgba(254, 253, 253, 0.4)",
            }}
          >
            EVALUATION STAGE // DIRECT ENGAGEMENT
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
            Put MeshDefend through your enterprise requirements.
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
            The next step should match your role, intent, and depth of evaluation. Bring your architecture
            diagrams, compliance checklists, and threat models. We welcome direct technical review with our
            principal systems engineers.
          </p>
        </div>

        {/* Action Buttons: Primary (#f45532) and Secondary (Outline) */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 72,
          }}
        >
          {/* Primary (#f45532): Review enterprise readiness */}
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
            <span>Review enterprise readiness</span>
            <span>→</span>
          </Link>

          {/* Secondary (Outline): Discuss your architecture */}
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
            <span>Discuss your architecture</span>
            <span>→</span>
          </Link>
        </div>

        {/* 3 Structural Assurance Evaluation Stages */}
        <div
          style={{
            borderTop: "1px solid rgba(254, 253, 253, 0.12)",
            paddingTop: 48,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "rgba(254, 253, 253, 0.45)",
              letterSpacing: "0.05em",
              marginBottom: 24,
            }}
          >
            STRUCTURED SCRUTINY PROCESS:
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {criteria.map((cr, idx) => (
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
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--orange, #f45532)",
                    marginBottom: 10,
                    letterSpacing: "0.05em",
                  }}
                >
                  {cr.step}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#fefdfd",
                    marginBottom: 8,
                  }}
                >
                  {cr.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: 13,
                    color: "rgba(254, 253, 253, 0.6)",
                    lineHeight: 1.5,
                  }}
                >
                  {cr.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
