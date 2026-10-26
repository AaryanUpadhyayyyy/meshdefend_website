"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function IntegrationsCTA() {
  const steps = [
    {
      num: "01",
      title: "Zero Disruptive Agents",
      desc: "Connect via read-only APIs and lightweight brokers with zero agent installs across production databases.",
    },
    {
      num: "02",
      title: "60-Minute Discovery",
      desc: "Autonomously reconstruct your dependency topology and backup catalogs within an hour of deployment.",
    },
    {
      num: "03",
      title: "Universal Telemetry Layer",
      desc: "Correlate signals across heterogeneous storage arrays and cloud targets through a unified resilience graph.",
    },
  ];

  return (
    <section
      id="integrations-cta"
      aria-label="Connect What You Already Run"
      style={{
        padding: "130px 0 110px",
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
            ECOSYSTEM CONNECTIVITY &amp; EVALUATION
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "rgba(254, 253, 253, 0.4)",
            }}
          >
            FIG. 4 — ZERO RIP-AND-REPLACE INTEGRATION
          </span>
        </div>

        {/* Display H2 Heading & Text */}
        <div style={{ maxWidth: 920, marginBottom: 52 }}>
          <h2
            style={{
              fontFamily:
                'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(42px, 4.8vw, 70px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "#fefdfd",
              fontWeight: 400,
              marginBottom: 20,
            }}
          >
            Connect what you already run.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 18,
              lineHeight: 1.55,
              color: "rgba(254, 253, 253, 0.72)",
              maxWidth: 760,
              margin: 0,
            }}
          >
            MeshDefend coordinates your existing backup tools, storage arrays, cloud infrastructure,
            and ITSM platforms without rip-and-replace. Bring your environment to a live evaluation.
          </p>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 64,
          }}
        >
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
            }}
          >
            <span>Book a demo</span>
            <span>→</span>
          </Link>

          <Link
            href="/platform/enterprise-readiness"
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
              border: "1px solid rgba(254, 253, 253, 0.25)",
            }}
          >
            <span>Review architecture & security</span>
            <span>→</span>
          </Link>
        </div>

        {/* 3 Structural Assurance Cards */}
        <div
          style={{
            borderTop: "1px solid rgba(254, 253, 253, 0.12)",
            paddingTop: 44,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {steps.map((st, idx) => (
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
                  ASSURANCE // {st.num}
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
                  {st.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: 13,
                    color: "rgba(254, 253, 253, 0.6)",
                    lineHeight: 1.5,
                  }}
                >
                  {st.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
