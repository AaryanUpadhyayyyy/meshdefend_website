"use client";

import React from "react";
import { SpringReveal } from "@/components/motion/SpringReveal";
import { TechIndexTag } from "@/components/ui/TechIndexTag";
import { NumberCounter } from "@/components/motion/NumberCounter";

/* ─── Official Verified Strategic Partners (Verbatim from Slide / Deck) ───
   EXACTLY 8 Partners — Scaled up ~25-30% for high visual impact:
   1. Sapta Tunas Teknologi
   2. NVIDIA Inception Program
   3. Microsoft
   4. AWS
   5. OpenAI
   6. Anthropic
   7. Azure AI Foundry
   8. Powered by Dell Technologies
   ────────────────────────────────────────────────────────────────────────── */
const ENTERPRISE_PARTNERS = [
  {
    name: "Sapta Tunas Teknologi",
    svg: (
      <svg height="34" viewBox="0 0 230 34" fill="none" aria-label="Sapta Tunas Teknologi">
        <path
          d="M4 16C4 9 9 4 17 4H29L24 11H16C12 11 10 12 10 16C10 20 12 21 16 21H23C29 21 33 25 33 30C33 35 28 39 19 39H4L9 31H19C23 31 25 30 25 26C25 22 23 21 19 21H13C7 21 4 17 4 16Z"
          fill="#F5A623"
        />
        <path d="M13 11L28 11L18 31L4 31Z" fill="#0066FF" opacity="0.85" />
        <text
          x="40"
          y="18"
          fontFamily="var(--font-body), sans-serif"
          fontSize="16"
          fontWeight="800"
          fill="var(--ink)"
          letterSpacing="0.04em"
        >
          SAPTATUNAS
        </text>
        <text
          x="40"
          y="31"
          fontFamily="var(--font-mono), monospace"
          fontSize="11"
          fontWeight="600"
          fill="var(--muted)"
          letterSpacing="0.16em"
        >
          TEKNOLOGI
        </text>
      </svg>
    ),
  },
  {
    name: "NVIDIA Inception Program",
    svg: (
      <svg height="36" viewBox="0 0 200 36" fill="none" aria-label="NVIDIA Inception Program">
        <rect x="1" y="1" width="198" height="34" rx="4" stroke="var(--ink)" strokeWidth="1.2" fill="none" opacity="0.85" />
        <path
          d="M14 18C14 13 17.5 9.5 22.5 9.5C26 9.5 28.5 11.5 30.5 14C28 12.5 25.5 12.5 22.5 14C18.5 15.5 17 18 17 20.5C17 23 18.5 25 21.5 25C25.5 25 27 22.5 28.5 19.5"
          stroke="#76B900"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <text
          x="35"
          y="17.5"
          fontFamily="var(--font-body), sans-serif"
          fontSize="13"
          fontWeight="800"
          fill="var(--ink)"
          letterSpacing="0.01em"
        >
          nVIDIA.
        </text>
        <line x1="92" y1="6" x2="92" y2="30" stroke="var(--border)" strokeWidth="1" />
        <text
          x="102"
          y="16.5"
          fontFamily="var(--font-body), sans-serif"
          fontSize="11.5"
          fontWeight="600"
          fill="var(--ink)"
        >
          Inception
        </text>
        <text
          x="102"
          y="28"
          fontFamily="var(--font-body), sans-serif"
          fontSize="11.5"
          fontWeight="400"
          fill="var(--muted)"
        >
          Program
        </text>
      </svg>
    ),
  },
  {
    name: "Microsoft",
    svg: (
      <svg height="28" viewBox="0 0 148 28" fill="none" aria-label="Microsoft">
        <rect x="0" y="3" width="9.5" height="9.5" fill="#F25022" />
        <rect x="12" y="3" width="9.5" height="9.5" fill="#7FBA00" />
        <rect x="0" y="15" width="9.5" height="9.5" fill="#00A4EF" />
        <rect x="12" y="15" width="9.5" height="9.5" fill="#FFB900" />
        <text
          x="30"
          y="20"
          fontFamily="var(--font-body), Inter, -apple-system, sans-serif"
          fontSize="18"
          fontWeight="600"
          fill="var(--ink)"
          letterSpacing="-0.02em"
        >
          Microsoft
        </text>
      </svg>
    ),
  },
  {
    name: "AWS",
    svg: (
      <svg height="28" viewBox="0 0 92 30" fill="none" aria-label="AWS">
        <text
          x="0"
          y="20"
          fontFamily="var(--font-body), sans-serif"
          fontSize="20"
          fontWeight="900"
          fill="var(--ink)"
          letterSpacing="0.02em"
        >
          aws
        </text>
        <path d="M4 25C21 30 38 30 52 24" stroke="#FF9900" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M49 21L55 24.5L48 27" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    svg: (
      <svg height="28" viewBox="0 0 130 28" fill="none" aria-label="OpenAI">
        <path d="M14 2.5L5.5 7.5V17L14 22L22.5 17V7.5L14 2.5Z" stroke="var(--ink)" strokeWidth="2" fill="none" />
        <circle cx="14" cy="12" r="4" stroke="var(--ink)" strokeWidth="1.8" fill="none" />
        <text
          x="32"
          y="20"
          fontFamily="var(--font-body), sans-serif"
          fontSize="18"
          fontWeight="700"
          fill="var(--ink)"
          letterSpacing="-0.02em"
        >
          OpenAI
        </text>
      </svg>
    ),
  },
  {
    name: "Anthropic",
    svg: (
      <svg height="26" viewBox="0 0 148 26" fill="none" aria-label="Anthropic">
        <text
          x="0"
          y="19"
          fontFamily="var(--font-mono), monospace"
          fontSize="18"
          fontWeight="700"
          fill="var(--ink)"
          letterSpacing="0.1em"
        >
          ANTHROP\C
        </text>
      </svg>
    ),
  },
  {
    name: "Azure AI Foundry",
    svg: (
      <svg height="30" viewBox="0 0 190 30" fill="none" aria-label="Azure AI Foundry">
        <path d="M5 21L14 4L23 21H5Z" fill="#0078D4" />
        <path d="M14 4L21 14L18 21L14 4Z" fill="#50E6FF" opacity="0.8" />
        <path d="M13 21L18 14L23 21H13Z" fill="#002050" opacity="0.4" />
        <text
          x="32"
          y="20.5"
          fontFamily="var(--font-body), sans-serif"
          fontSize="16.5"
          fontWeight="600"
          fill="var(--ink)"
          letterSpacing="-0.01em"
        >
          Azure AI Foundry
        </text>
      </svg>
    ),
  },
  {
    name: "Powered by Dell Technologies",
    svg: (
      <svg height="36" viewBox="0 0 200 36" fill="none" aria-label="Powered by Dell Technologies">
        <text
          x="100"
          y="11"
          textAnchor="middle"
          fontFamily="var(--font-mono), monospace"
          fontSize="10"
          fontWeight="700"
          fill="#0076CE"
          letterSpacing="0.16em"
        >
          — POWERED BY —
        </text>
        <text
          x="4"
          y="29"
          fontFamily="Georgia, serif"
          fontSize="20"
          fontWeight="800"
          fill="#0076CE"
          letterSpacing="-0.03em"
        >
          DELL
        </text>
        <text
          x="58"
          y="28.5"
          fontFamily="var(--font-body), Inter, sans-serif"
          fontSize="15"
          fontWeight="500"
          fill="var(--ink)"
          letterSpacing="-0.01em"
        >
          Technologies
        </text>
      </svg>
    ),
  },
];

