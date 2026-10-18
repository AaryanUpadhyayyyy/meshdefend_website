import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | MeshDefend",
  description: "Enterprise Terms of Service governing access to and use of the MeshDefend platform, software, and services.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main" style={{ minHeight: "85vh", backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="container" style={{ maxWidth: 840, margin: "0 auto", padding: "140px 24px 80px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--orange)", letterSpacing: "0.08em", marginBottom: 16 }}>
            [ LEGAL // TERMS OF SERVICE ]
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.1, marginBottom: 16 }}>
            Terms of Service
          </h1>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--muted)", marginBottom: 40 }}>
            Effective Date: October 18, 2026 · Version 2.1
          </p>

          <div style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.7, color: "var(--text)" }}>
            <p style={{ marginBottom: 24, fontSize: 18, color: "var(--muted)" }}>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the MeshDefend platform, agents, APIs, websites, and associated operational resilience services (collectively, the &ldquo;Service&rdquo;), provided by MeshDefend Inc. (&ldquo;MeshDefend&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 16 }}>
              1. Enterprise Evaluation & Service Access
            </h2>
            <p style={{ marginBottom: 16 }}>
              By registering for, accessing, or evaluating the Service on behalf of a company, organization, or other legal entity (&ldquo;Customer&rdquo;), you represent and warrant that you have full legal authority to bind Customer to these Terms. If Customer has entered into a separate executed Master Services Agreement (&ldquo;MSA&rdquo;) with MeshDefend, that MSA shall supersede these standard Terms in the event of any conflict.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 16 }}>
              2. Read-Only Telemetry & Safe Remediation Architecture
            </h2>
            <p style={{ marginBottom: 16 }}>
              MeshDefend connects to your infrastructure, backup engines, and cloud providers strictly via scoped APIs. By default, all telemetry connectors and policy evaluation agents operate in read-only observation mode. Active remediation actions or vendor commands are only triggered when explicitly authorized by your designated administrators through human-in-the-loop workflows or pre-approved granular policy parameters.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 16 }}>
              3. Customer Data & Intellectual Property
            </h2>
            <p style={{ marginBottom: 16 }}>
              <strong>Ownership:</strong> Customer retains all right, title, and interest in and to all infrastructure telemetry, configuration metadata, operational incident logs, and proprietary data submitted to the Service (&ldquo;Customer Data&rdquo;).
            </p>
            <p style={{ marginBottom: 16 }}>
              <strong>No Model Training:</strong> MeshDefend does not use Customer Data or operational telemetry to train generalized public or shared AI models. Air-gapped and on-premises deployments execute exclusively with local, isolated model instances that never egress customer environments.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 16 }}>
              4. Acceptable Use & Operational Safety
            </h2>
            <p style={{ marginBottom: 16 }}>
              Customer agrees not to: (a) reverse engineer, decompile, or disassemble any binary components of the Service; (b) probe, scan, or breach platform security controls without prior authorization; (c) use the Service to build a competing resilience monitoring or automated recovery solution; or (d) transmit malicious payloads, malware, or unauthorized access credentials into the platform.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 16 }}>
              5. Service Level Commitments & Support
            </h2>
            <p style={{ marginBottom: 16 }}>
              MeshDefend provides enterprise SLA commitments (up to 99.95% uptime for managed cloud control plane instances) and mission-critical support response tiers as specified in Customer&apos;s Order Form or enterprise subscription tier.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 16 }}>
              6. Limitation of Liability
            </h2>
            <p style={{ marginBottom: 16 }}>
              To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, special, consequential, or punitive damages, or loss of profits, revenue, or business opportunities. MeshDefend&apos;s aggregate liability arising out of or related to these Terms shall not exceed the total fees paid by Customer in the twelve (12) months preceding the claim.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 16 }}>
              7. Governing Law & Dispute Resolution
            </h2>
            <p style={{ marginBottom: 24 }}>
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflict of law principles. Any dispute arising under these Terms shall be resolved by binding arbitration under the rules of the American Arbitration Association.
            </p>

            <div style={{ marginTop: 48, padding: 24, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <span style={{ color: "var(--muted)", fontSize: 14 }}>
                Questions regarding our legal terms?
              </span>
              <Link
                href="/company/contact?intent=legal"
                className="btn-secondary"
                style={{ fontSize: 13, padding: "8px 16px" }}
              >
                Contact Legal &amp; Compliance →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
