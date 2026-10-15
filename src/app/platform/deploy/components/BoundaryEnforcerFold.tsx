"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ConstraintId = "network-isolation" | "data-sovereignty" | "strict-rbac";

interface Constraint {
  id: ConstraintId;
  title: string;
  badge: string;
  lead: string;
  bullets: string[];
}

const CONSTRAINTS: Constraint[] = [
  {
    id: "network-isolation",
    title: "Network Isolation & Zero-Egress Firewalls",
    badge: "EGRESS CONSTRAINED",
    lead: "Deploy behind micro-segmented VLANs, edge packet filters, and strict forward proxies with zero inbound listening ports.",
    bullets: [
      "Broker functions with zero inbound open listening ports (prevents lateral scanning).",
      "Compatible with strict forward proxies requiring authenticated NTLM/Kerberos.",
      "Internal processing loop guarantees local analysis of sensitive telemetry.",
    ],
  },
  {
    id: "data-sovereignty",
    title: "Data Sovereignty & Geopolitical Pinning",
    badge: "JURISDICTION PINNED",
    lead: "Keep every catalog header, telemetry record, and WORM audit hash locked within your sovereign geopolitical boundaries.",
    bullets: [
      "Tenant-dedicated regional consensus nodes (EU-Frankfurt, US-East, AP-Singapore).",
      "Full compliance with GDPR Chapter V cross-border transfer restrictions.",
      "Customer-managed encryption keys (BYOK via AWS KMS, Azure Key Vault, or PKCS#11).",
    ],
  },
  {
    id: "strict-rbac",
    title: "Strict RBAC & Cryptographic Dual-Control",
    badge: "LEAST PRIVILEGE",
    lead: "Operate with read-only service accounts. No state-changing execution can bypass multi-signature operator sign-off.",
    bullets: [
      "Read-only API access to Commvault, Veeam, NetApp, and Dell backup media servers.",
      "Mandatory Ed25519 multi-signature gate for any recovery orchestration or snapshot action.",
      "SAML 2.0 / OIDC integration with mandatory FIDO2 hardware token step-up authentication.",
    ],
  },
];

