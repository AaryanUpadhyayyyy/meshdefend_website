import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | MeshDefend",
  description: "MeshDefend privacy policy, data collection, usage, and security principles.",
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
            Effective Date: November 2026
          </p>

          <div style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.7, color: "var(--text)" }}>
            
            {/* 1. Introduction */}
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 36, marginBottom: 14 }}>
              1. Introduction
            </h2>
            <p style={{ marginBottom: 20 }}>
              MeshDefend (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) values your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website and services.
            </p>

            {/* 2. Information We Collect */}
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 36, marginBottom: 14 }}>
              2. Information We Collect
            </h2>
            <p style={{ marginBottom: 12 }}>
              We may collect the following types of information:
            </p>
            <ul style={{ paddingLeft: 24, marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              <li>
                <strong>Personal Information:</strong> Name, email address, and any details submitted via contact forms or signups.
              </li>
              <li>
                <strong>Usage Data:</strong> Information on website interactions, including IP address, browser type, and device information.
              </li>
              <li>
                <strong>Cookies &amp; Tracking Technologies:</strong> We use cookies to enhance your browsing experience and analyze site traffic.
              </li>
            </ul>

            {/* 3. How We Use Your Information */}
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 36, marginBottom: 14 }}>
              3. How We Use Your Information
            </h2>
            <p style={{ marginBottom: 12 }}>
              We use collected data to:
            </p>
            <ul style={{ paddingLeft: 24, marginBottom: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Respond to inquiries and provide customer support.</li>
              <li>Notify you about product launches, updates, and relevant announcements.</li>
              <li>Improve our website, security, and user experience.</li>
            </ul>

            {/* 4. Data Security */}
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 36, marginBottom: 14 }}>
              4. Data Security
            </h2>
            <p style={{ marginBottom: 20 }}>
              We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
            </p>

            {/* 5. Third-Party Services */}
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 36, marginBottom: 14 }}>
              5. Third-Party Services
            </h2>
            <p style={{ marginBottom: 20 }}>
              We may use third-party tools (e.g., analytics or email providers) that process data under their privacy policies. We do not sell or share your personal information with unauthorized third parties.
            </p>

            {/* 6. Your Rights */}
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 36, marginBottom: 14 }}>
              6. Your Rights
            </h2>
            <p style={{ marginBottom: 12 }}>
              You have the right to:
            </p>
            <ul style={{ paddingLeft: 24, marginBottom: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Access, update, or delete your personal data.</li>
              <li>Opt out of marketing communications at any time.</li>
              <li>Request clarification on data usage.</li>
            </ul>

            {/* 7. Changes to This Policy */}
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 36, marginBottom: 14 }}>
              7. Changes to This Policy
            </h2>
            <p style={{ marginBottom: 20 }}>
              We may update this Privacy Policy periodically. Changes will be posted on this page with the updated effective date.
            </p>

            {/* 8. Contact Us */}
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginTop: 36, marginBottom: 14 }}>
              8. Contact Us
            </h2>
            <p style={{ marginBottom: 20 }}>
              For questions or concerns regarding this Privacy Policy, please contact us at{" "}
              <a
                href="mailto:hello@meshdefend.ai"
                style={{ color: "var(--orange)", textDecoration: "underline" }}
              >
                hello@meshdefend.ai
              </a>
              .
            </p>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
