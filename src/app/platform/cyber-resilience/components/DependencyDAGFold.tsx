"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface DAGNode {
  id: string;
  name: string;
  category: string;
  status: "Protected" | "Unprotected Dependency" | "Verified";
  role: string;
  annotation?: string;
  x: number;
  y: number;
  isHero?: boolean;
  isRisk?: boolean;
}

const NODES: DAGNode[] = [
  {
    id: "iam-service",
    name: "IAM Service",
    category: "Identity & Access",
    status: "Verified",
    role: "Cross-account IAM authentication roles and identity tokens.",
    annotation: "Recovery VPC policy mapped and verified.",
    x: 90,
    y: 70,
  },
  {
    id: "vault-secrets",
    name: "Vault Secrets",
    category: "Security & Keys",
    status: "Verified",
    role: "Database encryption keys and master secrets engine.",
    annotation: "Cryptographic KMS envelope staged in secondary region.",
    x: 90,
    y: 250,
  },
  {
    id: "primary-sql-db",
    name: "Primary SQL DB",
    category: "Core Persistence",
    status: "Protected",
    role: "Main transactional database hosting core customer balances.",
    annotation: "Storage snapshot snap-09fa40 intact on immutable tier.",
    x: 410,
    y: 70,
  },
  {
    id: "redis-cache",
    name: "Redis Cache",
    category: "Session & Locks",
    status: "Unprotected Dependency",
    role: "Active distributed transaction locks and session hydration.",
    annotation: "Recovering the database without the cache breaks the application.",
    x: 410,
    y: 250,
    isRisk: true,
  },
  {
    id: "core-banking-app",
    name: "Core Banking App",
    category: "Hero Application",
    status: "Protected",
    role: "Tier-0 business core providing account settlement and payment processing.",
    annotation: "Target service dependent on all 4 underlying components.",
    x: 730,
    y: 160,
    isHero: true,
  },
];

