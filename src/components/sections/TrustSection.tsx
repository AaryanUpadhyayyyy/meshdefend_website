"use client";

import { motion } from "framer-motion";
import { SpringReveal } from "@/components/motion/SpringReveal";
import { TechIndexTag } from "@/components/ui/TechIndexTag";
import { NumberCounter } from "@/components/motion/NumberCounter";

const STRATEGIC_AI_ECOSYSTEM = [
  { name: "Dell Technologies", category: "STRATEGIC ALLIANCE" },
  { name: "HCLTech", category: "GLOBAL SI PARTNER" },
  { name: "Microsoft", category: "HYPERSCALER" },
  { name: "AWS", category: "CLOUD PARTNER" },
  { name: "Google Cloud", category: "AI INFRASTRUCTURE" },
  { name: "Sapta Tunas Teknologi", category: "DISTRIBUTION PARTNER" },
  { name: "Backup Simple (IT Simple)", category: "SOLUTIONS PARTNER" },
  { name: "NVIDIA Inception", category: "AI ACCELERATION" },
  { name: "OpenAI", category: "REASONING MODELS" },
  { name: "Anthropic", category: "REASONING MODELS" },
  { name: "Azure AI Foundry", category: "ENTERPRISE AI PLATFORM" },
];

const HETEROGENEOUS_INTEGRATIONS = [
  { name: "Commvault", role: "BACKUP ENGINE" },
  { name: "Veeam", role: "VIRTUALIZATION & CLOUD" },
  { name: "Rubrik", role: "ZERO TRUST DATA" },
  { name: "Cohesity", role: "DATA MANAGEMENT" },
  { name: "Dell PowerProtect Data Manager", role: "PPDM" },
  { name: "Dell NetWorker", role: "ENTERPRISE BACKUP" },
  { name: "Dell PowerProtect DataDomain", role: "DEDUPLICATION TARGET" },
  { name: "ServiceNow", role: "ITSM & CMDB" },
  { name: "CrowdStrike", role: "ENDPOINT POSTURE" },
  { name: "Palo Alto Networks", role: "SEC-OPS & FIREWALL" },
  { name: "Microsoft Security", role: "SENTINEL & DEFENDER" },
  { name: "Check Point", role: "NETWORK RESILIENCE" },
  { name: "Cisco", role: "INFRASTRUCTURE" },
  { name: "HPE", role: "ENTERPRISE COMPUTE" },
  { name: "IBM", role: "STORAGE & STORAGE PROTECT" },
  { name: "NetApp", role: "ONTAP & SNAPSHOTS" },
  { name: "Pure Storage", role: "FLASHBLADE // SAFEGUARD" },
  { name: "VAST Data", role: "UNIVERSAL STORAGE" },
  { name: "Hitachi Vantara", role: "OPS CENTER" },
];

