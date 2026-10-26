import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security Architecture & Trust | MeshDefend",
  description: "Enterprise security architecture, isolation guarantees, cryptographic proof standards, and scoped egress boundaries for MeshDefend ResOC.",
};

const SECURITY_CONTROLS = [
  {
    id: "SEC-01",
    title: "Zero-Trust Telemetry & Scoped Egress Boundaries",
    summary: "Telemetry ingestion is read-only by default. In sovereign air-gap deployments, zero bytes leave your perimeter.",
    details: [
      "Metadata-Only Telemetry: ResOC ingests backup job logs, catalog indexes, deduplication hashes, and SLA status. Customer database rows, user files, and payload bytes are never touched or extracted.",
      "Air-Gapped Sovereign Mode: Designed for defense, finance, and critical infrastructure, the air-gapped appliance operates 100% disconnected with zero outbound internet egress.",
      "Hybrid & SaaS Scoped Egress: Hybrid deployment collectors communicate strictly via outbound TLS 1.3 over port 443 to the customer-designated VPC or dedicated SaaS control plane. No inbound listening ports are opened.",
    ],
    standard: "SOC 2 Type II Privacy & Confidentiality · ISO 27001 Annex A.8.24",
  },
  {
    id: "SEC-02",
    title: "Dual-Control HITL Authorization Gate",
    summary: "No state-changing execution or vendor remediation command can bypass the cryptographic Human-in-the-Loop approval gate.",
    details: [
      "Cryptographic Non-Repudiation: Every remediation plan dispatched to a backup engine requires an Ed25519 signature from an authorized enterprise operator.",
      "M-of-N Quorum Controls: For Tier-0 critical databases (such as core banking ledgers or ERP volumes), multi-party authorization requires dual-custody approval before execution.",
      "FIDO2 / WebAuthn Integration: Hardware security keys (YubiKey) and enterprise IdP SAML/OIDC enforcement ensure automated actions cannot be triggered by compromised credentials.",
    ],
    standard: "NIST SP 800-53 Rev. 5 AC-2(4) · DORA Article 11 Dual Control",
  },
  {
    id: "SEC-03",
    title: "Isolated Ephemeral LLM Boundaries",
    summary: "Agent Mesh reasoning operates in ring-fenced, ephemeral enclaves with zero customer data retention or shared model training.",
    details: [
      "Zero Context Caching: Model context memory is destroyed immediately upon reaching agent consensus. No prompts or telemetry are retained for model weights.",
      "Air-Gapped Local Inference: In sovereign air-gap environments, ResOC runs local quantized models on on-premises GPU nodes with complete data isolation.",
      "Customer-Controlled Endpoints: In hybrid mode, customers can bring their own enterprise LLM endpoints (e.g. private Azure OpenAI or dedicated VPC endpoints) under their existing enterprise terms.",
    ],
    standard: "EU AI Act Transparency · AWS Nitro / Confidential Computing Enclaves",
  },
  {
    id: "SEC-04",
    title: "Immutable WORM Ledger & Continuous Audit Trails",
    summary: "Continuous write-once-read-many (WORM) audit trails log every policy check, drift observation, and operator command.",
    details: [
      "Cryptographic Hash Chains: Every state transition, anomaly detection event, and operator signature is sealed in an append-only SHA-256 hash chain.",
      "Regulatory Readiness: Automated evidence packaging provides one-click audit dossiers formatted for DORA, SEC cyber disclosure rules, and NIS2 examinations.",
      "Third-Party Attestation: Designed in alignment with AICPA Trust Services Criteria (SOC 2) and ISO/IEC 27001 security management principles.",
    ],
    standard: "SEC Rule 17a-4 · FINRA 4511 · DORA Article 16",
  },
];

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main id="main" style={{ minHeight: "85vh", backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="container" style={{ maxWidth: 1100, margin: "0 auto", padding: "140px 24px 80px" }}>
          
          {/* Header */}
          <div style={{ maxWidth: 840, marginBottom: 56 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--orange)", letterSpacing: "0.08em", marginBottom: 16 }}>
              [ ENTERPRISE SECURITY ARCHITECTURE // TRUST &amp; ISOLATION ]
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.1, marginBottom: 20 }}>
              Engineered for Sovereign Resilience
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 19, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
              MeshDefend operates at the intersection of critical backup infrastructure and automated response. Our architecture enforces strict zero-trust boundaries, scoped egress, and non-bypassable human authorization so deploying ResOC never introduces new systemic risk into your enterprise.
            </p>
          </div>

          {/* Architectural Pillars Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 64 }}>
            <div style={{ padding: 24, border: "1px solid var(--border)", backgroundColor: "var(--surface-raised)", borderRadius: 4 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--orange)", marginBottom: 8 }}>
                BOUNDARY · 01
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 8 }}>
                Read-Only by Default
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
                Initial telemetry ingestion, topology discovery, and policy evaluations are 100% read-only. Destructive actions can never be executed without explicit operator intervention.
              </p>
            </div>

            <div style={{ padding: 24, border: "1px solid var(--border)", backgroundColor: "var(--surface-raised)", borderRadius: 4 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--orange)", marginBottom: 8 }}>
                BOUNDARY · 02
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 8 }}>
                Zero Egress in Air-Gap
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
                In air-gapped sovereign environments, ResOC operates disconnected with zero outbound network calls, running local models with 100% data residency inside your vault.
              </p>
            </div>

            <div style={{ padding: 24, border: "1px solid var(--border)", backgroundColor: "var(--surface-raised)", borderRadius: 4 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--orange)", marginBottom: 8 }}>
                BOUNDARY · 03
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 8 }}>
                Cryptographic Audit Log
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
                Every agent proposal, consensus checkpoint, and operator signature is sealed in an append-only cryptographic ledger satisfying regulatory compliance standards.
              </p>
            </div>
          </div>

          {/* SEC-01 to SEC-04 Deep Technical Breakdown */}
          <div style={{ marginBottom: 64 }}>
            <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12, marginBottom: 32 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, margin: 0 }}>
                Structural Security Controls (SEC-01 through SEC-04)
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {SECURITY_CONTROLS.map((ctrl) => (
                <div
                  key={ctrl.id}
                  id={ctrl.id.toLowerCase()}
                  style={{
                    padding: 32,
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--surface-raised)",
                    borderRadius: 4,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--orange)", fontWeight: 600 }}>
                        [{ctrl.id}]
                      </span>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, margin: 0 }}>
                        {ctrl.title}
                      </h3>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>
                      {ctrl.standard}
                    </span>
                  </div>

                  <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text)", lineHeight: 1.6, marginBottom: 20 }}>
                    {ctrl.summary}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingLeft: 16, borderLeft: "2px solid var(--orange)" }}>
                    {ctrl.details.map((detail, dIdx) => (
                      <p key={dIdx} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Review CTA */}
          <div
            style={{
              padding: "40px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface-raised)",
              borderRadius: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div style={{ maxWidth: 640 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginBottom: 8 }}>
                Request the Enterprise Security Architecture Whitepaper
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
                Includes comprehensive network topologies, cryptographic key management specifications, and third-party penetration testing summaries.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/company/contact?intent=security-review"
                className="btn-primary"
                style={{ padding: "12px 24px", fontSize: 13, textDecoration: "none" }}
              >
                Schedule Security Review →
              </Link>
              <Link
                href="/platform/enterprise-readiness"
                className="btn-secondary"
                style={{ padding: "12px 24px", fontSize: 13, textDecoration: "none" }}
              >
                View Enterprise Readiness
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
