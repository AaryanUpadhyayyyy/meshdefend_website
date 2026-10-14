"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { BackupSpineScene, BackupSpineThemeColors } from "./BackupSpineScene";

interface BackupSpineCanvasProps {
  progress: number;
  currentBeat: 1 | 2 | 3;
  activeMorningStep: number;
}

export function BackupSpineCanvas({
  progress,
  currentBeat,
  activeMorningStep,
}: BackupSpineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<BackupSpineScene | null>(null);

  const [screenTags, setScreenTags] = useState<{
    [key: string]: { x: number; y: number; visible: boolean };
  }>({});

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
      sceneRef.current.activeMorningStep = activeMorningStep;
    }
  }, [progress, activeMorningStep]);

  // Pointer movement for parallax
  const handlePointerMove = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container || !sceneRef.current) return;
    const rect = container.getBoundingClientRect();
    const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    sceneRef.current.pointerNdc.set(ndcX, ndcY);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 460,
        background: "var(--bg)",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
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
        {/* BEAT 1: Feeder Vendor Labels & Milestone Titles */}
        {currentBeat === 1 && (
          <>
            {BackupSpineScene.VENDORS.map((v, idx) => {
              const pt = screenTags[`vendor_${idx}`];
              if (!pt || !pt.visible) return null;

              return (
                <div
                  key={v.id}
                  style={{
                    position: "absolute",
                    left: 24, // generous left margin to avoid collision with any dot or line
                    top: Math.max(20, pt.y - 12),
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--ink)",
                    background: "var(--bg)",
                    padding: "2px 6px",
                    border: "1px solid var(--border)",
                    borderRadius: 3,
                    whiteSpace: "nowrap",
                    maxWidth: 220,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {v.name}
                </div>
              );
            })}

            {/* Spine Milestones Labels */}
            {BackupSpineScene.MILESTONES.map((m, idx) => {
              const pt = screenTags[`milestone_${idx}`];
              if (!pt || !pt.visible) return null;

              return (
                <div
                  key={m.id}
                  style={{
                    position: "absolute",
                    left: pt.x - 30,
                    top: idx % 2 === 0 ? pt.y - 32 : pt.y + 12,
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    fontWeight: 600,
                    color: idx === 1 ? "var(--orange)" : "var(--muted)",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  {m.label}
                </div>
              );
            })}
          </>
        )}

        {/* BEAT 2: Morning Sequence Interactive Nodes */}
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
                    left: pt.x - 70,
                    top: pt.y - 38,
                    background: isStepActive ? "var(--bg)" : "var(--surface)",
                    border: isStepActive ? "1px solid var(--orange)" : "1px solid var(--border)",
                    padding: "4px 8px",
                    borderRadius: 3,
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(34,31,34,0.06)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: isStepActive ? "var(--orange)" : "var(--ink)",
                    }}
                  >
                    {stage.time}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 11,
                      color: "var(--muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {stage.title}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* BEAT 3: Correlated Exception Annotations */}
        {currentBeat === 3 && (
          <>
            {screenTags["exception_0"]?.visible && (
              <div
                style={{
                  position: "absolute",
                  left: screenTags["exception_0"].x - 80,
                  top: screenTags["exception_0"].y - 42,
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderLeft: "2px solid var(--orange)",
                  padding: "6px 10px",
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(34,31,34,0.08)",
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--orange)",
                    fontWeight: 700,
                  }}
                >
                  Exception 01 · Critical
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--ink)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Snapshot lock contention · payments-db
                </div>
              </div>
            )}

            {screenTags["exception_1"]?.visible && (
              <div
                style={{
                  position: "absolute",
                  left: screenTags["exception_1"].x - 80,
                  top: screenTags["exception_1"].y + 14,
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderLeft: "2px solid var(--ink)",
                  padding: "6px 10px",
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(34,31,34,0.08)",
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: "var(--muted)",
                    fontWeight: 600,
                  }}
                >
                  Exception 02 · Coverage
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--ink)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Unprotected workload drift
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
