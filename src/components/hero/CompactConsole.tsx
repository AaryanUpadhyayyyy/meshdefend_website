"use client";

import React, { forwardRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export type CompactConsoleState = "idle" | "failed" | "proposed" | "approved" | "verified";

interface CompactConsoleProps {
  state: CompactConsoleState;
  onApprove: () => void;
  failureMarkerRef?: React.RefObject<HTMLDivElement | null>;
  isInteractive?: boolean;
}

export const CompactConsole = forwardRef<HTMLDivElement, CompactConsoleProps>(
  function CompactConsole({ state, onApprove, failureMarkerRef, isInteractive = true }, ref) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const isDark = mounted ? resolvedTheme === "dark" : true;

    // Timeline state flags
    const isFailedOrLater = state !== "idle";
    const isApprovedOrVerified = state === "approved" || state === "verified";

    // Delayed entrance of 02:52 (700ms after 02:44 slides in)
    const [showFixProposed, setShowFixProposed] = useState(false);

    useEffect(() => {
      if (state === "failed") {
        setShowFixProposed(false);
        const timer = setTimeout(() => {
          setShowFixProposed(true);
        }, 700);
        return () => clearTimeout(timer);
      } else if (state === "proposed" || state === "approved" || state === "verified") {
        setShowFixProposed(true);
      } else {
        setShowFixProposed(false);
      }
    }, [state]);

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Resilience Operations Console timeline preview"
        aria-hidden={!isInteractive}
        inert={!isInteractive}
        style={{
          width: "100%",
          maxWidth: "clamp(360px, 30vw, 420px)",
          background: isDark ? "#2b282b" : "#fefdfd",
          border: "1px solid var(--border)",
          borderRadius: 6,
          boxShadow: "0 24px 60px -30px rgba(34, 31, 34, 0.35)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 10,
          pointerEvents: isInteractive ? "auto" : "none",
          transition: "background 0.2s ease, border-color 0.2s ease",
        }}
      >
        {/* Header: Exactly one hairline underneath */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: "var(--ink)",
              letterSpacing: "-0.01em",
            }}
          >
            ResOC console
          </span>

          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: "var(--muted)",
            }}
          >
            Last night
          </span>
        </div>

        {/* Timeline Body */}
        <div
          style={{
            padding: "20px 20px 16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            position: "relative",
          }}
        >
          {/* Continuous 1px Vertical Timeline Hairline */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 78, // 20px padding + 56px time + 2px offset = center of 12px marker
              top: 26,
              bottom: 26,
              width: 1,
              background: "var(--border)",
              zIndex: 1,
            }}
          />

          {/* ─── Row 1: 02:00 ─── */}
          <div style={{ display: "grid", gridTemplateColumns: "56px 12px 1fr", gap: "0 10px", alignItems: "start", position: "relative", zIndex: 2 }}>
            <span
              style={{
                fontFamily: "var(--font-mono), JetBrains Mono, monospace",
                fontSize: 12,
                fontVariantNumeric: "tabular-nums",
                color: "var(--muted)",
                lineHeight: "18px",
              }}
            >
              02:00
            </span>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 18 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--ink)",
                }}
              />
            </div>

            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ink)", lineHeight: 1.35 }}>
                Backup job completed · Veeam
              </div>
            </div>
          </div>

          {/* ─── Row 2: 02:41 (Target for Orange Thread) ─── */}
          <div style={{ display: "grid", gridTemplateColumns: "56px 12px 1fr", gap: "0 10px", alignItems: "start", position: "relative", zIndex: 2 }}>
            <span
              style={{
                fontFamily: "var(--font-mono), JetBrains Mono, monospace",
                fontSize: 12,
                fontVariantNumeric: "tabular-nums",
                color: "var(--muted)",
                lineHeight: "18px",
              }}
            >
              02:41
            </span>

            {/* Marker: Breathing hollow ring (idle) -> Orange dot (failed) -> Ink dot (approved/verified) */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 18 }}>
              <div
                ref={failureMarkerRef}
                id="timeline-failure-marker"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: isApprovedOrVerified
                    ? "var(--ink)"
                    : isFailedOrLater
                    ? "var(--orange)"
                    : "transparent",
                  border: isApprovedOrVerified
                    ? "none"
                    : isFailedOrLater
                    ? "none"
                    : "1.5px dashed var(--ink)",
                  boxShadow: isFailedOrLater && !isApprovedOrVerified
                    ? "0 0 10px var(--orange)"
                    : "none",
                  transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                  animation: !isFailedOrLater ? "timeline-breathe 2.4s ease-in-out infinite" : "none",
                }}
              />
            </div>

            {/* Crossfading Row Copy (120ms crossfade) */}
            <div style={{ minHeight: 40 }}>
              <AnimatePresence mode="wait">
                {!isFailedOrLater ? (
                  <motion.div
                    key="running"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                  >
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ink)", lineHeight: 1.35 }}>
                      Recovery test running
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="failed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                  >
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ink)", lineHeight: 1.35 }}>
                      Recovery test failed · payments-db
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "var(--ink)", opacity: 0.65, lineHeight: 1.4, marginTop: 2 }}>
                      Config drift after the 02:14 change
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ─── Row 3: 02:44 (Agent Mesh traced the cause) ─── */}
          <AnimatePresence>
            {isFailedOrLater && (
              <motion.div
                key="traced-row"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "grid", gridTemplateColumns: "56px 12px 1fr", gap: "0 10px", alignItems: "start", position: "relative", zIndex: 2 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono), JetBrains Mono, monospace",
                    fontSize: 12,
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--muted)",
                    lineHeight: "18px",
                  }}
                >
                  02:44
                </span>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 18 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--ink)",
                    }}
                  />
                </div>

                <div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ink)", lineHeight: 1.35 }}>
                    Agent Mesh™ traced the cause
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "var(--ink)", opacity: 0.65, lineHeight: 1.4, marginTop: 2 }}>
                    3 of 14 applications depend on it
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Row 4: 02:52 (Fix proposed & Human Decision) ─── */}
          <AnimatePresence>
            {showFixProposed && (
              <motion.div
                key="proposed-row"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "grid", gridTemplateColumns: "56px 12px 1fr", gap: "0 10px", alignItems: "start", position: "relative", zIndex: 2 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono), JetBrains Mono, monospace",
                    fontSize: 12,
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--muted)",
                    lineHeight: "18px",
                  }}
                >
                  02:52
                </span>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 18 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: isApprovedOrVerified ? "var(--ink)" : "transparent",
                      border: isApprovedOrVerified ? "none" : "1.5px solid var(--ink)",
                    }}
                  />
                </div>

                <div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ink)", lineHeight: 1.35 }}>
                    Fix proposed
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "var(--ink)", opacity: 0.65, lineHeight: 1.4, marginTop: 2 }}>
                    Restore the config snapshot from 02:14 and re-run the restore test.
                  </div>

                  {/* Actions / Collapsed Status */}
                  <div style={{ marginTop: 12 }}>
                    {!isApprovedOrVerified ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <button
                            type="button"
                            onClick={onApprove}
                            style={{
                              background: "var(--orange)",
                              color: "#221f22",
                              fontFamily: "Inter, sans-serif",
                              fontSize: 13,
                              fontWeight: 600,
                              padding: "7px 16px",
                              borderRadius: 4,
                              border: "none",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "transform 0.15s ease, opacity 0.15s ease",
                            }}
                          >
                            Approve fix
                          </button>

                          <button
                            type="button"
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                              fontFamily: "Inter, sans-serif",
                              fontSize: 13,
                              color: "var(--ink)",
                              opacity: 0.8,
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            Review evidence
                          </button>
                        </div>

                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--muted)" }}>
                          Requires human approval
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 13,
                          fontWeight: 500,
                          color: "var(--ink)",
                          marginTop: 4,
                        }}
                      >
                        Approved by backup lead
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Row 5: 02:58 (Restore test passed · evidence saved) ─── */}
          <AnimatePresence>
            {isApprovedOrVerified && (
              <motion.div
                key="passed-row"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "grid", gridTemplateColumns: "56px 12px 1fr", gap: "0 10px", alignItems: "start", position: "relative", zIndex: 2 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono), JetBrains Mono, monospace",
                    fontSize: 12,
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--muted)",
                    lineHeight: "18px",
                  }}
                >
                  02:58
                </span>

                {/* Marker: Ink dot with small check */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 18 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "var(--ink)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#2b282b" : "#fefdfd"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ink)", lineHeight: 1.35 }}>
                    Restore test passed · evidence saved
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "var(--ink)", opacity: 0.65, lineHeight: 1.4, marginTop: 2 }}>
                    Ready for the audit trail.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 20px 16px 20px",
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            color: "var(--muted)",
          }}
        >
          Sample data, illustrative.
        </div>
      </div>
    );
  }
);
