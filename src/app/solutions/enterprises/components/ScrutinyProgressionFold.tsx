"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ScrutinyProgressionFold() {
  const steps = [
    {
      num: "01",
      title: "Business Case",
      description: "Define cross-departmental value, engineer time-savings, and quantified risk reduction.",
      status: "RESOLVED IN FOLDS 1–4",
    },
    {
      num: "02",
      title: "Internal Alignment",
      description: "Achieve consensus between Security, Backup Engineering, and Legal/Compliance.",
      status: "CHAMPION ESTABLISHED",
    },
    {
      num: "03",
      title: "Enterprise Evaluation",
      description: "Submit architecture to Infosec, Procurement, and Network Security review boards.",
      status: "READY FOR SCRUTINY",
    },
    {
      num: "04",
      title: "Enterprise Readiness",
      description: "Falsifiable trust, sovereign isolation, Ed25519 cryptographic controls, and WORM audits.",
      status: "SURVIVES DEEP AUDIT",
    },
  ];

  return (
    <section
      id="scrutiny-progression"
      aria-label="From Business Case to Enterprise Scrutiny"
      style={{
        padding: "120px 0",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Header Block */}
        <div style={{ maxWidth: "860px", marginBottom: "56px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 10px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--ink)",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "var(--orange, #f45532)",
                display: "inline-block",
              }}
            />
            [ FOLD 05 · ENTERPRISE EVALUATION CONTINUITY ]
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(34px, 4.4vw, 54px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "20px",
              fontWeight: 400,
            }}
          >
            The business case gets you support. Enterprise readiness gets you through scrutiny.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: "16px",
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "760px",
            }}
          >
            Securing internal consensus is only the first step. Surviving architecture review,
            infosec vendor risk assessments, and compliance audits requires verifiable enterprise operating maturity.
          </p>
        </div>

        {/* 4-Step Progression Pipeline */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "48px",
          }}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((s, idx) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              style={{
                border: "1px solid var(--border)",
                backgroundColor: idx === 3 ? "rgba(244, 85, 50, 0.05)" : "var(--surface)",
                borderColor: idx === 3 ? "var(--orange, #f45532)" : "var(--border)",
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: "12px",
                      color: idx === 3 ? "var(--orange, #f45532)" : "var(--muted)",
                      fontWeight: 600,
                    }}
                  >
                    PHASE {s.num}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: "9px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "2px 6px",
                      backgroundColor: idx === 3 ? "var(--orange, #f45532)" : "var(--surface-raised)",
                      color: idx === 3 ? "#fefdfd" : "var(--muted)",
                      fontWeight: 600,
                    }}
                  >
                    {s.status}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: "22px",
                    color: "var(--ink)",
                    margin: "0 0 10px",
                    fontWeight: 400,
                  }}
                >
                  {s.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: "13px",
                    lineHeight: 1.5,
                    color: "var(--muted)",
                    margin: 0,
                  }}
                >
                  {s.description}
                </p>
              </div>

              {idx === 3 && (
                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "12px",
                    borderTop: "1px dashed rgba(244, 85, 50, 0.3)",
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: "10px",
                    color: "var(--orange, #f45532)",
                    fontWeight: 600,
                  }}
                >
                  CORE ARCHITECTURE VAULT →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Transition Link Banner */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--surface)",
            padding: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div style={{ maxWidth: "720px" }}>
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--orange, #f45532)",
                marginBottom: "6px",
              }}
            >
              TECHNICAL SCRUTINY DOSSIER
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "24px",
                color: "var(--ink)",
                marginBottom: "8px",
                fontWeight: 400,
              }}
            >
              Examine our security architecture, air-gap isolation, and compliance controls.
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body), Inter, sans-serif',
                fontSize: "14px",
                lineHeight: 1.5,
                color: "var(--muted)",
                margin: 0,
              }}
            >
              Discover how MeshDefend operates with zero root credentials, supports air-gapped sovereign VPC deployments,
              and maintains cryptographic immutable audit trails for strict enterprise governance.
            </p>
          </div>

          <Link
            href="/platform/enterprise-readiness"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 24px",
              backgroundColor: "var(--ink)",
              color: "var(--bg)",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              border: "1px solid var(--ink)",
              transition: "all 0.15s ease",
            }}
          >
            <span>Explore Enterprise Readiness</span>
            <span style={{ color: "var(--orange, #f45532)" }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
