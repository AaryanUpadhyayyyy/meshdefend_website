"use client";

import { useState } from "react";
import { SpringReveal } from "@/components/motion/SpringReveal";

const VENDORS = [
  { name: "Commvault", y: 50, status: "Healthy · 620 jobs synced" },
  { name: "Veeam", y: 110, status: "Exception detected · Lock contention", hasAlert: true },
  { name: "Dell PowerProtect Data Manager", y: 170, status: "Healthy · 480 jobs synced" },
  { name: "Dell NetWorker", y: 230, status: "Healthy · 310 jobs synced" },
];

const MILESTONES = [
  { id: "health", label: "Health", x: 380, desc: "Cross-engine protection status normalized into single state model" },
  { id: "exceptions", label: "Exceptions", x: 490, desc: "Upstream signal correlation filters out routine successful jobs" },
  { id: "triage", label: "Triage", x: 600, desc: "Context-assembled diagnostics combining storage, change tickets & RPO" },
  { id: "remediation", label: "Remediation", x: 710, desc: "Guided action plans staged for operator verification" },
  { id: "audit", label: "Audit Trail", x: 820, desc: "Immutable cryptographic ledger of recommendations & human sign-offs" },
  { id: "readiness", label: "Recovery Readiness", x: 940, desc: "Application-level recovery verification beyond raw backup success" },
];

