"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function EnterpriseExecutiveCTAFold() {
  const commitments = [
    {
      title: "Non-Destructive Evaluation",
      desc: "Read-only metadata ingestion. Zero agent installation required on production databases or hypervisors.",
    },
    {
      title: "Heterogeneous Compatibility",
      desc: "Connects across Commvault, Veeam, Dell Data Domain, NetApp, Cohesity, AWS, and Azure estates.",
    },
    {
      title: "Multi-Stakeholder Briefing",
      desc: "Tailored 30-minute architecture review addressing Security, Infrastructure, and Compliance priorities.",
    },
  ];

  return (
    <section
      id="enterprise-executive-cta"
      aria-label="Executive Briefing & Next Steps"
      style={{
        padding: "130px 0 140px",
        backgroundColor: "var(--dark, #221f22)",
        color: "#fefdfd",
        position: "relative",
        borderTop: "1px solid rgba(254, 253, 253, 0.12)",
      }}
    >
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "4px 10px",
            backgroundColor: "rgba(254, 253, 253, 0.08)",
            border: "1px solid rgba(254, 253, 253, 0.16)",
            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fefdfd",
            marginBottom: "24px",
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
          [ FOLD 06 · EXECUTIVE ALIGNMENT ]
        </div>

        {/* Verbatim Display H2 */}
        <h2
          style={{
            fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
            fontSize: "clamp(36px, 5vw, 62px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fefdfd",
            margin: "0 auto 24px",
            maxWidth: "840px",
            fontWeight: 400,
          }}
        >
          See what MeshDefend could look like across your enterprise.
        </h2>

        {/* Verbatim Lead Paragraph */}
        <p
          style={{
            fontFamily: 'var(--font-body), Inter, sans-serif',
            fontSize: "17px",
            lineHeight: 1.6,
            color: "rgba(254, 253, 253, 0.75)",
            maxWidth: "680px",
            margin: "0 auto 40px",
          }}
        >
          Schedule an executive briefing to map MeshDefend against your specific environment, teams, priorities,
          and resilience goals.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "64px",
          }}
        >
          <Link
            href="/demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 32px",
              backgroundColor: "var(--orange, #f45532)",
              color: "#fefdfd",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              border: "1px solid var(--orange, #f45532)",
              transition: "transform 0.15s ease",
            }}
          >
            <span>Book an executive demo</span>
            <span>→</span>
          </Link>

          <Link
            href="/platform/deploy"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "16px 28px",
              backgroundColor: "transparent",
              color: "#fefdfd",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.04em",
              textDecoration: "none",
              border: "1px solid rgba(254, 253, 253, 0.2)",
              transition: "all 0.15s ease",
            }}
          >
            <span>Review Deployment Architecture</span>
          </Link>
        </div>

        {/* 3 Strict Technical Guarantees */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            backgroundColor: "rgba(254, 253, 253, 0.12)",
            border: "1px solid rgba(254, 253, 253, 0.12)",
            textAlign: "left",
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {commitments.map((c) => (
            <div
              key={c.title}
              style={{
                backgroundColor: "var(--dark, #221f22)",
                padding: "24px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "#fefdfd",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ color: "var(--orange, #f45532)" }}>+</span>
                <span>{c.title}</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: "12px",
                  lineHeight: 1.5,
                  color: "rgba(254, 253, 253, 0.65)",
                }}
              >
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
