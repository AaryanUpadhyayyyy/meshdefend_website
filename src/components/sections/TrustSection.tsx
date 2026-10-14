"use client";

import { TRUST } from "@/lib/content";
import { TextReveal } from "@/components/ui/TextReveal";

export function TrustSection() {
  return (
    <section
      id="trust"
      style={{
        padding: "24px 0 28px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section Context Label */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <TextReveal
            as="span"
            text="BACKED BY LEADING INVESTORS & ACCELERATED BY GLOBAL CLOUD PARTNERS"
            stagger={0.03}
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "var(--muted)",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          />
        </div>

        {/* Full-width logo banner image */}
        <div
          className="reveal-on-scroll reveal-scale reveal-delay-1"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={TRUST.bannerSrc}
            alt={TRUST.bannerAlt}
            style={{
              width: "100%",
              maxWidth: 1160,
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Enterprise Governance & Proof Points Row */}
        <div
          className="reveal-on-scroll reveal-stagger reveal-delay-2"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px 36px",
            flexWrap: "wrap",
            marginTop: 18,
            paddingTop: 16,
            borderTop: "1px dashed var(--border)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11.5,
            color: "var(--muted)",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "var(--orange)", fontWeight: 700 }}>✓</span> Zero-Write Read-Only Ingestion
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "var(--orange)", fontWeight: 700 }}>✓</span> 100% Policy-Governed Human Sign-Off
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "var(--orange)", fontWeight: 700 }}>✓</span> Cryptographic WORM Audit Records
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "var(--orange)", fontWeight: 700 }}>✓</span> Enterprise Cloud & On-Prem Support
          </span>
        </div>
      </div>
    </section>
  );
}
