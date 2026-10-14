"use client";

import { OBSERVABILITY_CONTENT } from "../content";

export function Ask() {
  const { h2, body, primaryCta, secondaryCta, approvedVendors } =
    OBSERVABILITY_CONTENT.ask;

  return (
    <section className="ask-paper-section" aria-labelledby="ask-heading">
      <div className="container">
        <div className="ask-content-block">
          <h2 id="ask-heading" className="ask-display-h2">
            {h2}
          </h2>

          <p className="ask-body-paragraph">{body}</p>

          <div className="ask-button-actions">
            <a href={primaryCta.href} className="btn btn-primary">
              {primaryCta.label}
            </a>
            <a href={secondaryCta.href} className="btn btn-secondary">
              {secondaryCta.label}
            </a>
          </div>

          {/* Plain row of six approved vendor names (13px, ink 60%, generous spacing, no list, no ready labels, no bullets) */}
          <div className="approved-vendors-plain-row" aria-label="Supported enterprise platforms">
            {approvedVendors.map((vendor) => (
              <span key={vendor} className="plain-vendor-name">
                {vendor}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ─── Paper section. NO list, NO Ready labels, NO bullets ───── */
        .ask-paper-section {
          padding: 140px 0 160px;
          background: var(--bg);
          color: var(--ink);
          border-top: 1px solid var(--border);
        }

        .ask-content-block {
          max-width: 820px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .ask-display-h2 {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(42px, 5vw, 72px);
          line-height: 1.0;
          letter-spacing: -0.03em;
          color: var(--ink);
          font-weight: 400;
          text-wrap: balance;
        }

        .ask-body-paragraph {
          font-family: var(--font-body), sans-serif;
          font-size: 18px;
          line-height: 1.6;
          color: var(--muted);
          text-wrap: pretty;
          max-width: 640px;
        }

        .ask-button-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          margin-top: 8px;
        }

        /* ─── One plain row of the six approved vendor names (13px, ink 60%, generous spacing) ─── */
        .approved-vendors-plain-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 20px 36px;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
        }

        .plain-vendor-name {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          color: color-mix(in srgb, var(--ink) 60%, transparent);
          letter-spacing: -0.005em;
          white-space: nowrap;
          transition: color 180ms cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
        }

        .plain-vendor-name:hover {
          color: var(--ink);
        }

        @media (max-width: 900px) {
          .ask-paper-section {
            padding: 80px 0 100px;
          }

          .approved-vendors-plain-row {
            gap: 14px 24px;
          }

          .ask-button-actions {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </section>
  );
}
