"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { NumberCounter } from "@/components/motion/NumberCounter";
import { TRUST_SECTION_CONTENT } from "@/lib/homeSections";
import "./PixelStudioHero.css";

type DashboardIconName = "overview" | "services" | "infrastructure" | "security" | "recovery" | "incidents" | "reports";

const dashboardIcons: Record<DashboardIconName, ReactNode> = {
  overview: <><path d="m3 10 9-7 9 7" /><path d="M5 9v12h14V9M9 21v-7h6v7" /></>,
  services: <><path d="M4 6h16v12H4z" /><path d="M8 10h8M8 14h5" /></>,
  infrastructure: <><path d="M4 5h16v5H4zM4 14h16v5H4z" /><path d="M8 7.5h.01M8 16.5h.01" /></>,
  security: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m8.5 12 2.3 2.3 4.7-5" /></>,
  recovery: <><path d="M20 7v5h-5" /><path d="M20 12a8 8 0 1 1-2.3-5.7L20 9" /></>,
  incidents: <><path d="M12 3 2.8 20h18.4L12 3Z" /><path d="M12 9v4M12 16h.01" /></>,
  reports: <><path d="M4 19v-5M10 19V8M16 19V4M22 19V11" /><path d="M2 21h21" /></>,
};

function DashboardIcon({ name, size = 18 }: { name: DashboardIconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dashboardIcons[name]}
    </svg>
  );
}

const dashboardNavigation: { label: string; icon: DashboardIconName }[] = [
  { label: "Overview", icon: "overview" },
  { label: "Business Services", icon: "services" },
  { label: "Infrastructure", icon: "infrastructure" },
  { label: "Security", icon: "security" },
  { label: "Recovery", icon: "recovery" },
  { label: "Incidents", icon: "incidents" },
  { label: "Reports", icon: "reports" },
];

const partnerLogos = TRUST_SECTION_CONTENT.partners;

