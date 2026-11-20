"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HERO_CONTENT } from "@/content/home";
import { GridPattern } from "@/components/magicui/GridPattern";
import { ShimmerButton } from "@/components/magicui/ShimmerButton";
import { TRUST_SECTION_CONTENT } from "@/lib/homeSections";

export type HeroSectionContent = Partial<typeof HERO_CONTENT> & {
  secondaryCta?: { label?: string; href?: string };
  backingLine?: string;
  dashboardImageUrl?: string;
  dashboardImage?: { url?: string } | null;
  dashboardImageAlt?: string;
  useResocVisual?: boolean;
};
export type HeroSectionCMSContent = HeroSectionContent;

export function HeroSection({
  content,
}: {
  content?: HeroSectionContent;
} = {}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 991px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const primaryCta = {
    label: content?.primaryCta?.label || "Book a demo",
    href: content?.primaryCta?.href || "/demo",
  };
  const secondaryCta = {
    label: content?.secondaryCta?.label || "See ResOC in action",
    href: content?.secondaryCta?.href || "/platform/observability",
  };

  const partners = TRUST_SECTION_CONTENT.partners;

  return (
    <section
      id="hero"
      aria-label="Resilience Operations Centre (ResOC)"
      style={{
        position: "relative",
        background: "var(--bg)",
        minHeight: isMobile ? "auto" : "calc(100svh - 80px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: isMobile ? "24px" : "32px",
        paddingBottom: isMobile ? "32px" : "64px",
        overflow: "hidden",
      }}
    >
      {/* Architectural Grid Pattern Background */}
      <GridPattern
        width={36}
        height={36}
        strokeDasharray="2 4"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          color: "rgba(34, 31, 34, 0.05)",
          maskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container hero-container"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1440,
          width: "min(1440px, calc(100% - 48px))",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "minmax(0, 1fr) minmax(0, 1.32fr)",
            justifyContent: isMobile ? "stretch" : "space-between",
            gap: isMobile ? "32px" : "36px",
            alignItems: "center",
          }}
        >
          {/* Left Column: Headings, Copy, CTAs, and Partner Logos */}
          <div
            className="hero-content"
            style={{
              maxWidth: isMobile ? "100%" : 620,
              width: "100%",
            }}
          >
            {/* Display H1 Heading */}
            <h1
              className="hero-headline"
              style={{
                fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                fontSize: "clamp(32px, 3.2vw, 50px)",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.035em",
                margin: "0 0 20px",
                color: "var(--ink)",
              }}
            >
              <span className="hero-h1-line">
                Recover Your Business{" "}
                <span style={{ color: "var(--orange, #f45532)" }}>End-to-End,</span>
              </span>
              <span className="hero-h1-line">Not Just Your Data,</span>
              <span className="hero-h1-line">After Any Disruption.</span>
            </h1>

            {/* Sub-heading */}
            <p
              style={{
                fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                fontSize: "clamp(17px, 1.35vw, 20px)",
                fontWeight: 750,
                lineHeight: 1.35,
                color: "var(--ink)",
                margin: "0 0 12px",
              }}
            >
              Introducing Resilience Operations Centre (ResOC)
            </p>

            {/* Description Body */}
            <p
              style={{
                fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                fontSize: "clamp(15px, 1.05vw, 16.5px)",
                lineHeight: 1.6,
                color: "var(--muted)",
                margin: "0 0 30px",
                maxWidth: 600,
              }}
            >
              A unified, AI-led solution to plan, build, operate, recover and continuously improve business resilience across Business, IT and Security.
            </p>

            {/* Inline CTAs with ShimmerButton */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              <ShimmerButton href={primaryCta.href}>
                {primaryCta.label}
              </ShimmerButton>

              <Link
                href={secondaryCta.href}
                className="hero-secondary-link"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--ink)",
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                  padding: "10px 0",
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>{secondaryCta.label}</span>
                <span aria-hidden="true" style={{ transition: "transform 0.2s ease" }}>→</span>
              </Link>
            </div>

            {/* Partner Logos Grid on Left Side below CTAs */}
            <div
              className="hero-trust-logos"
              style={{
                marginTop: isMobile ? 24 : 32,
                maxWidth: isMobile ? "100%" : 600,
              }}
            >
              <div className="hero-trust-grid">
                {partners.map((partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="trust-logo-card"
                    title={partner.name}
                  >
                    {partner.lightSrc && (
                      <img
                        src={partner.lightSrc}
                        alt={partner.name}
                        className="trust-logo-img trust-logo-img--light"
                        style={{ height: partner.height ? Math.min(partner.height, 26) : 24 }}
                      />
                    )}
                    {partner.darkSrc && (
                      <img
                        src={partner.darkSrc}
                        alt={partner.name}
                        aria-hidden="true"
                        className="trust-logo-img trust-logo-img--dark"
                        style={{ height: partner.height ? Math.min(partner.height, 26) : 24 }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Optional VC Caption if provided via CMS */}
            {content?.backingLine ? (
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12.5,
                  color: "var(--muted)",
                  letterSpacing: "0.02em",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: 0.9,
                  marginTop: 18,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--orange)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span>{content.backingLine}</span>
              </div>
            ) : null}
          </div>

          {/* Right Column: Full Uncut Iceberg Visual (Doubled Scale, Shifted Left & Down) */}
          <div
            className="hero-iceberg-visual"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-start",
              position: "relative",
            }}
          >
            <img
              src="/images/home/hero-iceberg-full.png"
              alt="Data recovered vs Business recovery - Resilience Operations Center"
              className="hero-iceberg-img"
              style={{
                width: isMobile ? "100%" : 960,
                maxWidth: isMobile ? 520 : "none",
                minWidth: isMobile ? "auto" : 920,
                height: "auto",
                display: "block",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .hero-h1-line {
          display: block;
        }

        @media (min-width: 1100px) {
          .hero-h1-line {
            white-space: nowrap;
          }
        }

        @media (max-width: 991px) {
          .hero-h1-line {
            display: inline;
          }
        }

        @media (min-width: 992px) {
          .hero-iceberg-visual {
            overflow: visible !important;
          }
          .hero-iceberg-img {
            width: clamp(920px, 64vw, 1140px) !important;
            min-width: 920px !important;
            max-width: none !important;
            transform: translate(-90px, 48px) !important;
          }
        }

        .hero-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          width: 100%;
        }

        .trust-logo-card {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 64px;
          padding: 10px 12px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02);
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease;
          cursor: default;
        }

        .trust-logo-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.03);
          border-color: rgba(244, 85, 50, 0.25);
        }

        .trust-logo-img {
          display: block;
          max-height: 26px;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          pointer-events: none;
        }

        .trust-logo-img--light {
          display: block !important;
        }

        .trust-logo-img--dark {
          display: none !important;
        }

        [data-theme="dark"] .trust-logo-card,
        html.dark .trust-logo-card,
        .dark .trust-logo-card {
          background: rgba(255, 255, 255, 0.03) !important;
          border-color: rgba(255, 255, 255, 0.09) !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25) !important;
        }

        [data-theme="dark"] .trust-logo-card:hover,
        html.dark .trust-logo-card:hover,
        .dark .trust-logo-card:hover {
          background: rgba(255, 255, 255, 0.06) !important;
          border-color: rgba(244, 85, 50, 0.4) !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45) !important;
        }

        [data-theme="dark"] .trust-logo-img--light,
        html.dark .trust-logo-img--light,
        .dark .trust-logo-img--light {
          display: none !important;
        }

        [data-theme="dark"] .trust-logo-img--dark,
        html.dark .trust-logo-img--dark,
        .dark .trust-logo-img--dark {
          display: block !important;
        }

        @media (max-width: 640px) {
          .hero-trust-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 8px !important;
          }
          .trust-logo-card {
            height: 58px;
            padding: 8px 10px;
          }
        }
      `}</style>
    </section>
  );
}
