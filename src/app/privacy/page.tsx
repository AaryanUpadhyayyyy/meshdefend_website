import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | MeshDefend",
  description: "MeshDefend enterprise privacy policy, data handling principles, and commitment to zero unauthorized telemetry retention.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main" style={{ minHeight: "85vh", backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="container" style={{ maxWidth: 840, margin: "0 auto", padding: "140px 24px 80px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--orange)", letterSpacing: "0.08em", marginBottom: 16 }}>
            [ LEGAL // PRIVACY POLICY ]
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.1, marginBottom: 16 }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--muted)", marginBottom: 40 }}>
            Last Updated: October 18, 2026 · Version 2.4
          </p>

          <div style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.7, color: "var(--text)" }}>
            <p style={{ marginBottom: 24, fontSize: 18, color: "var(--muted)" }}>
              MeshDefend Inc. (&ldquo;MeshDefend&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) provides autonomous cyber resilience, backup observability, and incident resolution software for enterprise IT and security operations. We are deeply committed to protecting the privacy, confidentiality, and integrity of all individuals who visit our website, evaluate our technology, or interact with our operational platforms.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 16 }}>
              1. Information We Collect
            </h2>
            <p style={{ marginBottom: 16 }}>
              We collect information strictly necessary to provide, secure, and evaluate our resilience services:
            </p>
            <ul style={{ paddingLeft: 24, marginBottom: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>
                <strong>Business Contact Information:</strong> Name, work email address, company name, job role, and technical requirements provided when requesting a demonstration, technical assessment, or architectural whitepaper.
              </li>
              <li>
                <strong>Operational Telemetry (Platform Users):</strong> Machine-level metadata, backup job execution status, error logs, and infrastructure topology indicators necessary for ResOC analysis. Telemetry connectors operate read-only by default and do not ingest payload data.
              </li>
              <li>
                <strong>Technical Log Data:</strong> Standard server logs, IP addresses, browser types, and anonymized diagnostic metrics when browsing our website.
              </li>
            </ul>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 16 }}>
              2. How We Use Information
            </h2>
            <p style={{ marginBottom: 16 }}>
              Collected information is used exclusively for legitimate business purposes:
            </p>
            <ul style={{ paddingLeft: 24, marginBottom: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>To schedule, provision, and deliver requested technical evaluations and product demonstrations.</li>
              <li>To provide customer support, security advisories, and system health notifications.</li>
              <li>To detect, investigate, and prevent fraudulent activity or unauthorized access to our systems.</li>
              <li>To send product updates and technical research dispatches, only where explicit, separate consent has been provided.</li>
            </ul>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 16 }}>
              3. Data Sharing & Third Parties
            </h2>
            <p style={{ marginBottom: 16 }}>
              <strong>We do not sell, rent, or trade your personal data or operational telemetry to third parties or advertising networks.</strong> We do not engage in ad-partner data sharing. We only disclose information to vetted enterprise sub-processors who assist us in operating our infrastructure (such as secure cloud hosting and transactional email), under strict data protection agreements.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 16 }}>
              4. Air-Gapped and Sovereign Deployments
            </h2>
            <p style={{ marginBottom: 16 }}>
              For enterprise customers utilizing MeshDefend in sovereign or air-gapped on-premises environments, zero customer telemetry or model inference queries egress your perimeter. In these deployments, all agents, local models, and audit logs execute strictly on customer-managed hardware without cloud dependencies.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 16 }}>
              5. Global Privacy Rights (GDPR, DPDP Act &amp; CCPA)
            </h2>
            <p style={{ marginBottom: 16 }}>
              Regardless of your jurisdiction, you have the right to:
            </p>
            <ul style={{ paddingLeft: 24, marginBottom: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction or rectification of inaccurate records.</li>
              <li>Request deletion or erasure of your personal data (&ldquo;right to be forgotten&rdquo;).</li>
              <li>Withdraw your consent to marketing communications at any time with a single click.</li>
              <li>Lodge a complaint with your competent data protection authority.</li>
            </ul>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 16 }}>
              6. Data Security &amp; Retention
            </h2>
            <p style={{ marginBottom: 24 }}>
              We implement defense-in-depth security safeguards including end-to-end TLS 1.3 encryption in transit, AES-256 encryption at rest, role-based access control, and immutable tamper-evident audit logs. Contact inquiries are retained only for the duration of the evaluation or as required by statutory record retention rules.
            </p>

            <div style={{ marginTop: 48, padding: 24, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Data Protection Officer</div>
                <div style={{ color: "var(--muted)", fontSize: 14 }}>privacy@meshdefend.ai · MeshDefend Inc.</div>
              </div>
              <Link
                href="/company/contact?intent=privacy"
                className="btn-secondary"
                style={{ fontSize: 13, padding: "8px 16px" }}
              >
                Submit Privacy Request →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
