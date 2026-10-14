"use client";

import { useState, useEffect, useRef } from "react";
import { PAIN } from "@/lib/sections";
import { MeshDefendBackground } from "@/components/hero/MeshDefendBackground";

export function PainSection() {
  const [activeToggle, setActiveToggle] = useState<"today" | "resoc">("today");
  const [selectedGap, setSelectedGap] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [inView, setInView] = useState(false);
  const [headlineChars, setHeadlineChars] = useState(0);
  const [openingChars, setOpeningChars] = useState(0);
  const [isTypingOpening, setIsTypingOpening] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Scroll detection
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const checkVisibility = () => {
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top <= vh * 0.85 && rect.bottom >= 40) {
        setInView(true);
      } else if (rect.top > vh * 0.95) {
        setInView(false);
        setHeadlineChars(0);
        setOpeningChars(0);
        setIsTypingOpening(false);
        setIsFinished(false);
      }
    };

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });
    checkVisibility();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
      observer.disconnect();
    };
  }, []);

  const isHeadlineComplete = headlineChars >= PAIN.headline.length;

  // Sequential Typewriter Animation
  useEffect(() => {
    if (!inView || isFinished) return;

    let timer: NodeJS.Timeout;

    if (headlineChars === 0 && !isTypingOpening) {
      timer = setTimeout(() => {
        setHeadlineChars(1);
      }, 100);
      return () => clearTimeout(timer);
    }

    if (headlineChars < PAIN.headline.length) {
      timer = setTimeout(() => {
        setHeadlineChars((prev) => prev + 1);
      }, 16);
    } else if (!isTypingOpening) {
      timer = setTimeout(() => {
        setIsTypingOpening(true);
      }, 100);
    } else if (openingChars < PAIN.openingLine.length) {
      timer = setTimeout(() => {
        setOpeningChars((prev) => prev + 1);
      }, 12);
    } else {
      timer = setTimeout(() => {
        setIsFinished(true);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [inView, headlineChars, openingChars, isTypingOpening, isFinished]);

  const displayedHeadline = inView ? PAIN.headline.slice(0, headlineChars) : "";
  const displayedOpeningLine = isTypingOpening ? PAIN.openingLine.slice(0, openingChars) : "";

  return (
    <section
      id="pain"
      style={{
        padding: "80px 0 96px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle Living Resilience Mesh Background (Floating Orange Particles) */}
      <MeshDefendBackground variant="subtle" density="sparse" />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* ─── EDITORIAL HEADER ─── */}
        <div ref={headerRef} style={{ maxWidth: 980, marginBottom: 52 }}>
          <div
            className="eyebrow"
            style={{
              marginBottom: 16,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <span className="eyebrow-dot" />
            THE REALITY OF ENTERPRISE RESILIENCE
          </div>

          {/* Headline with Layout-Locked Typing Animation */}
          <div style={{ display: "grid", marginBottom: 14 }}>
            <h2
              className="display"
              aria-hidden="true"
              style={{
                visibility: "hidden",
                gridArea: "1 / 1",
                fontSize: "clamp(34px, 4.4vw, 58px)",
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                margin: 0,
                pointerEvents: "none",
              }}
            >
              {PAIN.headline}
            </h2>
            <h2
              className="display"
              style={{
                gridArea: "1 / 1",
                fontSize: "clamp(34px, 4.4vw, 58px)",
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                margin: 0,
                color: "var(--ink)",
              }}
            >
              {displayedHeadline}
              {inView && !isHeadlineComplete && (
                <span className="typing-cursor" style={{ color: "var(--ink)" }} />
              )}
            </h2>
          </div>

          {/* Opening Line */}
          <div style={{ display: "grid" }}>
            <div
              aria-hidden="true"
              style={{
                visibility: "hidden",
                gridArea: "1 / 1",
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(22px, 2.3vw, 30px)",
                fontStyle: "italic",
                color: "var(--orange)",
                letterSpacing: "-0.015em",
                pointerEvents: "none",
              }}
            >
              {PAIN.openingLine}
            </div>
            <div
              style={{
                gridArea: "1 / 1",
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(22px, 2.3vw, 30px)",
                fontStyle: "italic",
                color: "var(--orange)",
                letterSpacing: "-0.015em",
                lineHeight: 1.25,
              }}
            >
              {displayedOpeningLine}
              {isTypingOpening && !isFinished && (
                <span className="typing-cursor" style={{ color: "var(--orange)" }} />
              )}
            </div>
          </div>

          <p
            className="reveal-on-scroll"
            style={{
              marginTop: 18,
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "76ch",
            }}
          >
            Every tool succeeds inside its own console. Yet enterprise recovery fails in the four unowned operational handoffs between backup, storage, cloud, posture, and change management.
          </p>
        </div>

        {/* ─── ARCHITECTURAL RESILIENCE WORKBENCH (NO NESTED BOXES) ─── */}
        <div
          className="reveal-on-scroll reveal-scale"
          style={{
            border: "1px solid var(--border)",
            borderRadius: 6,
            background: "var(--surface)",
            marginBottom: 72,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
          }}
        >
          {/* Workbench Top Control Bar */}
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              background: "var(--bg)",
            }}
          >
            {/* Tactile Toggle */}
            <div
              role="group"
              aria-label="Operating Model Comparison"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 5,
                padding: 3,
                gap: 2,
              }}
            >
              <button
                type="button"
                className="workbench-toggle-btn"
                aria-pressed={activeToggle === "today"}
                onClick={() => {
                  setActiveToggle("today");
                  setSelectedGap(null);
                }}
                style={{
                  padding: "6px 16px",
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontWeight: 600,
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                  background: activeToggle === "today" ? "var(--bg)" : "transparent",
                  color: activeToggle === "today" ? "var(--orange)" : "var(--muted)",
                  transition: "all 0.18s ease",
                }}
              >
                Today · The 4 Unowned Gaps
              </button>
              <button
                type="button"
                className="workbench-toggle-btn"
                aria-pressed={activeToggle === "resoc"}
                onClick={() => {
                  setActiveToggle("resoc");
                  setSelectedGap(null);
                }}
                style={{
                  padding: "6px 16px",
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontWeight: 600,
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                  background: activeToggle === "resoc" ? "var(--bg)" : "transparent",
                  color: activeToggle === "resoc" ? "var(--ink)" : "var(--muted)",
                  transition: "all 0.18s ease",
                }}
              >
                With ResOC · Operated Fabric
              </button>
            </div>

            {/* Status indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
                letterSpacing: "0.04em",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: activeToggle === "today" ? "var(--orange)" : "var(--ink)",
                  display: "inline-block",
                }}
              />
              <span>
                {activeToggle === "today"
                  ? "5 ISOLATED CONSOLES · 4 UNOWNED GAPS"
                  : "UNIFIED AGENT MESH™ RESILIENCE PLANE"}
              </span>
            </div>
          </div>

          {/* 5-Column Architectural Grid */}
          <div
            className="workbench-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              background: "var(--bg)",
            }}
          >
            {PAIN.silos.map((silo, idx) => (
              <div
                key={silo.id}
                style={{
                  padding: "24px 20px",
                  borderRight: idx < 4 ? "1px solid var(--border)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 250,
                  position: "relative",
                  background:
                    activeToggle === "resoc"
                      ? "rgba(244, 85, 50, 0.015)"
                      : "transparent",
                  transition: "background 0.25s ease",
                }}
              >
                {/* Column Meta */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        letterSpacing: "0.08em",
                        color: "var(--muted)",
                        fontWeight: 600,
                      }}
                    >
                      DOMAIN 0{idx + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 9.5,
                        padding: "2px 6px",
                        borderRadius: 3,
                        background:
                          activeToggle === "today"
                            ? "var(--surface)"
                            : "rgba(244, 85, 50, 0.1)",
                        color:
                          activeToggle === "today"
                            ? "var(--muted)"
                            : "var(--orange)",
                        fontWeight: 600,
                      }}
                    >
                      {activeToggle === "today" ? "SILO" : "OPERATED"}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 4,
                      lineHeight: 1.25,
                    }}
                  >
                    {silo.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--orange)",
                      marginBottom: 14,
                    }}
                  >
                    {silo.sub}
                  </div>

                  {/* Approved Vendors/Stack */}
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      lineHeight: 1.45,
                      paddingBottom: 16,
                      borderBottom: "1px solid var(--border)",
                      marginBottom: 16,
                    }}
                  >
                    {silo.detail}
                  </div>
                </div>

                {/* State Diagnostic */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 9.5,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: activeToggle === "today" ? "#c5401f" : "var(--ink)",
                      marginBottom: 4,
                      fontWeight: 600,
                    }}
                  >
                    {activeToggle === "today" ? "Console Blindspot" : "ResOC Telemetry"}
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      lineHeight: 1.45,
                      color: activeToggle === "today" ? "var(--muted)" : "var(--ink)",
                      margin: 0,
                    }}
                  >
                    {activeToggle === "today" ? silo.todayState : silo.resocState}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Handoff Connectors Track */}
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              background: "var(--surface)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: activeToggle === "today" ? "var(--orange)" : "var(--ink)",
                }}
              >
                {activeToggle === "today"
                  ? "FOUR OPERATIONAL HANDOFFS WHERE RESILIENCE LEAKS"
                  : "FOUR BRIDGED OPERATING CORRIDORS (AGENT MESH™)"}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  color: "var(--muted)",
                }}
              >
                Click any handoff to inspect forensic impact
              </span>
            </div>

            {/* 4 Interactive Gaps / Bridges */}
            <div
              className="handoff-gaps-grid reveal-stagger"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 10,
              }}
            >
              {PAIN.gaps.map((gap, gIdx) => {
                const isSelected = selectedGap === gIdx;
                return (
                  <button
                    key={gap.num}
                    type="button"
                    onClick={() => setSelectedGap(isSelected ? null : gIdx)}
                    style={{
                      textAlign: "left",
                      padding: "10px 12px",
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: isSelected
                        ? "var(--orange)"
                        : "var(--border)",
                      background: isSelected
                        ? "rgba(244, 85, 50, 0.08)"
                        : "var(--bg)",
                      cursor: "pointer",
                      outline: "none",
                      boxShadow: "none",
                      WebkitTapHighlightColor: "transparent",
                      transition: "all 0.16s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          fontWeight: 700,
                          color:
                            activeToggle === "today"
                              ? "var(--orange)"
                              : "var(--ink)",
                        }}
                      >
                        {activeToggle === "today" ? `GAP ${gap.num}` : `BRIDGE ${gap.num}`}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9.5,
                          color: "var(--muted)",
                        }}
                      >
                        {gap.between}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--ink)",
                        lineHeight: 1.3,
                        marginBottom: 3,
                      }}
                    >
                      {gap.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        lineHeight: 1.35,
                      }}
                    >
                      {activeToggle === "today" ? gap.todayRisk : gap.resocBridge}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workbench Bottom Diagnostic Banner (NO CHEESY DASHED BOX!) */}
          <div
            style={{
              padding: "20px 24px",
              background: "var(--bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div style={{ maxWidth: 820 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: activeToggle === "today" ? "var(--orange)" : "var(--ink)",
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: activeToggle === "today" ? "var(--orange)" : "var(--ink)",
                  }}
                >
                  {activeToggle === "today"
                    ? "RECOVERY RISK IN THE UNOWNED SPACE"
                    : "RESOC™ RESILIENCE FABRIC"}
                </span>
              </div>
              <p
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                {activeToggle === "today"
                  ? "No vendor console holds this space. No single team owns it. Four operational handoffs where recovery context, RTO proofs, and runbooks silently drift until disaster strikes."
                  : "Same five enterprise tools. Nothing replaced. The space between them is now operated by Agent Mesh™ with continuous proof and human approval on every action."}
              </p>
            </div>

            {/* Action CTA */}
            {activeToggle === "today" ? (
              <button
                type="button"
                onClick={() => setActiveToggle("resoc")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "9px 18px",
                  borderRadius: 5,
                  background: "var(--orange)",
                  color: "#fefdfd",
                  fontSize: 12.5,
                  fontWeight: 600,
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                  transition: "background 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--orange)";
                }}
              >
                Operate with ResOC →
              </button>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                {["HUMAN-APPROVED", "POLICY-BOUND", "AUDIT-READY"].map((pill) => (
                  <span
                    key={pill}
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      padding: "5px 10px",
                      borderRadius: 4,
                      background: "rgba(244, 85, 50, 0.1)",
                      color: "var(--orange)",
                      fontWeight: 600,
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ─── THREE EDITORIAL COLUMNS (NO CARDS-IN-CARDS) ─── */}
        <div
          className="reveal-on-scroll"
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 48,
          }}
        >
          <div
            className="editorial-clusters-grid reveal-stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 0,
            }}
          >
            {PAIN.clusters.map((cluster, cIdx) => (
              <div
                key={cluster.num}
                style={{
                  padding: cIdx === 0 ? "0 36px 0 0" : cIdx === 1 ? "0 36px" : "0 0 0 36px",
                  borderRight: cIdx < 2 ? "1px solid var(--border)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {/* Cluster Meta */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 12,
                      marginBottom: 14,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: 44,
                        lineHeight: 1,
                        color: "var(--orange)",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {cluster.num}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      {cluster.group}
                    </span>
                  </div>

                  {/* Cluster Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: "clamp(24px, 2.2vw, 30px)",
                      lineHeight: 1.14,
                      letterSpacing: "-0.015em",
                      color: "var(--ink)",
                      marginBottom: 6,
                    }}
                  >
                    {cluster.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 17,
                      fontStyle: "italic",
                      color: "var(--muted)",
                      lineHeight: 1.35,
                      marginBottom: 28,
                    }}
                  >
                    “{cluster.subtitle}”
                  </p>

                  {/* Itemized List with Hairline Dividers */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 18,
                    }}
                  >
                    {cluster.items.map((item) => (
                      <div
                        key={item.label}
                        style={{
                          paddingBottom: 16,
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 13.5,
                            fontWeight: 600,
                            color: "var(--ink)",
                            marginBottom: 4,
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <span
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              background: "var(--orange)",
                              flexShrink: 0,
                            }}
                          />
                          {item.label}
                        </div>
                        <p
                          style={{
                            fontSize: 13,
                            color: "var(--muted)",
                            lineHeight: 1.5,
                            margin: 0,
                            paddingLeft: 10,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1040px) {
          .workbench-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .handoff-gaps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .editorial-clusters-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .editorial-clusters-grid > div {
            padding: 0 !important;
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
            padding-bottom: 36px !important;
          }
          .editorial-clusters-grid > div:last-child {
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }
        }
        @media (max-width: 640px) {
          .workbench-grid {
            grid-template-columns: 1fr !important;
          }
          .workbench-grid > div {
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
          }
          .handoff-gaps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
