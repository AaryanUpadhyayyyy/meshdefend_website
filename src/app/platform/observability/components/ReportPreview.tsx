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

      <style jsx>{`
        /* ─── White paper preview sheet, 1px hairline, the ONLY soft shadow on the page ─── */
        @keyframes previewContentFade {
          from {
            opacity: 0.35;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .preview-animated-body {
          animation: previewContentFade 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          display: flex;
          flex-direction: column;
        }

        .report-preview-sheet {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 32px 28px;
          box-shadow: 0 16px 40px rgba(34, 31, 34, 0.07);
          transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
        }

        [data-theme="dark"] .report-preview-sheet {
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }

        .preview-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .brand-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .brand-mark {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
        }

        .doc-category {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          color: var(--muted);
        }

        .audit-stamp {
          font-family: var(--font-body), sans-serif;
          font-size: 12px;
          color: var(--muted);
          border: 1px solid var(--border);
          padding: 2px 8px;
          border-radius: var(--radius);
        }

        .preview-heading-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .preview-title {
          font-family: var(--font-display), Georgia, serif;
          font-size: 30px;
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: var(--ink);
          font-weight: 400;
        }

        .preview-audience-row {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .preview-time {
          font-variant-numeric: tabular-nums;
        }

        .preview-hairline-sep {
          width: 100%;
          height: 1px;
          background: var(--border);
          margin: 20px 0;
        }

        .preview-data-rows {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .p-row {
          display: flex;
          flex-direction: column;
          gap: 2px;
          border-left: 1px solid var(--border);
          padding-left: 12px;
        }

        .p-label {
          font-family: var(--font-body), sans-serif;
          font-size: 12px;
          color: var(--muted);
        }

        .p-value {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          line-height: 1.45;
          color: var(--ink);
        }

        .preview-footer-source {
          margin-top: 24px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }

        .source-caption {
          font-family: var(--font-body), sans-serif;
          font-size: 12px;
          color: var(--muted);
          line-height: 1.4;
          display: block;
        }
      `}</style>
    </div>
  );
}