const partnerLogoDimensions: Record<string, { width: number; height: number }> = {
  "/images/logos/openai-light.png": { width: 255, height: 70 },
  "/images/logos/openai-dark.webp": { width: 846, height: 233 },
  "/images/logos/microsoft-light.png": { width: 279, height: 66 },
  "/images/logos/microsoft-dark.png": { width: 279, height: 66 },
  "/images/logos/aws-light.webp": { width: 288, height: 172 },
  "/images/logos/aws-dark.webp": { width: 288, height: 172 },
  "/images/logo/anthropic-com-brandmark.svg": { width: 1024, height: 115 },
  "/images/logo/anthropic-com-brandmark-dark.svg": { width: 1024, height: 115 },
  "/images/logos/anthropic-light.png": { width: 1024, height: 115 },
  "/images/logos/anthropic-dark.png": { width: 1024, height: 115 },
  "/images/logos/azure-light.png": { width: 307, height: 76 },
  "/images/logos/azure-dark.png": { width: 307, height: 76 },
  "/images/logos/dell-light.png": { width: 288, height: 69 },
  "/images/logos/dell-dark.png": { width: 289, height: 69 },
  "/images/logos/nvidia-light.webp": { width: 696, height: 243 },
  "/images/logos/nvidia-dark.webp": { width: 655, height: 229 },
  "/images/logos/saptatuns-light.webp": { width: 240, height: 80 },
  "/images/logos/saptatuns-dark.webp": { width: 240, height: 80 },
};
function DashboardPreview() {
  return (
    <div
      className="mdph-dashboard"
      id="resoc-dashboard"
      role="img"
      aria-label="ResOC dashboard overview with 46 business services, 39 proven recoveries, and 4 at-risk services"
    >
      <aside className="mdph-dashboard-sidebar">
        <div className="mdph-dashboard-brand">
          <LogoMark size={34} />
          <span><strong>ResOC</strong><small>Resilience Operations Centre</small></span>
        </div>
        <div className="mdph-dashboard-nav" aria-hidden="true">
          {dashboardNavigation.map(({ label, icon }, index) => (
            <div className={"mdph-dashboard-nav-item" + (index === 0 ? " is-active" : "")} key={label}>
              <DashboardIcon name={icon} size={17} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </aside>

      <div className="mdph-dashboard-main">
        <div className="mdph-dashboard-topbar">
          <h2>Overview</h2>
          <div className="mdph-dashboard-topbar-actions" aria-hidden="true">
            <span className="mdph-dashboard-status"><i />All systems operational</span>
            <span className="mdph-dashboard-icon-button"><DashboardIcon name="incidents" size={17} /></span>
            <span className="mdph-dashboard-icon-button mdph-dashboard-avatar">A</span>
          </div>
        </div>

        <div className="mdph-dashboard-metrics">
          <article className="mdph-dashboard-metric">
            <span>Business services <b>↗</b></span>
            <strong><NumberCounter value="46" duration={1100} /></strong>
          </article>
          <article className="mdph-dashboard-metric">
            <span>Recovery proven <b>↗</b></span>
            <strong><NumberCounter value="39" duration={1100} /></strong>
          </article>
          <article className="mdph-dashboard-metric mdph-dashboard-metric--risk">
            <span>At risk <b>↗</b></span>
            <strong><NumberCounter value="4" duration={900} /></strong>
          </article>
        </div>

        <div className="mdph-dashboard-insights">
          <div className="mdph-dashboard-card mdph-dashboard-chart">
            <div className="mdph-dashboard-lines" aria-hidden="true"><i /><i /></div>
            <div className="mdph-dashboard-bars" aria-hidden="true">
              {[35, 52, 68, 54, 72, 91].map((height, index) => (
                <i className={index === 5 ? "is-accent" : ""} key={height} style={{ height: String(height) + "%" }} />
              ))}
            </div>
          </div>
          <div className="mdph-dashboard-card mdph-dashboard-checklist">
            <div className="mdph-dashboard-lines" aria-hidden="true"><i /><i /></div>
            {[1, 2, 3].map((item) => (
              <div className="mdph-dashboard-check-row" key={item}>
                <span aria-hidden="true">✓</span><i />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(start: number, end: number, value: number) {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

const storyRulerMarks = [
  { id: "01", label: "01" },
  { id: "02", label: "02" },
  { id: "03", label: "03" },
  { id: "04", label: "04" },
  { id: "05", label: "05" },
  { id: "06", label: "06" },
  { id: "07", label: "07" },
  { id: "08", label: "08" },
  { id: "09", label: "09" },
  { id: "10", label: "10" },
  { id: "11", label: "11" },
  { id: "12", label: "12" },
];

const FULL_LINE_1 = "Are you confident to recover your";
const FULL_LINE_2 = "Business Services end-to-end";
const FULL_LINE_3 = "(not just data) from AI-led Attacks?";

export function PixelStudioHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    type HeroLenis = {
      on?: (event: "scroll", handler: () => void) => void;
      off?: (event: "scroll", handler: () => void) => void;
    };
    let lenis: HeroLenis | undefined;
    const readLenis = () => (window as Window & { lenis?: HeroLenis }).lenis;

    const subscribeToLenis = () => {
      const activeLenis = readLenis();
      if (!activeLenis || activeLenis === lenis) return;
      lenis?.off?.("scroll", scheduleProgress);
      lenis = activeLenis;
      lenis.on?.("scroll", scheduleProgress);
    };

    let frame = 0;
    const renderScrollState = () => {
      frame = 0;
      const travel = track.offsetHeight - stage.offsetHeight;
      if (travel <= 0) return;

      const rawProgress = clamp(-track.getBoundingClientRect().top / travel);

      // 3 DISTINCT VISUAL STATES:
      // State 1 (intro, 0% - ~20%): Initial state, dashboard in bottom-right corner, heading crisp
      // State 2 (mid, ~20% - ~62%): Dashboard centers & stays MORE DOWN; text translates ABOVE & sits BEHIND dashboard
      // State 3 (settled, ~62% - 100%): Text scrolls away above, dashboard glides to center, logos visible below
      stage.dataset.scene = rawProgress < 0.20 ? "intro" : rawProgress < 0.62 ? "mid" : "settled";

      const p1 = smoothstep(0.02, 0.42, rawProgress);
      const p2 = smoothstep(0.44, 0.78, rawProgress);

      // Dynamic calculation to guarantee vertical space between line 3 and dashboard top across ALL views and zoom levels:
      const headingEl = stage.querySelector<HTMLElement>(".mdph-story-heading");
      const headingRect = headingEl?.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const headingBottom = headingRect ? headingRect.bottom - stageRect.top : 240;

      // Actual dashboard card height:
      const dashEl = stage.querySelector<HTMLElement>(".mdph-dashboard");
      const cardHeight = dashEl ? dashEl.offsetHeight : 520;
      const cardScaledHalfHeight = (cardHeight * 0.74) / 2;
      const stageCenterY = stage.offsetHeight / 2;

      // Desired top of dashboard card in State 1: minimum 54px below line 3:
      const desiredCardTop = headingBottom + 54;
      const requiredStartY = desiredCardTop - stageCenterY + cardScaledHalfHeight;

      // State 1 coordinates: bottom-right corner
      const startX = Math.min(window.innerWidth * 0.28, 420);
      const startY = Math.max(requiredStartY, stage.offsetHeight * 0.28);

      // State 2 coordinates: bottom-center (X: 0, moved down)
      const midY = Math.max(requiredStartY - 24, stage.offsetHeight * 0.20);

      // State 3 coordinates: centered settled position
      const endY = -12;

      let currentX: number;
      let currentY: number;
      let currentScale: number;

      if (rawProgress <= 0.44) {
        currentX = lerp(startX, 0, p1);
        currentY = lerp(startY, midY, p1);
        currentScale = lerp(0.74, 0.88, p1);
      } else {
        currentX = 0;
        currentY = lerp(midY, endY, p2);
        currentScale = lerp(0.88, 0.98, p2);
      }

      // Heading & text: goes BEHIND the dashboard and moves ABOVE (translates upwards)
      const headingOpacity = rawProgress <= 0.44
        ? lerp(1.0, 0.25, p1)
        : lerp(0.25, 0.0, p2);

      const detailsOpacity = rawProgress <= 0.44
        ? lerp(1.0, 0.20, p1)
        : lerp(0.20, 0.0, p2);

      const copyScrollUp = rawProgress <= 0.44
        ? lerp(0, -90, p1)
        : lerp(-90, -400, p2);

      const ctaOpacity = rawProgress <= 0.44
        ? lerp(1.0, 0.20, p1)
        : lerp(0.20, 0.0, smoothstep(0.44, 0.58, rawProgress));

      const logoProgress = smoothstep(0.60, 0.82, rawProgress);
      const logoY = lerp(20, 0, logoProgress);

      stage.style.setProperty("--mdph-dashboard-x", `${currentX}px`);
      stage.style.setProperty("--mdph-dashboard-y", `${currentY}px`);
      stage.style.setProperty("--mdph-dashboard-scale", String(currentScale));

      stage.style.setProperty("--mdph-heading-opacity", String(headingOpacity));
      stage.style.setProperty("--mdph-details-opacity", String(detailsOpacity));
      stage.style.setProperty("--mdph-cta-opacity", String(ctaOpacity));
      stage.style.setProperty("--mdph-cta-visibility", rawProgress >= 0.55 ? "hidden" : "visible");
      stage.style.setProperty("--mdph-cta-pointer-events", rawProgress >= 0.35 ? "none" : "auto");
      stage.style.setProperty("--mdph-copy-y", `${copyScrollUp}px`);

      stage.style.setProperty("--mdph-ruler-opacity", String(rawProgress <= 0.44 ? 1 - p1 * 0.5 : lerp(0.5, 0.0, p2)));
      stage.style.setProperty("--mdph-logos-opacity", String(logoProgress));
      stage.style.setProperty("--mdph-logos-y", `${logoY}px`);
      stage.style.setProperty("--mdph-art-y", `${lerp(0, -20, rawProgress)}px`);
    };

    const scheduleProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(renderScrollState);
    };

    scheduleProgress();
    window.requestAnimationFrame(subscribeToLenis);
    window.addEventListener("scroll", scheduleProgress, { passive: true });
    window.addEventListener("resize", scheduleProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleProgress);
      lenis?.off?.("scroll", scheduleProgress);
      window.removeEventListener("resize", scheduleProgress);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);



  return (
    <section className="mdph" id="hero" aria-labelledby="mdph-title">
      <div className="mdph-story-track" ref={trackRef}>
        <div className="mdph-story-stage" ref={stageRef} data-scene="intro">
          <div className="mdph-story-background" aria-hidden="true">
            <div className="mdph-story-glow" />
            <svg className="mdph-story-waves" viewBox="0 0 1440 900" preserveAspectRatio="none" focusable="false">
              <defs>
                <linearGradient id="mdph-wave-top" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#ffd4bd" stopOpacity=".58" />
                  <stop offset="1" stopColor="#ffe8dd" stopOpacity=".18" />
                </linearGradient>
                <linearGradient id="mdph-wave-bottom" x1="0" x2="1" y1="1" y2="0">
                  <stop offset="0" stopColor="#ffd9c7" stopOpacity=".28" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path className="mdph-wave-shape mdph-wave-shape--top" d="M1440 0h-280c84 72 148 142 170 240 22 94-4 167 110 226V0Z" fill="url(#mdph-wave-top)" />
              <path d="M1440 64c-167 58-245 168-225 281 13 75 72 119 225 154" fill="none" stroke="rgba(255,255,255,.82)" strokeWidth="2" />
              <path d="M1440 122c-140 48-199 136-183 225 13 73 76 112 183 150" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.4" />
              <path className="mdph-wave-shape mdph-wave-shape--bottom" d="M0 628c149 44 240 96 335 164 114 82 222 110 368 108H0V628Z" fill="url(#mdph-wave-bottom)" />
              <path d="M0 572c165 47 257 105 360 181 113 83 217 117 356 128" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="2" />
            </svg>
          </div>

          <div className="mdph-story-ruler" aria-hidden="true">
            {storyRulerMarks.map((mark) => (
              <span className="mdph-story-ruler-mark" key={mark.id}>
                <span className="mdph-story-ruler-num">{mark.label}</span>
              </span>
            ))}
          </div>

          <div className="mdph-story-copy">
            <div className="mdph-story-heading">
              <h1 id="mdph-title" aria-label="Are you confident to recover your Business Services end-to-end (not just data) from AI-led Attacks?">
                <span className="mdph-line-mask">
                  <span className="mdph-line-inner mdph-line-1">
                    Are you confident to recover your
                  </span>
                </span>
                <span className="mdph-line-mask">
                  <span className="mdph-line-inner mdph-line-2">
                    Business Services end-to-end
                  </span>
                </span>
                <span className="mdph-line-mask">
                  <span className="mdph-line-inner mdph-line-3">
                    <em>(not just data)</em> <span>from </span><strong>AI-led Attacks?</strong>
                  </span>
                </span>
              </h1>
            </div>
            <div className="mdph-story-details">
              <h2>Introducing Resilience Operations<br />Centre (ResOC)</h2>
              <p className="mdph-story-description">
                A unified, AI-led solution to plan, build, operate, recover and continuously improve business resilience across Business, IT and Security.
              </p>
              <Link className="mdph-story-cta" href="/demo">Book a demo <span aria-hidden="true">→</span></Link>
            </div>
          </div>

          <div className="mdph-story-dashboard-slot">
            <DashboardPreview />
          </div>

          <div className="mdph-story-marquee-wrapper" aria-label="Technology partners">
            <div className="mdph-story-marquee-track">
              {[1, 2].map((repeat) => (
                <div key={repeat} className="mdph-story-marquee-group" aria-hidden={repeat === 2 ? "true" : undefined}>
                  {partnerLogos.map((partner, index) => {
                    const dims = partnerLogoDimensions[partner.lightSrc] || { width: 220, height: 60 };
                    return (
                      <div className="mdph-story-partner" key={`${partner.name}-${repeat}-${index}`} title={partner.name}>
                        <Image
                          className="mdph-story-partner-logo mdph-story-partner-logo--light"
                          src={partner.lightSrc}
                          alt={partner.name}
                          width={dims.width}
                          height={dims.height}
                          sizes="(max-width: 640px) 100px, (max-width: 900px) 120px, 140px"
                        />
                        <Image
                          className="mdph-story-partner-logo mdph-story-partner-logo--dark"
                          src={partner.darkSrc}
                          alt=""
                          aria-hidden="true"
                          width={dims.width}
                          height={dims.height}
                          sizes="(max-width: 640px) 100px, (max-width: 900px) 120px, 140px"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
