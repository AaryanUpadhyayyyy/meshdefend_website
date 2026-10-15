"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function IntegratorContinuityFold() {
  return (
    <section
      id="integrator-continuity"
      aria-label="Continue Down the Path That Matters to You"
      style={{
        padding: "110px 0 100px",
        backgroundColor: "var(--bg, #fefdfd)",
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
            [ CONTINUITY & PROGRESSIVE DISCLOSURE ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            FIG. 5 — PURPOSEFUL NEXT STEPS
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
            Continue down the path that matters to you.
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
            Once you’ve validated the underlying engine, choose the next logical evaluation step.
            Technical architects inspect integration APIs and deployment topologies; alliance leaders
            inspect governance, security posture, and enterprise procurement readiness.
          </p>
        </div>

        {/* =================================================================== */}
        {/* 2-CARD PATHWAY SELECTOR                                             */}
        {/* =================================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 28,
          }}
        >
          {/* ─────────────────────────────────────────────────────────────
              CARD 1: FOR BUILDERS & ARCHITECTS
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              backgroundColor: "var(--surface-raised, #f3f1f1)",
              border: "1px solid var(--border)",
              padding: "36px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "border-color 0.2s ease",
            }}
          >
            <div>
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
                  PATH A · FOR BUILDERS & ARCHITECTS
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--muted)",
                  }}
                >
                  INTEGRATION & DEPLOY
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
                “Ready to build? See how it connects and deploys.”
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
                Examine our complete integration catalog across backup engines (Commvault, Veeam, Dell Data Domain, NetWorker)
                and ITSM platforms, plus our flexible on-premises, air-gapped, and hybrid cloud deployment models.
              </p>

              {/* Key Highlights */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                  <span style={{ color: "var(--orange, #f45532)", fontWeight: 700 }}>✓</span>
                  <span style={{ color: "var(--ink)", fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 12 }}>
                    Comprehensive API & webhook connector directory
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                  <span style={{ color: "var(--orange, #f45532)", fontWeight: 700 }}>✓</span>
                  <span style={{ color: "var(--ink)", fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 12 }}>
                    Air-gapped on-premises, VPC, and sovereign multi-cloud topologies
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                  <span style={{ color: "var(--orange, #f45532)", fontWeight: 700 }}>✓</span>
                  <span style={{ color: "var(--ink)", fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 12 }}>
                    Read-only, non-destructive metadata ingestion
                  </span>
                </div>
              </div>
            </div>

            {/* Action Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link
                href="/platform/integrations"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  backgroundColor: "var(--orange, #f45532)",
                  color: "#ffffff",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  border: "1px solid var(--orange, #f45532)",
                  transition: "opacity 0.15s ease",
                }}
              >
                <span>EXPLORE INTEGRATIONS DIRECTORY</span>
                <span>→</span>
              </Link>

              <Link
                href="/platform/deploy"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 18px",
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
                <span>REVIEW DEPLOYMENT ARCHITECTURE</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 2: FOR ALLIANCE HEADS & PRACTICE LEADS
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              backgroundColor: "var(--surface-raised, #f3f1f1)",
              border: "1px solid var(--border)",
              padding: "36px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "border-color 0.2s ease",
            }}
          >
            <div>
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
                  PATH B · FOR ALLIANCE HEADS & PRACTICE LEADS
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--muted)",
                  }}
                >
                  ENTERPRISE MATURITY
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
                “Ready to scale the partnership? See what makes MeshDefend enterprise-ready.”
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
                Inspect how MeshDefend survives extreme enterprise procurement scrutiny—demonstrating
                verifiable zero-hallucination AI governance, SOC2 Type II compliance, tamper-evident audit chains, and multi-tenant isolation.
              </p>

              {/* Key Highlights */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                  <span style={{ color: "var(--orange, #f45532)", fontWeight: 700 }}>✓</span>
                  <span style={{ color: "var(--ink)", fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 12 }}>
                    Deterministic recovery execution with zero hallucination risk
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                  <span style={{ color: "var(--orange, #f45532)", fontWeight: 700 }}>✓</span>
                  <span style={{ color: "var(--ink)", fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 12 }}>
                    SOC2 Type II, ISO 27001, and append-only audit ledgers
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                  <span style={{ color: "var(--orange, #f45532)", fontWeight: 700 }}>✓</span>
                  <span style={{ color: "var(--ink)", fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 12 }}>
                    Multi-tenant RBAC and sovereign enclave isolation
                  </span>
                </div>
              </div>
            </div>

            {/* Action Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link
                href="/platform/enterprise-readiness"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  backgroundColor: "var(--ink)",
                  color: "var(--bg, #fefdfd)",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  border: "1px solid var(--ink)",
                  transition: "opacity 0.15s ease",
                }}
              >
                <span>EVALUATE ENTERPRISE READINESS</span>
                <span>→</span>
              </Link>

              <Link
                href="/platform/built-for-flexibility"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 18px",
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
                <span>INSPECT PLATFORM FLEXIBILITY</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
