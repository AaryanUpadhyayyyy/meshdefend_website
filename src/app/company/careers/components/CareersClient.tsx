"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Reveal, RevealGroup } from "@/components/motion";

// Active Engineering & Operations Roles (Total: 6 — Eng: 3, Infra: 1, GTM: 2)
const ACTIVE_ROLES = [
  {
    id: "role-1",
    title: "Founding Engineer, Agentic AI",
    dept: "Engineering",
    category: "Engineering",
    location: "Bengaluru (Hybrid)",
    level: "Staff / Principal",
    stack: ["Rust", "Python", "PyTorch", "vLLM", "Distributed Systems"],
    desc: "Design deterministic multi-agent reasoning meshes that autonomously isolate compromised infrastructure nodes and orchestrate verified production reconstitution.",
    emailSubject: "Application: Founding Engineer, Agentic AI",
  },
  {
    id: "role-2",
    title: "Staff Distributed Systems Engineer",
    dept: "Engineering",
    category: "Engineering",
    location: "Bengaluru (Hybrid)",
    level: "Staff",
    stack: ["Go", "Rust", "Distributed Storage", "Raft", "eBPF"],
    desc: "Architect low-latency telemetry ingestion engines and distributed state synchronization fabrics across heterogeneous multi-cloud backup estates.",
    emailSubject: "Application: Staff Distributed Systems Engineer",
  },
  {
    id: "role-3",
    title: "Staff SRE (Recovery Operations)",
    dept: "Engineering",
    category: "Engineering",
    location: "Bengaluru (Hybrid)",
    level: "Staff",
    stack: ["Go", "Kafka", "PostgreSQL", "Temporal", "Observability"],
    desc: "Build resilient coordination fabrics that manage real-time failover, transaction log replay, and immutable state verification checkpoints.",
    emailSubject: "Application: Staff SRE (Recovery Ops)",
  },
  {
    id: "role-4",
    title: "Senior Security Architect",
    dept: "Infrastructure",
    category: "Infrastructure",
    location: "Bengaluru (Hybrid)",
    level: "Senior",
    stack: ["eBPF", "Linux Kernel", "Zero-Trust", "mTLS", "Air-Gap"],
    desc: "Architect cryptographic telemetry diodes and kernel-level observers that mirror production recovery state without introducing external attack vectors.",
    emailSubject: "Application: Senior Security Architect",
  },
  {
    id: "role-5",
    title: "Enterprise Solutions Engineer",
    dept: "Go-To-Market",
    category: "GTM",
    location: "Remote / Bengaluru",
    level: "Lead",
    stack: ["AWS", "Azure", "Terraform", "Kubernetes", "Enterprise Storage"],
    desc: "Lead deep technical architecture proof-of-concepts with Fortune 500 CISOs and infrastructure teams, deploying across complex multi-cloud estates.",
    emailSubject: "Application: Enterprise Solutions Engineer",
  },
  {
    id: "role-6",
    title: "Technical Alliance & Partner Director",
    dept: "Go-To-Market",
    category: "GTM",
    location: "Remote / Hybrid",
    level: "Director",
    stack: ["Global SIs", "MSP Architecture", "Cloud Alliances", "ITSM"],
    desc: "Structure and scale co-selling and technical delivery partnerships with premier global systems integrators and managed service providers.",
    emailSubject: "Application: Technical Alliance & Partner Director",
  },
];

// Engineering Principles (Concise 1-line blueprints)
const ENGINEERING_PRINCIPLES = [
  {
    index: "01",
    title: "Hard Systems Engineering",
    tag: "ZERO CRUD",
    body: "Direct kernel filesystem observers, air-gapped cryptographic diodes, and multi-tenant distributed storage fabrics. No boilerplate apps.",
  },
  {
    index: "02",
    title: "High Autonomy & Ownership",
    tag: "FLAT ARCHITECTURE",
    body: "You own your service end-to-end: from architectural RFC and kernel code to production validation with enterprise engineering teams.",
  },
  {
    index: "03",
    title: "Agentic Determinism",
    tag: "GOVERNED MESH",
    body: "Replacing brittle recovery scripts with Human-in-the-Loop agentic coordination operating under strict cryptographic guardrails.",
  },
];

