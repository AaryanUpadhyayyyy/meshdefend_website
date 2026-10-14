"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { BackupSpineScene, BackupSpineThemeColors } from "./BackupSpineScene";

interface BackupSpineCanvasProps {
  progress: number;
  currentBeat: 1 | 2 | 3;
  activeMorningStep: number;
  hoveredMilestone?: number;
}

export function BackupSpineCanvas({
  progress,
  currentBeat,
  activeMorningStep,
  hoveredMilestone = -1,
}: BackupSpineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<BackupSpineScene | null>(null);

  const [screenTags, setScreenTags] = useState<{
    [key: string]: { x: number; y: number; visible: boolean };
  }>({});
  const [plotDims, setPlotDims] = useState({
    left: 140,
    right: 760,
    top: 56,
    bottom: 456,
    width: 620,
    height: 400,
    canvasWidth: 800,
    canvasHeight: 520,
  });

  const getThemeColors = useCallback((): BackupSpineThemeColors => {
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
    const scene = new BackupSpineScene(canvas, initialTheme);
    sceneRef.current = scene;
    scene.start();

    // Theme observer
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

  // Update target progress and state
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.targetProgress = progress;
      sceneRef.current.activeMorningStep = activeMorningStep;
      sceneRef.current.hoveredMilestone = hoveredMilestone;
    }
  }, [progress, activeMorningStep, hoveredMilestone]);

  // Pointer movement for parallax
  const handlePointerMove = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container || !sceneRef.current) return;
    const rect = container.getBoundingClientRect();
    const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    sceneRef.current.pointerNdc.set(ndcX, ndcY);
  };

  const morningHours = ["07:30", "07:45", "07:52", "08:00", "08:15"];
  const overnightHours = ["00:00", "02:00", "04:00", "06:00", "08:00"];

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 520,
        background: "transparent",
        overflow: "visible",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />

      {/* ─── DOM Projected Labels Overlay ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {/* BEAT 1: Left Feeder Vendor Labels & Milestone Titles */}
        {currentBeat === 1 && (
          <>
            {BackupSpineScene.VENDORS.map((v, idx) => {
              const pt = screenTags[`vendor_${idx}`];
              const topY = pt && pt.visible ? pt.y : plotDims.top + plotDims.height * (0.16 + idx * 0.22);

              return (
                <div
                  key={v.id}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: topY,
                    transform: "translateY(-50%)",
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--ink)",
                    background: "var(--bg)",
                    padding: "3px 8px",
                    border: "1px solid var(--border)",
                    borderRadius: 3,
                    whiteSpace: "nowrap",
                    maxWidth: 130,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    boxShadow: "0 2px 6px rgba(34,31,34,0.04)",
                  }}
                  title={v.name}
                >
                  {v.name}
                </div>
              );
            })}

            {/* Spine Milestones Labels */}
            {BackupSpineScene.MILESTONES.map((m, idx) => {
              const pt = screenTags[`milestone_${idx}`];
              if (!pt || !pt.visible) return null;

              const isHovered = hoveredMilestone === idx;

              return (
                <div
                  key={m.id}
                  style={{
                    position: "absolute",
                    left: pt.x,
                    top: idx % 2 === 0 ? pt.y - 28 : pt.y + 14,
                    transform: "translateX(-50%)",
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    fontWeight: isHovered ? 700 : 600,
                    color: isHovered
                      ? "var(--orange)"
                      : idx === 1
                      ? "var(--orange)"
                      : "var(--muted)",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    background: isHovered ? "var(--bg)" : "transparent",
                    padding: isHovered ? "2px 6px" : 0,
                    border: isHovered ? "1px solid var(--orange)" : "none",
                    borderRadius: 3,
                    transition: "all 0.18s ease",
                  }}
                >
                  {m.label}
                </div>
              );
            })}
          </>
        )}

        {/* BEAT 2: Morning Sequence 3 Pinned Tracking Cards */}
        {currentBeat === 2 && (
          <>
            {BackupSpineScene.MORNING_STAGES.map((stage, idx) => {
              const pt = screenTags[`morning_${idx}`];
              if (!pt || !pt.visible) return null;

              const isStepActive = activeMorningStep === idx;

              return (
                <div
                  key={stage.id}
                  style={{
                    position: "absolute",
                    left: pt.x,
                    top: pt.y - 48,
                    transform: "translateX(-50%)",
                    background: "var(--bg)",
                    border: isStepActive ? "1px solid var(--orange)" : "1px solid var(--border)",
                    borderLeft: isStepActive ? "2px solid var(--orange)" : "1px solid var(--border)",
                    padding: "8px 12px",
                    borderRadius: 4,
                    boxShadow: "0 6px 16px rgba(34,31,34,0.08)",
                    maxWidth: 240,
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 3,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: isStepActive ? "var(--orange)" : "var(--ink)",
                      }}
                    >
                      {stage.time}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body), Inter, sans-serif",
                        fontSize: 11,
                        color: "var(--muted)",
                        fontWeight: 500,
                      }}
                    >
                      · {stage.title}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 11.5,
                      color: "var(--ink)",
                      lineHeight: 1.35,
                    }}
                  >
                    {stage.desc}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* BEAT 3: Correlated Exceptions Foreground Callouts */}
        {currentBeat === 3 && (
          <>
            {screenTags["exception_0"]?.visible && (
              <div
                style={{
                  position: "absolute",
                  left: screenTags["exception_0"].x,
                  top: screenTags["exception_0"].y - 56,
                  transform: "translateX(-50%)",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderLeft: "2px solid var(--orange)",
                  padding: "8px 12px",
                  borderRadius: 4,
                  boxShadow: "0 8px 24px rgba(34,31,34,0.08)",
                  maxWidth: 260,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--orange)",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10,
                      color: "var(--orange)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Exception 01 · Critical
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "var(--ink)",
                    lineHeight: 1.35,
                  }}
                >
                  Snapshot lock contention · payments-db
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 11,
                    color: "var(--muted)",
                    marginTop: 2,
                  }}
                >
                  Replication lag trending toward RPO threshold
                </div>
              </div>
            )}

            {screenTags["exception_1"]?.visible && (
              <div
                style={{
                  position: "absolute",
                  left: screenTags["exception_1"].x,
                  top: screenTags["exception_1"].y + 20,
                  transform: "translateX(-50%)",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderLeft: "2px solid var(--ink)",
                  padding: "8px 12px",
                  borderRadius: 4,
                  boxShadow: "0 8px 24px rgba(34,31,34,0.08)",
                  maxWidth: 240,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--muted)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 4,
                  }}
                >
                  Exception 02 · Coverage
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  Unprotected workload drift
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 11,
                    color: "var(--muted)",
                    marginTop: 2,
                  }}
                >
                  New VM provisioned outside backup SLA group
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ─── PERSISTENT BOTTOM AXIS AT STAGE BASELINE ───────────────── */}
      <div
        style={{
          position: "absolute",
          left: plotDims.left,
          width: plotDims.width,
          top: plotDims.bottom + 8,
          borderTop: "1px solid var(--border)",
          paddingTop: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {currentBeat === 1 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 10.5,
              color: "var(--muted)",
            }}
          >
            <span>Feeder inputs (4 engines)</span>
            <span>Convergence · Operational spine</span>
            <span>Recovery readiness</span>
          </div>
        )}

        {currentBeat === 2 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 10.5,
              color: "var(--muted)",
            }}
          >
            {morningHours.map((hr) => (
              <span key={hr}>{hr}</span>
            ))}
          </div>
        )}

        {currentBeat === 3 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 10.5,
              color: "var(--muted)",
            }}
          >
            {overnightHours.map((hr) => (
              <span key={hr}>{hr}</span>
            ))}
          </div>
        )}
      </div>

      {/* ─── UNDER-FIGURE CAPTION (CROSSFADES PER BEAT) ─────────────── */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -4,
          textAlign: "center",
          fontFamily: "var(--font-body), Inter, sans-serif",
          fontSize: 13,
          color: "var(--muted)",
          pointerEvents: "none",
        }}
        aria-live="polite"
      >
        {currentBeat === 1 && (
          <span>Four backup engines converge into one governed operational spine across health, triage, and readiness.</span>
        )}
        {currentBeat === 2 && (
          <span>Overnight changes connect to backup drift and staged remediation before morning shifts arrive.</span>
        )}
        {currentBeat === 3 && (
          <span>Hundreds of routine jobs stay quiet. Only two correlated exceptions surface for operator action.</span>
        )}
      </div>
    </div>
  );
}
