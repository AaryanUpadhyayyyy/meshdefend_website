"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SOLUTION } from "@/lib/sections";
import { TechIndexTag } from "@/components/ui/TechIndexTag";
import { NumberCounter } from "@/components/motion/NumberCounter";

interface CapabilityDetail {
  num: string;
  capability: string;
  tag: string;
  solves: string;
  href: string;
  summary: string;
  command: string;
  status: string;
  statusType: "success" | "warning" | "active";
  metrics: { label: string; value: string }[];
  proofPoints: string[];
  ctaLabel: string;
}

const CAPABILITY_DETAILS: CapabilityDetail[] = [
  {
    num: "01",
    capability: "Unified Resilience Observability",
    tag: "CROSS-ESTATE",
    solves: "Siloed visibility, fragmented reporting, multi-vendor sprawl",
    href: "/platform#observability",
    summary:
      "Continuous topology and state synchronization across backup, storage, cloud, and security silos into a single, queryable Resilience Graph.",
    command: "resoc.observability --scan=heterogeneous-estate",
    status: "Topology synchronized · 4,820 workloads mapped",
    statusType: "success",
    metrics: [
      { label: "Cross-Stack Coverage", value: "100%" },
      { label: "Platforms Reconciled", value: "5 Vendors" },
      { label: "Telemetry Latency", value: "< 2s" },
    ],
    proofPoints: [
      "Commvault (1,840 VMs) & Veeam (1,210 DBs) mapped in real-time topology",
      "AWS & Azure cloud backups reconciled against ServiceNow CMDB continuously",
      "Real-time drift detection across backup schedules and retention rules",
    ],
    ctaLabel: "Explore Observability Architecture →",
  },
  {
    num: "02",
    capability: "Backup and Recovery Operations",
    tag: "OPERATED FABRIC",
    solves: "Manual operational effort, heterogeneous environments, repetitive L1/L2 work",
    href: "/platform#backup-operations",
    summary:
      "Operate complex multi-platform estates from a single console. Automate daily housekeeping, SLA tracking, and job health without vendor hopping.",
    command: "resoc.ops.reconcile --estate=acme-global-prod",
    status: "SLA compliance: 99.98% · 24 drifts auto-normalized",
    statusType: "success",
    metrics: [
      { label: "Automation Rate", value: "92%" },
      { label: "Daily Hours Saved", value: "4.5h / admin" },
      { label: "Policy Drift", value: "0 Unresolved" },
    ],
    proofPoints: [
      "24 drifted backup windows auto-normalized without human ticket escalation",
      "Automated cross-vendor policy alignment across VMware and Kubernetes",
      "Daily backup health briefs synthesized and delivered directly to Slack & ITSM",
    ],
    ctaLabel: "Inspect Operations Engine →",
  },
  {
    num: "03",
    capability: "Agentic Incident Resolution",
    tag: "L1-L3 TRIAGE",
    solves: "Slow investigation, fragmented context, specialist dependency, L1/L2/L3 handoffs",
    href: "/platform#incident-resolution",
    summary:
      "Agent Mesh™ investigates backup and replication failures in real time, correlates logs across infrastructure, and proposes verified remediation plans.",
    command: "mesh.agent.triage --incident=INC-8912 --target=payments-db",
    status: "Root cause isolated · Human sign-off staged",
    statusType: "warning",
    metrics: [
      { label: "Investigation Time", value: "< 60s" },
      { label: "Context Retention", value: "100%" },
      { label: "MTTR Reduction", value: "Up to 80%" },
    ],
    proofPoints: [
      "Root cause traced: stale SAN snapshot lock blocked DataDomain replication",
      "Pre-assembled diagnostic bundle sent to Backup Admin with complete timeline",
      "Remediation plan ready with human authorization gate: [ Authorize CHG ]",
    ],
    ctaLabel: "See Guided Remediation Flow →",
  },
  {
    num: "04",
    capability: "Agentic Automation",
    tag: "POLICY-BOUND",
    solves: "Brittle scripts, maintenance-heavy workflows, changing infrastructure",
    href: "/platform#automation",
    summary:
      "Eliminate brittle custom scripts. ResOC executes declarative, policy-enforced playbooks that adapt dynamically to infrastructure changes.",
    command: "resoc.playbook.execute --policy=SEC-FAILOVER-04",
    status: "Policy verified · Dual-operator gated",
    statusType: "active",
    metrics: [
      { label: "Custom Scripts", value: "0 Required" },
      { label: "Human Verification", value: "Enforced" },
      { label: "Workflow Reliability", value: "99.9%" },
    ],
    proofPoints: [
      "Zero shell scripts to maintain; playbooks bind directly to platform APIs",
      "Pre-flight dependency validation prevents partial or broken failovers",
      "Complete cryptographic audit log generated for change management compliance",
    ],
    ctaLabel: "View Codeless Playbooks →",
  },
  {
    num: "05",
    capability: "Cyber Recovery",
    tag: "PROOF-BACKED",
    solves: "Low recovery confidence, unproven RTO/RPO, unverified recovery readiness",
    href: "/platform#cyber-resilience",
    summary:
      "Continuous recovery validation in isolated clean rooms. Turn recovery assumptions into mathematically verified, board-ready evidence.",
    command: "resoc.cyber.verify --app=ledger-core --cleanroom=isolated-vnet",
    status: "Recovery verified · Passed in 4m 12s",
    statusType: "success",
    metrics: [
      { label: "Verified RTO", value: "4m 12s" },
      { label: "Untested Gaps", value: "0 Detected" },
      { label: "Attestation", value: "Board-Ready" },
    ],
    proofPoints: [
      "Automated malware sweep completed on isolated replica snapshot",
      "Application consistency checks passed: 0 corrupted tables, verified RPO: 12s",
      "Signed recovery readiness certificate generated for CISO & insurers",
    ],
    ctaLabel: "Explore Cyber Recovery Proofs →",
  },
];

