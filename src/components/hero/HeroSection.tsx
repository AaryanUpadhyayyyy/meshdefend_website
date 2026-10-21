"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import heroLandscapeBg from "../../../public/images/mainpagelight.png";
import heroLandscapeBgDark from "../../../public/images/mainpagedark.png";
import { easeReveal } from "@/lib/bezier";
import { HERO } from "@/lib/content";

/* ─── Smooth Sequential Typewriter with LOCKED Line Heights ─── */
function HeadlineTyping({
  headlines,
  isMobile,
  prefersReducedMotion,
}: {
  headlines: readonly { line1: string; line2: string }[];
  isMobile: boolean;
  prefersReducedMotion?: boolean;
}) {
  const [displayedLine1, setDisplayedLine1] = useState(headlines[0]?.line1 ?? "");
  const [displayedLine2, setDisplayedLine2] = useState(headlines[0]?.line2 ?? "");
  const [activeLine, setActiveLine] = useState<1 | 2>(2);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedLine1(headlines[0].line1);
      setDisplayedLine2(headlines[0].line2);
      return;
    }

    let isCancelled = false;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        setTimeout(() => resolve(), ms);
      });

    async function runTypewriter() {
      let idx = 0;

      while (!isCancelled) {
        const item = headlines[idx % headlines.length];

        // 1. Type Line 1
        setActiveLine(1);
        setDisplayedLine2("");
        for (let i = 1; i <= item.line1.length; i++) {
          if (isCancelled) return;
          setDisplayedLine1(item.line1.slice(0, i));
          await wait(36);
        }

        if (isCancelled) return;
        await wait(140);

        // 2. Type Line 2
        setActiveLine(2);
        for (let i = 1; i <= item.line2.length; i++) {
          if (isCancelled) return;
          setDisplayedLine2(item.line2.slice(0, i));
          await wait(36);
        }

        if (isCancelled) return;
        // If there is only one headline, keep it permanently displayed
        if (headlines.length <= 1) {
          return;
        }

        // 3. Hold and let the user read both lines comfortably
        await wait(3200);

        if (isCancelled) return;

        // 4. Backspace Line 2
        setActiveLine(2);
        for (let i = item.line2.length - 1; i >= 0; i--) {
          if (isCancelled) return;
          setDisplayedLine2(item.line2.slice(0, i));
          await wait(18);
        }

        if (isCancelled) return;
        await wait(100);

        // 5. Backspace Line 1
        setActiveLine(1);
        for (let i = item.line1.length - 1; i >= 0; i--) {
          if (isCancelled) return;
          setDisplayedLine1(item.line1.slice(0, i));
          await wait(18);
        }

        if (isCancelled) return;
        await wait(240);

        // Advance to next headline (Statement 1 -> Statement 2 -> Statement 1)
        idx++;
      }
    }

    runTypewriter();

    return () => {
      isCancelled = true;
    };
  }, [headlines]);

  return (
    <>
      <span
        style={{
          display: "block",
          minHeight: "1.02em",
          color: "var(--ink)",
          whiteSpace: isMobile ? "normal" : "nowrap",
        }}
      >
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
          minHeight: "1.05em",
          marginTop: 6,
          fontStyle: "italic",
          whiteSpace: isMobile ? "normal" : "nowrap",
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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Scroll progress p: 0 to 1
  const [progress, setProgress] = useState(0);

  // References
  const heroRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(max-width: 1099px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setIsMobile(mediaQuery.matches);
    setPrefersReducedMotion(motionQuery.matches);

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };
    const handleMotion = () => setPrefersReducedMotion(motionQuery.matches);

    mediaQuery.addEventListener("change", handleResize);
    motionQuery.addEventListener("change", handleMotion);

    handleResize();

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
      motionQuery.removeEventListener("change", handleMotion);
    };
  }, []);

  // Native Scroll Listener for Desktop Zoom (p: 0 to 1)
  useEffect(() => {
    if (isMobile) return;

    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const heroEl = heroRef.current;
        if (!heroEl) return;

        const rect = heroEl.getBoundingClientRect();
        const scrollDistance = heroEl.offsetHeight - window.innerHeight;
        const currentP = scrollDistance > 0 ? Math.min(1, Math.max(0, -rect.top / scrollDistance)) : 0;

        setProgress(currentP);

        if (stageRef.current) {
          stageRef.current.style.setProperty("--p", currentP.toFixed(4));
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // Smooth scroll to the console section or fallback to trust section if console is hidden on mobile
  const handleScrollToConsole = (e: React.MouseEvent) => {
    e.preventDefault();
    const consoleSection = document.getElementById("console");
    if (consoleSection && window.getComputedStyle(consoleSection).display !== "none") {
      consoleSection.scrollIntoView({ behavior: "smooth" });
    } else {
      const nextSection = document.getElementById("trust") || document.getElementById("solution");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Compute transform values for Desktop zoom toward hub (p: 0.10 -> 0.45)
  let worldScale = 1;
  let worldY = 0;

  if (!isMobile && !prefersReducedMotion) {
    if (progress <= 0.1) {
      worldScale = 1;
      worldY = 0;
    } else if (progress < 0.45) {
      const t = (progress - 0.1) / (0.45 - 0.1);
      const easedT = easeReveal(t);
      worldScale = 1 + easedT * 0.06;
      worldY = -2 * easedT;
    } else {
      worldScale = 1.06;
      worldY = -2;
    }
  }

  const isDark = mounted ? resolvedTheme === "dark" : false;
  const objPos = { x: 0.65, y: isMobile ? 0.35 : 0.48 };

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-reveal-section"
      style={{
        position: "relative",
        marginTop: "-76px",
        height: isMobile ? "auto" : "180vh",
        background: "var(--bg)",
      }}
    >
      <style>{`
        .hero-landscape-img--light {
          display: block !important;
        }
        .hero-landscape-img--dark {
          display: none !important;
        }
        [data-theme="dark"] .hero-landscape-img--light,
        html.dark .hero-landscape-img--light,
        .dark .hero-landscape-img--light {
          display: none !important;
        }
        [data-theme="dark"] .hero-landscape-img--dark,
        html.dark .hero-landscape-img--dark,
        .dark .hero-landscape-img--dark {
          display: block !important;
        }

        .hero-legibility-overlay {
          background: linear-gradient(
            to right,
            rgba(254, 253, 253, 0.94) 0%,
            rgba(254, 253, 253, 0.88) 22%,
            rgba(254, 253, 253, 0.65) 38%,
            rgba(254, 253, 253, 0.28) 54%,
            rgba(254, 253, 253, 0) 72%
          );
        }
        [data-theme="dark"] .hero-legibility-overlay,
        html.dark .hero-legibility-overlay,
        .dark .hero-legibility-overlay {
          background: linear-gradient(
            to right,
            rgba(22, 19, 22, 0.94) 0%,
            rgba(22, 19, 22, 0.88) 22%,
            rgba(22, 19, 22, 0.65) 38%,
            rgba(22, 19, 22, 0.28) 54%,
            rgba(22, 19, 22, 0) 72%
          ) !important;
        }

        @media (max-width: 900px) {
          .hero-reveal-stage {
            min-height: auto !important;
            height: auto !important;
          }
          .hero-text-container {
            min-height: auto !important;
          }
          .hero-legibility-overlay {
            background: linear-gradient(to bottom, rgba(254, 253, 253, 0.88) 0%, rgba(254, 253, 253, 0.92) 65%, rgba(254, 253, 253, 0.98) 100%) !important;
          }
          .dark .hero-legibility-overlay,
          [data-theme="dark"] .hero-legibility-overlay {
            background: linear-gradient(to bottom, rgba(18, 16, 18, 0.78) 0%, rgba(18, 16, 18, 0.85) 65%, rgba(18, 16, 18, 0.94) 100%) !important;
          }
        }
      `}</style>
      {/* Sticky Stage on Desktop */}
      <div
        ref={stageRef}
        className="hero-reveal-stage"
        style={{
          position: isMobile ? "relative" : "sticky",
          top: 0,
          height: isMobile ? "auto" : "100svh",
          minHeight: isMobile ? "auto" : 700,
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Layer (a): The .world Wrapper (Clean Background Painting) */}
        <div
          className="world hero-stage-bg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: "var(--bg)",
            transformOrigin: "64% 50%",
            transform: prefersReducedMotion || isMobile ? "none" : `scale(${worldScale}) translateY(${worldY}%)`,
            willChange: progress > 0.05 && progress < 0.5 ? "transform" : "auto",
            transition: prefersReducedMotion ? "none" : "transform 0.1s linear",
          }}
        >
          {/* Background Painting with extended painterly sky */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
            }}
          >
            {/* Dual Theme Artwork controlled seamlessly via pure CSS (zero hydration flash) */}
            <Image
              src={heroLandscapeBg}
              alt="MeshDefend Resilience Operations Center architectural landscape"
              priority
              fill
              sizes="(max-width: 1200px) 100vw, 1920px"
              quality={85}
              className="hero-landscape-img hero-landscape-img--light"
              style={{
                objectFit: "cover",
                objectPosition: `${objPos.x * 100}% ${objPos.y * 100}%`,
              }}
            />
            <Image
              src={heroLandscapeBgDark}
              alt="MeshDefend Resilience Operations Center architectural landscape"
              priority
              fill
              sizes="(max-width: 1200px) 100vw, 1920px"
              quality={85}
              className="hero-landscape-img hero-landscape-img--dark"
              style={{
                objectFit: "cover",
                objectPosition: `${objPos.x * 100}% ${objPos.y * 100}%`,
                transform: isMobile ? "translateY(18px)" : "translateY(38px)",
              }}
            />
          </div>
        </div>

        {/* Layer (b): Legibility Gradient Overlay (pure CSS-driven) */}
        <div
          className="hero-legibility-overlay"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 4,
          }}
        />

        {/* Seamless Soft Fade into Next Section */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: isMobile ? 48 : 120,
            background: "linear-gradient(to bottom, transparent 0%, var(--bg) 100%)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        {/* Layer (c): Text Column (Headline, Eyebrow, Paragraph, CTAs, Endorsements) */}
        <div
          className="container hero-text-container"
          style={{
            position: isMobile ? "relative" : "absolute",
            inset: 0,
            zIndex: 8,
            display: "flex",
            alignItems: "flex-start",
            minHeight: "auto",
            justifyContent: "flex-start",
            paddingTop: isMobile ? "108px" : "calc(76px + 64px)", // 76px navbar clearance + 64px breathing room
            paddingBottom: isMobile ? "44px" : "32px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "max-content",
              maxWidth: isMobile ? "100%" : "62%",
              pointerEvents: "auto",
            }}
          >
            {/* H1: Introducing Resilience Operations Center (ResOC) */}
            <h1
              className="display"
              style={{
                fontSize: "clamp(34px, 4.2vw, 68px)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                margin: "0 0 20px",
                color: "var(--ink)",
              }}
            >
              Introducing Resilience Operations Center{" "}
              <span className="display-italic" style={{ color: "var(--orange)" }}>
                (ResOC)
              </span>
            </h1>

            {/* Sub-heading (one-liner) */}
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 18,
                fontWeight: 600,
                lineHeight: 1.45,
                color: "var(--ink)",
                margin: "0 0 14px",
                maxWidth: 580,
              }}
            >
              An agentic OS for enterprise Resilience Operations, powered by Agent Mesh™.
            </p>

            {/* Body */}
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 16.5,
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: 540,
                margin: isMobile ? "0 0 28px" : "0 0 36px",
              }}
            >
              ResOC unifies business, infrastructure and security to deliver continuous resilience.
            </p>

            {/* Inline CTAs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                flexWrap: "wrap",
                marginBottom: isMobile ? 32 : 44,
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
                fontSize: 13,
                color: "var(--ink)",
                opacity: 0.6,
              }}
            >
              Backed by Kalaari Capital · Kettleborough VC
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