// The Engineering Contract & Benefits
const ENGINEERING_BENEFITS = [
  {
    index: "04",
    title: "Direct Impact & Meaningful Equity",
    tag: "EQUITY & OWNERSHIP",
    body: "Substantial early-stage equity grants, transparent valuation metrics, and market-competitive compensation packages.",
  },
  {
    index: "05",
    title: "Modern Lab & Multi-Cloud Testbeds",
    tag: "INFRASTRUCTURE ACCESS",
    body: "High-spec development workstations, dedicated multi-cloud testbeds, and local model inference compute environments.",
  },
  {
    index: "06",
    title: "Flexible Modern Cadence",
    tag: "BENGALURU + REMOTE",
    body: "Modern collaborative engineering hub in central Bengaluru with top-tier ergonomics, async documentation culture, and hybrid flexibility.",
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

const cardMotionVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2 },
  },
};

export function CareersClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const engCount = ACTIVE_ROLES.filter((r) => r.category === "Engineering").length;
  const infraCount = ACTIVE_ROLES.filter((r) => r.category === "Infrastructure").length;
  const gtmCount = ACTIVE_ROLES.filter((r) => r.category === "GTM").length;

  const categories = [
    { label: "All Roles", value: "All", count: ACTIVE_ROLES.length },
    { label: "Engineering", value: "Engineering", count: engCount },
    { label: "Infrastructure", value: "Infrastructure", count: infraCount },
    { label: "Go-To-Market", value: "GTM", count: gtmCount },
  ];

  const filteredRoles =
    activeCategory === "All"
      ? ACTIVE_ROLES
      : ACTIVE_ROLES.filter((r) => r.category === activeCategory);

  return (
    <div className="careers-page-client">
      {/* ===================================================================
          FOLD 1 — EXPANSIVE FULL-WIDTH HERO SECTION
          =================================================================== */}
      <motion.section
        className="careers-hero"
        initial="hidden"
        animate="show"
        variants={fadeUpVariants}
        aria-labelledby="careers-main-title"
      >
        {/* Full-Bleed Background Artwork Layer */}
        <div className="careers-hero-bg-layer" aria-hidden="true">
          <img
            src="/images/careers-lab-studio.jpg"
            alt=""
            className="careers-hero-bg-img careers-hero-bg-img--light"
          />
          <img
            src="/images/careers-lab-studio-dark.jpg"
            alt=""
            className="careers-hero-bg-img careers-hero-bg-img--dark"
          />
          <div className="careers-hero-scrim" />
        </div>

        <div className="careers-container careers-hero-container">
          {/* Hero Main Content */}
          <div className="careers-hero-content">
            <div className="careers-meta-bar">
              <div className="careers-eyebrow">
                [ COMPANY // CAREERS &amp; ENGINEERING CULTURE ]
              </div>
            </div>

            <h1 id="careers-main-title" className="careers-title">
              Built by systems architects. Shape the core.
            </h1>

            <p className="careers-deck">
              We are building the autonomous operations layer for enterprise cyber resilience.
              Work directly with enterprise infrastructure architects, solve zero-day recovery challenges,
              and build deterministic systems.
            </p>
          </div>
        </div>
      </motion.section>

      {/* High-End Engineering KPI Ticker (Full-width Docked Band) */}
      <section className="careers-kpi-band">
        <div className="careers-container">
          <div className="careers-kpi-strip">
            <div className="careers-kpi-cell">
              <span className="careers-kpi-label">Institutional Funding</span>
              <span className="careers-kpi-val">$2.3M SEED CAPITAL</span>
            </div>
            <div className="careers-kpi-cell">
              <span className="careers-kpi-label">Founding Pedigree</span>
              <span className="careers-kpi-val">EX-AWS · NUTANIX · COMMVAULT</span>
            </div>
          </div>
        </div>
      </section>

      <div className="careers-container">
        {/* ===================================================================
            FOLD 2 — OPEN POSITIONS (The Talent Pipeline)
            =================================================================== */}
        <section
          className="careers-positions-section"
          aria-labelledby="careers-positions-title"
        >
          <div className="careers-positions-header">
            <Reveal delay={0}>
              <h2 id="careers-positions-title" className="careers-positions-h2">
                Open Positions
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="careers-filters" role="tablist" aria-label="Role department filter">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`careers-filter-btn ${
                      activeCategory === cat.value ? "is-active" : ""
                    }`}
                    aria-pressed={activeCategory === cat.value}
                  >
                    {cat.label} ({cat.count})
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="careers-roles-list">
              <AnimatePresence mode="popLayout">
                {filteredRoles.map((role) => (
                  <motion.a
                    key={role.id}
                    href={`mailto:careers@meshdefend.ai?subject=${encodeURIComponent(
                      role.emailSubject
                    )}`}
                    className="careers-role-card"
                    variants={cardMotionVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    layout
                  >
                    <div className="careers-role-top">
                      <div className="careers-role-meta-chips">
                        <span className="careers-chip-dept">
                          [ {role.dept.toUpperCase()} ]
                        </span>
                        <span className="careers-chip-tag">{role.location}</span>
                        <span className="careers-chip-tag">{role.level}</span>
                      </div>
                      <span
                        className="careers-chip-tag"
                        style={{ color: "var(--orange)", fontWeight: 600 }}
                      >
                        FULL-TIME
                      </span>
                    </div>

                    <div className="careers-role-mid">
                      <div className="careers-role-main">
                        <h3 className="careers-role-title">{role.title}</h3>
                        <p className="careers-role-desc">{role.desc}</p>
                      </div>

                      <div className="careers-role-action-wrap">
                        <span className="careers-role-action">
                          <span>Apply</span>
                          <span className="careers-role-arrow" aria-hidden="true">
                            ↗
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="careers-role-bottom">
                      <span className="careers-stack-label">Stack:</span>
                      {role.stack.map((item) => (
                        <span key={item} className="careers-stack-chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>
          </Reveal>
        </section>

        {/* ===================================================================
            FOLD 3 — ENGINEERING PRINCIPLES (No Fluff)
            =================================================================== */}
        <section
          className="careers-principles-section"
          aria-labelledby="careers-principles-title"
        >
          <div className="careers-section-header">
            <Reveal delay={0}>
              <div className="careers-section-eyebrow">[ OPERATING CODE ]</div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="careers-principles-title" className="careers-section-h2">
                Engineering Principles
              </h2>
            </Reveal>
          </div>

          <RevealGroup staggerDelay={0.1} className="careers-principles-grid">
            {ENGINEERING_PRINCIPLES.map((principle) => (
              <div key={principle.index} className="careers-principle-card">
                <div className="careers-principle-top-row">
                  <span className="careers-principle-index">{principle.index} //</span>
                  <span className="careers-principle-tag">{principle.tag}</span>
                </div>
                <h3 className="careers-principle-title">{principle.title}</h3>
                <p className="careers-principle-body">{principle.body}</p>
              </div>
            ))}
          </RevealGroup>
        </section>

        {/* ===================================================================
            FOLD 4 — WHAT WE OFFER (The Engineering Contract)
            =================================================================== */}
        <section
          className="careers-benefits-section"
          aria-labelledby="careers-benefits-title"
        >
          <div className="careers-section-header">
            <Reveal delay={0}>
              <div className="careers-section-eyebrow">[ THE ENVIRONMENT ]</div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="careers-benefits-title" className="careers-section-h2">
                The Engineering Contract
              </h2>
            </Reveal>
          </div>

          <RevealGroup staggerDelay={0.1} className="careers-principles-grid">
            {ENGINEERING_BENEFITS.map((benefit) => (
              <div key={benefit.index} className="careers-principle-card">
                <div className="careers-principle-top-row">
                  <span className="careers-principle-index">{benefit.index} //</span>
                  <span className="careers-principle-tag">{benefit.tag}</span>
                </div>
                <h3 className="careers-principle-title">{benefit.title}</h3>
                <p className="careers-principle-body">{benefit.body}</p>
              </div>
            ))}
          </RevealGroup>
        </section>

        {/* ===================================================================
            FOLD 5 — GENERAL INQUIRIES & CANDIDATE BANNER
            =================================================================== */}
        <section
          className="careers-cta-banner"
          aria-labelledby="careers-inquiries-title"
        >
          <div className="careers-cta-left">
            <Reveal delay={0}>
              <div className="careers-cta-eyebrow">[ OPEN INQUIRIES ]</div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="careers-inquiries-title" className="careers-cta-title">
                Don&apos;t see your exact role?
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="careers-cta-deck">
                We are always seeking exceptional systems engineers, distributed
                telemetry architects, and resilience specialists.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.24}>
            <a
              href="mailto:careers@meshdefend.ai?subject=General%20Application%20-%20Resilience%20Engineering"
              className="careers-cta-btn"
            >
              <span>Submit General Application</span>
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
