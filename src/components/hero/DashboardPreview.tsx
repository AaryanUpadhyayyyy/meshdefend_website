"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DASHBOARD } from "@/lib/content";
import { useHeroState } from "@/lib/heroState";

export function DashboardPreview() {
  const { state, approve, activeTab, setActiveTab, isPaused, setIsPaused } = useHeroState();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (isPaused) return;

    const delay = hasMountedRef.current ? 5000 : 8000;
    hasMountedRef.current = true;

    progressTimerRef.current = setTimeout(() => {
      setActiveTab((prev: number) => (prev + 1) % 3);
    }, delay);

    return () => {
      if (progressTimerRef.current) clearTimeout(progressTimerRef.current);
    };
  }, [isPaused, activeTab, setActiveTab]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveTab((index + 1) % 3);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveTab((index + 2) % 3);
    }
  };

  return (
    <div
      className="dashboard-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      style={{
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: "0 24px 64px -12px rgba(34, 31, 34, 0.16)",
        position: "relative",
      }}
    >
      {/* ─── 1. STATUS BAR ─── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 16px",
          background: "#221f22",
          color: "#fefdfd",
          borderBottom: "1px solid #3d393b",
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#a09a9c" }} />
          <span style={{ fontWeight: 500 }}>{DASHBOARD.statusBar.left}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {DASHBOARD.statusBar.chips.map((chip) => (
            <span
              key={chip}
              style={{
                padding: "2px 8px",
                borderRadius: 4,
                fontSize: 10,
                border: "1px solid #3d393b",
                background: "#2b282b",
                color: "#a09a9c",
                fontWeight: 500,
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* ─── 2. TAB CONTROLS (Auto-cycle with progress bar) ─── */}
      <div
        role="tablist"
        aria-label="ResOC Console Views"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          overflowX: "auto",
        }}
      >
        {DASHBOARD.tabs.map((tab, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              style={{
                position: "relative",
                padding: "12px 16px",
                textAlign: "left",
                background: "transparent",
                border: "none",
                borderRight: idx < 2 ? "1px solid var(--border)" : "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="dashboardTabActivePill"
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--bg)",
                    borderBottom: "2px solid var(--orange)",
                    zIndex: 0,
                  }}
                />
              )}
              <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "var(--ink)",
                  }}
                >
                  {tab.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    color: "var(--muted)",
                  }}
                >
                  0{idx + 1}
                </span>
              </div>
              <span
                style={{
                  position: "relative",
                  zIndex: 1,
                  fontSize: 12,
                  color: "var(--muted)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {tab.sublabel}
              </span>

              {/* Progress Line */}
              {isActive && (
                <div
                  className={`progress-line ${isPaused ? "paused" : ""}`}
                  key={`progress-${idx}`}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "var(--orange)",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ─── 3. MAIN DASHBOARD BODY (Fixed Height, 3-column layout) ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr 340px",
          height: 420,
          background: "var(--bg)",
          overflow: "hidden",
        }}
        className="dash-body-grid"
      >
        {/* ─── COL A: SIDEBAR (Always #221f22) ─── */}
        <aside
          style={{
            background: "#221f22",
            color: "#fefdfd",
            borderRight: "1px solid #3d393b",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "16px 14px",
            overflowY: "auto",
            userSelect: "none",
          }}
        >
          <div>
            {/* Org Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 10.5,
                  letterSpacing: "0.1em",
                  color: "#a09a9c",
                  textTransform: "uppercase",
                }}
              >
                {activeTab === 0
                  ? DASHBOARD.sidebarTab1.title
                  : activeTab === 1
                  ? DASHBOARD.sidebarTab2.title
                  : DASHBOARD.sidebarTab3.title}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 10.5,
                  color: "#a09a9c",
                  fontWeight: 500,
                }}
              >
                Acme · Prod
              </span>
            </div>

            {/* Dynamic Items based on Active Tab */}
            {activeTab === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {DASHBOARD.sidebarTab1.items.map((item) => (
                  <div key={item.label}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "6px 8px",
                        borderRadius: 4,
                        fontSize: 12.5,
                        fontWeight: item.active ? 600 : 400,
                        color: item.active ? "#fefdfd" : "#a09a9c",
                        background: item.active ? "rgba(244, 85, 50, 0.16)" : "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: item.active ? "#f45532" : "#3d393b",
                          }}
                        />
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          style={{
                            fontFamily: "var(--font-mono), monospace",
                            fontSize: 10,
                            padding: "1px 6px",
                            borderRadius: 3,
                            background: "#2b282b",
                            color: "#a09a9c",
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.children && (
                      <div style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}>
                        {item.children.map((child, cIdx) => (
                          <div
                            key={child}
                            style={{
                              fontSize: 11.5,
                              padding: "3px 6px",
                              color: cIdx === 0 && item.active ? "#f45532" : "#6b6568",
                              fontFamily: "var(--font-mono), monospace",
                            }}
                          >
                            ↳ {child}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {DASHBOARD.sidebarTab2.items.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: "7px 10px",
                      borderRadius: 4,
                      fontSize: 12.5,
                      color: item.active ? "#fefdfd" : "#a09a9c",
                      background: item.active ? "rgba(244, 85, 50, 0.16)" : "transparent",
                      fontWeight: item.active ? 600 : 400,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: item.active ? "#f45532" : "#3d393b",
                      }}
                    />
                    {item.label}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {DASHBOARD.sidebarTab3.items.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 4,
                      background: item.active ? "rgba(244, 85, 50, 0.16)" : "#2b282b",
                      border: "1px solid",
                      borderColor: item.active ? "#f45532" : "#3d393b",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 11.5,
                          fontWeight: 700,
                          color: item.active ? "#f45532" : "#fefdfd",
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 9.5,
                          color: item.muted ? "#6b6568" : "#f45532",
                        }}
                      >
                        {item.muted ? "STAGED" : "P2"}
                      </span>
                    </div>
                    {item.children && (
                      <div style={{ fontSize: 11, color: "#a09a9c", marginTop: 3 }}>
                        {item.children[0]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          <div
            style={{
              paddingTop: 12,
              borderTop: "1px solid #3d393b",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10.5,
              color: "#a09a9c",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f45532" }} />
            <span>AGENT MESH™ LIVE</span>
          </div>
        </aside>

        {/* ─── COL B: TAB CONTENT PANEL (Scrollable, Fixed Height) ─── */}
        <div
          role="tabpanel"
          id={`panel-${DASHBOARD.tabs[activeTab].id}`}
          aria-labelledby={`tab-${DASHBOARD.tabs[activeTab].id}`}
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRight: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          {/* Panel Title Bar */}
          <div
            style={{
              padding: "10px 18px",
              background: "var(--surface)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>
              {DASHBOARD.tabs[activeTab].titleBar.left}
            </span>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)" }}>
              {DASHBOARD.tabs[activeTab].titleBar.right}
            </span>
          </div>

          {/* Panel Scrollable Body */}
          <div style={{ padding: "16px 20px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
            {/* ─── TAB 1: BACKUP ADMIN FEED ─── */}
            {activeTab === 0 && (
              <>
                {/* System line */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    color: "var(--muted)",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--border)" }} />
                  <span>02:00</span>
                  <span>{DASHBOARD.feed[0].text}</span>
                </div>

                {/* Failure alert line */}
                <div
                  id="dash-failure-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    color: "var(--orange)",
                    padding: "6px 10px",
                    background: "rgba(244, 85, 50, 0.08)",
                    border: "1px solid rgba(244, 85, 50, 0.25)",
                    borderRadius: 4,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)" }} />
                  <span style={{ fontWeight: 600 }}>02:41</span>
                  <span style={{ fontWeight: 600 }}>{DASHBOARD.feed[1].text}</span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 10,
                      padding: "1px 6px",
                      background: "var(--orange)",
                      color: "#fff",
                      borderRadius: 3,
                    }}
                  >
                    BLOCKED
                  </span>
                </div>

                {/* Agent Mesh™ Card */}
                <div
                  style={{
                    position: "relative",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    padding: 16,
                  }}
                  className="card-hover"
                >
                  {/* Card Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "var(--orange)",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 12,
                          fontWeight: 700,
                          color: "var(--ink)",
                        }}
                      >
                        Agent Mesh™
                      </span>
                    </div>

                    {/* Chips */}
                    <div style={{ display: "flex", gap: 6 }}>
                      {DASHBOARD.feed[2].chips?.map((chip, idx) => (
                        <span
                          key={chip}
                          style={{
                            fontFamily: "var(--font-mono), monospace",
                            fontSize: 10,
                            padding: "2px 7px",
                            borderRadius: 3,
                            background: idx === 0 ? "rgba(244, 85, 50, 0.12)" : "var(--bg)",
                            color: idx === 0 ? "var(--orange-accessible)" : "var(--muted)",
                            border: "1px solid var(--border)",
                            fontWeight: 600,
                          }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Rows */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {DASHBOARD.feed[2].rows?.map((row) => (
                      <div
                        key={row.label}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "110px 1fr",
                          gap: 12,
                          fontSize: 12.5,
                          lineHeight: 1.45,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-mono), monospace",
                            fontSize: 10.5,
                            color: "var(--muted)",
                            fontWeight: 600,
                          }}
                        >
                          {row.label}
                        </span>
                        <span style={{ color: "var(--ink)", fontWeight: row.label === "PROPOSED FIX" ? 600 : 400 }}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Actions & Tooltip */}
                  <div
                    style={{
                      marginTop: 16,
                      paddingTop: 12,
                      borderTop: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 10,
                    }}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <button
                        onClick={approve}
                        className="btn btn-primary"
                        style={{
                          fontSize: 12,
                          padding: "8px 16px",
                          height: 32,
                        }}
                      >
                        {state === "approved" || state === "verified"
                          ? "✓ Verified"
                          : DASHBOARD.feed[2].actions?.approve}
                      </button>

                      {/* Review evidence button with interactive single tooltip */}
                      <div style={{ position: "relative" }}>
                        <button
                          onClick={() => setTooltipOpen(!tooltipOpen)}
                          onMouseEnter={() => setTooltipOpen(true)}
                          onMouseLeave={() => setTooltipOpen(false)}
                          aria-describedby="agent-rationale-tooltip"
                          className="btn btn-secondary"
                          style={{
                            fontSize: 12,
                            padding: "8px 14px",
                            height: 32,
                          }}
                        >
                          {DASHBOARD.feed[2].actions?.review}
                        </button>

                        {/* ONE Tooltip */}
                        {tooltipOpen && (
                          <div
                            id="agent-rationale-tooltip"
                            role="tooltip"
                            style={{
                              position: "absolute",
                              bottom: "calc(100% + 8px)",
                              left: 0,
                              background: "#221f22",
                              color: "#fefdfd",
                              padding: "10px 14px",
                              borderRadius: 5,
                              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                              fontSize: 11.5,
                              lineHeight: 1.45,
                              width: 280,
                              zIndex: 100,
                              border: "1px solid #3d393b",
                            }}
                          >
                            <div style={{ fontWeight: 600, color: "#f45532", marginBottom: 3 }}>
                              Agent Rationale &amp; Evidence
                            </div>
                            <div>• Config snapshot 02:14 matches last validated checksum.</div>
                            <div>• Cited: 2 infrastructure changes logged since last test.</div>
                            <div>• Approver: Backup Lead sign-off required prior to execution.</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span
                        style={{
                          fontStyle: "italic",
                          fontSize: 11.5,
                          color: "var(--muted)",
                        }}
                      >
                        {DASHBOARD.typing}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 11,
                          color: "var(--muted)",
                        }}
                      >
                        {DASHBOARD.footer}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 11.5,
                    fontFamily: "var(--font-mono), monospace",
                    color: "var(--muted)",
                    paddingTop: 4,
                  }}
                >
                  {DASHBOARD.feedCaption}
                </div>
              </>
            )}

            {/* ─── TAB 2: CISO READINESS BRIEF ─── */}
            {activeTab === 1 && (
              <>
                {/* Wide Tile: Readiness by Application Bar List */}
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--font-mono), monospace" }}>
                      APPLICATION RECOVERY VERIFICATION (14 APPS)
                    </span>
                    <span style={{ fontSize: 11, color: "var(--orange)", fontFamily: "var(--font-mono), monospace" }}>
                      3 UNTESTED GAPS
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
                    {DASHBOARD.cisoReadiness.map((item) => (
                      <div
                        key={item.app}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "4px 8px",
                          borderRadius: 3,
                          background: item.tested ? "transparent" : "rgba(244, 85, 50, 0.08)",
                          border: item.tested ? "1px solid transparent" : "1px solid rgba(244, 85, 50, 0.25)",
                          fontSize: 11.5,
                          fontFamily: "var(--font-mono), monospace",
                        }}
                      >
                        <span style={{ color: item.tested ? "var(--ink)" : "var(--orange)" }}>
                          {item.tested ? "✓" : "!"} {item.app}
                        </span>
                        <span style={{ color: "var(--muted)", fontSize: 10.5 }}>
                          {item.lastTest}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 Small Metric Tiles */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {DASHBOARD.cisoSmallMetrics.map((m, idx) => (
                    <div
                      key={m.label}
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 6,
                        padding: "12px 14px",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10.5, color: "var(--muted)" }}>
                        {m.label}
                      </span>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                        <span
                          style={{
                            fontFamily: "var(--font-display), Georgia, serif",
                            fontSize: 44,
                            lineHeight: 1,
                            color: idx === 1 ? "var(--orange)" : "var(--ink)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {m.value}
                        </span>
                        {m.sub && (
                          <span style={{ fontSize: 11.5, color: "var(--muted)" }}>
                            {m.sub}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Blind spots note */}
                <div
                  style={{
                    padding: "10px 14px",
                    background: "rgba(244, 85, 50, 0.06)",
                    border: "1px solid rgba(244, 85, 50, 0.25)",
                    borderRadius: 4,
                    fontSize: 12,
                    color: "var(--orange)",
                    fontFamily: "var(--font-mono), monospace",
                  }}
                >
                  BLIND SPOTS: {DASHBOARD.cisoCaption}
                </div>
              </>
            )}

            {/* ─── TAB 3: SERVICENOW TICKET ─── */}
            {activeTab === 2 && (
              <>
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {/* Ticket Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 13,
                          fontWeight: 700,
                          color: "var(--ink)",
                        }}
                      >
                        {DASHBOARD.itsmTicket.number}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 10,
                          padding: "1px 6px",
                          background: "var(--orange)",
                          color: "#fff",
                          borderRadius: 3,
                          fontWeight: 700,
                        }}
                      >
                        {DASHBOARD.itsmTicket.priority}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 11,
                        color: "var(--muted)",
                      }}
                    >
                      State: {DASHBOARD.itsmTicket.state}
                    </span>
                  </div>

                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>
                    {DASHBOARD.itsmTicket.short}
                  </div>

                  {/* Work Notes */}
                  <div
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                      padding: 12,
                      fontSize: 12,
                      lineHeight: 1.5,
                      color: "var(--ink)",
                    }}
                  >
                    <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10.5, color: "var(--orange)", marginBottom: 4 }}>
                      AGENT MESH™ WORK NOTE (AUTO-POSTED)
                    </div>
                    {DASHBOARD.itsmTicket.workNote}
                  </div>

                  {/* Staged Change Request */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 12px",
                      background: "rgba(244, 85, 50, 0.08)",
                      border: "1px dashed var(--orange)",
                      borderRadius: 4,
                      fontSize: 12,
                      fontFamily: "var(--font-mono), monospace",
                    }}
                  >
                    <span style={{ color: "var(--ink)", fontWeight: 600 }}>
                      {DASHBOARD.itsmTicket.change}
                    </span>
                    <button
                      onClick={approve}
                      className="btn btn-primary"
                      style={{
                        fontSize: 11,
                        padding: "6px 12px",
                        height: 28,
                      }}
                    >
                      Authorize CHG
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 11.5,
                    fontFamily: "var(--font-mono), monospace",
                    color: "var(--muted)",
                  }}
                >
                  {DASHBOARD.itsmCaption}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ─── COL C: AGENT MESH™ MEMORY PANEL (Min 340px, CSS Mask Fade) ─── */}
        <aside
          style={{
            background: "var(--surface)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            userSelect: "none",
          }}
          className="dash-memory-panel"
        >
          {/* Panel Header */}
          <div
            style={{
              padding: "10px 16px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                fontWeight: 700,
                color: "var(--ink)",
                letterSpacing: "0.06em",
              }}
            >
              {DASHBOARD.memory.title}
            </span>
            <span style={{ fontSize: 10.5, fontFamily: "var(--font-mono), monospace", color: "var(--muted)" }}>
              LIVE STORE
            </span>
          </div>

          <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
            {/* Two Stat Tiles */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {DASHBOARD.memory.tiles.map((tile) => (
                <div
                  key={tile.label}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 5,
                    padding: "8px 10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10.5,
                      color: "var(--muted)",
                      lineHeight: 1.25,
                      maxHeight: 28,
                      overflow: "hidden",
                    }}
                  >
                    {tile.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: 24,
                      lineHeight: 1,
                      marginTop: 4,
                      color: "var(--ink)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {tile.value}
                  </div>
                </div>
              ))}
            </div>

            {/* 8 Memory Items with CSS Mask Fade */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 7,
                overflowY: "hidden",
                flex: 1,
                maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
              }}
            >
              {DASHBOARD.memory.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                    fontSize: 12,
                    lineHeight: 1.35,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 10,
                      color: "var(--muted)",
                      flexShrink: 0,
                    }}
                  >
                    {item.id}
                  </span>
                  <span
                    style={{
                      color: "var(--ink)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.conclusion}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ─── 4. BOTTOM DUAL TICKER STRIPS ─── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        {/* Ticker 1: Audit */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "5px 0",
            borderBottom: "1px solid var(--border)",
            fontSize: 11,
            fontFamily: "var(--font-mono), monospace",
            color: "var(--muted)",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "0 12px",
              fontWeight: 700,
              color: "var(--ink)",
              borderRight: "1px solid var(--border)",
              flexShrink: 0,
              background: "var(--surface)",
              zIndex: 2,
            }}
          >
            AUDIT
          </div>
          <div className="ticker-track">
            {DASHBOARD.auditTicker.concat(DASHBOARD.auditTicker).map((item, i) => (
              <span key={i} style={{ margin: "0 16px", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--orange)" }} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Ticker 2: Integrations */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "5px 0",
            fontSize: 11,
            fontFamily: "var(--font-mono), monospace",
            color: "var(--muted)",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "0 12px",
              fontWeight: 700,
              color: "var(--ink)",
              borderRight: "1px solid var(--border)",
              flexShrink: 0,
              background: "var(--surface)",
              zIndex: 2,
            }}
          >
            INTEGRATIONS
          </div>
          <div className="ticker-track" style={{ animationDirection: "reverse", animationDuration: "50s" }}>
            {DASHBOARD.integrationsTicker.concat(DASHBOARD.integrationsTicker).map((item, i) => (
              <span key={i} style={{ margin: "0 18px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {item} ·
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .dash-body-grid {
            grid-template-columns: 180px 1fr !important;
          }
          .dash-memory-panel {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .dash-body-grid {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
