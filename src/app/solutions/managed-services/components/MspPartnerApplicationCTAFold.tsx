"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function MspPartnerApplicationCTAFold() {
  const journeySteps = [
    {
      step: "01",
      title: "Apply Online",
      desc: "Share your current client count, backup tooling (Veeam, Commvault, Dell), and margin expansion goals.",
    },
    {
      step: "02",
      title: "Meet the Partner Team",
      desc: "Connect directly with a dedicated Partner Solutions Architect for an architectural review.",
    },
    {
      step: "03",
      title: "Explore the Fit & Economics",
      desc: "Model your specific fleet operating leverage, volume discount tiers, and gross margin roadmap.",
    },
    {
      step: "04",
      title: "Build & Scale Together",
      desc: "Launch your first 3 client enclaves with white-glove onboarding and continuous partner enablement.",
    },
  ];

  const guarantees = [
    {
      label: "VOLUME TIER PRICING",
      desc: "Aggregated fleet licensing that reduces per-tenant cost as your practice expands.",
    },
    {
      label: "WHITE-GLOVE ONBOARDING",
      desc: "Dedicated Partner Success Architect co-managing your first 3 client deployments.",
    },
    {
      label: "STRICT NON-DISINTERMEDIATION",
      desc: "Legally binding guarantee: MeshDefend never bypasses you to sell directly to your clients.",
    },
  ];

  return (
    <section
      id="msp-partner-cta"
      aria-label="Become a MeshDefend Partner"
      style={{
        padding: "130px 0 120px",
        backgroundColor: "var(--surface-raised, #f3f1f1)",
        borderTop: "1px solid var(--border)",
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
              letterSpacing: "0.08em",
              color: "var(--orange, #f45532)",
              fontWeight: 600,
            }}
          >
            [ COMMITMENT MATCHING + RECIPROCITY · MSP PARTNERSHIP ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            FIG. 6 — THE PARTNERSHIP INITIATION
          </span>
        </div>

        {/* Display H2 & Body */}
        <div style={{ maxWidth: 940, marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(38px, 4.8vw, 68px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 20,
            }}
          >
            The next generation of MSP starts with the 10× operator.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: 820,
              margin: 0,
            }}
          >
            Apply to become a partner. Explore the fit, meet the team, and let’s build a more profitable
            resilience practice together.
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
          <Link
            href="/contact?type=msp-partner"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: "var(--orange, #f45532)",
              color: "#ffffff",
              padding: "16px 32px",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              border: "1px solid var(--orange, #f45532)",
              transition: "opacity 0.2s ease",
            }}
          >
            <span>Apply to become a partner</span>
            <span>→</span>
          </Link>

          <Link
            href="/company/investors-partners"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "var(--bg, #fefdfd)",
              color: "var(--ink)",
              padding: "16px 28px",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.02em",
              textDecoration: "none",
              border: "1px solid var(--border)",
              transition: "border-color 0.2s ease",
            }}
          >
            <span>Explore the MSP program</span>
          </Link>
        </div>

        {/* Partner Journey Progression Stepper */}
        <div
          style={{
            backgroundColor: "var(--bg, #fefdfd)",
            border: "1px solid var(--border)",
            padding: "36px 32px",
            marginBottom: 48,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 10,
              letterSpacing: "0.08em",
              color: "var(--orange, #f45532)",
              fontWeight: 600,
              marginBottom: 24,
              borderBottom: "1px solid var(--border)",
              paddingBottom: 10,
            }}
          >
            WHAT HAPPENS AFTER YOU APPLY:
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 24,
            }}
          >
            {journeySteps.map((step, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 22,
                    fontWeight: 600,
                    color: "var(--orange, #f45532)",
                    marginBottom: 8,
                  }}
                >
                  {step.step}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 6,
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: 12,
                    lineHeight: 1.5,
                    color: "var(--muted)",
                  }}
                >
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Strict MSP Guarantees */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {guarantees.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: "20px 22px",
                backgroundColor: "var(--bg, #fefdfd)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 6,
                  letterSpacing: "0.04em",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: "var(--muted)",
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
