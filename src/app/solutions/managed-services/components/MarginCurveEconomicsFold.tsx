"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function MarginCurveEconomicsFold() {
  const [scaleIndex, setScaleIndex] = useState<number>(2); // Default to 50 clients

  const scaleStages = [
    {
      clients: 10,
      label: "10 CLIENTS",
      traditionalTechs: "2 Full-Time L1/L2",
      traditionalCost: "$160,000 / yr",
      traditionalMargin: "25%",
      meshTechs: "0.5 Operator",
      meshCost: "$40,000 / yr",
      meshMargin: "52%",
      savings: "+108% Margin Growth",
    },
    {
      clients: 25,
      label: "25 CLIENTS",
      traditionalTechs: "5 Full-Time L1/L2",
      traditionalCost: "$400,000 / yr",
      traditionalMargin: "22%",
      meshTechs: "0.8 Operator",
      meshCost: "$64,000 / yr",
      meshMargin: "58%",
      savings: "+163% Margin Growth",
    },
    {
      clients: 50,
      label: "50 CLIENTS",
      traditionalTechs: "10 Full-Time L1/L2",
      traditionalCost: "$800,000 / yr",
      traditionalMargin: "18%",
      meshTechs: "1.0 Dedicated Operator",
      meshCost: "$80,000 / yr",
      meshMargin: "65%",
      savings: "+261% Margin Growth",
    },
    {
      clients: 100,
      label: "100 CLIENTS",
      traditionalTechs: "20 Full-Time L1/L2",
      traditionalCost: "$1,600,000 / yr",
      traditionalMargin: "15%",
      meshTechs: "2.0 Operators",
      meshCost: "$160,000 / yr",
      meshMargin: "70%",
      savings: "+366% Margin Growth",
    },
  ];

  const current = scaleStages[scaleIndex];

  return (
    <section
      id="margin-curve-economics"
      aria-label="Make the Economics Work at Scale"
      style={{
        padding: "130px 0 120px",
        backgroundColor: "var(--dark, #221f22)",
        color: "#fefdfd",
        position: "relative",
        borderTop: "1px solid rgba(254, 253, 253, 0.12)",
        borderBottom: "1px solid rgba(254, 253, 253, 0.12)",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
            borderBottom: "1px solid rgba(254, 253, 253, 0.12)",
            paddingBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--orange, #f45532)",
              fontWeight: 600,
            }}
          >
            [ ECONOMIC UNCERTAINTY REDUCTION · OPERATING LEVERAGE ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "rgba(254, 253, 253, 0.6)",
            }}
          >
            FIG. 3 — THE MARGIN EXPANSION CURVE
          </span>
        </div>

        {/* H2 Heading */}
        <div style={{ maxWidth: 940, marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(38px, 4.8vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#fefdfd",
              fontWeight: 400,
              marginBottom: 18,
            }}
          >
            Grow the client base, not the cost of running it.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 16,
              lineHeight: 1.6,
              color: "rgba(254, 253, 253, 0.75)",
              maxWidth: 820,
              margin: 0,
            }}
          >
            When platform pricing and operating overhead scale linearly with client count, your gross
            margin quietly deteriorates. MeshDefend breaks the headcount-to-client link, turning
            volume growth into compounding operating profit.
          </p>
        </div>

        {/* =================================================================== */}
        {/* INTERACTIVE MARGIN CURVE STAGE & SELECTOR                           */}
        {/* =================================================================== */}
        <div
          style={{
            backgroundColor: "rgba(254, 253, 253, 0.03)",
            border: "1px solid rgba(254, 253, 253, 0.12)",
            padding: "32px 28px",
            marginBottom: 36,
          }}
        >
          {/* Scale Step Selector */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 28,
              borderBottom: "1px solid rgba(254, 253, 253, 0.12)",
              paddingBottom: 20,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "var(--orange, #f45532)",
                fontWeight: 600,
              }}
            >
              SIMULATE PRACTICE SCALE:
            </span>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {scaleStages.map((st, idx) => (
                <button
                  key={idx}
                  onClick={() => setScaleIndex(idx)}
                  style={{
                    padding: "8px 16px",
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    border:
                      scaleIndex === idx
                        ? "1px solid var(--orange, #f45532)"
                        : "1px solid rgba(254, 253, 253, 0.15)",
                    backgroundColor:
                      scaleIndex === idx
                        ? "var(--orange, #f45532)"
                        : "rgba(0, 0, 0, 0.2)",
                    color: "#fefdfd",
                    transition: "all 0.15s ease",
                  }}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Comparison Banner for Selected Scale */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                border: "1px solid rgba(254, 253, 253, 0.08)",
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "rgba(254, 253, 253, 0.5)",
                  marginBottom: 6,
                }}
              >
                TRADITIONAL HEADCOUNT NEEDED
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#ef5350",
                }}
              >
                {current.traditionalTechs}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 12,
                  color: "rgba(254, 253, 253, 0.6)",
                  marginTop: 4,
                }}
              >
                Salary burden: {current.traditionalCost}
              </div>
            </div>

            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                border: "1px solid rgba(254, 253, 253, 0.08)",
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "rgba(254, 253, 253, 0.5)",
                  marginBottom: 6,
                }}
              >
                MESHDEFEND OPERATOR NEEDED
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 22,
                  fontWeight: 600,
                  color: "var(--orange, #f45532)",
                }}
              >
                {current.meshTechs}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 12,
                  color: "rgba(254, 253, 253, 0.6)",
                  marginTop: 4,
                }}
              >
                Salary burden: {current.meshCost}
              </div>
            </div>

            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                border: "1px solid rgba(254, 253, 253, 0.08)",
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "rgba(254, 253, 253, 0.5)",
                  marginBottom: 6,
                }}
              >
                PROJECTED GROSS MARGIN
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#a5d6a7",
                }}
              >
                {current.meshMargin}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 12,
                  color: "rgba(254, 253, 253, 0.6)",
                  marginTop: 4,
                }}
              >
                vs. {current.traditionalMargin} traditional
              </div>
            </div>

            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "rgba(244, 85, 50, 0.12)",
                border: "1px solid rgba(244, 85, 50, 0.3)",
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "var(--orange, #f45532)",
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                BOTTOM-LINE ADVANTAGE
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#fefdfd",
                }}
              >
                {current.savings}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 12,
                  color: "rgba(254, 253, 253, 0.7)",
                  marginTop: 4,
                }}
              >
                Operating leverage at {current.clients} clients
              </div>
            </div>
          </div>

          {/* SVG Animated Margin Curve Chart */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              border: "1px solid rgba(254, 253, 253, 0.1)",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
                fontSize: 10,
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                color: "rgba(254, 253, 253, 0.5)",
              }}
            >
              <span>CHART: COST CURVE VS REVENUE EXPANSION (10 → 100 CLIENTS)</span>
              <div style={{ display: "flex", gap: 16 }}>
                <span style={{ color: "#ef5350" }}>— Traditional Headcount Cost</span>
                <span style={{ color: "var(--orange, #f45532)" }}>— MeshDefend Cost Curve (Sub-linear)</span>
              </div>
            </div>

            <svg
              viewBox="0 0 800 180"
              style={{ width: "100%", height: "auto", overflow: "visible" }}
            >
              {/* Grid Lines */}
              <line x1="60" y1="20" x2="780" y2="20" stroke="rgba(254,253,253,0.06)" />
              <line x1="60" y1="70" x2="780" y2="70" stroke="rgba(254,253,253,0.06)" />
              <line x1="60" y1="120" x2="780" y2="120" stroke="rgba(254,253,253,0.06)" />
              <line x1="60" y1="160" x2="780" y2="160" stroke="rgba(254,253,253,0.15)" />

              {/* Shaded Profit Expansion Area */}
              <polygon
                points="60,140 240,110 500,85 760,65 760,150 500,152 240,155 60,158"
                fill="rgba(244, 85, 50, 0.08)"
              />

              {/* Traditional Linear Headcount Cost Line */}
              <path
                d="M 60 145 L 240 105 L 500 55 L 760 25"
                stroke="#ef5350"
                strokeWidth="2.5"
                fill="none"
              />

              {/* MeshDefend Sub-Linear Cost Curve */}
              <path
                d="M 60 155 Q 240 152, 500 150 T 760 146"
                stroke="var(--orange, #f45532)"
                strokeWidth="3"
                fill="none"
              />

              {/* Points on Traditional Line */}
              <circle cx="60" cy="145" r="4" fill="#ef5350" />
              <circle cx="240" cy="105" r="4" fill="#ef5350" />
              <circle cx="500" cy="55" r="4" fill="#ef5350" />
              <circle cx="760" cy="25" r="4" fill="#ef5350" />

              {/* Points on MeshDefend Line */}
              <circle cx="60" cy="155" r="4" fill="var(--orange, #f45532)" />
              <circle cx="240" cy="152" r="4" fill="var(--orange, #f45532)" />
              <circle cx="500" cy="150" r="4" fill="var(--orange, #f45532)" />
              <circle cx="760" cy="146" r="4" fill="var(--orange, #f45532)" />

              {/* Labels on X Axis */}
              <text x="60" y="175" fill="rgba(254,253,253,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">10 Clients</text>
              <text x="240" y="175" fill="rgba(254,253,253,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">25 Clients</text>
              <text x="500" y="175" fill="rgba(254,253,253,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">50 Clients</text>
              <text x="760" y="175" fill="rgba(254,253,253,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">100 Clients</text>

              {/* Center Callout */}
              <text x="420" y="115" fill="var(--orange, #f45532)" fontSize="11" fontFamily="monospace" fontWeight="600">
                GROSS MARGIN EXPANSION ZONE
              </text>
            </svg>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2-COLUMN EXPOSED COMPARISON GRID                                    */}
        {/* =================================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 28,
          }}
        >
          {/* Column 1: Traditional MSP Economics */}
          <div
            style={{
              padding: "32px 28px",
              backgroundColor: "rgba(254, 253, 253, 0.03)",
              border: "1px solid rgba(254, 253, 253, 0.12)",
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 10,
                letterSpacing: "0.08em",
                color: "#ef5350",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              THE LINEAR HEADCOUNT TRAP
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: 24,
                color: "#fefdfd",
                margin: "0 0 16px",
                fontWeight: 400,
              }}
            >
              Traditional MSP Economics
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body), Inter, sans-serif',
                fontSize: 13,
                lineHeight: 1.55,
                color: "rgba(254, 253, 253, 0.7)",
                marginBottom: 20,
              }}
            >
              Adding new client contracts forces adding more L1/L2 headcount to handle manual daily checks,
              eating the very margins you intended to make.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ padding: "10px 12px", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(254,253,253,0.06)" }}>
                <div style={{ fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 11, fontWeight: 600, color: "#fefdfd", marginBottom: 2 }}>
                  1. Console Juggling & Password Fatigue
                </div>
                <div style={{ fontFamily: 'var(--font-body), Inter, sans-serif', fontSize: 12, color: "rgba(254,253,253,0.6)" }}>
                  Technicians log in and out of 40 separate tenant consoles every morning, wasting hours on routine credential handoffs.
                </div>
              </div>

              <div style={{ padding: "10px 12px", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(254,253,253,0.06)" }}>
                <div style={{ fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 11, fontWeight: 600, color: "#fefdfd", marginBottom: 2 }}>
                  2. Manual False-Green Verification
                </div>
                <div style={{ fontFamily: 'var(--font-body), Inter, sans-serif', fontSize: 12, color: "rgba(254,253,253,0.6)" }}>
                  Each backup job requires human eye-checks to ensure green checkmarks aren&apos;t concealing corrupted unrecoverable data.
                </div>
              </div>

              <div style={{ padding: "10px 12px", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(254,253,253,0.06)" }}>
                <div style={{ fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 11, fontWeight: 600, color: "#fefdfd", marginBottom: 2 }}>
                  3. Margin Erosion at Scale
                </div>
                <div style={{ fontFamily: 'var(--font-body), Inter, sans-serif', fontSize: 12, color: "rgba(254,253,253,0.6)" }}>
                  As client count grows 5×, technical support payroll grows 4.5×. Net gross margin stays stuck below 20%.
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: MeshDefend Operating Leverage */}
          <div
            style={{
              padding: "32px 28px",
              backgroundColor: "rgba(244, 85, 50, 0.04)",
              border: "1px solid rgba(244, 85, 50, 0.25)",
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 10,
                letterSpacing: "0.08em",
                color: "var(--orange, #f45532)",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              THE COMPOUNDING OPERATING LEVERAGE
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: 24,
                color: "#fefdfd",
                margin: "0 0 16px",
                fontWeight: 400,
              }}
            >
              MeshDefend Operating Leverage
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body), Inter, sans-serif',
                fontSize: 13,
                lineHeight: 1.55,
                color: "rgba(254, 253, 253, 0.7)",
                marginBottom: 20,
              }}
            >
              Agent Mesh absorbs the repetitive Day-2 tasks across all client environments, allowing your
              existing team to manage 10× more revenue without hiring.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ padding: "10px 12px", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(254,253,253,0.06)" }}>
                <div style={{ fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 11, fontWeight: 600, color: "var(--orange, #f45532)", marginBottom: 2 }}>
                  1. Unified Fleet Triage Pane
                </div>
                <div style={{ fontFamily: 'var(--font-body), Inter, sans-serif', fontSize: 12, color: "rgba(254,253,253,0.6)" }}>
                  All 50+ clients stream into one single rollup screen. Technicians only inspect the 2 or 3 anomalies flagged by autonomous agents.
                </div>
              </div>

              <div style={{ padding: "10px 12px", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(254,253,253,0.06)" }}>
                <div style={{ fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 11, fontWeight: 600, color: "var(--orange, #f45532)", marginBottom: 2 }}>
                  2. Autonomic Recovery Dry-Runs
                </div>
                <div style={{ fontFamily: 'var(--font-body), Inter, sans-serif', fontSize: 12, color: "rgba(254,253,253,0.6)" }}>
                  Continuous background verification proves restore integrity across Veeam, Commvault, and Dell estates with cryptographic proof.
                </div>
              </div>

              <div style={{ padding: "10px 12px", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(254,253,253,0.06)" }}>
                <div style={{ fontFamily: 'var(--font-mono), "JetBrains Mono", monospace', fontSize: 11, fontWeight: 600, color: "var(--orange, #f45532)", marginBottom: 2 }}>
                  3. Compounding Gross Margin (65%+)
                </div>
                <div style={{ fontFamily: 'var(--font-body), Inter, sans-serif', fontSize: 12, color: "rgba(254,253,253,0.6)" }}>
                  Volume licensing discounts combined with flat technician staffing expands your operating margin past 65% as you scale.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
