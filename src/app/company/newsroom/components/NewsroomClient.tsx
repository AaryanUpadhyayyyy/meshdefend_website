"use client";

import { VintageBroadsheetViewer } from "./VintageBroadsheetViewer";

export function NewsroomClient() {
  return (
    <div className="newsroom-editorial">
      {/* Sunset Golden Wash Ground */}
      <div className="wash" aria-hidden="true" />

      <div className="newsroom-content-layer">
        {/* Top Masthead */}
        <header className="editorial-top-masthead">
          <div className="masthead-meta-strip">
            <span>
              <span className="masthead-sunset-dot" />
              VOL. I · ISSUE 01
            </span>
            <span>BENGALURU &amp; SAN FRANCISCO</span>
            <span>OCTOBER 2026</span>
          </div>

          <h1 className="masthead-main-title">The Resilience Dispatch</h1>
          <p className="masthead-tagline">
            Official media coverage, seed capital dispatches, and architectural journals documenting MeshDefend ResOC and Agent Mesh™.
          </p>

          <nav aria-label="Journal sections">
            <a href="#sketchbook">Broadsheet Spread</a>
            <span style={{ opacity: 0.3 }}>·</span>
            <a href="#lead-story">Lead Dispatch</a>
            <span style={{ opacity: 0.3 }}>·</span>
            <a href="#plates">Plates Index</a>
            <span style={{ opacity: 0.3 }}>·</span>
            <a href="#newsletter-memo">The Resilience Memo</a>
            <span style={{ opacity: 0.3 }}>·</span>
            <a href="mailto:press@meshdefend.ai">Press Inquiries</a>
          </nav>
        </header>

        {/* The Exact Interactive Broadsheet Viewer Engine with Sunset Orange Theme & Calibrated Newspaper Ratio */}
        <VintageBroadsheetViewer />
      </div>
    </div>
  );
}
