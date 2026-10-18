"use client";

import { motion } from "framer-motion";

export function IntegrationMechanismsFold() {
  const mechanisms = [
    {
      num: "01",
      title: "Read-Only APIs & Catalog Connectors",
      tag: "CATALOG INGESTION",
      badge: "ZERO-AGENT ARCHITECTURE",
      lead: "Ingesting catalogs, deduplication tables, and job streams without invasive agent installs.",
      specs: [
        {
          label: "Credential Scope",
          detail: "Service accounts require read-only permissions (GET/LIST) to query job success, media agent metrics, and backup catalogs.",
        },
        {
          label: "Native Connectors",
          detail: "Direct REST API bindings for Commvault Command Center, Veeam Backup & Replication, and Dell PowerProtect Data Manager.",
        },
        {
          label: "Local Scrubbing",
          detail: "All job logs and catalog schemas are tokenized locally by the broker before any telemetry leaves customer perimeter.",
        },
      ],
    },
    {
      num: "02",
      title: "Model Interfaces & BYOM Abstraction",
      tag: "MODEL AGNOSTIC CORE",
      badge: "BYOM ENDPOINT ABSTRACTION",
      lead: "Pluggable LLM endpoints supporting OpenAI, Anthropic, or local air-gapped private models.",
      specs: [
        {
          label: "Vendor Independent",
          detail: "MeshDefend reasoning layer does not hardcode vendor weights. Seamlessly route prompts to Anthropic Claude, OpenAI GPT, AWS Bedrock, or Azure AI.",
        },
        {
          label: "Bring Your Own Model (BYOM)",
          detail: "Point MeshDefend to your self-hosted vLLM or Ollama instance running open-weights models (Llama, Mistral) inside private sovereign enclaves.",
        },
        {
          label: "Zero Model Training",
          detail: "Inference context is ephemeral and wiped upon agent consensus. Customer topologies are never used for model fine-tuning.",
        },
      ],
    },
    {
      num: "03",
      title: "Webhook & ITSM Bi-Directional Layer",
      tag: "ACTION GOVERNANCE",
      badge: "SERVICENOW & EVENT BUS",
      lead: "Bi-directional synchronization with ServiceNow CMDB, change management, and custom event buses.",
      specs: [
        {
          label: "CMDB Asset Sync",
          detail: "Autonomously correlates discovered infrastructure with ServiceNow CIs and business application services.",
        },
        {
          label: "Change Request Gating",
          detail: "State-changing recovery drills automatically generate standard Change Requests (CRs) requiring operator sign-off.",
        },
        {
          label: "Universal Webhooks",
          detail: "Outbound payload signing (HMAC-SHA256) enables instant integration with PagerDuty, Jira Service Desk, and SIEM pipelines.",
        },
      ],
    },
  ];

  return (
    <section
      id="integration-mechanisms"
      aria-label="Show How Your Stack Connects"
      style={{
        padding: "110px 0 120px",
        backgroundColor: "var(--bg, #fefdfd)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
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
              letterSpacing: "0.04em",
            }}
          >
            Show How Your Stack Connects
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 2 — INTEGRATION MECHANISMS MATRIX
          </span>
        </div>

        {/* Verbatim H2 */}
        <div style={{ maxWidth: 960, marginBottom: 54 }}>
          <h2
            style={{
              fontFamily:
                'var(--font-display), "Instrument Serif", Georgia, serif',
              fontSize: "clamp(34px, 4vw, 50px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
              fontWeight: 400,
              marginBottom: 16,
            }}
          >
            Connect what you already run. Keep operating it your way.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 17,
              lineHeight: 1.5,
              color: "var(--muted)",
              margin: 0,
              maxWidth: 780,
            }}
          >
            Architecture demonstrates interoperability more convincingly than an &ldquo;open platform&rdquo; claim.
            Inspect the verifiable architectural mechanisms&mdash;APIs, catalog connectors, pluggable model interfaces, and bi-directional ITSM layers&mdash;connecting your stack into MeshDefend&rsquo;s operational layer.
          </p>
        </div>

        {/* 3-Column Architectural Grid with Exposed 1px Borders */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--border)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 1,
          }}
        >
          {mechanisms.map((mech, idx) => (
            <motion.div
              key={mech.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.12, ease: "easeOut" }}
              style={{
                backgroundColor: "var(--bg, #fefdfd)",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* Header Tag & Badge */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 18,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--orange, #f45532)",
                    }}
                  >
                    MECHANISM // {mech.num}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 9.5,
                      padding: "3px 8px",
                      backgroundColor: "var(--surface-raised, #f7f6f5)",
                      border: "1px solid var(--border)",
                      color: "var(--ink)",
                      fontWeight: 600,
                    }}
                  >
                    {mech.badge}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}
                >
                  {mech.title}
                </h3>

                {/* Lead */}
                <p
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: "var(--muted)",
                    marginBottom: 24,
                  }}
                >
                  {mech.lead}
                </p>

                {/* Specs List */}
                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    paddingTop: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  {mech.specs.map((item, sIdx) => (
                    <div key={sIdx}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                          fontSize: 11,
                          fontWeight: 600,
                          color: "var(--ink)",
                          marginBottom: 4,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span style={{ color: "var(--orange, #f45532)" }}>▸</span>
                        <span>{item.label}</span>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body), Inter, sans-serif',
                          fontSize: 13,
                          lineHeight: 1.45,
                          color: "var(--muted)",
                          paddingLeft: 14,
                        }}
                      >
                        {item.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Verification Footer */}
              <div
                style={{
                  marginTop: 32,
                  paddingTop: 14,
                  borderTop: "1px dashed var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--muted)",
                  }}
                >
                  INTEROPERABILITY
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--ink)",
                    fontWeight: 600,
                  }}
                >
                  VERIFIED PROTOCOL
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
