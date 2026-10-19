"use client";

import React from "react";
import { Reveal } from "@/components/motion";

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
    name: "Works with Dell Technologies",
    svg: (
      <svg height="36" viewBox="0 0 200 36" fill="none" aria-label="Works with Dell Technologies">
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
          — WORKS WITH —
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
        <Reveal delay={0}>
          {/* ═══════════════════════════════════════════════════════════════
              TIER 1: INSTITUTIONAL & ANGEL BACKING
             ═══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              marginBottom: 32,
              padding: "24px 32px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 24,
              }}
              className="trust-backed-row"
            >
              {/* Backed By Group */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 32,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: "var(--muted)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  BACKED BY
                </span>

                {/* Kalaari Capital */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    opacity: 0.95,
                  }}
                  title="Kalaari Capital — Lead Investor"
                >
                  <svg height="34" viewBox="0 0 178 38" fill="none" aria-label="Kalaari Capital">
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

                {/* Kettleborough VC */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    opacity: 0.95,
                  }}
                  title="Kettleborough VC"
                >
                  <svg height="34" viewBox="0 0 205 38" fill="none" aria-label="Kettleborough VC">
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

              {/* 1px Hairline Divider + Enterprise CXOs and Founders */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    width: 1,
                    height: 28,
                    background: "var(--border)",
                  }}
                  className="backed-divider"
                />
                <span
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 18,
                    color: "var(--ink)",
                    letterSpacing: "-0.01em",
                    fontStyle: "italic",
                  }}
                >
                  Enterprise CXOs and Founders
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══════════════════════════════════════════════════════════════
            TIER 2: STRATEGIC & ENTERPRISE PARTNERS MARQUEE
           ═══════════════════════════════════════════════════════════════ */}
        <Reveal variant="fade" delay={0.1}>
          <div style={{ position: "relative", padding: "6px 0 0" }}>
            <div
              style={{
                textAlign: "center",
                marginBottom: 16,
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
                WORKS WITH // RUNTIME ECOSYSTEM
              </span>
            </div>

            {/* Seamless Infinite Circular Marquee Track */}
            <div
              className="seamless-marquee-wrapper"
              role="region"
              aria-label="Supported Runtime Ecosystem & Platforms"
            >
              <div className="seamless-marquee-track">
                {/* Primary Track (Accessible to screen readers) */}
                <div className="marquee-group">
                  {ENTERPRISE_PARTNERS.map((logo, idx) => (
                    <div
                      key={`primary-${logo.name}-${idx}`}
                      className="brand-logo-item"
                      title={logo.name}
                    >
                      {logo.svg}
                    </div>
                  ))}
                </div>

                {/* Duplicated Tracks (aria-hidden="true" for screen reader hygiene) */}
                {[1, 2, 3, 4, 5].map((copyIdx) => (
                  <div
                    key={`copy-${copyIdx}`}
                    className="marquee-group"
                    aria-hidden="true"
                  >
                    {ENTERPRISE_PARTNERS.map((logo, idx) => (
                      <div
                        key={`copy-${copyIdx}-${logo.name}-${idx}`}
                        className="brand-logo-item"
                        title={logo.name}
                        tabIndex={-1}
                      >
                        {logo.svg}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes circular-marquee-rtl {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
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
          flex-shrink: 0 !important;
          white-space: nowrap !important;
          width: max-content !important;
          will-change: transform;
          animation: circular-marquee-rtl 50s linear infinite !important;
        }

        .marquee-group {
          display: flex !important;
          align-items: center !important;
          gap: 64px !important;
          margin-right: 64px !important;
          flex-shrink: 0 !important;
        }

        .seamless-marquee-wrapper:hover .seamless-marquee-track,
        .seamless-marquee-wrapper:focus-within .seamless-marquee-track {
          animation-play-state: paused !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .seamless-marquee-track {
            animation: circular-marquee-rtl 60s linear infinite !important;
          }
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

        @media (max-width: 768px) {
          .trust-backed-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .backed-divider {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
