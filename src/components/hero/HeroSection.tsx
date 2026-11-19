"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HERO_CONTENT } from "@/content/home";
import { GridPattern } from "@/components/magicui/GridPattern";
import { ShimmerButton } from "@/components/magicui/ShimmerButton";

export type HeroSectionContent = Partial<typeof HERO_CONTENT> & {
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
  const imageSrc =
    content?.dashboardImage?.url ||
    content?.dashboardImageUrl ||
    "/images/img/homepage.png";
  const imageAlt =
    content?.dashboardImageAlt ||
    "Data recovered vs Business recovery - Resilience Operations Center";

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
        paddingTop: isMobile ? "28px" : "32px",
        paddingBottom: isMobile ? "36px" : "40px",
        overflow: "hidden",
      }}
    >
      {/* Magic UI Architectural Grid Pattern Background */}
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
          maxWidth: 1320,
          width: "min(1320px, calc(100% - 48px))",
          margin: "0 auto",
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "minmax(0, 1.35fr) minmax(0, 0.85fr)",
            justifyContent: isMobile ? "stretch" : "space-between",
            gap: isMobile ? "36px" : "48px",
            alignItems: "center",
          }}
        >
          {/* Left Column: Headings, Copy, CTAs */}
          <div
            className="hero-content"
            style={{ maxWidth: isMobile ? "100%" : 780, width: "100%" }}
          >
            {/* Magic UI Status Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px 6px 10px",
                borderRadius: 100,
                background: "rgba(244, 85, 50, 0.08)",
                border: "1px solid rgba(244, 85, 50, 0.22)",
                marginBottom: 20,
                width: "fit-content",
              }}
            >
              <span
                style={{
                  position: "relative",
                  display: "flex",
                  height: 8,
                  width: 8,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    display: "inline-flex",
                    height: "100%",
                    width: "100%",
                    borderRadius: "50%",
                    background: "#f45532",
                    opacity: 0.75,
                    animation: "hero-beacon-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    borderRadius: "50%",
                    height: 8,
                    width: 8,
                    background: "#f45532",
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  fontWeight: 650,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                }}
              >
                Resilience Operations Center · ResOC
              </span>
            </div>

            {/* Display H1 Heading */}
            <h1
              className="hero-headline"
              style={{
                fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                fontSize: "clamp(34px, 3.5vw, 54px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.035em",
                margin: "0 0 22px",
                color: "var(--ink)",
              }}
            >
              <span className="hero-h1-line">
                Recover Your Business{" "}
                <span style={{ color: "var(--orange, #f45532)" }}>End-to-End</span>,
              </span>
              <span className="hero-h1-line">Not Just Your Data,</span>
              <span className="hero-h1-line">After Any Disruption.</span>
            </h1>

            {/* Sub-heading */}
            <p
              style={{
                fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                fontSize: "clamp(18px, 1.4vw, 22px)",
                fontWeight: 750,
                lineHeight: 1.35,
                color: "var(--ink)",
                margin: "0 0 14px",
              }}
            >
              Introducing Resilience Operations Centre (ResOC)
            </p>

            {/* Description Body */}
            <p
              style={{
                fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                fontSize: "clamp(16px, 1.1vw, 17.5px)",
                lineHeight: 1.62,
                color: "var(--muted)",
                margin: "0 0 36px",
                maxWidth: 660,
              }}
            >
              A unified, AI-led solution to plan, build, operate, recover and continuously improve business resilience across Business, IT and Security.
            </p>

            {/* Inline CTAs with Magic UI ShimmerButton */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
                marginBottom: 16,
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
                  marginTop: 20,
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

          {/* Right Column: Open spacer allowing background iceberg visual to showcase */}
          <div
            aria-hidden="true"
            className="hero-media-spacer"
            style={{
              width: "100%",
              minHeight: isMobile ? 320 : 440,
              pointerEvents: "none",
            }}
          />
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

        @keyframes hero-beacon-ping {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        [data-theme="dark"] .hero-graphic-blend,
        html.dark .hero-graphic-blend,
        .dark .hero-graphic-blend {
          mix-blend-mode: screen;
          filter: invert(1) hue-rotate(180deg) brightness(0.92);
        }

        [data-theme="dark"] .hero-grid-pattern,
        html.dark .hero-grid-pattern,
        .dark .hero-grid-pattern {
          color: rgba(255, 255, 255, 0.06) !important;
        }
      `}</style>
    </section>
  );
}
