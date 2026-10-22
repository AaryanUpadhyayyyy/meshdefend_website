"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeroSlideStack } from "./HeroSlideStack";

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 991px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introducing Resilience Operations Center (ResOC)"
      style={{
        position: "relative",
        background: "var(--bg)",
        paddingTop: isMobile ? "108px" : "136px",
        paddingBottom: isMobile ? "48px" : "64px",
        overflow: "hidden",
      }}
    >
      <div
        className="container hero-container"
        style={{
          maxWidth: 1320,
          width: "min(1320px, calc(100% - 64px))",
          margin: "0 auto",
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "48% 52%",
            gap: isMobile ? "36px" : "36px",
            alignItems: "center",
          }}
        >
          {/* Left Column: Headings, Copy, CTAs, Backed by */}
          <div className="hero-content" style={{ maxWidth: isMobile ? "100%" : 560 }}>
            {/* H1: Introducing Resilience Operations Center (ResOC) */}
            <h1
              className="display"
              style={{
                fontSize: "clamp(34px, 3.8vw, 56px)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                margin: "0 0 18px",
                color: "var(--ink)",
                fontWeight: 400,
              }}
            >
              Introducing Resilience Operations Center{" "}
              <span className="display-italic" style={{ color: "var(--orange)", fontStyle: "italic" }}>
                (ResOC)
              </span>
            </h1>

            {/* Sub-heading (one-liner) */}
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(16px, 1.35vw, 18px)",
                fontWeight: 600,
                lineHeight: 1.45,
                color: "var(--ink)",
                margin: "0 0 14px",
              }}
            >
              An agentic OS for enterprise Resilience Operations, powered by Agent Mesh™.
            </p>

            {/* Body */}
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 15.5,
                lineHeight: 1.6,
                color: "var(--muted)",
                margin: "0 0 32px",
              }}
            >
              ResOC unifies business, infrastructure and security to deliver continuous resilience.
            </p>

            {/* Inline CTAs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
                marginBottom: 36,
              }}
            >
              <Link
                href="/demo"
                className="btn btn-primary"
                style={{
                  background: "var(--orange)",
                  color: "#221f22",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "13px 28px",
                  borderRadius: 4,
                  textDecoration: "none",
                  display: "inline-block",
                  boxShadow: "0 2px 8px rgba(244, 85, 50, 0.2)",
                }}
              >
                Book a demo
              </Link>

              <Link
                href="/platform/observability"
                className="hero-secondary-link"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--ink)",
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                  padding: "8px 0",
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                See ResOC in action
              </Link>
            </div>

            {/* Bottom-left VC Caption */}
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
              <span>Backed by Kalaari Capital · Kettleborough VC</span>
            </div>
          </div>

          {/* Right Column: Interactive 3-Slide Overlapping Stack */}
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
            <HeroSlideStack />
          </div>
        </div>
      </div>
    </section>
  );
}