// Repeat 6 times so the 8 verified partners form a seamless, infinite circular loop with zero gaps
const MARQUEE_ITEMS = [
  ...ENTERPRISE_PARTNERS,
  ...ENTERPRISE_PARTNERS,
  ...ENTERPRISE_PARTNERS,
  ...ENTERPRISE_PARTNERS,
  ...ENTERPRISE_PARTNERS,
  ...ENTERPRISE_PARTNERS,
];

export function TrustSection() {
  return (
    <section
      id="trust"
      style={{
        padding: "48px 0 24px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      <div className="container">
        <SpringReveal>
          {/* Section Monospace Technical Index Tag */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <TechIndexTag
              tag="[01 // BACKED BY & ENTERPRISE ECOSYSTEM]"
              status="INSTITUTIONAL_GRADE"
            />
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              TIER 1: INSTITUTIONAL BACKING & EDITORIAL PRESS STRIP
             ═══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
              }}
              className="tier1-grid"
            >
              {/* Left Column: Institutional Capital */}
              <div
                style={{
                  padding: "26px 32px",
                  borderRight: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                className="tier1-left"
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: "var(--muted)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: 18,
                  }}
                >
                  BACKED BY
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 36,
                    flexWrap: "wrap",
                  }}
                  className="tier1-investors"
                >
                  {/* Kalaari Capital (Scaled Up Authentic Brush Star Logo) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      opacity: 0.95,
                      transition: "opacity 0.2s ease",
                    }}
                    title="Kalaari Capital — Lead Investor"
                  >
                    <svg height="38" viewBox="0 0 178 38" fill="none" aria-label="Kalaari Capital">
                      <path
                        d="M15 2C16 7 18 13 20 17C23 13 28 9 32 6C30 11 25 16 22 20C27 21 32 22 36 23C31 24 25 24 21 24C23 29 27 34 30 38C25 34 21 29 18 25C16 30 12 35 10 39C11 34 13 28 16 23C11 22 6 22 2 21C7 20 12 19 16 17C13 12 10 7 7 4C11 7 15 11 17 16L15 2Z"
                        fill="#0056B3"
                      />
                      <text
                        x="44"
                        y="20"
                        fontFamily="var(--font-body), sans-serif"
                        fontSize="19"
                        fontWeight="700"
                        fill="var(--ink)"
                        letterSpacing="-0.02em"
                      >
                        kalaari
                      </text>
                      <text
                        x="44"
                        y="33"
                        fontFamily="var(--font-body), sans-serif"
                        fontSize="13.5"
                        fontWeight="500"
                        fill="var(--muted)"
                        letterSpacing="0.02em"
                      >
                        capital
                      </text>
                    </svg>
                  </div>

                  {/* Kettleborough VC (Scaled Up Authentic Yin-Yang Logo) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      opacity: 0.95,
                      transition: "opacity 0.2s ease",
                    }}
                    title="Kettleborough VC"
                  >
                    <svg height="38" viewBox="0 0 205 38" fill="none" aria-label="Kettleborough VC">
                      <circle cx="19" cy="19" r="15" fill="var(--ink)" />
                      <path d="M19 4A15 15 0 0 1 19 34A7.5 7.5 0 0 1 19 19A7.5 7.5 0 0 0 19 4Z" fill="#ffffff" />
                      <circle cx="19" cy="11.5" r="2.8" fill="var(--ink)" />
                      <circle cx="19" cy="26.5" r="2.8" fill="#ffffff" />
                      <text
                        x="44"
                        y="24"
                        fontFamily="var(--font-body), sans-serif"
                        fontSize="16"
                        fontWeight="700"
                        fill="var(--ink)"
                        letterSpacing="-0.01em"
                      >
                        Kettleborough VC
                      </text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Press Line */}
              <div
                style={{
                  padding: "26px 32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  background: "var(--bg)",
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
                    marginBottom: 10,
                  }}
                >
                  PRESS RECOGNITION
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: "var(--ink)",
                    margin: 0,
                  }}
                >
                  Featured in <strong style={{ fontWeight: 600 }}>The Economic Times Tech</strong> · <strong style={{ fontWeight: 600 }}>Business Standard</strong> · <strong style={{ fontWeight: 600 }}>YourStory</strong> —{" "}
                  <span style={{ color: "var(--muted)" }}>
                    “MeshDefend raises $2.3M to bring autonomous intelligence to enterprise recovery.”
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              TIER 2: BUILT BY INDUSTRY VETERANS (4-Column Hairline Grid)
             ═══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              marginBottom: 24,
            }}
          >
            {/* Header sub-bar */}
            <div
              style={{
                padding: "12px 24px",
                borderBottom: "1px solid var(--border)",
                background: "var(--bg)",
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
                  color: "var(--muted)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                IP-DRIVEN PLATFORM · 9 PATENTS + 3 TRADEMARKS FILED
              </div>
            </div>

            {/* 4-Column Hairline Grid with Scroll-Triggered Counters */}
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
                  background: "var(--surface)",
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
                  <NumberCounter value="25+" />
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 4,
                  }}
                >
                  Years in Data Protection
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.45 }}>
                  Architecting cyber resilience for Global 2000 enterprises across multi-cloud environments.
                </div>
              </div>

              {/* Stat 2 */}
              <div
                style={{
                  padding: "28px 24px",
                  borderRight: "1px solid var(--border)",
                  background: "var(--surface)",
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
                  background: "var(--surface)",
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
                  background: "var(--surface)",
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
              TIER 3: SEAMLESS CIRCULAR CONTINUOUS LOGO MARQUEE (PARTNERS)
             ═══════════════════════════════════════════════════════════════ */}
          <div style={{ position: "relative", padding: "10px 0 0" }}>
            <div
              style={{
                textAlign: "center",
                marginBottom: 18,
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
                [ STRATEGIC PARTNERS &amp; ECOSYSTEM ]
              </span>
            </div>

            {/* Seamless Infinite Circular Marquee Track */}
            <div className="seamless-marquee-wrapper">
              <div className="seamless-marquee-track">
                {MARQUEE_ITEMS.map((logo, idx) => (
                  <div
                    key={`${logo.name}-${idx}`}
                    className="brand-logo-item"
                    title={logo.name}
                  >
                    {logo.svg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SpringReveal>
      </div>

      <style>{`
        @keyframes circular-marquee-ltr {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .seamless-marquee-wrapper {
          display: flex !important;
          overflow: hidden !important;
          user-select: none;
          width: 100%;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 7%,
            black 93%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 7%,
            black 93%,
            transparent 100%
          );
          padding: 14px 0 !important;
        }

        .seamless-marquee-track {
          display: flex !important;
          align-items: center !important;
          gap: 64px !important;
          flex-shrink: 0 !important;
          white-space: nowrap !important;
          width: max-content !important;
          will-change: transform;
          animation: circular-marquee-ltr 72s linear infinite !important;
        }

        .seamless-marquee-wrapper:hover .seamless-marquee-track {
          animation-play-state: paused !important;
        }

        .brand-logo-item {
          display: inline-flex !important;
          align-items: center !important;
          color: var(--ink);
          opacity: 0.82;
          transition: opacity 0.2s ease, transform 0.2s ease;
          cursor: pointer;
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          flex-shrink: 0 !important;
        }

        .brand-logo-item:hover {
          opacity: 1 !important;
          transform: translateY(-1px);
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
            gap: 20px !important;
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
