"use client";

import { useState } from "react";

interface ReportItem {
  id: string;
  title: string;
  audience: string;
  cadence: string;
  summary: string;
  health: string;
  exceptionsCount: string;
  readiness: string;
  actions: string;
  evidence: string;
}

const REPORTS: ReportItem[] = [
  {
    id: "daily-brief",
    title: "Daily protection brief",
    audience: "Operations",
    cadence: "ready 06:00",
    summary: "24-hour estate delta across Commvault, Veeam, Dell PowerProtect.",
    health: "99.8% protected (2,410 of 2,414 workloads within RPO)",
    exceptionsCount: "2 flagged: payments-db backup SLA drift; replication lag",
    readiness: "Production tier-1 instant recovery validated",
    actions: "1 automated restart proposal pending approval",
    evidence: "Immutable job logs signed at 05:45 UTC",
  },
  {
    id: "weekly-posture",
    title: "Weekly resilience posture",
    audience: "Leadership",
    cadence: "Monday 08:00",
    summary: "Executive resilience health, SLA compliance trends, capacity forecast.",
    health: "Zero critical RTO breaches across 7 continuous days",
    exceptionsCount: "3 anomalies caught and reconciled before SLA breach",
    readiness: "Multi-region failover dry-run passed (score 96/100)",
    actions: "4 configuration changes approved and cross-referenced to RFCs",
    evidence: "Cross-vendor telemetry audit trail archived",
  },
  {
    id: "compliance-pack",
    title: "Compliance evidence pack",
    audience: "Compliance and audit",
    cadence: "always current",
    summary: "Continuous control verification, audit-ready data retention attestations.",
    health: "100% policy-bound coverage across tier-1 financial databases",
    exceptionsCount: "Zero unapproved configuration modifications",
    readiness: "Cryptographic immutability attested across target storage",
    actions: "Human sign-offs logged with dual-custody verification",
    evidence: "SOC 2 Type II and ISO 27001 mapping ledger ready",
  },
  {
    id: "board-summary",
    title: "Board summary",
    audience: "Board",
    cadence: "monthly",
    summary: "Macro risk posture, recovery guarantee metric, ransomware containment stance.",
    health: "Enterprise resilience index: Low systemic risk",
    exceptionsCount: "100% critical applications meet recovery commitments",
    readiness: "Isolated air-gap clean room restore verified",
    actions: "Annual business continuity milestone achieved",
    evidence: "Board-level compliance declaration signed",
  },
];

