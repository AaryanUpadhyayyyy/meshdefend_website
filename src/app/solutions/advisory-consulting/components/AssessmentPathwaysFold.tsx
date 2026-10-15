"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export function AssessmentPathwaysFold() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const pathways = [
    {
      id: "path-a",
      tag: "PATH A // RECOVERY READINESS & RISK",
      title: "Cyber Resilience",
      sub: "Assess recovery readiness & risk.",
      desc: "Deep-dive into continuous clean recovery point validation, ransomware encryption detection, and Minimum Viable Company (MVC) dependency mapping.",
      href: "/platform/cyber-resilience",
      cta: "Explore Cyber Resilience",
    },
    {
      id: "path-b",
      tag: "PATH B // OPERATIONAL EVIDENCE",
      title: "Observability & Reporting",
      sub: "Gather operational evidence & reporting.",
      desc: "Auto-compile unified telemetry across heterogeneous backup silos into board-level compliance reports and executive posture indexes.",
      href: "/platform/observability",
      cta: "Explore Observability & Reporting",
    },
    {
      id: "path-c",
      tag: "PATH C // ARCHITECTURAL FIT",
      title: "Deploy",
      sub: "See how the platform implements.",
      desc: "Inspect on-premises, hybrid cloud, and air-gapped zero-egress deployment models that adapt to client security perimeters without invasive agents.",
      href: "/platform/deploy",
      cta: "Inspect Deployment Models",
    },
  ];

  return (
    <section
      id="assessment-pathways"
      aria-label="Take the Assessment Further"
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
              color: "var(--orange, #f45532)",
              letterSpacing: "0.05em",
            }}
          >
            [ TAKE THE ASSESSMENT FURTHER ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 5 — 3 DEPTH PATHWAYS
          </span>
        </div>

        {/* Verbatim H2 */}
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
            You found the gaps. Now explore what can close them.
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
            Continuity and progressive disclosure: explore the specific technical platform capabilities
            most relevant to turning your audit findings into operational client solutions.
          </p>
        </div>

        {/* 3 Interactive Routing Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {pathways.map((p, idx) => {
            const isHovered = hoveredCard === idx;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  border: isHovered
                    ? "1px solid var(--ink)"
                    : "1px solid var(--border)",
                  backgroundColor: isHovered
                    ? "var(--surface-raised, #faf9f8)"
                    : "var(--bg)",
                  padding: "36px 30px",
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
                      fontSize: 10,
                      fontWeight: 600,
                      color: isHovered
                        ? "var(--orange, #f45532)"
                        : "var(--muted)",
                      letterSpacing: "0.05em",
                      marginBottom: 14,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {p.tag}
                  </div>

                  <h3
                    style={{
                      fontFamily:
                        'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 30,
                      lineHeight: 1.15,
                      color: "var(--ink)",
                      fontWeight: 400,
                      marginBottom: 8,
                    }}
                  >
                    {p.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 14,
                    }}
                  >
                    {p.sub}
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 13.5,
                      lineHeight: 1.5,
                      color: "var(--muted)",
                      marginBottom: 28,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>

                <Link
                  href={p.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "13px 18px",
                    backgroundColor: isHovered
                      ? "var(--ink)"
                      : "var(--surface-raised, #f7f6f5)",
                    color: isHovered ? "var(--bg)" : "var(--ink)",
                    border: "1px solid var(--border)",
                    fontFamily:
                      'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11.5,
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>{p.cta}</span>
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
