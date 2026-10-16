"use client";

import { useState } from "react";
import Link from "next/link";

export function NewsletterClient() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ background: "var(--bg, #ffffff)", minHeight: "85vh", color: "var(--ink, #221f22)" }}>
      {/* ─── Hero Section ─── */}
      <section style={{ padding: "100px 24px 64px", borderBottom: "1px solid var(--border, #ebeaeb)" }}>
        <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(244, 85, 50, 0.08)",
              border: "1px solid rgba(244, 85, 50, 0.2)",
              fontSize: 12,
              fontFamily: "var(--font-mono, monospace)",
              color: "var(--orange, #f45532)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange, #f45532)" }} />
            The Resilience Memo · Quarterly Newsletter
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display, serif)",
              fontSize: "clamp(38px, 5.5vw, 64px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              margin: "0 0 20px",
              color: "var(--ink, #221f22)",
            }}
          >
            Direct Dispatches to Your Desk
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 19px)",
              lineHeight: 1.6,
              color: "var(--muted, #6b686b)",
              maxWidth: 620,
              margin: "0 auto 36px",
              fontWeight: 400,
            }}
          >
            Quarterly architectural briefings, enterprise cyber resilience findings, and company milestones. Zero marketing fluff, strictly editorial.
          </p>

          {/* Subscription Form */}
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            {submitted ? (
              <div
                style={{
                  padding: "16px 24px",
                  borderRadius: 8,
                  background: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  color: "#166534",
                  fontSize: 14,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span>Thank you! You are subscribed to The Resilience Memo.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  required
                  style={{
                    flex: "1 1 260px",
                    padding: "12px 18px",
                    borderRadius: 6,
                    border: "1px solid var(--border, #ebeaeb)",
                    background: "var(--surface-raised, #f9f9f9)",
                    color: "var(--ink, #221f22)",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    borderRadius: 6,
                    border: "none",
                    background: "var(--orange, #f45532)",
                    color: "#ffffff",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "opacity 0.2s ease",
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}
            <p style={{ fontSize: 12, color: "var(--muted, #6b686b)", marginTop: 12 }}>
              Published quarterly · Strictly editorial · Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* ─── What's Inside Section ─── */}
      <section style={{ padding: "64px 24px", maxWidth: 1040, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-display, serif)",
            fontSize: 28,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          What You’ll Receive Each Quarter
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          <div
            style={{
              padding: 24,
              borderRadius: 8,
              border: "1px solid var(--border, #ebeaeb)",
              background: "var(--surface-raised, #fcfcfc)",
            }}
          >
            <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, color: "var(--orange, #f45532)", marginBottom: 8 }}>
              [ BRIEFING 01 ]
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10, lineHeight: 1.3 }}>
              Autonomous Resilience Architecture
            </h3>
            <p style={{ fontSize: 14, color: "var(--muted, #6b686b)", lineHeight: 1.5, margin: 0 }}>
              Deep technical analyses on Agent Mesh™ technology, multi-vendor telemetries, and automated graph correlation.
            </p>
          </div>

          <div
            style={{
              padding: 24,
              borderRadius: 8,
              border: "1px solid var(--border, #ebeaeb)",
              background: "var(--surface-raised, #fcfcfc)",
            }}
          >
            <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, color: "var(--orange, #f45532)", marginBottom: 8 }}>
              [ BRIEFING 02 ]
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10, lineHeight: 1.3 }}>
              Outage &amp; Recovery Benchmarks
            </h3>
            <p style={{ fontSize: 14, color: "var(--muted, #6b686b)", lineHeight: 1.5, margin: 0 }}>
              Empirical telemetry studies covering backup failure frequency, silent corruption rates, and actual recovery SLAs.
            </p>
          </div>

          <div
            style={{
              padding: 24,
              borderRadius: 8,
              border: "1px solid var(--border, #ebeaeb)",
              background: "var(--surface-raised, #fcfcfc)",
            }}
          >
            <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, color: "var(--orange, #f45532)", marginBottom: 8 }}>
              [ BRIEFING 03 ]
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10, lineHeight: 1.3 }}>
              CISO &amp; Operations Playbooks
            </h3>
            <p style={{ fontSize: 14, color: "var(--muted, #6b686b)", lineHeight: 1.5, margin: 0 }}>
              Production-tested policies and automated failover runbooks for hybrid and multi-cloud enterprise estates.
            </p>
          </div>
        </div>

        {/* ─── Signpost to Company Newsroom ─── */}
        <div
          style={{
            marginTop: 48,
            padding: 24,
            borderRadius: 8,
            border: "1px solid rgba(244, 85, 50, 0.2)",
            background: "rgba(244, 85, 50, 0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
              Looking for Press Coverage &amp; Media Dispatches?
            </div>
            <div style={{ fontSize: 13, color: "var(--muted, #6b686b)" }}>
              Explore official news dispatches, external funding coverage, and the interactive broadsheet in the Company Newsroom.
            </div>
          </div>
          <Link
            href="/company/newsroom"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: 6,
              background: "var(--orange, #f45532)",
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <span>Visit Company Newsroom</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
