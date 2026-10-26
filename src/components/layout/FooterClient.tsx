"use client";



import { Fragment, useState } from "react";

import { usePathname } from "next/navigation";

import { Logo, LogoMark } from "@/components/brand/Logo";

import { Reveal, RevealGroup } from "@/components/motion";
import type { CmsFooterSettings } from "@/lib/siteSettingsTypes";



export function FooterClient({ settings }: { settings: CmsFooterSettings }) {

  const pathname = usePathname();

  const [email, setEmail] = useState("");

  const [isSubscribed, setIsSubscribed] = useState(false);



  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    if (email.trim()) {

      setIsSubscribed(true);

    }

  };



  const isSuppressed =

    pathname === "/demo" ||

    pathname === "/company/contact" ||

    pathname === "/resources/newsletter" ||

    pathname?.startsWith("/demo") ||

    pathname?.startsWith("/company/contact") ||

    pathname?.startsWith("/resources/newsletter");



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

      {!isSuppressed && (

        <div

          id="newsletter"

          style={{

            borderBottom: "1px solid rgba(254, 253, 253, 0.1)",

            padding: "72px 0 56px",

          }}

        >

        <div className="container">

          <Reveal delay={0}>

            <div

              style={{

                display: "grid",

                gridTemplateColumns: settings.showNewsletter ? "1.2fr 1fr" : "1fr",

                gap: "48px 64px",

                alignItems: "start",

              }}

              className="footer-top-grid"

            >

            {/* Left: Brand Identity & Status */}

            <div>

              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>

                {settings.logoAsset?.url ? (
                  <img
                    src={settings.logoAsset.url}
                    alt={settings.logoAlt || settings.brandName}
                    style={{ height: 28, width: "auto", objectFit: "contain" }}
                  />
                ) : settings.brandName === "MeshDefend" ? (
                  <Logo mono height={28} alt={settings.logoAlt || settings.brandName} />
                ) : (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#fefdfd", fontWeight: 650, fontSize: 20 }}>
                    <LogoMark size={26} />
                    {settings.brandName}
                  </span>
                )}

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

                {settings.tagline}

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

                {settings.body}

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

                <span>{settings.statusText}</span>

              </div>

            </div>



            {/* Right: Stay Informed Newsletter */}

            {settings.showNewsletter && <div

              style={{

                background: "rgba(255, 255, 255, 0.025)",

                border: "1px solid rgba(255, 255, 255, 0.08)",

                borderRadius: 8,

                padding: "32px 30px",

              }}

            >

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

                {settings.newsletterHeading}

              </h4>



              <p

                style={{

                  fontSize: 13,

                  lineHeight: 1.55,

                  color: "#a09a9c",

                  marginBottom: 20,

                }}

              >

                {settings.newsletterDescription}

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

                  {settings.newsletterSuccessMessage}

                </div>

              ) : (

                <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10 }}>

                  <input

                    type="email"

                    value={email}

                    onChange={(e) => setEmail(e.target.value)}

                    placeholder={settings.newsletterPlaceholder}

                    aria-label={settings.newsletterInputLabel}

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

                    {settings.newsletterButtonLabel}

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

                {settings.newsletterPrivacyNote}

              </div>

            </div>}

          </div>

        </Reveal>

        </div>

      </div>

      )}



      {/* ─── NAVIGATION COLUMNS (5 BALANCED PILLARS) ─── */}

      <div style={{ padding: "64px 0 48px" }}>

        <div className="container">

          <RevealGroup

            staggerDelay={0.1}

            style={{

              display: "grid",

              gridTemplateColumns: `repeat(${Math.max(1, settings.navigationGroups.length)}, minmax(0, 1fr))`,

              gap: "36px 28px",

            }}

            className="footer-nav-grid"

          >

            {settings.navigationGroups.map((group) => (

              <div key={group.num}>

                {/* Column Header */}

                <div

                  style={{

                    display: "flex",

                    alignItems: "center",

                    marginBottom: 20,

                    paddingBottom: 10,

                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",

                  }}

                >

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

          </RevealGroup>

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

          {settings.brandName}

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
              <span>{settings.copyrightText}</span>
              {settings.legalLinks.map((link) => (
                <Fragment key={link.href + link.label}>
                  <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>·</span>
                  <a href={link.href} className="footer-sub-link">{link.label}</a>
                </Fragment>
              ))}
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

                {settings.environmentText}

              </span>

              <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>·</span>

              <a

                href={`mailto:${settings.email}`}

                style={{

                  color: "var(--orange)",

                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',

                  fontSize: 11.5,

                  fontWeight: 600,

                  textDecoration: "none",

                }}

                className="footer-email-link"

              >

                {settings.email}

              </a>

            </div>

          </div>

        </div>

      </div>



    </footer>

  );

}

