"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import heroLandscapeBg from "../../../public/images/mainapagebg.png";
import heroLandscapeBgDark from "../../../public/images/mainapagebg-dark.png";
import { HERO_COORDINATES, type HotspotPin } from "@/lib/heroCoordinates";
import { mapImageToContainer } from "@/lib/imageAnchor";
import { easeReveal } from "@/lib/bezier";
import { HERO } from "@/lib/content";

type StoryPhase = "idle" | "repairing" | "restored";

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

  // 10s Animation loop phase: idle -> repairing -> restored -> idle
  const [phase, setPhase] = useState<StoryPhase>("idle");
  const [beadProgress, setBeadProgress] = useState(0);

  // Hotspots interaction
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [hasInteractedWithHotspot, setHasInteractedWithHotspot] = useState(false);

  // Container dimensions for responsive pixel coordinate mapping
  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 });

  // References
  const heroRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const isVisibleRef = useRef(true);
  const loopTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const beadRafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(max-width: 1099px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setIsMobile(mediaQuery.matches);
    setPrefersReducedMotion(motionQuery.matches);

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
      if (stageRef.current) {
        setDimensions({
          width: stageRef.current.clientWidth,
          height: stageRef.current.clientHeight,
        });
      }
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

  // Update container dimensions on mount and window resize
  const updateDimensions = useCallback(() => {
    if (stageRef.current) {
      setDimensions({
        width: stageRef.current.clientWidth,
        height: stageRef.current.clientHeight,
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(updateDimensions);
    }
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Handle Escape key to dismiss active hotspot chip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveHotspot(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Clear all pending loop timeouts
  const clearLoopTimeouts = useCallback(() => {
    loopTimeoutsRef.current.forEach((t) => clearTimeout(t));
    loopTimeoutsRef.current = [];
    if (beadRafRef.current) {
      cancelAnimationFrame(beadRafRef.current);
      beadRafRef.current = null;
    }
  }, []);

  // Animate traveling bead along catenary during repairing phase (1.4s)
  const animateBead = useCallback(() => {
    const startTime = performance.now();
    const duration = 1400; // 1.4s

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Easing cubic-bezier(.65, 0, .15, 1)
      const easedT = easeReveal(t);
      setBeadProgress(easedT);

      if (t < 1) {
        beadRafRef.current = requestAnimationFrame(step);
      } else {
        beadRafRef.current = null;
      }
    };

    beadRafRef.current = requestAnimationFrame(step);
  }, []);

  // 10-Second Painting Story Loop (idle -> repairing -> restored -> idle)
  const runStoryLoop = useCallback(() => {
    if (prefersReducedMotion || !isVisibleRef.current) return;
    clearLoopTimeouts();

    // 0.0s: Rest / idle
    setPhase("idle");
    setBeadProgress(0);

    // 3.0s: Repairing starts (1.4s draw + bead travel)
    const t1 = setTimeout(() => {
      if (!isVisibleRef.current) return;
      setPhase("repairing");
      animateBead();
    }, 3000);

    // 4.6s: Restored starts (warm-light sprites fade in over dark windows, hold 4s)
    const t2 = setTimeout(() => {
      if (!isVisibleRef.current) return;
      setPhase("restored");
    }, 4600);

    // 8.6s: Ease back to rest over 1.5s
    const t3 = setTimeout(() => {
      if (!isVisibleRef.current) return;
      setPhase("idle");
    }, 8600);

    // 10.1s: Loop repeats
    const t4 = setTimeout(() => {
      if (!isVisibleRef.current) return;
      runStoryLoop();
    }, 10100);

    loopTimeoutsRef.current = [t1, t2, t3, t4];
  }, [prefersReducedMotion, clearLoopTimeouts, animateBead]);

  // Start story loop when mounted and visibility changes
  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("restored");
      return;
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
        clearLoopTimeouts();
      } else {
        isVisibleRef.current = true;
        runStoryLoop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    runStoryLoop();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearLoopTimeouts();
    };
  }, [prefersReducedMotion, runStoryLoop, clearLoopTimeouts]);

  // Pause loop if hero is offscreen
  useEffect(() => {
    if (prefersReducedMotion) return;
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          isVisibleRef.current = true;
          runStoryLoop();
        } else {
          isVisibleRef.current = false;
          clearLoopTimeouts();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [prefersReducedMotion, runStoryLoop, clearLoopTimeouts]);

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
      // Zoom capped at 1.06 because source image is 1672px < 2560px
      worldScale = 1 + easedT * 0.06;
      worldY = -2 * easedT;
    } else {
      worldScale = 1.06;
      worldY = -2;
    }
  }

  const isDark = mounted ? resolvedTheme === "dark" : false;

  // ─────────────────────────────────────────────────────────────
  // PIXEL COORDINATE CALCULATIONS (Responsive object-fit: cover)
  // ─────────────────────────────────────────────────────────────
  const imgDim = HERO_COORDINATES.naturalDimensions;
  const objPos = { x: 0.85, y: isMobile ? 0.25 : 0.08 };
  const imageTopOffset = 0;
  const imageContainerDim = {
    width: dimensions.width,
    height: Math.max(100, dimensions.height),
  };

  const mapPoint = useCallback(
    (coord: { u: number; v: number }) => {
      const pt = mapImageToContainer(coord, imageContainerDim, imgDim, objPos);
      return { x: pt.x, y: pt.y };
    },
    [imageContainerDim, imgDim, objPos]
  );

  const hubPixel = mapPoint(HERO_COORDINATES.hub);
  const clusterPixel = mapPoint(HERO_COORDINATES.blackoutCluster);

  // Catenary curve from Hub to Blackout Cluster
  const catenaryMidX = (hubPixel.x + clusterPixel.x) / 2;
  const catenaryMidY = Math.max(hubPixel.y, clusterPixel.y) + 22;
  const catenaryPathD = `M ${hubPixel.x.toFixed(1)} ${hubPixel.y.toFixed(1)} Q ${catenaryMidX.toFixed(1)} ${catenaryMidY.toFixed(1)}, ${clusterPixel.x.toFixed(1)} ${clusterPixel.y.toFixed(1)}`;
  const catenaryLength = Math.hypot(clusterPixel.x - hubPixel.x, clusterPixel.y - hubPixel.y) * 1.08;

  // Compute current position of traveling bead on quadratic bezier: B(t) = (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2
  const beadT = beadProgress;
  const beadX =
    (1 - beadT) * (1 - beadT) * hubPixel.x +
    2 * (1 - beadT) * beadT * catenaryMidX +
    beadT * beadT * clusterPixel.x;
  const beadY =
    (1 - beadT) * (1 - beadT) * hubPixel.y +
    2 * (1 - beadT) * beadT * catenaryMidY +
    beadT * beadT * clusterPixel.y;

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
          background: linear-gradient(to right, rgba(254, 253, 253, 0.40) 0%, rgba(254, 253, 253, 0.20) 25%, rgba(254, 253, 253, 0) 45%);
        }
        [data-theme="dark"] .hero-legibility-overlay,
        html.dark .hero-legibility-overlay,
        .dark .hero-legibility-overlay {
          background: linear-gradient(to right, rgba(18, 16, 18, 0.70) 0%, rgba(18, 16, 18, 0.45) 32%, rgba(18, 16, 18, 0) 55%), rgba(18, 16, 18, 0.26) !important;
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
        {/* Layer (a): The .world Wrapper (Painting, SVG Net Threads, Sprites, Hotspot Pins) */}
        <div
          className="world hero-stage-bg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: "var(--bg)",
            transformOrigin: `${(HERO_COORDINATES.hub.u * 100).toFixed(1)}% ${(HERO_COORDINATES.hub.v * 100).toFixed(1)}%`,
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
              }}
            />
          </div>

          {/* SVG Overlay: Fine Net Threads, Repairing Catenary, and Traveling Bead */}
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 4,
            }}
          >
            {/* 8 Fine Net Threads Radiating from Hub at 35% Opacity */}
            {HERO_COORDINATES.netThreads.map((node, i) => {
              const targetPixel = mapPoint(node);
              const midX = (hubPixel.x + targetPixel.x) / 2;
              const midY = (hubPixel.y + targetPixel.y) / 2 + 16;
              return (
                <path
                  key={`net-thread-${i}`}
                  d={`M ${hubPixel.x.toFixed(1)} ${hubPixel.y.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)}, ${targetPixel.x.toFixed(1)} ${targetPixel.y.toFixed(1)}`}
                  fill="none"
                  stroke="#f45532"
                  strokeWidth={1}
                  opacity={0.35}
                />
              );
            })}

            {/* The Repairing Catenary Thread from Hub to Blackout Cluster */}
            <path
              id="repair-catenary"
              d={catenaryPathD}
              fill="none"
              stroke="#f45532"
              strokeWidth={phase === "repairing" || phase === "restored" ? 2 : 1}
              strokeDasharray={catenaryLength}
              strokeDashoffset={
                phase === "idle"
                  ? catenaryLength
                  : phase === "repairing"
                  ? (1 - beadProgress) * catenaryLength
                  : 0
              }
              opacity={
                phase === "idle"
                  ? 0
                  : phase === "repairing"
                  ? 1
                  : prefersReducedMotion
                  ? 0.35
                  : 0.95
              }
              style={{
                transition: phase === "idle" ? "opacity 1.5s ease" : "none",
              }}
            />

            {/* Traveling Orange Bead along Catenary (active during repairing phase) */}
            {phase === "repairing" && beadProgress > 0 && beadProgress < 1 && (
              <circle
                cx={beadX}
                cy={beadY}
                r={3.5}
                fill="#f45532"
                style={{
                  filter: "drop-shadow(0 0 4px #f45532)",
                }}
              />
            )}
          </svg>

          {/* Three Radial Warm-Light Sprites (Fade in over dark windows when restored) */}
          {HERO_COORDINATES.blackoutSprites.map((sprite) => {
            const pixel = mapPoint(sprite);
            const isLit = phase === "restored" || prefersReducedMotion;
            return (
              <div
                key={sprite.id}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: pixel.x,
                  top: pixel.y,
                  width: sprite.radius * 2,
                  height: sprite.radius * 2,
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255, 185, 80, 0.95) 0%, rgba(244, 85, 50, 0.6) 35%, rgba(244, 85, 50, 0) 70%)",
                  filter: "blur(12px)",
                  mixBlendMode: "screen",
                  opacity: isLit ? sprite.intensity : 0,
                  transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />
            );
          })}

          {/* Hotspot Pins (Data center, Hospital, Port, Blackout cluster) - Desktop Only */}
          {!isMobile && (
            <div style={{ position: "absolute", inset: 0, zIndex: 6, pointerEvents: "auto" }}>
              {HERO_COORDINATES.hotspots.map((hotspot) => {
                const pixel = mapPoint(hotspot);
                const isOpen = activeHotspot === hotspot.id;

                return (
                  <div
                    key={hotspot.id}
                    style={{
                      position: "absolute",
                      left: pixel.x,
                      top: pixel.y,
                      transform: "translate(-50%, -50%)",
                      zIndex: isOpen ? 20 : 10,
                    }}
                  >
                    <button
                      type="button"
                      aria-label={hotspot.label}
                      aria-describedby={`hotspot-chip-${hotspot.id}`}
                      onMouseEnter={() => {
                        setActiveHotspot(hotspot.id);
                        setHasInteractedWithHotspot(true);
                      }}
                      onMouseLeave={() => setActiveHotspot(null)}
                      onFocus={() => {
                        setActiveHotspot(hotspot.id);
                        setHasInteractedWithHotspot(true);
                      }}
                      onBlur={() => setActiveHotspot(null)}
                      onClick={() => {
                        setActiveHotspot((prev) => (prev === hotspot.id ? null : hotspot.id));
                        setHasInteractedWithHotspot(true);
                      }}
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        border: "1.5px solid var(--ink)",
                        background: "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        padding: 0,
                        outline: "none",
                        animation: "hotspot-pulse 2.4s ease-in-out infinite",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <span
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: "var(--orange)",
                          display: "block",
                        }}
                      />
                    </button>

                    {/* Tooltip Paper Chip */}
                    {isOpen && (
                      <div
                        id={`hotspot-chip-${hotspot.id}`}
                        role="tooltip"
                        style={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: isDark ? "#2b282b" : "#fefdfd",
                          border: "1px solid var(--border)",
                          borderRadius: 6,
                          boxShadow: "0 8px 24px -6px rgba(34, 31, 34, 0.25)",
                          padding: "6px 12px",
                          whiteSpace: "nowrap",
                          fontFamily: "Inter, sans-serif",
                          fontSize: 13,
                          color: "var(--ink)",
                          pointerEvents: "none",
                          lineHeight: 1.4,
                        }}
                      >
                        {hotspot.text}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
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
            {/* Eyebrow Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
                padding: "5px 14px",
                borderRadius: 4,
                background: isDark ? "rgba(254, 253, 253, 0.08)" : "rgba(34, 31, 34, 0.05)",
                border: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: "var(--orange)",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Introducing Resilience Operations Center (ResOC)
              </span>
            </div>

            {/* H1: Sequential Typewriter Headline cycling through the 2 editorial statements */}
            <h1
              className="display"
              style={{
                fontSize: "clamp(40px, 4.6vw, 80px)",
                lineHeight: 1.02,
                letterSpacing: "-0.015em",
                margin: "0 0 24px",
              }}
            >
              <HeadlineTyping
                headlines={HERO.headlines}
                isMobile={isMobile}
                prefersReducedMotion={prefersReducedMotion}
              />
            </h1>

            {/* Paragraph */}
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 18,
                lineHeight: 1.55,
                color: "var(--ink)",
                opacity: 0.85,
                maxWidth: 520,
                margin: isMobile ? "0 0 28px" : "0 0 36px",
              }}
            >
              An agentic OS for enterprise Resilience Operations, powered by Agent Mesh™. ResOC unifies business, infrastructure and security to deliver continuous resilience.
            </p>

            {/* Inline CTAs (No arrows) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                flexWrap: "wrap",
                marginBottom: isMobile ? 32 : 44,
              }}
            >
              <a
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
              </a>

              <button
                type="button"
                onClick={handleScrollToConsole}
                className="hero-secondary-link"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--ink)",
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: "8px 0",
                  position: "relative",
                }}
              >
                See ResOC in action
              </button>
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

        {/* Interaction Hint at bottom-right (fades after first interaction) */}
        <div
          style={{
            position: "absolute",
            right: isMobile ? 20 : 32,
            bottom: isMobile ? 18 : 28,
            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
            fontSize: 12,
            color: "var(--ink)",
            opacity: hasInteractedWithHotspot ? 0 : 0.75,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
            zIndex: 8,
            background: isDark ? "rgba(34, 31, 34, 0.72)" : "rgba(254, 253, 253, 0.75)",
            padding: "4px 10px",
            borderRadius: 4,
            backdropFilter: "blur(6px)",
            border: "1px solid var(--border)",
          }}
        >
          {isMobile ? "Tap landscape to inspect telemetry" : "Hover or tap landscape to inspect telemetry"}
        </div>
      </div>
    </section>
  );
}
