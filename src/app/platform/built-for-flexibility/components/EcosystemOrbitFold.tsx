"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type OrbitCategory = "models" | "backup" | "storage" | "itsm";

interface SatelliteNode {
  id: OrbitCategory;
  label: string;
  badge: string;
  technologies: string[];
  role: string;
  angle: number; // visual orientation in degrees
}

const ORBIT_NODES: SatelliteNode[] = [
  {
    id: "models",
    label: "AI Models",
    badge: "BRING YOUR OWN MODEL",
    technologies: ["Anthropic Claude", "OpenAI GPT-4o", "Azure AI Foundry", "Local Llama 3"],
    role: "Provides inference & root-cause reasoning over normalized telemetry.",
    angle: 315, // Top-Left
  },
  {
    id: "backup",
    label: "Backup Software",
    badge: "READ-ONLY INGESTION",
    technologies: ["Commvault", "Veeam", "Dell NetWorker", "Dell PPDM", "Rubrik", "Cohesity"],
    role: "Supplies backup job catalogs, media agent status, and backup stream health.",
    angle: 45, // Top-Right
  },
  {
    id: "storage",
    label: "Storage & Infra",
    badge: "SNAPSHOT & WORM TELEMETRY",
    technologies: ["NetApp ONTAP", "Pure Storage SafeMode", "Dell DataDomain", "VAST Data", "AWS S3 WORM"],
    role: "Feeds immutable storage lock state, snapshot trees, and deduplication checksums.",
    angle: 225, // Bottom-Left
  },
  {
    id: "itsm",
    label: "ITSM & Vendor Integrations",
    badge: "BI-DIRECTIONAL ACTION & INTEGRATIONS",
    technologies: ["ServiceNow CMDB", "Jira Service Desk", "PagerDuty", "Custom Webhooks"],
    role: "Synchronizes application asset tiers, automated change tickets, and multi-vendor webhook triggers.",
    angle: 135, // Bottom-Right
  },
];

