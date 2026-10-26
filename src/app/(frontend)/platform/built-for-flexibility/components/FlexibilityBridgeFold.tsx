"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export function FlexibilityBridgeFold() {
  const [hoveredBranch, setHoveredBranch] = useState<number | null>(null);

  const branches = [
    {
      num: "01",
      tag: "DEPLOYMENT & CONNECTIVITY",
      title: "Deploy: How MeshDefend connects",
      sub: "See how MeshDefend connects to your environment across on-premises, hybrid, or air-gapped topologies with zero invasive agents.",
      href: "/platform/deploy",
      cta: "Explore Deployment Models",
    },
    {
      num: "02",
      tag: "GOVERNANCE & ENTERPRISE CONTROLS",
      title: "Enterprise Readiness: Governed & secured",
      sub: "See how those connections are governed and secured with zero-trust boundaries, cryptographic HITL controls, and audit trails.",
      href: "/platform/enterprise-readiness",
      cta: "Review Governance & Security",
    },
  ];

  return (
    <section
      id="flexibility-bridge"
      aria-label="Progressive Disclosure: Next Operational Steps"
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
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 14,
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
            Progressive Disclosure
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 5 — TWO STRATEGIC PATHWAYS
          </span>
        </div>

        {/* Verbatim Hook H2 */}
        <div style={{ maxWidth: 940, marginBottom: 54 }}>
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
            Your stack fits. Now see what it takes to connect it.
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
            Once you know your technology choices remain yours, the next question is naturally how your stack gets connected, deployed, and governed.
            Follow the paths below to inspect implementation architecture or enterprise security controls.
          </p>
        </div>

        {/* Two 1px Routing Paths */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: 24,
          }}
        >
          {branches.map((b, idx) => {
            const isHovered = hoveredBranch === idx;
            return (
              <motion.div
                key={b.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.15 }}
                onMouseEnter={() => setHoveredBranch(idx)}
                onMouseLeave={() => setHoveredBranch(null)}
                style={{
                  border: isHovered
                    ? "1px solid var(--ink)"
                    : "1px solid var(--border)",
                  backgroundColor: isHovered
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
                      color: isHovered
                        ? "var(--orange, #f45532)"
                        : "var(--muted)",
                      letterSpacing: "0.06em",
                      marginBottom: 14,
                      transition: "color 0.2s ease",
                    }}
                  >
                    [ PATHWAY {b.num} // {b.tag} ]
                  </div>

                  <h3
                    style={{
                      fontFamily:
                        'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 32,
                      lineHeight: 1.15,
                      color: "var(--ink)",
                      fontWeight: 400,
                      marginBottom: 14,
                    }}
                  >
                    {b.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 14.5,
                      lineHeight: 1.55,
                      color: "var(--muted)",
                      marginBottom: 32,
                    }}
                  >
                    {b.sub}
                  </p>
                </div>

                <Link
                  href={b.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 20px",
                    backgroundColor: isHovered
                      ? "var(--ink)"
                      : "var(--surface-raised, #f7f6f5)",
                    color: isHovered ? "var(--bg)" : "var(--ink)",
                    border: "1px solid var(--border)",
                    fontFamily:
                      'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>{b.cta}</span>
                  <span>→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
