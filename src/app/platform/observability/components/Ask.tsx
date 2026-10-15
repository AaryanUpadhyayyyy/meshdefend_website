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

          <div className="approved-vendors-plain-row" aria-label="Supported enterprise platforms">
            {approvedVendors.map((vendor) => (
              <span key={vendor} className="plain-vendor-name">
                {vendor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
