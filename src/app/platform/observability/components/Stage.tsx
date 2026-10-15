"use client";

import { useRef, useState, useEffect } from "react";
import { useStageProgress } from "../hooks/useStageProgress";
import { StageBeats } from "./StageBeats";
import { StageCanvas } from "./StageCanvas";
import { OBSERVABILITY_CONTENT } from "../content";

export function Stage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useStageProgress(containerRef);
  const [activeView, setActiveView] = useState<"separate" | "unified">("separate");

  // Determine current beat from scroll progress thirds
  // Beat 1: 0..0.28, Beat 2: 0.28..0.62, Beat 3: 0.62..0.90, Release: 0.90..1.0
  const currentBeat: 1 | 2 | 3 =
    progress < 0.28 ? 1 : progress < 0.62 ? 2 : 3;

  // Keep segmented control view in sync with scroll
  useEffect(() => {
    if (progress < 0.28) {
      setActiveView("separate");
    } else {
      setActiveView("unified");
    }
  }, [progress]);

  // Jump scrub between 0.0 and 0.50 with a smooth tween when toggle is clicked
  const handleToggleView = (view: "separate" | "unified") => {
    setActiveView(view);
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const scrollableRange = container.offsetHeight - window.innerHeight;

    const targetP = view === "separate" ? 0.0 : 0.50;
    const targetScrollY = containerTop + targetP * scrollableRange;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  return (
    <section ref={containerRef} id="observability" className="stage-400vh-track">
      {/* 100svh sticky container covering Folds 1-3 */}
      <div className="stage-sticky-viewport">
        <div className="container stage-inner-container">
          {/* Top Eyebrow Header */}
          <div className="stage-top-meta">
            <div className="stage-eyebrow">
              <span className="eyebrow-bullet" aria-hidden="true" />
              <span>{OBSERVABILITY_CONTENT.header.eyebrow}</span>
            </div>
            <div className="stage-progress-indicator mono-tick">
              BEAT 0{currentBeat} / 03 · PROGRESS {Math.round(progress * 100)}%
            </div>
          </div>

          {/* 12-Column Grid: Text on Cols 1-5, Canvas on Cols 6-12 */}
          <div className="stage-grid">
            <div className="stage-text-col">
              <StageBeats
                currentBeat={currentBeat}
                activeView={activeView}
                onToggleView={handleToggleView}
              />
            </div>
            <div className="stage-canvas-col">
              <StageCanvas
                progress={progress}
                currentBeat={currentBeat}
                activeView={activeView}
              />
            </div>
          </div>
        </div>

        {/* Continuity 1px Hairline at stage exit */}
        <div className="stage-exit-hairline" aria-hidden="true" />
      </div>
    </section>
  );
}
