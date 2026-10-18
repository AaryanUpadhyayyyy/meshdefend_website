import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book a Technical Demo | MeshDefend",
  description: "Schedule a live architecture walk-through and resilience demonstration with MeshDefend systems engineers.",
};

export default function DemoPage() {
  return (
    <>
      <Navbar />
      <main id="main" style={{ minHeight: "80vh", display: "flex", alignItems: "center", backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="container" style={{ maxWidth: 840, margin: "0 auto", padding: "140px 24px 80px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--orange)", letterSpacing: "0.08em", marginBottom: 16 }}>
            [ TECHNICAL EVALUATION // LIVE DEMO ]
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.1, marginBottom: 20 }}>
            Experience MeshDefend ResOC in Action
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--muted)", lineHeight: 1.6, marginBottom: 32, maxWidth: 640 }}>
            Connect with our systems resilience team for an interactive technical session. We walk through live multi-vendor telemetry ingestion, silent failure detection, and deterministic incident resolution.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 40 }}>
            <div style={{ padding: 20, border: "1px solid var(--border)", backgroundColor: "var(--surface-raised)", borderRadius: 4 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--orange)", marginBottom: 6 }}>
                01 // ESTATE TOPOLOGY
              </div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>
                Map unified backup health across AWS, Veeam, Cohesity, and legacy on-prem engines.
              </div>
            </div>
            <div style={{ padding: 20, border: "1px solid var(--border)", backgroundColor: "var(--surface-raised)", borderRadius: 4 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--orange)", marginBottom: 6 }}>
                02 // SILENT CORRUPTION
              </div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>
                Identify false-green jobs where snapshots succeed but recovery drills would fail.
              </div>
            </div>
            <div style={{ padding: 20, border: "1px solid var(--border)", backgroundColor: "var(--surface-raised)", borderRadius: 4 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--orange)", marginBottom: 6 }}>
                03 // HITL REMEDIATION
              </div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>
                Review safe, non-bypassable operator approvals for vendor remediation commands.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <Link
              href="/company/contact?intent=demo"
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              <span>Schedule Technical Demo</span>
              <span>→</span>
            </Link>
            <Link
              href="/downloads/meshdefend-enterprise-onepager.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 24px",
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              <span>Download Enterprise Architecture (PDF)</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
