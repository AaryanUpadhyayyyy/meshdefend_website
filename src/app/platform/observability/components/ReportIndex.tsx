"use client";

import { useState } from "react";
import { OBSERVABILITY_CONTENT, ReportItem } from "../content";
import { ReportPreview } from "./ReportPreview";

export function ReportIndex() {
  const { figCaption, h2, body, reports, process } = OBSERVABILITY_CONTENT.index;
  const [activeReport, setActiveReport] = useState<ReportItem>(reports[0]);

  return (
    <section className="report-index-section" aria-labelledby="report-index-heading">
      <div className="container">
        {/* Section Header */}
        <div className="index-intro-block">
          <div className="fig-caption">{figCaption}</div>
          <h2 id="report-index-heading" className="index-h2">{h2}</h2>
          <p className="index-body">{body}</p>
        </div>

        {/* 12-Column Grid: 7 cols Table rows, 5 cols Paper Preview Sheet */}
        <div className="index-main-grid">
          <div className="index-table-col" role="region" aria-label="Report library">
            <div className="report-rows-container">
              {reports.map((report) => {
                const isSelected = activeReport.id === report.id;
                return (
                  <button
                    key={report.id}
                    type="button"
                    className={`report-table-row ${isSelected ? "is-selected" : ""}`}
                    onClick={() => setActiveReport(report)}
                    onMouseEnter={() => setActiveReport(report)}
                    onFocus={() => setActiveReport(report)}
                    aria-selected={isSelected}
                  >
                    <div className="row-left">
                      <span className="row-serif-title">{report.title}</span>
                      <span className="row-audience">{report.audience}</span>
                    </div>
                    <div className="row-right">
                      <span className="row-time">{report.time}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Thin Horizontal Process Line: Today vs With MeshDefend */}
            <div className="horizontal-process-strip">
              <div className="process-flow-track">
                {process.manualSteps.map((step, idx) => (
                  <div key={step} className="flow-step-node">
                    <span className="step-dot-grey" aria-hidden="true" />
                    <span className="step-text-grey">{step}</span>
                    {idx < process.manualSteps.length - 1 && (
                      <span className="flow-hairline-connector" aria-hidden="true" />
                    )}
                  </div>
                ))}
                {/* Long gap */}
                <div className="flow-long-gap" aria-hidden="true" />
                {/* Solid ink dot labelled Ready */}
                <div className="flow-step-node ready-node">
                  <span className="step-dot-ink" aria-hidden="true" />
                  <span className="step-text-ready">{process.automatedResult}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Follows the active row */}
          <div className="index-preview-col">
            <ReportPreview report={activeReport} />
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ─── Paper section, NO grey box anywhere ──────────────────── */
        .report-index-section {
          padding: 120px 0;
          background: var(--bg);
          color: var(--ink);
          border-top: 1px solid var(--border);
        }

        .index-intro-block {
          max-width: 820px;
          margin-bottom: 56px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .fig-caption {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          color: var(--muted);
          text-transform: uppercase;
        }

        .index-h2 {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(38px, 4.4vw, 60px);
          line-height: 1.0;
          letter-spacing: -0.01em;
          color: var(--ink);
          font-weight: 400;
          text-wrap: balance;
        }

        .index-body {
          font-family: var(--font-body), sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: var(--muted);
          text-wrap: pretty;
        }

        /* ─── 12-Column Grid ───────────────────────────────────────── */
        .index-main-grid {
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 56px;
          align-items: start;
        }

        .index-table-col {
          display: flex;
          flex-direction: column;
        }

        .report-rows-container {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--border);
        }

        /* Rows 72px tall, hairline separators, serif title 44px, audience in Inter 15px */
        .report-table-row {
          min-height: 72px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 18px 0;
          border-bottom: 1px solid var(--border);
          background: transparent;
          text-align: left;
          cursor: pointer;
          transition: padding 0.22s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.2s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.2s;
          width: 100%;
        }

        .report-table-row:hover,
        .report-table-row:focus-visible {
          padding-left: 14px;
          padding-right: 14px;
          background: color-mix(in srgb, var(--ink) 2%, transparent);
          outline: none;
        }

        .report-table-row.is-selected {
          padding-left: 14px;
          padding-right: 14px;
          background: color-mix(in srgb, var(--ink) 3.5%, transparent);
          border-left: 2px solid var(--orange);
        }

        .row-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .row-serif-title {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(30px, 3.2vw, 44px);
          line-height: 1.05;
          letter-spacing: -0.01em;
          color: var(--ink);
          font-weight: 400;
        }

        .row-audience {
          font-family: var(--font-body), sans-serif;
          font-size: 15px;
          color: var(--muted);
        }

        .row-right {
          flex-shrink: 0;
        }

        .row-time {
          font-family: var(--font-body), sans-serif;
          font-size: 14px;
          color: var(--muted);
          font-variant-numeric: tabular-nums;
        }

        /* ─── Thin Horizontal Process Line ─────────────────────────── */
        .horizontal-process-strip {
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }

        .process-flow-track {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px 16px;
        }

        .flow-step-node {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .step-dot-grey {
          width: 5px;
          height: 5px;
          background: var(--border);
          border-radius: 50%;
        }

        .step-text-grey {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          color: var(--muted);
          white-space: nowrap;
        }

        .flow-hairline-connector {
          width: 16px;
          height: 1px;
          background: var(--border);
        }

        .flow-long-gap {
          flex: 1;
          min-width: 32px;
          height: 1px;
          background: var(--border);
        }

        .ready-node {
          gap: 8px;
        }

        .step-dot-ink {
          width: 6px;
          height: 6px;
          background: var(--ink);
          border-radius: 50%;
        }

        .step-text-ready {
          font-family: var(--font-body), sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
        }

        /* ─── Preview Column ───────────────────────────────────────── */
        .index-preview-col {
          position: sticky;
          top: 120px;
        }

        @media (max-width: 1024px) {
          .index-main-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .index-preview-col {
            position: static;
          }

          .report-index-section {
            padding: 72px 0;
          }
        }
      `}</style>
    </section>
  );
}