export function TrustSection() {
  return (
    <section
      id="trust"
      style={{
        padding: "64px 0 72px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <SpringReveal>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <TechIndexTag
              tag="[01 // BACKED BY & ENTERPRISE ECOSYSTEM]"
              status="ENTERPRISE_GRADE"
            />
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              TIER 1: INSTITUTIONAL BACKING & PRESS STRIP (1px Hairline Grid)
             ═══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--bg)",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                borderBottom: "1px solid var(--border)",
              }}
              className="tier1-grid"
            >
              {/* Left Column: Institutional Capital */}
              <div
                style={{
                  padding: "24px 28px",
                  borderRight: "1px solid var(--border)",
                }}
                className="tier1-left"
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: "var(--orange)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  INSTITUTIONAL BACKING · $2.3M SEED ROUND
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    alignItems: "center",
                  }}
                  className="tier1-investors"
                >
                  {/* Kalaari Capital */}
                  <div
                    style={{
                      padding: "16px 20px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 6,
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4L12 12L4 20H9L17 12L9 4H4Z" fill="var(--ink)" />
                      </svg>
                      <span
                        style={{
                          fontFamily: "var(--font-body), sans-serif",
                          fontSize: 15,
                          fontWeight: 700,
                          color: "var(--ink)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        KALAARI CAPITAL
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--muted)",
                      }}
                    >
                      Lead Investor · Tier-1 Enterprise Tech VC
                    </div>
                  </div>

                  {/* Kettleborough VC & CXOs */}
                  <div
                    style={{
                      padding: "16px 20px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 6,
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          border: "2px solid var(--ink)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ width: 6, height: 6, background: "var(--orange)", borderRadius: "50%" }} />
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-body), sans-serif",
                          fontSize: 14.5,
                          fontWeight: 700,
                          color: "var(--ink)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        KETTLEBOROUGH VC
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--muted)",
                      }}
                    >
                      + Enterprise CXOs &amp; Storage Founders
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Press Recognition */}
              <div
                style={{
                  padding: "24px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: "var(--muted)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  PRESS &amp; INDUSTRY COVERAGE
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 13,
                      color: "var(--ink)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 10,
                        padding: "2px 7px",
                        background: "rgba(34, 31, 34, 0.08)",
                        borderRadius: 3,
                        fontWeight: 600,
                      }}
                    >
                      THE ECONOMIC TIMES
                    </span>
                    <span style={{ color: "var(--muted)", fontSize: 12.5 }}>
                      “MeshDefend raises $2.3M led by Kalaari Capital”
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 13,
                      color: "var(--ink)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 10,
                        padding: "2px 7px",
                        background: "rgba(34, 31, 34, 0.08)",
                        borderRadius: 3,
                        fontWeight: 600,
                      }}
                    >
                      YOURSTORY
                    </span>
                    <span style={{ color: "var(--muted)", fontSize: 12.5 }}>
                      “AI enterprise ops startup brings autonomous intelligence to enterprise recovery”
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 13,
                      color: "var(--ink)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 10,
                        padding: "2px 7px",
                        background: "rgba(34, 31, 34, 0.08)",
                        borderRadius: 3,
                        fontWeight: 600,
                      }}
                    >
                      BUSINESS STANDARD
                    </span>
                    <span style={{ color: "var(--muted)", fontSize: 12.5 }}>
                      “Next-generation ResOC infrastructure for multi-cloud resilience”
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              TIER 2: BUILT BY INDUSTRY VETERANS (Animated Number Counters)
             ═══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--bg)",
              marginBottom: 36,
            }}
          >
            {/* Header sub-bar */}
            <div
              style={{
                padding: "14px 24px",
                borderBottom: "1px solid var(--border)",
                background: "var(--surface)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "var(--ink)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                BUILT BY INDUSTRY VETERANS FROM DATA DOMAIN · EMC · DELL TECHNOLOGIES
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  color: "var(--orange)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                IP-DRIVEN PLATFORM · 9 PATENTS + 3 TRADEMARKS FILED
              </div>
            </div>

            {/* 4-Column Hairline Grid with GSAP/Motion Counters */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
              }}
              className="tier2-stats-grid"
            >
              {/* Stat 1 */}
              <div
                style={{
                  padding: "28px 24px",
                  borderRight: "1px solid var(--border)",
                }}
                className="tier2-stat-col"
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: "clamp(38px, 4vw, 54px)",
                    lineHeight: 1,
                    color: "var(--ink)",
                    marginBottom: 10,
                    letterSpacing: "-0.02em",
                  }}
                >
                  <NumberCounter value="35+" />
                  <span style={{ fontSize: "0.5em", marginLeft: 4, fontFamily: 'var(--font-mono), monospace', color: "var(--orange)" }}>
                    YRS
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 4,
                  }}
                >
                  Data Protection &amp; Storage
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.45 }}>
                  Decades leading enterprise cyber resilience, mission-critical storage &amp; backup engines.
                </div>
              </div>

              {/* Stat 2 */}
              <div
                style={{
                  padding: "28px 24px",
                  borderRight: "1px solid var(--border)",
                }}
                className="tier2-stat-col"
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: "clamp(38px, 4vw, 54px)",
                    lineHeight: 1,
                    color: "var(--ink)",
                    marginBottom: 10,
                    letterSpacing: "-0.02em",
                  }}
                >
                  <NumberCounter value="4" />
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 4,
                  }}
                >
                  Enterprise Products Built
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.45 }}>
                  Pioneered core deduplication, replication, and distributed snapshot architectures from 0 to 1.
                </div>
              </div>

              {/* Stat 3 */}
              <div
                style={{
                  padding: "28px 24px",
                  borderRight: "1px solid var(--border)",
                }}
                className="tier2-stat-col"
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: "clamp(38px, 4vw, 54px)",
                    lineHeight: 1,
                    color: "var(--ink)",
                    marginBottom: 10,
                    letterSpacing: "-0.02em",
                  }}
                >
                  <NumberCounter value="$1Bn+" />
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 4,
                  }}
                >
                  ARR Built &amp; Scaled Together
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.45 }}>
                  Scaled global infrastructure, disaster recovery, and enterprise storage businesses worldwide.
                </div>
              </div>

              {/* Stat 4 */}
              <div
                style={{
                  padding: "28px 24px",
                }}
                className="tier2-stat-col"
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: "clamp(38px, 4vw, 54px)",
                    lineHeight: 1,
                    color: "var(--ink)",
                    marginBottom: 10,
                    letterSpacing: "-0.02em",
                  }}
                >
                  <NumberCounter value="35+" />
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 4,
                  }}
                >
                  Patents by Core Team
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.45 }}>
                  Deep proprietary algorithms spanning deduplication, state consensus &amp; agentic orchestration.
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              TIER 3: DUAL-TRACK INFINITE SMOOTH MARQUEE
             ═══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--bg)",
              padding: "28px 0 32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Header Title */}
            <div
              style={{
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                [ STRATEGIC ECOSYSTEM &amp; HETEROGENEOUS ENTERPRISE INTEGRATIONS ]
              </span>
            </div>

            {/* Track A: Strategic & AI Ecosystem (Leftward Scroll) */}
            <div className="marquee-wrapper" style={{ marginBottom: 14 }}>
              <div className="marquee-track marquee-left">
                {[...STRATEGIC_AI_ECOSYSTEM, ...STRATEGIC_AI_ECOSYSTEM].map((item, idx) => (
                  <div key={`trackA-${item.name}-${idx}`} className="marquee-item">
                    <span className="marquee-item-name">{item.name}</span>
                    <span className="marquee-item-badge">{item.category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Track B: Heterogeneous Enterprise Integrations (Rightward Scroll) */}
            <div className="marquee-wrapper">
              <div className="marquee-track marquee-right">
                {[...HETEROGENEOUS_INTEGRATIONS, ...HETEROGENEOUS_INTEGRATIONS].map((item, idx) => (
                  <div key={`trackB-${item.name}-${idx}`} className="marquee-item">
                    <span className="marquee-item-name">{item.name}</span>
                    <span className="marquee-item-badge">{item.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legal Footnote */}
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 10.5,
                color: "var(--muted)",
                letterSpacing: "0.02em",
              }}
            >
              All trademarks, logos, and brand names are property of their respective owners, displayed for integration compatibility identification only.
            </span>
          </div>
        </SpringReveal>
      </div>

      <style jsx>{`
        /* ─── Infinite Seamless Marquee ─── */
        .marquee-wrapper {
          display: flex;
          overflow: hidden;
          user-select: none;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .marquee-track {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .marquee-left {
          animation: scrollLeft 38s linear infinite;
        }

        .marquee-right {
          animation: scrollRight 44s linear infinite;
        }

        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes scrollLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
          transition: all 0.2s ease;
          cursor: default;
        }

        .marquee-item:hover {
          background: var(--bg);
          border-color: var(--orange);
          transform: translateY(-1px);
        }

        .marquee-item-name {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -0.01em;
          transition: color 0.2s ease;
        }

        .marquee-item:hover .marquee-item-name {
          color: var(--orange);
        }

        .marquee-item-badge {
          font-family: var(--font-mono), "JetBrains Mono", monospace;
          font-size: 9.5px;
          color: var(--muted);
          padding: 2px 6px;
          background: rgba(34, 31, 34, 0.05);
          border-radius: 3px;
          letter-spacing: 0.04em;
        }

        @media (max-width: 900px) {
          .tier1-grid {
            grid-template-columns: 1fr !important;
          }
          .tier1-left {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
          .tier2-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .tier2-stat-col:nth-child(2) {
            border-right: none !important;
          }
          .tier2-stat-col:nth-child(1),
          .tier2-stat-col:nth-child(2) {
            border-bottom: 1px solid var(--border);
          }
        }

        @media (max-width: 600px) {
          .tier1-investors {
            grid-template-columns: 1fr !important;
          }
          .tier2-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .tier2-stat-col {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
        }
      `}</style>
    </section>
  );
}