export function BoundaryEnforcerFold() {
  const [activeConstraint, setActiveConstraint] =
    useState<ConstraintId>("network-isolation");

  const current = CONSTRAINTS.find((c) => c.id === activeConstraint)!;

  return (
    <section
      id="boundary-enforcer"
      aria-label="Deploy Without Compromising Constraints"
      style={{
        padding: "110px 0 120px",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
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
              letterSpacing: "0.05em",
            }}
          >
            [ SECURITY BOUNDARY ENFORCER ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 3 — CONSTRAINT-FIRST ARCHITECTURE
          </span>
        </div>

        {/* Verbatim Hook H3 & Context */}
        <div style={{ maxWidth: 940, marginBottom: 54 }}>
          <h2
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: "clamp(26px, 3vw, 36px)",
              lineHeight: 1.25,
              fontWeight: 600,
              color: "var(--ink)",
              marginBottom: 16,
              letterSpacing: "-0.015em",
            }}
          >
            &ldquo;Your constraints aren’t deployment exceptions. They’re deployment requirements.&rdquo;
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 17,
              lineHeight: 1.5,
              color: "var(--muted)",
              margin: 0,
              maxWidth: 780,
            }}
          >
            Enterprise evaluators rightly reject software that treats air-gaps, firewalls, and least-privilege
            controls as secondary afterthoughts. See how MeshDefend enforces constraints as foundational architecture.
          </p>
        </div>

        {/* Split Screen Layout: Left 5 Cols (Constraint Selector) / Right 7 Cols (Interactive SVG Boundary Enforcer) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Left Column: 5 Cols List */}
          <div
            style={{
              gridColumn: "span 5",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {CONSTRAINTS.map((c) => {
              const isActive = activeConstraint === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveConstraint(c.id)}
                  style={{
                    backgroundColor: isActive
                      ? "var(--surface-raised, #faf9f8)"
                      : "var(--bg)",
                    border: "1px solid var(--border)",
                    borderLeft: isActive
                      ? "3px solid var(--orange, #f45532)"
                      : "3px solid transparent",
                    padding: "24px 22px",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        color: isActive
                          ? "var(--orange, #f45532)"
                          : "var(--muted)",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                      }}
                    >
                      [ {c.badge} ]
                    </span>
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: isActive ? "var(--orange, #f45532)" : "var(--muted)",
                      }}
                    >
                      {isActive ? "ACTIVE ▶" : "SELECT"}
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 8,
                    }}
                  >
                    {c.title}
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 13,
                      lineHeight: 1.45,
                      color: "var(--muted)",
                      margin: 0,
                    }}
                  >
                    {c.lead}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: 7 Cols Sticky Interactive SVG Visualizer */}
          <div
            style={{
              gridColumn: "span 7",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg)",
              position: "sticky",
              top: 100,
            }}
          >
            {/* Visualizer Top Bar */}
            <div
              style={{
                padding: "14px 20px",
                borderBottom: "1px solid var(--border)",
                backgroundColor: "var(--surface-raised, #f7f6f5)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
                    fontFamily:
                      'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  LIVE SIMULATION // {current.badge}
                </span>
              </div>
              <span
                style={{
                  fontFamily:
                    'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  color: "var(--muted)",
                }}
              >
                BOUNDARY ENFORCEMENT ENGINE
              </span>
            </div>

            {/* Dynamic SVG Visual Canvas */}
            <div style={{ padding: "28px 24px", minHeight: 280 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeConstraint}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* SVG DIAGRAM 1: Network Isolation */}
                  {activeConstraint === "network-isolation" && (
                    <svg width="100%" height="220" viewBox="0 0 620 220" fill="none">
                      {/* Customer Internal Network */}
                      <rect x="10" y="20" width="280" height="180" stroke="var(--border)" fill="var(--surface-raised, #fbfaf9)" />
                      <text x="24" y="42" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600">
                        INTERNAL PERIMETER (NO WAN PORTS)
                      </text>

                      {/* Internal Broker Node */}
                      <rect x="30" y="65" width="230" height="50" stroke="var(--ink)" fill="var(--bg)" />
                      <text x="44" y="88" fill="var(--ink)" fontFamily="var(--font-body)" fontSize="12" fontWeight="600">
                        MeshDefend Local Broker
                      </text>
                      <text x="44" y="103" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="9">
                        Local Telemetry Parser · Zero Ingress
                      </text>

                      {/* Firewall Boundary Line */}
                      <line x1="330" y1="10" x2="330" y2="210" stroke="var(--orange, #f45532)" strokeWidth="2" strokeDasharray="4 4" />
                      <rect x="290" y="90" width="80" height="26" fill="var(--bg)" stroke="var(--orange, #f45532)" />
                      <text x="298" y="107" fill="var(--orange, #f45532)" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600">
                        FIREWALL
                      </text>

                      {/* Animated Packet Moving toward Firewall and Contained */}
                      <motion.circle
                        cx="180"
                        cy="150"
                        r="5"
                        fill="var(--orange, #f45532)"
                        initial={{ cx: 60, opacity: 0 }}
                        animate={{ cx: 310, opacity: [0, 1, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      />
                      <line x1="60" y1="150" x2="310" y2="150" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
                      <text x="60" y="142" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="8.5">
                        Internal Catalog Pulse (Local Only)
                      </text>

                      {/* External Zone: Blocked */}
                      <rect x="370" y="20" width="240" height="180" stroke="var(--border)" strokeDasharray="4 4" fill="var(--surface)" />
                      <text x="384" y="42" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="10">
                        EXTERNAL WAN ZONE
                      </text>
                      <text x="384" y="105" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">
                        [ ZERO INBOUND TRAFFIC ]
                      </text>
                      <text x="384" y="125" fill="var(--muted)" fontFamily="var(--font-body)" fontSize="10">
                        Egress filtered via strict forward proxy
                      </text>
                    </svg>
                  )}

                  {/* SVG DIAGRAM 2: Data Sovereignty */}
                  {activeConstraint === "data-sovereignty" && (
                    <svg width="100%" height="220" viewBox="0 0 620 220" fill="none">
                      {/* Sovereign Boundary Box */}
                      <rect x="20" y="20" width="580" height="180" stroke="var(--ink)" strokeWidth="1.5" fill="var(--surface-raised, #fbfaf9)" />
                      <text x="36" y="44" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">
                        SOVEREIGN REGIONAL ENCLAVE // JURISDICTION: EU-FRANKFURT-01
                      </text>

                      {/* 2 Internal Storage Nodes */}
                      <g transform="translate(40, 70)">
                        <rect x="0" y="0" width="240" height="50" stroke="var(--border)" fill="var(--bg)" />
                        <text x="14" y="24" fill="var(--ink)" fontFamily="var(--font-body)" fontSize="11.5" fontWeight="600">
                          Sovereign Telemetry Shard
                        </text>
                        <text x="14" y="38" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="9">
                          AES-256 Customer Key (BYOK)
                        </text>

                        <rect x="270" y="0" width="240" height="50" stroke="var(--border)" fill="var(--bg)" />
                        <text x="14" y="24" transform="translate(270, 0)" fill="var(--ink)" fontFamily="var(--font-body)" fontSize="11.5" fontWeight="600">
                          WORM Audit Ledger Node
                        </text>
                        <text x="14" y="38" transform="translate(270, 0)" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="9">
                          SEC Rule 17a-4 / DORA Sealed
                        </text>

                        {/* Lock Icon Center */}
                        <rect x="235" y="70" width="180" height="36" fill="var(--bg)" stroke="var(--orange, #f45532)" />
                        <text x="245" y="92" fill="var(--orange, #f45532)" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="600">
                          CROSS-BORDER EGRESS: 0 BPS
                        </text>
                      </g>
                    </svg>
                  )}

                  {/* SVG DIAGRAM 3: Strict RBAC */}
                  {activeConstraint === "strict-rbac" && (
                    <svg width="100%" height="220" viewBox="0 0 620 220" fill="none">
                      {/* Operator Request Box */}
                      <rect x="20" y="40" width="160" height="60" stroke="var(--border)" fill="var(--bg)" />
                      <text x="32" y="65" fill="var(--ink)" fontFamily="var(--font-body)" fontSize="11" fontWeight="600">
                        Operator Request
                      </text>
                      <text x="32" y="80" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="9">
                        State Change Trigger
                      </text>

                      {/* Cryptographic Gate */}
                      <rect x="230" y="25" width="170" height="90" stroke="var(--orange, #f45532)" strokeWidth="1.5" fill="var(--bg)" />
                      <text x="244" y="48" fill="var(--orange, #f45532)" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="600">
                        ED25519 HITL BARRIER
                      </text>
                      <text x="244" y="68" fill="var(--ink)" fontFamily="var(--font-body)" fontSize="11" fontWeight="600">
                        Dual Signatures Required
                      </text>
                      <text x="244" y="84" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="8.5">
                        M-of-N Quorum + FIDO2 Token
                      </text>

                      {/* Target Storage */}
                      <rect x="440" y="40" width="160" height="60" stroke="var(--border)" fill="var(--surface-raised, #fbfaf9)" />
                      <text x="452" y="65" fill="var(--ink)" fontFamily="var(--font-body)" fontSize="11" fontWeight="600">
                        Production Target
                      </text>
                      <text x="452" y="80" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="9">
                        Read-Only Scope Intact
                      </text>

                      {/* Connecting Arrows */}
                      <line x1="180" y1="70" x2="230" y2="70" stroke="var(--border)" strokeWidth="1.5" />
                      <line x1="400" y1="70" x2="440" y2="70" stroke="var(--orange, #f45532)" strokeWidth="1.5" strokeDasharray="3 3" />

                      <text x="170" y="150" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600">
                        [ NO AUTONOMOUS STATE CHANGES PERMITTED WITHOUT HUMAN KEY ]
                      </text>
                    </svg>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bullets Verification List */}
            <div
              style={{
                borderTop: "1px solid var(--border)",
                padding: "20px 24px",
                backgroundColor: "var(--surface-raised, #faf9f8)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {current.bullets.map((b, bIdx) => (
                <div
                  key={bIdx}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                    fontSize: 13,
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    color: "var(--ink)",
                  }}
                >
                  <span style={{ color: "var(--orange, #f45532)", fontSize: 11 }}>■</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
