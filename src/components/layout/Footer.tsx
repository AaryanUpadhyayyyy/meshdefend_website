"use client";

import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { SITE } from "@/lib/content";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const isProd = process.env.NODE_ENV === "production";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
    }
  };

  interface FooterLink {
    label: string;
    href: string;
    badge?: string;
    verifyBadge?: string;
    comingSoon?: boolean;
  }

  interface FooterNavGroup {
    num: string;
    title: string;
    links: FooterLink[];
  }

  const navGroups: FooterNavGroup[] = [
    {
      num: "01",
      title: "Platform",
      links: [
        { label: "Unified Resilience Observability", href: "/platform#observability" },
        { label: "Backup & Recovery Operations", href: "#coming-soon", comingSoon: true },
        { label: "Agentic Incident Resolution", href: "/platform#incident-resolution" },
        { label: "Cyber Recovery Orchestration", href: "#coming-soon", comingSoon: true },
        { label: "Heterogeneous Integrations", href: "#coming-soon", comingSoon: true },
      ],
    },
    {
      num: "02",
      title: "Capabilities",
      links: [
        { label: "Enterprise Readiness", href: "#coming-soon", comingSoon: true },
        { label: "Isolated & Air-Gapped Deploy", href: "#coming-soon", comingSoon: true },
        { label: "Heterogeneous Architecture", href: "#coming-soon", comingSoon: true },
        { label: "Human-in-the-Loop Governance", href: "#coming-soon", comingSoon: true },
        { label: "Immutable Evidence Logging", href: "#coming-soon", comingSoon: true },
      ],
    },
    {
      num: "03",
      title: "Solutions",
      links: [
        { label: "System Integrators", href: "#coming-soon", comingSoon: true },
        { label: "Managed Service Providers", href: "#coming-soon", comingSoon: true },
        { label: "Advisory & Consulting", href: "#coming-soon", comingSoon: true },
        { label: "Global Enterprises", href: "#coming-soon", comingSoon: true },
      ],
    },
    {
      num: "04",
      title: "Resources",
      links: [
        { label: "Resilience Newsletter", href: "#coming-soon", comingSoon: true },
        { label: "The Recovery Podcast", href: "#coming-soon", comingSoon: true },
        { label: "Engineering Blogs", href: "#coming-soon", comingSoon: true },
        { label: "Architecture FAQ", href: "#coming-soon", comingSoon: true },
        {
          label: "System Status",
          href: "https://status.meshdefend.ai",
          verifyBadge: "[VERIFY]",
        },
      ],
    },
    {
      num: "05",
      title: "Company",
      links: [
        { label: "About MeshDefend", href: "#coming-soon", comingSoon: true },
        { label: "Investors & Partners", href: "#coming-soon", comingSoon: true },
        {
          label: "Careers",
          href: "#coming-soon",
          badge: "WE'RE HIRING",
          verifyBadge: "[VERIFY]",
          comingSoon: true,
        },
        { label: "Newsroom", href: "#coming-soon", comingSoon: true },
        { label: "Contact Us", href: "#coming-soon", comingSoon: true },
      ],
    },
  ];

  // Task 3: Footer badges marked [VERIFY] and hidden in production
  const trustBadges = [
    {
      label: "SOC 2 Type II Ready",
      detail: "Continuous audit trails & policy verification",
    },
    {
      label: "Policy-Governed Autonomy",
      detail: "Policy-governed autonomy: human in the loop and human on the loop",
    },
    {
      label: "Zero Runtime Overhead",
      detail: "Non-invasive read telemetry across backup engines",
    },
    {
      label: "Multi-Cloud & On-Prem",
      detail: "Commvault · Veeam · Dell · DataDomain · AWS · Azure · ServiceNow",
    },
  ];

  return (
    <footer
      style={{
        background: "#221f22",
        color: "#fefdfd",
        position: "relative",
        borderTop: "1px solid rgba(254, 253, 253, 0.1)",
        overflow: "hidden",
      }}
    >
      {/* ─── TOP BRIEFING & NEWSLETTER ROW ─── */}
      <div
        style={{
          borderBottom: "1px solid rgba(254, 253, 253, 0.1)",
          padding: "72px 0 56px",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "48px 64px",
              alignItems: "start",
            }}
            className="footer-top-grid reveal-on-scroll"
          >
            {/* Left: Brand Identity & Status */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <Logo mono style={{ height: 26, width: "auto", color: "#fefdfd" }} />
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "clamp(24px, 2.4vw, 32px)",
                  lineHeight: 1.18,
                  color: "#fefdfd",
                  maxWidth: 520,
                  letterSpacing: "-0.015em",
                  marginBottom: 16,
                }}
              >
                Recovery you can prove.{" "}
                <span style={{ fontStyle: "italic", color: "var(--orange)" }}>
                  Operations without human error.
                </span>
              </p>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "#a09a9c",
                  maxWidth: 480,
                  marginBottom: 24,
                }}
              >
                The Resilience Operations Center (ResOC) unifying backup, storage, cloud, posture, and ITSM through autonomous Agent Mesh™ intelligence.
              </p>

              {/* Live telemetry heartbeat */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "6px 14px",
                  borderRadius: 20,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: 11.5,
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  color: "#d5d2d3",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--orange)",
                    boxShadow: "0 0 8px rgba(244, 85, 50, 0.6)",
                  }}
                />
                <span>AGENT MESH™ FABRIC: OPERATIONAL</span>
              </div>
            </div>

            {/* Right: Stay Informed Newsletter */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.025)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 8,
                padding: "32px 30px",
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "var(--orange)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                STAY INFORMED
              </div>

              <h4
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#fefdfd",
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                Operational thinking, direct to your inbox.
              </h4>

              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: "#a09a9c",
                  marginBottom: 20,
                }}
              >
                Weekly executive briefings on multi-vendor cyber recovery, RTO/RPO proof engineering, and agentic resilience operations.
              </p>

              {isSubscribed ? (
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: 5,
                    background: "rgba(244, 85, 50, 0.12)",
                    border: "1px solid rgba(244, 85, 50, 0.3)",
                    color: "var(--orange)",
                    fontSize: 13,
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  }}
                >
                  ✓ You’re subscribed. Expect the next briefing this Tuesday.
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10 }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    aria-label="Work Email Address"
                    required
                    style={{
                      flex: 1,
                      padding: "11px 16px",
                      background: "#262326",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: 5,
                      color: "#fefdfd",
                      fontSize: 13.5,
                      fontFamily: "inherit",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--orange)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      fontSize: 13,
                      padding: "11px 20px",
                      height: 42,
                      fontWeight: 600,
                      borderRadius: 5,
                    }}
                  >
                    Subscribe
                  </button>
                </form>
              )}

              <div
                style={{
                  marginTop: 12,
                  fontSize: 11,
                  color: "#7a7477",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                }}
              >
                No marketing spam. One-click unsubscribe anytime.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── NAVIGATION COLUMNS (5 BALANCED PILLARS) ─── */}
      <div style={{ padding: "64px 0 48px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "36px 28px",
            }}
            className="footer-nav-grid reveal-on-scroll reveal-stagger"
          >
            {navGroups.map((group) => (
              <div key={group.num}>
                {/* Column Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                    marginBottom: 20,
                    paddingBottom: 10,
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      color: "var(--orange)",
                      fontWeight: 600,
                    }}
                  >
                    {group.num}
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#fefdfd",
                      margin: 0,
                      fontWeight: 600,
                    }}
                  >
                    {group.title}
                  </h4>
                </div>

                {/* Link list with elegant micro-hover */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {group.links.map((link) => (
                    <li key={link.label} style={{ marginBottom: 12 }}>
                      {link.comingSoon ? (
                        <span
                          className="footer-nav-link"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 13,
                            color: "#7a7477",
                            lineHeight: 1.45,
                            cursor: "default",
                          }}
                        >
                          <span>{link.label}</span>
                          {link.verifyBadge && (
                            <span
                              style={{
                                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                                fontSize: 9,
                                padding: "1px 5px",
                                borderRadius: 3,
                                background: "rgba(253, 71, 3, 0.16)",
                                color: "var(--orange)",
                                fontWeight: 700,
                                letterSpacing: "0.04em",
                              }}
                            >
                              {link.verifyBadge}
                            </span>
                          )}
                          {link.badge && (
                            <span
                              style={{
                                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                                fontSize: 9,
                                padding: "1px 5px",
                                borderRadius: 3,
                                background: "rgba(244, 85, 50, 0.16)",
                                color: "var(--orange)",
                                fontWeight: 700,
                                letterSpacing: "0.04em",
                              }}
                            >
                              {link.badge}
                            </span>
                          )}
                          <span
                            style={{
                              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 9,
                              padding: "1px 5px",
                              borderRadius: 3,
                              background: "rgba(255, 255, 255, 0.06)",
                              color: "#837d80",
                              letterSpacing: "0.02em",
                            }}
                          >
                            Coming soon
                          </span>
                        </span>
                      ) : (
                        <a
                          href={link.href}
                          className="footer-nav-link"
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 13,
                            color: "#a09a9c",
                            lineHeight: 1.45,
                            transition: "color 0.18s ease, transform 0.18s ease",
                          }}
                        >
                          <span>{link.label}</span>
                          {link.verifyBadge && (
                            <span
                              style={{
                                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                                fontSize: 9,
                                padding: "1px 5px",
                                borderRadius: 3,
                                background: "rgba(253, 71, 3, 0.16)",
                                color: "var(--orange)",
                                fontWeight: 700,
                                letterSpacing: "0.04em",
                              }}
                            >
                              {link.verifyBadge}
                            </span>
                          )}
                          {link.badge && (
                            <span
                              style={{
                                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                                fontSize: 9,
                                padding: "1px 5px",
                                borderRadius: 3,
                                background: "rgba(244, 85, 50, 0.16)",
                                color: "var(--orange)",
                                fontWeight: 700,
                                letterSpacing: "0.04em",
                              }}
                            >
                              {link.badge}
                            </span>
                          )}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── ENTERPRISE TRUST & COMPLIANCE RIBBON (HIDDEN IN PRODUCTION) ─── */}
      {!isProd && (
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            background: "rgba(0, 0, 0, 0.15)",
            padding: "24px 0",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 20,
              }}
              className="footer-trust-grid reveal-on-scroll reveal-stagger"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#fefdfd",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        padding: "1px 5px",
                        borderRadius: 3,
                        background: "rgba(253, 71, 3, 0.16)",
                        color: "var(--orange)",
                        fontSize: 9.5,
                        fontWeight: 700,
                      }}
                    >
                      [VERIFY]
                    </span>
                    {badge.label}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#837d80",
                      lineHeight: 1.4,
                    }}
                  >
                    {badge.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── MONUMENTAL DISPLAY BRAND WATERMARK ─── */}
      <div
        style={{
          position: "relative",
          padding: "48px 0 24px",
          textAlign: "center",
          overflow: "hidden",
          userSelect: "none",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <div
          style={{
            fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
            fontSize: "clamp(64px, 13vw, 172px)",
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            color: "rgba(254, 253, 253, 0.035)",
            whiteSpace: "nowrap",
            textTransform: "uppercase",
          }}
        >
          MESHDEFEND
        </div>
      </div>

      {/* ─── BOTTOM LEGAL & CONTACT BAR ─── */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "22px 0 28px",
          background: "#161416",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              fontSize: 12,
              color: "#7a7477",
            }}
          >
            {/* Copyright & Legal */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                © 2026 MeshDefend Inc.
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9.5,
                    padding: "1px 5px",
                    borderRadius: 3,
                    background: "rgba(253, 71, 3, 0.16)",
                    color: "var(--orange)",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  [VERIFY]
                </span>
                All rights reserved.
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>·</span>
              <span style={{ color: "#7a7477", display: "inline-flex", alignItems: "center", gap: 4 }}>
                Privacy Policy <span style={{ fontSize: 9, fontFamily: 'var(--font-mono), monospace', color: "#6b6568" }}>Coming soon</span>
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>·</span>
              <span style={{ color: "#7a7477", display: "inline-flex", alignItems: "center", gap: 4 }}>
                Terms of Service <span style={{ fontSize: 9, fontFamily: 'var(--font-mono), monospace', color: "#6b6568" }}>Coming soon</span>
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>·</span>
              <span style={{ color: "#7a7477", display: "inline-flex", alignItems: "center", gap: 4 }}>
                Security Posture <span style={{ fontSize: 9, fontFamily: 'var(--font-mono), monospace', color: "#6b6568" }}>Coming soon</span>
              </span>
            </div>

            {/* Direct Contact & Footprint */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "#6b6568",
                }}
              >
                HYBRID · MULTI-CLOUD · ON-PREM
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>·</span>
              <a
                href={`mailto:${SITE.email}`}
                style={{
                  color: "var(--orange)",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11.5,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                className="footer-email-link"
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-nav-link:hover {
          color: #fefdfd !important;
          transform: translateX(2px);
        }
        .footer-sub-link {
          color: #7a7477;
          text-decoration: none;
          transition: color 0.18s ease;
        }
        .footer-sub-link:hover {
          color: #fefdfd;
        }
        .footer-email-link:hover {
          text-decoration: underline !important;
        }

        @media (max-width: 1040px) {
          .footer-top-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .footer-nav-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 36px 24px !important;
          }
          .footer-trust-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }

        @media (max-width: 640px) {
          .footer-nav-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-trust-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
