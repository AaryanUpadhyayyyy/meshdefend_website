"use client";

import React from "react";
import { Reveal } from "@/components/motion";
import { TRUST_SECTION_CONTENT } from "@/lib/cmsHomepage";

export type TrustSectionCMSContent = Partial<typeof TRUST_SECTION_CONTENT>;

export function TrustSection({
  content,
}: {
  content?: TrustSectionCMSContent;
} = {}) {
  const copy = {
    ...TRUST_SECTION_CONTENT,
    ...content,
    partners: content?.partners ?? TRUST_SECTION_CONTENT.partners,
  };
  return (
    <section
      id="trust"
      style={{
        padding: "24px 0 24px",
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
                  {copy.backedByLabel}
                </span>

                {copy.backers.map((backer, index) => {
                  const logo = (
                    <>
                      {backer.lightSrc && (
                        <img
                          src={backer.lightSrc}
                          alt={backer.name}
                          className="trust-backer-logo trust-backer-logo--light"
                          style={{ height: backer.height, width: "auto", maxWidth: 220, objectFit: "contain" }}
                        />
                      )}
                      {backer.darkSrc && (
                        <img
                          src={backer.darkSrc}
                          alt=""
                          aria-hidden="true"
                          className="trust-backer-logo trust-backer-logo--dark"
                          style={{ height: backer.height, width: "auto", maxWidth: 220, objectFit: "contain" }}
                        />
                      )}
                    </>
                  );
                  const style = { display: "flex", alignItems: "center", opacity: 0.95 };
                  return backer.href ? (
                    <a key={`${backer.name}-${index}`} href={backer.href} title={backer.name} style={style}>
                      {logo}
                    </a>
                  ) : (
                    <div key={`${backer.name}-${index}`} title={backer.name} style={style}>
                      {logo}
                    </div>
                  );
                })}
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
                  {copy.backedByCaption}
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
                {copy.partnersLabel}
              </span>
            </div>

            {/* Seamless Infinite Circular Marquee Track */}
            <div
              className="seamless-marquee-wrapper"
              role="region"
              aria-label={copy.partnersLabel || "Supported Runtime Ecosystem & Platforms"}
            >
              <div className="seamless-marquee-track">
                {/* Primary Track (Accessible to screen readers) */}
                <div className="marquee-group">
                  {copy.partners.map((logo, idx) => (
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
                    {copy.partners.map((logo, idx) => (
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

        .trust-backer-logo--dark {
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

        [data-theme="dark"] .trust-backer-logo--light,
        html.dark .trust-backer-logo--light,
        .dark .trust-backer-logo--light {
          display: none !important;
        }

        [data-theme="dark"] .trust-backer-logo--dark,
        html.dark .trust-backer-logo--dark,
        .dark .trust-backer-logo--dark {
          display: block !important;
        }

        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) .partner-logo--light {
            display: none !important;
          }
          :root:not([data-theme="light"]) .partner-logo--dark {
            display: block !important;
          }
          :root:not([data-theme="light"]) .trust-backer-logo--light {
            display: none !important;
          }
          :root:not([data-theme="light"]) .trust-backer-logo--dark {
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
