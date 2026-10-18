"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function EveryScaleMechanismFold() {
  const [activeFocus, setActiveFocus] = useState<"both" | "boutique" | "global">("both");

  return (
    <section
      id="every-scale-mechanism"
      aria-label="One Mechanism at Every Scale"
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
            [ ARCHITECTURAL CONTINUITY · CONTRAST PAIRING ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            FIG. 2 — ONE CORE ENGINE ACROSS ALL SCALES
          </span>
        </div>

        {/* H2 Heading */}
        <div style={{ maxWidth: 940, marginBottom: 44 }}>
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
            Build it for one environment.
            <br />
            Scale it across an entire practice.
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
            Start with one API-driven build in the center, then expand the canvas. The underlying
            MeshDefend execution mechanism remains visibly identical—scale is an operational multiplier,
            not a re-architecture.
          </p>
        </div>

        {/* Interactive Scale Mode Switcher */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: 4,
            backgroundColor: "var(--surface-raised, #f3f1f1)",
            border: "1px solid var(--border)",
            marginBottom: 32,
          }}
        >
          <button
            onClick={() => setActiveFocus("both")}
            style={{
              padding: "6px 14px",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              fontWeight: 600,
              border: "none",
              backgroundColor: activeFocus === "both" ? "var(--ink)" : "transparent",
              color: activeFocus === "both" ? "var(--bg, #fefdfd)" : "var(--muted)",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            [ SIDE-BY-SIDE ARCHITECTURE ]
          </button>
          <button
            onClick={() => setActiveFocus("boutique")}
            style={{
              padding: "6px 14px",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              fontWeight: 600,
              border: "none",
              backgroundColor: activeFocus === "boutique" ? "var(--orange, #f45532)" : "transparent",
              color: activeFocus === "boutique" ? "#ffffff" : "var(--muted)",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            [ 01: BOUTIQUE SCALE ]
          </button>
          <button
            onClick={() => setActiveFocus("global")}
            style={{
              padding: "6px 14px",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              fontWeight: 600,
              border: "none",
              backgroundColor: activeFocus === "global" ? "var(--orange, #f45532)" : "transparent",
              color: activeFocus === "global" ? "#ffffff" : "var(--muted)",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            [ 02: GLOBAL PRACTICE FLEET ]
          </button>
        </div>

        {/* =================================================================== */}
        {/* 12-COLUMN CONTRAST PAIRING CANVAS                                   */}
        {/* =================================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg, #fefdfd)",
            position: "relative",
          }}
        >
          {/* ─────────────────────────────────────────────────────────────
              LEFT SIDE: THE BOUTIQUE SCALE (Cols 1-4)
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              gridColumn: "span 4",
              padding: "32px 24px",
              borderRight: "1px solid var(--border)",
              backgroundColor:
                activeFocus === "global"
                  ? "var(--surface-raised, #f3f1f1)"
                  : "var(--bg, #fefdfd)",
              opacity: activeFocus === "global" ? 0.45 : 1,
              transition: "opacity 0.25s ease, background-color 0.25s ease",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Badge & Label */}
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
                  SCALE: 01 · SINGLE ENVIRONMENT
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
                  BOUTIQUE
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: 24,
                  color: "var(--ink)",
                  margin: "0 0 8px",
                  fontWeight: 400,
                }}
              >
                One Client Environment
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  margin: "0 0 24px",
                }}
              >
                Custom integration built to solve a specific client requirement in hours,
                not months. Zero platform wall.
              </p>

              {/* Concrete Architecture Pipeline */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "var(--surface-raised, #f3f1f1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--muted)",
                      marginBottom: 4,
                    }}
                  >
                    TARGET WORKLOAD
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Client-Specific ITSM & Backup Silo
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    ServiceNow CMDB ↔ Dell NetWorker Storage
                  </div>
                </div>

                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "var(--surface-raised, #f3f1f1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--muted)",
                      marginBottom: 4,
                    }}
                  >
                    INTEGRATION SURFACE
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Custom Ingest Webhook & Dashboard
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    Bespoke Python Adapter running in client enclave
                  </div>
                </div>

                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "var(--surface-raised, #f3f1f1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--muted)",
                      marginBottom: 4,
                    }}
                  >
                    DEPLOYMENT FOOTPRINT
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    1 Enclave · 1 Isolated DAG
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    Air-gapped on-premises or single client VPC
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Metric */}
            <div
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                PROTOTYPE TO PROD
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--orange, #f45532)",
                }}
              >
                48 HOURS
              </span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CENTER COLUMN: THE CORE API SURFACE (Cols 5-8)
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              gridColumn: "span 4",
              backgroundColor: "var(--dark, #221f22)",
              color: "#fefdfd",
              padding: "32px 24px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Top Node Header */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  borderBottom: "1px solid rgba(254, 253, 253, 0.12)",
                  paddingBottom: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: "var(--orange, #f45532)",
                      borderRadius: "50%",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "#fefdfd",
                    }}
                  >
                    CORE API SURFACE (SHARED ENGINE)
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9,
                    color: "rgba(254, 253, 253, 0.6)",
                  }}
                >
                  UNCHANGED
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--orange, #f45532)",
                  marginBottom: 8,
                }}
              >
                POST /v1/resilience/mesh/execute
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: "rgba(254, 253, 253, 0.7)",
                  marginBottom: 16,
                }}
              >
                The exact same deterministic endpoint, security model, and execution engine
                powers both a single boutique adapter and a 12-region enterprise practice.
              </p>

              {/* Code Snippet Box with blinking cursor */}
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(254, 253, 253, 0.12)",
                  padding: "14px 16px",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  lineHeight: 1.5,
                  color: "#fefdfd",
                  overflowX: "auto",
                }}
              >
                <div style={{ color: "rgba(254, 253, 253, 0.5)" }}>// Request Payload</div>
                <div>&#123;</div>
                <div style={{ paddingLeft: 12 }}>
                  <span style={{ color: "#f45532" }}>&quot;tenant_scope&quot;</span>: <span style={{ color: "#a5d6a7" }}>&quot;hierarchical&quot;</span>,
                </div>
                <div style={{ paddingLeft: 12 }}>
                  <span style={{ color: "#f45532" }}>&quot;topology_dag&quot;</span>: <span style={{ color: "#a5d6a7" }}>&quot;sha256:d8f4e2...&quot;</span>,
                </div>
                <div style={{ paddingLeft: 12 }}>
                  <span style={{ color: "#f45532" }}>&quot;deterministic_lock&quot;</span>: <span style={{ color: "#90caf9" }}>true</span>,
                </div>
                <div style={{ paddingLeft: 12 }}>
                  <span style={{ color: "#f45532" }}>&quot;immutable_audit&quot;</span>: <span style={{ color: "#a5d6a7" }}>&quot;WORM_ACTIVE&quot;</span>
                </div>
                <div>&#125;</div>
                <div
                  style={{
                    marginTop: 10,
                    paddingTop: 8,
                    borderTop: "1px dashed rgba(254, 253, 253, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#a5d6a7",
                  }}
                >
                  <span>✓ 200 OK</span>
                  <span style={{ color: "rgba(254, 253, 253, 0.4)" }}>|</span>
                  <span style={{ color: "rgba(254, 253, 253, 0.6)" }}>14ms</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{
                      display: "inline-block",
                      width: 6,
                      height: 12,
                      backgroundColor: "var(--orange, #f45532)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Proof Strip */}
            <div
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid rgba(254, 253, 253, 0.12)",
                fontSize: 10,
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                color: "rgba(254, 253, 253, 0.6)",
                letterSpacing: "0.04em",
              }}
            >
              ZERO FORKS · ZERO DISJOINT CODEBASES
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT SIDE: THE GLOBAL SCALE (Cols 9-12)
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              gridColumn: "span 4",
              padding: "32px 24px",
              backgroundColor:
                activeFocus === "boutique"
                  ? "var(--surface-raised, #f3f1f1)"
                  : "var(--bg, #fefdfd)",
              opacity: activeFocus === "boutique" ? 0.45 : 1,
              transition: "opacity 0.25s ease, background-color 0.25s ease",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Badge & Label */}
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
                  SCALE: 02 · GLOBAL PRACTICE FLEET
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
                  GLOBAL ALLIANCE
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: 24,
                  color: "var(--ink)",
                  margin: "0 0 8px",
                  fontWeight: 400,
                }}
              >
                Multi-Tenant Practice Hierarchy
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  margin: "0 0 24px",
                }}
              >
                The exact same API powers dozens of sovereign client tenants managed under
                federated practice governance and centralized reporting.
              </p>

              {/* Concrete Global Hierarchy Blocks */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "var(--surface-raised, #f3f1f1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--muted)",
                      marginBottom: 4,
                    }}
                  >
                    PRACTICE ROOT CONSOLE
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Global Alliance Orchestrator
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    Centralized posture scoring across all client engagements
                  </div>
                </div>

                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "var(--surface-raised, #f3f1f1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--muted)",
                      marginBottom: 4,
                    }}
                  >
                    FEDERATED ENCLAVES
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    12 Sovereign Global Regions
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    Cryptographic isolation per tenant (DORA / NIS2 compliant)
                  </div>
                </div>

                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "var(--surface-raised, #f3f1f1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--muted)",
                      marginBottom: 4,
                    }}
                  >
                    GOVERNANCE & AUDIT
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    Fleet-Wide Policy Inheritance
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    Immutable append-only recovery ledger across all clients
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Metric */}
            <div
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                TOTAL SCALE
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--orange, #f45532)",
                }}
              >
                FEDERATED MULTI-REGION TOPOLOGY
              </span>
            </div>
          </div>
        </div>

        {/* Synthesis Verification Strip */}
        <div
          style={{
            marginTop: 24,
            padding: "16px 20px",
            backgroundColor: "var(--surface-raised, #f3f1f1)",
            border: "1px solid var(--border)",
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
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--orange, #f45532)",
                fontWeight: 600,
              }}
            >
              THE ARCHITECTURAL PROMISE:
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body), Inter, sans-serif',
                fontSize: 13,
                color: "var(--ink)",
              }}
            >
              Your engineering team learns one API surface. That same mastery delivers a bespoke
              client fix or anchors a global consulting practice.
            </span>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 10,
              color: "var(--muted)",
              letterSpacing: "0.04em",
            }}
          >
            NO RE-ENGINEERING REQUIRED
          </span>
        </div>
      </div>
    </section>
  );
}
