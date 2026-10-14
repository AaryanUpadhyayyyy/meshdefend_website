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

        {/* 6 Consoles Summary in Beat 1 text column */}
        <div className="beat1-consoles-summary anim-item">
          <div className="consoles-summary-label">Six parallel overnight streams:</div>
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

      <style jsx>{`
        .stage-beats-column {
          position: relative;
          width: 100%;
          min-height: 480px;
          display: flex;
          align-items: center;
        }

        .beat-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 18px;
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
          transition: opacity 380ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 440ms cubic-bezier(0.16, 1, 0.3, 1),
            visibility 440ms;
        }

        /* Coming from future (below) when scrolling down */
        .beat-content.is-future {
          transform: translateY(32px);
          opacity: 0;
          visibility: hidden;
        }

        /* Active in viewport */
        .beat-content.is-active {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
          visibility: visible;
        }

        /* Past (above) when scrolled down past */
        .beat-content.is-past {
          transform: translateY(-28px);
          opacity: 0;
          visibility: hidden;
        }

        /* Staggered typography animation for incoming elements */
        .beat-content .anim-item {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 460ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }

        .beat-content.is-past .anim-item {
          opacity: 0;
          transform: translateY(-18px);
          transition: opacity 280ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .beat-content.is-active .anim-item {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stagger delays for incoming children */
        .beat-content.is-active .anim-item:nth-child(1) {
          transition-delay: 50ms;
        }
        .beat-content.is-active .anim-item:nth-child(2) {
          transition-delay: 130ms;
        }
        .beat-content.is-active .anim-item:nth-child(3) {
          transition-delay: 210ms;
        }
        .beat-content.is-active .anim-item:nth-child(4) {
          transition-delay: 290ms;
        }

        /* Mono captions allowed only on figure captions and time-axis ticks */
        .fig-caption {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          color: var(--muted);
          text-transform: uppercase;
        }

        .mono-tick {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.05em;
          color: var(--muted);
          text-transform: uppercase;
        }

        .stage-display-h1 {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(44px, 4.8vw, 68px);
          line-height: 1.0;
          letter-spacing: -0.01em;
          color: var(--ink);
          text-wrap: balance;
          font-weight: 400;
        }

        .stage-display-h2 {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(34px, 3.8vw, 54px);
          line-height: 1.0;
          letter-spacing: -0.01em;
          color: var(--ink);
          text-wrap: balance;
          font-weight: 400;
        }

        .stage-hook,
        .stage-openingFact,
        .stage-opening-fact {
          font-family: var(--font-body), sans-serif;
          font-size: 17px;
          line-height: 1.5;
          color: var(--ink);
          font-weight: 500;
          text-wrap: pretty;
        }

        .stage-body {
          font-family: var(--font-body), sans-serif;
          font-size: 15px;
          line-height: 1.6;
          color: var(--muted);
          text-wrap: pretty;
        }

        /* ─── Defect 6 Fix: Lead-in must be single color ink at 70% ─── */
        .single-color-lead-in {
          font-family: var(--font-body), sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
          color: color-mix(in srgb, var(--ink) 70%, transparent);
          letter-spacing: 0;
        }

        /* ─── Beat 1 Consoles Summary ──────────────────────────────── */
        .beat1-consoles-summary {
          margin-top: 12px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .consoles-summary-label {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          color: var(--muted);
        }

        .consoles-tags-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .console-meta-chip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 8px;
          border-left: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .c-source {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          color: var(--ink);
        }

        /* ─── Segmented Control Bar (Beat 2) ───────────────────────── */
        .stage-segmented-bar {
          margin-bottom: 8px;
        }

        .segmented-toggle {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 3px;
          background: var(--bg);
        }

        .seg-tab {
          padding: 8px 16px;
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
          border-radius: calc(var(--radius) - 2px);
          transition: background 0.22s cubic-bezier(0.22, 1, 0.36, 1),
            color 0.22s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }

        .seg-tab.active {
          background: var(--ink);
          color: var(--bg);
          font-weight: 600;
        }

        .seg-tab:focus-visible {
          outline: 2px solid var(--orange);
          outline-offset: 1px;
        }

        /* ─── Beat 3 Quiet Note ────────────────────────────────────── */
        .beat3-quiet-note {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }

        .quiet-pill {
          width: 5px;
          height: 5px;
          background: var(--border);
          border-radius: 50%;
        }

        .quiet-msg {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          color: var(--muted);
        }

        @media (max-width: 900px) {
          .consoles-tags-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
