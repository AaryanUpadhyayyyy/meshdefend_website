"use client";

import { useState } from "react";
import Link from "next/link";
import { AUDIENCE } from "@/lib/sections";
import { Reveal, RevealGroup } from "@/components/motion";

export function AudienceSection({ content }: { content?: Partial<typeof AUDIENCE> } = {}) {
  const audience = {
    ...AUDIENCE,
    ...content,
    segments: content?.segments ?? AUDIENCE.segments,
  };
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="audience"
      style={{
        padding: "96px 0 112px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* ─── SECTION HEADER with stepped reveals ─── */}
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
                {audience.eyebrow}
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
                margin: 0,
                color: "var(--ink)",
                fontWeight: 400,
              }}
            >
              {audience.headline}
            </h2>
          </Reveal>
        </div>

        {/* ─── 4-COLUMN EXPOSED 1PX GRID ON VAR(--BG) ─── */}
        <div
          style={{
            border: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          <RevealGroup
            staggerDelay={0.1}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
            className="audience-grid"
          >
              {audience.segments.map((seg, idx) => {
                const isHovered = hoveredIdx === idx;
                const isLast = idx === audience.segments.length - 1;

                return (
                  <Link
                    key={seg.id}
                    href={seg.href}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      padding: "36px 28px",
                      background: isHovered ? "var(--surface)" : "var(--bg)",
                      borderRight: isLast ? "none" : "1px solid var(--border)",
                      position: "relative",
                      textDecoration: "none",
                      transition: "background 0.2s ease",
                    }}
                    className="audience-cell"
                  >
                    {/* Animated 2px Orange Top Border Line on Hover */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: "var(--orange)",
                        transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    />

                    <div>
                      {/* Numeral */}
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 12,
                          color: isHovered ? "var(--orange)" : "var(--muted)",
                          marginBottom: 16,
                          fontWeight: 600,
                          transition: "color 0.2s ease",
                        }}
                      >
                        {seg.num}
                      </div>

                      {/* Persona Title */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                          fontSize: "clamp(24px, 2.2vw, 28px)",
                          lineHeight: 1.15,
                          letterSpacing: "-0.02em",
                          fontWeight: 400,
                          color: "var(--ink)",
                          margin: "0 0 14px 0",
                          transform: isHovered ? "translateX(4px)" : "none",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        {seg.title}
                      </h3>

                      {/* Exact 1-Sentence Sitemap Description */}
                      <p
                        style={{
                          fontFamily: "var(--font-body), Inter, -apple-system, sans-serif",
                          fontSize: 14.5,
                          color: "var(--muted)",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {seg.desc}
                      </p>
                    </div>

                    {/* Bottom Arrow Indicator */}
                    <div
                      style={{
                        marginTop: 28,
                        display: "flex",
                        alignItems: "center",
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 16,
                        color: isHovered ? "var(--orange)" : "var(--muted)",
                        fontWeight: 600,
                        transition: "color 0.2s ease, transform 0.2s ease",
                        transform: isHovered ? "translateX(4px)" : "none",
                      }}
                    >
                      →
                    </div>
                  </Link>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </section>
    );
  }
