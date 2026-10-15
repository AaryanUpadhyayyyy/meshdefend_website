"use client";

import Link from "next/link";

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
              fontFamily: "var(--font-mono), monospace",
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
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 5 — FROM READINESS TO ACTION & GOVERNANCE
          </span>
        </div>

        {/* Display H2 & Narrative */}
        <div style={{ maxWidth: 960, marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: "var(--font-serif), serif",
              fontSize: "clamp(36px, 4vw, 56px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 20,
            }}
          >
            See the risk. Know the response. Stay in control.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 19,
              lineHeight: 1.55,
              color: "var(--ink)",
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            Once a recovery risk is exposed in ResOC, MeshDefend provides two connected operational pathways: acting on the threat immediately, and proving institutional governance.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 16,
              lineHeight: 1.65,
              color: "var(--muted)",
              maxWidth: 820,
            }}
          >
            Visibility without remediation is just anxiety. MeshDefend bridges continuous resilience observability directly into autonomous incident resolution and enterprise governance. When an application drops below its recovery threshold, you can trace and isolate the issue immediately, while relying on cryptographic air-gaps, dual-custody controls, and the Rapid Value Assessment framework.
          </p>
        </div>

        {/* The Branching Structural Architecture (1px Visual Rail) */}
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
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  color: "var(--orange, #f45532)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                RESOC RISK DETECTED
              </span>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--ink)" }}>
                ledger-core (Tier-0) · Posture score degraded to 72% · Clean candidate identified
              </span>
            </div>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)" }}>
              04:12 UTC · Automated Policy Evaluation
            </span>
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 11,
                      color: "var(--muted)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    PATH A · INVESTIGATE & ACT
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
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
                    fontFamily: "var(--font-serif), serif",
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
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                    marginBottom: 24,
                  }}
                >
                  Carry the ResOC finding directly into our forensic investigation canvas. Trace blast radius, isolate infected snapshots, and execute policy-governed remediation runbooks across Commvault, Veeam, and Dell with human-in-the-loop approvals.
                </p>

                {/* Bullets */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--orange, #f45532)" }}>—</span>
                    <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--ink)" }}>
                      Forensic blast-radius tracing & root-cause correlation
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--orange, #f45532)" }}>—</span>
                    <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--ink)" }}>
                      Single-click promotion of verified pre-infection clean recovery points
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--orange, #f45532)" }}>—</span>
                    <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--ink)" }}>
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
                    fontFamily: "var(--font-mono), monospace",
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
                  Incident Resolution: Investigate & Act →
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 11,
                      color: "var(--muted)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    PATH B · CONTROLS & GOVERNANCE
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
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
                    fontFamily: "var(--font-serif), serif",
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
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                    marginBottom: 24,
                  }}
                >
                  Discover how enterprise security and compliance guardrails govern every ResOC decision. Maintain zero-trust air-gapped controls, role-based autonomy tiers, and regulatory compliance evidence for DORA, NIS2, and SEC guidelines.
                </p>

                {/* Bullets */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--ink)" }}>—</span>
                    <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--ink)" }}>
                      Non-custodial architecture: telemetry analyzed entirely within your VPC
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--ink)" }}>—</span>
                    <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--ink)" }}>
                      Audit-ready proof for DORA, NIS2, and SEC cyber incident disclosure
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--ink)" }}>—</span>
                    <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--ink)" }}>
                      Rapid Value Assessment: 14-day proof of recovery gap identification
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
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    letterSpacing: "0.04em",
                    color: "var(--ink)",
                    padding: "10px 18px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--surface-raised, #f7f6f5)",
                    textDecoration: "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  Enterprise Readiness: Controls & Governance →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