export function EcosystemOrbitFold() {
  const [activeCategory, setActiveCategory] = useState<OrbitCategory>("models");
  const selectedNode = ORBIT_NODES.find((n) => n.id === activeCategory)!;

  return (
    <section
      id="ecosystem-orbit"
      aria-label="Confirm Technology Choice"
      style={{
        padding: "160px 0 100px",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle 1px Blueprint Canvas Background */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.35,
          zIndex: 0,
        }}
      >
        <defs>
          <pattern
            id="flex-grid-pattern"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#flex-grid-pattern)" />
      </svg>

      <div
        className="container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Eyebrow & Meta */}
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
              color: "var(--orange, #f45532)",
              letterSpacing: "0.06em",
            }}
          >
            [ PLATFORM CAPABILITIES · BUILT FOR FLEXIBILITY ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 1 — THE AGNOSTIC ECOSYSTEM HUB
          </span>
        </div>

        {/* Display H1 & Verbatim Hook */}
        <div style={{ maxWidth: 1040, marginBottom: 54 }}>
          <h1
            style={{
              fontFamily:
                'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(46px, 5.5vw, 82px)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 20,
            }}
          >
            Your stack shouldn’t have to change for MeshDefend.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: 820,
              margin: 0,
            }}
          >
            Bring your AI models, backup software, storage, vendor integrations, and ITSM platforms.
            MeshDefend sits at the center, providing a common operational layer across the stack you already own.
          </p>
        </div>

        {/* Interactive Ecosystem Orbit Stage */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: "14px 24px",
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--surface-raised, #f7f6f5)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 7,
                  backgroundColor: "var(--orange, #f45532)",
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "0.04em",
                }}
              >
                ECOSYSTEM ORBIT // MULTI-VENDOR ARCHITECTURE
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              CLICK A SATELLITE TO INSPECT DATA CONDUIT
            </span>
          </div>

          {/* Central Orbit Visual Canvas */}
          <div
            style={{
              padding: "48px 32px",
              backgroundColor: "var(--bg)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 840,
                minHeight: 380,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* SVG Conduit Lines & Orbit Rings */}
              <svg
                width="100%"
                height="380"
                viewBox="0 0 840 380"
                fill="none"
                style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
              >
                {/* Concentric Radar Rings */}
                <circle cx="420" cy="190" r="80" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="420" cy="190" r="160" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />

                {/* 4 Conduits from Center (420, 190) to 4 Satellites */}
                {/* 1. Top-Left: to (140, 75) */}
                <line
                  x1="420"
                  y1="190"
                  x2="160"
                  y2="85"
                  stroke={activeCategory === "models" ? "var(--orange, #f45532)" : "var(--border)"}
                  strokeWidth={activeCategory === "models" ? "2" : "1.2"}
                />
                {/* 2. Top-Right: to (680, 75) */}
                <line
                  x1="420"
                  y1="190"
                  x2="680"
                  y2="85"
                  stroke={activeCategory === "backup" ? "var(--orange, #f45532)" : "var(--border)"}
                  strokeWidth={activeCategory === "backup" ? "2" : "1.2"}
                />
                {/* 3. Bottom-Left: to (160, 295) */}
                <line
                  x1="420"
                  y1="190"
                  x2="160"
                  y2="295"
                  stroke={activeCategory === "storage" ? "var(--orange, #f45532)" : "var(--border)"}
                  strokeWidth={activeCategory === "storage" ? "2" : "1.2"}
                />
                {/* 4. Bottom-Right: to (680, 295) */}
                <line
                  x1="420"
                  y1="190"
                  x2="680"
                  y2="295"
                  stroke={activeCategory === "itsm" ? "var(--orange, #f45532)" : "var(--border)"}
                  strokeWidth={activeCategory === "itsm" ? "2" : "1.2"}
                />

                {/* Animated Traveling Pulses toward Center */}
                <motion.circle
                  cx="420"
                  cy="190"
                  r="3.5"
                  fill="var(--orange, #f45532)"
                  animate={{
                    cx: activeCategory === "models" ? [160, 420] : activeCategory === "backup" ? [680, 420] : activeCategory === "storage" ? [160, 420] : [680, 420],
                    cy: activeCategory === "models" ? [85, 190] : activeCategory === "backup" ? [85, 190] : activeCategory === "storage" ? [295, 190] : [295, 190],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                />
              </svg>

              {/* 1. Center Core Node: MeshDefend ResOC Engine */}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  width: 200,
                  padding: "20px 16px",
                  backgroundColor: "var(--bg)",
                  border: "2px solid var(--ink)",
                  boxShadow: "0 0 0 4px rgba(34,31,34,0.04)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: "var(--orange, #f45532)",
                    letterSpacing: "0.06em",
                    marginBottom: 4,
                  }}
                >
                  [ CORE OPERATIONAL LAYER ]
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 22,
                    color: "var(--ink)",
                    lineHeight: 1.15,
                    marginBottom: 4,
                  }}
                >
                  MeshDefend ResOC
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--muted)",
                  }}
                >
                  Universal Consensus Fabric
                </div>
              </div>

              {/* 2. Satellite Top-Left: AI Models */}
              <button
                onClick={() => setActiveCategory("models")}
                style={{
                  position: "absolute",
                  left: "4%",
                  top: "10%",
                  zIndex: 3,
                  width: 210,
                  padding: "16px 14px",
                  backgroundColor: activeCategory === "models" ? "var(--surface-raised, #faf9f8)" : "var(--bg)",
                  border: activeCategory === "models" ? "1px solid var(--orange, #f45532)" : "1px solid var(--border)",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--orange, #f45532)", fontWeight: 600, marginBottom: 4 }}>
                  [ AI MODELS ]
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>
                  Anthropic / OpenAI / BYOM
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--muted)" }}>
                  Pluggable Inference APIs
                </div>
              </button>

              {/* 3. Satellite Top-Right: Backup Software */}
              <button
                onClick={() => setActiveCategory("backup")}
                style={{
                  position: "absolute",
                  right: "4%",
                  top: "10%",
                  zIndex: 3,
                  width: 210,
                  padding: "16px 14px",
                  backgroundColor: activeCategory === "backup" ? "var(--surface-raised, #faf9f8)" : "var(--bg)",
                  border: activeCategory === "backup" ? "1px solid var(--orange, #f45532)" : "1px solid var(--border)",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--orange, #f45532)", fontWeight: 600, marginBottom: 4 }}>
                  [ BACKUP SOFTWARE ]
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>
                  Commvault / Veeam / Dell
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--muted)" }}>
                  Read-Only Catalog Sync
                </div>
              </button>

              {/* 4. Satellite Bottom-Left: Storage & Infra */}
              <button
                onClick={() => setActiveCategory("storage")}
                style={{
                  position: "absolute",
                  left: "4%",
                  bottom: "10%",
                  zIndex: 3,
                  width: 210,
                  padding: "16px 14px",
                  backgroundColor: activeCategory === "storage" ? "var(--surface-raised, #faf9f8)" : "var(--bg)",
                  border: activeCategory === "storage" ? "1px solid var(--orange, #f45532)" : "1px solid var(--border)",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--orange, #f45532)", fontWeight: 600, marginBottom: 4 }}>
                  [ STORAGE & INFRA ]
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>
                  NetApp / Pure / DataDomain
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--muted)" }}>
                  WORM Snapshot Posture
                </div>
              </button>

              {/* 5. Satellite Bottom-Right: ITSM Platforms */}
              <button
                onClick={() => setActiveCategory("itsm")}
                style={{
                  position: "absolute",
                  right: "4%",
                  bottom: "10%",
                  zIndex: 3,
                  width: 210,
                  padding: "16px 14px",
                  backgroundColor: activeCategory === "itsm" ? "var(--surface-raised, #faf9f8)" : "var(--bg)",
                  border: activeCategory === "itsm" ? "1px solid var(--orange, #f45532)" : "1px solid var(--border)",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--orange, #f45532)", fontWeight: 600, marginBottom: 4 }}>
                  [ ITSM & VENDOR INTEGRATIONS ]
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>
                  ServiceNow / Jira / Webhooks
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--muted)" }}>
                  Bi-Directional Action Sync
                </div>
              </button>
            </div>
          </div>

          {/* Active Conduit Deep Drilldown Footer Bar */}
          <div
            style={{
              padding: "24px 28px",
              backgroundColor: "var(--surface-raised, #f7f6f5)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "var(--orange, #f45532)",
                  fontWeight: 600,
                  marginBottom: 4,
                  letterSpacing: "0.05em",
                }}
              >
                ACTIVE CONDUIT // {selectedNode.badge}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 14,
                  color: "var(--ink)",
                  lineHeight: 1.45,
                }}
              >
                {selectedNode.role}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {selectedNode.technologies.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    padding: "4px 10px",
                    backgroundColor: "var(--bg)",
                    border: "1px solid var(--border)",
                    color: "var(--ink)",
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
