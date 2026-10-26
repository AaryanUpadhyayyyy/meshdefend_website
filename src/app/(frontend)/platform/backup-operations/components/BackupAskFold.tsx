"use client";

import Link from "next/link";
import { SpringReveal } from "@/components/motion/SpringReveal";

const VENDORS = [
  "Commvault",
  "Veeam",
  "Dell PowerProtect Data Manager",
  "Dell NetWorker",
  "Dell PowerProtect DataDomain",
  "ServiceNow",
];

export function BackupAskFold() {
  return (
    <section
      id="ask"
      style={{
        padding: "132px 0 150px",
        background: "var(--bg)",
        color: "var(--ink)",
        borderTop: "1px solid var(--border)",
      }}
      aria-labelledby="backup-ask-heading"
    >
      <div className="container">
        <SpringReveal>
          <div style={{ maxWidth: 840, display: "flex", flexDirection: "column", gap: 28 }}>
            <h2
              id="backup-ask-heading"
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(42px, 5vw, 72px)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                fontWeight: 400,
                margin: 0,
              }}
            >
              Run backup operations from one governed console.
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body), Inter, sans-serif",
                fontSize: "clamp(17px, 1.8vw, 19px)",
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: "640px",
                margin: 0,
              }}
            >
              Bring your existing backup and storage stack. We will show you how MeshDefend unifies morning operations, guided triage, and human-governed execution across your estate.
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
                href="/demo"
                className="btn btn-primary"
                style={{
                  fontSize: 14,
                  padding: "14px 28px",
                  borderRadius: 4,
                  textDecoration: "none",
                }}
              >
                Book a demo
              </Link>
              <Link
                href="/demo"
                className="btn btn-secondary"
                style={{
                  fontSize: 14,
                  padding: "14px 28px",
                  borderRadius: 4,
                  textDecoration: "none",
                }}
              >
                See ResOC in action
              </Link>
            </div>

            {/* Bottom Plain Vendor Row (13px, ink 60%, borderTop: 1px solid var(--border)) */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "20px 36px",
                marginTop: 48,
                paddingTop: 32,
                borderTop: "1px solid var(--border)",
              }}
              aria-label="Supported backup and storage platforms"
            >
              {VENDORS.map((vendor) => (
                <span
                  key={vendor}
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 13,
                    color: "color-mix(in srgb, var(--ink) 60%, transparent)",
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
