"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FalseGreenFold() {
  const [isRevealed, setIsRevealed] = useState(false);

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
              fontFamily: "var(--font-mono), monospace",
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
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 1 — THE ILLUSION OF BACKUP SUCCESS
          </span>
        </div>

        {/* Display H1 & Lead Narrative */}
        <div style={{ maxWidth: 940, marginBottom: 56 }}>
          <h1
            style={{
              fontFamily: "var(--font-serif), serif",
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
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 19,
              lineHeight: 1.55,
              color: "var(--ink)",
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            A completed backup does not automatically mean a clean, safe recovery point. See what lies beneath a successful backup job.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 16,
              lineHeight: 1.65,
              color: "var(--muted)",
              maxWidth: 820,
            }}
          >
            Traditional backup consoles answer a simple operational question: did the data transfer complete? In a cyber attack, that answer is dangerously incomplete. A snapshot that completed without errors may carry dormant ransomware binaries, encrypted blocks, missing configuration states, or severed identity dependencies. MeshDefend inspects beneath the surface of job completion to evaluate whether the backup is clean, safe, and actually recoverable.
          </p>
        </div>

        {/* The False Green Reveal Component */}
        <div
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
                  fontFamily: "var(--font-mono), monospace",
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
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                (sample operational data)
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)" }}>
                INTERACTIVE SCANNER:
              </span>
              <button
                type="button"
                onClick={() => setIsRevealed(!isRevealed)}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  padding: "6px 14px",
                  border: isRevealed ? "1px solid var(--orange, #f45532)" : "1px solid var(--ink)",
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
            onMouseEnter={() => setIsRevealed(true)}
            onMouseLeave={() => setIsRevealed(false)}
            style={{
              position: "relative",
              overflow: "hidden",
              minHeight: 380,
              cursor: "pointer",
              backgroundColor: "var(--ink, #221f22)",
            }}
          >
            {/* UNDERNEATH LAYER: The Dark Reality Layer (--ink #221f22) */}
            <div
              style={{
                padding: "40px 32px",
                color: "var(--bg, #fefdfd)",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                    borderBottom: "1px solid rgba(254, 253, 253, 0.12)",
                    paddingBottom: 12,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
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
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 11,
                      color: "rgba(254, 253, 253, 0.4)",
                    }}
                  >
                    STATUS: RESTORE WOULD FAIL
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-serif), serif",
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
                    gap: 16,
                    marginBottom: 28,
                  }}
                >
                  {/* Reality 1: Ransomware Encryption */}
                  <div
                    style={{
                      border: "1px solid rgba(244, 85, 50, 0.4)",
                      backgroundColor: "rgba(244, 85, 50, 0.05)",
                      padding: "20px 22px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 11,
                        color: "var(--orange, #f45532)",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        marginBottom: 8,
                      }}
                    >
                      [ RANSOMWARE ENCRYPTION DETECTED ]
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body), sans-serif",
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: "rgba(254, 253, 253, 0.85)",
                      }}
                    >
                      Snapshot carries dormant encrypted blocks. Byte-entropy anomaly was ignored by the backup catalog because transport succeeded.
                    </div>
                  </div>

                  {/* Reality 2: Unverified Dependencies */}
                  <div
                    style={{
                      border: "1px solid rgba(254, 253, 253, 0.16)",
                      backgroundColor: "rgba(254, 253, 253, 0.03)",
                      padding: "20px 22px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 11,
                        color: "rgba(254, 253, 253, 0.8)",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        marginBottom: 8,
                      }}
                    >
                      [ UNVERIFIED DEPENDENCIES ]
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body), sans-serif",
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: "rgba(254, 253, 253, 0.75)",
                      }}
                    >
                      Redis session cache and IAM authentication routes are excluded from the protection policy. Restored database will fail on boot.
                    </div>
                  </div>

                  {/* Reality 3: RTO/RPO Assumptions */}
                  <div
                    style={{
                      border: "1px solid rgba(254, 253, 253, 0.16)",
                      backgroundColor: "rgba(254, 253, 253, 0.03)",
                      padding: "20px 22px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 11,
                        color: "rgba(254, 253, 253, 0.8)",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        marginBottom: 8,
                      }}
                    >
                      [ RTO/RPO ASSUMPTIONS ]
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body), sans-serif",
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: "rgba(254, 253, 253, 0.75)",
                      }}
                    >
                      Target recovery AZ lacks allocated compute instance quota. Actual restore time is 18 hours instead of the promised 4-hour SLA.
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
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    color: "rgba(254, 253, 253, 0.5)",
                  }}
                >
                  A completed backup is not a recovery point until verified safe.
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    color: "var(--orange, #f45532)",
                  }}
                >
                  Active Posture Drift: High Risk
                </span>
              </div>
            </div>

            {/* TOP SPLIT OVERLAY: Standard, Boring "Backup 100% Successful" Card */}
            <motion.div
              initial={false}
              animate={{
                y: isRevealed ? "-105%" : "0%",
                opacity: isRevealed ? 0 : 1,
              }}
              transition={{
                duration: 0.5,
                ease: [0.65, 0, 0.15, 1],
              }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "var(--bg, #fefdfd)",
                border: "1px solid var(--border)",
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                zIndex: 2,
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24,
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: 14,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* Muted green checkmark circle */}
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: "1px solid #4a825e",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#4a825e",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--ink)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      BACKUP 100% SUCCESSFUL
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
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
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 24,
                    marginBottom: 32,
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>
                      STATUS
                    </div>
                    <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>
                      Completed Without Error
                    </div>
                    <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
                      Zero transport timeouts
                    </div>
                  </div>

                  <div>
                    <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>
                      PAYLOAD TRANSFERRED
                    </div>
                    <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 26, color: "var(--ink)" }}>
                      4.8 TB
                    </div>
                    <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
                      Deduplication ratio: 4.1:1
                    </div>
                  </div>

                  <div>
                    <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>
                      STORAGE COMPLIANCE
                    </div>
                    <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 26, color: "var(--ink)" }}>
                      100% Verified
                    </div>
                    <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
                      Target snapshot locked
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: "16px 20px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--surface-raised, #f7f6f5)",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                    Traditional Backup Report:
                  </span>
                  <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 14, color: "var(--muted)", marginLeft: 8 }}>
                    Job finished cleanly on schedule. Storage consumption within threshold. Everything marked green.
                  </span>
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--border)",
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
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    color: "var(--muted)",
                  }}
                >
                  [ Hover over card or click to crack open what traditional backup conceals ]
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    color: "var(--ink)",
                    fontWeight: 600,
                  }}
                >
                  Reveal Underlying Reality →
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
