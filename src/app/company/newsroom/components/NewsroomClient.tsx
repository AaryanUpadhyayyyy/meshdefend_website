"use client";

import { VintageBroadsheetViewer } from "./VintageBroadsheetViewer";

export function NewsroomClient() {
  return (
    <div className="newsroom-editorial">
      <div className="newsroom-content-layer">
        {/* Top Masthead */}
        <header className="editorial-top-masthead">
          <div className="masthead-meta-strip">
            <span>
              <span className="masthead-sunset-dot" />
              VOL. I · ISSUE 01
            </span>
            <span>BANGALORE &amp; ATLANTA</span>
          </div>

          <h1 className="masthead-main-title">The Resilience Dispatch</h1>
          <p className="masthead-tagline">
            Official media coverage, seed capital dispatches, and architectural journals documenting MeshDefend ResOC and Agent Mesh™.
          </p>
        </header>

        {/* The Exact Interactive Broadsheet Viewer Engine with Sunset Orange Theme & Calibrated Newspaper Ratio */}
        <VintageBroadsheetViewer />
      </div>
    </div>
  );
}
