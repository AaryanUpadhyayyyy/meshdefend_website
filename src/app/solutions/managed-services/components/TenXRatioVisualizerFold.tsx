"use client";

import { motion } from "framer-motion";

export function TenXRatioVisualizerFold() {
  return (
    <section
      id="ten-x-ratio-visualizer"
      aria-label="Prove Operating Leverage"
      style={{
        padding: "120px 0 110px",
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
            [ OPERATING LEVERAGE · SOURCE SIMILARITY ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            FIG. 4 — THE 10× OPERATOR RATIO
          </span>
        </div>

        {/* H2 Heading */}
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
            Help every operator manage 10× more clients.
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
            MSPs trust proof measured against their own operating model. Generic enterprise metrics
            matter less than evidence that an operator can serve vastly more client environments
            without proportional headcount additions or burned-out engineers.
          </p>
        </div>

        {/* =================================================================== */}
        {/* THE 10X RATIO VISUALIZER (MASSIVE HIGH-CONTRAST METRIC)             */}
        {/* =================================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            border: "1px solid var(--border)",
            backgroundColor: "var(--surface-raised, #f3f1f1)",
            marginBottom: 40,
          }}
        >
          {/* ─────────────────────────────────────────────────────────────
              LEFT CARD: BEFORE MESHDEFEND (1 : 5)
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              padding: "44px 36px",
              borderRight: "1px solid var(--border)",
              backgroundColor: "var(--bg, #fefdfd)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Header Badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    color: "var(--muted)",
                    fontWeight: 600,
                  }}
                >
                  BEFORE MESHDEFEND · STATUS QUO
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    padding: "2px 6px",
                    backgroundColor: "rgba(34,31,34,0.06)",
                    color: "var(--ink)",
                  }}
                >
                  MANUAL TOIL
                </span>
              </div>

              {/* Massive Ratio */}
              <div
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "clamp(64px, 8vw, 110px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  color: "var(--ink)",
                  marginBottom: 12,
                }}
              >
                1 : 5
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 24,
                  letterSpacing: "0.04em",
                }}
              >
                1 TECHNICIAN SERVES 5 CLIENTS
              </div>

              {/* Breakdown List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13 }}>
                  <span style={{ color: "#ef5350", fontWeight: 700 }}>✕</span>
                  <span style={{ color: "var(--muted)", lineHeight: 1.4 }}>
                    <strong style={{ color: "var(--ink)" }}>3.5 hours daily</strong> spent manually logging into 5 distinct backup portals to check green checkmarks.
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13 }}>
                  <span style={{ color: "#ef5350", fontWeight: 700 }}>✕</span>
                  <span style={{ color: "var(--muted)", lineHeight: 1.4 }}>
                    <strong style={{ color: "var(--ink)" }}>High false-green risk</strong>: corrupted backup catalogs go unspotted until client recovery drill.
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13 }}>
                  <span style={{ color: "#ef5350", fontWeight: 700 }}>✕</span>
                  <span style={{ color: "var(--muted)", lineHeight: 1.4 }}>
                    <strong style={{ color: "var(--ink)" }}>Linear hiring ceiling</strong>: adding 5 clients mandates hiring another L2 technician ($80k+/yr).
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div
              style={{
                marginTop: 32,
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              MAXIMUM CLIENT CEILING: 5–8 ACCOUNTS
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT CARD: WITH MESHDEFEND (1 : 50)
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              padding: "44px 36px",
              backgroundColor: "var(--bg, #fefdfd)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <div>
              {/* Header Badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
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
                  WITH MESHDEFEND · AGENT MESH LEVERAGE
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    padding: "2px 8px",
                    backgroundColor: "rgba(244, 85, 50, 0.12)",
                    color: "var(--orange, #f45532)",
                    fontWeight: 600,
                  }}
                >
                  10× RATIO
                </span>
              </div>

              {/* Massive Ratio Highlighted with Orange */}
              <div
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "clamp(64px, 8vw, 110px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  color: "var(--orange, #f45532)",
                  marginBottom: 12,
                }}
              >
                1 : 50
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 24,
                  letterSpacing: "0.04em",
                }}
              >
                1 TECHNICIAN SERVES 50 CLIENTS
              </div>

              {/* Breakdown List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13 }}>
                  <span style={{ color: "var(--orange, #f45532)", fontWeight: 700 }}>✓</span>
                  <span style={{ color: "var(--muted)", lineHeight: 1.4 }}>
                    <strong style={{ color: "var(--ink)" }}>20 minutes daily</strong> to review automated cross-client triage queue across 50 clients.
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13 }}>
                  <span style={{ color: "var(--orange, #f45532)", fontWeight: 700 }}>✓</span>
                  <span style={{ color: "var(--muted)", lineHeight: 1.4 }}>
                    <strong style={{ color: "var(--ink)" }}>Deterministic DAG proof</strong>: non-destructive autonomous dry runs verify actual recovery posture.
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13 }}>
                  <span style={{ color: "var(--orange, #f45532)", fontWeight: 700 }}>✓</span>
                  <span style={{ color: "var(--muted)", lineHeight: 1.4 }}>
                    <strong style={{ color: "var(--ink)" }}>Compounding gross margin</strong>: scale revenue by $400k+ without adding a single headcount.
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div
              style={{
                marginTop: 32,
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--orange, #f45532)",
                fontWeight: 600,
              }}
            >
              PROVEN OPERATOR CAPACITY: 50+ ACCOUNTS PER FTE
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* CREDIBLE MSP PARTNER QUOTE                                          */}
        {/* =================================================================== */}
        <div
          style={{
            padding: "36px 32px",
            backgroundColor: "var(--surface-raised, #f3f1f1)",
            border: "1px solid var(--border)",
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 10,
              letterSpacing: "0.08em",
              color: "var(--orange, #f45532)",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            REPRESENTATIVE MSP OPERATOR PROFILE // ANONYMIZED BENCHMARK
          </div>

          <blockquote
            style={{
              margin: "0 0 20px",
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(22px, 2.5vw, 30px)",
              lineHeight: 1.25,
              color: "var(--ink)",
              fontWeight: 400,
            }}
          >
            “Before MeshDefend, our morning health-check routine consumed three Tier-2 engineers until
            11:30 AM every single day. Today, one engineer reviews our entire 42-client fleet by 8:15 AM.
            Onboarding a new client takes 40 minutes instead of three days. Our gross margin on managed
            backup increased by 38% in the first quarter.”
          </blockquote>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              borderTop: "1px solid var(--border)",
              paddingTop: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--ink)",
                }}
              >
                VP of Managed Services & Infrastructure
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                Representative Pilot Deployment · 48 Active Client Enclaves
              </div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--orange, #f45532)",
                fontWeight: 600,
              }}
            >
              FLEET: VEEAM + COMMVAULT + DELL
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