function CapabilityIcon({ idx, size = 20 }: { idx: number; size?: number }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (idx) {
    case 0:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <line x1="12" y1="2" x2="12" y2="12" />
        </svg>
      );
    case 1:
      return (
        <svg {...props}>
          <rect x="2" y="4" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="8" x2="6.01" y2="8" strokeWidth="2.5" />
          <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2.5" />
        </svg>
      );
    case 2:
      return (
        <svg {...props}>
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2.5" />
          <path d="M12 7.5v3.5" />
          <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth="2.5" />
          <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="2.5" />
        </svg>
      );
    case 3:
      return (
        <svg {...props}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 4:
      return (
        <svg {...props}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <circle cx="12" cy="16" r="1" strokeWidth="2" />
        </svg>
      );
    default:
      return null;
  }
}

export function SolutionSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CAPABILITY_DETAILS.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const active = CAPABILITY_DETAILS[activeIdx];

  return (
    <section
      id="solution"
      style={{
        padding: "88px 0 100px",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            maxWidth: 860,
            marginBottom: 44,
          }}
        >
          <TechIndexTag
            tag="[03 // RESOC ARCHITECTURE & CAPABILITIES]"
            status="AGENT_MESH™_CORE"
            style={{ marginBottom: 16 }}
          />

          <h2
            className="display"
            style={{
              fontSize: "clamp(34px, 4.4vw, 62px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              marginBottom: 16,
              color: "var(--ink)",
            }}
          >
            {SOLUTION.headline}
          </h2>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "68ch",
              margin: 0,
            }}
          >
            {SOLUTION.lede}
          </p>
        </div>

        {/* ─── STRUCTURAL MASTER-DETAIL ARCHITECTURAL CONSOLE ─── */}
        <div
          className="solution-structural-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1.25fr",
            gap: 28,
            alignItems: "stretch",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Column: Interactive Capability Cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "var(--muted)",
                textTransform: "uppercase",
                marginBottom: 6,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>5 CORE ARCHITECTURAL CAPABILITIES</span>
              <span style={{ fontSize: 10, opacity: 0.7 }}>SELECT TO INSPECT</span>
            </div>

            {CAPABILITY_DETAILS.map((item, idx) => {
              const isSelected = activeIdx === idx;

              return (
                <button
                  type="button"
                  key={item.num}
                  onClick={() => {
                    setActiveIdx(idx);
                    setIsPaused(true);
                  }}
                  onMouseEnter={() => {
                    setActiveIdx(idx);
                    setIsPaused(true);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    padding: "16px 20px",
                    background: isSelected ? "var(--bg)" : "transparent",
                    border: "1px solid",
                    borderColor: isSelected ? "var(--border)" : "transparent",
                    borderLeft: isSelected ? "3px solid var(--orange)" : "3px solid transparent",
                    borderRadius: 4,
                    position: "relative",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.18s ease",
                  }}
                  className={`capability-nav-card ${isSelected ? "selected" : ""}`}
                >
                  {/* Icon + Number Badge */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      minWidth: 32,
                      paddingTop: 2,
                    }}
                  >
                    <div
                      style={{
                        color: isSelected ? "var(--orange)" : "var(--muted)",
                        transition: "color 0.2s",
                      }}
                    >
                      <CapabilityIcon idx={idx} size={22} />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 10.5,
                        color: isSelected ? "var(--ink)" : "var(--muted)",
                        fontWeight: 700,
                      }}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* Title + Tag + Problem Solved */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                      <span
                        style={{
                          fontFamily: "var(--font-display), Georgia, serif",
                          fontSize: 18,
                          fontWeight: 500,
                          color: "var(--ink)",
                          letterSpacing: "-0.02em",
                          lineHeight: 1.25,
                        }}
                      >
                        {item.capability}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 9.5,
                          padding: "2px 6px",
                          borderRadius: 2,
                          background: isSelected ? "var(--surface)" : "var(--border)",
                          color: isSelected ? "var(--ink)" : "var(--muted)",
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: 12.5,
                        color: "var(--muted)",
                        margin: 0,
                        lineHeight: 1.45,
                      }}
                    >
                      <span style={{ fontWeight: 600, color: isSelected ? "var(--ink)" : "var(--muted)" }}>Solves: </span>
                      {item.solves}
                    </p>
                  </div>

                  {/* Chevron Indicator */}
                  <div
                    style={{
                      alignSelf: "center",
                      color: isSelected ? "var(--orange)" : "var(--border)",
                      transform: isSelected ? "translateX(2px)" : "translateX(0)",
                      transition: "all 0.2s ease",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    →
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Architectural Preview Console (100% PAPER-CONSISTENT, ZERO BLACK BOXES) */}
          <div
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: 0,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* Console Header Bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 20px",
                borderBottom: "1px solid var(--border)",
                background: "var(--surface)",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Window Dots */}
                <div style={{ display: "flex", gap: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--border)" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--border)" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--border)" }} />
                </div>
                <span style={{ color: "var(--ink)", fontWeight: 600, letterSpacing: "0.04em" }}>
                  RESOC CONSOLE · ARCHITECTURE PREVIEW
                </span>
              </div>

              {/* Status Indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--orange)",
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.08em" }}>
                  OPERATIONAL · {active.num}/05
                </span>
              </div>
            </div>

            {/* Console Body with Smooth Paper-Consistent Crossfade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.num}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: "24px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  flex: 1,
                }}
              >
                {/* Command Bar: Kept 100% on --surface (#f3f1f1) with --ink text and 1px hairline */}
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "var(--orange)", fontWeight: 700 }}>$</span>
                    <span style={{ color: "var(--ink)", fontWeight: 500 }}>{active.command}</span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      style={{
                        display: "inline-block",
                        width: 6,
                        height: 12,
                        background: "var(--orange)",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 10.5,
                      color: "var(--muted)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {active.status}
                  </span>
                </div>

                {/* Capability Focus Overview */}
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: 22,
                      fontWeight: 500,
                      color: "var(--ink)",
                      margin: "0 0 8px 0",
                      lineHeight: 1.25,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {active.capability}
                  </h3>
                  <p
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: "var(--muted)",
                      margin: 0,
                    }}
                  >
                    {active.summary}
                  </p>
                </div>

                {/* Telemetry Metric Tiles: Pure Paper & Ink (Clean Instrument Serif 32px, NO Progress Bars) */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 12,
                  }}
                >
                  {active.metrics.map((m) => (
                    <div
                      key={m.label}
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 4,
                        padding: "16px 16px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                          fontSize: 32,
                          lineHeight: 1,
                          color: "var(--ink)",
                          letterSpacing: "-0.02em",
                          marginBottom: 6,
                        }}
                      >
                        <NumberCounter value={m.value} />
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-body), Inter, sans-serif",
                          fontSize: 12,
                          color: "var(--muted)",
                          lineHeight: 1.35,
                        }}
                      >
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Architecture Verification (Clean Sentence-Case Editorial Labels) */}
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    padding: "16px 18px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--ink)",
                        fontWeight: 600,
                      }}
                    >
                      Architecture verification
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        color: "var(--muted)",
                      }}
                    >
                      Policy-governed autonomy
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    {active.proofPoints.map((point) => (
                      <div
                        key={point}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          fontSize: 12.5,
                          color: "var(--ink)",
                          lineHeight: 1.45,
                        }}
                      >
                        <span
                          style={{
                            color: "var(--orange)",
                            fontWeight: 700,
                            fontSize: 13,
                            lineHeight: 1,
                            marginTop: 1,
                          }}
                        >
                          ✓
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <a
                    href={active.href}
                    className="btn btn-primary"
                    style={{
                      fontSize: 13,
                      padding: "9px 20px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    {active.ctaLabel}
                  </a>

                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 11,
                      color: "var(--muted)",
                    }}
                  >
                    Policy-bound · Audit-ready evidence
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Progress Bar showing cycle timing */}
            <div
              style={{
                height: 2,
                background: "var(--border)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                key={activeIdx}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "100%",
                  background: "var(--orange)",
                  animation: !isPaused ? "progressBar 6.5s linear" : "none",
                  transformOrigin: "left",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progressBar {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .capability-nav-card:hover {
          background: var(--bg) !important;
          border-color: var(--border) !important;
        }

        @media (max-width: 980px) {
          .solution-structural-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
