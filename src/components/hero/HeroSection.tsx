"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HERO_CONTENT } from "@/content/home";
import { GridPattern } from "@/components/magicui/GridPattern";
import { ShimmerButton } from "@/components/magicui/ShimmerButton";
import { BorderBeam } from "@/components/magicui/BorderBeam";

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
        paddingTop: isMobile ? "28px" : "44px",
        paddingBottom: isMobile ? "44px" : "64px",
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
          maxWidth: 1220,
          width: "min(1220px, calc(100% - 48px))",
          margin: "0 auto",
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "minmax(0, 640px) minmax(0, 480px)",
            justifyContent: isMobile ? "stretch" : "space-between",
            gap: isMobile ? "36px" : "48px",
            alignItems: "center",
          }}
        >
          {/* Left Column: Headings, Copy, CTAs */}
          <div
            className="hero-content"
            style={{ maxWidth: isMobile ? "100%" : 640 }}
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
              style={{
                fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                fontSize: "clamp(32px, 3.5vw, 50px)",
                fontWeight: 800,
                lineHeight: 1.09,
                letterSpacing: "-0.03em",
                margin: "0 0 20px",
                color: "var(--ink)",
              }}
            >
              Are you confident to recover your<br />
              Business Services end-to-end<br />
              <span style={{ color: "#5a687a", fontWeight: 700 }}>(not just data)</span>{" "}
              from <span style={{ color: "var(--orange)" }}>AI-led Attacks?</span>
            </h1>

            {/* Sub-heading */}
            <p
              style={{
                fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                fontSize: "clamp(16px, 1.3vw, 19px)",
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
                fontSize: "clamp(14px, 1.05vw, 15.5px)",
                lineHeight: 1.6,
                color: "var(--muted)",
                margin: "0 0 34px",
                maxWidth: 550,
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

          {/* Right Column: Hero Graphic Framed with Magic UI BorderBeam */}
          <div
            className="hero-media"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-end",
              position: "relative",
            }}
          >
            <div
              className="hero-media-card"
              style={{
                position: "relative",
                borderRadius: 18,
                background: "var(--surface, #ffffff)",
                border: "1px solid var(--border-hairline, rgba(0, 0, 0, 0.08))",
                boxShadow: "0 22px 50px -12px rgba(34, 31, 34, 0.09), 0 1px 3px rgba(34, 31, 34, 0.04)",
                padding: 10,
                overflow: "hidden",
                transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
              }}
            >
              <BorderBeam size={240} duration={12} colorFrom="#f45532" colorTo="#ff9a7b" />
              <img
                src={imageSrc}
                alt={imageAlt}
                style={{
                  width: "100%",
                  maxWidth: isMobile ? 380 : 470,
                  height: "auto",
                  display: "block",
                  borderRadius: 12,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-beacon-ping {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        .hero-media-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 28px 60px -12px rgba(34, 31, 34, 0.13), 0 2px 6px rgba(34, 31, 34, 0.05);
        }

        [data-theme="dark"] .hero-media-card,
        html.dark .hero-media-card,
        .dark .hero-media-card {
          background: rgba(255, 255, 255, 0.03) !important;
          border-color: rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.5) !important;
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
