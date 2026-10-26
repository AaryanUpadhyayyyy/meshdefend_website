"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function RollupConsoleHeroFold() {
  const [selectedClient, setSelectedClient] = useState<"A" | "B" | "C">("B");
  const [hoveredClient, setHoveredClient] = useState<"A" | "B" | "C" | null>(null);

  const activeClient = hoveredClient || selectedClient;

  const clientDetails = {
    A: {
      name: "Client A — Meridian Financial",
      engine: "Veeam Backup & Replication",
      workload: "34 VMware VMs & SQL Cluster",
      sla: "99.9% RTO Verified",
      storage: "Immutable AWS S3 Object Lock (WORM)",
      isolation: "Enclave #0841 · Tenant Key: sha256:4a9f...",
      status: "HEALTHY",
      statusColor: "#a5d6a7",
    },
    B: {
      name: "Client B — MedHealth Group",
      engine: "Commvault Complete",
      workload: "180 TB Electronic Health Records",
      sla: "100% HIPAA Compliance Pass",
      storage: "Dell Data Domain DD6900 + Air Gap",
      isolation: "Enclave #0912 · Tenant Key: sha256:7b2c...",
      status: "POLICY ACTIVE",
      statusColor: "var(--orange, #f45532)",
    },
    C: {
      name: "Client C — Apex Retail Logistics",
      engine: "Dell PowerProtect Data Manager",
      workload: "28 PostgreSQL & SAP Instances",
      sla: "15m RPO Guarantee Met",
      storage: "Azure Blob Immutable + On-Prem WORM",
      isolation: "Enclave #1044 · Tenant Key: sha256:9e11...",
      status: "HEALTHY",
      statusColor: "#a5d6a7",
    },
  };

  return (
    <section
      id="rollup-console-hero"
      aria-label="Solutions for Managed Service Providers: Rollup Console"
      style={{
        padding: "160px 0 100px",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Architectural Blueprint Grid */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.04,
        }}
      >
        <defs>
          <pattern
            id="msp-hero-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#msp-hero-grid)" />
      </svg>

      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative" }}
      >
        {/* Eyebrow & Status Flag */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 28,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 14,
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "var(--orange, #f45532)",
                fontWeight: 600,
              }}
            >
              [ SOLUTIONS · MANAGED SERVICE PROVIDERS ]
            </span>
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                display: "inline-block",
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
                letterSpacing: "0.06em",
                color: "var(--muted)",
              }}
            >
              MULTI-TENANT OPERATING LEVERAGE
            </span>
          </div>
        </div>

        {/* H1 Display Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 1100, marginBottom: 24 }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(46px, 6.4vw, 88px)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              fontWeight: 400,
              margin: 0,
            }}
          >
            One console. Every client.
            <br />
            <span style={{ color: "var(--orange, #f45532)", fontStyle: "italic" }}>
              Not a login per account.
            </span>
          </h1>
        </motion.div>

        {/* Hook and Lead Statement */}
        <div style={{ maxWidth: 860, marginBottom: 52 }}>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--muted)",
              margin: 0,
            }}
          >
            MeshDefend is built for the ratio that matters: more clients per technician. Manage
            multi-tenancy, per-client isolation, and rollup visibility from a single operational pane.
          </p>
        </div>

        {/* =================================================================== */}
        {/* INTERACTIVE COMPONENT: THE ROLLUP CONSOLE                           */}
        {/* =================================================================== */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--surface-raised, #f3f1f1)",
            position: "relative",
            padding: "36px 30px 44px",
          }}
        >
          {/* Top Node: Aggregate Operational Visibility */}
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              backgroundColor: "var(--dark, #221f22)",
              color: "#fefdfd",
              padding: "20px 24px",
              border: "1px solid rgba(254, 253, 253, 0.12)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              position: "relative",
              zIndex: 3,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(254, 253, 253, 0.12)",
                paddingBottom: 10,
                marginBottom: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    color: "#fefdfd",
                  }}
                >
                  AGGREGATE OPERATIONAL VISIBILITY (MSP MASTER CONSOLE)
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  padding: "2px 8px",
                  backgroundColor: "rgba(244, 85, 50, 0.2)",
                  color: "var(--orange, #f45532)",
                  fontWeight: 600,
                }}
              >
                FLEET ORCHESTRATOR
              </span>
            </div>

            {/* Quick Fleet Metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                textAlign: "left",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "rgba(254, 253, 253, 0.5)",
                    marginBottom: 2,
                  }}
                >
                  ACTIVE TENANTS
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#fefdfd",
                  }}
                >
                  50 Clients
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "rgba(254, 253, 253, 0.5)",
                    marginBottom: 2,
                  }}
                >
                  FLEET SLA ADHERENCE
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#a5d6a7",
                  }}
                >
                  99.8% Passed
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "rgba(254, 253, 253, 0.5)",
                    marginBottom: 2,
                  }}
                >
                  CROSS-CLIENT ANOMALIES
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--orange, #f45532)",
                  }}
                >
                  2 Triaged
                </div>
              </div>
            </div>
          </div>

          {/* SVG Branching Lines Dropping Down */}
          <div
            style={{
              width: "100%",
              height: 72,
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              viewBox="0 0 1000 72"
              fill="none"
              style={{
                width: "100%",
                height: "100%",
                maxWidth: 960,
                overflow: "visible",
              }}
            >
              {/* Central Spine */}
              <line
                x1="500"
                y1="0"
                x2="500"
                y2="20"
                stroke="var(--border)"
                strokeWidth="1.5"
              />

              {/* Branch Left to Client A */}
              <path
                d="M 500 20 C 500 48, 180 36, 180 72"
                stroke={
                  activeClient === "A"
                    ? "var(--orange, #f45532)"
                    : "var(--border)"
                }
                strokeWidth={activeClient === "A" ? 2 : 1}
                strokeDasharray={activeClient === "A" ? "none" : "3,3"}
                style={{ transition: "stroke 0.25s ease, stroke-width 0.25s ease" }}
              />

              {/* Branch Center to Client B */}
              <path
                d="M 500 20 L 500 72"
                stroke={
                  activeClient === "B"
                    ? "var(--orange, #f45532)"
                    : "var(--border)"
                }
                strokeWidth={activeClient === "B" ? 2 : 1}
                strokeDasharray={activeClient === "B" ? "none" : "3,3"}
                style={{ transition: "stroke 0.25s ease, stroke-width 0.25s ease" }}
              />

              {/* Branch Right to Client C */}
              <path
                d="M 500 20 C 500 48, 820 36, 820 72"
                stroke={
                  activeClient === "C"
                    ? "var(--orange, #f45532)"
                    : "var(--border)"
                }
                strokeWidth={activeClient === "C" ? 2 : 1}
                strokeDasharray={activeClient === "C" ? "none" : "3,3"}
                style={{ transition: "stroke 0.25s ease, stroke-width 0.25s ease" }}
              />

              {/* Animated active dots */}
              {activeClient === "A" && (
                <circle cx="180" cy="72" r="4" fill="var(--orange, #f45532)" />
              )}
              {activeClient === "B" && (
                <circle cx="500" cy="72" r="4" fill="var(--orange, #f45532)" />
              )}
              {activeClient === "C" && (
                <circle cx="820" cy="72" r="4" fill="var(--orange, #f45532)" />
              )}
            </svg>
          </div>

          {/* 3 Isolated Client Nodes Below */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Client A */}
            <div
              onMouseEnter={() => setHoveredClient("A")}
              onMouseLeave={() => setHoveredClient(null)}
              onClick={() => setSelectedClient("A")}
              style={{
                backgroundColor: "var(--bg, #fefdfd)",
                border:
                  activeClient === "A"
                    ? "1.5px solid var(--orange, #f45532)"
                    : "1px solid var(--border)",
                padding: "24px 20px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow:
                  activeClient === "A"
                    ? "0 4px 20px rgba(244, 85, 50, 0.08)"
                    : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 8,
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
                  Client A [Veeam]
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9,
                    padding: "2px 6px",
                    backgroundColor: "rgba(165, 214, 167, 0.2)",
                    color: "#2e7d32",
                    fontWeight: 600,
                  }}
                >
                  ISOLATED ENCLAVE
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 4,
                }}
              >
                Meridian Financial
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                  marginBottom: 12,
                }}
              >
                Engine: Veeam Backup & Replication
              </div>

              <div
                style={{
                  padding: "8px 10px",
                  backgroundColor: "var(--surface-raised, #f3f1f1)",
                  border: "1px solid var(--border)",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "var(--muted)",
                }}
              >
                ✓ Cryptographic Boundary · Zero Data Bleed
              </div>
            </div>

            {/* Client B */}
            <div
              onMouseEnter={() => setHoveredClient("B")}
              onMouseLeave={() => setHoveredClient(null)}
              onClick={() => setSelectedClient("B")}
              style={{
                backgroundColor: "var(--bg, #fefdfd)",
                border:
                  activeClient === "B"
                    ? "1.5px solid var(--orange, #f45532)"
                    : "1px solid var(--border)",
                padding: "24px 20px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow:
                  activeClient === "B"
                    ? "0 4px 20px rgba(244, 85, 50, 0.08)"
                    : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 8,
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
                  Client B [Commvault]
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9,
                    padding: "2px 6px",
                    backgroundColor: "rgba(244, 85, 50, 0.15)",
                    color: "var(--orange, #f45532)",
                    fontWeight: 600,
                  }}
                >
                  ISOLATED ENCLAVE
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 4,
                }}
              >
                MedHealth Group
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                  marginBottom: 12,
                }}
              >
                Engine: Commvault Complete
              </div>

              <div
                style={{
                  padding: "8px 10px",
                  backgroundColor: "var(--surface-raised, #f3f1f1)",
                  border: "1px solid var(--border)",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "var(--muted)",
                }}
              >
                ✓ Cryptographic Boundary · Zero Data Bleed
              </div>
            </div>

            {/* Client C */}
            <div
              onMouseEnter={() => setHoveredClient("C")}
              onMouseLeave={() => setHoveredClient(null)}
              onClick={() => setSelectedClient("C")}
              style={{
                backgroundColor: "var(--bg, #fefdfd)",
                border:
                  activeClient === "C"
                    ? "1.5px solid var(--orange, #f45532)"
                    : "1px solid var(--border)",
                padding: "24px 20px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow:
                  activeClient === "C"
                    ? "0 4px 20px rgba(244, 85, 50, 0.08)"
                    : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 8,
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
                  Client C [Dell PowerProtect]
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9,
                    padding: "2px 6px",
                    backgroundColor: "rgba(165, 214, 167, 0.2)",
                    color: "#2e7d32",
                    fontWeight: 600,
                  }}
                >
                  ISOLATED ENCLAVE
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 4,
                }}
              >
                Apex Retail Logistics
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                  marginBottom: 12,
                }}
              >
                Engine: Dell PowerProtect Data Manager
              </div>

              <div
                style={{
                  padding: "8px 10px",
                  backgroundColor: "var(--surface-raised, #f3f1f1)",
                  border: "1px solid var(--border)",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "var(--muted)",
                }}
              >
                ✓ Cryptographic Boundary · Zero Data Bleed
              </div>
            </div>
          </div>

          {/* Active Client Inspection Inspector */}
          <div
            style={{
              marginTop: 24,
              padding: "16px 20px",
              backgroundColor: "var(--bg, #fefdfd)",
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
                INSPECTING TENANT:
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 12,
                  color: "var(--ink)",
                  fontWeight: 600,
                }}
              >
                {clientDetails[activeClient].name}
              </span>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              {clientDetails[activeClient].isolation} · {clientDetails[activeClient].sla}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
