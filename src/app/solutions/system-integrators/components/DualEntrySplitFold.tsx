"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DualEntrySplitFold() {
  const [activePath, setActivePath] = useState<"builder" | "practice">("builder");
  const [hoveredPath, setHoveredPath] = useState<"builder" | "practice" | null>(null);

  const effectivePath = hoveredPath || activePath;

  const builderPoints = [
    {
      label: "OPEN API & GRAPHQL",
      detail: "Deterministic REST endpoints and GraphQL subscriptions for real-time state and DAG execution.",
      metric: "100% PUBLIC SCHEMA",
    },
    {
      label: "EVENT-DRIVEN WEBHOOKS",
      detail: "Subscribe to backup validation signals, posture shifts, and anomaly detections with HMAC signing.",
      metric: "< 50ms EVENT DISPATCH",
    },
    {
      label: "CUSTOM CONNECTOR SDKS",
      detail: "Pre-built Python, Go, and TypeScript runtimes to integrate proprietary client storage and custom ITSM silos.",
      metric: "ZERO BLACK-BOX LOCKIN",
    },
    {
      label: "DEVELOPER SANDBOX",
      detail: "Instant zero-cost deterministic mock clusters with chaos-injection simulation before touching production.",
      metric: "INSTANT TEST CLUSTERS",
    },
  ];

  const practicePoints = [
    {
      label: "NAMED SERVICE LINE",
      detail: "Turn compliance and recovery validation into a recurring high-margin advisory and managed service line.",
      metric: "RECURRING REVENUE",
    },
    {
      label: "MULTI-TENANT HIERARCHY",
      detail: "Federate dozens of client estates under a unified GSI management console with cryptographic isolation.",
      metric: "FLEET-WIDE GOVERNANCE",
    },
    {
      label: "MCRA ACCREDITATION",
      detail: "Structured curriculum and 'MeshDefend Certified Resilience Architect' certification for delivery engineers.",
      metric: "ROLE-BASED CURRICULUM",
    },
    {
      label: "CO-SELLING & DEAL REG",
      detail: "Dedicated Partner Solutions Architects (PSA), deal protection, and tier-1 vendor co-sell margins.",
      metric: "PROTECTED MARGINS",
    },
  ];

  return (
    <section
      id="dual-entry-split"
      aria-label="Solutions for System Integrators: Dual Entry"
      style={{
        padding: "160px 0 100px",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Architectural Blueprint Grid */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.04,
        }}
      >
        <defs>
          <pattern
            id="dual-split-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dual-split-grid)" />
      </svg>

      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative" }}
      >
        {/* Eyebrow & Status Flag */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 28,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 14,
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "var(--orange, #f45532)",
                fontWeight: 600,
              }}
            >
              [ SOLUTIONS · SYSTEM INTEGRATORS ]
            </span>
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                backgroundColor: "var(--orange, #f45532)",
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "var(--muted)",
              }}
            >
              DUAL-TRACK ARCHITECTURE · BUILDER & PRACTICE
            </span>
          </div>
        </div>

        {/* H1 Split Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 1080, marginBottom: 28 }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(46px, 6.2vw, 84px)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              fontWeight: 400,
              margin: 0,
            }}
          >
            <span style={{ display: "block", color: "var(--ink)" }}>
              Extend it yourself.
            </span>
            <span
              style={{
                display: "block",
                color: "var(--orange, #f45532)",
                fontStyle: "italic",
              }}
            >
              Or build a practice around it.
            </span>
          </h1>
        </motion.div>

        {/* Hook and Lead Statement */}
        <div style={{ maxWidth: 860, marginBottom: 52 }}>
          <p
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(22px, 2.4vw, 30px)",
              lineHeight: 1.3,
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 16,
            }}
          >
            “A real API surface, not a black box. A partnership designed to go beyond a single integration.”
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--muted)",
              margin: 0,
            }}
          >
            MeshDefend establishes two equal relationships from day one: build with the platform
            through open APIs, webhooks, and SDKs, or build an enterprise practice around it with full
            enablement, certification, and multi-tenant scale. Neither should ever feel secondary.
          </p>
        </div>

        {/* =================================================================== */}
        {/* INTERACTIVE COMPONENT: THE SPLIT GATEWAY & 1PX SVG BRIDGE           */}
        {/* =================================================================== */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--surface-raised, #f3f1f1)",
            position: "relative",
            padding: "40px 32px 48px",
          }}
        >
          {/* Top Origin Node: MeshDefend Core */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                padding: "8px 20px",
                backgroundColor: "var(--bg, #fefdfd)",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "var(--orange, #f45532)",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "var(--ink)",
                }}
              >
                MESHDEFEND CORE ENGINE (RESOC)
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  padding: "2px 6px",
                  backgroundColor: "rgba(244, 85, 50, 0.1)",
                  color: "var(--orange, #f45532)",
                  fontWeight: 600,
                }}
              >
                v2.4 LTS · OPENAPI 3.1
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 10,
                color: "var(--muted)",
                marginTop: 6,
                letterSpacing: "0.06em",
              }}
            >
              ONE ENGINE · SPLIT OPERATIONAL HORIZONS
            </span>
          </div>

          {/* SVG Split Bridge */}
          <div
            style={{
              width: "100%",
              height: 72,
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              viewBox="0 0 1000 72"
              fill="none"
              style={{
                width: "100%",
                height: "100%",
                maxWidth: 960,
                overflow: "visible",
              }}
            >
              {/* Central vertical spine */}
              <line
                x1="500"
                y1="0"
                x2="500"
                y2="20"
                stroke="var(--border)"
                strokeWidth="1.5"
              />

              {/* Branch Left: To Builder */}
              <path
                d="M 500 20 C 500 48, 250 36, 250 72"
                stroke={
                  effectivePath === "builder"
                    ? "var(--orange, #f45532)"
                    : "var(--border)"
                }
                strokeWidth={effectivePath === "builder" ? 2 : 1}
                strokeDasharray={effectivePath === "builder" ? "none" : "3,3"}
                style={{ transition: "stroke 0.25s ease, stroke-width 0.25s ease" }}
              />

              {/* Branch Right: To Practice */}
              <path
                d="M 500 20 C 500 48, 750 36, 750 72"
                stroke={
                  effectivePath === "practice"
                    ? "var(--orange, #f45532)"
                    : "var(--border)"
                }
                strokeWidth={effectivePath === "practice" ? 2 : 1}
                strokeDasharray={effectivePath === "practice" ? "none" : "3,3"}
                style={{ transition: "stroke 0.25s ease, stroke-width 0.25s ease" }}
              />

              {/* Animated pulses on active path */}
              {effectivePath === "builder" && (
                <circle cx="250" cy="72" r="4" fill="var(--orange, #f45532)" />
              )}
              {effectivePath === "practice" && (
                <circle cx="750" cy="72" r="4" fill="var(--orange, #f45532)" />
              )}
            </svg>
          </div>

          {/* Interactive Gateway Cards: Path A vs Path B */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
              marginTop: 12,
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* PATH A: Build with MeshDefend (Builder Track) */}
            <div
              onMouseEnter={() => setHoveredPath("builder")}
              onMouseLeave={() => setHoveredPath(null)}
              onClick={() => setActivePath("builder")}
              style={{
                backgroundColor: "var(--bg, #fefdfd)",
                border:
                  effectivePath === "builder"
                    ? "1.5px solid var(--orange, #f45532)"
                    : "1px solid var(--border)",
                padding: "28px 24px",
                cursor: "pointer",
                position: "relative",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                boxShadow:
                  effectivePath === "builder"
                    ? "0 4px 20px rgba(244, 85, 50, 0.08)"
                    : "none",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 16,
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 12,
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      color:
                        effectivePath === "builder"
                          ? "var(--orange, #f45532)"
                          : "var(--muted)",
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    PATH A · TECHNICAL BUILDERS & ARCHITECTS
                  </span>
                  <h3
                    style={{
                      fontFamily:
                        'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 26,
                      color: "var(--ink)",
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    Build with MeshDefend
                  </h3>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    padding: "4px 8px",
                    backgroundColor:
                      effectivePath === "builder"
                        ? "var(--orange, #f45532)"
                        : "var(--surface-raised, #f3f1f1)",
                    color: effectivePath === "builder" ? "#ffffff" : "var(--muted)",
                    fontWeight: 600,
                  }}
                >
                  API / WEBHOOKS / WORKFLOWS
                </span>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  marginBottom: 20,
                }}
              >
                Engineered for solution architects and developers crafting bespoke,
                revenue-generating client integrations without hitting arbitrary vendor limits.
              </p>

              {/* Technical Capabilities List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {builderPoints.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "10px 12px",
                      backgroundColor: "var(--surface-raised, #f3f1f1)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          color: "var(--ink)",
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--orange, #f45532)",
                          fontWeight: 600,
                        }}
                      >
                        {item.metric}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 12,
                        lineHeight: 1.4,
                        color: "var(--muted)",
                        margin: 0,
                      }}
                    >
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Code Snippet Hook */}
              <div
                style={{
                  marginTop: 18,
                  padding: "10px 14px",
                  backgroundColor: "var(--dark, #221f22)",
                  color: "#fefdfd",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>$ curl -H &quot;Authorization: Bearer &quot; api.meshdefend.ai/v1/topology/dag</span>
                <span style={{ color: "var(--orange, #f45532)" }}>200 OK</span>
              </div>
            </div>

            {/* PATH B: Build a Practice (Alliance Track) */}
            <div
              onMouseEnter={() => setHoveredPath("practice")}
              onMouseLeave={() => setHoveredPath(null)}
              onClick={() => setActivePath("practice")}
              style={{
                backgroundColor: "var(--bg, #fefdfd)",
                border:
                  effectivePath === "practice"
                    ? "1.5px solid var(--orange, #f45532)"
                    : "1px solid var(--border)",
                padding: "28px 24px",
                cursor: "pointer",
                position: "relative",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                boxShadow:
                  effectivePath === "practice"
                    ? "0 4px 20px rgba(244, 85, 50, 0.08)"
                    : "none",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 16,
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 12,
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      color:
                        effectivePath === "practice"
                          ? "var(--orange, #f45532)"
                          : "var(--muted)",
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    PATH B · GLOBAL ALLIANCES & PRACTICE LEADS
                  </span>
                  <h3
                    style={{
                      fontFamily:
                        'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: 26,
                      color: "var(--ink)",
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    Build a Practice
                  </h3>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    padding: "4px 8px",
                    backgroundColor:
                      effectivePath === "practice"
                        ? "var(--orange, #f45532)"
                        : "var(--surface-raised, #f3f1f1)",
                    color: effectivePath === "practice" ? "#ffffff" : "var(--muted)",
                    fontWeight: 600,
                  }}
                >
                  INTEGRATE / DELIVER / SCALE
                </span>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  marginBottom: 20,
                }}
              >
                Engineered for global alliance executives and practice heads establishing
                repeatable cyber resilience service lines across multinational enterprise accounts.
              </p>

              {/* Practice Capabilities List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {practicePoints.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "10px 12px",
                      backgroundColor: "var(--surface-raised, #f3f1f1)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          color: "var(--ink)",
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 9,
                          color: "var(--orange, #f45532)",
                          fontWeight: 600,
                        }}
                      >
                        {item.metric}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 12,
                        lineHeight: 1.4,
                        color: "var(--muted)",
                        margin: 0,
                      }}
                    >
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Practice Ledger Hook */}
              <div
                style={{
                  marginTop: 18,
                  padding: "10px 14px",
                  backgroundColor: "var(--dark, #221f22)",
                  color: "#fefdfd",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>GSI PRACTICE LEDGER · 12 REGIONS DEPLOYED</span>
                <span style={{ color: "var(--orange, #f45532)" }}>ACTIVE SERVICE LINE</span>
              </div>
            </div>
          </div>

          {/* Bottom Link indicator pointing to Fold 2 */}
          <div
            style={{
              marginTop: 32,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
                letterSpacing: "0.06em",
              }}
            >
              EXPLORE HOW ONE MECHANISM POWERS BOTH SCALES BELOW
            </span>
            <span style={{ color: "var(--orange, #f45532)", fontSize: 13 }}>↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
