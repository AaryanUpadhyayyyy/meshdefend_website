import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book a Demo | MeshDefend",
  description: "Schedule a live architecture walk-through and resilience demonstration with MeshDefend engineers.",
};

export default function DemoPage() {
  return (
    <>
      <Navbar />
      <main id="main" style={{ minHeight: "75vh", display: "flex", alignItems: "center", backgroundColor: "var(--bg)" }}>
        <div className="container" style={{ maxWidth: 800, margin: "0 auto", padding: "120px 24px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--orange)", marginBottom: 16 }}>
            [ DEMO REQUEST · VERIFY ]
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.1, marginBottom: 20 }}>
            Book a MeshDefend Demo
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--muted)", lineHeight: 1.6, marginBottom: 32 }}>
            See ResOC in action. Schedule a 30-minute technical session with our systems resilience team.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <Link
              href="/support"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 24px",
                backgroundColor: "var(--orange)",
                color: "#ffffff",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: 2,
              }}
            >
              <span>Submit request via Support</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
