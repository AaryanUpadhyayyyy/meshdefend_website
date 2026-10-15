import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security Posture | MeshDefend",
  description: "Enterprise security architecture, isolation guarantees, and cryptographic proof standards for MeshDefend ResOC.",
};

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main id="main" style={{ minHeight: "75vh", display: "flex", alignItems: "center", backgroundColor: "var(--bg)" }}>
        <div className="container" style={{ maxWidth: 800, margin: "0 auto", padding: "120px 24px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--orange)", marginBottom: 16 }}>
            [ SECURITY POSTURE · VERIFY ]
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.1, marginBottom: 20 }}>
            Security Posture &amp; Architecture
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--muted)", lineHeight: 1.6, marginBottom: 32 }}>
            Air-gapped operation, zero egress data plane, immutable audit trails, and strict role-based access controls designed for enterprise infrastructure.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <Link
              href="/platform/enterprise-readiness"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 24px",
                backgroundColor: "var(--ink)",
                color: "var(--bg)",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: 2,
              }}
            >
              <span>Explore Enterprise Readiness</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
