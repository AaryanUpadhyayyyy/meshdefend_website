"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BackupVendor = "commvault" | "veeam";
type ModelVendor = "azure" | "llama";
type StorageVendor = "netapp" | "pure";

export function HotSwapMatrixFold() {
  const [backupVendor, setBackupVendor] = useState<BackupVendor>("commvault");
  const [modelVendor, setModelVendor] = useState<ModelVendor>("azure");
  const [storageVendor, setStorageVendor] = useState<StorageVendor>("netapp");

  return (
    <section
      id="hot-swap-matrix"
      aria-label="Prove Flexibility Isn't Lock-In"
      style={{
        padding: "120px 0 130px",
        backgroundColor: "#221f22",
        color: "#fefdfd",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Eyebrow & Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 28,
            borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
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
            [ PROVE FLEXIBILITY ISN'T LOCK-IN ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "rgba(255, 255, 255, 0.4)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 3 — THE HOT-SWAPPABLE ARCHITECTURE MATRIX
          </span>
        </div>

        {/* Display H2 (White, Instrument Serif) */}
        <div style={{ maxWidth: 940, marginBottom: 54 }}>
          <h2
            style={{
              fontFamily:
                'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(38px, 4.4vw, 58px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#fefdfd",
              fontWeight: 400,
              marginBottom: 18,
            }}
          >
            Your technology choices stay yours.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 17.5,
              lineHeight: 1.55,
              color: "rgba(255, 255, 255, 0.72)",
              margin: 0,
              maxWidth: 780,
            }}
          >
            Flexibility becomes credible when you can see that technology choices remain yours after adoption.
            Choose, change, or replace underlying components independently&mdash;models, backup platforms, or storage&mdash;while MeshDefend&rsquo;s operational experience remains completely consistent.
          </p>
        </div>

        {/* The Hot-Swap Architecture Board */}
        <div
          style={{
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backgroundColor: "#181618",
          }}
        >
          {/* TOP LAYER: MESHDEFEND RESOC OPERATIONAL FABRIC (100% CONSTANT) */}
          <div
            style={{
              padding: "24px 28px",
              backgroundColor: "#1f1d1f",
              borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    backgroundColor: "#10b981",
                    borderRadius: "50%",
                  }}
                />
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fefdfd",
                    letterSpacing: "0.05em",
                  }}
                >
                  LAYER 01 // MESHDEFEND RESOC OPERATIONAL FABRIC [ CONSTANT ]
                </span>
              </div>
              <span
                style={{
                  fontFamily:
                    'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  color: "var(--orange, #f45532)",
                  fontWeight: 600,
                }}
              >
                100% VENDOR-AGNOSTIC ABSTRACTION
              </span>
            </div>

            {/* Fabric Capabilities (Always Stable) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 12,
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "12px 16px",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                  RESILIENCE GRAPH
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#fefdfd" }}>
                  MVC Dependency Map Active
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "12px 16px",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                  RTO / RPO POSTURE
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#fefdfd" }}>
                  Continuous Drift Audit Locked
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "12px 16px",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                  GOVERNANCE GATE
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#fefdfd" }}>
                  Ed25519 Cryptographic HITL
                </div>
              </div>
            </div>
          </div>

          {/* INTERCONNECT CONDUIT LINES */}
          <div style={{ height: 32, position: "relative", overflow: "visible" }}>
            <svg width="100%" height="32" style={{ position: "absolute", top: 0, left: 0 }}>
              <line x1="16.6%" y1="0" x2="16.6%" y2="32" stroke="var(--orange, #f45532)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="50%" y1="0" x2="50%" y2="32" stroke="var(--orange, #f45532)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="83.3%" y1="0" x2="83.3%" y2="32" stroke="var(--orange, #f45532)" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* BOTTOM LAYER: 3 HOT-SWAPPABLE COLUMNS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              gap: 1,
            }}
            className="hidden md:grid"
          >
            {/* COLUMN 1: BACKUP ENGINE (Commvault vs Veeam) */}
            <div style={{ padding: "32px 28px", backgroundColor: "#181618" }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  color: "rgba(255, 255, 255, 0.45)",
                  letterSpacing: "0.06em",
                  marginBottom: 14,
                }}
              >
                SWAPPABLE SLOT // 01 · BACKUP
              </div>

              {/* Toggles */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  backgroundColor: "#201e20",
                  padding: 4,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  marginBottom: 20,
                }}
              >
                <button
                  onClick={() => setBackupVendor("commvault")}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    background: backupVendor === "commvault" ? "var(--orange, #f45532)" : "transparent",
                    color: backupVendor === "commvault" ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                    border: "none",
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  Commvault
                </button>
                <button
                  onClick={() => setBackupVendor("veeam")}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    background: backupVendor === "veeam" ? "var(--orange, #f45532)" : "transparent",
                    color: backupVendor === "veeam" ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                    border: "none",
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  Veeam
                </button>
              </div>

              {/* Active Hot-Swap Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={backupVendor}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    padding: "20px 18px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--orange, #f45532)",
                      marginBottom: 6,
                    }}
                  >
                    STATUS: HOT-SWAPPED
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#fefdfd",
                      marginBottom: 8,
                    }}
                  >
                    {backupVendor === "commvault" ? "Commvault Command Center" : "Veeam Backup & Replication"}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 13,
                      lineHeight: 1.45,
                      color: "rgba(255, 255, 255, 0.65)",
                      margin: 0,
                    }}
                  >
                    {backupVendor === "commvault"
                      ? "Direct MediaAgent telemetry parsing, deduplication catalog audit, and live synthetic full job tracking."
                      : "SOBR repository monitoring, instant VM restore verification, and VBR Enterprise API synchronization."}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* COLUMN 2: AI MODEL (Azure AI vs Local Llama 3) */}
            <div style={{ padding: "32px 28px", backgroundColor: "#181618" }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  color: "rgba(255, 255, 255, 0.45)",
                  letterSpacing: "0.06em",
                  marginBottom: 14,
                }}
              >
                SWAPPABLE SLOT // 02 · REASONING
              </div>

              {/* Toggles */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  backgroundColor: "#201e20",
                  padding: 4,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  marginBottom: 20,
                }}
              >
                <button
                  onClick={() => setModelVendor("azure")}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    background: modelVendor === "azure" ? "var(--orange, #f45532)" : "transparent",
                    color: modelVendor === "azure" ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                    border: "none",
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  Azure AI
                </button>
                <button
                  onClick={() => setModelVendor("llama")}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    background: modelVendor === "llama" ? "var(--orange, #f45532)" : "transparent",
                    color: modelVendor === "llama" ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                    border: "none",
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  Local Llama 3
                </button>
              </div>

              {/* Active Hot-Swap Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={modelVendor}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    padding: "20px 18px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--orange, #f45532)",
                      marginBottom: 6,
                    }}
                  >
                    STATUS: HOT-SWAPPED
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#fefdfd",
                      marginBottom: 8,
                    }}
                  >
                    {modelVendor === "azure" ? "Azure AI Foundry (GPT-4o)" : "Self-Hosted Local Llama 3"}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 13,
                      lineHeight: 1.45,
                      color: "rgba(255, 255, 255, 0.65)",
                      margin: 0,
                    }}
                  >
                    {modelVendor === "azure"
                      ? "Dedicated confidential compute enclave, zero data retention agreement, and SOC 2 Type II attestation."
                      : "100% on-premises vLLM inference over private GPU nodes; zero outbound internet packets during reasoning."}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* COLUMN 3: STORAGE (NetApp vs Pure Storage) */}
            <div style={{ padding: "32px 28px", backgroundColor: "#181618" }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  color: "rgba(255, 255, 255, 0.45)",
                  letterSpacing: "0.06em",
                  marginBottom: 14,
                }}
              >
                SWAPPABLE SLOT // 03 · STORAGE
              </div>

              {/* Toggles */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  backgroundColor: "#201e20",
                  padding: 4,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  marginBottom: 20,
                }}
              >
                <button
                  onClick={() => setStorageVendor("netapp")}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    background: storageVendor === "netapp" ? "var(--orange, #f45532)" : "transparent",
                    color: storageVendor === "netapp" ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                    border: "none",
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  NetApp
                </button>
                <button
                  onClick={() => setStorageVendor("pure")}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    background: storageVendor === "pure" ? "var(--orange, #f45532)" : "transparent",
                    color: storageVendor === "pure" ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                    border: "none",
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  Pure Storage
                </button>
              </div>

              {/* Active Hot-Swap Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={storageVendor}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    padding: "20px 18px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--orange, #f45532)",
                      marginBottom: 6,
                    }}
                  >
                    STATUS: HOT-SWAPPED
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#fefdfd",
                      marginBottom: 8,
                    }}
                  >
                    {storageVendor === "netapp" ? "NetApp ONTAP & SnapLock" : "Pure Storage FlashArray SafeMode"}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 13,
                      lineHeight: 1.45,
                      color: "rgba(255, 255, 255, 0.65)",
                      margin: 0,
                    }}
                  >
                    {storageVendor === "netapp"
                      ? "SnapLock compliance mode validation, MetroCluster cross-site replication posture, and volume snapshot audits."
                      : "SafeMode snapshot immutability verification, rapid flash recovery indexing, and volumetric deduplication tracking."}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Proof Summary Bottom Bar */}
          <div
            style={{
              padding: "18px 28px",
              backgroundColor: "#1c1a1c",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "#fefdfd",
              }}
            >
              Current Active Matrix: <span style={{ color: "var(--orange, #f45532)" }}>{backupVendor.toUpperCase()}</span> +{" "}
              <span style={{ color: "var(--orange, #f45532)" }}>{modelVendor.toUpperCase()}</span> +{" "}
              <span style={{ color: "var(--orange, #f45532)" }}>{storageVendor.toUpperCase()}</span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 10.5,
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              RESOC FABRIC RECONFIGURATION DOWNTIME: 0 SECONDS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