export function ObservabilityReportingSection() {
  const [selectedReport, setSelectedReport] = useState<ReportItem>(REPORTS[0]);

  return (
    <section className="reporting-section" aria-labelledby="reporting-title">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="section-head">
          <div className="figure-caption">Fig. 3 — Editorial report library</div>
          <h2 id="reporting-title" className="display-h2">
            The report doesn&apos;t start when someone asks for it. It&apos;s already current.
          </h2>
          <p className="body-lead">
            Operational data from every platform becomes reports for operations,
            leadership, compliance and auditors, on a schedule, without anyone
            compiling it by hand.
          </p>
        </div>

        {/* 7/5 Editorial Layout: Report Index + 3D Paper Sheet Preview */}
        <div className="reporting-grid">
          {/* Left: Typographic Report Index */}
          <div className="report-index-col" role="region" aria-label="Available reports">
            <div className="index-header-row">
              <span className="col-lbl">REPORT TITLE</span>
              <span className="col-lbl">AUDIENCE</span>
              <span className="col-lbl text-right">CADENCE</span>
            </div>

            <div className="report-rows-list">
              {REPORTS.map((report) => {
                const isSelected = selectedReport.id === report.id;
                return (
                  <button
                    key={report.id}
                    type="button"
                    className={`report-row ${isSelected ? "selected" : ""}`}
                    onClick={() => setSelectedReport(report)}
                    onMouseEnter={() => setSelectedReport(report)}
                    onFocus={() => setSelectedReport(report)}
                    aria-selected={isSelected}
                  >
                    <span className="report-title">{report.title}</span>
                    <span className="report-audience">{report.audience}</span>
                    <span className="report-cadence">{report.cadence}</span>
                  </button>
                );
              })}
            </div>

            {/* Contrast Strip */}
            <div className="contrast-strip">
              <div className="contrast-line manual">
                <span className="contrast-marker" aria-hidden="true" />
                <span className="contrast-text">
                  <strong>Today:</strong> export from each console, reconcile in a spreadsheet, format, send.
                </span>
              </div>
              <div className="contrast-line ready">
                <span className="contrast-marker accent" aria-hidden="true" />
                <span className="contrast-text">
                  <strong>With MeshDefend:</strong> ready.
                </span>
              </div>
            </div>

            {/* Three Short Principles */}
            <div className="principles-row">
              <div className="principle-item">
                <span className="p-dot" />
                <span>Scheduled or on demand</span>
              </div>
              <div className="principle-item">
                <span className="p-dot" />
                <span>Same evidence as operational view</span>
              </div>
              <div className="principle-item">
                <span className="p-dot" />
                <span>A view for each audience</span>
              </div>
            </div>
          </div>

          {/* Right: Paper-Sheet Preview with CSS-3D Tilt */}
          <div className="preview-stage-col">
            <div className="paper-tilt-wrapper">
              <div className="paper-sheet" tabIndex={0} aria-label={`Preview of ${selectedReport.title}`}>
                <div className="paper-masthead">
                  <div className="paper-brand">
                    <span className="paper-badge">MeshDefend</span>
                    <span className="paper-tag">RESILIENCE BRIEF</span>
                  </div>
                  <span className="paper-stamp">AUDIT READY</span>
                </div>

                <div className="paper-title-area">
                  <h3 className="paper-title">{selectedReport.title}</h3>
                  <div className="paper-meta">
                    <span>Audience: {selectedReport.audience}</span>
                    <span>·</span>
                    <span className="tabular-time">{selectedReport.cadence}</span>
                  </div>
                </div>

                <div className="paper-divider" />

                <div className="paper-sections-list">
                  <div className="paper-section-row">
                    <span className="sec-lbl">Estate health</span>
                    <span className="sec-val">{selectedReport.health}</span>
                  </div>
                  <div className="paper-section-row">
                    <span className="sec-lbl">Exceptions</span>
                    <span className="sec-val">{selectedReport.exceptionsCount}</span>
                  </div>
                  <div className="paper-section-row">
                    <span className="sec-lbl">Recovery readiness</span>
                    <span className="sec-val">{selectedReport.readiness}</span>
                  </div>
                  <div className="paper-section-row">
                    <span className="sec-lbl">Actions taken & approved</span>
                    <span className="sec-val">{selectedReport.actions}</span>
                  </div>
                  <div className="paper-section-row">
                    <span className="sec-lbl">Evidence</span>
                    <span className="sec-val">{selectedReport.evidence}</span>
                  </div>
                </div>

                <div className="paper-footer">
                  <span className="source-line">
                    Generated from live data across Commvault, Veeam, Dell PowerProtect (sample)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .reporting-section {
          padding: 120px 0;
          background: var(--bg);
          color: var(--ink);
          border-top: 1px solid var(--border);
        }

        .section-head {
          max-width: 820px;
          margin-bottom: 56px;
          display: flex;
          flex-direction: column;
          gap: 18px;
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

        .body-lead {
          font-family: var(--font-body), sans-serif;
          font-size: 16px;
          line-height: 1.65;
          color: var(--muted);
        }

        .reporting-grid {
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 48px;
          align-items: start;
        }

        /* ─── Typographic Report Index ─────────────────────────────── */
        .report-index-col {
          display: flex;
          flex-direction: column;
        }

        .index-header-row {
          display: grid;
          grid-template-columns: 3fr 2fr 1.5fr;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 4px;
        }

        .col-lbl {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--muted);
        }

        .text-right {
          text-align: right;
        }

        .report-rows-list {
          display: flex;
          flex-direction: column;
        }

        .report-row {
          display: grid;
          grid-template-columns: 3fr 2fr 1.5fr;
          align-items: baseline;
          padding: 20px 8px;
          border-bottom: 1px solid var(--border);
          background: transparent;
          text-align: left;
          cursor: pointer;
          transition: background 0.15s, padding-left 0.15s, border-color 0.15s;
          width: 100%;
        }

        .report-row:hover,
        .report-row:focus-visible {
          background: var(--surface-raised);
          padding-left: 14px;
          outline: none;
        }

        .report-row.selected {
          border-left: 2px solid var(--orange);
          background: var(--surface-raised);
          padding-left: 14px;
        }

        .report-title {
          font-family: var(--font-display), Georgia, serif;
          font-size: 26px;
          line-height: 1.15;
          color: var(--ink);
          letter-spacing: -0.02em;
        }

        .report-audience {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          color: var(--muted);
        }

        .report-cadence {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
          text-align: right;
          font-variant-numeric: tabular-nums;
        }

        /* ─── Contrast Strip ───────────────────────────────────────── */
        .contrast-strip {
          margin-top: 36px;
          padding: 16px 20px;
          border: 1px solid var(--border);
          background: var(--surface-raised);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .contrast-line {
          display: flex;
          align-items: baseline;
          gap: 10px;
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          color: var(--ink);
        }

        .contrast-line.manual {
          color: var(--muted);
        }

        .contrast-marker {
          width: 4px;
          height: 4px;
          background: var(--muted);
          flex-shrink: 0;
        }

        .contrast-marker.accent {
          background: var(--orange);
        }

        /* ─── Three Short Principles ───────────────────────────────── */
        .principles-row {
          display: flex;
          flex-wrap: wrap;
          gap: 18px 28px;
          margin-top: 24px;
        }

        .principle-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.03em;
        }

        .p-dot {
          width: 4px;
          height: 4px;
          background: var(--border);
          border-radius: 50%;
        }

        /* ─── Paper-Sheet Preview (CSS-3D Tilt) ─────────────────────── */
        .preview-stage-col {
          position: sticky;
          top: 100px;
          perspective: 1200px;
        }

        .paper-tilt-wrapper {
          transform-style: preserve-3d;
          transition: transform 0.48s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .paper-tilt-wrapper:hover {
          transform: rotateX(2.5deg) rotateY(-2.5deg) translateY(-4px);
        }

        .paper-sheet {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 32px 28px;
          box-shadow: 0 12px 36px rgba(34, 31, 34, 0.06);
          position: relative;
        }

        [data-theme="dark"] .paper-sheet {
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
        }

        .paper-masthead {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .paper-brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .paper-badge {
          font-family: var(--font-body), sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--ink);
        }

        .paper-tag {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.06em;
        }

        .paper-stamp {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
          border: 1px solid var(--border);
          padding: 2px 6px;
          letter-spacing: 0.08em;
        }

        .paper-title {
          font-family: var(--font-display), Georgia, serif;
          font-size: 26px;
          line-height: 1.15;
          margin-bottom: 6px;
          color: var(--ink);
        }

        .paper-meta {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
          display: flex;
          gap: 6px;
        }

        .tabular-time {
          font-variant-numeric: tabular-nums;
        }

        .paper-divider {
          width: 100%;
          height: 1px;
          background: var(--border);
          margin: 20px 0;
        }

        .paper-sections-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .paper-section-row {
          display: flex;
          flex-direction: column;
          gap: 2px;
          border-left: 1px solid var(--border);
          padding-left: 12px;
        }

        .sec-lbl {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          color: var(--muted);
          text-transform: uppercase;
        }

        .sec-val {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          line-height: 1.45;
          color: var(--ink);
        }

        .paper-footer {
          margin-top: 24px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }

        .source-line {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted);
          line-height: 1.4;
          display: block;
        }

        /* ─── Mobile Responsiveness (<1024px, 390px) ──────────────── */
        @media (max-width: 1024px) {
          .reporting-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .preview-stage-col {
            position: static;
          }

          .reporting-section {
            padding: 72px 0;
          }

          .report-row {
            grid-template-columns: 1fr;
            gap: 4px;
            padding: 16px 8px;
          }

          .report-cadence {
            text-align: left;
          }

          .index-header-row {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
