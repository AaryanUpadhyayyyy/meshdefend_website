"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, type Variants } from "framer-motion";
import "./investors-partners.css";

// Strategic Infrastructure Partner Ecosystem
const TECH_ECOSYSTEM = [
  {
    name: "Microsoft",
    type: "Cloud Runtime",
    latency: "< 4ms HOOK",
    logo: "/images/logos/microsoft-transparent.png",
  },
  {
    name: "AWS",
    type: "Hyperscale Fabric",
    latency: "< 3ms HOOK",
    logo: "/images/logos/aws-transparent.png",
  },
  {
    name: "OpenAI",
    type: "AI Model Engine",
    latency: "ZERO RETENTION",
    logo: "/images/logos/openai-transparent.png",
  },
  {
    name: "Anthropic",
    type: "Reasoning Fabric",
    latency: "AIR-GAPPED",
    logo: "/images/logos/anthropic-transparent.png",
  },
  {
    name: "Dell",
    type: "Storage & Hardware",
    latency: "BARE-METAL",
    logo: "/images/logos/dell-transparent.png",
  },
  {
    name: "NVIDIA",
    type: "Compute Fabric",
    latency: "ON-PREM ACCEL",
    logo: "/images/logos/nvidia-transparent.png",
  },
];

// Integration Matrix Capabilities (Concise, punchy specifications)
const INTEGRATION_CAPABILITIES = [
  {
    index: "01",
    title: "Multi-Cloud Discovery",
    tag: "AWS · AZURE · GCP",
    body: "Continuous posture discovery and sub-second dependency mapping across heterogeneous enterprise cloud estates.",
  },
  {
    index: "02",
    title: "AI Runtime Model Diodes",
    tag: "OPENAI · ANTHROPIC",
    body: "Deterministic Human-in-the-Loop agentic runtimes operating through strictly air-gapped data diodes.",
  },
  {
    index: "03",
    title: "Cleanroom Storage Fabric",
    tag: "DELL · WORM · IMMUTABLE",
    body: "Automated cryptographic verification and cleanroom reconstitution directly on enterprise storage arrays.",
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

export default function InvestorsPartnersPage() {
  return (
    <>
      <Navbar />

      <main id="main" className="investors-partners-page">
        <div className="ip-container">
          {/* ===================================================================
              FOLD 1 — IMMERSIVE HERO WITH TOPOLOGY ARTWORK AS BACKGROUND
              =================================================================== */}
          <motion.section
            className="ip-hero-canvas"
            initial="hidden"
            animate="show"
            variants={fadeUpVariants}
            aria-labelledby="ip-main-title"
          >
            {/* Background Artwork Layer */}
            <div className="ip-hero-bg-layer" aria-hidden="true">
              <img
                src="/images/investors-topology-art.jpg"
                alt=""
                className="ip-hero-bg-img"
              />
              <div className="ip-hero-scrim" />
            </div>

            {/* Top Blueprint HUD Bar */}
            <div className="ip-hero-hud-top">
              <div className="ip-hero-hud-left">
                <span className="ip-pulse-dot" aria-hidden="true" />
                <span>TOPOLOGY // RESILIENCE OPERATIONS CENTER (ResOC)</span>
              </div>
              <div className="ip-hero-hud-status">
                STATUS: MULTI-CLOUD DATA FABRIC ACTIVE
              </div>
            </div>

            {/* Hero Main Content (Floats over background on the left) */}
            <div className="ip-hero-content">
              <div className="ip-meta-bar">
                <div className="ip-eyebrow">
                  [ COMPANY · INVESTORS &amp; PARTNERS ]
                </div>
                <div className="ip-live-badge">
                  <span className="ip-pulse-dot" aria-hidden="true" />
                  <span>LEDGER AUDIT: CERTIFIED // 2026 ARCHIVE</span>
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

            {/* Bottom Blueprint HUD Bar */}
            <div className="ip-hero-hud-bottom">
              <span className="ip-hero-hud-caption">
                FIG 1.0 — AIR-GAPPED RECOVERY VAULTS · MULTI-CLOUD DATA CUBES · HIGH-SPEED TELEMETRY
              </span>
              <span className="ip-hero-hud-coord">LATENCY: &lt; 4ms // ZERO RETENTION</span>
            </div>
          </motion.section>

          {/* High-End Broadsheet KPI Strip (Docked to the Hero Canvas) */}
          <div className="ip-kpi-strip">
            <div className="ip-kpi-cell">
              <span className="ip-kpi-label">Capital Secured</span>
              <span className="ip-kpi-val">$2.3M SEED TRANCHE</span>
            </div>
            <div className="ip-kpi-cell">
              <span className="ip-kpi-label">Lead Institutional Partner</span>
              <span className="ip-kpi-val">KALAARI CAPITAL</span>
            </div>
            <div className="ip-kpi-cell">
              <span className="ip-kpi-label">Certified Runtimes</span>
              <span className="ip-kpi-val">6 ALLIANCES</span>
            </div>
            <div className="ip-kpi-cell">
              <span className="ip-kpi-label">Deployment Architecture</span>
              <span className="ip-kpi-val">AIR-GAPPED / HYBRID MESH</span>
            </div>
          </div>

          {/* ===================================================================
              FOLD 2 — INSTITUTIONAL CAPITAL & STRATEGIC ALLIANCES
              =================================================================== */}
          <section
            className="ip-ledger-section"
            aria-labelledby="ip-ledger-title"
          >
            <div className="ip-section-label">
              <span>FINANCIAL LEDGER &amp; ALLIANCE FABRIC</span>
              <span>EST. 2026</span>
            </div>

            <div className="ip-trust-grid">
              {/* Left Column (The Capital): Solid dark command block */}
              <div className="ip-capital-col">
                <div className="ip-capital-watermark" aria-hidden="true">
                  $2.3M
                </div>

                <div>
                  <div className="ip-capital-top-bar">
                    <div className="ip-capital-eyebrow">
                      [ MAIDEN ROUND ]
                    </div>
                    <div className="ip-status-chip">CONFIRMED SEED</div>
                  </div>

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
              </div>

              {/* Right Column (The Technology Ecosystem): Light paper surface */}
              <div className="ip-alliances-col">
                <div className="ip-alliances-header">
                  <div className="ip-alliances-top">
                    <h3 className="ip-alliances-h3">
                      Strategic Infrastructure Alliances
                    </h3>
                    <span className="ip-alliances-tag">RUNTIME VERIFIED</span>
                  </div>
                  <p className="ip-alliances-sub">
                    Direct architectural telemetry hooks and air-gapped recovery
                    bridges across cloud, model, and hardware fabrics.
                  </p>
                </div>

                {/* 6-cell Broadsheet partner grid */}
                <div className="ip-broadsheet-grid">
                  {TECH_ECOSYSTEM.map((partner) => (
                    <div
                      key={partner.name}
                      className="ip-partner-box"
                      title={partner.name}
                    >
                      <div className="ip-partner-type">
                        <span>{partner.type}</span>
                        <span className="ip-partner-latency">{partner.latency}</span>
                      </div>

                      <div className="ip-partner-logo-frame">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className={`ip-partner-img ip-logo-${partner.name.toLowerCase()}`}
                        />
                      </div>

                      <span className="ip-partner-mono">
                        [ {partner.name} ]
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================
              FOLD 3 — ARCHITECTURAL INTEGRATION MATRIX
              =================================================================== */}
          <section
            className="ip-matrix-section"
            aria-labelledby="ip-matrix-title"
          >
            <div className="ip-matrix-header">
              <div className="ip-matrix-eyebrow">[ RESILIENCE FABRIC ]</div>
              <h2 id="ip-matrix-title" className="ip-matrix-h2">
                Integration Architecture
              </h2>
            </div>

            <div className="ip-matrix-grid">
              {INTEGRATION_CAPABILITIES.map((cap) => (
                <div key={cap.index} className="ip-matrix-card">
                  <div className="ip-matrix-index-row">
                    <span className="ip-matrix-index">{cap.index} //</span>
                    <span className="ip-matrix-tag">{cap.tag}</span>
                  </div>
                  <h3 className="ip-matrix-title">{cap.title}</h3>
                  <p className="ip-matrix-body">{cap.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ===================================================================
              FOLD 4 — STRATEGIC ALLIANCE CTA
              =================================================================== */}
          <section
            className="ip-cta-banner"
            aria-labelledby="ip-cta-title"
          >
            <div className="ip-cta-left">
              <div className="ip-cta-eyebrow">
                [ STRATEGIC CO-DEVELOPMENT ]
              </div>
              <h2 id="ip-cta-title" className="ip-cta-title">
                Build with MeshDefend ResOC
              </h2>
              <p className="ip-cta-deck">
                We partner with leading cloud providers, OEMs, and system
                integrators to deliver verified cyber recovery.
              </p>
            </div>

            <Link href="/company/contact" className="ip-cta-btn">
              <span>Inquire About Partner Integrations</span>
              <span aria-hidden="true">→</span>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
