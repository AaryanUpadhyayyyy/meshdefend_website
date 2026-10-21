import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "MD Support Portal | MeshDefend",
  description:
    "MeshDefend customer and partner support. Access technical documentation, open an incident ticket, or contact the resilience operations support team.",
};

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        style={{
          minHeight: "75vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
          background: "var(--bg)",
          color: "var(--ink)",
        }}
      >
        <div
          style={{
            maxWidth: 680,
            width: "100%",
            textAlign: "center",
            padding: "48px 36px",
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "var(--card-bg, rgba(255, 255, 255, 0.02))",
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 12,
              fontWeight: 600,
              color: "var(--orange)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            MD Support Portal
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(32px, 4vw, 44px)",
              lineHeight: 1.15,
              margin: "0 0 16px",
              color: "var(--ink)",
            }}
          >
            Support & Customer Operations
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--ink)",
              opacity: 0.85,
              marginBottom: 32,
            }}
          >
            The MeshDefend Support Portal is currently accessible to enterprise customers and authorized partners. If you require technical assistance, access to deployment runbooks, or need to open a support ticket, please reach out to our customer operations team.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/company/contact"
              className="btn btn-primary"
              style={{
                background: "var(--orange)",
                color: "#221f22",
                fontWeight: 600,
                fontSize: 15,
                padding: "12px 28px",
                borderRadius: 4,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Contact Support
            </Link>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 500,
                color: "var(--ink)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                textDecoration: "none",
              }}
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
