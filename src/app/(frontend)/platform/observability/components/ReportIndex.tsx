"use client";

import { useState } from "react";
import { OBSERVABILITY_CONTENT, ReportItem } from "../content";
import { ReportPreview } from "./ReportPreview";

export function ReportIndex() {
  const { figCaption, h2, body, reports, process, impact } = OBSERVABILITY_CONTENT.index;
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

            {/* Fold 5: Two Distinct Outcomes Side-by-Side */}
            <div className="impact-outcomes-strip">
              {impact.outcomes.map((item) => (
                <div key={item.capability} className="impact-outcome-item">
                  <span className="impact-capability-tag">{item.capability}</span>
                  <div className="impact-metric-val">{item.metric}</div>
                  <div className="impact-metric-title">{item.label}</div>
                  <div className="impact-metric-desc">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Follows the active row */}
          <div className="index-preview-col">
            <ReportPreview report={activeReport} />
          </div>
        </div>
      </div>
    </section>
  );
}
