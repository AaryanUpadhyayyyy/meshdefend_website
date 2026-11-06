"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { TRUST_SECTION_CONTENT } from "@/lib/cmsHomepage";
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

const partnerOrder = [
  "OpenAI",
  "Microsoft",
  "AWS",
  "Anthropic",
  "Azure AI Foundry",
  "Powered by Dell Technologies",
  "NVIDIA Inception Program",
];

const partnerLogos = partnerOrder
  .map((name) => TRUST_SECTION_CONTENT.partners.find((partner) => partner.name === name))
  .filter((partner): partner is (typeof TRUST_SECTION_CONTENT.partners)[number] => Boolean(partner));

const partnerLogoDimensions: Record<string, { width: number; height: number }> = {
  "/images/logos/openai-light.png": { width: 255, height: 70 },
  "/images/logos/openai-dark.webp": { width: 846, height: 233 },
  "/images/logos/microsoft-light.png": { width: 279, height: 66 },
  "/images/logos/microsoft-dark.png": { width: 279, height: 66 },
  "/images/logos/aws-light.webp": { width: 288, height: 172 },
  "/images/logos/aws-dark.webp": { width: 288, height: 172 },
  "/images/logos/anthropic-light.png": { width: 276, height: 36 },
  "/images/logos/anthropic-dark.png": { width: 276, height: 36 },
  "/images/logos/azure-light.png": { width: 307, height: 76 },
  "/images/logos/azure-dark.png": { width: 307, height: 76 },
  "/images/logos/dell-light.png": { width: 288, height: 69 },
  "/images/logos/dell-dark.png": { width: 289, height: 69 },
  "/images/logos/nvidia-light.webp": { width: 696, height: 243 },
  "/images/logos/nvidia-dark.webp": { width: 655, height: 229 },
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
            <strong>46</strong>
          </article>
          <article className="mdph-dashboard-metric">
            <span>Recovery proven <b>↗</b></span>
            <strong>39</strong>
          </article>
          <article className="mdph-dashboard-metric mdph-dashboard-metric--risk">
            <span>At risk <b>↗</b></span>
            <strong>4</strong>
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

export function PixelStudioHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const renderScrollState = () => {
      frame = 0;
      const travel = track.offsetHeight - stage.offsetHeight;
      if (travel <= 0) return;

      const rawProgress = clamp(-track.getBoundingClientRect().top / travel);
      const dashboardProgress = smoothstep(0, 0.84, rawProgress);
      const copyProgress = smoothstep(0.12, 0.72, rawProgress);
      const logoProgress = smoothstep(0.7, 0.96, rawProgress);

      stage.dataset.scene = rawProgress < 0.12 ? "intro" : rawProgress < 0.83 ? "moving" : "settled";
      stage.style.setProperty("--mdph-dashboard-x", lerp(window.innerWidth * 0.39, 0, dashboardProgress) + "px");
      stage.style.setProperty("--mdph-dashboard-y", lerp(window.innerHeight * 0.2, -window.innerHeight * 0.012, dashboardProgress) + "px");
      stage.style.setProperty("--mdph-dashboard-scale", String(lerp(0.82, 0.9, dashboardProgress)));
      stage.style.setProperty("--mdph-copy-opacity", String(1 - copyProgress));
      stage.style.setProperty("--mdph-copy-y", -26 * copyProgress + "px");
      stage.style.setProperty("--mdph-cta-opacity", String(1 - smoothstep(0.48, 0.59, rawProgress)));
      stage.style.setProperty("--mdph-cta-visibility", rawProgress >= 0.59 ? "hidden" : "visible");
      stage.style.setProperty("--mdph-description-stretch", String(lerp(1, 1.12, smoothstep(0.04, 0.52, rawProgress))));
      stage.style.setProperty("--mdph-logos-opacity", String(logoProgress));
      stage.style.setProperty("--mdph-logos-y", lerp(22, 0, logoProgress) + "px");
      stage.style.setProperty("--mdph-art-y", lerp(0, -22, rawProgress) + "px");
    };

    const scheduleProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(renderScrollState);
    };

    scheduleProgress();
    window.addEventListener("scroll", scheduleProgress, { passive: true });
    window.addEventListener("resize", scheduleProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleProgress);
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
                  <stop offset="0" stopColor="#ffd9c7" stopOpacity=".55" />
                  <stop offset="1" stopColor="#fff0e9" stopOpacity=".1" />
                </linearGradient>
              </defs>
              <path className="mdph-wave-shape mdph-wave-shape--top" d="M1440 0h-280c84 72 148 142 170 240 22 94-4 167 110 226V0Z" fill="url(#mdph-wave-top)" />
              <path d="M1440 64c-167 58-245 168-225 281 13 75 72 119 225 154" fill="none" stroke="rgba(255,255,255,.82)" strokeWidth="2" />
              <path d="M1440 122c-140 48-199 136-183 225 13 73 76 112 183 150" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.4" />
              <path className="mdph-wave-shape mdph-wave-shape--bottom" d="M0 628c149 44 240 96 335 164 114 82 222 110 368 108H0V628Z" fill="url(#mdph-wave-bottom)" />
              <path d="M0 572c165 47 257 105 360 181 113 83 217 117 356 128" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="2" />
              <path d="M0 637c146 42 231 92 329 160 107 74 202 104 325 116" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="1.4" />
            </svg>
          </div>

          <div className="mdph-story-copy">
            <div className="mdph-story-heading">
              <h1 id="mdph-title">
                Are you confident to recover your<br className="mdph-desktop-break" />
                Business Services end-to-end<br className="mdph-desktop-break" />
                <em>(not just data)</em> from <strong>AI-led Attacks?</strong>
              </h1>
            </div>
            <div className="mdph-story-details">
              <h2>Introducing Resilience Operations Centre (ResOC)</h2>
              <p className="mdph-story-description">
                <span>A unified, AI-led solution to plan, build, operate,</span>
                <span>recover and continuously improve business resilience</span>
                <span>across Business, IT and Security.</span>
              </p>
              <Link className="mdph-story-cta" href="/demo">Book a demo <span aria-hidden="true">→</span></Link>
            </div>
          </div>

          <div className="mdph-story-dashboard-slot">
            <DashboardPreview />
          </div>

          <div className="mdph-story-partners" role="list" aria-label="Technology partners">
            {partnerLogos.map((partner) => (
              <div className="mdph-story-partner" key={partner.name} title={partner.name} role="listitem">
                <Image className="mdph-story-partner-logo mdph-story-partner-logo--light" src={partner.lightSrc} alt={partner.name} width={partnerLogoDimensions[partner.lightSrc].width} height={partnerLogoDimensions[partner.lightSrc].height} sizes="(max-width: 640px) 100px, (max-width: 900px) 118px, 132px" />
                <Image className="mdph-story-partner-logo mdph-story-partner-logo--dark" src={partner.darkSrc} alt="" aria-hidden="true" width={partnerLogoDimensions[partner.darkSrc].width} height={partnerLogoDimensions[partner.darkSrc].height} sizes="(max-width: 640px) 100px, (max-width: 900px) 118px, 132px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}