"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function MspStoriesPreviewFold() {
  const stories = [
    {
      partner: "MSP Partner Alpha",
      badge: "MID-MARKET CLOUD MSP",
      headline: "Scaled from 12 to 45 enterprise clients with zero new hires.",
      challenge:
        "Engineers spent 4 hours every morning manually checking 4 disconnected backup portals (Veeam, Commvault, Azure). Margins were capped at 22%.",
      solution:
        "Unified all 45 clients under MeshDefend ResOC rollup. Automated non-destructive restore dry runs replaced the daily morning checklist.",
      metric: "+140%",
      metricLabel: "Operating Margin Growth",
      scope: "45 Clients · 1.2 PB Managed",
    },
    {
      partner: "MSP Partner Beta",
      badge: "HEALTHCARE & FINANCIAL MSP",
      headline: "Eliminated false-green recovery risk across 28 hospital environments.",
      challenge:
        "Client auditors demanded proof of actual recovery capability under HIPAA. Manual recovery testing for 28 hospitals was mathematically impossible.",
      solution:
        "Agent Mesh autonomously executed nightly DAG simulated failovers in isolated sandboxes, producing tamper-evident audit packets automatically.",
      metric: "82%",
      metricLabel: "Reduction in Morning Triage Time",
      scope: "28 Hospitals · Zero Audit Findings",
    },
    {
      partner: "MSP Partner Gamma",
      badge: "NATIONAL CYBER-FIRST MSP",
      headline: "Client onboarding dropped from 72 hours to 45 minutes.",
      challenge:
        "Deploying bespoke monitoring agents inside high-security client enclaves created security reviews that stalled onboarding by weeks.",
      solution:
        "Read-only metadata connectors ingested storage and catalog state without installing agents on production databases or hypervisors.",
      metric: "45 min",
      metricLabel: "Average Tenant Onboarding Time",
      scope: "64 Clients · Heterogeneous Fleet",
    },
  ];

  return (
    <section
      id="msp-stories-preview"
      aria-label="See How Other MSPs Scale"
      style={{
        padding: "110px 0 100px",
        backgroundColor: "var(--surface-raised, #f3f1f1)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
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
            [ SOURCE SIMILARITY · PEER OPERATING LEVERAGE ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            FIG. 5 — REAL-WORLD MSP DEPLOYMENTS
          </span>
        </div>

        {/* H2 Heading */}
        <div style={{ maxWidth: 940, marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(38px, 4.8vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 18,
            }}
          >
            “What does a 10× operator look like inside a real MSP?”
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: 820,
              margin: 0,
            }}
          >
            Discover how service providers operating with the same service model, technician constraints,
            and scaling pressures multiplied their gross margins and eliminated false-green recovery risk.
          </p>
        </div>

        {/* =================================================================== */}
        {/* 3 MINIMAL CASE-STUDY PREVIEW CARDS                                  */}
        {/* =================================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
            marginBottom: 44,
          }}
        >
          {stories.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "var(--bg, #fefdfd)",
                border: "1px solid var(--border)",
                padding: "32px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <div>
                {/* Card Top Meta */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    {item.partner}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 9,
                      padding: "2px 6px",
                      backgroundColor: "rgba(34,31,34,0.06)",
                      color: "var(--ink)",
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Outcome Headline */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 22,
                    lineHeight: 1.2,
                    color: "var(--ink)",
                    margin: "0 0 16px",
                    fontWeight: 400,
                  }}
                >
                  {item.headline}
                </h3>

                {/* Challenge & Solution */}
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--muted)",
                      marginBottom: 4,
                    }}
                  >
                    THE OPERATIONAL CHALLENGE:
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "var(--muted)",
                      margin: "0 0 14px",
                    }}
                  >
                    {item.challenge}
                  </p>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--orange, #f45532)",
                      marginBottom: 4,
                      fontWeight: 600,
                    }}
                  >
                    THE MESHDEFEND OUTCOME:
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "var(--ink)",
                      margin: 0,
                    }}
                  >
                    {item.solution}
                  </p>
                </div>
              </div>

              {/* Bottom Metric & Scope */}
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 24,
                      fontWeight: 600,
                      color: "var(--orange, #f45532)",
                    }}
                  >
                    {item.metric}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--muted)",
                    }}
                  >
                    {item.metricLabel}
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--muted)",
                  }}
                >
                  {item.scope}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Explicit Action Link */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/company/contact?type=msp-stories"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              backgroundColor: "var(--bg, #fefdfd)",
              color: "var(--ink)",
              border: "1px solid var(--border)",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              transition: "border-color 0.15s ease",
            }}
          >
            <span>Explore MSP stories</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
