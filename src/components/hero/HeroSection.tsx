"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { DashboardPreview } from "./DashboardPreview";
import Image from "next/image";
import heroLandscapeBg from "../../../public/images/mainapagebg.png";
import { HERO } from "@/lib/content";
import { HeroStateProvider } from "@/lib/heroState";

import { TechIndexTag } from "@/components/ui/TechIndexTag";
import { TelemetryLogs } from "@/components/motion/TelemetryLogs";
import { AnimatedLaserBeam } from "@/components/motion/AnimatedLaserBeam";

/* ─── Architectural Kinetic Split-Word Reveal ─── */
function KineticHeadline({
  headlines,
}: {
  headlines: readonly { line1: string; line2: string }[];
}) {
  const [headlineIdx, setHeadlineIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIdx((prev) => (prev + 1) % headlines.length);
    }, 6400);

    return () => clearInterval(timer);
  }, [headlines.length]);

  const current = headlines[headlineIdx];

  return (
    <div style={{ position: "relative", minHeight: "2.35em" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={headlineIdx}
          initial={{ opacity: 0, y: 22, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(3px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            style={{
              display: "block",
              color: "var(--ink)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            {current.line1}
          </span>
          <span
            className="display-italic"
            style={{
              color: "var(--orange)",
              display: "block",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginTop: 4,
            }}
          >
            {current.line2}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── 3D Perspective Tilt-to-Flat Scroll Container ─── */
function TiltDashboardContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "center 50%"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.88, 1]);

  return (
    <div ref={containerRef} style={{ perspective: 1400, WebkitPerspective: 1400 }}>
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          transformStyle: "preserve-3d",
          transformOrigin: "center top",
        }}
      >
        {children}
      </motion.div>
    </div>
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
        {/* Editorial Resilience Operations Landscape Background */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "clamp(560px, 64vw, 860px)",
            pointerEvents: "none",
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          <Image
            src={heroLandscapeBg}
            alt="MeshDefend Resilience Operations Landscape"
            priority
            fill
            sizes="100vw"
            quality={92}
            style={{
              objectFit: "cover",
              objectPosition: "top center",
            }}
            className="hero-landscape-bg"
          />

          {/* Seamless gradient fade to page background */}
          <div
            className="hero-bg-fade"
            style={{
              position: "absolute",
              inset: 0,
            }}
          />
        </div>

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
            {/* Left Column: Eyebrow + Kinetic Headline */}
            <div style={{ minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
              <TechIndexTag
                tag="[00 // RESILIENCE OPERATIONS CENTER]"
                status="KERNEL: ACTIVE"
                style={{ marginBottom: 14 }}
              />

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
                <KineticHeadline headlines={HERO.headlines} />
              </h1>
            </div>

            {/* Right Column: 360px with vertical hairline, paragraph 17-18px ink at ~75% */}
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
                style={{
                  fontSize: 17.5,
                  lineHeight: 1.55,
                  color: "var(--ink)",
                  opacity: 0.78,
                  margin: 0,
                }}
              >
                {HERO.paragraph}
              </p>

              {/* CTAs with Magnetic Hover & Micro Arrow Translation */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <motion.a
                  href="/demo"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    fontSize: 14,
                    padding: "12px 24px",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    textDecoration: "none",
                  }}
                >
                  <span>{HERO.ctaPrimary}</span>
                  <span style={{ transition: "transform 0.2s ease" }}>→</span>
                </motion.a>

                <motion.a
                  href="#solution"
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    fontSize: 14,
                    padding: "12px 22px",
                    border: "1px solid rgba(34, 31, 34, 0.25)",
                    fontWeight: 500,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    textDecoration: "none",
                  }}
                >
                  <span>{HERO.ctaSecondary}</span>
                  <span style={{ opacity: 0.6 }}>↓</span>
                </motion.a>
              </div>
            </div>
          </div>

          {/* ─── HERO LIVE DASHBOARD CONSOLE WITH 3D PERSPECTIVE TILT-TO-FLAT ─── */}
          <TiltDashboardContainer>
            <div
              style={{
                position: "relative",
                zIndex: 3,
                marginTop: 20,
              }}
            >
              <DashboardPreview />
              <div style={{ marginTop: 16 }}>
                <TelemetryLogs maxRows={3} />
              </div>
              <AnimatedLaserBeam variant="horizontal" style={{ marginTop: 24 }} />
            </div>
          </TiltDashboardContainer>
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
