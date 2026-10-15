"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function DualCommitmentCTAFold() {
  const technicalGuarantees = [
    "24-hour sandbox provisioning with chaos-injection simulation",
    "Direct Slack/Teams bridge with core platform engineers",
    "Full access to open connector SDKs and OpenAPI 3.1 schemas",
  ];

  const allianceGuarantees = [
    "Legally binding non-disintermediation covenant",
    "Dedicated Global Partner Solutions Architect (PSA) alignment",
    "Formal deal registration, protected margins, and MDF co-funding",
  ];

  return (
    <section
      id="dual-commitment-cta"
      aria-label="Commitment Matched to the Partnership"
      style={{
        padding: "120px 0 130px",
        backgroundColor: "var(--bg, #fefdfd)",
        position: "relative",
        borderTop: "1px solid var(--border)",
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
            [ COMMITMENT MATCHING · DUAL ENGAGEMENT ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            FIG. 6 — TARGETED PARTNER INITIATION
          </span>
        </div>

        {/* Section Heading */}
        <div style={{ maxWidth: 940, marginBottom: 52 }}>
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
            Two relationships.
            <br />
            Two distinct ways to get started.
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
            We don’t route builders and alliance executives into a generic sales demo funnel. A builder
            needs technical access, sandbox keys, and developer documentation; an alliance leader needs a
            strategic discussion about practice margins, enablement, and joint co-selling.
          </p>
        </div>

        {/* =================================================================== */}
        {/* UN-COLLAPSED DUAL CTA BOXES                                         */}
        {/* =================================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 28,
            marginBottom: 44,
          }}
        >
          {/* ─────────────────────────────────────────────────────────────
              LEFT BOX: TECHNICAL BUILDER TRACK
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              backgroundColor: "var(--surface-raised, #f3f1f1)",
              border: "1px solid var(--border)",
              padding: "40px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Box Eyebrow */}
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
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    color: "var(--orange, #f45532)",
                    fontWeight: 600,
                  }}
                >
                  FOR BUILDERS, DEVS & ARCHITECTS
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--muted)",
                  }}
                >
                  TECHNICAL TRACK
                </span>
              </div>

              {/* Exact Hook */}
              <h3
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "clamp(26px, 2.6vw, 34px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  margin: "0 0 16px",
                  fontWeight: 400,
                }}
              >
                “Ready to build? Start with the platform.”
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  marginBottom: 24,
                }}
              >
                Request sandbox credentials, review our complete OpenAPI 3.1 schema, or schedule an
                architectural whiteboarding session with a MeshDefend Partner Solutions Engineer.
              </p>

              {/* Technical Commitments */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {technicalGuarantees.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: "var(--orange, #f45532)", fontSize: 13, lineHeight: 1.3 }}>✓</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 13,
                        color: "var(--ink)",
                        lineHeight: 1.4,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link
                href="/contact?type=technical-partner"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "16px 24px",
                  backgroundColor: "var(--orange, #f45532)",
                  color: "#ffffff",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  border: "1px solid var(--orange, #f45532)",
                  transition: "opacity 0.15s ease",
                }}
              >
                <span>Talk to a technical partner</span>
                <span>→</span>
              </Link>

              <Link
                href="/support"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "12px 20px",
                  backgroundColor: "var(--bg, #fefdfd)",
                  color: "var(--ink)",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                  border: "1px solid var(--border)",
                  transition: "border-color 0.15s ease",
                }}
              >
                <span>Request Sandbox & API Access</span>
              </Link>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT BOX: GLOBAL ALLIANCE TRACK
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              backgroundColor: "var(--surface-raised, #f3f1f1)",
              border: "1px solid var(--border)",
              padding: "40px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Box Eyebrow */}
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
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    color: "var(--orange, #f45532)",
                    fontWeight: 600,
                  }}
                >
                  FOR PRACTICE HEADS & ALLIANCE LEADERS
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--muted)",
                  }}
                >
                  STRATEGIC TRACK
                </span>
              </div>

              {/* Exact Hook */}
              <h3
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "clamp(26px, 2.6vw, 34px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  margin: "0 0 16px",
                  fontWeight: 400,
                }}
              >
                “Let’s talk about what we could build together.”
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  marginBottom: 24,
                }}
              >
                Connect directly with our Global Alliances team to review partner tier structures,
                margin schedules, joint customer co-selling frameworks, and practice enablement curriculum.
              </p>

              {/* Alliance Commitments */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {allianceGuarantees.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: "var(--orange, #f45532)", fontSize: 13, lineHeight: 1.3 }}>✓</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 13,
                        color: "var(--ink)",
                        lineHeight: 1.4,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link
                href="/contact?type=alliance-partnership"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "16px 24px",
                  backgroundColor: "var(--ink)",
                  color: "var(--bg, #fefdfd)",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  border: "1px solid var(--ink)",
                  transition: "opacity 0.15s ease",
                }}
              >
                <span>Discuss an alliance</span>
                <span>→</span>
              </Link>

              <Link
                href="/company/investors-partners"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "12px 20px",
                  backgroundColor: "var(--bg, #fefdfd)",
                  color: "var(--ink)",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                  border: "1px solid var(--border)",
                  transition: "border-color 0.15s ease",
                }}
              >
                <span>Explore Partner Ecosystem</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Micro-Assurance Footer Strip */}
        <div
          style={{
            padding: "16px 20px",
            backgroundColor: "var(--surface-raised, #f3f1f1)",
            border: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 6,
                height: 6,
                backgroundColor: "var(--orange, #f45532)",
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--ink)",
                fontWeight: 600,
              }}
            >
              ISO 27001 & SOC 2 TYPE II CERTIFIED
            </span>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            STRICT NON-DISINTERMEDIATION POLICY · 100% PUBLIC API SURFACE
          </span>
        </div>
      </div>
    </section>
  );
}
