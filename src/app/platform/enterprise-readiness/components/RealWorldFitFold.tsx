"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export function RealWorldFitFold() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      id="real-world-fit"
      aria-label="From Readiness to Real-World Fit"
      style={{
        padding: "110px 0 120px",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Section Header Eyebrow & Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 12,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              fontWeight: 600,
              color: "var(--muted)",
              letterSpacing: "0.04em",
            }}
          >
            From Readiness to Real-World Fit
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 4 — DUAL ARCHITECTURAL ROUTING
          </span>
        </div>

        {/* Display H2 Heading */}
        <div style={{ maxWidth: 940, marginBottom: 48 }}>
          <h2
            style={{
              fontFamily:
                'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(34px, 4vw, 50px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 16,
            }}
          >
            Enterprise-ready also means ready for the environment you already have.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 17,
              lineHeight: 1.5,
              color: "var(--muted)",
              margin: 0,
              maxWidth: 780,
            }}
          >
            Readiness is not an abstract certification—it is the operational reality of how quickly a platform
            deploys, and how seamlessly it coordinates with your existing enterprise architecture.
          </p>
        </div>

        {/* Central Conduit Node & Animated Branching 1px SVG Line */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 0,
          }}
        >
          {/* Center Hub Node */}
          <div
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface-raised, #f7f6f5)",
              padding: "8px 20px",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              fontWeight: 600,
              color: "var(--ink)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              zIndex: 2,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                backgroundColor: "var(--orange, #f45532)",
              }}
            />
            <span>MESHDEFEND CONTROL BUS // ARCHITECTURAL ROUTING</span>
          </div>

          {/* SVG Conduit: Vertical Trunk -> Horizontal Split -> Left & Right Drop */}
          <div
            style={{
              width: "100%",
              maxWidth: 900,
              height: 48,
              position: "relative",
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 900 48"
              fill="none"
              preserveAspectRatio="none"
              style={{ overflow: "visible" }}
            >
              {/* Central Trunk Downward */}
              <motion.line
                x1="450"
                y1="0"
                x2="450"
                y2="24"
                stroke="var(--orange, #f45532)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />

              {/* Left Branch */}
              <motion.path
                d="M 450 24 L 225 24 L 225 48"
                stroke="var(--orange, #f45532)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: "easeInOut" }}
              />

              {/* Right Branch */}
              <motion.path
                d="M 450 24 L 675 24 L 675 48"
                stroke="var(--orange, #f45532)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </div>

        {/* 2-Column Split: Two Interactive Architectural Routing Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            gap: 24,
          }}
        >
          {/* CARD 1: DEPLOY */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              border:
                hoveredCard === 0
                  ? "1px solid var(--ink)"
                  : "1px solid var(--border)",
              backgroundColor:
                hoveredCard === 0
                  ? "var(--surface-raised, #faf9f8)"
                  : "var(--bg)",
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.2s ease",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily:
                    'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  fontWeight: 600,
                  color:
                    hoveredCard === 0
                      ? "var(--orange, #f45532)"
                      : "var(--muted)",
                  letterSpacing: "0.06em",
                  marginBottom: 16,
                  transition: "color 0.2s ease",
                }}
              >
                [ PATHWAY 01 // IMPLEMENTATION ]
              </div>

              <h3
                style={{
                  fontFamily:
                    'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: 34,
                  lineHeight: 1.1,
                  color: "var(--ink)",
                  fontWeight: 400,
                  marginBottom: 12,
                }}
              >
                Deploy: Understand implementation
              </h3>

              <div
                style={{
                  fontFamily:
                    'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 16,
                  backgroundColor: "rgba(34, 31, 34, 0.04)",
                  padding: "8px 12px",
                  borderLeft: "2px solid var(--orange, #f45532)",
                }}
              >
                On-Premises, Cloud, Hybrid, Multi-Cloud.
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  marginBottom: 24,
                }}
              >
                Zero-disruptive metadata ingestion without agent installations across production databases.
                Explore topology diagrams for air-gapped on-premise appliances, dedicated VPCs, and multi-region clusters.
              </p>
            </div>

            <Link
              href="/platform/deploy"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                backgroundColor:
                  hoveredCard === 0
                    ? "var(--ink)"
                    : "var(--surface-raised, #f7f6f5)",
                color: hoveredCard === 0 ? "var(--bg)" : "var(--ink)",
                border: "1px solid var(--border)",
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.03em",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <span>Inspect Deployment Models</span>
              <span>→</span>
            </Link>
          </motion.div>

          {/* CARD 2: FLEXIBILITY */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              border:
                hoveredCard === 1
                  ? "1px solid var(--ink)"
                  : "1px solid var(--border)",
              backgroundColor:
                hoveredCard === 1
                  ? "var(--surface-raised, #faf9f8)"
                  : "var(--bg)",
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.2s ease",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily:
                    'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  fontWeight: 600,
                  color:
                    hoveredCard === 1
                      ? "var(--orange, #f45532)"
                      : "var(--muted)",
                  letterSpacing: "0.06em",
                  marginBottom: 16,
                  transition: "color 0.2s ease",
                }}
              >
                [ PATHWAY 02 // COMPATIBILITY ]
              </div>

              <h3
                style={{
                  fontFamily:
                    'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: 34,
                  lineHeight: 1.1,
                  color: "var(--ink)",
                  fontWeight: 400,
                  marginBottom: 12,
                }}
              >
                Built for Flexibility
              </h3>

              <div
                style={{
                  fontFamily:
                    'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 16,
                  backgroundColor: "rgba(34, 31, 34, 0.04)",
                  padding: "8px 12px",
                  borderLeft: "2px solid var(--orange, #f45532)",
                }}
              >
                Bring your own Models, Backup softwares, Storage, and ITSM.
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  marginBottom: 24,
                }}
              >
                Zero rip-and-replace. Works above Commvault, Veeam, Dell, NetApp, Pure Storage, AWS,
                and ServiceNow, with model-agnostic reasoning supporting private Azure OpenAI or local models.
              </p>
            </div>

            <Link
              href="/platform/built-for-flexibility"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                backgroundColor:
                  hoveredCard === 1
                    ? "var(--ink)"
                    : "var(--surface-raised, #f7f6f5)",
                color: hoveredCard === 1 ? "var(--bg)" : "var(--ink)",
                border: "1px solid var(--border)",
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.03em",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <span>Explore Ecosystem Compatibility</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
