"use client";

import { useState } from "react";

export function ObservabilityHeroStage() {
  const [activeView, setActiveView] = useState<"separate" | "unified">("separate");

  return (
    <div id="observability" className="observability-hero-stage">
      {/* ─── STAGE HEADER / EYEBROW ───────────────────────────────── */}
      <section className="stage-intro-header">
        <div className="container">
          <div className="stage-eyebrow-row">
            <span className="eyebrow-text">
              <span className="eyebrow-bullet" aria-hidden="true" />
              Platform · Unified Resilience Observability
            </span>
            <span className="sample-data-tag">SAMPLE DATA</span>
          </div>
        </div>
      </section>

      {/* ─── FOLD 1: VISIBILITY PROBLEM ───────────────────────────── */}
      <section className="fold fold-1" aria-labelledby="fold1-title">
        <div className="container">
          <div className="grid-7-5">
            <div className="editorial-col">
              <div className="figure-caption">Fig. 1 — Six consoles, one night</div>
              <h1 id="fold1-title" className="display-h1">
                Resilience visibility is fragmented.
              </h1>
              <p className="hook-line">
                The morning routine: open the backup console, then storage, then cloud,
                then the ITSM queue, and try to piece together what happened overnight.
              </p>
              <p className="body-lead">
                Hybrid enterprises rely on multiple backup, storage, cloud, ITSM, CMDB,
                and security systems, each with its own console, data model, and terminology.
              </p>
            </div>

            <div className="visual-col">
              <div className="consoles-stack" aria-label="Fragmented overnight consoles">
                {/* Console 1: Backup */}
                <div className="console-tile">
                  <div className="console-tile-header">
                    <span className="console-source">BACKUP · VEEAM</span>
                    <span className="console-time">02:31</span>
                  </div>
                  <div className="console-tile-body">
                    <span className="status-indicator warning" />
                    <span className="status-text">Job completed with warnings</span>
                  </div>
                </div>

                {/* Console 2: Storage */}
                <div className="console-tile">
                  <div className="console-tile-header">
                    <span className="console-source">STORAGE · DATADOMAIN</span>
                    <span className="console-time">02:28</span>
                  </div>
                  <div className="console-tile-body">
                    <span className="status-indicator ok" />
                    <span className="status-text">Replication lag · within threshold</span>
                  </div>
                </div>

                {/* Console 3: ITSM */}
                <div className="console-tile">
                  <div className="console-tile-header">
                    <span className="console-source">ITSM · SERVICENOW</span>
                    <span className="console-time">02:14</span>
                  </div>
                  <div className="console-tile-body">
                    <span className="status-indicator ok" />
                    <span className="status-text">Change approved · config update</span>
                  </div>
                </div>

                {/* Console 4: CMDB */}
                <div className="console-tile">
                  <div className="console-tile-header">
                    <span className="console-source">CMDB · ASSET REPOSITORY</span>
                    <span className="console-time">01:45</span>
                  </div>
                  <div className="console-tile-body">
                    <span className="status-indicator ok" />
                    <span className="status-text">payments-db · 3 dependent applications</span>
                  </div>
                </div>

                {/* Console 5: Security */}
                <div className="console-tile">
                  <div className="console-tile-header">
                    <span className="console-source">SECURITY · VULNERABILITY SCAN</span>
                    <span className="console-time">00:12</span>
                  </div>
                  <div className="console-tile-body">
                    <span className="status-indicator ok" />
                    <span className="status-text">Scan completed · no findings</span>
                  </div>
                </div>

                {/* Joined Synthesis Result */}
                <div className="synthesis-strip" role="region" aria-label="Overnight correlation">
                  <div className="synthesis-label">SYNTHESIS · DISCONNECTED TRAIL</div>
                  <div className="synthesis-flow">
                    <span className="flow-step">payments-db</span>
                    <span className="flow-sep">→</span>
                    <span className="flow-step">config changed 02:14</span>
                    <span className="flow-step warning">backup warning 02:31</span>
                    <span className="flow-step">replication lag rising</span>
                    <span className="flow-sep">→</span>
                    <span className="flow-risk">recovery risk: at risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOLD 2: UNIFIED VISIBILITY ───────────────────────────── */}
      <section className="fold fold-2" aria-labelledby="fold2-title">
        <div className="container">
          {/* Segmented Control Bar */}
          <div className="segmented-control-bar">
            <div
              className="segmented-control"
              role="tablist"
              aria-label="Observability display mode"
            >
              <button
                type="button"
                role="tab"
                id="tab-separate"
                aria-selected={activeView === "separate"}
                aria-controls="panel-separate"
                className={`seg-btn ${activeView === "separate" ? "active" : ""}`}
                onClick={() => setActiveView("separate")}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") setActiveView("unified");
                }}
              >
                Separate consoles
              </button>
              <button
                type="button"
                role="tab"
                id="tab-unified"
                aria-selected={activeView === "unified"}
                aria-controls="panel-unified"
                className={`seg-btn ${activeView === "unified" ? "active" : ""}`}
                onClick={() => setActiveView("unified")}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") setActiveView("separate");
                }}
              >
                Unified view
              </button>
            </div>
            <span className="illustrative-tag">illustrative · detects and alerts</span>
          </div>

          <div className="grid-7-5">
            <div className="editorial-col">
              <div className="figure-caption">Fig. 2 — The unified cable</div>
              <h2 id="fold2-title" className="display-h2">
                Unified Resilience Observability
              </h2>
              <p className="opening-fact">
                Every platform says healthy. One is drifting toward its threshold.
              </p>
              <p className="body-lead">
                MeshDefend unifies these fragmented views into a common resilience view,
                giving business, infrastructure, and security teams shared visibility to see
                risk clearly, coordinate faster, and act with confidence.
              </p>
            </div>

            <div className="visual-col">
              {activeView === "separate" ? (
                <div
                  id="panel-separate"
                  role="tabpanel"
                  aria-labelledby="tab-separate"
                  className="view-panel separate-view"
                >
                  <div className="vendor-status-row">
                    <div className="vendor-card">
                      <div className="vendor-head">
                        <span className="vendor-name">Commvault</span>
                        <span className="status-badge ok">Healthy</span>
                      </div>
                      <div className="vendor-sub">All jobs completed within SLA</div>
                    </div>

                    <div className="vendor-card accent-card">
                      <div className="vendor-head">
                        <span className="vendor-name">Veeam</span>
                        <span className="status-badge ok">Healthy</span>
                      </div>
                      <div className="trend-callout">
                        <div className="trend-bar-track">
                          <div className="trend-bar-fill" style={{ width: "88%" }} />
                        </div>
                        <span className="trend-label">
                          Backup window · rising 3 nights · still within SLA
                        </span>
                      </div>
                    </div>

                    <div className="vendor-card">
                      <div className="vendor-head">
                        <span className="vendor-name">Dell PowerProtect</span>
                        <span className="status-badge ok">Healthy</span>
                      </div>
                      <div className="vendor-sub">Storage deduplication 98.4%</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  id="panel-unified"
                  role="tabpanel"
                  aria-labelledby="tab-unified"
                  className="view-panel unified-view"
                >
                  <div className="unified-lenses-panel">
                    <div className="lens-row">
                      <div className="lens-meta">
                        <span className="lens-num">01</span>
                        <span className="lens-name">Business Lens</span>
                      </div>
                      <div className="lens-content">
                        <span className="lens-focus">payments-db</span>
                        <span className="lens-desc">3 critical dependent client applications affected</span>
                      </div>
                    </div>

                    <div className="lens-row highlight-lens">
                      <div className="lens-meta">
                        <span className="lens-num">02</span>
                        <span className="lens-name">Infrastructure Lens</span>
                      </div>
                      <div className="lens-content">
                        <span className="lens-focus">Backup window rising · 3 nights consecutive</span>
                        <span className="lens-desc">
                          Projected SLA breach tonight at 03:15 without storage rebalance
                        </span>
                      </div>
                    </div>

                    <div className="lens-row">
                      <div className="lens-meta">
                        <span className="lens-num">03</span>
                        <span className="lens-name">Security Lens</span>
                      </div>
                      <div className="lens-content">
                        <span className="lens-focus">Configuration delta verified</span>
                        <span className="lens-desc">Matched to approved ServiceNow RFC-88421</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOLD 3: ALERT FATIGUE ─────────────────────────────────── */}
      <section className="fold fold-3" aria-labelledby="fold3-title">
        <div className="container">
          <div className="grid-7-5">
            <div className="editorial-col">
              <div className="lead-in">More visibility should not mean more noise.</div>
              <h2 id="fold3-title" className="display-h2">
                Start the day with what needs action, not another wall of alerts.
              </h2>
              <p className="body-lead">
                Every platform keeps reporting. MeshDefend correlates those signals
                first, so normal activity stays quiet and you see only the exceptions that
                need a decision, each with the reason attached.
              </p>
            </div>

            <div className="visual-col">
              <div className="correlation-stage">
                <div className="field-meta">
                  <span className="field-count">612 SIGNALS OVERNIGHT</span>
                  <span className="field-status">610 NOISE QUIETED</span>
                </div>

                <div className="signal-matrix" aria-label="Correlated signals field">
                  {/* Subtle quiet dots simulating normal activity */}
                  <div className="dots-grid" aria-hidden="true">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <span key={i} className="quiet-signal-dot" />
                    ))}
                  </div>

                  {/* Two actionable exceptions */}
                  <div className="actionable-exceptions">
                    <div className="exception-item">
                      <span className="exception-tick" />
                      <div className="exception-content">
                        <span className="exception-title">Backup warning · payments-db</span>
                        <span className="exception-sub">
                          Duration threshold reached +18m · root cause: storage IO saturation
                        </span>
                      </div>
                    </div>

                    <div className="exception-item">
                      <span className="exception-tick" />
                      <div className="exception-content">
                        <span className="exception-title">Replication lag trending</span>
                        <span className="exception-sub">
                          Dell PowerProtect DataDomain target link throughput reduced
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="stage-quiet-anchor">
                  <span className="anchor-line" aria-hidden="true" />
                  <span className="quiet-text">Everything else: normal, no action.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Continuity Hairline leading into Fold 4 */}
      <div className="stage-release-line container" aria-hidden="true">
        <div className="vertical-thread" />
      </div>

      <style jsx>{`
        .observability-hero-stage {
          background: var(--bg);
          color: var(--ink);
          position: relative;
        }

        .stage-intro-header {
          padding-top: 56px;
          padding-bottom: 24px;
        }

        .stage-eyebrow-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          padding-bottom: 16px;
        }

        .eyebrow-text {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .eyebrow-bullet {
          width: 6px;
          height: 6px;
          background: var(--orange);
          display: inline-block;
        }

        .sample-data-tag,
        .illustrative-tag {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--muted);
        }

        .fold {
          padding: 120px 0;
          position: relative;
        }

        .grid-7-5 {
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 48px;
          align-items: start;
        }

        .editorial-col {
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

        .display-h1 {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(48px, 5.2vw, 80px);
          line-height: 0.98;
          font-weight: 400;
          letter-spacing: -0.035em;
          color: var(--ink);
        }

        .display-h2 {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(34px, 3.8vw, 56px);
          line-height: 1.05;
          font-weight: 400;
          letter-spacing: -0.03em;
          color: var(--ink);
        }

        .hook-line,
        .opening-fact {
          font-family: var(--font-body), sans-serif;
          font-size: 18px;
          line-height: 1.5;
          color: var(--ink);
          font-weight: 500;
        }

        .lead-in {
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          color: var(--muted);
        }

        .body-lead {
          font-family: var(--font-body), sans-serif;
          font-size: 16px;
          line-height: 1.65;
          color: var(--muted);
        }

        /* ─── Console Tiles (Fold 1) ──────────────────────────────── */
        .consoles-stack {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .console-tile {
          padding: 14px 18px;
          border-left: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: var(--surface-raised);
          transition: border-color 0.2s;
        }

        .console-tile:hover {
          border-left-color: var(--ink);
        }

        .console-tile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .console-source {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          color: var(--muted);
        }

        .console-time {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
          font-variant-numeric: tabular-nums;
        }

        .console-tile-body {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-indicator {
          width: 5px;
          height: 5px;
          flex-shrink: 0;
        }

        .status-indicator.ok {
          background: var(--muted);
        }

        .status-indicator.warning {
          background: var(--orange);
        }

        .status-text {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          color: var(--ink);
        }

        .synthesis-strip {
          margin-top: 16px;
          padding: 14px 16px;
          border: 1px solid var(--border);
          background: var(--bg);
        }

        .synthesis-label {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
          margin-bottom: 8px;
          letter-spacing: 0.06em;
        }

        .synthesis-flow {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px 10px;
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          color: var(--ink);
        }

        .flow-step.warning {
          color: var(--orange);
          font-weight: 600;
        }

        .flow-sep {
          color: var(--muted);
        }

        .flow-risk {
          color: var(--orange);
          font-weight: 600;
          border-bottom: 1px solid var(--orange);
          padding-bottom: 1px;
        }

        /* ─── Segmented Control Bar (Fold 2) ───────────────────────── */
        .segmented-control-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }

        .segmented-control {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 3px;
          background: var(--surface-raised);
        }

        .seg-btn {
          padding: 8px 18px;
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
          border-radius: calc(var(--radius) - 2px);
          transition: background 0.22s cubic-bezier(0.22, 1, 0.36, 1),
            color 0.22s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }

        .seg-btn.active {
          background: var(--bg);
          color: var(--ink);
          box-shadow: 0 1px 4px rgba(34, 31, 34, 0.08);
          font-weight: 600;
        }

        .seg-btn:focus-visible {
          outline: 2px solid var(--orange);
          outline-offset: 1px;
        }

        .vendor-status-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .vendor-card {
          padding: 16px 20px;
          border: 1px solid var(--border);
          background: var(--surface-raised);
        }

        .vendor-card.accent-card {
          border-left: 2px solid var(--orange);
        }

        .vendor-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .vendor-name {
          font-family: var(--font-body), sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
        }

        .status-badge.ok {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
        }

        .vendor-sub {
          font-size: 13px;
          color: var(--muted);
        }

        .trend-callout {
          margin-top: 8px;
        }

        .trend-bar-track {
          width: 100%;
          height: 3px;
          background: var(--border);
          margin-bottom: 6px;
        }

        .trend-bar-fill {
          height: 100%;
          background: var(--orange);
        }

        .trend-label {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--orange);
          font-weight: 500;
        }

        .unified-lenses-panel {
          border: 1px solid var(--border);
          background: var(--surface-raised);
        }

        .lens-row {
          padding: 18px 20px;
          border-bottom: 1px solid var(--border);
        }

        .lens-row:last-child {
          border-bottom: none;
        }

        .lens-row.highlight-lens {
          border-left: 2px solid var(--orange);
          background: var(--bg);
        }

        .lens-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .lens-num {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
        }

        .lens-name {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--ink);
        }

        .lens-focus {
          font-family: var(--font-body), sans-serif;
          font-size: 14px;
          font-weight: 600;
          display: block;
          color: var(--ink);
        }

        .lens-desc {
          font-size: 13px;
          color: var(--muted);
          display: block;
          margin-top: 2px;
        }

        /* ─── Alert Fatigue (Fold 3) ───────────────────────────────── */
        .correlation-stage {
          border: 1px solid var(--border);
          padding: 24px;
          background: var(--surface-raised);
        }

        .field-meta {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
          margin-bottom: 16px;
        }

        .dots-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 8px;
          margin-bottom: 20px;
          opacity: 0.18;
        }

        .quiet-signal-dot {
          width: 4px;
          height: 4px;
          background: var(--ink);
          border-radius: 50%;
        }

        .actionable-exceptions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .exception-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 14px;
          background: var(--bg);
          border-left: 2px solid var(--orange);
          border-bottom: 1px solid var(--border);
        }

        .exception-tick {
          width: 6px;
          height: 6px;
          background: var(--orange);
          margin-top: 6px;
          flex-shrink: 0;
        }

        .exception-title {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 600;
          display: block;
          color: var(--ink);
        }

        .exception-sub {
          font-size: 12px;
          color: var(--muted);
          display: block;
          margin-top: 2px;
        }

        .stage-quiet-anchor {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }

        .anchor-line {
          width: 24px;
          height: 1px;
          background: var(--border);
        }

        .quiet-text {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          color: var(--muted);
        }

        /* ─── Release Line ────────────────────────────────────────── */
        .stage-release-line {
          height: 80px;
          display: flex;
          justify-content: center;
        }

        .vertical-thread {
          width: 1px;
          height: 100%;
          background: var(--border);
        }

        /* ─── Mobile Responsiveness (<1024px, 390px) ──────────────── */
        @media (max-width: 1024px) {
          .grid-7-5 {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .fold {
            padding: 72px 0;
          }
        }
      `}</style>
    </div>
  );
}
