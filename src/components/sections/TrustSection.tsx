"use client";

import { TextReveal } from "@/components/ui/TextReveal";

export function TrustSection() {
  const isProd = process.env.NODE_ENV === "production";

  // Task 3: Trust chips marked [VERIFY] and hidden in production
  const trustChips = [
    { label: "Zero-Write Read-Only Ingestion", status: "verify" as const },
    { label: "100% Policy-Governed Human Sign-Off", status: "verify" as const },
    { label: "Cryptographic WORM Audit Records", status: "verify" as const },
    { label: "Enterprise Cloud & On-Prem Support", status: "verify" as const },
  ];

  return (
    <section
      id="trust"
      style={{
        padding: "40px 0 44px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* ─── Task 5: Backed By & Partners with SVG Logos ─── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {/* Group 1: Backed By */}
          <div>
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "IBM Plex Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                BACKED BY
              </span>
            </div>

            <div
              className="reveal-on-scroll reveal-scale"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "28px 40px",
                flexWrap: "wrap",
              }}
            >
              {/* Kalaari Capital SVG */}
              <div className="partner-logo-box" title="Kalaari Capital">
                <svg width="140" height="32" viewBox="0 0 140 32" fill="none" aria-label="Kalaari Capital">
                  <path d="M6 6L14 16L6 26H11L19 16L11 6H6Z" fill="var(--ink)" />
                  <text x="26" y="21" fontFamily="var(--font-body), sans-serif" fontSize="15" fontWeight="700" fill="var(--ink)" letterSpacing="0.02em">
                    KALAARI
                  </text>
                  <text x="96" y="21" fontFamily="var(--font-body), sans-serif" fontSize="12" fontWeight="400" fill="var(--muted)">
                    CAPITAL
                  </text>
                </svg>
              </div>

              {/* Kettleborough VC SVG */}
              <div className="partner-logo-box" title="Kettleborough VC">
                <svg width="154" height="32" viewBox="0 0 154 32" fill="none" aria-label="Kettleborough VC">
                  <circle cx="12" cy="16" r="6" stroke="var(--ink)" strokeWidth="2.5" />
                  <path d="M12 6V12M12 20V26" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" />
                  <text x="24" y="21" fontFamily="var(--font-body), sans-serif" fontSize="13.5" fontWeight="600" fill="var(--ink)" letterSpacing="-0.01em">
                    KETTLEBOROUGH
                  </text>
                  <text x="135" y="21" fontFamily="var(--font-mono), monospace" fontSize="11" fontWeight="600" fill="var(--orange)">
                    VC
                  </text>
                </svg>
              </div>

              {/* Enterprise CXOs & Founders Box */}
              <div className="partner-logo-box text-box" title="Enterprise CXOs & Founders">
                <span
                  style={{
                    fontFamily: 'var(--font-body), "Inter Tight", sans-serif',
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--ink)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Enterprise CXOs &amp; Founders
                </span>
              </div>
            </div>
          </div>

          {/* Group 2: Partners */}
          <div>
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "IBM Plex Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                PARTNERS
              </span>
            </div>

            <div
              className="reveal-on-scroll reveal-scale"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px 32px",
                flexWrap: "wrap",
              }}
            >
              {/* Dell Technologies SVG */}
              <div className="partner-logo-box" title="Dell Technologies">
                <svg width="146" height="28" viewBox="0 0 146 28" fill="none" aria-label="Dell Technologies">
                  <text x="4" y="20" fontFamily="var(--font-display), Georgia, serif" fontSize="19" fontWeight="700" fill="var(--ink)" letterSpacing="-0.03em">
                    DELL
                  </text>
                  <text x="56" y="19" fontFamily="var(--font-body), sans-serif" fontSize="12" fontWeight="500" fill="var(--muted)">
                    Technologies
                  </text>
                </svg>
              </div>

              {/* Microsoft SVG */}
              <div className="partner-logo-box" title="Microsoft">
                <svg width="118" height="28" viewBox="0 0 118 28" fill="none" aria-label="Microsoft">
                  <rect x="4" y="5" width="8" height="8" fill="#F25022" />
                  <rect x="14" y="5" width="8" height="8" fill="#7FBA00" />
                  <rect x="4" y="15" width="8" height="8" fill="#00A4EF" />
                  <rect x="14" y="15" width="8" height="8" fill="#FFB900" />
                  <text x="28" y="20" fontFamily="var(--font-body), sans-serif" fontSize="15" fontWeight="500" fill="var(--ink)" letterSpacing="-0.01em">
                    Microsoft
                  </text>
                </svg>
              </div>

              {/* AWS SVG */}
              <div className="partner-logo-box" title="Amazon Web Services">
                <svg width="68" height="28" viewBox="0 0 68 28" fill="none" aria-label="AWS">
                  <text x="6" y="18" fontFamily="var(--font-body), sans-serif" fontSize="16" fontWeight="800" fill="var(--ink)" letterSpacing="0.04em">
                    aws
                  </text>
                  <path d="M8 22C18 25 32 25 40 21" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>

              {/* HCLTech SVG */}
              <div className="partner-logo-box" title="HCLTech">
                <svg width="98" height="28" viewBox="0 0 98 28" fill="none" aria-label="HCLTech">
                  <text x="4" y="20" fontFamily="var(--font-body), sans-serif" fontSize="16" fontWeight="700" fill="var(--ink)" letterSpacing="-0.02em">
                    HCL<tspan fill="var(--orange)">Tech</tspan>
                  </text>
                </svg>
              </div>

              {/* Sapta Tunas Teknologi SVG Placeholder Box */}
              <div className="partner-logo-box placeholder-box" title="Sapta Tunas Teknologi">
                <span className="logo-placeholder-txt">Sapta Tunas Teknologi</span>
              </div>

              {/* IT Simple SVG Placeholder Box */}
              <div className="partner-logo-box placeholder-box" title="IT Simple">
                <span className="logo-placeholder-txt">IT Simple</span>
              </div>
            </div>
          </div>

          {/* Trademark Footnote */}
          <div style={{ textAlign: "center", marginTop: -6 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono), "IBM Plex Mono", monospace',
                fontSize: 10.5,
                color: "var(--muted)",
                letterSpacing: "0.01em",
              }}
            >
              Logos are trademarks of their respective owners, shown for identification only.
            </span>
          </div>
        </div>

        {/* ─── Task 3: Enterprise Governance Trust Chips (Hidden in Production) ─── */}
        {!isProd && (
          <div
            className="reveal-on-scroll reveal-stagger"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px 28px",
              flexWrap: "wrap",
              marginTop: 24,
              paddingTop: 16,
              borderTop: "1px dashed var(--border)",
              fontFamily: 'var(--font-mono), "IBM Plex Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            {trustChips.map((chip) => (
              <span key={chip.label} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    padding: "1px 5px",
                    borderRadius: 3,
                    background: "rgba(253, 71, 3, 0.12)",
                    color: "var(--orange-ink, #b93608)",
                    fontWeight: 700,
                    fontSize: 9.5,
                  }}
                >
                  [VERIFY]
                </span>
                <span>{chip.label}</span>
              </span>
            ))}
          </div>
        )}

        {/* ─── Task 7: 'Why trust us' Band (Marked [VERIFY WITH COMPANY]) ─── */}
        <div
          style={{
            marginTop: 36,
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 20,
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: 26,
                  color: "var(--ink)",
                  fontWeight: 400,
                }}
              >
                Why trust us
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "IBM Plex Mono", monospace',
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  padding: "2px 6px",
                  borderRadius: 3,
                  background: "rgba(253, 71, 3, 0.12)",
                  color: "var(--orange-ink, #b93608)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                [VERIFY WITH COMPANY]
              </span>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-mono), "IBM Plex Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              Enterprise Provenance &amp; Intellectual Property
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {/* Fact 1: Funding */}
            <div className="why-trust-card">
              <div className="why-trust-tag">[VERIFY WITH COMPANY]</div>
              <div className="why-trust-stat">$2.3M</div>
              <div className="why-trust-title">Pre-seed led by Kalaari Capital</div>
              <div className="why-trust-desc">
                Press coverage: ET Tech, YourStory, Business Standard
              </div>
            </div>

            {/* Fact 2: Experience */}
            <div className="why-trust-card">
              <div className="why-trust-tag">[VERIFY WITH COMPANY]</div>
              <div className="why-trust-stat">35+ Years</div>
              <div className="why-trust-title">Resilience Domain Leadership</div>
              <div className="why-trust-desc">
                Data protection, storage, and cyber resilience (Data Domain, EMC, Dell Tech)
              </div>
            </div>

            {/* Fact 3: Enterprise Products */}
            <div className="why-trust-card">
              <div className="why-trust-tag">[VERIFY WITH COMPANY]</div>
              <div className="why-trust-stat">4 Products</div>
              <div className="why-trust-title">Enterprise Systems Built</div>
              <div className="why-trust-desc">
                Proven track record delivering mission-critical infrastructure software
              </div>
            </div>

            {/* Fact 4: Patents & IP */}
            <div className="why-trust-card">
              <div className="why-trust-tag">[VERIFY WITH COMPANY]</div>
              <div className="why-trust-stat">9 Patents · 3 TM</div>
              <div className="why-trust-title">Protected Technology</div>
              <div className="why-trust-desc">
                Proprietary Agent Mesh™ autonomous orchestration &amp; recovery proofing
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .partner-logo-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 14px;
          border-radius: 6px;
          background: var(--bg, #fefdfd);
          border: 1px solid var(--border);
          min-height: 42px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .partner-logo-box:hover {
          border-color: var(--ink);
          transform: translateY(-1px);
        }

        .partner-logo-box.placeholder-box {
          border-style: dashed;
          background: transparent;
        }

        .logo-placeholder-txt {
          font-family: var(--font-body), "Inter Tight", sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
          letter-spacing: -0.01em;
        }

        .why-trust-card {
          padding: 20px 20px;
          background: var(--bg, #fefdfd);
          border: 1px solid var(--border);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          position: relative;
        }

        .why-trust-tag {
          font-family: var(--font-mono), "IBM Plex Mono", monospace;
          font-size: 9.5px;
          letter-spacing: "0.06em";
          color: var(--orange-ink, #b93608);
          font-weight: 600;
        }

        .why-trust-stat {
          font-family: var(--font-display), "Instrument Serif", Georgia, serif;
          font-size: 32px;
          line-height: 1.0;
          color: var(--ink);
          font-weight: 400;
          margin-top: 4px;
        }

        .why-trust-title {
          font-family: var(--font-body), "Inter Tight", sans-serif;
          font-size: 14.5px;
          font-weight: 600;
          color: var(--ink);
          margin-top: 2px;
        }

        .why-trust-desc {
          font-family: var(--font-body), "Inter Tight", sans-serif;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.45;
        }
      `}</style>
    </section>
  );
}
