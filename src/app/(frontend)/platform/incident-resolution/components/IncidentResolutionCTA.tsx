"use client";

import Link from "next/link";
import { SpringReveal } from "@/components/motion/SpringReveal";

const SUPPORTED_VENDORS = [
  "Commvault",
  "Veeam",
  "Dell PowerProtect Data Manager",
  "Dell NetWorker",
  "Dell PowerProtect DataDomain",
  "ServiceNow ITSM & CMDB",
];

export function IncidentResolutionCTA() {
  return (
    <section
      id="cta"
      style={{
        padding: "128px 0 140px",
        background: "#221f22",
        color: "#fefdfd",
        borderTop: "1px solid rgba(254, 253, 253, 0.08)",
        position: "relative",
      }}
      aria-labelledby="cta-heading"
    >
      <div className="container">
        <SpringReveal>
          <div style={{ maxWidth: 840, display: "flex", flexDirection: "column", gap: 28 }}>
            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "var(--orange)",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              [ LIVE INCIDENT SIMULATION // RESOLUTION EVALUATION ]
            </div>

            <h2
              id="cta-heading"
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(42px, 5.2vw, 74px)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "#fefdfd",
                fontWeight: 400,
                margin: 0,
              }}
            >
              See how MeshDefend would handle one of your incidents.
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body), Inter, sans-serif",
                fontSize: "clamp(17px, 1.8vw, 19px)",
                lineHeight: 1.6,
                color: "rgba(254, 253, 253, 0.7)",
                maxWidth: "640px",
                margin: 0,
              }}
            >
              Bring us a recent backup failure, replication drift, or snapshot lock incident. We will trace the exact correlation graph, evidence package, and governed approval gates MeshDefend produces.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 16,
                marginTop: 8,
              }}
            >
              <Link
                href="/company/contact?intent=demo"
                className="btn btn-primary"
                style={{
                  fontSize: 14,
                  padding: "14px 28px",
                  borderRadius: 4,
                  textDecoration: "none",
                }}
              >
                Schedule Incident Simulation →
              </Link>
              <Link
                href="/platform/cyber-resilience"
                className="btn btn-secondary"
                style={{
                  fontSize: 14,
                  padding: "14px 28px",
                  borderRadius: 4,
                  textDecoration: "none",
                  border: "1px solid rgba(254, 253, 253, 0.25)",
                  color: "#fefdfd",
                }}
              >
                Explore Cyber Resilience Posture
              </Link>
            </div>

            {/* Bottom Plain Vendor Row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "20px 36px",
                marginTop: 48,
                paddingTop: 32,
                borderTop: "1px solid rgba(254, 253, 253, 0.1)",
              }}
              aria-label="Supported backup and storage platforms"
            >
              {SUPPORTED_VENDORS.map((vendor) => (
                <span
                  key={vendor}
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 13,
                    color: "rgba(254, 253, 253, 0.6)",
                    letterSpacing: "-0.005em",
                    whiteSpace: "nowrap",
                    cursor: "default",
                  }}
                >
                  {vendor}
                </span>
              ))}
            </div>
          </div>
        </SpringReveal>
      </div>
    </section>
  );
}
