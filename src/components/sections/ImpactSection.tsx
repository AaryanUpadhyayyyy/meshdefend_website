"use client";

import { motion } from "framer-motion";
import { IMPACT } from "@/lib/sections";
import { SpringReveal } from "@/components/motion/SpringReveal";
import { TechIndexTag } from "@/components/ui/TechIndexTag";
import { NumberCounter } from "@/components/motion/NumberCounter";

export function ImpactSection() {
  const stats = IMPACT.stats;

  return (
    <section
      id="impact"
      style={{
        padding: "96px 0 112px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      <div className="container">
        <SpringReveal>
          {/* Section Monospace Technical Index Tag */}
          <div style={{ marginBottom: 16 }}>
            <TechIndexTag
              tag="[05 // CONTINUOUS RECOVERY ASSURANCE]"
              status="VERIFIED_PROOFS"
            />
          </div>

          {/* Heading with tight tracking */}
          <h2
            className="display"
            style={{
              fontSize: "clamp(34px, 4.2vw, 56px)",
              maxWidth: "26ch",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: "0 0 48px",
              color: "var(--ink)",
            }}
          >
            {IMPACT.headline}
          </h2>

          {/* ═══════════════════════════════════════════════════════════════
              ROW 1: INTERACTIVE TELEMETRY BENTO GRID (3 CORE METRICS)
             ═══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              marginBottom: 28,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
              className="impact-stats-grid"
            >
              {/* ── CARD 1: 30-50% MORE INFRASTRUCTURE ── */}
              <div
                style={{
                  padding: "36px 32px",
                  background: "var(--bg)",
                  borderRight: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                className="impact-cell"
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      METRIC 01 // SCALE
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 9.5,
                        letterSpacing: "0.08em",
                        padding: "2px 7px",
                        borderRadius: 3,
                        background: "rgba(244, 85, 50, 0.1)",
                        color: "var(--orange)",
                        fontWeight: 700,
                      }}
                    >
                      CAPACITY MULTIPLIER
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: "clamp(46px, 5.2vw, 68px)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.03em",
                      color: "var(--orange)",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 400,
                      marginBottom: 16,
                    }}
                  >
                    <NumberCounter value={stats[0].value} />
                  </div>

                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--ink)",
                      letterSpacing: "-0.015em",
                      marginBottom: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {stats[0].label}
                  </div>

                  <p
                    style={{
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.55,
                      margin: "0 0 24px",
                    }}
                  >
                    {stats[0].desc}
                  </p>
                </div>

                {/* Animated Capacity Multiplier Graphic */}
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: 'var(--font-mono), monospace', marginBottom: 6 }}>
                    <span style={{ color: "var(--muted)" }}>Base Team: 1.0x</span>
                    <span style={{ color: "var(--orange)", fontWeight: 700 }}>ResOC: 1.5x Protected</span>
                  </div>
                  <div style={{ height: 6, background: "rgba(34, 31, 34, 0.08)", borderRadius: 3, overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: "66%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      style={{ height: "100%", background: "var(--orange)", borderRadius: 3 }}
                    />
                  </div>
                </div>
              </div>

              {/* ── CARD 2: UP TO 80% LOWER MTTR ── */}
              <div
                style={{
                  padding: "36px 32px",
                  background: "var(--bg)",
                  borderRight: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                className="impact-cell"
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      METRIC 02 // VELOCITY
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 9.5,
                        letterSpacing: "0.08em",
                        padding: "2px 7px",
                        borderRadius: 3,
                        background: "rgba(244, 85, 50, 0.1)",
                        color: "var(--orange)",
                        fontWeight: 700,
                      }}
                    >
                      INCIDENT MTTR
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: "clamp(46px, 5.2vw, 68px)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.03em",
                      color: "var(--orange)",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 400,
                      marginBottom: 16,
                    }}
                  >
                    <NumberCounter value={stats[1].value} />
                  </div>

                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--ink)",
                      letterSpacing: "-0.015em",
                      marginBottom: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {stats[1].label}
                  </div>

                  <p
                    style={{
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.55,
                      margin: "0 0 24px",
                    }}
                  >
                    {stats[1].desc}
                  </p>
                </div>

                {/* Animated Resolution Timeline Comparison */}
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: 'var(--font-mono), monospace', marginBottom: 6 }}>
                    <span style={{ color: "var(--muted)" }}>Manual Triage: 47m</span>
                    <span style={{ color: "var(--orange)", fontWeight: 700 }}>ResOC: 9m HITL</span>
                  </div>
                  <div style={{ display: "flex", gap: 4, height: 6, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ flex: 1, background: "rgba(34, 31, 34, 0.15)", borderRadius: 2 }} />
                    <div style={{ width: "20%", background: "var(--orange)", borderRadius: 2 }} />
                  </div>
                </div>
              </div>

              {/* ── CARD 3: UP TO 60% LESS HANDOFF EFFORT ── */}
              <div
                style={{
                  padding: "36px 32px",
                  background: "var(--bg)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                className="impact-cell"
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      METRIC 03 // CONTINUITY
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 9.5,
                        letterSpacing: "0.08em",
                        padding: "2px 7px",
                        borderRadius: 3,
                        background: "rgba(244, 85, 50, 0.1)",
                        color: "var(--orange)",
                        fontWeight: 700,
                      }}
                    >
                      CONTEXT RETENTION
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: "clamp(46px, 5.2vw, 68px)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.03em",
                      color: "var(--orange)",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 400,
                      marginBottom: 16,
                    }}
                  >
                    <NumberCounter value={stats[2].value} />
                  </div>

                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--ink)",
                      letterSpacing: "-0.015em",
                      marginBottom: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {stats[2].label}
                  </div>

                  <p
                    style={{
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.55,
                      margin: "0 0 24px",
                    }}
                  >
                    {stats[2].desc}
                  </p>
                </div>

                {/* Animated Forensic Context Pipeline */}
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: 'var(--font-mono), monospace', marginBottom: 6 }}>
                    <span style={{ color: "var(--muted)" }}>L1 → L2 → L3 Pipeline</span>
                    <span style={{ color: "var(--orange)", fontWeight: 700 }}>100% Context Retained</span>
                  </div>
                  <div style={{ height: 6, background: "rgba(34, 31, 34, 0.08)", borderRadius: 3, overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      style={{ height: "100%", background: "#10b981", borderRadius: 3 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              ROW 2: FINANCIAL & RESILIENCE POSTURE ROI BAR (3-COLUMN STRIP)
             ═══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
              className="roi-strip-grid"
            >
              {/* ROI Pillar 1 */}
              <div
                style={{
                  padding: "28px 28px",
                  borderRight: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
                className="impact-cell"
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)" }} />
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10.5, color: "var(--orange)", fontWeight: 700, letterSpacing: "0.08em" }}>
                    OUTAGE RISK MITIGATION
                  </span>
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", margin: "0 0 6px", lineHeight: 1.3 }}>
                  Lower business disruption risk
                </h4>
                <div style={{ fontSize: 13, fontFamily: 'var(--font-mono), monospace', color: "var(--ink)", fontWeight: 600, marginBottom: 8 }}>
                  Downtime costs $5K–$15K / minute
                </div>
                <p style={{ fontSize: 12.5, color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
                  Reduce recovery time by hours across core banking, ERP, and payment databases while proving RTO compliance for cyber insurance underwriters.
                </p>
              </div>

              {/* ROI Pillar 2 */}
              <div
                style={{
                  padding: "28px 28px",
                  borderRight: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
                className="impact-cell"
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)" }} />
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10.5, color: "var(--orange)", fontWeight: 700, letterSpacing: "0.08em" }}>
                    STORAGE &amp; APPLIANCE TCO
                  </span>
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", margin: "0 0 6px", lineHeight: 1.3 }}>
                  Optimize storage &amp; software costs
                </h4>
                <div style={{ fontSize: 13, fontFamily: 'var(--font-mono), monospace', color: "var(--ink)", fontWeight: 600, marginBottom: 8 }}>
                  Reclaim 20–35% appliance capacity
                </div>
                <p style={{ fontSize: 12.5, color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
                  Eliminate orphan snapshots and shadow cloud disks, safely defragmenting expensive primary storage (DataDomain, FlashBlade) without license creep.
                </p>
              </div>

              {/* ROI Pillar 3 */}
              <div
                style={{
                  padding: "28px 28px",
                  background: "var(--surface)",
                }}
                className="impact-cell"
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)" }} />
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10.5, color: "var(--orange)", fontWeight: 700, letterSpacing: "0.08em" }}>
                    GOVERNANCE &amp; COMPLIANCE
                  </span>
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", margin: "0 0 6px", lineHeight: 1.3 }}>
                  Enterprise-grade audit readiness
                </h4>
                <div style={{ fontSize: 13, fontFamily: 'var(--font-mono), monospace', color: "var(--ink)", fontWeight: 600, marginBottom: 8 }}>
                  DORA · SEC · NIST CSF 2.0
                </div>
                <p style={{ fontSize: 12.5, color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
                  Continuous cryptographic WORM audit logs prove recoverability on demand, turning quarterly audit dread into instant, board-ready attestation reports.
                </p>
              </div>
            </div>
          </div>
        </SpringReveal>
      </div>

      <style jsx>{`
        .impact-cell:hover {
          background: var(--surface) !important;
        }
        @media (max-width: 900px) {
          .impact-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .impact-stats-grid > div {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
          .roi-strip-grid {
            grid-template-columns: 1fr !important;
          }
          .roi-strip-grid > div {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
        }
      `}</style>
    </section>
  );
}
