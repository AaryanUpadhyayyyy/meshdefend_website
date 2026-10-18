"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ResilienceBridgeFold() {
  return (
    <section
      id="bridge-action"
      aria-label="From Readiness to Action and Trust"
      style={{
        padding: "120px 0",
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Eyebrow & Figure Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 28,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 14,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              fontWeight: 500,
              color: "var(--muted)",
              letterSpacing: "0.04em",
            }}
          >
            Continuity & Uncertainty Reduction
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 5 — FROM READINESS TO ACTION & GOVERNANCE
          </span>
        </div>

        {/* Display H2 & Verbatim Sitemap Hook (NO FAKE PARAGRAPHS) */}
        <div style={{ maxWidth: 960, marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(36px, 4vw, 56px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              fontWeight: 400,
              margin: 0,
            }}
          >
            See the risk. Know the response. Stay in control.
          </h2>
        </div>

        {/* The Branching Structural Architecture */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
          }}
        >
          {/* Top Origin Bar: The ResOC Risk Trigger */}
          <div
            style={{
              padding: "20px 28px",
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--surface-raised, #f7f6f5)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#f45532",
                  display: "inline-block",
                  boxShadow: "0 0 10px rgba(244, 85, 50, 0.7)",
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--orange, #f45532)",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                RESOC RISK DETECTED
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--ink)",
                }}
              >
                ledger-core (Tier-0) · Posture score degraded to 72% · Clean candidate identified
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              04:12 UTC · Automated Policy Evaluation
            </span>
          </div>

          {/* ─── Glowing 1px SVG Line Physically Branching into Two Paths ─── */}
          <div
            style={{
              height: 64,
              backgroundColor: "var(--surface-raised, #f7f6f5)",
              borderBottom: "1px solid var(--border)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <svg
              viewBox="0 0 1000 64"
              preserveAspectRatio="none"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
            >
              <defs>
                <filter id="branch-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="3"
                    floodColor="#f45532"
                    floodOpacity="0.8"
                  />
                </filter>
              </defs>

              {/* Central Root Origin Dot */}
              <circle cx="500" cy="4" r="3.5" fill="#f45532" />

              {/* Vertical Trunk Line */}
              <motion.line
                x1="500"
                y1="4"
                x2="500"
                y2="24"
                stroke="#f45532"
                strokeWidth="1.5"
                filter="url(#branch-glow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />

              {/* Left Branch -> Incident Resolution (x: 250, y: 64) */}
              <motion.path
                d="M 500 24 C 500 48, 250 36, 250 64"
                fill="none"
                stroke="#f45532"
                strokeWidth="1.5"
                filter="url(#branch-glow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.3, ease: "easeInOut" }}
              />

              {/* Right Branch -> Enterprise Readiness (x: 750, y: 64) */}
              <motion.path
                d="M 500 24 C 500 48, 750 36, 750 64"
                fill="none"
                stroke="#f45532"
                strokeWidth="1.5"
                filter="url(#branch-glow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.3, ease: "easeInOut" }}
              />

              {/* Endpoint Dots */}
              <circle cx="250" cy="60" r="3" fill="#f45532" />
              <circle cx="750" cy="60" r="3" fill="#f45532" />
            </svg>
          </div>

          {/* Two Branching Structural Pathways */}
          <div
            className="resilience-bridge-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              backgroundColor: "var(--border)",
              gap: 1,
            }}
          >
            {/* Path A: Incident Resolution: Investigate & Act */}
            <div
              style={{
                backgroundColor: "var(--bg)",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--orange, #f45532)",
                      letterSpacing: "0.05em",
                      fontWeight: 600,
                    }}
                  >
                    PATH A · INVESTIGATE & ACT
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--ink)",
                      padding: "2px 6px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    RESOLUTION
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 28,
                    color: "var(--ink)",
                    lineHeight: 1.15,
                    marginBottom: 14,
                  }}
                >
                  Incident Resolution: Investigate & Act
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                    marginBottom: 24,
                  }}
                >
                  Carry the ResOC finding directly into our forensic investigation canvas. Trace
                  blast radius, isolate infected snapshots, and execute policy-governed remediation
                  runbooks across Commvault, Veeam, and Dell with human-in-the-loop approvals.
                </p>

                {/* Bullets */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    marginBottom: 32,
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--orange, #f45532)",
                      }}
                    >
                      —
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 13,
                        color: "var(--ink)",
                      }}
                    >
                      Forensic blast-radius tracing & root-cause correlation
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--orange, #f45532)",
                      }}
                    >
                      —
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 13,
                        color: "var(--ink)",
                      }}
                    >
                      Single-click promotion of verified pre-infection clean recovery points
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--orange, #f45532)",
                      }}
                    >
                      —
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 13,
                        color: "var(--ink)",
                      }}
                    >
                      Policy-governed autonomy: human signoff before destructive changes
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  href="/platform/incident-resolution"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 12,
                    letterSpacing: "0.04em",
                    color: "var(--ink)",
                    padding: "10px 18px",
                    border: "1px solid var(--ink)",
                    backgroundColor: "transparent",
                    textDecoration: "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  Incident Resolution: Investigate &amp; Act →
                </Link>
              </div>
            </div>

            {/* Path B: Enterprise Readiness: Controls & Governance */}
            <div
              style={{
                backgroundColor: "var(--bg)",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--muted)",
                      letterSpacing: "0.05em",
                      fontWeight: 600,
                    }}
                  >
                    PATH B · PROVE & GOVERN
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--ink)",
                      padding: "2px 6px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    GOVERNANCE
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 28,
                    color: "var(--ink)",
                    lineHeight: 1.15,
                    marginBottom: 14,
                  }}
                >
                  Enterprise Readiness: Controls & Governance
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                    marginBottom: 24,
                  }}
                >
                  Ensure institutional confidence with cryptographic auditability, immutable backup
                  validation, and strict dual-custody approval gates. Meet regulatory obligations
                  (DORA, SEC, NIS2) without manual tabletop prep.
                </p>

                {/* Bullets */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    marginBottom: 32,
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--orange, #f45532)",
                      }}
                    >
                      —
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 13,
                        color: "var(--ink)",
                      }}
                    >
                      Cryptographic audit logs with tamper-evident attestation
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--orange, #f45532)",
                      }}
                    >
                      —
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 13,
                        color: "var(--ink)",
                      }}
                    >
                      Continuous DORA, NIS2, and SEC cyber resilience compliance mapping
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--orange, #f45532)",
                      }}
                    >
                      —
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 13,
                        color: "var(--ink)",
                      }}
                    >
                      Dual-custody sign-offs for all Tier-0 workload configuration changes
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  href="/platform/enterprise-readiness"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 12,
                    letterSpacing: "0.04em",
                    color: "var(--ink)",
                    padding: "10px 18px",
                    border: "1px solid var(--ink)",
                    backgroundColor: "transparent",
                    textDecoration: "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  Enterprise Readiness: Controls &amp; Governance →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
