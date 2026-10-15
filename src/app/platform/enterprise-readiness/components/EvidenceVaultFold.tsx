"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function NumberCounter({
  target,
  suffix = "",
  formatComma = false,
}: {
  target: number;
  suffix?: string;
  formatComma?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1600; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target]);

  const formatted = formatComma ? count.toLocaleString() : count.toString();

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {formatted}
      {suffix}
    </span>
  );
}

export function EvidenceVaultFold() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const columns = [
    {
      targetNum: 14000,
      suffix: "+",
      formatComma: true,
      tag: "COL 01 // SCALE",
      label: "Enterprise assets protected",
      detail: "Operating across hybrid, multi-cloud, and air-gapped estates.",
      specs: [
        "7,400+ VMware & Nutanix virtual instances",
        "3,800+ AWS & Azure cloud workloads",
        "2,800+ bare-metal databases & NAS filers",
      ],
    },
    {
      targetNum: 35,
      suffix: "+",
      formatComma: false,
      tag: "COL 02 // TENURE",
      label: "Years of domain expertise",
      detail: "4 enterprise storage/backup products built prior to MeshDefend. $1Bn+ ARR scaled.",
      specs: [
        "Pioneered CBT replication & immutable storage engines",
        "Operated live DR across Fortune 500 ransomware crises",
        "Direct systems depth in kernel drivers & VSS APIs",
      ],
    },
    {
      targetNum: 12,
      suffix: "",
      formatComma: false,
      tag: "COL 03 // IP & ARCHITECTURE",
      label: "Patents & Trademarks",
      detail: "9 Patents + 3 Trademarks filed on agentic orchestration and consensus algorithms.",
      specs: [
        "Cryptographic multi-agent Byzantine consensus",
        "Deterministic dependency graph synthesis (DAG)",
        "Ed25519 multi-signature Human-in-the-Loop gates",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="operating-maturity"
      aria-label="Operating Maturity Evidence"
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
            Operating Maturity Evidence
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 2 — STRUCTURAL EVIDENCE BOARD
          </span>
        </div>

        {/* Display H2 (Instrument Serif 40px) */}
        <div style={{ maxWidth: 940, marginBottom: 54 }}>
          <h2
            style={{
              fontFamily:
                'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(34px, 4vw, 48px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 14,
            }}
          >
            Maturity isn’t what you promise. It’s what you can prove.
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
            A rigorous 3-column data ledger built with exposed 1px borders.
            Inspect the verifiable operating record.
          </p>
        </div>

        {/* 3-Column Data Ledger with Exposed 1px Hairline Borders */}
        <div
          style={{
            position: "relative",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
          }}
        >
          {/* Animated 1px Top Header Rule (SVG Line Draw) */}
          <div
            style={{
              padding: "14px 24px",
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--surface-raised, #f7f6f5)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 7,
                  backgroundColor: "var(--orange, #f45532)",
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "0.05em",
                }}
              >
                VERIFIED OPERATING LEDGER // 3 COLUMNS
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              FALSIFIABLE AUDIT PROOFS
            </span>
          </div>

          {/* 3 Columns Grid with Animated Hairline Borders */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              backgroundColor: "var(--border)",
              gap: 1,
            }}
          >
            {columns.map((col, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
                style={{
                  backgroundColor: "var(--bg)",
                  padding: "40px 32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 280,
                  position: "relative",
                }}
              >
                <div>
                  {/* Monospace Column Tag */}
                  <div
                    style={{
                      fontFamily:
                        'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      fontWeight: 600,
                      color: "var(--muted)",
                      letterSpacing: "0.06em",
                      marginBottom: 16,
                    }}
                  >
                    {col.tag}
                  </div>

                  {/* Large Tabular Numeral Spring Counter (64px, Instrument Serif, --ink) */}
                  <div
                    style={{
                      fontFamily:
                        'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: "clamp(52px, 5vw, 68px)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.03em",
                      color: "var(--ink)",
                      marginBottom: 12,
                      fontWeight: 400,
                    }}
                  >
                    <NumberCounter
                      target={col.targetNum}
                      suffix={col.suffix}
                      formatComma={col.formatComma}
                    />
                  </div>

                  {/* Label (Inter / JetBrains Mono) */}
                  <div
                    style={{
                      fontFamily:
                        'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--ink)",
                      letterSpacing: "0.02em",
                      marginBottom: 12,
                    }}
                  >
                    {col.label}
                  </div>

                  {/* Detail */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 14.5,
                      lineHeight: 1.5,
                      color: "var(--muted)",
                      margin: "0 0 24px 0",
                    }}
                  >
                    {col.detail}
                  </p>
                </div>

                {/* Additional Verifiable Proof Points */}
                <div
                  style={{
                    borderTop: "1px dashed var(--border)",
                    paddingTop: 18,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {col.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 8,
                        fontSize: 12.5,
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        color: "var(--muted)",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--orange, #f45532)",
                          fontSize: 11,
                        }}
                      >
                        ▸
                      </span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* SVG Animated Bottom Line Draw */}
          <svg
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 2,
              pointerEvents: "none",
            }}
          >
            <motion.line
              x1="0%"
              y1="1"
              x2="100%"
              y2="1"
              stroke="var(--border)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
