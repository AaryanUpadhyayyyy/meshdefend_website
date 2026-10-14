"use client";

export function ObservabilityCTASection() {
  return (
    <section className="observability-cta-section" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-grid">
          <div className="cta-editorial">
            <div className="figure-caption">Fig. 5 — Proof on your data</div>
            <h2 id="cta-title" className="display-h2">
              See your own estate in one view.
            </h2>
            <p className="cta-lead">
              Bring the consoles you check every morning. We will show you the same
              overnight story as one view, and the report that comes with it.
            </p>

            <div className="cta-actions">
              <a href="/demo" className="btn btn-primary">
                Book a demo
              </a>
              <a href="/demo" className="btn btn-secondary">
                See your estate in one view
              </a>
            </div>

            <div className="cta-assurance-row">
              <div className="assurance-item">
                <span className="assurance-bullet" aria-hidden="true" />
                <span>Zero agent installation required</span>
              </div>
              <div className="assurance-item">
                <span className="assurance-bullet" aria-hidden="true" />
                <span>Read-only API connectors</span>
              </div>
              <div className="assurance-item">
                <span className="assurance-bullet" aria-hidden="true" />
                <span>Sample report generated in 30 minutes</span>
              </div>
            </div>
          </div>

          <div className="cta-editorial-meta">
            <div className="estate-summary-box">
              <div className="box-header">
                <span className="box-lbl">SUPPORTED CONSOLES</span>
                <span className="box-val">SAMPLE SETUP</span>
              </div>
              <div className="vendor-list-col">
                <div className="v-row">
                  <span className="v-name">Commvault Complete</span>
                  <span className="v-status">Ready</span>
                </div>
                <div className="v-row">
                  <span className="v-name">Veeam Backup &amp; Replication</span>
                  <span className="v-status">Ready</span>
                </div>
                <div className="v-row">
                  <span className="v-name">Dell PowerProtect Data Manager</span>
                  <span className="v-status">Ready</span>
                </div>
                <div className="v-row">
                  <span className="v-name">Dell NetWorker</span>
                  <span className="v-status">Ready</span>
                </div>
                <div className="v-row">
                  <span className="v-name">Dell PowerProtect DataDomain</span>
                  <span className="v-status">Ready</span>
                </div>
                <div className="v-row">
                  <span className="v-name">ServiceNow ITSM &amp; CMDB</span>
                  <span className="v-status">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .observability-cta-section {
          padding: 120px 0 140px;
          background: var(--bg);
          color: var(--ink);
          border-top: 1px solid var(--border);
        }

        .cta-grid {
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 64px;
          align-items: center;
        }

        .cta-editorial {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .figure-caption {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          color: var(--muted);
        }

        .display-h2 {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(38px, 4.4vw, 64px);
          line-height: 1.02;
          font-weight: 400;
          letter-spacing: -0.03em;
          color: var(--ink);
        }

        .cta-lead {
          font-family: var(--font-body), sans-serif;
          font-size: 18px;
          line-height: 1.6;
          color: var(--muted);
          max-width: 600px;
        }

        .cta-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          margin-top: 16px;
        }

        .cta-assurance-row {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }

        .assurance-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
        }

        .assurance-bullet {
          width: 4px;
          height: 4px;
          background: var(--orange);
          display: inline-block;
        }

        /* ─── Estate Summary Box ──────────────────────────────────── */
        .estate-summary-box {
          border: 1px solid var(--border);
          padding: 28px 24px;
          background: var(--surface-raised);
        }

        .box-header {
          display: flex;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 16px;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.06em;
        }

        .vendor-list-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .v-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0;
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
        }

        .v-name {
          color: var(--ink);
        }

        .v-status {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
        }

        /* ─── Mobile Responsiveness (<1024px, 390px) ──────────────── */
        @media (max-width: 1024px) {
          .cta-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .observability-cta-section {
            padding: 72px 0 96px;
          }

          .cta-actions {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </section>
  );
}
