"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TopologyModel = "on-premises" | "hybrid" | "multi-cloud" | "air-gapped";

interface TopologyDetails {
  id: TopologyModel;
  label: string;
  badge: string;
  summary: string;
  customerBoundary: string;
  controlPlane: string;
  dataFlow: string;
  ports: string;
}

const TOPOLOGIES: TopologyDetails[] = [
  {
    id: "on-premises",
    label: "On-Premises",
    badge: "HYBRID BROKER // ON-PREM EDGE",
    summary:
      "A lightweight read-only broker deploys on VMware vSphere or bare metal inside your private datacenter. Only telemetry metadata egresses to the MeshDefend control plane over port 443 mTLS.",
    customerBoundary: "Customer Private Datacenter (VMware / Nutanix / NetApp / Commvault)",
    controlPlane: "MeshDefend Dedicated VPC or SaaS Control Plane",
    dataFlow: "Read-only job logs & catalog metadata (mTLS 1.3). Zero payload egress.",
    ports: "Outbound TCP 443 to pinned tenant endpoint. Zero inbound open ports.",
  },
  {
    id: "hybrid",
    label: "Hybrid Cloud",
    badge: "DISTRIBUTED BROKERS // CO-LOCATED",
    summary:
      "Dual brokers operate simultaneously in your on-premises SAN/NAS fabric and your AWS/Azure VPCs. Telemetry is consolidated into a single unified resilience topology with strict tenancy separation.",
    customerBoundary: "Enterprise On-Prem SAN + AWS VPC / Azure VNet",
    controlPlane: "Customer Transit Gateway or MeshDefend Regional Node",
    dataFlow: "Encrypted metadata sync across regions. No cross-boundary payload movement.",
    ports: "Outbound 443 via customer NAT Gateway or private AWS DirectConnect / ExpressRoute.",
  },
  {
    id: "multi-cloud",
    label: "Multi-Cloud",
    badge: "CROSS-CLOUD RESILIENCE FABRIC",
    summary:
      "Cloud-native brokers deploy across AWS, Azure, and GCP workloads. Cross-cloud dependencies, S3/Blob immutability locks, and KMS vault keys are correlated in real time.",
    customerBoundary: "AWS (EKS/RDS) + Azure (VMs/Blob) + Google Cloud (GKE/GCS)",
    controlPlane: "Distributed multi-region active-active control cluster",
    dataFlow: "Metadata-only cross-cloud inventory and snapshot consensus stream.",
    ports: "Internal cloud provider endpoints; AWS PrivateLink / Azure Private Link supported.",
  },
  {
    id: "air-gapped",
    label: "Air-Gapped",
    badge: "100% ISOLATED // ZERO EGRESS",
    summary:
      "Fully self-contained on-premises appliance with embedded local LLM inference models, local vector stores, and local WORM audit ledgers. Operates in zero-trust classified or offline environments.",
    customerBoundary: "Physically Isolated Network Perimeter (SCIF / Classified / Industrial)",
    controlPlane: "Local Self-Contained MeshDefend Hardware/VM Appliance",
    dataFlow: "100% Internal. Absolute zero internet egress (0 bps outbound).",
    ports: "All external WAN ports physically severed or firewall blocked.",
  },
];

