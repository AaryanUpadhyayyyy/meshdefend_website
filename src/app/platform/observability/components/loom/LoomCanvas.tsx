"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { LoomScene, LoomThemeColors } from "./LoomScene";

interface LoomCanvasProps {
  progress: number;
  currentBeat: 1 | 2 | 3;
  activeView: "separate" | "unified";
}

export function LoomCanvas({ progress, currentBeat }: LoomCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<LoomScene | null>(null);

  const [screenTags, setScreenTags] = useState<{
    [key: string]: { x: number; y: number; visible: boolean };
  }>({});
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [plotDims, setPlotDims] = useState({
    left: 24,
    right: 690,
    top: 52,
    bottom: 452,
    width: 666,
    height: 400,
    canvasWidth: 800,
    canvasHeight: 520,
  });

  // Read theme colors from CSS variables
  const getThemeColors = useCallback((): LoomThemeColors => {
    if (typeof window === "undefined") {
      return {
        bg: "#fefdfd",
        ink: "#221f22",
        orange: "#f45532",
        border: "#e5e2e3",
        muted: "#6b6568",
      };
    }
    const s = getComputedStyle(document.documentElement);
    return {
      bg: s.getPropertyValue("--bg").trim() || "#fefdfd",
      ink: s.getPropertyValue("--ink").trim() || "#221f22",
      orange: s.getPropertyValue("--orange").trim() || "#f45532",
      border: s.getPropertyValue("--border").trim() || "#e5e2e3",
      muted: s.getPropertyValue("--muted").trim() || "#6b6568",
    };
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initialTheme = getThemeColors();
    const scene = new LoomScene(canvas, initialTheme);
    sceneRef.current = scene;
    scene.start();

    // Listen to theme changes
    const observer = new MutationObserver(() => {
      scene.updateTheme(getThemeColors());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class", "style"],
    });

    // Resize observer
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        scene.resize(width, height);
        setPlotDims(scene.getPlotBounds());
      }
    });
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    // Sync 3D-to-2D projected points for DOM labels
    let rafId = 0;
    const syncDOM = () => {
      if (sceneRef.current) {
        const map: { [key: string]: { x: number; y: number; visible: boolean } } = {};
        sceneRef.current.screenPoints.forEach((val, key) => {
          map[key] = val;
        });
        setScreenTags(map);
        setPlotDims(sceneRef.current.getPlotBounds());
      }
      rafId = requestAnimationFrame(syncDOM);
    };
    rafId = requestAnimationFrame(syncDOM);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      ro.disconnect();
      scene.destroy();
      sceneRef.current = null;
    };
  }, [getThemeColors]);

  // Update target progress
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.targetProgress = progress;
    }
  }, [progress]);

  // Dev mode validation: compare each dot's projected screen x to the axis x for its time (tolerance 4px)
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" &&
      currentBeat === 2 &&
      sceneRef.current &&
      Math.abs(sceneRef.current.progress - progress) < 0.02
    ) {
      LoomScene.EVENTS.forEach((evt) => {
        const dotTag = screenTags[`event_${evt.strand}`];
        const axisX = plotDims.left + evt.t * plotDims.width;
        if (dotTag && dotTag.visible) {
          const diff = Math.abs(dotTag.x - axisX);
          console.assert(
            diff <= 4.0,
            `[Loom Alignment] Dot X for ${evt.name} (${dotTag.x.toFixed(1)}px) deviates from axis X (${axisX.toFixed(1)}px) by ${diff.toFixed(1)}px (tolerance: 4px)`
          );
        }
      });
    }
  }, [currentBeat, screenTags, plotDims, progress]);

  // Handle pointer interactions
  const handlePointerMove = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container || !sceneRef.current) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ndcX = (x / rect.width) * 2 - 1;
    const ndcY = -(y / rect.height) * 2 + 1;

    sceneRef.current.pointerNdc.set(ndcX, ndcY);
    sceneRef.current.updateHover(x, y);

    // Check if hovering near an event dot (within 20px)
    let foundEvent: number | null = null;
    LoomScene.EVENTS.forEach((_, idx) => {
      const dotX = plotDims.left + LoomScene.EVENTS[idx].t * plotDims.width;
      const dotY = plotDims.bottom - LoomScene.evaluateStrandValue(LoomScene.EVENTS[idx].t, idx) * plotDims.height;
      const dist = Math.hypot(x - dotX, y - dotY);
      if (dist < 22) foundEvent = idx;
    });
    setHoveredEvent(foundEvent);
  };

  const handlePointerLeave = () => {
    if (sceneRef.current) {
      sceneRef.current.pointerNdc.set(0, 0);
      sceneRef.current.hoveredStrand = -1;
    }
    setHoveredEvent(null);
  };

  const hours = useMemo(
    () => ["22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00"],
    []
  );

  return (
    <div
      ref={containerRef}
      className="loom-canvas-container"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas ref={canvasRef} className="webgl-canvas" />

      {/* ─── BEAT 1 LABELS: DIRECT STRAND LABELS AT LEFT END (INSIDE LANE) ───────── */}
      {currentBeat === 1 && (
        <div className="dom-labels-layer" aria-hidden="true">
          {LoomScene.EVENTS.map((evt) => {
            const pt = screenTags[`left_end_${evt.strand}`];
            if (!pt || !pt.visible) return null;

            return (
              <div
                key={evt.name}
                className={`lane-direct-label ${evt.strand === 0 ? "is-backup-orange" : ""}`}
                style={{
                  left: `${pt.x + 8}px`,
                  top: `${pt.y}px`,
                  transform: "translateY(-50%)",
                }}
              >
                <span className="lane-name">{evt.name}</span>
                <span className="lane-metric">· {evt.metric}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── BEAT 2 LABELS: ONE SHARED SCALE & DIRECT LABELS AT RIGHT ─ */}
      {currentBeat === 2 && (
        <div className="dom-labels-layer" aria-hidden="true">
          {/* Y-Axis Title: "Distance to threshold" sits above the axis */}
          <div
            className="y-axis-title-box"
            style={{
              left: `${plotDims.left}px`,
              top: `${Math.max(16, plotDims.top - 28)}px`,
            }}
          >
            <span>Distance to threshold</span>
          </div>

          {/* Y-Axis Tick Labels on the Left: 100%, 50%, 0% (mono 11px) */}
          <div
            className="y-axis-tick-label"
            style={{
              left: `${plotDims.left - 8}px`,
              top: `${plotDims.top}px`,
              transform: "translate(-100%, -50%)",
            }}
          >
            <span className="mono-tick">100%</span>
          </div>

          <div
            className="y-axis-tick-label"
            style={{
              left: `${plotDims.left - 8}px`,
              top: `${plotDims.top + plotDims.height * 0.5}px`,
              transform: "translate(-100%, -50%)",
            }}
          >
            <span className="mono-tick">50%</span>
          </div>

          <div
            className="y-axis-tick-label"
            style={{
              left: `${plotDims.left - 8}px`,
              top: `${plotDims.bottom}px`,
              transform: "translate(-100%, -50%)",
            }}
          >
            <span className="mono-tick">0%</span>
          </div>

          {/* SLA Threshold Label at right end of 100% line */}
          <div
            className="sla-threshold-marker"
            style={{
              left: `${plotDims.right + 10}px`,
              top: `${plotDims.top}px`,
              transform: "translateY(-50%)",
            }}
          >
            <span className="threshold-label-txt">SLA threshold</span>
          </div>

          {/* Ghost traces peak labels: "two nights ago (68%)" & "last night (80%)" */}
          {(() => {
            const pt1X = plotDims.left + 0.88 * plotDims.width;
            const pt1Y = plotDims.bottom - 0.65 * plotDims.height;
            return (
              <div
                className="ghost-trace-label"
                style={{
                  left: `${pt1X}px`,
                  top: `${pt1Y}px`,
                  transform: "translate(-100%, -100%) translateY(-4px)",
                }}
              >
                <span>two nights ago (68%)</span>
              </div>
            );
          })()}

          {(() => {
            const pt2X = plotDims.left + 0.88 * plotDims.width;
            const pt2Y = plotDims.bottom - 0.77 * plotDims.height;
            return (
              <div
                className="ghost-trace-label"
                style={{
                  left: `${pt2X}px`,
                  top: `${pt2Y}px`,
                  transform: "translate(-100%, -100%) translateY(-4px)",
                }}
              >
                <span>last night (80%)</span>
              </div>
            );
          })()}

          {/* Gap annotation between 92% line end and 100% threshold: "8% to go" */}
          <div
            className="gap-annotation-marker"
            style={{
              left: `${plotDims.right + 10}px`,
              top: `${plotDims.top + (plotDims.bottom - 0.92 * plotDims.height - plotDims.top) * 0.5}px`,
              transform: "translateY(-50%)",
            }}
          >
            <span className="gap-bracket" aria-hidden="true" />
            <span className="gap-txt mono-tick">8% to go</span>
          </div>

          {/* Backup Callout attached with leader line to orange line end */}
          {(() => {
            const endX = plotDims.right;
            const endY = plotDims.bottom - 0.92 * plotDims.height;
            const calloutRelX = -90;
            const calloutRelY = 24;

            return (
              <div
                className="backup-leader-callout-wrapper"
                style={{
                  left: `${endX}px`,
                  top: `${endY}px`,
                }}
              >
                {/* Leader Line SVG: starts at line end (0, 0) and connects to callout pill (-90, 24) */}
                <svg className="leader-line-svg" aria-hidden="true">
                  <line x1="0" y1="0" x2={calloutRelX} y2={calloutRelY} stroke="var(--orange)" strokeWidth="1" />
                  <circle cx="0" cy="0" r="2.5" fill="var(--orange)" />
                </svg>

                <div
                  className="backup-rising-callout"
                  style={{
                    transform: `translate(${calloutRelX}px, ${calloutRelY}px) translate(-100%, -50%)`,
                  }}
                >
                  <span className="callout-pill" />
                  <span className="callout-text">
                    Backup window · rising 3 nights · still within SLA
                  </span>
                </div>
              </div>
            );
          })()}

          {/* DIRECT LABELS AT RIGHT END OF EVERY LINE (RESERVED 110PX MARGIN) */}
          {LoomScene.EVENTS.map((evt) => {
            const pt = screenTags[`right_end_${evt.strand}`];
            const labelX = pt && pt.visible ? pt.x + 10 : plotDims.right + 10;
            const labelY = pt && pt.visible ? pt.y : plotDims.bottom - LoomScene.evaluateStrandValue(1.0, evt.strand) * plotDims.height;

            return (
              <div
                key={evt.name}
                className={`line-right-label ${evt.strand === 0 ? "is-backup-orange" : ""}`}
                style={{
                  left: `${labelX}px`,
                  top: `${labelY}px`,
                  transform: "translateY(-50%)",
                }}
              >
                <span className="line-name-txt">{evt.name}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── EVENT DOTS (ACTIVE IN BEAT 1 & 2): 7PX, 1PX PAPER RING ─ */}
      <div className="event-dots-layer" aria-hidden="true">
        {LoomScene.EVENTS.map((evt, idx) => {
          const pt = screenTags[`event_${idx}`];
          if (!pt || !pt.visible) return null;

          return (
            <div
              key={evt.name}
              className={`event-dot-marker ${evt.strand === 0 ? "is-backup" : ""} ${
                hoveredEvent === idx ? "is-hovered" : ""
              }`}
              style={{
                left: `${pt.x}px`,
                top: `${pt.y}px`,
              }}
              title={`${evt.name}: ${evt.time} — ${evt.event}`}
            />
          );
        })}
      </div>

      {/* ─── BEAT 3 ANNOTATIONS: TWO EXCEPTIONS ────────────────────── */}
      {currentBeat === 3 && (
        <div className="dom-labels-layer" aria-hidden="true">
          {/* Exception 1: Backup */}
          <div
            className="beat3-annotation ann-backup"
            style={{
              left: `${plotDims.right - 20}px`,
              top: `${plotDims.bottom - 0.92 * plotDims.height - 18}px`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <span className="ann-orange-tick" />
            <div className="ann-text-group">
              <span className="ann-main">Backup warning · payments-db</span>
              <span className="ann-sub">Duration threshold reached +18m</span>
            </div>
          </div>

          {/* Exception 2: Replication Lag */}
          <div
            className="beat3-annotation ann-lag"
            style={{
              left: `${plotDims.right - 20}px`,
              top: `${plotDims.bottom - 0.28 * plotDims.height + 18}px`,
              transform: "translate(-50%, 0%)",
            }}
          >
            <span className="ann-orange-tick" />
            <div className="ann-text-group">
              <span className="ann-main">Replication lag trending</span>
              <span className="ann-sub">Storage target link throughput reduced</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── EVENT HOVER CARD (DISAPPEARS ON BLUR/MOUSEOUT) ────────── */}
      {hoveredEvent !== null && LoomScene.EVENTS[hoveredEvent] && screenTags[`event_${hoveredEvent}`] && (
        <div
          className="hover-event-card"
          style={{
            left: `${screenTags[`event_${hoveredEvent}`].x}px`,
            top: `${screenTags[`event_${hoveredEvent}`].y - 14}px`,
            transform: "translate(-50%, -100%)",
          }}
          role="status"
        >
          <div className="card-top">
            <span className="event-name">{LoomScene.EVENTS[hoveredEvent].name}</span>
            <span className="event-time mono-tick">{LoomScene.EVENTS[hoveredEvent].time}</span>
          </div>
          <div className="card-desc">{LoomScene.EVENTS[hoveredEvent].event}</div>
        </div>
      )}

      {/* ─── PERSISTENT TIME AXIS AT BOTTOM (IN EVERY BEAT) ───────── */}
      <div
        className="persistent-bottom-axis"
        aria-label="Overnight timeline 22:00 to 07:00"
        style={{ top: `${plotDims.bottom + 6}px` }}
      >
        <div className="axis-ticks-row">
          {hours.map((hr, idx) => {
            const t = idx / (hours.length - 1);
            const xPos = plotDims.left + t * plotDims.width;
            const isFirst = idx === 0;
            const isLast = idx === hours.length - 1;

            return (
              <div
                key={hr}
                className={`hour-tick-item ${isFirst ? "tick-first" : ""} ${isLast ? "tick-last" : ""}`}
                style={{
                  left: `${xPos}px`,
                  transform: isFirst ? "translateX(0)" : isLast ? "translateX(-100%)" : "translateX(-50%)",
                }}
              >
                <span className="tick-pipe" />
                <span className="tick-label mono-tick">{hr}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── UNDER-FIGURE CAPTION (EXACTLY ONE INTER 13PX SENTENCE) ─── */}
      <div className="under-figure-caption-bar">
        <div className={`caption-sentence ${currentBeat === 1 ? "is-visible" : ""}`}>
          Each line is one system overnight, each with its own scale.
        </div>
        <div className={`caption-sentence ${currentBeat === 2 ? "is-visible" : ""}`}>
          Same data, one scale. Five systems are far from their limit; Backup is approaching it over three nights.
        </div>
        <div className={`caption-sentence ${currentBeat === 3 ? "is-visible" : ""}`}>
          Hundreds of signals. Two need a decision.
        </div>
      </div>

      <style jsx>{`
        .loom-canvas-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 520px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: visible;
          background: transparent;
          cursor: default;
        }

        .webgl-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        .dom-labels-layer,
        .event-dots-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
        }

        /* ─── Beat 1 Direct Left End Labels ────────────────────────── */
        .lane-direct-label {
          position: absolute;
          display: flex;
          align-items: baseline;
          gap: 6px;
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 3px 8px;
          border-radius: var(--radius);
          white-space: nowrap;
          pointer-events: none;
          box-shadow: 0 1px 4px rgba(34, 31, 34, 0.04);
        }

        .lane-direct-label.is-backup-orange {
          border-left: 2px solid var(--orange);
        }

        .lane-name {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
        }

        .lane-metric {
          font-family: var(--font-body), sans-serif;
          font-size: 12px;
          color: var(--muted);
        }

        /* ─── Beat 2 Shared Scale & Right Labels ───────────────────── */
        .y-axis-title-box {
          position: absolute;
          font-family: var(--font-body), sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: var(--muted);
          pointer-events: none;
          white-space: nowrap;
        }

        .y-axis-tick-label {
          position: absolute;
          pointer-events: none;
          white-space: nowrap;
          color: color-mix(in srgb, var(--ink) 60%, transparent);
        }

        .sla-threshold-marker {
          position: absolute;
          display: flex;
          align-items: center;
          pointer-events: none;
          z-index: 12;
        }

        .threshold-label-txt {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          color: var(--muted);
          background: var(--bg);
          padding: 2px 6px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          white-space: nowrap;
        }

        /* Ghost trace peak annotations */
        .ghost-trace-label {
          position: absolute;
          font-family: var(--font-body), sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: color-mix(in srgb, var(--ink) 45%, transparent);
          background: color-mix(in srgb, var(--bg) 90%, transparent);
          padding: 1px 5px;
          border-radius: 2px;
          pointer-events: none;
          white-space: nowrap;
        }

        /* Gap annotation "8% to go" */
        .gap-annotation-marker {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 4px;
          pointer-events: none;
          z-index: 12;
        }

        .gap-bracket {
          width: 2px;
          height: 18px;
          border-left: 2px solid var(--orange);
          opacity: 0.8;
        }

        .gap-txt {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--orange);
          font-weight: 600;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        /* Leader Line & Callout for Backup Line End */
        .backup-leader-callout-wrapper {
          position: absolute;
          pointer-events: none;
          z-index: 15;
        }

        .leader-line-svg {
          position: absolute;
          top: 0;
          left: -90px;
          width: 92px;
          height: 26px;
          overflow: visible;
        }

        .backup-rising-callout {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-left: 2px solid var(--orange);
          padding: 6px 12px;
          border-radius: var(--radius);
          box-shadow: 0 4px 16px rgba(34, 31, 34, 0.08);
          white-space: nowrap;
          pointer-events: none;
        }

        .callout-pill {
          width: 5px;
          height: 5px;
          background: var(--orange);
          border-radius: 50%;
        }

        .callout-text {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink);
        }

        /* DIRECT LABELS AT RIGHT END (INTER 13PX, INK AT 70%, BACKUP IN ORANGE) */
        .line-right-label {
          position: absolute;
          display: flex;
          align-items: center;
          pointer-events: none;
          white-space: nowrap;
          z-index: 12;
        }

        .line-right-label .line-name-txt {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: color-mix(in srgb, var(--ink) 70%, transparent);
          background: var(--bg);
          padding: 1px 6px;
          border-radius: 2px;
        }

        .line-right-label.is-backup-orange .line-name-txt {
          color: var(--orange);
          font-weight: 600;
        }

        /* ─── Event Dot Markers (7px, Ink, 1px paper ring, hover scale 1.4x over 120ms) ─── */
        .event-dot-marker {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--ink);
          box-shadow: 0 0 0 1px var(--bg);
          cursor: pointer;
          pointer-events: auto;
          transform: translate(-50%, -50%) scale(1);
          transition: transform 120ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 120ms;
          z-index: 14;
        }

        .event-dot-marker.is-backup {
          background: var(--orange);
        }

        .event-dot-marker:hover,
        .event-dot-marker.is-hovered {
          transform: translate(-50%, -50%) scale(1.4);
          box-shadow: 0 0 0 1.5px var(--bg), 0 0 8px color-mix(in srgb, var(--ink) 35%, transparent);
        }

        .event-dot-marker.is-backup:hover,
        .event-dot-marker.is-backup.is-hovered {
          box-shadow: 0 0 0 1.5px var(--bg), 0 0 10px color-mix(in srgb, var(--orange) 60%, transparent);
        }

        /* ─── Beat 3 Annotations ──────────────────────────────────── */
        .beat3-annotation {
          position: absolute;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-left: 2px solid var(--orange);
          padding: 8px 12px;
          border-radius: var(--radius);
          box-shadow: 0 4px 16px rgba(34, 31, 34, 0.08);
          white-space: nowrap;
          pointer-events: none;
          z-index: 15;
        }

        .ann-orange-tick {
          width: 5px;
          height: 5px;
          background: var(--orange);
          margin-top: 5px;
        }

        .ann-text-group {
          display: flex;
          flex-direction: column;
        }

        .ann-main {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
        }

        .ann-sub {
          font-family: var(--font-body), sans-serif;
          font-size: 12px;
          color: var(--muted);
          margin-top: 1px;
        }

        /* ─── Hover Event Card ────────────────────────────────────── */
        .hover-event-card {
          position: absolute;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 8px 12px;
          box-shadow: 0 8px 24px rgba(34, 31, 34, 0.12);
          pointer-events: none;
          z-index: 25;
          display: flex;
          flex-direction: column;
          gap: 3px;
          white-space: nowrap;
        }

        .card-top {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .event-name {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
        }

        .event-time {
          font-size: 11px;
          color: var(--muted);
        }

        .card-desc {
          font-family: var(--font-body), sans-serif;
          font-size: 12px;
          color: var(--muted);
        }

        /* ─── Persistent Bottom Time Axis (22:00 to 07:00) ─────────── */
        .persistent-bottom-axis {
          position: absolute;
          left: 0;
          right: 0;
          height: 28px;
          pointer-events: none;
        }

        .axis-ticks-row {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .hour-tick-item {
          position: absolute;
          top: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hour-tick-item.tick-first {
          align-items: flex-start;
        }

        .hour-tick-item.tick-last {
          align-items: flex-end;
        }

        .tick-pipe {
          width: 1px;
          height: 5px;
          background: var(--border);
          margin-bottom: 3px;
        }

        .tick-label {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: color-mix(in srgb, var(--ink) 60%, transparent);
          letter-spacing: -0.01em;
        }

        /* ─── Under-Figure Caption Bar (Single Inter 13px sentence) ─── */
        .under-figure-caption-bar {
          position: relative;
          height: 24px;
          width: 100%;
          display: flex;
          align-items: center;
          margin-top: auto;
          padding-top: 6px;
        }

        .caption-sentence {
          position: absolute;
          left: 0;
          right: 0;
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          line-height: 1.4;
          color: var(--muted);
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 380ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .caption-sentence.is-visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .mono-tick {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
        }
      `}</style>
    </div>
  );
}
