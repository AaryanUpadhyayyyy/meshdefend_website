"use client";

import { OBSERVABILITY_CONTENT } from "../content";

interface StageBeatsProps {
  currentBeat: 1 | 2 | 3;
  activeView: "separate" | "unified";
  onToggleView: (view: "separate" | "unified") => void;
}

export function StageBeats({
  currentBeat,
  activeView,
  onToggleView,
}: StageBeatsProps) {
  const { beat1, beat2, beat3 } = OBSERVABILITY_CONTENT.stage;

  const getBeatState = (beatIndex: 1 | 2 | 3) => {
    if (currentBeat === beatIndex) return "is-active";
    if (currentBeat > beatIndex) return "is-past";
    return "is-future";
  };

  return (
    <div className="stage-beats-column">
      {/* ─── BEAT 1 OVERLAY (FOLD 1) ──────────────────────────────── */}
      <div
        className={`beat-content beat-1 ${getBeatState(1)}`}
        aria-hidden={currentBeat !== 1}
      >
        <h1 className="stage-display-h1 anim-item">{beat1.h1}</h1>
        <p className="stage-hook anim-item">{beat1.hook}</p>
        <p className="stage-body anim-item">{beat1.body}</p>

        {/* Consoles Summary in Beat 1 text column */}
        <div className="beat1-consoles-summary anim-item">
          <div className="consoles-summary-label">{beat1.consolesLabel}</div>
          <div className="consoles-tags-grid">
            {beat1.consoles.map((c) => (
              <div key={c.source} className="console-meta-chip">
                <span className="c-source">{c.source}</span>
                <span className="c-time mono-tick">{c.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── BEAT 2 OVERLAY (FOLD 2) ──────────────────────────────── */}
      <div
        className={`beat-content beat-2 ${getBeatState(2)}`}
        aria-hidden={currentBeat !== 2}
      >
        {/* Segmented Control sits above Beat 2 */}
        <div className="stage-segmented-bar anim-item">
          <div
            className="segmented-toggle"
            role="tablist"
            aria-label="Observability display mode"
          >
            <button
              type="button"
              role="tab"
              id="seg-separate"
              aria-selected={activeView === "separate"}
              aria-controls="panel-separate"
              className={`seg-tab ${activeView === "separate" ? "active" : ""}`}
              onClick={() => onToggleView("separate")}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") onToggleView("unified");
              }}
            >
              {beat2.toggle.separate}
            </button>
            <button
              type="button"
              role="tab"
              id="seg-unified"
              aria-selected={activeView === "unified"}
              aria-controls="panel-unified"
              className={`seg-tab ${activeView === "unified" ? "active" : ""}`}
              onClick={() => onToggleView("unified")}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") onToggleView("separate");
              }}
            >
              {beat2.toggle.unified}
            </button>
          </div>
        </div>

        <h2 className="stage-display-h2 anim-item">{beat2.h2}</h2>
        <p className="stage-opening-fact anim-item">{beat2.openingFact}</p>
        <p className="stage-body anim-item">{beat2.body}</p>
      </div>

      {/* ─── BEAT 3 OVERLAY (FOLD 3) ──────────────────────────────── */}
      <div
        className={`beat-content beat-3 ${getBeatState(3)}`}
        aria-hidden={currentBeat !== 3}
      >
        {/* Single color: ink at 70% */}
        <div className="single-color-lead-in anim-item">{beat3.leadIn}</div>
        <h2 className="stage-display-h2 anim-item">{beat3.h2}</h2>
        <p className="stage-body anim-item">{beat3.body}</p>

        <div className="beat3-quiet-note anim-item">
          <span className="quiet-pill" aria-hidden="true" />
          <span className="quiet-msg">{beat3.quietLine}</span>
        </div>
      </div>
    </div>
  );
}
