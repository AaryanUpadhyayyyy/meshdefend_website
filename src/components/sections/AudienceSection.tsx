"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AUDIENCE } from "@/lib/sections";
import { SpringReveal } from "@/components/motion/SpringReveal";
import { TechIndexTag } from "@/components/ui/TechIndexTag";

export function AudienceSection() {
  const [activePersona, setActivePersona] = useState<string>("msp");

  return (
    <section
      id="audience"
      style={{
        padding: "96px 0 112px",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        position: "relative",
      }}
    >
      <div className="container">
        <SpringReveal>
          {/* Section Monospace Technical Index Tag */}
          <div style={{ marginBottom: 16 }}>
            <TechIndexTag
              tag="[06 // DEPLOYMENT TARGETS & OPERATOR PERSONAS]"
              status="MULTI_TENANT_READY"
            />
          </div>

          <h2
            className="display"
            style={{
              fontSize: "clamp(34px, 4.2vw, 56px)",
              maxWidth: "26ch",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: "0 0 48px",
              color: "var(--ink)",
            }}
          >
            {AUDIENCE.headline}
          </h2>

          {/* ─── 4-Panel Interactive Expanding Persona Workbench ─── */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--bg)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              }}
              className="audience-grid"
            >
              {AUDIENCE.segments.map((seg, idx) => {
                const isActive = activePersona === seg.id;

                return (
                  <div
                    key={seg.id}
                    onClick={() => setActivePersona(seg.id)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "36px 32px",
                      background: isActive ? "#221f22" : "var(--bg)",
                      color: isActive ? "#fefdfd" : "inherit",
                      borderRight: idx % 2 === 0 ? "1px solid var(--border)" : "none",
                      borderBottom: idx < 2 ? "1px solid var(--border)" : "none",
                      cursor: "pointer",
                      position: "relative",
                      transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className="audience-cell"
                  >
                    {/* Active Accent Border Strip */}
                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 3,
                          background: "var(--orange)",
                        }}
                      />
                    )}

                    <div>
                      {/* HUD Tag Header */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 16,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontSize: 11,
                            color: "var(--orange)",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                          }}
                        >
                          TARGET 0{idx + 1}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                            fontSize: 9.5,
                            padding: "2px 7px",
                            borderRadius: 3,
                            background: isActive ? "rgba(255,255,255,0.08)" : "var(--surface)",
                            border: `1px solid ${isActive ? "rgba(255,255,255,0.12)" : "var(--border)"}`,
                            color: isActive ? "#d5d2d3" : "var(--muted)",
                            letterSpacing: "0.06em",
                            fontWeight: 600,
                          }}
                        >
                          {seg.badge}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                          fontSize: 28,
                          lineHeight: 1.15,
                          letterSpacing: "-0.03em",
                          fontWeight: 400,
                          color: isActive ? "#fefdfd" : "var(--ink)",
                          marginBottom: 12,
                        }}
                      >
                        {seg.title}
                      </h3>

                      <p
                        style={{
                          fontSize: 14,
                          color: isActive ? "#a09a9c" : "var(--muted)",
                          lineHeight: 1.6,
                          margin: "0 0 20px",
                        }}
                      >
                        {seg.desc}
                      </p>

                      {/* Role-Specific Dynamic Mini-Diagram HUD */}
                      <div
                        style={{
                          background: isActive ? "#181618" : "var(--surface)",
                          border: `1px solid ${isActive ? "rgba(255,255,255,0.08)" : "var(--border)"}`,
                          borderRadius: 4,
                          padding: "14px 16px",
                          marginBottom: 20,
                        }}
                      >
                        {seg.id === "msp" && (
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: 'var(--font-mono), monospace', color: isActive ? "#a09a9c" : "var(--muted)", marginBottom: 8 }}>
                              <span>MULTI-TENANT FABRIC</span>
                              <span style={{ color: "var(--orange)" }}>TENANT ISOLATION: 100%</span>
                            </div>
                            <div style={{ display: "flex", gap: 6 }}>
                              {["Tenant Alpha (99.98%)", "Tenant Beta (100%)", "Tenant Gamma (99.95%)"].map((t) => (
                                <span key={t} style={{ fontSize: 9.5, fontFamily: 'var(--font-mono), monospace', padding: "3px 6px", background: isActive ? "rgba(255,255,255,0.05)" : "var(--bg)", border: "1px solid var(--border)", borderRadius: 2, color: isActive ? "#d5d2d3" : "var(--ink)" }}>
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {seg.id === "enterprises" && (
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: 'var(--font-mono), monospace', color: isActive ? "#a09a9c" : "var(--muted)", marginBottom: 8 }}>
                              <span>CROSS-REGION MULTI-CLOUD</span>
                              <span style={{ color: "#10b981" }}>RECOVERY PROVEN: 4M 12S</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontFamily: 'var(--font-mono), monospace', color: isActive ? "#d5d2d3" : "var(--ink)" }}>
                              <span>DataDomain (On-Prem)</span>
                              <span style={{ color: "var(--orange)" }}>⇄</span>
                              <span>AWS us-east-1</span>
                              <span style={{ color: "var(--orange)" }}>⇄</span>
                              <span>Azure Clean Room</span>
                            </div>
                          </div>
                        )}

                        {seg.id === "si" && (
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: 'var(--font-mono), monospace', color: isActive ? "#a09a9c" : "var(--muted)", marginBottom: 8 }}>
                              <span>DELIVERY BLUEPRINT V2.4</span>
                              <span style={{ color: "var(--orange)" }}>REPEATABLE PRACTICE</span>
                            </div>
                            <div style={{ display: "flex", gap: 6, fontSize: 10, fontFamily: 'var(--font-mono), monospace', color: isActive ? "#d5d2d3" : "var(--ink)" }}>
                              <span>14 Cross-Vendor Connectors</span>
                              <span>·</span>
                              <span>Automated Client SLA Audits</span>
                            </div>
                          </div>
                        )}

                        {seg.id === "advisory" && (
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: 'var(--font-mono), monospace', color: isActive ? "#a09a9c" : "var(--muted)", marginBottom: 8 }}>
                              <span>CONTINUOUS POSTURE SCORECARD</span>
                              <span style={{ color: "#10b981" }}>AUDIT GRADE: A+</span>
                            </div>
                            <div style={{ display: "flex", gap: 6, fontSize: 10, fontFamily: 'var(--font-mono), monospace', color: isActive ? "#d5d2d3" : "var(--ink)" }}>
                              <span>Objective RTO/RPO Verification</span>
                              <span>·</span>
                              <span>Cryptographic Attestation</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Deliverables Checklist */}
                      {seg.deliverables && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                            paddingTop: 16,
                            borderTop: `1px solid ${isActive ? "rgba(255,255,255,0.08)" : "var(--border)"}`,
                          }}
                        >
                          {seg.deliverables.map((item) => (
                            <div
                              key={item}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 12.5,
                                color: isActive ? "#d5d2d3" : "var(--ink)",
                                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                              }}
                            >
                              <span style={{ color: "var(--orange)", fontWeight: 700 }}>+</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <a
                      href={seg.href}
                      style={{
                        marginTop: 28,
                        fontSize: 12,
                        color: "var(--orange)",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontWeight: 600,
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        letterSpacing: "0.04em",
                        textDecoration: "none",
                      }}
                    >
                      <span>DEPLOYMENT SPECIFICATION</span>
                      <span>→</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </SpringReveal>
      </div>

      <style jsx>{`
        .audience-cell:hover {
          border-color: var(--orange);
        }
        @media (max-width: 800px) {
          .audience-grid {
            grid-template-columns: 1fr !important;
          }
          .audience-grid > div {
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
          }
          .audience-grid > div:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
