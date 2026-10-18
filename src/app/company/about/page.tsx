"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, type Variants } from "framer-motion";
import "./about.css";

// Executive Leadership Team
const LEADERSHIP = [
  {
    name: "Tejas Pandit",
    role: "Co-Founder & Chief Executive Officer",
    pedigree: "Ex-Dell Technologies · Enterprise Storage & Resilience Leader",
    avatar: "/images/author-tejas.jpg",
    quote:
      "Enterprise backup estates are vast, fragmented, and vulnerable to silent failures. We built MeshDefend to give CISOs continuous, undeniable proof of recoverability before a crisis strikes.",
    linkedin: "https://www.linkedin.com/in/tejas-pandit-71112b36/",
    email: "tejas@meshdefend.ai",
  },
  {
    name: "Ravi Chitloor",
    role: "Co-Founder & Chief Technology Officer",
    pedigree: "Ex-Dell Technologies · Systems Architect, Distributed Resilience",
    avatar: "/images/author-ravi.jpg",
    quote:
      "Agent Mesh™ brings deterministic intelligence to high-stress recovery—allowing autonomous agents to correlate multi-vendor dependencies while strictly enforcing human-in-the-loop authorization.",
    linkedin: "https://www.linkedin.com/in/ravichitloor/",
    email: "ravi@meshdefend.ai",
  },
];

