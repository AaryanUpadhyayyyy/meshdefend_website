import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | MeshDefend",
  description: "MeshDefend privacy notice and data handling principles.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main" style={{ minHeight: "75vh", display: "flex", alignItems: "center", backgroundColor: "var(--bg)" }}>
        <div className="container" style={{ maxWidth: 800, margin: "0 auto", padding: "120px 24px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--orange)", marginBottom: 16 }}>
            [ PRIVACY POLICY · VERIFY ]
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.1, marginBottom: 20 }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--muted)", lineHeight: 1.6, marginBottom: 24 }}>
            MeshDefend respects user confidentiality and handles enterprise telemetry with strict data minimization principles. Contact submissions are used exclusively to respond to your request.
          </p>
          <div
            style={{
              padding: 20,
              backgroundColor: "var(--surface-raised)",
              border: "1px solid var(--border)",
              borderRadius: 3,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            [VERIFY: Full legal privacy policy document to be provided by corporate counsel.]
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
