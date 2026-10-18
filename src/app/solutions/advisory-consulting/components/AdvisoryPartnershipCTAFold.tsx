"use client";

import React from "react";
import Link from "next/link";

export function AdvisoryPartnershipCTAFold() {
  return (
    <section
      id="partnership-cta"
      aria-label="Commitment CTA"
      style={{
        padding: "120px 0 130px",
        backgroundColor: "#f3f1f1",
        borderTop: "1px solid var(--border, rgba(34, 31, 34, 0.12))",
        borderBottom: "1px solid var(--border, rgba(34, 31, 34, 0.12))",
        color: "var(--ink, #221f22)",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <div style={{ maxWidth: 940 }}>
          {/* Display H2 Heading */}
          <h2
            style={{
              fontFamily: "var(--font-serif, 'Instrument Serif', Georgia, serif)",
              fontSize: "clamp(38px, 4.8vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--ink, #221f22)",
              fontWeight: 400,
              margin: "0 0 48px",
            }}
          >
            Your expertise starts the engagement. Let’s build what comes next together.
          </h2>

          {/* Action Buttons: Primary (#f45532) and Secondary (Outline) */}
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {/* Primary (#f45532): Talk to our partnership team (/company/contact?intent=advisory) */}
            <Link
              href="/company/contact?intent=advisory"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: "var(--orange, #f45532)",
                color: "#ffffff",
                padding: "16px 28px",
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textDecoration: "none",
                borderRadius: 2,
                border: "1px solid var(--orange, #f45532)",
                transition: "opacity 0.2s ease",
              }}
            >
              <span>Talk to our partnership team</span>
              <span>→</span>
            </Link>

            {/* Secondary (Outline): Explore a partnership (/company/investors-partners) */}
            <Link
              href="/company/investors-partners"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: "transparent",
                color: "var(--ink, #221f22)",
                padding: "16px 28px",
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textDecoration: "none",
                borderRadius: 2,
                border: "1px solid var(--ink, #221f22)",
                transition: "all 0.2s ease",
              }}
            >
              <span>Explore a partnership</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