export function DependencyDAGFold() {
  const [selectedNode, setSelectedNode] = useState<DAGNode>(
    NODES.find((n) => n.isRisk) || NODES[3]
  );

  return (
    <section
      id="mvc-dependencies"
      aria-label="Understand What Recovery Depends On"
      style={{
        padding: "120px 0",
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Eyebrow & Figure Meta */}
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
            Verification Over Assumption
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 2 — MINIMUM VIABLE COMPANY (MVC) DEPENDENCIES
          </span>
        </div>

        {/* Display H2 & Verbatim Narrative (NO FAKE PARAGRAPHS) */}
        <div style={{ maxWidth: 960, marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(36px, 4vw, 56px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 20,
            }}
          >
            Before you recover the application, know what has to recover with it.
          </h2>
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
            MeshDefend maps the application and its dependent assets/services before recovery,
            establishing exactly what needs to come back together.
          </p>
        </div>

        {/* Hero Interactive Dependency DAG Plexus Canvas */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
            position: "relative",
          }}
        >
          {/* Header of DAG Canvas */}
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
                MVC TOPOLOGY GRAPH // CORE BANKING STACK
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                (click any node to inspect dependency relationships)
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: "var(--ink)",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--muted)",
                  }}
                >
                  Verified Asset
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: "var(--orange, #f45532)",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--orange, #f45532)",
                    fontWeight: 600,
                  }}
                >
                  Unprotected Dependency
                </span>
              </div>
            </div>
          </div>

          {/* ─── Interactive DAG SVG Stage with Framer Motion Path Drawing ─── */}
          <div
            style={{
              padding: "40px 24px",
              position: "relative",
              overflowX: "auto",
              minHeight: 440,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox="0 0 960 400"
              style={{
                width: "100%",
                maxWidth: 960,
                height: "auto",
                display: "block",
              }}
              aria-label="Core Banking App Dependency Diagram"
            >
              <defs>
                <marker
                  id="dag-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--muted)" opacity="0.7" />
                </marker>
                <marker
                  id="dag-arrow-orange"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#f45532" />
                </marker>

                {/* Pulsing Orange Glow Filter for Redis Cache Node */}
                <filter id="redis-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="6"
                    floodColor="#f45532"
                    floodOpacity="0.55"
                  />
                </filter>
              </defs>

              {/* ─── Animated 1px SVG Lines (Drawing on view) ─── */}
              {/* Line 1: IAM Service -> Primary SQL DB */}
              <motion.line
                x1={260}
                y1={108}
                x2={410}
                y2={108}
                stroke="var(--border)"
                strokeWidth="1.5"
                markerEnd="url(#dag-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1, ease: "easeInOut" }}
              />

              {/* Line 2: Vault Secrets -> Redis Cache */}
              <motion.line
                x1={260}
                y1={288}
                x2={410}
                y2={288}
                stroke="var(--border)"
                strokeWidth="1.5"
                markerEnd="url(#dag-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.25, ease: "easeInOut" }}
              />

              {/* Line 3: Primary SQL DB -> Core Banking App */}
              <motion.path
                d="M 580 108 C 650 108, 660 190, 730 190"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.5"
                markerEnd="url(#dag-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.4, ease: "easeInOut" }}
              />

              {/* Line 4: Redis Cache -> Core Banking App (Risk Link, Pulsing #f45532) */}
              <motion.path
                d="M 580 288 C 650 288, 660 210, 730 210"
                fill="none"
                stroke="#f45532"
                strokeWidth="2"
                strokeDasharray="5 5"
                markerEnd="url(#dag-arrow-orange)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.55, ease: "easeInOut" }}
              />

              {/* Line 5: IAM Service -> Core Banking App (Direct Authentication Gateway) */}
              <motion.path
                d="M 260 88 C 450 40, 620 60, 730 175"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                markerEnd="url(#dag-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
              />

              {/* Line 6: Vault Secrets -> Core Banking App (Direct KMS Encryption Envelope) */}
              <motion.path
                d="M 260 308 C 450 350, 620 330, 730 220"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                markerEnd="url(#dag-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.35, ease: "easeInOut" }}
              />

              {/* ─── SVG Nodes ─── */}
              {NODES.map((node) => {
                const isSelected = selectedNode.id === node.id;
                const isOrange = node.isRisk;

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{ cursor: "pointer" }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedNode(node);
                      }
                    }}
                  >
                    {/* Node Container Box */}
                    <rect
                      x={node.x}
                      y={node.y}
                      width={170}
                      height={76}
                      fill={
                        isSelected
                          ? isOrange
                            ? "rgba(244, 85, 50, 0.08)"
                            : "var(--surface-raised, #f7f6f5)"
                          : "var(--bg)"
                      }
                      stroke={isOrange ? "#f45532" : isSelected ? "var(--ink)" : "var(--border)"}
                      strokeWidth={isOrange || isSelected ? 1.5 : 1}
                      filter={isOrange ? "url(#redis-glow)" : undefined}
                      className={isOrange ? "pulsing-redis-node" : undefined}
                    />

                    {/* Category Tag */}
                    <text
                      x={node.x + 12}
                      y={node.y + 20}
                      fontFamily='var(--font-mono), "JetBrains Mono", monospace'
                      fontSize="9"
                      letterSpacing="0.04em"
                      fill={isOrange ? "#f45532" : "var(--muted)"}
                    >
                      {node.category.toUpperCase()}
                    </text>

                    {/* Node Name */}
                    <text
                      x={node.x + 12}
                      y={node.y + 40}
                      fontFamily='var(--font-body), Inter, sans-serif'
                      fontSize="13"
                      fontWeight="600"
                      fill="var(--ink)"
                    >
                      {node.name}
                    </text>

                    {/* Node Status Badge */}
                    <text
                      x={node.x + 12}
                      y={node.y + 60}
                      fontFamily='var(--font-mono), "JetBrains Mono", monospace'
                      fontSize="9.5"
                      fontWeight={isOrange ? 700 : 500}
                      fill={isOrange ? "#f45532" : "var(--muted)"}
                    >
                      [{node.status.toUpperCase()}]
                    </text>

                    {/* Blinking Risk Indicator Dot on Redis Cache */}
                    {isOrange && (
                      <circle
                        cx={node.x + 158}
                        cy={node.y + 14}
                        r="4.5"
                        fill="#f45532"
                        className="blinking-dot"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ─── Sticky Redis Cache Risk Callout Annotation ─── */}
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid var(--border)",
              backgroundColor: "rgba(244, 85, 50, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "#f45532",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                CRITICAL DEPENDENCY RISK:
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "var(--ink)",
                }}
              >
                &ldquo;Recovering the database without the cache breaks the application.&rdquo;
              </span>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              Inspection: Redis Cache session state excluded from protection policy
            </span>
          </div>

          {/* Selected Node Drawer */}
          <div
            style={{
              padding: "24px 28px",
              borderTop: "1px solid var(--border)",
              backgroundColor: "var(--surface-raised, #f7f6f5)",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  letterSpacing: "0.05em",
                  color: "var(--muted)",
                  marginBottom: 6,
                }}
              >
                INSPECTED DEPENDENCY
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                  fontSize: 22,
                  color: "var(--ink)",
                }}
              >
                {selectedNode.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: selectedNode.isRisk ? "#f45532" : "var(--muted)",
                  marginTop: 4,
                  fontWeight: selectedNode.isRisk ? 700 : 500,
                }}
              >
                Status: {selectedNode.status}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 10.5,
                  letterSpacing: "0.05em",
                  color: "var(--muted)",
                  marginBottom: 6,
                }}
              >
                ARCHITECTURAL ROLE & RECOVERY REPERCUSSION
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body), Inter, sans-serif',
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "var(--ink)",
                  margin: "0 0 6px 0",
                }}
              >
                {selectedNode.role}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 12,
                  color: selectedNode.isRisk ? "#f45532" : "var(--muted)",
                  fontWeight: selectedNode.isRisk ? 600 : 400,
                  margin: 0,
                }}
              >
                Annotation: {selectedNode.annotation}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulseGlow {
          0% {
            filter: drop-shadow(0 0 4px rgba(244, 85, 50, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 14px rgba(244, 85, 50, 0.85));
          }
          100% {
            filter: drop-shadow(0 0 4px rgba(244, 85, 50, 0.4));
          }
        }
        :global(.pulsing-redis-node) {
          animation: pulseGlow 2.4s ease-in-out infinite;
        }
        @keyframes blinkDot {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        :global(.blinking-dot) {
          animation: blinkDot 1.4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
