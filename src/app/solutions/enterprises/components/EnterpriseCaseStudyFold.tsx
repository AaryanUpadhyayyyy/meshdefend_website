"use client";

import { motion } from "framer-motion";

export function EnterpriseCaseStudyFold() {
  const quotableMetrics = [
    {
      figure: "+45%",
      label: "INFRASTRUCTURE SCALED",
      sub: "Managed under completely frozen engineering headcount",
    },
    {
      figure: "80%",
      label: "MTTR REDUCTION",
      sub: "From 4.5 hours daily triage down to 24 minutes",
    },
    {
      figure: "100%",
      label: "AUDIT PASS RATE",
      sub: "SEC 17a-4 & DORA compliance with 0 manual spreadsheets",
    },
    {
      figure: "0",
      label: "DORMANT RE-INFECTIONS",
      sub: "Clean recovery points verified before restoration testing",
    },
  ];

  return (
    <section
      id="enterprise-case-study"
      aria-label="Give the Internal Case Real Proof"
      style={{
        padding: "120px 0",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Header Block */}
        <div style={{ maxWidth: "860px", marginBottom: "56px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 10px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--ink)",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "var(--orange, #f45532)",
                display: "inline-block",
              }}
            />
            [ FOLD 04 · REAL-WORLD ENTERPRISE EVIDENCE ]
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(34px, 4.4vw, 54px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "20px",
              fontWeight: 400,
            }}
          >
            Here’s what the business case looked like inside another enterprise.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: "16px",
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "760px",
            }}
          >
            A Global Tier-1 Financial Institution managing 3,400+ protected workloads across
            Commvault, Dell Data Domain, and AWS hybrid storage unified resilience across
            Security, Operations, and Compliance without hiring additional staff.
          </p>
        </div>

        {/* 4-Part Structural Narrative */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg, #fefdfd)",
            marginBottom: "40px",
          }}
        >
          {/* Part 1 & Part 2: Challenge vs Why It Mattered */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              borderBottom: "1px solid var(--border)",
            }}
            className="grid-cols-1 md:grid-cols-2"
          >
            {/* 01: Challenge */}
            <div
              style={{
                padding: "36px 32px",
                borderRight: "1px solid var(--border)",
                backgroundColor: "var(--surface)",
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  color: "var(--orange, #f45532)",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                [ 01 · THE OPERATIONAL CHALLENGE ]
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "24px",
                  color: "var(--ink)",
                  marginBottom: "16px",
                  fontWeight: 400,
                }}
              >
                Scaling data volume under frozen team headcount.
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                Over 3,400 core banking workloads across physical datacenters and multi-cloud VPCs generated 40+ daily backup job
                exceptions. L2 engineers spent 4.5 hours every morning parsing heterogeneous vendor error logs and manually
                re-triggering snapshot tasks, leaving zero bandwidth for DR rehearsals or strategic modernization.
              </p>
            </div>

            {/* 02: Why It Mattered */}
            <div
              style={{
                padding: "36px 32px",
                backgroundColor: "var(--surface)",
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  color: "var(--orange, #f45532)",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                [ 02 · WHY IT MATTERED TO LEADERSHIP ]
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "24px",
                  color: "var(--ink)",
                  marginBottom: "16px",
                  fontWeight: 400,
                }}
              >
                Regulatory audit exposure & cyber insurance renewal.
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                The bank faced an impending SEC Rule 17a-4 and DORA Article 11 operational examination alongside an annual cyber
                insurance renewal. Underwriters demanded verified, continuous proof of clean recovery points and actual tested RTO
                guarantees—not unverified operational backup green checkmarks.
              </p>
            </div>
          </div>

          {/* Part 3: Who Benefited */}
          <div
            style={{
              padding: "36px 32px",
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--bg)",
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: "11px",
                letterSpacing: "0.08em",
                color: "var(--orange, #f45532)",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              [ 03 · WHO BENEFITED ACROSS THE ORGANIZATION ]
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "24px",
                color: "var(--ink)",
                marginBottom: "24px",
                fontWeight: 400,
              }}
            >
              Cross-departmental value realized within 30 days of deployment.
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              }}
              className="grid-cols-1 md:grid-cols-3"
            >
              <div
                style={{
                  border: "1px solid var(--border)",
                  padding: "20px",
                  backgroundColor: "var(--surface)",
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: "8px",
                  }}
                >
                  BACKUP & STORAGE TEAM
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "var(--muted)",
                  }}
                >
                  Automated triage scripts and AI root-cause analysis auto-resolved 82% of overnight job timeouts.
                  Engineers eliminated repetitive manual ticketing and reclaimed 22 hours per week.
                </div>
              </div>

              <div
                style={{
                  border: "1px solid var(--border)",
                  padding: "20px",
                  backgroundColor: "var(--surface)",
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: "8px",
                  }}
                >
                  CISO & SECURITY OPERATIONS
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "var(--muted)",
                  }}
                >
                  Continuous scanning validated that snapshots were free from dormant ransomware binaries before restoration.
                  Security leadership gained a real-time recovery posture index mapped to Tier-0 apps.
                </div>
              </div>

              <div
                style={{
                  border: "1px solid var(--border)",
                  padding: "20px",
                  backgroundColor: "var(--surface)",
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: "8px",
                  }}
                >
                  COMPLIANCE & LEGAL
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "var(--muted)",
                  }}
                >
                  Eliminated 3 weeks of manual engineering spreadsheet preparation.
                  Examiners received a cryptographically sealed WORM ledger proving continuous compliance.
                </div>
              </div>
            </div>
          </div>

          {/* Part 4: Quotable Metrics */}
          <div style={{ padding: "36px 32px" }}>
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: "11px",
                letterSpacing: "0.08em",
                color: "var(--orange, #f45532)",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              [ 04 · QUOTABLE METRICS FOR INTERNAL BUDGET PRESENTATIONS ]
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                marginBottom: "32px",
              }}
              className="grid-cols-2 lg:grid-cols-4"
            >
              {quotableMetrics.map((m) => (
                <div
                  key={m.label}
                  style={{
                    border: "1px solid var(--border)",
                    padding: "20px",
                    backgroundColor: "var(--surface)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                      fontSize: "36px",
                      color: "var(--ink)",
                      lineHeight: 1,
                      marginBottom: "6px",
                    }}
                  >
                    {m.figure}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "var(--ink)",
                      letterSpacing: "0.06em",
                      marginBottom: "4px",
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: "11px",
                      lineHeight: 1.4,
                      color: "var(--muted)",
                    }}
                  >
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Quotable Executive Statement */}
            <div
              style={{
                borderLeft: "2px solid var(--orange, #f45532)",
                paddingLeft: "20px",
                paddingTop: "4px",
                paddingBottom: "4px",
              }}
            >
              <blockquote
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "20px",
                  lineHeight: 1.4,
                  color: "var(--ink)",
                  fontStyle: "italic",
                  margin: "0 0 8px",
                }}
              >
                "MeshDefend gave us the rare business case where our engineers got their mornings back,
                our CISO got verifiable proof for the board, and procurement saw a sub-6-month payback."
              </blockquote>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: "11px",
                  color: "var(--muted)",
                }}
              >
                — VP of Global Infrastructure & Enterprise Resilience, Tier-1 Financial Institution
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
