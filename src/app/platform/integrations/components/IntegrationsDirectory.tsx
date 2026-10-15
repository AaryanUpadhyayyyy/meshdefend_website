"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CATEGORIES,
  INTEGRATIONS_LIST,
  IntegrationCategory,
} from "../data/integrationsData";

export function IntegrationsDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<IntegrationCategory>("All Integrations");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const directoryRef = useRef<HTMLDivElement>(null);

  const suggestedPills = ["Commvault", "ServiceNow", "Veeam", "AWS"];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "All Integrations": INTEGRATIONS_LIST.length,
    };
    CATEGORIES.forEach((cat) => {
      if (cat !== "All Integrations") {
        counts[cat] = INTEGRATIONS_LIST.filter(
          (item) => item.category === cat
        ).length;
      }
    });
    return counts;
  }, []);

  // Filtered integrations
  const filteredIntegrations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return INTEGRATIONS_LIST.filter((item) => {
      const matchesCategory =
        selectedCategory === "All Integrations" ||
        item.category === selectedCategory;

      const matchesSearch =
        query === "" ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.badge.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handlePillClick = (pill: string) => {
    setSearchQuery(pill);
    setSelectedCategory("All Integrations");
    directoryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleResetSearch = () => {
    setSearchQuery("");
    setSelectedCategory("All Integrations");
  };

  return (
    <>
      {/* ===================================================================
          FOLD 1: DIRECT ANSWER ENTRY (The Instant Search Surface)
      =================================================================== */}
      <section
        id="integrations-hero"
        aria-label="Direct Answer Entry"
        style={{
          padding: "160px 0 88px",
          backgroundColor: "var(--bg)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
        }}
      >
        <div
          className="container"
          style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
        >
          {/* Eyebrow & Figure Meta */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 32,
              borderBottom: "1px solid var(--border)",
              paddingBottom: 14,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                fontWeight: 600,
                color: "var(--muted)",
                letterSpacing: "0.06em",
              }}
            >
              [ PLATFORM · INTEGRATIONS ]
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
                letterSpacing: "0.05em",
              }}
            >
              FIG. 1 — DIRECT ANSWER SEARCH SURFACE
            </span>
          </div>

          {/* Display H1 */}
          <div style={{ maxWidth: 960, marginBottom: 44 }}>
            <h1
              style={{
                fontFamily:
                  'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(46px, 5.4vw, 82px)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                color: "var(--ink)",
                fontWeight: 400,
                marginBottom: 20,
              }}
            >
              Everything we support, in one place.
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body), Inter, sans-serif',
                fontSize: 18,
                lineHeight: 1.5,
                color: "var(--muted)",
                margin: 0,
                maxWidth: 720,
              }}
            >
              Confirm compatibility fast for your specific stack. Search directly across backup engines,
              storage arrays, hypervisors, cloud infrastructure, and ITSM.
            </p>
          </div>

          {/* Interactive Live Search Box with Subtle Border Sweep / Glow */}
          <div style={{ maxWidth: 840, position: "relative" }}>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                border: isSearchFocused
                  ? "1px solid var(--orange, #f45532)"
                  : "1px solid var(--border)",
                backgroundColor: "var(--bg)",
                boxShadow: isSearchFocused
                  ? "0 0 0 3px rgba(244, 85, 50, 0.08)"
                  : "none",
                transition: "all 0.2s ease",
              }}
            >
              {/* Search Icon */}
              <div
                style={{
                  padding: "0 18px",
                  color: isSearchFocused
                    ? "var(--orange, #f45532)"
                    : "var(--muted)",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.2s ease",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>

              {/* Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search for backup engines, storage arrays, or ITSM..."
                aria-label="Search integrations"
                style={{
                  width: "100%",
                  padding: "18px 0",
                  fontSize: 16,
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  color: "var(--ink)",
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                }}
              />

              {/* Clear button if has text */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    padding: "0 18px",
                    background: "none",
                    border: "none",
                    color: "var(--muted)",
                    cursor: "pointer",
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 12,
                  }}
                  title="Clear search"
                >
                  [ CLEAR ]
                </button>
              )}
            </div>

            {/* Suggested / Common Rapid-Click Pills */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 16,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                  marginRight: 4,
                }}
              >
                Common:
              </span>
              {suggestedPills.map((pill) => (
                <button
                  key={pill}
                  onClick={() => handlePillClick(pill)}
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    padding: "4px 10px",
                    backgroundColor:
                      searchQuery.toLowerCase() === pill.toLowerCase()
                        ? "var(--ink)"
                        : "var(--surface-raised, #f7f6f5)",
                    color:
                      searchQuery.toLowerCase() === pill.toLowerCase()
                        ? "#fefdfd"
                        : "var(--ink)",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  [ {pill} ]
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          FOLD 2 & 3: BROWSE WHAT’S SUPPORTED & NO-MATCH FALLBACK
      =================================================================== */}
      <section
        ref={directoryRef}
        id="integrations-directory"
        aria-label="Browse Supported Integrations"
        style={{
          padding: "96px 0 120px",
          backgroundColor: "var(--bg)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
        }}
      >
        <div
          className="container"
          style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
        >
          {/* Section Header with Verbatim H2 Hook */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 44,
              borderBottom: "1px solid var(--border)",
              paddingBottom: 16,
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--muted)",
                  letterSpacing: "0.04em",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                FIG. 2 — DIRECTORY MATRIX & VENDOR SUPPORT
              </span>
              <h2
                style={{
                  fontFamily:
                    'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: "clamp(34px, 3.8vw, 52px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "var(--ink)",
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                Find support the way you manage your stack.
              </h2>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              SHOWING {filteredIntegrations.length} OF {INTEGRATIONS_LIST.length} RECOGNIZED SYSTEMS
            </div>
          </div>

          {/* 12-Column Split Layout: 3-Col Sticky Sidebar & 9-Col Grid Matrix */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 32,
              alignItems: "start",
            }}
          >
            {/* -------------------------------------------------------------
                LEFT COLUMN (3 Cols) — Sticky Vertical Category Navigation
            ------------------------------------------------------------- */}
            <aside
              style={{
                gridColumn: "span 3",
                position: "sticky",
                top: 100,
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg)",
              }}
            >
              <div
                style={{
                  padding: "14px 18px",
                  borderBottom: "1px solid var(--border)",
                  backgroundColor: "var(--surface-raised, #f7f6f5)",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "0.05em",
                }}
              >
                CATEGORIES
              </div>

              <nav style={{ display: "flex", flexDirection: "column" }}>
                {CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  const count = categoryCounts[category] ?? 0;

                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                      }}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "14px 18px",
                        border: "none",
                        borderBottom: "1px solid var(--border)",
                        borderLeft: isActive
                          ? "2px solid var(--orange, #f45532)"
                          : "2px solid transparent",
                        backgroundColor: isActive
                          ? "var(--surface-raised, #faf9f8)"
                          : "transparent",
                        color: isActive ? "var(--ink)" : "var(--muted)",
                        fontWeight: isActive ? 600 : 400,
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 13.5,
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span
                        style={{
                          color: isActive
                            ? "var(--ink)"
                            : "var(--muted)",
                        }}
                      >
                        {category}
                      </span>
                      <span
                        style={{
                          fontFamily:
                            'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 11,
                          color: isActive
                            ? "var(--orange, #f45532)"
                            : "var(--muted)",
                        }}
                      >
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Active search filter reset option */}
              {searchQuery && (
                <div
                  style={{
                    padding: "14px 18px",
                    backgroundColor: "rgba(244, 85, 50, 0.04)",
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--muted)",
                      marginBottom: 6,
                    }}
                  >
                    Active Filter: &ldquo;{searchQuery}&rdquo;
                  </div>
                  <button
                    onClick={handleResetSearch}
                    style={{
                      border: "none",
                      background: "none",
                      padding: 0,
                      color: "var(--orange, #f45532)",
                      fontFamily:
                        'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Clear Filter ×
                  </button>
                </div>
              )}
            </aside>

            {/* -------------------------------------------------------------
                RIGHT COLUMN (9 Cols) — The Vendor Grid / No-Match Fallback
            ------------------------------------------------------------- */}
            <div style={{ gridColumn: "span 9" }}>
              <AnimatePresence mode="wait">
                {filteredIntegrations.length > 0 ? (
                  /* FOLD 2: THE VENDOR GRID (Exposed 1px Hairline Grid) */
                  <motion.div
                    key={`${selectedCategory}-${searchQuery}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(280px, 1fr))",
                      backgroundColor: "var(--border)",
                      gap: 1,
                      border: "1px solid var(--border)",
                    }}
                  >
                    {filteredIntegrations.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        style={{
                          backgroundColor: "var(--bg)",
                          padding: "26px 22px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: 190,
                          transition: "background-color 0.15s ease",
                        }}
                        whileHover={{
                          backgroundColor: "var(--surface-raised, #faf9f8)",
                        }}
                      >
                        <div>
                          {/* Top row: Icon + Category Tag */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              marginBottom: 16,
                            }}
                          >
                            <div
                              style={{
                                color: "var(--ink)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 36,
                                height: 36,
                                backgroundColor:
                                  "var(--surface-raised, #f7f6f5)",
                                border: "1px solid var(--border)",
                              }}
                            >
                              {item.renderIcon()}
                            </div>

                            <span
                              style={{
                                fontFamily:
                                  'var(--font-mono), "JetBrains Mono", monospace',
                                fontSize: 9.5,
                                color: "var(--muted)",
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                              }}
                            >
                              {item.category}
                            </span>
                          </div>

                          {/* Vendor Name in Inter Semibold */}
                          <div
                            style={{
                              fontFamily: 'var(--font-body), Inter, sans-serif',
                              fontSize: 16,
                              fontWeight: 600,
                              color: "var(--ink)",
                              marginBottom: 6,
                            }}
                          >
                            {item.name}
                          </div>

                          {/* Technical Badge */}
                          <div
                            style={{
                              fontFamily:
                                'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 10,
                              fontWeight: 600,
                              color: "var(--orange, #f45532)",
                              letterSpacing: "0.04em",
                              marginBottom: 12,
                            }}
                          >
                            [ {item.badge} ]
                          </div>

                          {/* Factual Description */}
                          <p
                            style={{
                              fontFamily: 'var(--font-body), Inter, sans-serif',
                              fontSize: 12.5,
                              lineHeight: 1.45,
                              color: "var(--muted)",
                              margin: 0,
                            }}
                          >
                            {item.description}
                          </p>
                        </div>

                        {/* Card bottom border subtle indicator */}
                        <div
                          style={{
                            marginTop: 18,
                            paddingTop: 10,
                            borderTop: "1px dashed var(--border)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontFamily:
                                'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 9.5,
                              color: "var(--muted)",
                            }}
                          >
                            STATUS: CERTIFIED
                          </span>
                          <span
                            style={{
                              fontFamily:
                                'var(--font-mono), "JetBrains Mono", monospace',
                              fontSize: 9.5,
                              color: "var(--ink)",
                              fontWeight: 600,
                            }}
                          >
                            ACTIVE API
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  /* ===============================================================
                      FOLD 3: NO-MATCH FALLBACK (Uncertainty Reduction)
                  =============================================================== */
                  <motion.div
                    key="no-match"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--bg)",
                      padding: "64px 36px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Monospace Fallback Tag */}
                    <div
                      style={{
                        fontFamily:
                          'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 11,
                        color: "var(--orange, #f45532)",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        marginBottom: 16,
                      }}
                    >
                      FIG. 3 — COMPATIBILITY CHECK & FALLBACK PATHWAY
                    </div>

                    {/* Verbatim Hook (H3) */}
                    <h3
                      style={{
                        fontFamily:
                          'var(--font-display), "Instrument Serif", Georgia, serif',
                        fontSize: "clamp(28px, 3.2vw, 42px)",
                        lineHeight: 1.15,
                        color: "var(--ink)",
                        fontWeight: 400,
                        marginBottom: 16,
                        maxWidth: 640,
                      }}
                    >
                      Can’t find it? That doesn’t always mean we don’t support it.
                    </h3>

                    {/* Descriptive Subtext */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body), Inter, sans-serif',
                        fontSize: 15.5,
                        lineHeight: 1.55,
                        color: "var(--muted)",
                        maxWidth: 580,
                        marginBottom: 32,
                      }}
                    >
                      MeshDefend connects via universal APIs and custom webhooks.
                      Request a specific compatibility check for your custom or legacy stack.
                    </p>

                    {/* Action Buttons */}
                    <div
                      style={{
                        display: "flex",
                        gap: 14,
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      <Link
                        href="/demo?intent=integration-check"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          backgroundColor: "var(--orange, #f45532)",
                          color: "#ffffff",
                          padding: "12px 24px",
                          fontFamily:
                            'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 12,
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          textDecoration: "none",
                          border: "1px solid var(--orange, #f45532)",
                        }}
                      >
                        <span>Request support check</span>
                        <span>→</span>
                      </Link>

                      <button
                        onClick={handleResetSearch}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          backgroundColor: "transparent",
                          color: "var(--ink)",
                          padding: "12px 24px",
                          fontFamily:
                            'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 12,
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          border: "1px solid var(--border)",
                          cursor: "pointer",
                        }}
                      >
                        Browse related technologies
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
