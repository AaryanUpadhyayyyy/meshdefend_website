"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";

type FormState = "idle" | "submitting" | "success";

export default function NewsletterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus("submitting");

    // Simulate 1-second network submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
  };

  return (
    <>
      <Navbar />
      <main
        id="main"
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--bg)",
          color: "var(--ink)",
          paddingTop: "clamp(120px, 15vh, 160px)",
          paddingBottom: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: 1080,
            width: "100%",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* ===================================================================
              FOLD 1 — THE HERO (Value Proposition)
              =================================================================== */}
          <section
            aria-labelledby="brief-title"
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11,
                color: "var(--orange)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 20,
                fontWeight: 600,
              }}
            >
              [ RESOURCES · WEEKLY RESILIENCE BRIEF ]
            </div>

            {/* H1 (Instrument Serif, 64px+) */}
            <h1
              id="brief-title"
              style={{
                fontFamily: "var(--font-instrument-serif), serif",
                fontSize: "clamp(46px, 6.4vw, 76px)",
                fontWeight: 400,
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                margin: "0 0 20px",
                maxWidth: 820,
                textAlign: "center",
              }}
            >
              Operational thinking, direct to your inbox.
            </h1>

            {/* Body (Inter 18px --muted, max-width: 600px, centered) */}
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(16px, 1.25vw, 18px)",
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: 600,
                margin: "0 auto 48px",
                textAlign: "center",
              }}
            >
              Join technical leaders receiving our weekly executive briefing on
              multi-vendor cyber recovery, RTO/RPO proof engineering, and
              agentic resilience. No marketing fluff. Just structural insights.
            </p>
          </section>

          {/* ===================================================================
              FOLD 2 — THE INTERACTIVE SIGNUP ENGINE (Form Component)
              =================================================================== */}
          <motion.div
            layout
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "100%",
              maxWidth: 480,
              margin: "0 auto 80px",
              backgroundColor: "var(--surface-raised, #ffffff)",
              border: "1px solid var(--border)",
              borderRadius: 2,
              boxShadow:
                "0 12px 36px -8px rgba(0, 0, 0, 0.06), 0 2px 8px -2px rgba(0, 0, 0, 0.04)",
              padding: "clamp(28px, 4vw, 36px)",
              position: "relative",
            }}
          >
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.form
                  key="signup-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    width: "100%",
                  }}
                >
                  {/* Field 1: Full Name */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label
                      htmlFor="full-name"
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--ink)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      Full Name
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      required
                      disabled={status === "submitting"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Aaryan Upadhyay"
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: 15,
                        lineHeight: 1.4,
                        padding: "12px 14px",
                        backgroundColor: "var(--bg)",
                        color: "var(--ink)",
                        border: "1px solid var(--border)",
                        borderRadius: 2,
                        outline: "none",
                        transition: "border-color 0.2s, opacity 0.2s",
                        opacity: status === "submitting" ? 0.6 : 1,
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "var(--orange)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "var(--border)")
                      }
                    />
                  </div>

                  {/* Field 2: Work Email */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label
                      htmlFor="work-email"
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--ink)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      Work Email
                    </label>
                    <input
                      id="work-email"
                      type="email"
                      required
                      disabled={status === "submitting"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aaryan@enterprise.com"
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: 15,
                        lineHeight: 1.4,
                        padding: "12px 14px",
                        backgroundColor: "var(--bg)",
                        color: "var(--ink)",
                        border: "1px solid var(--border)",
                        borderRadius: 2,
                        outline: "none",
                        transition: "border-color 0.2s, opacity 0.2s",
                        opacity: status === "submitting" ? 0.6 : 1,
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "var(--orange)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "var(--border)")
                      }
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    style={{
                      width: "100%",
                      backgroundColor: "var(--orange, #f45532)",
                      color: "#ffffff",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      padding: "14px 20px",
                      border: "none",
                      borderRadius: 2,
                      cursor: status === "submitting" ? "not-allowed" : "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      marginTop: 4,
                      transition:
                        "background-color 0.2s ease, transform 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (status !== "submitting") {
                        e.currentTarget.style.backgroundColor =
                          "var(--orange-accessible, #c5401f)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (status !== "submitting") {
                        e.currentTarget.style.backgroundColor =
                          "var(--orange, #f45532)";
                      }
                    }}
                  >
                    {status === "submitting" ? (
                      <>
                        <motion.svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            strokeOpacity="0.25"
                          />
                          <path d="M12 2a10 10 0 0 1 10 10" />
                        </motion.svg>
                        <span>Encrypting &amp; Submitting...</span>
                      </>
                    ) : (
                      <span>Subscribe to Briefing</span>
                    )}
                  </button>

                  {/* Micro-copy below button */}
                  <p
                    style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      fontSize: 10,
                      lineHeight: 1.4,
                      color: "var(--muted)",
                      textAlign: "center",
                      margin: 0,
                      letterSpacing: "0.02em",
                    }}
                  >
                    No spam. One-click unsubscribe. Read by CISOs globally.
                  </p>
                </motion.form>
              ) : (
                /* State 3: SUCCESS */
                <motion.div
                  key="signup-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "16px 8px 12px",
                    gap: 16,
                  }}
                >
                  {/* Green / Orange Checkmark Badge */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      backgroundColor: "rgba(244, 85, 50, 0.1)",
                      border: "1px solid rgba(244, 85, 50, 0.3)",
                      color: "var(--orange)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  {/* Confirmation text */}
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: 18,
                        fontWeight: 600,
                        color: "var(--ink)",
                        margin: "0 0 8px",
                      }}
                    >
                      Subscription Confirmed
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: 15,
                        lineHeight: 1.5,
                        color: "var(--muted)",
                        margin: 0,
                        maxWidth: 360,
                      }}
                    >
                      You&apos;re on the list. Look for the Weekly Briefing in
                      your inbox soon.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ===================================================================
              FOLD 3 — WHAT TO EXPECT (The Briefing Blueprint)
              =================================================================== */}
          <section
            aria-label="The Briefing Blueprint"
            style={{
              width: "100%",
              maxWidth: 960,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              backgroundColor: "var(--border)",
              gap: 1, // Exposed 1px hairline grid
              border: "1px solid var(--border)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {/* Column 1 */}
            <div
              style={{
                backgroundColor: "var(--bg)",
                padding: "clamp(24px, 3.5vw, 36px) clamp(20px, 3vw, 32px)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 10,
                  color: "var(--orange)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                [ PILLAR 01 ]
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                Architecture Deep Dives
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                Breakdowns of real-world air-gapped and multi-cloud recovery
                patterns.
              </p>
            </div>

            {/* Column 2 */}
            <div
              style={{
                backgroundColor: "var(--bg)",
                padding: "clamp(24px, 3.5vw, 36px) clamp(20px, 3vw, 32px)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 10,
                  color: "var(--orange)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                [ PILLAR 02 ]
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                RTO/RPO Engineering
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                How to transition from assumptions to provable operational
                resilience.
              </p>
            </div>

            {/* Column 3 */}
            <div
              style={{
                backgroundColor: "var(--bg)",
                padding: "clamp(24px, 3.5vw, 36px) clamp(20px, 3vw, 32px)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 10,
                  color: "var(--orange)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                [ PILLAR 03 ]
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                Agentic Ops Radar
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                The latest updates on HITL guardrails, AI guard-towers, and ResOC
                automation.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
