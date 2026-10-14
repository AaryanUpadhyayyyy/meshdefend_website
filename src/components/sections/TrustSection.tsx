"use client";

import { SpringReveal } from "@/components/motion/SpringReveal";
import { TechIndexTag } from "@/components/ui/TechIndexTag";

export function TrustSection() {
  const isProd = process.env.NODE_ENV === "production";

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
        padding: "48px 0 56px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        position: "relative",
      }}
    >
      <div className="container">
        <SpringReveal>
          {/* Section Monospace Technical Index Tag */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <TechIndexTag
              tag="[01 // BACKED BY & ENTERPRISE ECOSYSTEM]"
              status="VERIFIED_PARTNERS"
            />
          </div>

          {/* ─── Exposed 1px Grid: Backed By & Enterprise Partners ─── */}
          <div
            style={{
              border: "1px solid var(--border)",
              background: "var(--bg)",
            }}
          >
            {/* Grid Row 1: Backed By Header + Investors */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "180px repeat(3, 1fr)",
                borderBottom: "1px solid var(--border)",
              }}
              className="trust-grid-row"
            >
              <div
                style={{
                  padding: "16px 20px",
                  borderRight: "1px solid var(--border)",
                  background: "var(--surface)",
                  display: "flex",
                  alignItems: "center",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  color: "var(--muted)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                BACKED BY
              </div>

              {/* Kalaari Capital */}
              <div
                style={{
                  padding: "18px 24px",
                  borderRight: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--bg)",
                  transition: "background 0.2s ease",
                }}
                className="partner-cell"
                title="Kalaari Capital"
              >
                <svg width="138" height="28" viewBox="0 0 140 32" fill="none" aria-label="Kalaari Capital">
                  <path d="M6 6L14 16L6 26H11L19 16L11 6H6Z" fill="var(--ink)" />
                  <text x="26" y="21" fontFamily="var(--font-body), sans-serif" fontSize="15" fontWeight="700" fill="var(--ink)" letterSpacing="0.02em">
                    KALAARI
                  </text>
                  <text x="96" y="21" fontFamily="var(--font-body), sans-serif" fontSize="12" fontWeight="400" fill="var(--muted)">
                    CAPITAL
                  </text>
                </svg>
              </div>

              {/* Kettleborough VC */}
              <div
                style={{
                  padding: "18px 24px",
                  borderRight: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--bg)",
                  transition: "background 0.2s ease",
                }}
                className="partner-cell"
                title="Kettleborough VC"
              >
                <svg width="150" height="28" viewBox="0 0 154 32" fill="none" aria-label="Kettleborough VC">
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

              {/* Enterprise CXOs & Founders */}
              <div
                style={{
                  padding: "18px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--bg)",
                  transition: "background 0.2s ease",
                }}
                className="partner-cell"
                title="Enterprise CXOs & Founders"
              >
                <span
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--ink)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Enterprise CXOs &amp; Founders
                </span>
              </div>
            </div>

            {/* Grid Row 2: Technology Partners Header + Vendors */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "180px repeat(6, 1fr)",
              }}
              className="trust-grid-row-partners"
            >
              <div
                style={{
                  padding: "18px 20px",
                  borderRight: "1px solid var(--border)",
                  background: "var(--surface)",
                  display: "flex",
                  alignItems: "center",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  color: "var(--muted)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                PARTNERS
              </div>

              {/* Dell Technologies */}
              <div
                style={{
                  padding: "16px 14px",
                  borderRight: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="partner-cell"
                title="Dell Technologies"
              >
                <svg width="120" height="24" viewBox="0 0 146 28" fill="none" aria-label="Dell Technologies">
                  <text x="4" y="20" fontFamily="var(--font-display), Georgia, serif" fontSize="19" fontWeight="700" fill="var(--ink)" letterSpacing="-0.03em">
                    DELL
                  </text>
                  <text x="56" y="19" fontFamily="var(--font-body), sans-serif" fontSize="12" fontWeight="500" fill="var(--muted)">
                    Technologies
                  </text>
                </svg>
              </div>

              {/* Microsoft */}
              <div
                style={{
                  padding: "16px 14px",
                  borderRight: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="partner-cell"
                title="Microsoft"
              >
                <svg width="105" height="24" viewBox="0 0 118 28" fill="none" aria-label="Microsoft">
                  <rect x="4" y="5" width="8" height="8" fill="#F25022" />
                  <rect x="14" y="5" width="8" height="8" fill="#7FBA00" />
                  <rect x="4" y="15" width="8" height="8" fill="#00A4EF" />
                  <rect x="14" y="15" width="8" height="8" fill="#FFB900" />
                  <text x="28" y="20" fontFamily="var(--font-body), sans-serif" fontSize="14" fontWeight="500" fill="var(--ink)" letterSpacing="-0.01em">
                    Microsoft
                  </text>
                </svg>
              </div>

              {/* AWS */}
              <div
                style={{
                  padding: "16px 14px",
                  borderRight: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="partner-cell"
                title="AWS"
              >
                <svg width="56" height="24" viewBox="0 0 68 28" fill="none" aria-label="AWS">
                  <text x="6" y="18" fontFamily="var(--font-body), sans-serif" fontSize="15" fontWeight="800" fill="var(--ink)" letterSpacing="0.04em">
                    aws
                  </text>
                  <path d="M8 22C18 25 32 25 40 21" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>

              {/* HCLTech */}
              <div
                style={{
                  padding: "16px 14px",
                  borderRight: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="partner-cell"
                title="HCLTech"
              >
                <svg width="86" height="24" viewBox="0 0 98 28" fill="none" aria-label="HCLTech">
                  <text x="4" y="20" fontFamily="var(--font-body), sans-serif" fontSize="15" fontWeight="700" fill="var(--ink)" letterSpacing="-0.02em">
                    HCL<tspan fill="var(--orange)">Tech</tspan>
                  </text>
                </svg>
              </div>

              {/* Sapta Tunas Teknologi */}
              <div
                style={{
                  padding: "16px 12px",
                  borderRight: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
                className="partner-cell"
                title="Sapta Tunas Teknologi"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--ink)",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Sapta Tunas
                </span>
              </div>

              {/* IT Simple */}
              <div
                style={{
                  padding: "16px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="partner-cell"
                title="IT Simple"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--ink)",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  IT SIMPLE
                </span>
              </div>
            </div>
          </div>

          {/* Trademark Footnote */}
          <div style={{ textAlign: "center", marginTop: 12 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 10.5,
                color: "var(--muted)",
                letterSpacing: "0.02em",
              }}
            >
              Logos are trademarks of their respective owners, shown for identification only.
            </span>
          </div>

          {/* ─── Enterprise Governance Trust Chips (Verification Environment) ─── */}
          {!isProd && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "14px 24px",
                flexWrap: "wrap",
                marginTop: 20,
                paddingTop: 14,
                borderTop: "1px dashed var(--border)",
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              {trustChips.map((chip) => (
                <span key={chip.label} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      padding: "1px 5px",
                      borderRadius: 2,
                      background: "rgba(244, 85, 50, 0.12)",
                      color: "var(--orange)",
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
        </SpringReveal>
      </div>

      <style jsx>{`
        .partner-cell:hover {
          background: var(--surface) !important;
        }
        @media (max-width: 900px) {
          .trust-grid-row {
            grid-template-columns: 1fr !important;
          }
          .trust-grid-row > div {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
          .trust-grid-row-partners {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .trust-grid-row-partners > div:first-child {
            grid-column: 1 / -1;
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
        }
      `}</style>
    </section>
  );
}
