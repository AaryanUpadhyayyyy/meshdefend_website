"use client";

import { useState } from "react";

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
    x: 100,
    y: 80,
  },
  {
    id: "vault-secrets",
    name: "Vault Secrets",
    category: "Security & Keys",
    status: "Verified",
    role: "Database encryption keys and master secrets engine.",
    annotation: "Cryptographic KMS envelope staged in secondary region.",
    x: 100,
    y: 280,
  },
  {
    id: "primary-sql-db",
    name: "Primary SQL DB",
    category: "Core Persistence",
    status: "Protected",
    role: "Main transactional database hosting core customer balances.",
    annotation: "Storage snapshot snap-09fa40 intact on immutable tier.",
    x: 420,
    y: 80,
  },
  {
    id: "redis-cache",
    name: "Redis Cache",
    category: "Session & Locks",
    status: "Unprotected Dependency",
    role: "Active distributed transaction locks and session hydration.",
    annotation: "Recovering the database without the cache breaks the application.",
    x: 420,
    y: 280,
    isRisk: true,
  },
  {
    id: "core-banking-app",
    name: "Core Banking App",
    category: "Hero Application",
    status: "Protected",
    role: "Tier-0 business core providing account settlement and payment processing.",
    annotation: "Target service dependent on all 4 underlying components.",
    x: 740,
    y: 180,
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
              fontFamily: "var(--font-mono), monospace",
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
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 2 — MINIMUM VIABLE COMPANY (MVC) DEPENDENCIES
          </span>
        </div>

        {/* Display H2 & Narrative */}
        <div style={{ maxWidth: 960, marginBottom: 52 }}>
          <h2
            style={{
              fontFamily: "var(--font-serif), serif",
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
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 19,
              lineHeight: 1.55,
              color: "var(--ink)",
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            MeshDefend maps the application and its dependent assets/services before recovery, establishing exactly what needs to come back together.
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
            Traditional disaster recovery treats an application as an isolated database or virtual machine. But modern enterprise architectures are distributed webs. If you restore the primary database while authentication remains locked or the cache state fails to hydrate, the application crashes immediately upon spin-up.
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
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  color: "var(--ink)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                TOPOLOGICAL DAG: Core Banking App (Minimum Viable Company)
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                (click any node to inspect dependency relationships)
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, backgroundColor: "var(--ink)", display: "inline-block" }} />
                <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)" }}>
                  Verified Asset
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, backgroundColor: "var(--orange, #f45532)", display: "inline-block" }} />
                <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--orange, #f45532)", fontWeight: 600 }}>
                  Unprotected Dependency
                </span>
              </div>
            </div>
          </div>

          {/* Interactive DAG SVG Stage */}
          <div
            style={{
              padding: "36px 24px",
              position: "relative",
              overflowX: "auto",
              minHeight: 420,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox="0 0 940 380"
              style={{
                width: "100%",
                maxWidth: 940,
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
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--muted)" opacity="0.6" />
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
              </defs>

              {/* Connecting DAG 1px Lines */}
              {/* IAM Service -> Primary SQL DB */}
              <line
                x1={230}
                y1={115}
                x2={380}
                y2={115}
                stroke="var(--border)"
                strokeWidth="1.5"
                markerEnd="url(#dag-arrow)"
              />
              {/* Vault Secrets -> Redis Cache */}
              <line
                x1={230}
                y1={315}
                x2={380}
                y2={315}
                stroke="var(--border)"
                strokeWidth="1.5"
                markerEnd="url(#dag-arrow)"
              />
              {/* Primary SQL DB -> Core Banking App */}
              <path
                d="M 580 115 L 670 115 L 700 205"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.5"
                markerEnd="url(#dag-arrow)"
              />
              {/* Redis Cache -> Core Banking App (Risk Link) */}
              <path
                d="M 580 315 L 670 315 L 700 215"
                fill="none"
                stroke="#f45532"
                strokeWidth="2"
                strokeDasharray="4 4"
                markerEnd="url(#dag-arrow-orange)"
              />

              {/* SVG Nodes */}
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
                      fill={isSelected ? (isOrange ? "rgba(244,85,50,0.06)" : "var(--surface-raised, #f7f6f5)") : "var(--bg)"}
                      stroke={isOrange ? "#f45532" : isSelected ? "var(--ink)" : "var(--border)"}
                      strokeWidth={isOrange || isSelected ? 1.5 : 1}
                    />

                    {/* Category Tag */}
                    <text
                      x={node.x + 12}
                      y={node.y + 20}
                      fontFamily="var(--font-mono), monospace"
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
                      fontFamily="var(--font-body), sans-serif"
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
                      fontFamily="var(--font-mono), monospace"
                      fontSize="9.5"
                      fill={isOrange ? "#f45532" : "var(--muted)"}
                    >
                      [{node.status.toUpperCase()}]
                    </text>

                    {/* Glow effect on Redis Cache */}
                    {isOrange && (
                      <circle
                        cx={node.x + 158}
                        cy={node.y + 14}
                        r="4.5"
                        fill="#f45532"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Node Inspector Panel */}
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
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    color: selectedNode.isRisk ? "#f45532" : "var(--muted)",
                    fontWeight: 600,
                  }}
                >
                  {selectedNode.category}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 10,
                    padding: "2px 6px",
                    border: selectedNode.isRisk ? "1px solid #f45532" : "1px solid var(--border)",
                    color: selectedNode.isRisk ? "#f45532" : "var(--ink)",
                    backgroundColor: "var(--bg)",
                  }}
                >
                  {selectedNode.status}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: 22,
                  color: "var(--ink)",
                  lineHeight: 1.2,
                }}
              >
                {selectedNode.name}
              </div>
            </div>

            <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: 24 }}>
              <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 14, color: "var(--ink)", marginBottom: 8 }}>
                <strong>Role:</strong> {selectedNode.role}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 12,
                  lineHeight: 1.55,
                  color: selectedNode.isRisk ? "var(--ink)" : "var(--muted)",
                  backgroundColor: selectedNode.isRisk ? "rgba(244,85,50,0.06)" : "transparent",
                  padding: selectedNode.isRisk ? "10px 14px" : "0",
                  border: selectedNode.isRisk ? "1px solid rgba(244,85,50,0.2)" : "none",
                }}
              >
                {selectedNode.isRisk && (
                  <strong style={{ color: "#f45532", display: "block", marginBottom: 4 }}>
                    RECOVERY RISK ANNOTATION:
                  </strong>
                )}
                {selectedNode.annotation}
              </div>
            </div>
          </div>

          {/* Bottom Highlight Annotation Banner */}
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid var(--border)",
              backgroundColor: "var(--bg)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--orange, #f45532)", fontWeight: 600 }}>
                CRITICAL DEPENDENCY INSIGHT:
              </span>
              <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: "var(--ink)" }}>
                Recovering the database without the cache breaks the application.
              </span>
            </div>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--muted)" }}>
              MeshDefend Minimum Viable Company (MVC) Resolution
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
