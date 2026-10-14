"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PAIN } from "@/lib/sections";
import { MeshDefendBackground } from "@/components/hero/MeshDefendBackground";
import { TechIndexTag } from "@/components/ui/TechIndexTag";
import { AnimatedLaserBeam } from "@/components/motion/AnimatedLaserBeam";
import { MaskedLineReveal } from "@/components/motion/MaskedLineReveal";
import { SpringReveal } from "@/components/motion/SpringReveal";

export function PainSection() {
  const [activeToggle, setActiveToggle] = useState<"today" | "resoc">("today");
  const [selectedGap, setSelectedGap] = useState<number | null>(null);
  const [activePillar, setActivePillar] = useState<number>(0);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <section
      id="pain"
      style={{
        padding: "80px 0 96px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle Living Resilience Mesh Background */}
      <MeshDefendBackground variant="subtle" density="sparse" />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* ─── EDITORIAL HEADER WITH INSTANT MASKED LINE REVEAL ─── */}
        <div style={{ maxWidth: 980, marginBottom: 52 }}>
          <TechIndexTag
            tag="[02 // OPERATIONAL DISCONNECT & RECOVERY UNCERTAINTY]"
            status="4_UNOWNED_GAPS"
            style={{ marginBottom: 16 }}
          />

          <MaskedLineReveal
            as="h2"
            className="display"
            lines={[PAIN.headline]}
            style={{
              fontSize: "clamp(34px, 4.4vw, 58px)",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "var(--ink)",
            }}
          />

          <MaskedLineReveal
            as="div"
            lines={[PAIN.openingLine]}
            delay={0.15}
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(22px, 2.3vw, 30px)",
              fontStyle: "italic",
              color: "var(--orange)",
              letterSpacing: "-0.015em",
              lineHeight: 1.25,
              marginTop: 8,
            }}
          />

          <p
            style={{
              marginTop: 18,
              fontSize: 15.5,
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "76ch",
            }}
          >
            Every tool succeeds inside its own console. Yet enterprise recovery fails in the four unowned operational handoffs between backup, storage, cloud, posture, and change management.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PART A: INTERACTIVE 5-DOMAIN & 4-HANDOFF WORKBENCH
           ═══════════════════════════════════════════════════════════════ */}
        <SpringReveal>
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: 6,
              background: "var(--surface)",
              marginBottom: 72,
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Workbench Top Control Bar */}
            <div
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
                background: "var(--bg)",
              }}
            >
              {/* Tactile Toggle with layoutId sliding pill */}
              <div
                role="group"
                aria-label="Operating Model Comparison"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  padding: 3,
                  gap: 2,
                  position: "relative",
                }}
              >
                <button
                  type="button"
                  className="workbench-toggle-btn"
                  aria-pressed={activeToggle === "today"}
                  onClick={() => {
                    setActiveToggle("today");
                    setSelectedGap(null);
                  }}
                  style={{
                    position: "relative",
                    padding: "7px 16px",
                    borderRadius: 3,
                    fontSize: 12,
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontWeight: 600,
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    background: "transparent",
                    color: activeToggle === "today" ? "var(--orange)" : "var(--muted)",
                    transition: "color 0.2s ease",
                  }}
                >
                  {activeToggle === "today" && (
                    <motion.div
                      layoutId="painTogglePill"
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        borderRadius: 3,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                        zIndex: 0,
                      }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>Today · The 4 Unowned Gaps</span>
                </button>
                <button
                  type="button"
                  className="workbench-toggle-btn"
                  aria-pressed={activeToggle === "resoc"}
                  onClick={() => {
                    setActiveToggle("resoc");
                    setSelectedGap(null);
                  }}
                  style={{
                    position: "relative",
                    padding: "7px 16px",
                    borderRadius: 3,
                    fontSize: 12,
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontWeight: 600,
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    background: "transparent",
                    color: activeToggle === "resoc" ? "var(--ink)" : "var(--muted)",
                    transition: "color 0.2s ease",
                  }}
                >
                  {activeToggle === "resoc" && (
                    <motion.div
                      layoutId="painTogglePill"
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        borderRadius: 3,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                        zIndex: 0,
                      }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>With ResOC · Operated Fabric</span>
                </button>
              </div>

              {/* Status indicator */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                  letterSpacing: "0.04em",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: activeToggle === "today" ? "var(--orange)" : "#10b981",
                    display: "inline-block",
                    boxShadow: activeToggle === "today" ? "0 0 8px rgba(244, 85, 50, 0.5)" : "0 0 8px rgba(16, 185, 129, 0.5)",
                  }}
                />
                <span>
                  {activeToggle === "today"
                    ? "5 ISOLATED CONSOLES · 4 UNOWNED GAPS LEAKING"
                    : "UNIFIED AGENT MESH™ RESILIENCE FABRIC ACTIVE"}
                </span>
              </div>
            </div>

            {/* Glowing Laser Bus Line (When ResOC is Active) */}
            {activeToggle === "resoc" && (
              <div style={{ padding: "0 20px", background: "var(--bg)" }}>
                <AnimatedLaserBeam variant="horizontal" />
              </div>
            )}

            {/* 5-Column Architectural Grid */}
            <div
              className="workbench-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                background: "var(--bg)",
                position: "relative",
              }}
            >
              {PAIN.silos.map((silo, idx) => (
                <div
                  key={silo.id}
                  style={{
                    padding: "24px 20px",
                    borderRight: idx < 4 ? "1px solid var(--border)" : "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 260,
                    position: "relative",
                    background:
                      activeToggle === "resoc"
                        ? "rgba(244, 85, 50, 0.02)"
                        : "transparent",
                    transition: "background 0.25s ease",
                  }}
                >
                  {/* Fault line connector for "Today" */}
                  {activeToggle === "today" && idx < 4 && (
                    <div
                      style={{
                        position: "absolute",
                        right: -10,
                        top: "45%",
                        zIndex: 3,
                        transform: "translateY(-50%)",
                      }}
                      className="broken-fault-line"
                    >
                      <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
                        <path
                          d="M2 2L18 8L4 16L18 26"
                          stroke="var(--orange)"
                          strokeWidth="2"
                          strokeDasharray="3 3"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Column Meta */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10.5,
                          letterSpacing: "0.08em",
                          color: "var(--muted)",
                          fontWeight: 600,
                        }}
                      >
                        DOMAIN 0{idx + 1}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9.5,
                          padding: "2px 7px",
                          borderRadius: 3,
                          background:
                            activeToggle === "today"
                              ? "rgba(244, 85, 50, 0.08)"
                              : "rgba(16, 185, 129, 0.12)",
                          color:
                            activeToggle === "today"
                              ? "var(--orange)"
                              : "#059669",
                          fontWeight: 700,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {activeToggle === "today" ? "SILO" : "UNIFIED"}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginBottom: 4,
                        lineHeight: 1.25,
                      }}
                    >
                      {silo.title}
                    </h3>

                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: activeToggle === "today" ? "var(--orange)" : "var(--ink)",
                        marginBottom: 14,
                        fontWeight: 600,
                      }}
                    >
                      {silo.sub}
                    </div>

                    {/* Stack Detail */}
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--muted)",
                        lineHeight: 1.45,
                        paddingBottom: 16,
                        borderBottom: "1px solid var(--border)",
                        marginBottom: 16,
                      }}
                    >
                      {silo.detail}
                    </div>
                  </div>

                  {/* State Diagnostic */}
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 9.5,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: activeToggle === "today" ? "var(--orange)" : "var(--ink)",
                        marginBottom: 4,
                        fontWeight: 700,
                      }}
                    >
                      {activeToggle === "today" ? "Console Blindspot" : "ResOC Telemetry"}
                    </div>
                    <p
                      style={{
                        fontSize: 12,
                        lineHeight: 1.45,
                        color: activeToggle === "today" ? "var(--muted)" : "var(--ink)",
                        margin: 0,
                      }}
                    >
                      {activeToggle === "today" ? silo.todayState : silo.resocState}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 4 Interactive Handoff Connectors Track */}
            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: activeToggle === "today" ? "var(--orange)" : "var(--ink)",
                  }}
                >
                  {activeToggle === "today"
                    ? "FOUR OPERATIONAL HANDOFFS WHERE RESILIENCE LEAKS"
                    : "FOUR BRIDGED OPERATING CORRIDORS (BRIDGED BY AGENT MESH™)"}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10.5,
                    color: "var(--muted)",
                  }}
                >
                  Click any handoff to inspect forensic impact
                </span>
              </div>

              {/* 4 Interactive Gaps / Bridges with Laser Conduits */}
              <div
                className="handoff-gaps-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 12,
                }}
              >
                {PAIN.gaps.map((gap, gIdx) => {
                  const isSelected = selectedGap === gIdx;
                  return (
                    <button
                      key={gap.num}
                      type="button"
                      onClick={() => setSelectedGap(isSelected ? null : gIdx)}
                      style={{
                        textAlign: "left",
                        padding: "12px 14px",
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: isSelected
                          ? "var(--orange)"
                          : "var(--border)",
                        background: isSelected
                          ? "rgba(244, 85, 50, 0.08)"
                          : "var(--bg)",
                        cursor: "pointer",
                        outline: "none",
                        transition: "all 0.16s ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 4,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontSize: 10,
                            fontWeight: 700,
                            color:
                              activeToggle === "today"
                                ? "var(--orange)"
                                : "#059669",
                          }}
                        >
                          {activeToggle === "today" ? `GAP ${gap.num}` : `BRIDGE ${gap.num}`}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontSize: 9.5,
                            color: "var(--muted)",
                          }}
                        >
                          {gap.between}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          fontWeight: 600,
                          color: "var(--ink)",
                          lineHeight: 1.3,
                          marginBottom: 4,
                        }}
                      >
                        {gap.name}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--muted)",
                          lineHeight: 1.35,
                        }}
                      >
                        {activeToggle === "today" ? gap.todayRisk : gap.resocBridge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Diagnostic Banner */}
            <div
              style={{
                padding: "20px 24px",
                background: "var(--bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 20,
              }}
            >
              <div style={{ maxWidth: 820 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: activeToggle === "today" ? "var(--orange)" : "#10b981",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: activeToggle === "today" ? "var(--orange)" : "var(--ink)",
                    }}
                  >
                    {activeToggle === "today"
                      ? "RECOVERY RISK IN THE UNOWNED SPACE"
                      : "RESOC™ UNIFIED RESILIENCE FABRIC"}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    color: "var(--muted)",
                    margin: 0,
                  }}
                >
                  {activeToggle === "today"
                    ? "No vendor console holds this space. No single team owns it. Four operational handoffs where recovery context, RTO proofs, and runbooks silently drift until disaster strikes."
                    : "Same five enterprise tools. Nothing replaced. The space between them is now operated by Agent Mesh™ with continuous proof and policy-governed autonomy: human in the loop and human on the loop."}
                </p>
              </div>

              {/* Action CTA / Badges */}
              {activeToggle === "today" ? (
                <button
                  type="button"
                  onClick={() => setActiveToggle("resoc")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "9px 18px",
                    borderRadius: 5,
                    background: "var(--orange)",
                    color: "#fefdfd",
                    fontSize: 12.5,
                    fontWeight: 600,
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--ink)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--orange)";
                  }}
                >
                  Operate with ResOC →
                </button>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  {["HUMAN-APPROVED", "POLICY-BOUND", "AUDIT-READY", "ZERO DISRUPTION"].map((pill) => (
                    <span
                      key={pill}
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10,
                        padding: "5px 10px",
                        borderRadius: 3,
                        background: "rgba(244, 85, 50, 0.1)",
                        color: "var(--orange)",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </SpringReveal>

        {/* ═══════════════════════════════════════════════════════════════
            PART B: 3-PILLAR BENTO DIAGNOSTIC DECK WITH LIVE MICRO-HUD GRAPHICS
           ═══════════════════════════════════════════════════════════════ */}
        <div>
          {/* Header Title for Diagnostic Deck */}
          <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "var(--orange)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                DEEP OPERATIONAL DIAGNOSTICS
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "clamp(24px, 2.5vw, 34px)",
                  color: "var(--ink)",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                Three Architectural Failure Modes Across Enterprise Estates
              </h3>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              Interactive diagnostic breakdown
            </div>
          </div>

          {/* 3-Column Bento Grid */}
          <div
            className="bento-diagnostic-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {/* ── PILLAR 01: RECOVERY CONFIDENCE ── */}
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 6,
                background: "var(--bg)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              className="bento-pillar-card"
            >
              {/* Pillar Header */}
              <div style={{ padding: "20px 22px", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 32, color: "var(--orange)", lineHeight: 1 }}>
                    01
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: "var(--muted)", fontWeight: 600, letterSpacing: "0.08em" }}>
                    CONFIDENCE DEFICIT
                  </span>
                </div>
                <h4 style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>
                  Can we actually recover?
                </h4>
                <div style={{ fontSize: 12.5, fontStyle: "italic", color: "var(--muted)", fontFamily: 'var(--font-display), serif' }}>
                  “Confidence is assumed, not evidenced.”
                </div>
              </div>

              {/* Micro-HUD Telemetry Graphic: RPO/RTO Drift Gauge */}
              <div
                style={{
                  padding: "16px 20px",
                  background: "#1c1a1c",
                  color: "#fefdfd",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9.5, color: "#a09a9c", letterSpacing: "0.06em" }}>
                    HUD // RPO &amp; RTO DRIFT TELEMETRY
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, color: "var(--orange)", padding: "1px 5px", background: "rgba(244,85,50,0.15)", borderRadius: 2 }}>
                    DRIFT DETECTED
                  </span>
                </div>

                {/* Dual Telemetry Bars */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: 'var(--font-mono), monospace', marginBottom: 4 }}>
                      <span style={{ color: "#d5d2d3" }}>RPO Target: 15m</span>
                      <span style={{ color: "var(--orange)", fontWeight: 700 }}>Actual: 4h 12m (+16.8x)</span>
                    </div>
                    <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: "82%", height: "100%", background: "var(--orange)", borderRadius: 3 }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: 'var(--font-mono), monospace', marginBottom: 4 }}>
                      <span style={{ color: "#d5d2d3" }}>RTO Proof Drill</span>
                      <span style={{ color: "#eab308", fontWeight: 700 }}>92d Stale (Quarterly Gap)</span>
                    </div>
                    <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: "35%", height: "100%", background: "#eab308", borderRadius: 3 }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-Items List */}
              <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12, flexGrow: 1 }}>
                {PAIN.clusters[0].items.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      paddingBottom: 10,
                      borderBottom: "1px solid rgba(34, 31, 34, 0.06)",
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--orange)" }} />
                      {item.label}
                    </div>
                    <p style={{ fontSize: 12, color: "var(--muted)", margin: 0, paddingLeft: 10, lineHeight: 1.45 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── PILLAR 02: COMPLEXITY AT SCALE ── */}
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 6,
                background: "var(--bg)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              className="bento-pillar-card"
            >
              {/* Pillar Header */}
              <div style={{ padding: "20px 22px", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 32, color: "var(--orange)", lineHeight: 1 }}>
                    02
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: "var(--muted)", fontWeight: 600, letterSpacing: "0.08em" }}>
                    OPERATING SPRAWL
                  </span>
                </div>
                <h4 style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>
                  The estate outgrew the model.
                </h4>
                <div style={{ fontSize: 12.5, fontStyle: "italic", color: "var(--muted)", fontFamily: 'var(--font-display), serif' }}>
                  “More platforms, less of a single picture.”
                </div>
              </div>

              {/* Micro-HUD Telemetry Graphic: Multi-Vendor Sprawl Node Graph */}
              <div
                style={{
                  padding: "16px 20px",
                  background: "#1c1a1c",
                  color: "#fefdfd",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9.5, color: "#a09a9c", letterSpacing: "0.06em" }}>
                    HUD // SPRAWL TOPOLOGY MAP
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, color: "#60a5fa", padding: "1px 5px", background: "rgba(96,165,250,0.15)", borderRadius: 2 }}>
                    6 ISOLATED SILOS
                  </span>
                </div>

                {/* Topology Network Nodes Preview */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 4 }}>
                  {["COMMVAULT", "VEEAM", "DATADOMAIN", "AWS EBS", "AZURE BLOB", "SERVICENOW"].map((node) => (
                    <div
                      key={node}
                      style={{
                        padding: "5px 6px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 3,
                        textAlign: "center",
                        fontSize: 9,
                        fontFamily: 'var(--font-mono), monospace',
                        color: "#a09a9c",
                      }}
                    >
                      {node}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono), monospace', color: "#7a7477", marginTop: 8 }}>
                  ↳ 0 cross-tool correlation · 4h daily manual reconciliation
                </div>
              </div>

              {/* Sub-Items List */}
              <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12, flexGrow: 1 }}>
                {PAIN.clusters[1].items.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      paddingBottom: 10,
                      borderBottom: "1px solid rgba(34, 31, 34, 0.06)",
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--orange)" }} />
                      {item.label}
                    </div>
                    <p style={{ fontSize: 12, color: "var(--muted)", margin: 0, paddingLeft: 10, lineHeight: 1.45 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── PILLAR 03: OPERATIONAL FRICTION ── */}
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 6,
                background: "var(--bg)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              className="bento-pillar-card"
            >
              {/* Pillar Header */}
              <div style={{ padding: "20px 22px", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 32, color: "var(--orange)", lineHeight: 1 }}>
                    03
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: "var(--muted)", fontWeight: 600, letterSpacing: "0.08em" }}>
                    CONTEXT LEAK
                  </span>
                </div>
                <h4 style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>
                  Every incident starts from zero.
                </h4>
                <div style={{ fontSize: 12.5, fontStyle: "italic", color: "var(--muted)", fontFamily: 'var(--font-display), serif' }}>
                  “Knowledge and context leak between handoffs.”
                </div>
              </div>

              {/* Micro-HUD Telemetry Graphic: L1 -> L2 -> L3 Context Loss Decay Bar */}
              <div
                style={{
                  padding: "16px 20px",
                  background: "#1c1a1c",
                  color: "#fefdfd",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9.5, color: "#a09a9c", letterSpacing: "0.06em" }}>
                    HUD // HANDOFF CONTEXT RETENTION
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, color: "#f87171", padding: "1px 5px", background: "rgba(248,113,113,0.15)", borderRadius: 2 }}>
                    DECAY: -60%
                  </span>
                </div>

                {/* Handoff Step Decay Graph */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: 6, background: "#10b981", borderRadius: 2, marginBottom: 4 }} />
                    <span style={{ fontSize: 9, fontFamily: 'var(--font-mono), monospace', color: "#a09a9c" }}>L1 (100%)</span>
                  </div>
                  <span style={{ color: "#7a7477", fontSize: 10 }}>→</span>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: 6, background: "#eab308", borderRadius: 2, marginBottom: 4 }} />
                    <span style={{ fontSize: 9, fontFamily: 'var(--font-mono), monospace', color: "#a09a9c" }}>L2 (42%)</span>
                  </div>
                  <span style={{ color: "#7a7477", fontSize: 10 }}>→</span>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: 6, background: "var(--orange)", borderRadius: 2, marginBottom: 4 }} />
                    <span style={{ fontSize: 9, fontFamily: 'var(--font-mono), monospace', color: "#a09a9c" }}>L3 (18%)</span>
                  </div>
                </div>
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono), monospace', color: "var(--orange)" }}>
                  ★ ResOC Agent Mesh: 100% Forensic Brief Retained
                </div>
              </div>

              {/* Sub-Items List */}
              <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12, flexGrow: 1 }}>
                {PAIN.clusters[2].items.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      paddingBottom: 10,
                      borderBottom: "1px solid rgba(34, 31, 34, 0.06)",
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--orange)" }} />
                      {item.label}
                    </div>
                    <p style={{ fontSize: 12, color: "var(--muted)", margin: 0, paddingLeft: 10, lineHeight: 1.45 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bento-pillar-card:hover {
          border-color: var(--orange) !important;
          box-shadow: 0 4px 16px rgba(244, 85, 50, 0.08);
        }

        @keyframes pulseLine {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }

        .broken-fault-line {
          animation: pulseLine 2s infinite ease-in-out;
        }

        @media (max-width: 1040px) {
          .workbench-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .handoff-gaps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .bento-diagnostic-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .workbench-grid {
            grid-template-columns: 1fr !important;
          }
          .handoff-gaps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
