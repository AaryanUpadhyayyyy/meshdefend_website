"use client";

import { motion } from "framer-motion";

export function AirGappedProofFold() {
  const proofMetrics = [
    {
      label: "EXTERNAL WAN EGRESS",
      val: "0 bps",
      detail: "Physical air-gap maintained; zero phone-home pings or external DNS requests.",
    },
    {
      label: "LOCAL INFERENCE FOOTPRINT",
      val: "100% On-Prem",
      detail: "Self-contained quantized agent models run entirely on local server compute.",
    },
    {
      label: "AUDIT LEDGER INTEGRITY",
      val: "WORM SEC 17a-4",
      detail: "Cryptographic hash chain written locally to immutable retention-locked storage.",
    },
    {
      label: "UPDATE DISTRIBUTION",
      val: "Offline Diodes",
      detail: "Air-gapped tarball bundles verified via Ed25519 signatures before ingestion.",
    },
  ];

  return (
    <section
      id="air-gapped-proof"
      aria-label="Prove It in a Constrained Environment"
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
            [ PROVE IT IN A CONSTRAINED ENVIRONMENT ]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              color: "rgba(255, 255, 255, 0.4)",
              letterSpacing: "0.05em",
            }}
          >
            FIG. 4 — ZERO-EGRESS AIR-GAPPED VERIFICATION
          </span>
        </div>

        {/* Display H2 (White, Instrument Serif) */}
        <div style={{ maxWidth: 960, marginBottom: 54 }}>
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
            Air-gapped. Data stays inside. Operations still need to work.
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
            In defense, nuclear power, central banking, and intelligence facilities, internet access is prohibited.
            MeshDefend does not merely tolerate network isolation—it was architected to run autonomously within it.
          </p>
        </div>

        {/* Constraint Validation Card (Exposed 1px Command Surface) */}
        <div
          style={{
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backgroundColor: "#181618",
            marginBottom: 36,
          }}
        >
          {/* Card Top Console Bar */}
          <div
            style={{
              padding: "14px 24px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
              backgroundColor: "#1f1d1f",
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
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  backgroundColor: "var(--orange, #f45532)",
                  borderRadius: "50%",
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#fefdfd",
                  letterSpacing: "0.05em",
                }}
              >
                AIR-GAP VALIDATION CARD // REGULATED SECTOR BENCHMARK
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "rgba(255, 255, 255, 0.45)",
              }}
            >
              ISOLATION AUDIT: PASS (0 BYTES LEAKED)
            </span>
          </div>

          {/* Animated Diagram: Local Control Plane vs. Severed Internet */}
          <div style={{ padding: "32px 28px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <svg width="100%" height="220" viewBox="0 0 940 220" fill="none">
              {/* Left Side: Classified / Secure Facility Enclosure */}
              <rect x="20" y="20" width="580" height="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="#1d1b1d" />
              <text x="36" y="44" fill="#fefdfd" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">
                AIR-GAPPED HIGH-SECURITY ENCLAVE (PHYSICAL PERIMETER)
              </text>

              {/* Internal MeshDefend Appliance */}
              <g transform="translate(40, 65)">
                <rect x="0" y="0" width="250" height="110" stroke="var(--orange, #f45532)" strokeWidth="1.5" fill="#242124" />
                <text x="16" y="26" fill="var(--orange, #f45532)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600">
                  MESHDEFEND STANDALONE APPLIANCE
                </text>
                <text x="16" y="48" fill="#fefdfd" fontFamily="var(--font-body)" fontSize="12" fontWeight="600">
                  Local Autonomous Reasoning Core
                </text>
                <text x="16" y="66" fill="rgba(255,255,255,0.6)" fontFamily="var(--font-mono)" fontSize="9">
                  • Embedded Quantized LLM Weights
                </text>
                <text x="16" y="82" fill="rgba(255,255,255,0.6)" fontFamily="var(--font-mono)" fontSize="9">
                  • Local Vector Storage & Dependency Graph
                </text>
                <text x="16" y="98" fill="rgba(255,255,255,0.6)" fontFamily="var(--font-mono)" fontSize="9">
                  • On-Prem WORM SEC 17a-4 Ledger
                </text>
              </g>

              {/* Monitored Assets */}
              <g transform="translate(320, 65)">
                <rect x="0" y="0" width="250" height="110" stroke="rgba(255,255,255,0.15)" fill="#201e20" />
                <text x="16" y="26" fill="rgba(255,255,255,0.7)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600">
                  CRITICAL INFRASTRUCTURE ASSETS
                </text>
                <text x="16" y="48" fill="#fefdfd" fontFamily="var(--font-body)" fontSize="12" fontWeight="600">
                  Core Banking / SCADA / Secret DBs
                </text>
                <text x="16" y="66" fill="rgba(255,255,255,0.5)" fontFamily="var(--font-mono)" fontSize="9">
                  • NetApp / Pure Storage SafeMode
                </text>
                <text x="16" y="82" fill="rgba(255,255,255,0.5)" fontFamily="var(--font-mono)" fontSize="9">
                  • Commvault / Veeam Air-Gapped Repos
                </text>
                <text x="16" y="98" fill="rgba(255,255,255,0.5)" fontFamily="var(--font-mono)" fontSize="9">
                  • Local Active Directory / Kerberos
                </text>
              </g>

              {/* Internal Ingestion Arrow */}
              <line x1="320" y1="120" x2="290" y2="120" stroke="var(--orange, #f45532)" strokeWidth="1.5" />
              <polygon points="290,116 280,120 290,124" fill="var(--orange, #f45532)" />

              {/* Physical Severing Zone */}
              <g transform="translate(630, 70)">
                <line x1="0" y1="50" x2="80" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="3 3" />
                {/* Red Slash Cut */}
                <line x1="30" y1="20" x2="60" y2="80" stroke="var(--orange, #f45532)" strokeWidth="3" />
                <line x1="60" y1="20" x2="30" y2="80" stroke="var(--orange, #f45532)" strokeWidth="3" />
                <text x="0" y="105" fill="var(--orange, #f45532)" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600">
                  SEVERED (0 BPS)
                </text>
              </g>

              {/* Right Side: External World (Completely Blocked) */}
              <rect x="740" y="20" width="180" height="180" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" fill="none" />
              <text x="754" y="44" fill="rgba(255,255,255,0.3)" fontFamily="var(--font-mono)" fontSize="10">
                PUBLIC INTERNET / CLOUD
              </text>
              <text x="754" y="105" fill="rgba(255,255,255,0.35)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">
                [ UNREACHABLE ]
              </text>
              <text x="754" y="125" fill="rgba(255,255,255,0.3)" fontFamily="var(--font-body)" fontSize="10">
                Zero telemetry leaves facility
              </text>
            </svg>
          </div>

          {/* 4 Proof Metrics Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              gap: 1,
            }}
          >
            {proofMetrics.map((pm, idx) => (
              <div
                key={idx}
                style={{
                  padding: "24px 22px",
                  backgroundColor: "#181618",
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "rgba(255, 255, 255, 0.45)",
                    marginBottom: 8,
                    letterSpacing: "0.05em",
                  }}
                >
                  {pm.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                    fontSize: 28,
                    color: "var(--orange, #f45532)",
                    marginBottom: 6,
                    lineHeight: 1.1,
                  }}
                >
                  {pm.val}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body), Inter, sans-serif',
                    fontSize: 12.5,
                    color: "rgba(255, 255, 255, 0.65)",
                    lineHeight: 1.45,
                  }}
                >
                  {pm.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
