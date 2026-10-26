"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LensId = "security" | "infra" | "compliance" | "leadership";

interface EnterpriseLens {
  id: LensId;
  team: string;
  lensLabel: string;
  badge: string;
  priority: string;
  questionAnswered: string;
  keyOutputs: string[];
}

const LENSES: EnterpriseLens[] = [
  {
    id: "security",
    team: "Security & CISO",
    lensLabel: "Security → Risk",
    badge: "BLAST RADIUS & EXPOSURE",
    priority: "Is the recovery point verified clean against dormant malware, and can Tier-0 services recover safely?",
    questionAnswered: "Zero-trust clean recovery point validation, ransomware IOC correlation, and minimum viable company (MVC) mapping.",
    keyOutputs: [
      "Continuous clean-point validation (0 dormant IOCs)",
      "Quarantine network isolation triggers",
      "Cryptographic Ed25519 HITL sign-off barriers",
    ],
  },
  {
    id: "infra",
    team: "Infrastructure & Backup",
    lensLabel: "Infrastructure → Operations",
    badge: "JOBS, APPLIANCES & STORAGE",
    priority: "Did the overnight backup jobs complete, are the deduplication appliances healthy, and why did that job fail?",
    questionAnswered: "Multi-vendor backup monitoring (Commvault, Veeam, Dell), automated root-cause analysis, and retry execution.",
    keyOutputs: [
      "Unified job stream across heterogeneous backup engines",
      "Automated L1/L2 failure categorization & triage",
      "Storage capacity & retention-lock threshold tracking",
    ],
  },
  {
    id: "compliance",
    team: "Compliance & Risk",
    lensLabel: "Compliance → Evidence",
    badge: "WORM AUDITS & REGULATION",
    priority: "Can we prove our recovery capability to external auditors (DORA, SEC 17a-4, NIS2) without compiling reports by hand?",
    questionAnswered: "Immutable cryptographic WORM audit trails, automated compliance attestation packs, and drift logs.",
    keyOutputs: [
      "DORA Article 11 & SEC Rule 17a-4 compliance packs",
      "Tamper-proof append-only cryptographic ledger",
      "Automated one-click examiner evidence exports",
    ],
  },
  {
    id: "leadership",
    team: "Executive Leadership & Board",
    lensLabel: "Leadership → Readiness",
    badge: "FINANCIAL & OPERATIONAL RISK",
    priority: "What is our actual recovery time objective in a crisis, and what is our enterprise business exposure today?",
    questionAnswered: "Executive recovery posture scoreboards, provable business-level RTO/RPO attestation, and downtime risk reduction.",
    keyOutputs: [
      "Single executive recovery posture scoreboard (0-100%)",
      "Financial exposure reduction benchmarks",
      "Verified cyber insurance attestation metrics",
    ],
  },
];