export function DeploymentTopologyFold() {
  const [activeTab, setActiveTab] = useState<TopologyModel>("on-premises");
  const activeDetails = TOPOLOGIES.find((t) => t.id === activeTab)!;

  return (
    <section
      id="deployment-topology"
      aria-label="Deploy Where Your Environment Requires"
      style={{
        padding: "160px 0 96px",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle 1px Blueprint Grid Pattern */}
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
            id="deploy-blueprint-grid"
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
        <rect width="100%" height="100%" fill="url(#deploy-blueprint-grid)" />
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
              color: "var(--orange, #f45532)",
              letterSpacing: "0.06em",
            }}
          >
            [ PLATFORM CAPABILITIES · DEPLOYMENT ARCHITECTURE ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 1 — TOPOLOGY MATRIX & ISOLATION BOUNDARIES
          </span>
        </div>

        {/* Display H1 */}
        <div style={{ maxWidth: 1040, marginBottom: 48 }}>
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
            Your deployment model shouldn’t decide whether you can use MeshDefend.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--muted)",
              margin: 0,
              maxWidth: 780,
            }}
          >
            Modern enterprise resilience cannot assume a homogeneous cloud-native infrastructure.
            MeshDefend adapts to your existing security boundaries, air-gaps, and network topologies
            rather than demanding you rebuild them.
          </p>
        </div>

        {/* 4-Tab Interactive Switcher with Framer Motion layoutId */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            border: "1px solid var(--border)",
            backgroundColor: "var(--surface-raised, #f7f6f5)",
            marginBottom: 24,
          }}
        >
          {TOPOLOGIES.map((topo) => {
            const isActive = activeTab === topo.id;
            return (
              <button
                key={topo.id}
                onClick={() => setActiveTab(topo.id)}
                style={{
                  position: "relative",
                  padding: "18px 24px",
                  background: isActive ? "var(--bg, #fefdfd)" : "transparent",
                  border: "none",
                  borderRight: "1px solid var(--border)",
                  color: isActive ? "var(--ink)" : "var(--muted)",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 12.5,
                  fontWeight: isActive ? 600 : 500,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "color 0.2s ease, background-color 0.2s ease",
                }}
              >
                {/* Active Tab Indicator with layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="activeDeploymentTab"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      backgroundColor: "var(--orange, #f45532)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: isActive
                        ? "var(--orange, #f45532)"
                        : "transparent",
                      border: isActive
                        ? "none"
                        : "1px solid var(--muted)",
                    }}
                  />
                  <span>[ {topo.label} ]</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Architectural Topology Blueprint Board (Exposed 1px Hairline Grid) */}
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
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--orange, #f45532)",
                  letterSpacing: "0.04em",
                }}
              >
                TOPOLOGY BLUEPRINT // {activeDetails.badge}
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              PHYSICAL BOUNDARY SPECIFICATION
            </span>
          </div>

          {/* Dynamic 1px SVG Architectural Network Diagram */}
          <div
            style={{
              padding: "36px 32px 24px",
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--bg)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                style={{ minHeight: 280 }}
              >
                {/* SVG Visual Canvas */}
                <svg
                  width="100%"
                  height="260"
                  viewBox="0 0 960 260"
                  fill="none"
                  style={{ overflow: "visible" }}
                >
                  {/* Left Box: Customer Boundary */}
                  <rect
                    x="20"
                    y="20"
                    width="440"
                    height="220"
                    stroke="var(--border)"
                    strokeWidth="1.5"
                    strokeDasharray={activeTab === "air-gapped" ? "none" : "4 4"}
                    fill="var(--surface-raised, #fbfaf9)"
                  />
                  <text
                    x="36"
                    y="46"
                    fill="var(--ink)"
                    fontFamily="var(--font-mono), monospace"
                    fontSize="11"
                    fontWeight="600"
                    letterSpacing="0.04em"
                  >
                    CUSTOMER PERIMETER: {activeTab.toUpperCase()}
                  </text>

                  {/* Customer Assets inside Left Box */}
                  <g transform="translate(40, 70)">
                    {/* Node 1: Backup / Storage */}
                    <rect x="0" y="0" width="170" height="42" stroke="var(--border)" fill="var(--bg)" />
                    <text x="12" y="25" fill="var(--ink)" fontFamily="var(--font-body), sans-serif" fontSize="11.5" fontWeight="600">
                      Primary Data / Storage
                    </text>
                    <text x="12" y="37" fill="var(--muted)" fontFamily="var(--font-mono), monospace" fontSize="8.5">
                      NetApp / Pure / VMware
                    </text>

                    {/* Node 2: Backup Catalog */}
                    <rect x="0" y="58" width="170" height="42" stroke="var(--border)" fill="var(--bg)" />
                    <text x="12" y="83" fill="var(--ink)" fontFamily="var(--font-body), sans-serif" fontSize="11.5" fontWeight="600">
                      Backup Media Engines
                    </text>
                    <text x="12" y="95" fill="var(--muted)" fontFamily="var(--font-mono), monospace" fontSize="8.5">
                      Commvault / Veeam / Dell
                    </text>

                    {/* Node 3: Local Broker */}
                    <rect
                      x="210"
                      y="14"
                      width="190"
                      height="70"
                      stroke={activeTab === "air-gapped" ? "var(--ink)" : "var(--orange, #f45532)"}
                      strokeWidth="1.5"
                      fill="var(--bg)"
                    />
                    <text x="224" y="38" fill="var(--orange, #f45532)" fontFamily="var(--font-mono), monospace" fontSize="10" fontWeight="600">
                      MESHDEFEND LAYER
                    </text>
                    <text x="224" y="56" fill="var(--ink)" fontFamily="var(--font-body), sans-serif" fontSize="12" fontWeight="600">
                      {activeTab === "air-gapped" ? "Full Standalone Appliance" : "Read-Only Local Broker"}
                    </text>
                    <text x="224" y="72" fill="var(--muted)" fontFamily="var(--font-mono), monospace" fontSize="9">
                      {activeTab === "air-gapped" ? "Embedded LLM + Vector + WORM" : "Catalog Parsing · Zero Payload"}
                    </text>

                    {/* Internal Bus Lines */}
                    <line x1="170" y1="21" x2="210" y2="40" stroke="var(--border)" strokeWidth="1.5" />
                    <line x1="170" y1="79" x2="210" y2="60" stroke="var(--border)" strokeWidth="1.5" />
                  </g>

                  {/* Middle Conduit / Boundary Zone */}
                  {activeTab !== "air-gapped" ? (
                    <g transform="translate(460, 110)">
                      {/* Connecting Line */}
                      <motion.line
                        x1="0"
                        y1="20"
                        x2="100"
                        y2="20"
                        stroke="var(--orange, #f45532)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        initial={{ strokeDashoffset: 16 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                      />
                      <rect x="18" y="4" width="64" height="32" fill="var(--bg)" stroke="var(--border)" />
                      <text x="25" y="24" fill="var(--orange, #f45532)" fontFamily="var(--font-mono), monospace" fontSize="9" fontWeight="600">
                        mTLS 443
                      </text>
                    </g>
                  ) : (
                    /* Air-Gapped Severed Physical Conduit */
                    <g transform="translate(460, 95)">
                      <line x1="10" y1="35" x2="90" y2="35" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="35" y1="15" x2="65" y2="55" stroke="var(--orange, #f45532)" strokeWidth="2.5" />
                      <line x1="65" y1="15" x2="35" y2="55" stroke="var(--orange, #f45532)" strokeWidth="2.5" />
                      <text x="8" y="75" fill="var(--orange, #f45532)" fontFamily="var(--font-mono), monospace" fontSize="9" fontWeight="600">
                        WAN SEVERED (0 BPS)
                      </text>
                    </g>
                  )}

                  {/* Right Box: Control Plane / WAN Zone */}
                  <rect
                    x="560"
                    y="20"
                    width="380"
                    height="220"
                    stroke={activeTab === "air-gapped" ? "var(--border)" : "var(--ink)"}
                    strokeWidth="1.5"
                    fill={activeTab === "air-gapped" ? "rgba(34,31,34,0.02)" : "var(--surface-raised, #fbfaf9)"}
                  />
                  <text
                    x="576"
                    y="46"
                    fill={activeTab === "air-gapped" ? "var(--muted)" : "var(--ink)"}
                    fontFamily="var(--font-mono), monospace"
                    fontSize="11"
                    fontWeight="600"
                    letterSpacing="0.04em"
                  >
                    {activeTab === "air-gapped"
                      ? "EXTERNAL INTERNET (DISCONNECTED)"
                      : "MESHDEFEND SECURE CONTROL PLANE"}
                  </text>

                  {/* Right Box Content */}
                  <g transform="translate(580, 70)">
                    {activeTab === "air-gapped" ? (
                      <g>
                        <rect x="0" y="20" width="340" height="80" stroke="var(--border)" fill="var(--bg)" strokeDasharray="4 4" />
                        <text x="24" y="55" fill="var(--muted)" fontFamily="var(--font-mono), monospace" fontSize="12" fontWeight="500">
                          [ NO CLOUD DEPENDENCY REQUIRED ]
                        </text>
                        <text x="24" y="75" fill="var(--muted)" fontFamily="var(--font-body), sans-serif" fontSize="11">
                          Appliance runs offline reasoning & consensus within SCIF / on-prem perimeter.
                        </text>
                      </g>
                    ) : (
                      <g>
                        <rect x="0" y="0" width="340" height="42" stroke="var(--border)" fill="var(--bg)" />
                        <text x="14" y="24" fill="var(--ink)" fontFamily="var(--font-body), sans-serif" fontSize="11.5" fontWeight="600">
                          Resilience Graph & Consensus Engine
                        </text>
                        <text x="14" y="37" fill="var(--muted)" fontFamily="var(--font-mono), monospace" fontSize="8.5">
                          Multi-Agent Telemetry Correlation
                        </text>

                        <rect x="0" y="56" width="340" height="42" stroke="var(--border)" fill="var(--bg)" />
                        <text x="14" y="80" fill="var(--ink)" fontFamily="var(--font-body), sans-serif" fontSize="11.5" fontWeight="600">
                          Cryptographic WORM Audit Store
                        </text>
                        <text x="14" y="93" fill="var(--muted)" fontFamily="var(--font-mono), monospace" fontSize="8.5">
                          SEC 17a-4 / DORA Immutable Log Chain
                        </text>
                      </g>
                    )}
                  </g>
                </svg>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Technical Blueprint Specifications Footer (4 Columns) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              backgroundColor: "var(--border)",
              gap: 1,
            }}
          >
            <div style={{ padding: "20px 24px", backgroundColor: "var(--bg)" }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "var(--muted)",
                  marginBottom: 6,
                  letterSpacing: "0.05em",
                }}
              >
                CUSTOMER BOUNDARY
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--ink)",
                  lineHeight: 1.4,
                }}
              >
                {activeDetails.customerBoundary}
              </div>
            </div>

            <div style={{ padding: "20px 24px", backgroundColor: "var(--bg)" }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "var(--muted)",
                  marginBottom: 6,
                  letterSpacing: "0.05em",
                }}
              >
                CONTROL PLANE PLACEMENT
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--ink)",
                  lineHeight: 1.4,
                }}
              >
                {activeDetails.controlPlane}
              </div>
            </div>

            <div style={{ padding: "20px 24px", backgroundColor: "var(--bg)" }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "var(--muted)",
                  marginBottom: 6,
                  letterSpacing: "0.05em",
                }}
              >
                PERMITTED DATA FLOW
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--ink)",
                  lineHeight: 1.4,
                }}
              >
                {activeDetails.dataFlow}
              </div>
            </div>

            <div style={{ padding: "20px 24px", backgroundColor: "var(--bg)" }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10,
                  color: "var(--muted)",
                  marginBottom: 6,
                  letterSpacing: "0.05em",
                }}
              >
                CONNECTIVITY & PORTS
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--ink)",
                  lineHeight: 1.4,
                }}
              >
                {activeDetails.ports}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
