"use client";

export function ObservabilityActionSection() {
  return (
    <section className="action-handoff-section" aria-labelledby="action-title">
      <div className="container">
        {/* Sequence Progress Strip */}
        <div className="sequence-strip" role="navigation" aria-label="Resilience loop progression">
          <div className="step-node active">
            <span className="step-num">01</span>
            <span className="step-text">See what matters</span>
            <span className="active-pill" aria-hidden="true" />
          </div>
          <span className="strip-arrow" aria-hidden="true">→</span>
          <div className="step-node">
            <span className="step-num">02</span>
            <span className="step-text">Resolve what needs action</span>
          </div>
          <span className="strip-arrow" aria-hidden="true">→</span>
          <div className="step-node">
            <span className="step-num">03</span>
            <span className="step-text">Learn from what happened</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="section-head">
          <div className="figure-caption">Fig. 4 — Operational handoff</div>
          <h2 id="action-title" className="display-h2">
            You&apos;ve found what needs attention. What happens next?
          </h2>
        </div>

        {/* Continuity Flow: 1px hairline carries the issue chip into Incident Resolution */}
        <div className="handoff-stage">
          {/* Incoming thread carrying the chip */}
          <div className="carrier-track" aria-hidden="true">
            <div className="carrier-line" />
            <div className="carrier-chip-wrapper">
              <div className="issue-chip">
                <span className="chip-tick" />
                <span className="chip-text">payments-db · recovery risk: at risk</span>
              </div>
            </div>
            <div className="carrier-line-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Incident Resolution Container (one of the 2 max bordered cards on the page) */}
          <div className="incident-card">
            <div className="incident-card-header">
              <div className="card-badge">NEXT CAPABILITY</div>
              <span className="module-title">Incident Resolution</span>
            </div>

            <div className="incident-card-body">
              <h3 className="incident-h3">
                Agentic root cause isolation, human-approved fix proposals.
              </h3>
              <p className="incident-desc">
                When correlation flags a compound recovery risk, MeshDefend doesn&apos;t just
                leave an alert on your screen. It traces configuration lineage across ITSM,
                proposes validated remediations, and awaits authorized operator approval.
              </p>
            </div>

            <div className="incident-card-footer">
              <a
                href="/platform#incident-resolution"
                className="btn btn-secondary action-btn"
              >
                <span>See how MeshDefend takes action</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .action-handoff-section {
          padding: 120px 0;
          background: var(--bg);
          color: var(--ink);
          border-top: 1px solid var(--border);
        }

        /* ─── Sequence Progress Strip ──────────────────────────────── */
        .sequence-strip {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 56px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
        }

        .step-node {
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          color: var(--muted);
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          white-space: nowrap;
        }

        .step-node.active {
          color: var(--ink);
          font-weight: 600;
        }

        .step-num {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
        }

        .active-pill {
          width: 5px;
          height: 5px;
          background: var(--orange);
          display: inline-block;
          border-radius: 50%;
        }

        .strip-arrow {
          color: var(--border);
          font-size: 14px;
        }

        .section-head {
          max-width: 760px;
          margin-bottom: 48px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .figure-caption {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          color: var(--muted);
        }

        .display-h2 {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(34px, 3.8vw, 56px);
          line-height: 1.06;
          font-weight: 400;
          letter-spacing: -0.03em;
          color: var(--ink);
        }

        /* ─── Continuity Flow Stage ────────────────────────────────── */
        .handoff-stage {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: 48px;
          align-items: center;
          margin-top: 16px;
        }

        .carrier-track {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        .carrier-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .carrier-chip-wrapper {
          flex-shrink: 0;
        }

        .issue-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-left: 2px solid var(--orange);
          box-shadow: 0 4px 16px rgba(34, 31, 34, 0.06);
        }

        .chip-tick {
          width: 5px;
          height: 5px;
          background: var(--orange);
          flex-shrink: 0;
        }

        .chip-text {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink);
        }

        .carrier-line-arrow {
          color: var(--muted);
          display: flex;
          align-items: center;
        }

        /* ─── Incident Resolution Card ─────────────────────────────── */
        .incident-card {
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 36px 32px;
          background: var(--surface-raised);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .incident-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-badge {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--muted);
        }

        .module-title {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          font-weight: 600;
          color: var(--ink);
        }

        .incident-h3 {
          font-family: var(--font-body), sans-serif;
          font-size: 20px;
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: -0.015em;
          color: var(--ink);
          margin-bottom: 8px;
        }

        .incident-desc {
          font-family: var(--font-body), sans-serif;
          font-size: 15px;
          line-height: 1.6;
          color: var(--muted);
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          padding: 12px 20px;
        }

        /* ─── Mobile Responsiveness (<1024px, 390px) ──────────────── */
        @media (max-width: 1024px) {
          .handoff-stage {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .carrier-track {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .carrier-line {
            display: none;
          }

          .action-handoff-section {
            padding: 72px 0;
          }
        }
      `}</style>
    </section>
  );
}
