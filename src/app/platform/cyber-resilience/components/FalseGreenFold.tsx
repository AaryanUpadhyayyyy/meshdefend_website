"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function FalseGreenFold() {
  const [isHovered, setIsHovered] = useState(false);
  const [isManualRevealed, setIsManualRevealed] = useState<boolean | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  // Revealed if manually clicked, or if hovered, or if in view
  const isRevealed = isManualRevealed !== null ? isManualRevealed : isHovered || isInView;

  return (
    <section
      id="define-recovery-safety"
      aria-label="Define Recovery Safety"
      style={{
        padding: "120px 0 96px",
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Editorial Eyebrow & Figure Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 28,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 14,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              fontWeight: 500,
              color: "var(--muted)",
              letterSpacing: "0.04em",
            }}
          >
            Platform · Cyber Resilience
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 1 — THE ILLUSION OF BACKUP SUCCESS
          </span>
        </div>

        {/* Display H1 & Verbatim Lead Narrative (NO FAKE PARAGRAPHS) */}
        <div style={{ maxWidth: 940, marginBottom: 48 }}>
          <h1
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(48px, 5.4vw, 80px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 24,
            }}
          >
            Protected. But recoverable?
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 19,
              lineHeight: 1.55,
              color: "var(--ink)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            A completed backup does not automatically mean a clean, safe recovery point. See what
            lies beneath a successful backup job.
          </p>
        </div>

        {/* The False Green Laser-Cut Sliding Reveal Component */}
        <div
          ref={containerRef}
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
            position: "relative",
          }}
        >
          {/* Top Control Bar */}
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--surface-raised, #f7f6f5)",
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
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--ink)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                TARGET APP: CORE BANKING & TRANSACTION LEDGER
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                (sample operational data)
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                INTERACTIVE SCANNER:
              </span>
              <button
                type="button"
                onClick={() =>
                  setIsManualRevealed(isManualRevealed === null ? !isRevealed : !isManualRevealed)
                }
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  padding: "6px 14px",
                  border: isRevealed
                    ? "1px solid var(--orange, #f45532)"
                    : "1px solid var(--ink)",
                  color: isRevealed ? "var(--orange, #f45532)" : "var(--ink)",
                  backgroundColor: "var(--bg)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {isRevealed ? "Close Split Layer ×" : "Crack Open Reality →"}
              </button>
            </div>
          </div>

          {/* Interactive Split Canvas Stage */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              position: "relative",
              overflow: "hidden",
              minHeight: 420,
              cursor: "pointer",
              backgroundColor: "var(--dark, #221f22)",
            }}
          >
            {/* ─── UNDERNEATH LAYER: The Stark #221f22 Dark Reality Layer ─── */}
            <div
              style={{
                padding: "44px 36px",
                color: "#fefdfd",
                minHeight: 420,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 22,
                    borderBottom: "1px solid rgba(254, 253, 253, 0.12)",
                    paddingBottom: 12,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#f45532",
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--orange, #f45532)",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                      }}
                    >
                      CYBER RESILIENCE INSPECTION: REALITY EXPOSED
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "rgba(254, 253, 253, 0.45)",
                    }}
                  >
                    STATUS: RESTORE WOULD FAIL
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 26,
                    color: "#fefdfd",
                    marginBottom: 24,
                  }}
                >
                  What lies beneath the 100% green checkmark:
                </div>

                {/* The 3 Specific Reality Tags */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 18,
                    marginBottom: 32,
                  }}
                >
                  {/* Reality 1: Ransomware Encryption Detected */}
                  <div
                    style={{
                      border: "1px solid rgba(244, 85, 50, 0.4)",
                      backgroundColor: "rgba(244, 85, 50, 0.08)",
                      padding: "22px 24px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11.5,
                        color: "var(--orange, #f45532)",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        marginBottom: 10,
                      }}
                    >
                      [ RANSOMWARE ENCRYPTION DETECTED ]
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: "rgba(254, 253, 253, 0.88)",
                      }}
                    >
                      Snapshot carries dormant encrypted blocks. Byte-entropy anomaly was ignored by
                      the backup catalog because transport succeeded.
                    </div>
                  </div>

                  {/* Reality 2: Unverified Dependencies */}
                  <div
                    style={{
                      border: "1px solid rgba(254, 253, 253, 0.18)",
                      backgroundColor: "rgba(254, 253, 253, 0.04)",
                      padding: "22px 24px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11.5,
                        color: "rgba(254, 253, 253, 0.85)",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        marginBottom: 10,
                      }}
                    >
                      [ UNVERIFIED DEPENDENCIES ]
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: "rgba(254, 253, 253, 0.78)",
                      }}
                    >
                      Redis session cache and IAM authentication routes are excluded from the
                      protection policy. Restored database will fail on boot.
                    </div>
                  </div>

                  {/* Reality 3: RTO/RPO Assumptions */}
                  <div
                    style={{
                      border: "1px solid rgba(254, 253, 253, 0.18)",
                      backgroundColor: "rgba(254, 253, 253, 0.04)",
                      padding: "22px 24px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11.5,
                        color: "rgba(254, 253, 253, 0.85)",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        marginBottom: 10,
                      }}
                    >
                      [ RTO/RPO ASSUMPTIONS ]
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: "rgba(254, 253, 253, 0.78)",
                      }}
                    >
                      Target recovery AZ lacks allocated compute instance quota. Actual restore time
                      is 18 hours instead of the promised 4-hour SLA.
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(254, 253, 253, 0.12)",
                  paddingTop: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "rgba(254, 253, 253, 0.5)",
                  }}
                >
                  A completed backup is not a recovery point until verified safe.
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--orange, #f45532)",
                    fontWeight: 600,
                  }}
                >
                  Active Posture Drift: High Risk
                </span>
              </div>
            </div>

            {/* ─── SLIDING DOOR TOP LAYER: Pure White Paper Card ─── */}
            {/* Top Half of the Card (slides up y: -100%) */}
            <motion.div
              initial={false}
              animate={{
                y: isRevealed ? "-100%" : "0%",
              }}
              transition={{
                duration: 0.55,
                ease: [0.65, 0, 0.15, 1],
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "50%",
                backgroundColor: "var(--bg, #fefdfd)",
                borderBottom: "none",
                padding: "36px 36px 0",
                zIndex: 3,
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 16,
                  marginBottom: 24,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      border: "1.5px solid #4a825e",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4a825e",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--ink)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    BACKUP 100% SUCCESSFUL
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--muted)",
                  }}
                >
                  Job #8491 · Commvault Primary Run
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 24,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      color: "var(--muted)",
                      marginBottom: 6,
                    }}
                  >
                    DATA TRANSFERRED
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    14.2 TB / 14.2 TB
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      color: "var(--muted)",
                      marginBottom: 6,
                    }}
                  >
                    DURATION
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    01h 42m 18s
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      color: "var(--muted)",
                      marginBottom: 6,
                    }}
                  >
                    CATALOG STATE
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 18,
                      fontWeight: 600,
                      color: "#4a825e",
                    }}
                  >
                    SYNCHRONIZED (GREEN)
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Half of the Card (slides down y: 100%) */}
            <motion.div
              initial={false}
              animate={{
                y: isRevealed ? "100%" : "0%",
              }}
              transition={{
                duration: 0.55,
                ease: [0.65, 0, 0.15, 1],
              }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "50%",
                backgroundColor: "var(--bg, #fefdfd)",
                borderTop: "none",
                padding: "28px 36px 36px",
                zIndex: 3,
                overflow: "hidden",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  padding: "16px 20px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--surface-raised, #f7f6f5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--muted)",
                    }}
                  >
                    CONSOLE STATUS:
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#4a825e",
                    }}
                  >
                    ALL JOBS HEALTHY · ZERO OPERATIONAL ERRORS REPORTED
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--muted)",
                  }}
                >
                  Hover or scroll to inspect reality &darr;
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid var(--border)",
                  paddingTop: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--muted)",
                  }}
                >
                  Operational assumption: Green = Safe to restore.
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--orange, #f45532)",
                    fontWeight: 600,
                  }}
                >
                  Slice card to reveal reality &rarr;
                </span>
              </div>
            </motion.div>

            {/* ─── Glowing 1px #f45532 Laser Line Slicing Horizontally ─── */}
            <motion.div
              initial={false}
              animate={{
                scaleX: isRevealed ? 1 : 0,
                opacity: isRevealed ? [0, 1, 0.8] : 0,
              }}
              transition={{
                duration: 0.45,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: "#f45532",
                boxShadow:
                  "0 0 12px rgba(244, 85, 50, 0.9), 0 0 24px rgba(244, 85, 50, 0.5)",
                zIndex: 4,
                transformOrigin: "left",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