export function BackupHeroFold() {
  const [activeMilestone, setActiveMilestone] = useState<string | null>(null);

  return (
    <section
      id="hero"
      style={{
        padding: "132px 0 96px",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div className="container">
        <SpringReveal>
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                background: "var(--orange)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body), Inter, sans-serif",
                fontSize: 13,
                color: "var(--muted)",
                letterSpacing: "-0.01em",
              }}
            >
              Platform · Backup Operations
            </span>
          </div>

          {/* Figure Caption */}
          <div
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--muted)",
              textTransform: "uppercase",
              marginBottom: 24,
              fontWeight: 600,
            }}
          >
            FIG. 1 — ONE OPERATIONAL LAYER ACROSS HETEROGENEOUS BACKUP ENGINES
          </div>

          {/* Display H1 */}
          <h1
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(48px, 5.4vw, 80px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              fontWeight: 400,
              maxWidth: "20ch",
              margin: "0 0 28px 0",
            }}
          >
            Stop jumping between consoles and second-guessing your recovery readiness.
          </h1>

          {/* Lead Hook */}
          <p
            style={{
              fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
              fontSize: "clamp(18px, 2vw, 20px)",
              lineHeight: 1.55,
              fontWeight: 500,
              color: "var(--ink)",
              maxWidth: "68ch",
              margin: "0 0 56px 0",
            }}
          >
            MeshDefend does not replace the backup engines you already trust. It operates the space between them—turning separate job monitors into one governed workflow for health, triage, remediation, and readiness.
          </p>

          {/* ─── SVG STREAM CONVERGENCE ANIMATION ─── */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              borderRadius: 4,
              padding: "28px 24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Header meta */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid var(--border)",
                paddingBottom: 16,
                marginBottom: 24,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                MULTI-VENDOR INGESTION → SINGLE GOVERNED OPERATIONAL SPINE
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                LIVE STREAM · SYNCHRONIZED
              </span>
            </div>

            {/* SVG Visual Stage */}
            <div style={{ width: "100%", overflowX: "auto" }}>
              <svg
                viewBox="0 0 1020 280"
                style={{ width: "100%", minWidth: 840, height: "auto", display: "block" }}
                aria-label="Backup Engine Convergence into MeshDefend Spine"
              >
                <defs>
                  {/* Subtle Grid Pattern */}
                  <pattern id="heroGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="20" y2="0" stroke="rgba(34,31,34,0.03)" strokeWidth="0.5" />
                    <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(34,31,34,0.03)" strokeWidth="0.5" />
                  </pattern>
                </defs>

                <rect width="1020" height="280" fill="url(#heroGrid)" />

                {/* 4 Feeder Vendor Tracks on Left */}
                {VENDORS.map((v) => (
                  <g key={v.name}>
                    {/* Vendor Label */}
                    <text
                      x="16"
                      y={v.y + 4}
                      fontFamily="var(--font-mono), monospace"
                      fontSize="11"
                      fontWeight="600"
                      fill="var(--ink)"
                      letterSpacing="0.02em"
                    >
                      {v.name}
                    </text>

                    {/* Status hint */}
                    <text
                      x="16"
                      y={v.y + 18}
                      fontFamily="var(--font-mono), monospace"
                      fontSize="9"
                      fill={v.hasAlert ? "var(--orange)" : "var(--muted)"}
                      opacity={0.85}
                    >
                      {v.status}
                    </text>

                    {/* Vendor Initial Horizontal Line */}
                    <line
                      x1="210"
                      y1={v.y}
                      x2="250"
                      y2={v.y}
                      stroke="var(--border)"
                      strokeWidth="1.2"
                    />

                    {/* Curve to Converge Point (330, 140) */}
                    <path
                      d={`M 250 ${v.y} C 290 ${v.y}, 300 140, 330 140`}
                      fill="none"
                      stroke={v.hasAlert ? "var(--orange)" : "var(--border)"}
                      strokeWidth={v.hasAlert ? "1.5" : "1.2"}
                      strokeDasharray={v.hasAlert ? "none" : "3,3"}
                    />
                  </g>
                ))}

                {/* Convergence Hub Node */}
                <circle cx="330" cy="140" r="4.5" fill="var(--ink)" />
                <circle cx="330" cy="140" r="8" fill="none" stroke="var(--border)" strokeWidth="1" />

                {/* The Central Unified Operational Spine */}
                <line
                  x1="330"
                  y1="140"
                  x2="980"
                  y2="140"
                  stroke="var(--ink)"
                  strokeWidth="2"
                />

                {/* Flowing Signal Beads on Vendors */}
                {/* Commvault normal bead */}
                <circle cx="230" cy="50" r="2.5" fill="var(--ink)">
                  <animate attributeName="cx" from="210" to="250" dur="2.4s" repeatCount="indefinite" />
                </circle>

                {/* Veeam exception bead (orange pulse) */}
                <circle cx="230" cy="110" r="3.5" fill="var(--orange)">
                  <animate attributeName="cx" from="210" to="250" dur="1.8s" repeatCount="indefinite" />
                </circle>

                {/* Dell Data Manager bead */}
                <circle cx="230" cy="170" r="2.5" fill="var(--ink)">
                  <animate attributeName="cx" from="210" to="250" dur="2.8s" repeatCount="indefinite" />
                </circle>

                {/* Dell NetWorker bead */}
                <circle cx="230" cy="230" r="2.5" fill="var(--ink)">
                  <animate attributeName="cx" from="210" to="250" dur="3.2s" repeatCount="indefinite" />
                </circle>

                {/* Pulse traveling through central spine */}
                <circle cx="330" cy="140" r="4" fill="var(--orange)">
                  <animate attributeName="cx" from="330" to="980" dur="3.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;1;0.9" dur="3.6s" repeatCount="indefinite" />
                </circle>

                {/* Milestones Along the Central Spine */}
                {MILESTONES.map((m, idx) => {
                  const isHovered = activeMilestone === m.id;

                  return (
                    <g
                      key={m.id}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setActiveMilestone(m.id)}
                      onMouseLeave={() => setActiveMilestone(null)}
                    >
                      {/* Vertical Hairline Tick */}
                      <line
                        x1={m.x}
                        y1="130"
                        x2={m.x}
                        y2="150"
                        stroke={isHovered ? "var(--orange)" : "var(--ink)"}
                        strokeWidth={isHovered ? "2.5" : "1.5"}
                        style={{ transition: "all 0.2s" }}
                      />

                      {/* Number Node */}
                      <circle
                        cx={m.x}
                        cy="140"
                        r={isHovered ? "5" : "3.5"}
                        fill={isHovered ? "var(--orange)" : "var(--bg)"}
                        stroke={isHovered ? "var(--orange)" : "var(--ink)"}
                        strokeWidth="1.5"
                      />

                      {/* Label Above / Below Alternating */}
                      <text
                        x={m.x}
                        y={idx % 2 === 0 ? 112 : 172}
                        textAnchor="middle"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="11"
                        fontWeight="600"
                        fill={isHovered ? "var(--orange)" : "var(--ink)"}
                        letterSpacing="0.04em"
                      >
                        {m.label}
                      </text>

                      {/* Step Number */}
                      <text
                        x={m.x}
                        y={idx % 2 === 0 ? 98 : 186}
                        textAnchor="middle"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="9"
                        fill="var(--muted)"
                      >
                        0{idx + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Interactive Milestone Explanation Drawer */}
            <div
              style={{
                marginTop: 20,
                padding: "14px 18px",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--orange)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {activeMilestone
                    ? `STAGE 0${MILESTONES.findIndex((m) => m.id === activeMilestone) + 1} // ${MILESTONES.find((m) => m.id === activeMilestone)?.label.toUpperCase()}`
                    : "HOVER MILESTONE // INTERACTIVE WORKFLOW TRACE"}
                </span>
                <span style={{ color: "var(--border)" }}>|</span>
                <span
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 13.5,
                    color: "var(--ink)",
                  }}
                >
                  {activeMilestone
                    ? MILESTONES.find((m) => m.id === activeMilestone)?.desc
                    : "Click or hover any of the 6 spine stages above to inspect how raw engine jobs become verifiable recovery posture."}
                </span>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                Unified ResOC Fabric
              </span>
            </div>
          </div>
        </SpringReveal>
      </div>
    </section>
  );
}
