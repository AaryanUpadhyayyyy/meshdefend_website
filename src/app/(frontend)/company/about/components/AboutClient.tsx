"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Reveal, RevealGroup } from "@/components/motion";

// Executive Leadership Team
const LEADERSHIP = [
  {
    name: "Tejas Pandit",
    role: "Co-Founder & Chief Executive Officer",
    pedigree: "Ex-Dell Technologies & Data Domain · Enterprise Storage & Resilience Leader",
    avatar: "/images/author-tejas.jpg",
    quote:
      "Enterprise backup estates are vast, fragmented, and vulnerable to silent failures. We built MeshDefend to give enterprise leaders continuous, undeniable proof of recoverability before a crisis strikes.",
    linkedin: "https://www.linkedin.com/in/tejaspandit1/",
  },
  {
    name: "Ravi Chitloor",
    role: "Co-Founder & Chief Technology Officer",
    pedigree: "Ex-Dell Technologies & Data Domain · Systems Architect, Distributed Resilience",
    avatar: "/images/author-ravi.jpg",
    quote:
      "Agent Mesh™ brings deterministic intelligence to high-stress recovery—allowing autonomous agents to correlate multi-vendor dependencies while strictly enforcing human-in-the-loop authorization and air-gapped non-disintermediation.",
    linkedin: "https://www.linkedin.com/in/ravichitloor/",
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

export function AboutClient() {
  return (
    <div className="about-page-client">
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
          {/* Eyebrow */}
          <div className="about-meta-bar" style={{ marginBottom: 20 }}>
            <div className="about-eyebrow">
              [ MESHDEFEND VISION ]
            </div>
          </div>

          {/* Hero Main Content */}
          <div className="about-hero-content">
            <h1 id="about-main-title" className="about-title">
              Be an agentic OS for enterprise Resilience Operations.
            </h1>

            <p className="about-deck">
              Powered by Agent Mesh™. Built by industry veterans with 35+ years
              of data protection, storage, and cyber resilience experience across
              Data Domain, EMC, and Dell Technologies.
            </p>
          </div>

          {/* Bottom Blueprint HUD Bar */}
          <div className="about-hero-bottom-bar">
            <span className="about-hero-hud-caption">
              OPERATING SYSTEM FOR ENTERPRISE DATA INFRASTRUCTURE &amp; RECOVERY
            </span>
            <span className="about-hero-hud-coord">
              SEED CAPITAL: $2.3M // KALAARI CAPITAL
            </span>
          </div>
        </div>
      </motion.section>

      <div className="about-container">
        {/* ===================================================================
            FOLD 2 — VISION, PEDIGREE & INSTITUTIONAL TRAJECTORY
            =================================================================== */}
        <section
          className="about-vision-section"
          aria-labelledby="about-vision-title"
        >
          <div className="about-vision-header">
            <Reveal delay={0}>
              <div className="about-vision-eyebrow">
                [ MESHDEFEND VISION &amp; TRAJECTORY ]
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="about-vision-title" className="about-vision-h2">
                Engineered for enterprise scale. Validated by institutional capital.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="about-vision-sub">
                A proven leadership track record in data protection and cyber
                resilience, backed by leading deep-tech venture capital to
                automate cross-vendor recovery operations.
              </p>
            </Reveal>
          </div>

          <div className="about-vision-grid">
            {/* Card 1: Built by Industry Veterans */}
            <Reveal
              as="div"
              variant="slide-left"
              delay={0.1}
              className="about-vision-card"
            >
              <div>
                <div className="about-vision-card-tag">
                  BUILT BY INDUSTRY VETERANS
                </div>

                <div className="about-hero-stat-block">
                  <div className="about-hero-stat-num">35+ Years</div>
                  <div className="about-hero-stat-desc">
                    in Data Protection, Storage and Cyber Resilience Industry
                  </div>
                </div>

                <div className="about-pedigree-strip">
                  Data Domain | EMC | Dell Tech
                </div>

                <div className="about-stat-row">
                  <span className="about-stat-row-num">4</span>
                  <span className="about-stat-row-label">
                    Enterprise Products Built
                  </span>
                </div>

                <div className="about-stat-row">
                  <span className="about-stat-row-num">$1Bn+</span>
                  <span className="about-stat-row-label">
                    ARR Built &amp; Scaled Together
                  </span>
                </div>

                <div className="about-stat-row">
                  <span className="about-stat-row-num">35+</span>
                  <span className="about-stat-row-label">Patents</span>
                </div>
              </div>
            </Reveal>

            {/* Card 2 (Center): Institutional Validation & Media */}
            <Reveal
              as="div"
              variant="fade-up"
              delay={0.18}
              className="about-vision-card about-media-card"
            >
              <div>
                <div className="about-vision-card-tag">
                  INSTITUTIONAL VALIDATION
                </div>

                <div className="about-slide-img-wrap">
                  <img
                    src="/images/spread-news-et.png"
                    alt="The Economic Times coverage: AI enterprise ops startup MeshDefend raises $2.3 million in round led by Kalaari Capital"
                    className="about-slide-img"
                  />
                </div>

                <div className="about-press-quote-list">
                  <div className="about-press-quote-item">
                    <span className="about-press-quote-source">
                      The Economic Times
                    </span>
                    &ldquo;AI enterprise ops startup MeshDefend raises $2.3 million
                    in round led by Kalaari Capital&rdquo;
                  </div>
                  <div className="about-press-quote-item">
                    <span className="about-press-quote-source">
                      Business Standard
                    </span>
                    &ldquo;MeshDefend raises $2.3 million to bring AI
                    intelligence to enterprise data&rdquo;
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 3: MeshDefend Today */}
            <Reveal
              as="div"
              variant="slide-right"
              delay={0.24}
              className="about-vision-card"
            >
              <div>
                <div className="about-vision-card-tag">MESHDEFEND TODAY</div>

                <div className="about-pillar-item">
                  <h3 className="about-pillar-title">Institutional VC Backed</h3>
                  <p className="about-pillar-body">
                    Seed funding led by Kalaari Capital with participation from
                    Kettleborough VC, accelerating enterprise go-to-market.
                  </p>
                </div>

                <div className="about-pillar-item">
                  <h3 className="about-pillar-title">
                    Enterprise-Grade Agentic Platform
                  </h3>
                  <p className="about-pillar-body">
                    Autonomous resilience operations across multi-vendor backup
                    estates with deterministic human-in-the-loop governance.
                  </p>
                </div>

                <div className="about-pillar-item">
                  <h3 className="about-pillar-title">IP-Driven Foundation</h3>
                  <p className="about-pillar-body">
                    9 Patents and 3 Trademarks protecting our core Agent Mesh™
                    orchestration and cleanroom reconstitution engines.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===================================================================
            FOLD 3 — EXECUTIVE LEADERSHIP (Co-Founders Intro)
            =================================================================== */}
        <section
          className="about-leadership-section"
          aria-labelledby="about-leadership-title"
        >
          <div className="about-section-label">
            <span>FOUNDERS &amp; SYSTEMS ARCHITECTS // EXECUTIVE LEADERSHIP</span>
            <span>PEDIGREE: DELL TECHNOLOGIES &amp; DATA DOMAIN</span>
          </div>

          <RevealGroup staggerDelay={0.1} className="about-leaders-grid">
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
                    <span>Connect on LinkedIn</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            ))}
          </RevealGroup>
        </section>

        {/* ===================================================================
            FOLD 4 — ACTION CTA BANNER
            =================================================================== */}
        <section
          className="about-cta-banner"
          aria-labelledby="about-cta-title"
        >
          <div className="about-cta-left">
            <Reveal delay={0}>
              <div className="about-cta-eyebrow">
                [ CONNECT WITH OUR FOUNDING TEAM ]
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="about-cta-title" className="about-cta-title">
                Recovery you can prove. Operations without human error.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="about-cta-deck">
                Inquire about enterprise deployments, architecture reviews, or
                joining our engineering studio.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.24}>
            <div className="about-cta-actions">
              <Link href="/company/contact?intent=demo" className="about-cta-btn">
                <span>Book a Technical Briefing</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/company/careers" className="about-cta-secondary">
                <span>View Open Roles</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
