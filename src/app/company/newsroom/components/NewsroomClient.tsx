"use client";

import { VintageBroadsheetViewer } from "./VintageBroadsheetViewer";

export function NewsroomClient() {
  return (
    <div className="newsroom-editorial">
      <div className="newsroom-content-layer">
        {/* Top Masthead */}
        <header className="editorial-top-masthead" suppressHydrationWarning>
          <div className="masthead-meta-strip">
            <span>
              <span className="masthead-sunset-dot" />
              BANGALORE &amp; ATLANTA
            </span>
          </div>

          <h1 className="masthead-main-title" suppressHydrationWarning>
            News Room
          </h1>
        </header>

        {/* The Exact Interactive Broadsheet Viewer Engine with Sunset Orange Theme & Calibrated Newspaper Ratio */}
        <VintageBroadsheetViewer />
      </div>
    </div>
  );
}
