"use client";

import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { SITE } from "@/lib/content";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

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
  }

  interface FooterNavGroup {
    num: string;
    title: string;
    links: FooterLink[];
  }

  const navGroups: FooterNavGroup[] = [
    {
      num: "01",
      title: "Product",
      links: [
        { label: "Unified Resilience Observability", href: "/platform/observability" },
        { label: "Backup Operations", href: "/platform/backup-operations" },
        { label: "Incident Resolution", href: "/platform/incident-resolution" },
        { label: "Cyber Resilience", href: "/platform/cyber-resilience" },
        { label: "Integrations", href: "/platform/integrations" },
      ],
    },
    {
      num: "02",
      title: "Platform Capabilities",
      links: [
        { label: "Enterprise readiness", href: "/platform/enterprise-readiness" },
        { label: "Deploy", href: "/platform/deploy" },
        { label: "Built for Flexibility", href: "/platform/built-for-flexibility" },
      ],
    },
    {
      num: "03",
      title: "Solutions",
      links: [
        { label: "System Integrators", href: "/solutions/system-integrators" },
        { label: "Managed Services", href: "/solutions/managed-services" },
        { label: "Advisory / Consulting", href: "/solutions/advisory-consulting" },
        { label: "Enterprises", href: "/solutions/enterprises" },
      ],
    },
    {
      num: "04",
      title: "Resources",
      links: [
        { label: "Newsletter", href: "/resources/newsletter" },
        { label: "Podcast", href: "/resources/podcast" },
        { label: "Blogs", href: "/resources/blogs" },
        { label: "FAQ", href: "/resources/faq" },
      ],
    },
    {
      num: "05",
      title: "Company",
      links: [
        { label: "About Us", href: "/company/about" },
        { label: "Investors & Partners", href: "/company/investors-partners" },
        { label: "Careers", href: "/company/careers" },
        { label: "Newsroom", href: "/company/newsroom" },
        { label: "Contact us", href: "/company/contact" },
        { label: "MD Support Portal", href: "/support" },
      ],
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
        id="newsletter"
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
                  color: "#a09a9c",
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

                {/* Link list */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {group.links.map((link) => (
                    <li key={link.label} style={{ marginBottom: 12 }}>
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
                          textDecoration: "none",
                        }}
                      >
                        <span>{link.label}</span>
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
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>


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
              color: "#a09a9c",
            }}
          >
            {/* Copyright & Legal */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span>
                © 2026 MeshDefend Inc. All rights reserved.
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>·</span>
              <a href="/privacy" className="footer-sub-link">
                Privacy Policy
              </a>
              <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>·</span>
              <a href="/terms" className="footer-sub-link">
                Terms of Service
              </a>
              <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>·</span>
              <a href="/security" className="footer-sub-link">
                Security Posture
              </a>
            </div>

            {/* Direct Contact & Footprint */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "#a09a9c",
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

    </footer>
  );
}
