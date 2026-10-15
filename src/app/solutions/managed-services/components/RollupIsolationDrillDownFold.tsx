"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function RollupIsolationDrillDownFold() {
  const [selectedView, setSelectedView] = useState<"all" | "clientB" | "clientA">("all");

  return (
    <section
      id="rollup-isolation-drilldown"
      aria-label="Prove Multi-Tenancy in Operation"
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
            [ MULTI-TENANCY DEMONSTRATION · SHOW DON’T TELL ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            FIG. 2 — DRILL-DOWN ISOLATION MATRIX
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
            Managing 50 clients shouldn’t mean managing 50 separate consoles.
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
            MSPs have seen products claim “multi-tenancy” that were little more than separate login
            accounts. True multi-tenancy gives you aggregate operational leverage across all accounts
            while maintaining strict cryptographic tenant boundaries for compliance.
          </p>
        </div>

        {/* =================================================================== */}
        {/* SPLIT-SCREEN DRILL-DOWN CONSOLE                                     */}
        {/* =================================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            border: "1px solid var(--border)",
            backgroundColor: "var(--surface-raised, #f3f1f1)",
          }}
        >
          {/* ─────────────────────────────────────────────────────────────
              LEFT SIDE: INTERACTIVE TENANT SELECTOR (Cols 1-4)
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              gridColumn: "span 4",
              borderRight: "1px solid var(--border)",
              backgroundColor: "var(--bg, #fefdfd)",
              padding: "28px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  color: "var(--muted)",
                  fontWeight: 600,
                  marginBottom: 14,
                  textTransform: "uppercase",
                }}
              >
                SELECT CONSOLE VIEW:
              </div>

              {/* View Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* All Clients (Rollup) */}
                <button
                  onClick={() => setSelectedView("all")}
                  style={{
                    textAlign: "left",
                    padding: "14px 16px",
                    backgroundColor:
                      selectedView === "all"
                        ? "var(--ink)"
                        : "var(--surface-raised, #f3f1f1)",
                    color: selectedView === "all" ? "var(--bg, #fefdfd)" : "var(--ink)",
                    border:
                      selectedView === "all"
                        ? "1px solid var(--ink)"
                        : "1px solid var(--border)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      marginBottom: 4,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>[ ALL CLIENTS (ROLLUP) ]</span>
                    <span
                      style={{
                        fontSize: 9,
                        padding: "2px 6px",
                        backgroundColor:
                          selectedView === "all"
                            ? "var(--orange, #f45532)"
                            : "rgba(34,31,34,0.08)",
                        color: selectedView === "all" ? "#ffffff" : "var(--ink)",
                      }}
                    >
                      50 CLIENTS
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 12,
                      opacity: 0.75,
                      lineHeight: 1.4,
                    }}
                  >
                    Unified cross-client SLA status, total exceptions, and fleet triage.
                  </div>
                </button>

                {/* Client B (Isolated) */}
                <button
                  onClick={() => setSelectedView("clientB")}
                  style={{
                    textAlign: "left",
                    padding: "14px 16px",
                    backgroundColor:
                      selectedView === "clientB"
                        ? "var(--orange, #f45532)"
                        : "var(--surface-raised, #f3f1f1)",
                    color: selectedView === "clientB" ? "#ffffff" : "var(--ink)",
                    border:
                      selectedView === "clientB"
                        ? "1px solid var(--orange, #f45532)"
                        : "1px solid var(--border)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      marginBottom: 4,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>[ CLIENT B (ISOLATED) ]</span>
                    <span
                      style={{
                        fontSize: 9,
                        padding: "2px 6px",
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        color: selectedView === "clientB" ? "#ffffff" : "var(--ink)",
                      }}
                    >
                      COMMVAULT
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 12,
                      opacity: selectedView === "clientB" ? 0.9 : 0.75,
                      lineHeight: 1.4,
                    }}
                  >
                    MedHealth Group · 180 TB Electronic Health Records · Strict WORM.
                  </div>
                </button>

                {/* Client A (Isolated) */}
                <button
                  onClick={() => setSelectedView("clientA")}
                  style={{
                    textAlign: "left",
                    padding: "14px 16px",
                    backgroundColor:
                      selectedView === "clientA"
                        ? "var(--orange, #f45532)"
                        : "var(--surface-raised, #f3f1f1)",
                    color: selectedView === "clientA" ? "#ffffff" : "var(--ink)",
                    border:
                      selectedView === "clientA"
                        ? "1px solid var(--orange, #f45532)"
                        : "1px solid var(--border)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      marginBottom: 4,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>[ CLIENT A (ISOLATED) ]</span>
                    <span
                      style={{
                        fontSize: 9,
                        padding: "2px 6px",
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        color: selectedView === "clientA" ? "#ffffff" : "var(--ink)",
                      }}
                    >
                      VEEAM
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 12,
                      opacity: selectedView === "clientA" ? 0.9 : 0.75,
                      lineHeight: 1.4,
                    }}
                  >
                    Meridian Financial · 34 VMs · Air-Gapped S3 Lock.
                  </div>
                </button>
              </div>
            </div>

            {/* Explanatory Boundary Note */}
            <div
              style={{
                marginTop: 24,
                padding: "12px 14px",
                backgroundColor: "var(--surface-raised, #f3f1f1)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "var(--orange, #f45532)",
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                TENANT BOUNDARY INTEGRITY
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 11,
                  lineHeight: 1.4,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                Data is never improperly blended. Each client runs in a private tenant enclave with dedicated encryption keys and isolated audit trails.
              </p>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT SIDE: DYNAMIC DASHBOARD DISPLAY (Cols 5-12)
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              gridColumn: "span 8",
              padding: "32px 28px",
              backgroundColor: "var(--bg, #fefdfd)",
              minHeight: 460,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <AnimatePresence mode="wait">
              {selectedView === "all" ? (
                /* VIEW 1: ALL CLIENTS (ROLLUP) */
                <motion.div
                  key="all-clients"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                      borderBottom: "1px solid var(--border)",
                      paddingBottom: 12,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          letterSpacing: "0.08em",
                          color: "var(--orange, #f45532)",
                          fontWeight: 600,
                          display: "block",
                          marginBottom: 2,
                        }}
                      >
                        ROLLUP VIEW
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 18,
                          fontWeight: 600,
                          color: "var(--ink)",
                          margin: 0,
                        }}
                      >
                        MSP FLEET ROLLUP: 50 CLIENT TENANTS
                      </h3>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        padding: "4px 8px",
                        backgroundColor: "rgba(165, 214, 167, 0.2)",
                        color: "#2e7d32",
                        fontWeight: 600,
                      }}
                    >
                      STATUS: 99.8% HEALTHY
                    </span>
                  </div>

                  {/* 4 Rollup KPI Cards */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 12,
                      marginBottom: 24,
                    }}
                  >
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
                          fontSize: 9,
                          color: "var(--muted)",
                          marginBottom: 4,
                        }}
                      >
                        AGGREGATE SLA
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 20,
                          fontWeight: 600,
                          color: "#2e7d32",
                        }}
                      >
                        99.8%
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--muted)",
                          marginTop: 2,
                        }}
                      >
                        Across all 50 clients
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
                          fontSize: 9,
                          color: "var(--muted)",
                          marginBottom: 4,
                        }}
                      >
                        DAILY JOBS
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 20,
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        1,424
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--muted)",
                          marginTop: 2,
                        }}
                      >
                        Automated checks
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
                          fontSize: 9,
                          color: "var(--muted)",
                          marginBottom: 4,
                        }}
                      >
                        CROSS-CLIENT EXCEPTIONS
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 20,
                          fontWeight: 600,
                          color: "var(--orange, #f45532)",
                        }}
                      >
                        2 Triaged
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--muted)",
                          marginTop: 2,
                        }}
                      >
                        Zero Sev-1 outages
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
                          fontSize: 9,
                          color: "var(--muted)",
                          marginBottom: 4,
                        }}
                      >
                        OPERATOR CAPACITY
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 20,
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        1 : 50
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--orange, #f45532)",
                          marginTop: 2,
                          fontWeight: 600,
                        }}
                      >
                        10× Leverage
                      </div>
                    </div>
                  </div>

                  {/* Cross-Client Exception Queue */}
                  <div
                    style={{
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--surface-raised, #f3f1f1)",
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                        borderBottom: "1px solid var(--border)",
                        paddingBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        CROSS-CLIENT EXCEPTION QUEUE (ACTIVE AUTOMATED TRIAGE)
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--muted)",
                        }}
                      >
                        2 ITEMS REQUIRE OPERATOR ACK
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px 10px",
                          backgroundColor: "var(--bg, #fefdfd)",
                          border: "1px solid var(--border)",
                          fontSize: 11,
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        }}
                      >
                        <div>
                          <span style={{ color: "var(--orange, #f45532)", fontWeight: 600 }}>
                            [Client B — MedHealth]
                          </span>{" "}
                          <span>WORM lock retention policy drift detected on node 4.</span>
                        </div>
                        <span style={{ color: "var(--orange, #f45532)" }}>AUTO-HEALING STAGED</span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px 10px",
                          backgroundColor: "var(--bg, #fefdfd)",
                          border: "1px solid var(--border)",
                          fontSize: 11,
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        }}
                      >
                        <div>
                          <span style={{ color: "var(--ink)", fontWeight: 600 }}>
                            [Client E — Vertex Retail]
                          </span>{" "}
                          <span>Backup completed with false-green: 2 DB logs unindexed.</span>
                        </div>
                        <span style={{ color: "#2e7d32" }}>RECOVERY GAP ISOLATED</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : selectedView === "clientB" ? (
                /* VIEW 2: CLIENT B (ISOLATED) */
                <motion.div
                  key="client-b"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                      borderBottom: "1px solid var(--border)",
                      paddingBottom: 12,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          letterSpacing: "0.08em",
                          color: "var(--orange, #f45532)",
                          fontWeight: 600,
                          display: "block",
                          marginBottom: 2,
                        }}
                      >
                        TENANT DETAIL · ENCLAVE #0912
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 18,
                          fontWeight: 600,
                          color: "var(--ink)",
                          margin: 0,
                        }}
                      >
                        MEDHEALTH GROUP [STRICT TENANT ISOLATION]
                      </h3>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        padding: "4px 8px",
                        backgroundColor: "rgba(244, 85, 50, 0.15)",
                        color: "var(--orange, #f45532)",
                        fontWeight: 600,
                      }}
                    >
                      CRYPTOGRAPHIC BOUNDARY ENFORCED
                    </span>
                  </div>

                  {/* 4 Isolated KPI Cards */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 12,
                      marginBottom: 24,
                    }}
                  >
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
                          fontSize: 9,
                          color: "var(--muted)",
                          marginBottom: 4,
                        }}
                      >
                        TENANT HEALTH
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 20,
                          fontWeight: 600,
                          color: "var(--orange, #f45532)",
                        }}
                      >
                        100%
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--muted)",
                          marginTop: 2,
                        }}
                      >
                        HIPAA SLA pass
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
                          fontSize: 9,
                          color: "var(--muted)",
                          marginBottom: 4,
                        }}
                      >
                        PROTECTED REPO
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 20,
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        180 TB
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--muted)",
                          marginTop: 2,
                        }}
                      >
                        Immutable WORM
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
                          fontSize: 9,
                          color: "var(--muted)",
                          marginBottom: 4,
                        }}
                      >
                        CROSS-TENANT ACCESS
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 20,
                          fontWeight: 600,
                          color: "#2e7d32",
                        }}
                      >
                        LOCKED
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--muted)",
                          marginTop: 2,
                        }}
                      >
                        Zero bleed
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
                          fontSize: 9,
                          color: "var(--muted)",
                          marginBottom: 4,
                        }}
                      >
                        BACKUP PLATFORM
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 16,
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        Commvault
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--muted)",
                          marginTop: 2,
                        }}
                      >
                        Direct API Ingest
                      </div>
                    </div>
                  </div>

                  {/* Tenant-Specific Isolation Ledger */}
                  <div
                    style={{
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--surface-raised, #f3f1f1)",
                      padding: "14px 16px",
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginBottom: 8,
                        borderBottom: "1px solid var(--border)",
                        paddingBottom: 4,
                      }}
                    >
                      TENANT PERMISSION & AUDIT BOUNDARY (EVIDENCE OF ISOLATION)
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.6 }}>
                      <div>• RBAC Scope: Operator #41 authenticated for MedHealth tenant only.</div>
                      <div>• Audit Trail: Cryptographically sealed with tenant key sha256:7b2c918a...</div>
                      <div>• Out-of-Scope Query: Attempt to query tenant #0841 from this session = <span style={{ color: "#d32f2f" }}>HARD 403 FORBIDDEN</span>.</div>
                      <div>• Client Report: Auto-generated client-facing PDF contains zero cross-tenant references.</div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* VIEW 3: CLIENT A (ISOLATED) */
                <motion.div
                  key="client-a"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                      borderBottom: "1px solid var(--border)",
                      paddingBottom: 12,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          letterSpacing: "0.08em",
                          color: "var(--orange, #f45532)",
                          fontWeight: 600,
                          display: "block",
                          marginBottom: 2,
                        }}
                      >
                        TENANT DETAIL · ENCLAVE #0841
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 18,
                          fontWeight: 600,
                          color: "var(--ink)",
                          margin: 0,
                        }}
                      >
                        MERIDIAN FINANCIAL [STRICT TENANT ISOLATION]
                      </h3>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        padding: "4px 8px",
                        backgroundColor: "rgba(165, 214, 167, 0.2)",
                        color: "#2e7d32",
                        fontWeight: 600,
                      }}
                    >
                      AIR-GAP VERIFIED
                    </span>
                  </div>

                  {/* 4 Isolated KPI Cards */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 12,
                      marginBottom: 24,
                    }}
                  >
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
                          fontSize: 9,
                          color: "var(--muted)",
                          marginBottom: 4,
                        }}
                      >
                        RTO POSTURE
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 20,
                          fontWeight: 600,
                          color: "#2e7d32",
                        }}
                      >
                        18m
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--muted)",
                          marginTop: 2,
                        }}
                      >
                        SLA target: 60m
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
                          fontSize: 9,
                          color: "var(--muted)",
                          marginBottom: 4,
                        }}
                      >
                        PROTECTED VMS
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 20,
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        34 VMs
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--muted)",
                          marginTop: 2,
                        }}
                      >
                        SQL Clusters
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
                          fontSize: 9,
                          color: "var(--muted)",
                          marginBottom: 4,
                        }}
                      >
                        DATA SEPARATION
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 20,
                          fontWeight: 600,
                          color: "#2e7d32",
                        }}
                      >
                        ISOLATED
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--muted)",
                          marginTop: 2,
                        }}
                      >
                        Zero bleed
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
                          fontSize: 9,
                          color: "var(--muted)",
                          marginBottom: 4,
                        }}
                      >
                        BACKUP PLATFORM
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 16,
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        Veeam B&R
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--muted)",
                          marginTop: 2,
                        }}
                      >
                        v12 Direct Ingest
                      </div>
                    </div>
                  </div>

                  {/* Tenant-Specific Isolation Ledger */}
                  <div
                    style={{
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--surface-raised, #f3f1f1)",
                      padding: "14px 16px",
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginBottom: 8,
                        borderBottom: "1px solid var(--border)",
                        paddingBottom: 4,
                      }}
                    >
                      TENANT PERMISSION & AUDIT BOUNDARY (EVIDENCE OF ISOLATION)
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.6 }}>
                      <div>• RBAC Scope: Operator #19 authenticated for Meridian tenant only.</div>
                      <div>• Audit Trail: Cryptographically sealed with tenant key sha256:4a9fe312...</div>
                      <div>• Air-Gap Validation: External immutable replica hash matches primary storage catalog.</div>
                      <div>• Client Report: Auto-generated client-facing PDF contains zero cross-tenant references.</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Proof Strip */}
            <div
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 11,
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                color: "var(--muted)",
              }}
            >
              <span>ONE CONSOLE FOR OPERATORS · ZERO BLEED FOR CLIENTS</span>
              <span style={{ color: "var(--orange, #f45532)", fontWeight: 600 }}>
                {selectedView === "all" ? "SHOWING FLEET AGGREGATE" : "SHOWING STRICT TENANT ISOLATION"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