export function UnityPrismFold() {
  const [activeLens, setActiveLens] = useState<LensId>("security");
  const selected = LENSES.find((l) => l.id === activeLens)!;

  return (
    <section
      id="unity-prism"
      aria-label="Align the Enterprise, Not Just the Technology"
      style={{
        padding: "160px 0 100px",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blueprint Grid Canvas */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.35,
          zIndex: 0,
        }}
      >
        <defs>
          <pattern
            id="enterprise-grid-pattern"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#enterprise-grid-pattern)" />
      </svg>

      <div
        className="container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Eyebrow & Figure Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 32,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 14,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              fontWeight: 600,
              color: "var(--orange, #f45532)",
              letterSpacing: "0.06em",
            }}
          >
            [ SOLUTIONS · ENTERPRISES ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 1 — THE UNITY PRISM ARCHITECTURE
          </span>
        </div>

        {/* Display H1 & Verbatim Hook */}
        <div style={{ maxWidth: 1040, marginBottom: 54 }}>
          <h1
            style={{
              fontFamily:
                'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(46px, 5.5vw, 82px)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 20,
            }}
          >
            One enterprise. Different teams. One shared view of resilience.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: 820,
              margin: 0,
            }}
          >
            MeshDefend aligns a fragmented enterprise where security, infrastructure, operations,
            and compliance see the same environment through different priorities.
          </p>
        </div>

        {/* The Unity Prism Interactive Box */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              padding: "14px 24px",
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--surface-raised, #f7f6f5)",
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
                  display: "inline-block",
                  width: 7,
                  height: 7,
                  backgroundColor: "var(--orange, #f45532)",
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "0.04em",
                }}
              >
                THE UNITY PRISM // 4 ENTERPRISE PERSPECTIVES
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              CLICK A STAKEHOLDER NODE TO SWITCH OPERATIONAL LENS
            </span>
          </div>

          {/* Central Prism Visual Canvas */}
          <div
            style={{
              padding: "48px 32px",
              backgroundColor: "var(--bg)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 840,
                minHeight: 360,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* SVG Conduits connecting Center (420, 180) to 4 Nodes */}
              <svg
                width="100%"
                height="360"
                viewBox="0 0 840 360"
                fill="none"
                style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
              >
                {/* 4 Conduits */}
                <line
                  x1="420"
                  y1="180"
                  x2="160"
                  y2="75"
                  stroke={activeLens === "security" ? "var(--orange, #f45532)" : "var(--border)"}
                  strokeWidth={activeLens === "security" ? "2" : "1.2"}
                />
                <line
                  x1="420"
                  y1="180"
                  x2="680"
                  y2="75"
                  stroke={activeLens === "infra" ? "var(--orange, #f45532)" : "var(--border)"}
                  strokeWidth={activeLens === "infra" ? "2" : "1.2"}
                />
                <line
                  x1="420"
                  y1="180"
                  x2="160"
                  y2="285"
                  stroke={activeLens === "compliance" ? "var(--orange, #f45532)" : "var(--border)"}
                  strokeWidth={activeLens === "compliance" ? "2" : "1.2"}
                />
                <line
                  x1="420"
                  y1="180"
                  x2="680"
                  y2="285"
                  stroke={activeLens === "leadership" ? "var(--orange, #f45532)" : "var(--border)"}
                  strokeWidth={activeLens === "leadership" ? "2" : "1.2"}
                />

                {/* Animated Pulse traveling from Center to Active Lens */}
                <motion.circle
                  cx="420"
                  cy="180"
                  r="3.5"
                  fill="var(--orange, #f45532)"
                  animate={{
                    cx: activeLens === "security" ? [420, 160] : activeLens === "infra" ? [420, 680] : activeLens === "compliance" ? [420, 160] : [420, 680],
                    cy: activeLens === "security" ? [180, 75] : activeLens === "infra" ? [180, 75] : activeLens === "compliance" ? [180, 285] : [180, 285],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </svg>

              {/* Center Core Node: MeshDefend Operational Layer */}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  width: 210,
                  padding: "22px 18px",
                  backgroundColor: "var(--bg)",
                  border: "2px solid var(--ink)",
                  boxShadow: "0 0 0 4px rgba(34,31,34,0.04)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: "var(--orange, #f45532)",
                    letterSpacing: "0.06em",
                    marginBottom: 4,
                  }}
                >
                  [ SINGLE GROUND TRUTH ]
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 22,
                    color: "var(--ink)",
                    lineHeight: 1.15,
                    marginBottom: 4,
                  }}
                >
                  MeshDefend Layer
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--muted)",
                  }}
                >
                  Unified Resilience Operational Core
                </div>
              </div>

              {/* Node 1: Security -> Risk (Top-Left) */}
              <button
                onClick={() => setActiveLens("security")}
                style={{
                  position: "absolute",
                  left: "3%",
                  top: "8%",
                  zIndex: 3,
                  width: 210,
                  padding: "16px 14px",
                  backgroundColor: activeLens === "security" ? "var(--surface-raised, #faf9f8)" : "var(--bg)",
                  border: activeLens === "security" ? "1px solid var(--orange, #f45532)" : "1px solid var(--border)",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--orange, #f45532)", fontWeight: 600, marginBottom: 4 }}>
                  [ SECURITY → RISK ]
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 2 }}>
                  Security & CISO
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--muted)" }}>
                  Blast Radius & Exposure
                </div>
              </button>

              {/* Node 2: Infrastructure -> Operations (Top-Right) */}
              <button
                onClick={() => setActiveLens("infra")}
                style={{
                  position: "absolute",
                  right: "3%",
                  top: "8%",
                  zIndex: 3,
                  width: 210,
                  padding: "16px 14px",
                  backgroundColor: activeLens === "infra" ? "var(--surface-raised, #faf9f8)" : "var(--bg)",
                  border: activeLens === "infra" ? "1px solid var(--orange, #f45532)" : "1px solid var(--border)",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--orange, #f45532)", fontWeight: 600, marginBottom: 4 }}>
                  [ INFRA → OPERATIONS ]
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 2 }}>
                  Infrastructure & Backup
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--muted)" }}>
                  Jobs, Storage & Triage
                </div>
              </button>

              {/* Node 3: Compliance -> Evidence (Bottom-Left) */}
              <button
                onClick={() => setActiveLens("compliance")}
                style={{
                  position: "absolute",
                  left: "3%",
                  bottom: "8%",
                  zIndex: 3,
                  width: 210,
                  padding: "16px 14px",
                  backgroundColor: activeLens === "compliance" ? "var(--surface-raised, #faf9f8)" : "var(--bg)",
                  border: activeLens === "compliance" ? "1px solid var(--orange, #f45532)" : "1px solid var(--border)",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--orange, #f45532)", fontWeight: 600, marginBottom: 4 }}>
                  [ COMPLIANCE → EVIDENCE ]
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 2 }}>
                  Compliance & Audit
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--muted)" }}>
                  WORM Audit & DORA
                </div>
              </button>

              {/* Node 4: Leadership -> Readiness (Bottom-Right) */}
              <button
                onClick={() => setActiveLens("leadership")}
                style={{
                  position: "absolute",
                  right: "3%",
                  bottom: "8%",
                  zIndex: 3,
                  width: 210,
                  padding: "16px 14px",
                  backgroundColor: activeLens === "leadership" ? "var(--surface-raised, #faf9f8)" : "var(--bg)",
                  border: activeLens === "leadership" ? "1px solid var(--orange, #f45532)" : "1px solid var(--border)",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--orange, #f45532)", fontWeight: 600, marginBottom: 4 }}>
                  [ LEADERSHIP → READINESS ]
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 2 }}>
                  Leadership & Board
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--muted)" }}>
                  Provable RTO/RPO SLAs
                </div>
              </button>
            </div>
          </div>

          {/* Active Stakeholder Lens Footer Details */}
          <div
            style={{
              padding: "24px 28px",
              backgroundColor: "var(--surface-raised, #f7f6f5)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "var(--orange, #f45532)",
                  fontWeight: 600,
                  marginBottom: 6,
                  letterSpacing: "0.05em",
                }}
              >
                ACTIVE PERSPECTIVE // {selected.badge}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 6,
                }}
              >
                &ldquo;{selected.priority}&rdquo;
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  color: "var(--muted)",
                  lineHeight: 1.45,
                }}
              >
                {selected.questionAnswered}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {selected.keyOutputs.map((out, oIdx) => (
                <div
                  key={oIdx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--ink)",
                  }}
                >
                  <span style={{ color: "var(--orange, #f45532)" }}>▸</span>
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
