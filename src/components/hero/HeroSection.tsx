"use client";

import { useState, useEffect } from "react";
import { DashboardPreview } from "./DashboardPreview";
import { MeshDefendBackground } from "./MeshDefendBackground";
import { HERO } from "@/lib/content";
import { HeroStateProvider } from "@/lib/heroState";

/* ─── Smooth Sequential Typewriter with LOCKED Line Heights ─── */
function HeadlineTyping({
  headlines,
}: {
  headlines: readonly { line1: string; line2: string }[];
}) {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [line1Chars, setLine1Chars] = useState(0);
  const [line2Chars, setLine2Chars] = useState(0);
  const [activeLine, setActiveLine] = useState<1 | 2>(1);
  const [isDeleting, setIsDeleting] = useState(false);

  const current = headlines[headlineIdx];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (line1Chars < current.line1.length) {
        setActiveLine(1);
        timer = setTimeout(() => {
          setLine1Chars((prev) => prev + 1);
        }, 36);
      } else if (line2Chars < current.line2.length) {
        setActiveLine(2);
        timer = setTimeout(() => {
          setLine2Chars((prev) => prev + 1);
        }, 36);
      } else {
        setActiveLine(2);
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 4200);
      }
    } else {
      if (line2Chars > 0) {
        setActiveLine(2);
        timer = setTimeout(() => {
          setLine2Chars((prev) => prev - 1);
        }, 16);
      } else if (line1Chars > 0) {
        setActiveLine(1);
        timer = setTimeout(() => {
          setLine1Chars((prev) => prev - 1);
        }, 16);
      } else {
        setIsDeleting(false);
        setHeadlineIdx((prev) => (prev + 1) % headlines.length);
        timer = setTimeout(() => {}, 220);
      }
    }

    return () => clearTimeout(timer);
  }, [line1Chars, line2Chars, isDeleting, headlineIdx, current.line1, current.line2, headlines.length]);

  const displayedLine1 = current.line1.slice(0, line1Chars);
  const displayedLine2 = current.line2.slice(0, line2Chars);

  return (
    <>
      <span style={{ display: "block", minHeight: "1.1em" }}>
        {displayedLine1}
        {activeLine === 1 && (
          <span className="typing-cursor" style={{ color: "var(--ink)" }} />
        )}
      </span>
      <span
        className="display-italic"
        style={{
          color: "var(--orange)",
          display: "block",
          minHeight: "2.35em",
        }}
      >
        {displayedLine2}
        {activeLine === 2 && (
          <span className="typing-cursor" style={{ color: "var(--orange)" }} />
        )}
      </span>
    </>
  );
}

export function HeroSection() {
  return (
    <HeroStateProvider>
      <section
        id="hero"
        style={{
          position: "relative",
          paddingTop: "clamp(48px, 5.5vw, 68px)",
          paddingBottom: 32,
          overflow: "hidden",
        }}
      >
        {/* Living Resilience Mesh Background Animation */}
        <MeshDefendBackground />

        {/* Unified Single Container: Nav, Headline, Right Column & Dashboard share same edges */}
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* ─── TOP EDITORIAL HEADER ─── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 360px",
              gap: "36px 48px",
              alignItems: "start",
              minHeight: 280,
              marginBottom: 56,
            }}
            className="hero-header-grid"
          >
            {/* Left Column: Eyebrow + Typing Headline */}
            <div style={{ minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
              <div
                className="eyebrow text-reveal text-reveal-d1"
                style={{
                  marginBottom: 14,
                  fontSize: 12.5,
                  fontFamily: "var(--font-mono), monospace",
                  letterSpacing: "0.1em",
                  color: "var(--ink)",
                  opacity: 0.70,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--ink)",
                    opacity: 0.6,
                    marginRight: 8,
                    verticalAlign: "middle",
                  }}
                />
                {HERO.eyebrow}
              </div>

              <h1
                className="display"
                style={{
                  fontSize: "clamp(46px, 5.2vw, 84px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.03em",
                  margin: 0,
                  position: "relative",
                }}
              >
                <HeadlineTyping headlines={HERO.headlines} />
              </h1>
            </div>

            {/* Right Column: 340-380px (360px) with vertical hairline, paragraph 17-18px ink at ~75% */}
            <div
              style={{
                borderLeft: "1px solid var(--border)",
                paddingLeft: 32,
                paddingTop: 6,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
              className="hero-right-col"
            >
              <p
                className="text-reveal text-reveal-d2"
                style={{
                  fontSize: 17.5,
                  lineHeight: 1.55,
                  color: "var(--ink)",
                  opacity: 0.75,
                  margin: 0,
                }}
              >
                {HERO.paragraph}
              </p>

              {/* CTAs */}
              <div
                className="text-reveal text-reveal-d3"
                style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}
              >
                <a
                  href="/demo"
                  className="btn btn-primary"
                  style={{
                    fontSize: 14,
                    padding: "12px 24px",
                    fontWeight: 600,
                  }}
                >
                  {HERO.ctaPrimary}
                </a>
                <a
                  href="#solution"
                  className="btn btn-secondary"
                  style={{
                    fontSize: 14,
                    padding: "12px 22px",
                    border: "1px solid rgba(34, 31, 34, 0.35)",
                    fontWeight: 500,
                  }}
                >
                  {HERO.ctaSecondary}
                </a>
              </div>
            </div>
          </div>

          {/* ─── HERO LIVE DASHBOARD CONSOLE (Same Left and Right Edges as Header & Nav) ─── */}
          <div
            className="text-reveal"
            style={{
              position: "relative",
              zIndex: 3,
              marginTop: 20,
              animationDelay: "0.45s",
            }}
          >
            <DashboardPreview />
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 900px) {
            .hero-header-grid {
              grid-template-columns: 1fr !important;
              gap: 28px !important;
              min-height: auto !important;
              margin-bottom: 44px !important;
            }
            .hero-right-col {
              border-left: none !important;
              padding-left: 0 !important;
              border-top: 1px solid var(--border);
              padding-top: 20px;
            }
          }
        `}</style>
      </section>
    </HeroStateProvider>
  );
}
