"use client";

import Link from "next/link";

export function CyberResilienceCTA() {
  return (
    <section
      id="resilience-cta"
      aria-label="Assess Your Recovery Readiness"
      style={{
        padding: "140px 0 120px",
        backgroundColor: "var(--ink, #221f22)",
        color: "var(--bg, #fefdfd)",
        position: "relative",
      }}
    >
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
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
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "rgba(254, 253, 253, 0.6)",
            }}
          >
            ACTION · RECOVERY READINESS EVALUATION
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              color: "rgba(254, 253, 253, 0.4)",
            }}
          >
            COMMITMENT MATCHING
          </span>
        </div>

        {/* Display H2 Heading & Text */}
        <div style={{ maxWidth: 920, marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: "var(--font-serif), serif",
              fontSize: "clamp(40px, 4.6vw, 68px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "#fefdfd",
              fontWeight: 400,
              marginBottom: 24,
            }}
          >
            How ready are you to recover when it matters?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "clamp(18px, 1.8vw, 21px)",
              lineHeight: 1.55,
              color: "rgba(254, 253, 253, 0.85)",
              marginBottom: 16,
            }}
          >
            Don&apos;t wait for a ransomware detonation or an audit inquiry to test your recovery posture. Connect your existing backup engines in minutes and see what lies beneath your green checkmarks.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 15,
              lineHeight: 1.6,
              color: "rgba(254, 253, 253, 0.55)",
              maxWidth: 780,
            }}
          >
            MeshDefend deploys non-custodially into your private cloud or on-premises environment. No agents on production workloads. No data leaves your boundary.
          </p>
        </div>

        {/* Action Pathways Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginBottom: 64,
          }}
        >
          {/* Resilience-Specific CTA */}
          <div
            style={{
              padding: "32px 28px",
              border: "1px solid rgba(254, 253, 253, 0.16)",
              backgroundColor: "rgba(254, 253, 253, 0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  color: "var(--orange, #f45532)",
                  letterSpacing: "0.04em",
                  marginBottom: 12,
                }}
              >
                RECOMMENDED FOR CISOS & IT LEADERSHIP
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: 24,
                  color: "#fefdfd",
                  marginBottom: 10,
                }}
              >
                Assess your recovery readiness
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: "rgba(254, 253, 253, 0.65)",
                  marginBottom: 24,
                }}
              >
                Run a non-destructive 14-day Rapid Value Assessment across your Tier-0 applications to identify hidden dependencies and clean recovery gaps.
              </p>
            </div>
            <div>
              <Link
                href="/demo"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 24px",
                  backgroundColor: "var(--orange, #f45532)",
                  color: "#ffffff",
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "opacity 0.15s ease",
                }}
              >
                Assess your recovery readiness
              </Link>
            </div>
          </div>

          {/* General Demo CTA */}
          <div
            style={{
              padding: "32px 28px",
              border: "1px solid rgba(254, 253, 253, 0.12)",
              backgroundColor: "rgba(254, 253, 253, 0.02)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  color: "rgba(254, 253, 253, 0.5)",
                  letterSpacing: "0.04em",
                  marginBottom: 12,
                }}
              >
                PLATFORM DEMONSTRATION
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: 24,
                  color: "#fefdfd",
                  marginBottom: 10,
                }}
              >
                Book a demo
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: "rgba(254, 253, 253, 0.65)",
                  marginBottom: 24,
                }}
              >
                See ResOC in action with your specific backup software stack: Commvault, Veeam, Dell PowerProtect, or NetWorker.
              </p>
            </div>
            <div>
              <Link
                href="/demo"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 24px",
                  border: "1px solid rgba(254, 253, 253, 0.3)",
                  color: "#fefdfd",
                  backgroundColor: "transparent",
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
              >
                Book a demo
              </Link>
            </div>
          </div>
        </div>

        {/* Supported Infrastructure Engines Strip */}
        <div
          style={{
            borderTop: "1px solid rgba(254, 253, 253, 0.12)",
            paddingTop: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.04em",
              color: "rgba(254, 253, 253, 0.5)",
            }}
          >
            ENTERPRISE ECOSYSTEM COMPATIBILITY:
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12,
              color: "rgba(254, 253, 253, 0.8)",
            }}
          >
            <span>Commvault</span>
            <span>·</span>
            <span>Veeam</span>
            <span>·</span>
            <span>Dell PowerProtect Data Manager</span>
            <span>·</span>
            <span>Dell NetWorker</span>
            <span>·</span>
            <span>ServiceNow</span>
            <span>·</span>
            <span>AWS / Azure</span>
          </div>
        </div>
      </div>
    </section>
  );
}
