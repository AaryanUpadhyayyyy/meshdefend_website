"use client";

import { motion } from "framer-motion";

export function PartnershipDeRiskFold() {
  const boutiqueSteps = [
    { label: "01. SCOPE & BUILD", desc: "Design custom client integration using OpenAPI schemas" },
    { label: "02. HIT EDGE CASE", desc: "Encounter non-standard client backup topology or legacy storage" },
    { label: "03. DOCS & SANDBOX", desc: "Reproduce and debug deterministically in private simulation sandbox" },
    { label: "04. ENGINEERING BRIDGE", desc: "Direct Slack escalation to core platform engineers within 1 hour" },
    { label: "05. CLIENT DELIVERY", desc: "Deliver production-ready integration without risking reputation" },
  ];

  const globalSteps = [
    { label: "01. CHARTER PRACTICE", desc: "Formalize cyber resilience service line with executive leadership" },
    { label: "02. ENABLE TEAMS", desc: "Multi-week technical & delivery bootcamps for solutions architects" },
    { label: "03. ACCREDIT & CERTIFY", desc: "Certify staff as MeshDefend Certified Resilience Architects (MCRA)" },
    { label: "04. FLEET DEPLOYMENT", desc: "Roll out multi-tenant governance across global enterprise clients" },
    { label: "05. RECURRING SCALE", desc: "Expand annual recurring revenue via co-selling and managed services" },
  ];

  return (
    <section
      id="partnership-derisk"
      aria-label="Remove What Could Make the Partnership Fail"
      style={{
        padding: "120px 0 110px",
        backgroundColor: "var(--surface-raised, #f3f1f1)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
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
            borderBottom: "1px solid var(--border)",
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
            [ PARTNERSHIP RISK MITIGATION · PARALLEL CONFIDENCE ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            FIG. 3 — DE-RISKING THE TWO PARTNER MODELS
          </span>
        </div>

        {/* H2 Heading */}
        <div style={{ maxWidth: 980, marginBottom: 52 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(38px, 4.8vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 18,
            }}
          >
            Remove what could make the partnership fail.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: 840,
              margin: 0,
            }}
          >
            The risk differs by partner size. A boutique SI worries about hitting an unexpected platform
            wall mid-engagement and losing credibility in front of their client. A global SI worries about
            allocating senior practice leads to a vendor who won’t meaningfully support their scale. We
            address both without pretending they are the same.
          </p>
        </div>

        {/* =================================================================== */}
        {/* 2-COLUMN EXPOSED DE-RISKING GRID                                    */}
        {/* =================================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg, #fefdfd)",
          }}
        >
          {/* ─────────────────────────────────────────────────────────────
              COLUMN 1: THE BUILDER'S FEAR (Boutique SI)
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              padding: "40px 32px",
              borderRight: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Eyebrow */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 18,
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    color: "var(--orange, #f45532)",
                    fontWeight: 600,
                  }}
                >
                  THE BUILDER’S FEAR · TECHNICAL REPUTATION
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9,
                    padding: "2px 6px",
                    backgroundColor: "rgba(34,31,34,0.06)",
                    color: "var(--ink)",
                  }}
                >
                  BOUTIQUE TRACK
                </span>
              </div>

              {/* Exact Hook */}
              <h3
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "clamp(26px, 2.8vw, 36px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  margin: "0 0 16px",
                  fontWeight: 400,
                }}
              >
                “Don’t discover the platform limit after you’ve promised the solution.”
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  margin: "0 0 28px",
                }}
              >
                You’ve scoped a custom recovery workflow for your client CIO. The fear is finding an
                undocumented API restriction on day 14 of a 20-day sprint. Here is the technical
                structure that prevents that:
              </p>

              {/* 4 Technical Pillars */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                <div
                  style={{
                    padding: "14px 16px",
                    backgroundColor: "var(--surface-raised, #f3f1f1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 4,
                    }}
                  >
                    1. DOCUMENTATION DEPTH & OPEN SCHEMAS
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 12,
                      lineHeight: 1.45,
                      color: "var(--muted)",
                    }}
                  >
                    Full OpenAPI 3.1 & GraphQL specifications with complete parameter definitions,
                    error matrices, and runnable curl / TypeScript examples. No internal-only black boxes.
                  </div>
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    backgroundColor: "var(--surface-raised, #f3f1f1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 4,
                    }}
                  >
                    2. DEDICATED SANDBOX & SIMULATION CLUSTERS
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 12,
                      lineHeight: 1.45,
                      color: "var(--muted)",
                    }}
                  >
                    Instant on-demand test environments with simulated hypervisors, storage catalogs,
                    and chaos fault-injection to validate edge-case workflows before touching client infrastructure.
                  </div>
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    backgroundColor: "var(--surface-raised, #f3f1f1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 4,
                    }}
                  >
                    3. DIRECT-TO-ENGINEERING ESCALATION
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 12,
                      lineHeight: 1.45,
                      color: "var(--muted)",
                    }}
                  >
                    No offshore tier-1 ticket queues. During active client implementations, your team
                    shares a dedicated private Slack or Teams bridge with MeshDefend core platform engineers.
                  </div>
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    backgroundColor: "var(--surface-raised, #f3f1f1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 4,
                    }}
                  >
                    4. 24-MONTH API STABILITY GUARANTEE
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 12,
                      lineHeight: 1.45,
                      color: "var(--muted)",
                    }}
                  >
                    Zero breaking changes to released endpoints. Your custom client adapters and integrations
                    remain functional across platform updates without billable maintenance penalties.
                  </div>
                </div>
              </div>

              {/* Boutique Delivery Journey */}
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    color: "var(--ink)",
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  BOUTIQUE DELIVERY PATH:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {boutiqueSteps.map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        fontSize: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          color: "var(--orange, #f45532)",
                          fontWeight: 600,
                          minWidth: 105,
                        }}
                      >
                        {step.label}
                      </span>
                      <span style={{ color: "var(--muted)" }}>{step.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Proof Badge */}
            <div
              style={{
                marginTop: 28,
                padding: "10px 14px",
                backgroundColor: "var(--surface-raised, #f3f1f1)",
                border: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--ink)",
                  fontWeight: 600,
                }}
              >
                PLATFORM SUPPORT SLA
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--orange, #f45532)",
                  fontWeight: 600,
                }}
              >
                &lt; 60 MIN RESPONSE
              </span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              COLUMN 2: THE ALLIANCE LEADER'S FEAR (Global SI)
              ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              padding: "40px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Eyebrow */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 18,
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    color: "var(--orange, #f45532)",
                    fontWeight: 600,
                  }}
                >
                  THE ALLIANCE LEADER’S FEAR · STRATEGIC SCALE
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9,
                    padding: "2px 6px",
                    backgroundColor: "rgba(34,31,34,0.06)",
                    color: "var(--ink)",
                  }}
                >
                  GLOBAL TRACK
                </span>
              </div>

              {/* Exact Hook */}
              <h3
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "clamp(26px, 2.8vw, 36px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  margin: "0 0 16px",
                  fontWeight: 400,
                }}
              >
                “Built for a practice, not just a project.”
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  margin: "0 0 28px",
                }}
              >
                You’re committing partner capital, practice managers, and hundreds of consultant hours.
                The fear is investing in a vendor who treats you as a transactional reseller rather than
                a strategic service line. Here is the operational alliance structure:
              </p>

              {/* 4 Business Pillars */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                <div
                  style={{
                    padding: "14px 16px",
                    backgroundColor: "var(--surface-raised, #f3f1f1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 4,
                    }}
                  >
                    1. FORMAL ENABLEMENT & BOOTCAMP CURRICULUM
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 12,
                      lineHeight: 1.45,
                      color: "var(--muted)",
                    }}
                  >
                    Standardized training modules tailored for Solution Architects, Delivery Leads,
                    and Pre-Sales Engineers. Turn practitioners into billing assets within two weeks.
                  </div>
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    backgroundColor: "var(--surface-raised, #f3f1f1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 4,
                    }}
                  >
                    2. ACCREDITED CERTIFICATION (MCRA)
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 12,
                      lineHeight: 1.45,
                      color: "var(--muted)",
                    }}
                  >
                    MeshDefend Certified Resilience Architect (MCRA) credentials validate verified
                    practitioner competency, providing clear third-party substantiation for client RFPs.
                  </div>
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    backgroundColor: "var(--surface-raised, #f3f1f1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 4,
                    }}
                  >
                    3. DEDICATED PARTNER SOLUTIONS ARCHITECTS (PSA)
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 12,
                      lineHeight: 1.45,
                      color: "var(--muted)",
                    }}
                  >
                    Named PSA aligned directly to your global practice. They co-author customer architecture
                    blueprints, review high-stakes proposals, and participate in complex multi-cloud dry-runs.
                  </div>
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    backgroundColor: "var(--surface-raised, #f3f1f1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 4,
                    }}
                  >
                    4. DEAL REGISTRATION & CO-SELLING MARGINS
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 12,
                      lineHeight: 1.45,
                      color: "var(--muted)",
                    }}
                  >
                    Enforced non-disintermediation covenant. Transparent margin schedules, protected
                    account registration, joint pipeline reviews, and shared go-to-market marketing development funds (MDF).
                  </div>
                </div>
              </div>

              {/* Global Alliance Journey */}
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    color: "var(--ink)",
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  GLOBAL PRACTICE PATH:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {globalSteps.map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        fontSize: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 10,
                          color: "var(--orange, #f45532)",
                          fontWeight: 600,
                          minWidth: 105,
                        }}
                      >
                        {step.label}
                      </span>
                      <span style={{ color: "var(--muted)" }}>{step.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Proof Badge */}
            <div
              style={{
                marginTop: 28,
                padding: "10px 14px",
                backgroundColor: "var(--surface-raised, #f3f1f1)",
                border: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--ink)",
                  fontWeight: 600,
                }}
              >
                ALLIANCE COMMITMENT
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--orange, #f45532)",
                  fontWeight: 600,
                }}
              >
                NAMED SERVICE LINE STATUS
              </span>
            </div>
          </div>
        </div>

        {/* Synthesis Anchor connecting both paths to Partner Support */}
        <div
          style={{
            marginTop: 24,
            padding: "18px 24px",
            backgroundColor: "var(--bg, #fefdfd)",
            border: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                backgroundColor: "var(--orange, #f45532)",
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--ink)",
                fontWeight: 600,
              }}
            >
              SYNTHESIS: BOTH PATHS CONVERGE ON MESHDEFEND PARTNER SUPPORT
            </span>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 13,
              color: "var(--muted)",
            }}
          >
            Technical integrity for the builder. Enterprise scalability for the alliance.
          </span>
        </div>
      </div>
    </section>
  );
}
