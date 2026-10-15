"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CAPABILITY_CARDS = [
  {
    id: "cyber-resilience",
    title: "Cyber Resilience",
    target: "Recovery readiness & risk",
    href: "/platform/cyber-resilience",
  },
  {
    id: "observability-reporting",
    title: "Observability & Reporting",
    target: "Operational evidence",
    href: "/platform/observability",
  },
  {
    id: "case-studies",
    title: "Case Studies",
    target: "Real-world application",
    href: "/resources/blogs",
  },
];

export function AssessmentPathwaysFold() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="assessment-pathways"
      aria-label="Progressive Disclosure Capabilities"
      style={{
        padding: "100px 0 110px",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border, rgba(34, 31, 34, 0.1))",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Hook */}
        <div style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "var(--font-body, Inter, sans-serif)",
              fontSize: "clamp(24px, 2.8vw, 36px)",
              fontWeight: 600,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              color: "var(--ink, #221f22)",
              margin: 0,
            }}
          >
            You found the gaps. Now explore what can close them.
          </h2>
        </div>

        {/* 3 Exposed Grid Cards Routing to Capabilities */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {CAPABILITY_CARDS.map((card, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  border: isHovered
                    ? "1px solid var(--orange, #f45532)"
                    : "1px solid var(--border, rgba(34, 31, 34, 0.15))",
                  backgroundColor: isHovered
                    ? "var(--surface-raised, #faf9f8)"
                    : "var(--bg, #fefdfd)",
                  borderRadius: 4,
                  padding: "36px 30px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 220,
                  transition: "all 0.2s ease",
                  boxShadow: isHovered
                    ? "0 12px 28px -12px rgba(244, 85, 50, 0.15)"
                    : "none",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif, 'Instrument Serif', Georgia, serif)",
                      fontSize: 32,
                      lineHeight: 1.15,
                      color: "var(--ink, #221f22)",
                      marginBottom: 12,
                    }}
                  >
                    {card.title}
                  </div>

                  <div
                    style={{
                      fontFamily: "var(--font-body, Inter, sans-serif)",
                      fontSize: 15,
                      color: "var(--muted, #6b6568)",
                      lineHeight: 1.45,
                    }}
                  >
                    {card.target}
                  </div>
                </div>

                <div style={{ marginTop: 32 }}>
                  <Link
                    href={card.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: isHovered ? "var(--orange, #f45532)" : "var(--ink, #221f22)",
                      textDecoration: "none",
                      letterSpacing: "0.04em",
                      transition: "color 0.2s ease",
                    }}
                  >
                    <span>EXPLORE CAPABILITY</span>
                    <span style={{ transform: isHovered ? "translateX(4px)" : "none", transition: "transform 0.2s ease" }}>
                      →
                    </span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
