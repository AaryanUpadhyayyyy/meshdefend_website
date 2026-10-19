"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Reveal } from "@/components/motion";

// Strategic Infrastructure Partner Ecosystem
const TECH_ECOSYSTEM = [
  {
    name: "Microsoft",
    logo: "/images/logos/microsoft-transparent.png",
  },
  {
    name: "AWS",
    logo: "/images/logos/aws-transparent.png",
  },
  {
    name: "OpenAI",
    logo: "/images/logos/openai-transparent.png",
  },
  {
    name: "Anthropic",
    logo: "/images/logos/anthropic-transparent.png",
  },
  {
    name: "Dell",
    logo: "/images/logos/dell-transparent.png",
  },
  {
    name: "NVIDIA",
    logo: "/images/logos/nvidia-transparent.png",
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

export function InvestorsPartnersClient() {
  return (
    <div className="investors-partners-client">
      {/* ===================================================================
          FOLD 1 — EXPANSIVE FULL-WIDTH HERO SECTION
          =================================================================== */}
      <motion.section
        className="ip-hero"
        initial="hidden"
        animate="show"
        variants={fadeUpVariants}
        aria-labelledby="ip-main-title"
      >
        {/* Full-Bleed Background Artwork Layer */}
        <div className="ip-hero-bg-layer" aria-hidden="true">
          <img
            src="/images/investors-topology-art.jpg"
            alt=""
            className="ip-hero-bg-img ip-hero-bg-img--light"
          />
          <img
            src="/images/investors-topology-art-dark.jpg"
            alt=""
            className="ip-hero-bg-img ip-hero-bg-img--dark"
          />
          <div className="ip-hero-scrim" />
        </div>

        <div className="ip-container ip-hero-container">
          {/* Hero Main Content */}
          <div className="ip-hero-content">
            <div className="ip-meta-bar">
              <div className="ip-eyebrow">
                [ COMPANY // INVESTORS &amp; STRATEGIC PARTNERS ]
              </div>
            </div>

            <h1 id="ip-main-title" className="ip-title">
              Institutional capital. Engineered for global scale.
            </h1>

            <p className="ip-deck">
              Backed by Kalaari Capital and Kettleborough VC. Architecturally
              integrated across leading cloud runtimes and enterprise recovery
              fabrics.
            </p>
          </div>
        </div>
      </motion.section>

      <div className="ip-container">
        {/* ===================================================================
            FOLD 2 — INSTITUTIONAL CAPITAL & STRATEGIC ALLIANCES
            =================================================================== */}
        <section
          className="ip-ledger-section"
          aria-labelledby="ip-ledger-title"
        >
          <div className="ip-trust-grid">
            {/* Left Column (The Capital) */}
            <Reveal
              as="div"
              variant="slide-left"
              delay={0}
              className="ip-capital-col"
            >
              <div className="ip-capital-watermark" aria-hidden="true">
                $2.3M
              </div>

              <div>
                <h2 id="ip-ledger-title" className="ip-capital-num">
                  $2.3 Million
                </h2>
                <div className="ip-capital-subtitle">
                  Institutional Equity Tranche
                </div>

                <p className="ip-capital-body">
                  Accelerating development of the Resilience Operations Center
                  (ResOC) and expanding global enterprise deployment.
                </p>
              </div>

              <div className="ip-investor-list">
                <div className="ip-investor-card">
                  <div className="ip-investor-info">
                    <span className="ip-investor-role">Lead Investor</span>
                    <span className="ip-investor-thesis">
                      Kalaari Capital · Tier-1 DeepTech VC
                    </span>
                  </div>
                  <div className="ip-investor-logo-wrap">
                    <img
                      src="/images/logos/kalaari-dark-lead.png"
                      alt="Kalaari Capital"
                      className="ip-kalaari-logo"
                    />
                  </div>
                </div>

                <div className="ip-investor-card">
                  <div className="ip-investor-info">
                    <span className="ip-investor-role">Co-Investor</span>
                    <span className="ip-investor-thesis">
                      Kettleborough VC · Resilience &amp; Infrastructure
                    </span>
                  </div>
                  <div className="ip-investor-logo-wrap">
                    <img
                      src="/images/logos/kettleborough-dark.png"
                      alt="Kettleborough VC"
                      className="ip-kettleborough-logo"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Column (The Technology Ecosystem) */}
            <Reveal
              as="div"
              variant="slide-right"
              delay={0.08}
              className="ip-alliances-col"
            >
              <div className="ip-alliances-header">
                <div className="ip-alliances-top">
                  <h3 className="ip-alliances-h3">
                    Strategic Infrastructure Alliances
                  </h3>
                </div>
                <p className="ip-alliances-sub">
                  Direct architectural telemetry hooks and air-gapped recovery
                  bridges across cloud, model, and hardware fabrics.
                </p>
              </div>

              {/* 6-cell partner grid */}
              <div className="ip-broadsheet-grid">
                {TECH_ECOSYSTEM.map((partner, idx) => (
                  <Reveal
                    key={partner.name}
                    variant="fade-up"
                    delay={0.06 + idx * 0.04}
                    className="ip-partner-box"
                    title={partner.name}
                  >
                    <div className="ip-partner-logo-frame">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className={`ip-partner-img ip-logo-${partner.name.toLowerCase()}`}
                      />
                    </div>

                    <span className="ip-partner-mono">
                      {partner.name}
                    </span>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===================================================================
            FOLD 3 — STRATEGIC ALLIANCE CTA
            =================================================================== */}
        <section
          className="ip-cta-banner"
          aria-labelledby="ip-cta-title"
        >
          <div className="ip-cta-left">
            <Reveal delay={0}>
              <div className="ip-cta-eyebrow">
                [ STRATEGIC CO-DEVELOPMENT ]
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="ip-cta-title" className="ip-cta-title">
                Build with MeshDefend ResOC
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="ip-cta-deck">
                We partner with leading cloud providers, OEMs, and system
                integrators to deliver verified cyber recovery.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.24}>
            <Link href="/company/contact?intent=arch-review" className="ip-cta-btn">
              <span>Inquire About Partner Integrations</span>
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
