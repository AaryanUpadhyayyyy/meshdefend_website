"use client";

import { motion } from "framer-motion";

export function ArchitecturalFactGridFold() {
  const facts = [
    {
      index: "FACT 01",
      title: "Data Residency & Payload Isolation",
      subtitle: "Control plane telemetry vs. Payload data isolation",
      badge: "ZERO-PAYLOAD RESIDENCY",
      mechanisms: [
        {
          term: "Telemetry Separation",
          desc: "Only backup catalog indexes, job completion timestamps, deduplication hashes, and metadata headers are ingested. Database rows, files, and payload bytes are strictly quarantined.",
        },
        {
          term: "Zero Customer Data Retention",
          desc: "MeshDefend stores zero customer payload data. The control plane cannot mount, stream, or read underlying application records.",
        },
        {
          term: "Sovereign Regions",
          desc: "Dedicated control plane nodes deployed in EU (Frankfurt), US (Virginia), and APAC (Singapore) to satisfy strict GDPR and sovereign data residency laws.",
        },
      ],
    },
    {
      index: "FACT 02",
      title: "Cloud Dependencies & Component Split",
      subtitle: "Which components run locally vs. SaaS",
      badge: "MINIMAL LOCAL FOOTPRINT",
      mechanisms: [
        {
          term: "Lightweight Edge Broker",
          desc: "The MeshDefend Broker requires 2 vCPU and 4GB RAM. It deploys as an OVF/OVA appliance, Docker container, or Kubernetes DaemonSet adjacent to backup media agents.",
        },
        {
          term: "Autonomous Consensus",
          desc: "Telemetry normalization occurs on the local broker. Multi-agent consensus, dependency graph synthesis, and WORM ledger signing occur in the control cluster.",
        },
        {
          term: "Self-Contained Mode",
          desc: "When deployed in Air-Gapped mode, 100% of components—including quantized LLM inference and vector memory—run entirely on local customer hardware.",
        },
      ],
    },
    {
      index: "FACT 03",
      title: "Connectivity, Ports & Proxy Topology",
      subtitle: "Specific port and outbound proxy requirements",
      badge: "STRICT EGRESS-ONLY",
      mechanisms: [
        {
          term: "Zero Inbound Open Ports",
          desc: "No public listening ports required. The broker establishes an outbound connection only over TCP 443 with mutual TLS (mTLS 1.3) pinned to tenant certificates.",
        },
        {
          term: "Proxy & Firewall Native",
          desc: "Native support for authenticated enterprise forward proxies (Squid, Zscaler, BlueCoat) and custom CA trust bundles for TLS inspection environments.",
        },
        {
          term: "Private Link Routing",
          desc: "Direct integration with AWS PrivateLink and Azure Private Link for organizations prohibiting traffic routing over public internet conduits.",
        },
      ],
    },
  ];

  return (
    <section
      id="deployment-facts"
      aria-label="Show How Deployment Actually Works"
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
            Show How Deployment Actually Works
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 2 — ARCHITECTURAL FACT GRID
          </span>
        </div>

        {/* Display H2 */}
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
            Deploy MeshDefend without redesigning the environment around it.
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
            Architecture is easier to trust when buyers can inspect the exact mechanisms. Below are the verified
            technical parameters governing residency, dependencies, and network isolation.
          </p>
        </div>

        {/* 3-Column Exposed 1px Hairline Grid */}
        <div
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--border)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 1,
          }}
        >
          {facts.map((fact, idx) => (
            <motion.div
              key={fact.index}
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
                      fontSize: 10.5,
                      fontWeight: 600,
                      color: "var(--orange, #f45532)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {fact.index}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      padding: "3px 8px",
                      backgroundColor: "var(--surface-raised, #f7f6f5)",
                      border: "1px solid var(--border)",
                      color: "var(--ink)",
                      fontWeight: 500,
                    }}
                  >
                    {fact.badge}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 6,
                    lineHeight: 1.3,
                  }}
                >
                  {fact.title}
                </h3>

                {/* Subtitle */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--muted)",
                    marginBottom: 24,
                  }}
                >
                  {fact.subtitle}
                </div>

                {/* Mechanisms List */}
                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    paddingTop: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                  }}
                >
                  {fact.mechanisms.map((mech, mIdx) => (
                    <div key={mIdx}>
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
                        <span>{mech.term}</span>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body), Inter, sans-serif',
                          fontSize: 13,
                          lineHeight: 1.5,
                          color: "var(--muted)",
                          paddingLeft: 14,
                        }}
                      >
                        {mech.desc}
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
                  ARCHITECTURE STATUS
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--ink)",
                    fontWeight: 600,
                  }}
                >
                  VERIFIED DEPLOYABLE
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