// Core Operating Principles (Crisp, authoritative blueprints)
const PRINCIPLES = [
  {
    index: "01",
    tag: "EMPIRICAL PROOF",
    title: "Truth Over Assumption",
    body: "Green checkmarks on backup consoles mean nothing without continuous, automated application mount validation in an isolated cleanroom.",
  },
  {
    index: "02",
    tag: "DETERMINISTIC AI",
    title: "Governed Autonomy",
    body: "Agentic AI with strict cryptographic guardrails. The intelligence to observe and recommend; the discipline to halt and wait for human authorization.",
  },
  {
    index: "03",
    tag: "MULTI-VENDOR",
    title: "Heterogeneous Reality",
    body: "Enterprises do not run a single tool. We unify Commvault, Veeam, NetWorker, DataDomain, AWS, and Azure into a single authoritative operating plane.",
  },
];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function AboutUsPage() {
  const [diagramLightbox, setDiagramLightbox] = React.useState(false);

  React.useEffect(() => {
    if (!diagramLightbox) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDiagramLightbox(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [diagramLightbox]);

  return (
    <>
      <Navbar />

      <main id="main" className="about-page">
        {/* ===================================================================
            FOLD 1 — EXPANSIVE FULL-WIDTH HERO SECTION
            =================================================================== */}
        <motion.section
          className="about-hero"
          initial="hidden"
          animate="show"
          variants={fadeUpVariants}
          aria-labelledby="about-main-title"
        >
          {/* Full-Bleed Background Artwork Layer */}
          <div className="about-hero-bg-layer" aria-hidden="true">
            <img
              src="/images/about-foundry-hero.jpg"
              alt=""
              className="about-hero-bg-img about-hero-bg-img--light"
            />
            <img
              src="/images/about-foundry-hero-dark.jpg"
              alt=""
              className="about-hero-bg-img about-hero-bg-img--dark"
            />
            <div className="about-hero-scrim" />
          </div>

          <div className="about-container about-hero-container">
            {/* Top Blueprint HUD Bar */}
            <div className="about-hero-top-bar">
              <div className="about-hero-hud-left">
                <span className="about-pulse-dot" aria-hidden="true" />
                <span>ORIGINS &amp; MISSION // MESHDEFEND RESILIENCE FOUNDRY</span>
              </div>
              <div className="about-hero-hud-status">
                FOUNDED: 2024 // BENGALURU &amp; SILICON VALLEY
              </div>
            </div>

            {/* Hero Main Content */}
            <div className="about-hero-content">
              <div className="about-meta-bar">
                <div className="about-eyebrow">
                  [ COMPANY · ABOUT US ]
                </div>
                <div className="about-live-badge">
                  <span className="about-pulse-dot" aria-hidden="true" />
                  <span>CYBER RESILIENCE OS // SEED STAGE</span>
                </div>
              </div>

              <h1 id="about-main-title" className="about-title">
                Backups work. Businesses still fail to recover. We are fixing the gap.
              </h1>

              <p className="about-deck">
                MeshDefend is the autonomous enterprise operations layer for backup,
                recovery, and continuous cyber resilience. Built by former Dell
                infrastructure leaders and powered by patent-pending Agent Mesh™.
              </p>
            </div>

            {/* Bottom Blueprint HUD Bar */}
            <div className="about-hero-bottom-bar">
              <span className="about-hero-hud-caption">
                OPERATING SYSTEM FOR ENTERPRISE DATA INFRASTRUCTURE &amp; RECOVERY
              </span>
              <span className="about-hero-hud-coord">
                SEED TRANCHE: $2.3M // KALAARI CAPITAL
              </span>
            </div>
          </div>
        </motion.section>

        {/* High-End Engineering KPI Ticker (Full-width Docked Band) */}
        <section className="about-kpi-band">
          <div className="about-container">
            <div className="about-kpi-strip">
              <div className="about-kpi-cell">
                <span className="about-kpi-label">Capital Secured</span>
                <span className="about-kpi-val">$2.3M SEED TRANCHE</span>
              </div>
              <div className="about-kpi-cell">
                <span className="about-kpi-label">Founding Pedigree</span>
                <span className="about-kpi-val">EX-DELL INFRASTRUCTURE</span>
              </div>
              <div className="about-kpi-cell">
                <span className="about-kpi-label">Runtime Alliances</span>
                <span className="about-kpi-val">6 CERTIFIED FABRICS</span>
              </div>
              <div className="about-kpi-cell">
                <span className="about-kpi-label">Core Engineering</span>
                <span className="about-kpi-val">BENGALURU R&amp;D STUDIO</span>
              </div>
            </div>
          </div>
        </section>

        <div className="about-container">

          {/* ===================================================================
              FOLD 2 — THE RESILIENCE THESIS & SCHEMATIC ILLUSTRATION
              =================================================================== */}
          <section
            className="about-thesis-section"
            aria-labelledby="about-thesis-title"
          >
            <div className="about-section-label">
              <span>THE RESILIENCE THESIS // STORAGE vs. RECOVERABILITY</span>
              <span>FIGURE 2.0 // ARCHITECTURAL SPLIT</span>
            </div>

            <div className="about-thesis-header">
              <div className="about-thesis-eyebrow">[ THE CORE PROBLEM ]</div>
              <h2 id="about-thesis-title" className="about-thesis-h2">
                Storage integrity is not operational recoverability.
              </h2>
              <p className="about-thesis-deck">
                Every enterprise has immutable backups. Yet when ransomware
                strikes, recovery takes weeks of manual runbooks, missing
                dependencies, and unverified configurations. MeshDefend replaces
                passive data storage with active, policy-governed operational
                readiness.
              </p>
            </div>

            {/* Architectural Blueprint Schematic Showcase */}
            <div className="about-diagram-frame">
              <div className="about-diagram-top">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="about-diagram-tag">[ SCHEMATIC // 02 ]</span>
                  <span className="about-diagram-title">THE RESILIENCE PARADIGM SHIFT</span>
                </div>
                <button
                  type="button"
                  className="about-diagram-expand-btn"
                  onClick={() => setDiagramLightbox(true)}
                  aria-label="Inspect schematic at full resolution"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                  <span>INSPECT FULL RESOLUTION</span>
                </button>
              </div>

              <div
                className="about-diagram-canvas"
                onClick={() => setDiagramLightbox(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setDiagramLightbox(true);
                  }
                }}
                title="Click to view full-resolution schematic"
              >
                <div className="about-diagram-img-wrap">
                  <img
                    src="/images/about-thesis-diagram.jpg"
                    alt="Architectural schematic comparing legacy backup silos with manual runbooks against MeshDefend's unified Resilience Operations Center with automated cleanrooms and verified telemetry"
                    className="about-diagram-img"
                  />
                  <div className="about-diagram-zoom-hint">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                    <span>Click to Expand</span>
                  </div>
                </div>
              </div>

              <div className="about-diagram-caption">
                <span>
                  FIG 2.1 — PASSIVE STORAGE MONOLITHS (LEFT) vs. ACTIVE RESILIENCE CLEANROOM MESH (RIGHT)
                </span>
                <span style={{ color: "var(--orange)", fontWeight: 600 }}>
                  VERIFIED IMPACT: SUB-HOUR RECONSTITUTION · UP TO 80% LOWER MTTR
                </span>
              </div>
            </div>

            {/* Fullscreen Lightbox Modal */}
            {diagramLightbox && (
              <div
                className="about-lightbox-overlay"
                onClick={() => setDiagramLightbox(false)}
                role="dialog"
                aria-modal="true"
                aria-label="Schematic Full Resolution View"
              >
                <div className="about-lightbox-bar" onClick={(e) => e.stopPropagation()}>
                  <span>FIG 2.1 // THE RESILIENCE PARADIGM SHIFT (FULL RESOLUTION ARCHITECTURAL BLUEPRINT)</span>
                  <button
                    type="button"
                    className="about-lightbox-close"
                    onClick={() => setDiagramLightbox(false)}
                  >
                    [ ESC / CLOSE ✕ ]
                  </button>
                </div>
                <div className="about-lightbox-content">
                  <img
                    src="/images/about-thesis-diagram.jpg"
                    alt="Full resolution architectural schematic"
                    className="about-lightbox-img"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}

            {/* Contrast Ledger (2 Columns) */}
            <div className="about-contrast-grid">
              <div className="about-contrast-card">
                <span className="about-contrast-tag is-legacy">
                  [ 01 // THE LEGACY ILLUSION ]
                </span>
                <h3 className="about-contrast-title">Passive Storage Focus</h3>
                <p className="about-contrast-body">
                  Siloed consoles across Commvault, Veeam, and NetWorker. Annual
                  manual recovery fire-drills. Static PDF runbooks that fail
                  during real production disasters.
                </p>
                <div className="about-contrast-metric">
                  AVG RECOVERY TIME: 3 TO 14 DAYS
                </div>
              </div>

              <div className="about-contrast-card">
                <span className="about-contrast-tag is-mesh">
                  [ 02 // THE ACTIVE RESILIENCE MESH ]
                </span>
                <h3 className="about-contrast-title">
                  Continuous Operational Proof
                </h3>
                <p className="about-contrast-body">
                  Agent Mesh™ cross-vendor correlation. Continuous automated
                  restoration tests in air-gapped cleanrooms. Policy-governed
                  human-in-the-loop recovery orchestration.
                </p>
                <div
                  className="about-contrast-metric"
                  style={{
                    color: "var(--orange)",
                    borderColor: "rgba(244, 85, 50, 0.4)",
                  }}
                >
                  VERIFIED RTO: SUB-HOUR RECONSTITUTION
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================
              FOLD 3 — EXECUTIVE LEADERSHIP (Founders & Pedigree)
              =================================================================== */}
          <section
            className="about-leadership-section"
            aria-labelledby="about-leadership-title"
          >
            <div className="about-section-label">
              <span>FOUNDERS &amp; SYSTEMS ARCHITECTS // EXECUTIVE LEADERSHIP</span>
              <span>PEDIGREE: DELL INFRASTRUCTURE</span>
            </div>

            <div className="about-leaders-grid">
              {LEADERSHIP.map((leader) => (
                <div key={leader.name} className="about-leader-card">
                  <div>
                    <div className="about-leader-top">
                      <div className="about-leader-avatar-wrap">
                        <img
                          src={leader.avatar}
                          alt={leader.name}
                          className="about-leader-avatar"
                        />
                      </div>
                      <div className="about-leader-meta">
                        <span className="about-leader-role">{leader.role}</span>
                        <h3 className="about-leader-name">{leader.name}</h3>
                        <span className="about-leader-heritage">
                          {leader.pedigree}
                        </span>
                      </div>
                    </div>

                    <p className="about-leader-quote">
                      &ldquo;{leader.quote}&rdquo;
                    </p>
                  </div>

                  <div className="about-leader-footer">
                    <span className="about-leader-tag">
                      EXECUTIVE LEADERSHIP
                    </span>
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about-leader-link"
                    >
                      <span>Connect</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===================================================================
              FOLD 4 — GUIDING OPERATING PRINCIPLES
              =================================================================== */}
          <section
            className="about-principles-section"
            aria-labelledby="about-principles-title"
          >
            <div className="about-section-label">
              <span>OPERATING CODE // CORE VALUES</span>
              <span>ENGINEERING RIGOR</span>
            </div>

            <div className="about-principles-grid">
              {PRINCIPLES.map((principle) => (
                <div key={principle.index} className="about-principle-card">
                  <div className="about-principle-top-row">
                    <span className="about-principle-index">
                      {principle.index} //
                    </span>
                    <span className="about-principle-tag">
                      {principle.tag}
                    </span>
                  </div>
                  <h3 className="about-principle-title">{principle.title}</h3>
                  <p className="about-principle-body">{principle.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ===================================================================
              FOLD 5 — ACTION CTA BANNER
              =================================================================== */}
          <section
            className="about-cta-banner"
            aria-labelledby="about-cta-title"
          >
            <div className="about-cta-left">
              <div className="about-cta-eyebrow">
                [ OPERATE RESILIENCE ]
              </div>
              <h2 id="about-cta-title" className="about-cta-title">
                Recovery you can prove. Operations without error.
              </h2>
              <p className="about-cta-deck">
                Experience how MeshDefend unifies fragmented backup consoles into
                a single autonomous operations center.
              </p>
            </div>

            <div className="about-cta-actions">
              <Link href="/demo" className="about-cta-btn">
                <span>Book a Technical Demo</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/company/careers" className="about-cta-secondary">
                <span>View Open Roles</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
