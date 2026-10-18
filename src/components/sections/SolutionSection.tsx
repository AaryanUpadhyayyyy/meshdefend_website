"use client";

import { useState } from "react";
import Link from "next/link";
import { SOLUTION } from "@/lib/sections";
import { Reveal, RevealGroup } from "@/components/motion";

export function SolutionSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="solution"
      style={{
        padding: "96px 0 112px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* ─── SECTION HEADER with 0.08s stepped reveals ─── */}
        <div style={{ maxWidth: 880, marginBottom: 48 }}>
          {/* Eyebrow */}
          <Reveal delay={0}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--orange)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {SOLUTION.eyebrow}
              </span>
            </div>
          </Reveal>

          {/* H2 Headline */}
          <Reveal delay={0.08}>
            <h2
              className="display"
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(38px, 4.6vw, 64px)",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                margin: "0 0 18px 0",
                color: "var(--ink)",
                fontWeight: 400,
              }}
            >
              {SOLUTION.headline}
            </h2>
          </Reveal>

          {/* Exact Sitemap Lede */}
          <Reveal delay={0.16}>
            <p
              style={{
                fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                fontSize: "clamp(16px, 1.8vw, 19px)",
                color: "var(--muted)",
                lineHeight: 1.6,
                maxWidth: "68ch",
                margin: 0,
              }}
            >
              {SOLUTION.lede}
            </p>
          </Reveal>
        </div>

        {/* ─── 5-ROW FULL-WIDTH INTERACTIVE CAPABILITY INDEX (staggered 0.1s) ─── */}
        <RevealGroup
          staggerDelay={0.1}
          style={{
            border: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
            {SOLUTION.items.map((item, idx) => {
              const isHovered = hoveredIdx === idx;
              const isLast = idx === SOLUTION.items.length - 1;

              return (
                <Link
                  key={item.num}
                  href={item.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "56px 1.4fr 1.6fr 44px",
                    alignItems: "center",
                    gap: 24,
                    padding: "28px 32px",
                    borderBottom: isLast ? "none" : "1px solid var(--border)",
                    textDecoration: "none",
                    background: isHovered ? "var(--surface)" : "var(--bg)",
                    position: "relative",
                    transition: "background 0.2s ease",
                  }}
                  className="capability-index-row"
                >
                  {/* Orange Sweep Indicator Bar on Hover */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 2,
                      background: "var(--orange)",
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity 0.2s ease",
                    }}
                  />

                  {/* Col 1: Index Number */}
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 13,
                      fontWeight: 600,
                      color: isHovered ? "var(--orange)" : "var(--muted)",
                      letterSpacing: "0.04em",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.num}
                  </div>

                  {/* Col 2: Capability Name */}
                  <div
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: "clamp(22px, 2.4vw, 30px)",
                      color: "var(--ink)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                      fontWeight: 400,
                    }}
                    className="capability-title"
                  >
                    {item.capability}
                  </div>

                  {/* Col 3: What It Solves */}
                  <div
                    style={{
                      fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                      fontSize: 15,
                      color: isHovered ? "var(--ink)" : "var(--muted)",
                      lineHeight: 1.5,
                      transition: "color 0.2s ease",
                    }}
                    className="capability-solves"
                  >
                    {item.solves}
                  </div>

                  {/* Col 4: Right Arrow */}
                  <div
                    style={{
                      textAlign: "right",
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 18,
                      color: isHovered ? "var(--orange)" : "var(--muted)",
                      transform: isHovered ? "translateX(4px)" : "none",
                      transition: "transform 0.2s ease, color 0.2s ease",
                    }}
                  >
                    →
                  </div>
                </Link>
              );
            })}
        </RevealGroup>
      </div>
    </section>
  );
}
