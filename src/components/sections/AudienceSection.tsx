"use client";

import { useState } from "react";
import Link from "next/link";
import { AUDIENCE } from "@/lib/sections";
import { Reveal, RevealGroup } from "@/components/motion";

const AUDIENCE_SEGMENT_ORDER = [
  "/solutions/enterprises",
  "/solutions/advisory-consulting",
  "/solutions/system-integrators",
  "/solutions/managed-services",
];

function AudienceMark({ id }: { id: string }) {
  const shared = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <span className={`audience-cell__mark audience-cell__mark--${id}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" focusable="false">
        {id === "si" && (
          <g {...shared}>
            <path d="M12 12h13v11H12zM27 25h10v11H27zM10 29h11v9H10z" />
            <path d="M25 17h5a5 5 0 0 1 5 5v3M17 23v6M21 33h6" />
            <circle cx="12" cy="12" r="1.8" className="audience-cell__mark-accent" />
            <circle cx="37" cy="36" r="1.8" className="audience-cell__mark-accent" />
          </g>
        )}
        {id === "msp" && (
          <g {...shared}>
            <rect x="10" y="10" width="28" height="12" rx="2.5" />
            <rect x="10" y="26" width="28" height="12" rx="2.5" />
            <path d="M16 16h12M16 32h12" />
            <circle cx="33" cy="16" r="1.5" className="audience-cell__mark-accent" />
            <circle cx="33" cy="32" r="1.5" className="audience-cell__mark-accent" />
          </g>
        )}
        {id === "advisory" && (
          <g {...shared}>
            <circle cx="24" cy="24" r="14" />
            <path d="m29.5 18.5-3.8 8.2-8.2 3.8 3.8-8.2 8.2-3.8Z" />
            <path d="m24 10 .8 3M38 24l-3 .8M24 38l-.8-3M10 24l3-.8" />
            <circle cx="24" cy="24" r="1.5" className="audience-cell__mark-accent" />
          </g>
        )}
        {id === "enterprises" && (
          <g {...shared}>
            <path d="M10 38V17l14-7 14 7v21M7 38h34" />
            <path d="M16 21h4M28 21h4M16 27h4M28 27h4M21 38v-6h6v6" />
            <path d="M24 10v4" className="audience-cell__mark-accent" />
          </g>
        )}
      </svg>
    </span>
  );
}

export function AudienceSection({ content }: { content?: Partial<typeof AUDIENCE> } = {}) {
  const segments = [...(content?.segments ?? AUDIENCE.segments)]
    .map((segment, originalIndex) => ({
      segment,
      originalIndex,
      order: AUDIENCE_SEGMENT_ORDER.indexOf(segment.href.replace(/\/+$/, "")),
    }))
    .sort((a, b) => {
      const orderA = a.order < 0 ? AUDIENCE_SEGMENT_ORDER.length + a.originalIndex : a.order;
      const orderB = b.order < 0 ? AUDIENCE_SEGMENT_ORDER.length + b.originalIndex : b.order;
      return orderA - orderB;
    })
    .map(({ segment }, index) => ({
      ...segment,
      num: String(index + 1).padStart(2, "0"),
    }));
  const audience = {
    ...AUDIENCE,
    ...content,
    segments,
  };
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="audience"
      className="home-audience-section"
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
          {audience.eyebrow && (
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
          )}

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
                      <div className="audience-cell__meta">
                        <span
                          className="audience-cell__number"
                          style={{ color: isHovered ? "var(--orange)" : "var(--muted)" }}
                        >
                          {seg.num}
                        </span>
                        <AudienceMark id={seg.id} />
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
