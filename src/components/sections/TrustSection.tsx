"use client";

import React from "react";
import { Reveal } from "@/components/motion";

/* ─── Official Verified Strategic Partners ───
   All 8 strategic partners use official image assets with
   theme-aware light and dark mode variants.
   ────────────────────────────────────────────────────────────────────────── */
interface PartnerLogo {
  name: string;
  lightSrc: string;
  darkSrc: string;
  height: number;
}

const ENTERPRISE_PARTNERS: PartnerLogo[] = [
  {
    name: "Sapta Tunas Teknologi",
    lightSrc: "/images/logos/saptatuns-light.webp",
    darkSrc: "/images/logos/saptatuns-dark.webp",
    height: 34,
  },
  {
    name: "NVIDIA Inception Program",
    lightSrc: "/images/logos/nvidia-light.webp",
    darkSrc: "/images/logos/nvidia-dark.webp",
    height: 32,
  },
  {
    name: "OpenAI",
    lightSrc: "/images/logos/openai-light.png",
    darkSrc: "/images/logos/openai-dark.webp",
    height: 28,
  },
  {
    name: "AWS",
    lightSrc: "/images/logos/aws-light.webp",
    darkSrc: "/images/logos/aws-dark.webp",
    height: 28,
  },
  {
    name: "Microsoft",
    lightSrc: "/images/logos/microsoft-light.png",
    darkSrc: "/images/logos/microsoft-dark.png",
    height: 26,
  },
  {
    name: "Anthropic",
    lightSrc: "/images/logos/anthropic-light.png",
    darkSrc: "/images/logos/anthropic-dark.png",
    height: 22,
  },
  {
    name: "Azure AI Foundry",
    lightSrc: "/images/logos/azure-light.png",
    darkSrc: "/images/logos/azure-dark.png",
    height: 26,
  },
  {
    name: "Powered by Dell Technologies",
    lightSrc: "/images/logos/dell-light.png",
    darkSrc: "/images/logos/dell-dark.png",
    height: 28,
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
                      <img
                        src={logo.lightSrc}
                        alt={logo.name}
                        className="partner-logo partner-logo--light"
                        style={{ height: logo.height, width: "auto", objectFit: "contain" }}
                      />
                      <img
                        src={logo.darkSrc}
                        alt={logo.name}
                        className="partner-logo partner-logo--dark"
                        style={{ height: logo.height, width: "auto", objectFit: "contain" }}
                      />
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
                        <img
                          src={logo.lightSrc}
                          alt=""
                          aria-hidden="true"
                          className="partner-logo partner-logo--light"
                          style={{ height: logo.height, width: "auto", objectFit: "contain" }}
                        />
                        <img
                          src={logo.darkSrc}
                          alt=""
                          aria-hidden="true"
                          className="partner-logo partner-logo--dark"
                          style={{ height: logo.height, width: "auto", objectFit: "contain" }}
                        />
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
          justify-content: center !important;
          color: var(--ink);
          opacity: 0.88;
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

        .partner-logo {
          display: block;
          max-width: 100%;
          pointer-events: none;
        }

        .partner-logo--light {
          display: block !important;
        }

        .partner-logo--dark {
          display: none !important;
        }

        [data-theme="dark"] .partner-logo--light,
        html.dark .partner-logo--light,
        .dark .partner-logo--light {
          display: none !important;
        }

        [data-theme="dark"] .partner-logo--dark,
        html.dark .partner-logo--dark,
        .dark .partner-logo--dark {
          display: block !important;
        }

        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) .partner-logo--light {
            display: none !important;
          }
          :root:not([data-theme="light"]) .partner-logo--dark {
            display: block !important;
          }
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
