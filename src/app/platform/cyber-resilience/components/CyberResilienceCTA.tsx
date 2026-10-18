"use client";

import Link from "next/link";

export function CyberResilienceCTA() {
  return (
    <section
      id="resilience-cta"
      aria-label="Assess Your Recovery Readiness"
      style={{
        padding: "140px 0 120px",
        backgroundColor: "var(--dark, #221f22)",
        color: "#fefdfd",
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
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "rgba(254, 253, 253, 0.6)",
            }}
          >
            ACTION · RECOVERY READINESS EVALUATION
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "rgba(254, 253, 253, 0.4)",
            }}
          >
            EVALUATION PATHWAYS
          </span>
        </div>

        {/* Display H2 Heading & Text */}
        <div style={{ maxWidth: 920, marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
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
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: "clamp(18px, 1.8vw, 21px)",
              lineHeight: 1.55,
              color: "rgba(254, 253, 253, 0.85)",
              marginBottom: 16,
            }}
          >
            Don&apos;t wait for a ransomware detonation or an audit inquiry to test your recovery
            posture. Connect your existing backup engines in minutes and see what lies beneath your
            green checkmarks.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 15,
              lineHeight: 1.6,
              color: "rgba(254, 253, 253, 0.55)",
              maxWidth: 780,
            }}
          >
            MeshDefend deploys non-custodially into your private cloud or on-premises environment. No
            agents on production workloads. No data leaves your boundary.
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
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
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
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: 24,
                  color: "#fefdfd",
                  marginBottom: 10,
                }}
              >
                Assess your recovery readiness
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: "rgba(254, 253, 253, 0.65)",
                  marginBottom: 24,
                }}
              >
                Run a non-destructive 14-day Rapid Value Assessment across your Tier-0 applications
                to identify hidden dependencies and clean recovery gaps.
              </p>
            </div>

            <div>
              <Link
                href="/company/contact?intent=rva"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "13px 20px",
                  backgroundColor: "var(--orange, #f45532)",
                  color: "#ffffff",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 0 20px rgba(244, 85, 50, 0.35)",
                }}
              >
                REQUEST A RAPID VALUE ASSESSMENT →
              </Link>
            </div>
          </div>

          {/* Architecture Review */}
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
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "rgba(254, 253, 253, 0.5)",
                  letterSpacing: "0.04em",
                  marginBottom: 12,
                }}
              >
                FOR ENTERPRISE ARCHITECTS & SRE
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: 24,
                  color: "#fefdfd",
                  marginBottom: 10,
                }}
              >
                Book a Technical Architecture Review
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: "rgba(254, 253, 253, 0.65)",
                  marginBottom: 24,
                }}
              >
                A 30-minute deep dive with a systems architect. Walk through your hybrid estate,
                dependency mapping, and air-gapped isolation controls.
              </p>
            </div>

            <div>
              <Link
                href="/company/contact?intent=demo"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "13px 20px",
                  border: "1px solid rgba(254, 253, 253, 0.4)",
                  backgroundColor: "transparent",
                  color: "#fefdfd",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
              >
                SCHEDULE 30-MIN WALKTHROUGH →
              </Link>
            </div>
          </div>

          {/* Self-Service Architecture Document */}
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
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "rgba(254, 253, 253, 0.5)",
                  letterSpacing: "0.04em",
                  marginBottom: 12,
                }}
              >
                FOR RISK, AUDIT & COMPLIANCE
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: 24,
                  color: "#fefdfd",
                  marginBottom: 10,
                }}
              >
                Read the Cyber Resilience Whitepaper
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: "rgba(254, 253, 253, 0.65)",
                  marginBottom: 24,
                }}
              >
                Learn how MeshDefend maps to NIST CSF 2.0, DORA, and SEC cyber disclosure
                regulations. Download our architectural security whitepaper.
              </p>
            </div>

            <div>
              <Link
                href="/downloads/meshdefend-enterprise-onepager.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "13px 20px",
                  border: "1px solid rgba(254, 253, 253, 0.4)",
                  backgroundColor: "transparent",
                  color: "#fefdfd",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
              >
                READ THE WHITEPAPER →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Vendor Immutability Stripe */}
        <div
          style={{
            borderTop: "1px solid rgba(254, 253, 253, 0.12)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
            fontSize: 11,
            color: "rgba(254, 253, 253, 0.45)",
          }}
        >
          <div>
            INTEGRATES WITH: Commvault · Veeam · Dell DataDomain · AWS Backup · Azure Backup ·
            Cohesity
          </div>
          <div>DEPLOYMENT: NON-CUSTODIAL · READ-ONLY AUDIT BY DEFAULT · SOC 2 TYPE II AUDITED ARCHITECTURE</div>
        </div>
      </div>
    </section>
  );
}
