"use client";

import { ReportItem } from "../content";
import { OBSERVABILITY_CONTENT } from "../content";

interface ReportPreviewProps {
  report: ReportItem;
}

export function ReportPreview({ report }: ReportPreviewProps) {
  return (
    <div className="report-preview-sheet" tabIndex={0} aria-label={`Preview of ${report.title}`}>
      <div className="preview-top-bar">
        <div className="brand-group">
          <span className="brand-mark">MeshDefend</span>
          <span className="doc-category">Resilience report</span>
        </div>
        <span className="audit-stamp">Audit-ready</span>
      </div>

      <div key={report.id} className="preview-animated-body">
        <div className="preview-heading-block">
          <h3 className="preview-title">{report.title}</h3>
          <div className="preview-audience-row">
            <span>{report.audience}</span>
            <span className="sep-dot">·</span>
            <span className="preview-time">{report.time}</span>
          </div>
        </div>

        <div className="preview-hairline-sep" />

        <div className="preview-data-rows">
          <div className="p-row">
            <span className="p-label">Estate health</span>
            <span className="p-value">{report.estateHealth}</span>
          </div>
          <div className="p-row">
            <span className="p-label">Exceptions</span>
            <span className="p-value">{report.exceptions}</span>
          </div>
          <div className="p-row">
            <span className="p-label">Recovery readiness</span>
            <span className="p-value">{report.recoveryReadiness}</span>
          </div>
          <div className="p-row">
            <span className="p-label">Actions taken &amp; approved</span>
            <span className="p-value">{report.actionsTaken}</span>
          </div>
          <div className="p-row">
            <span className="p-label">Evidence</span>
            <span className="p-value">{report.evidence}</span>
          </div>
        </div>
      </div>

      <div className="preview-footer-source">
        <span className="source-caption">
          {OBSERVABILITY_CONTENT.index.sourceLine}
        </span>
      </div>
    </div>
  );
}
