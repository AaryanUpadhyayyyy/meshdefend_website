"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const BackupSpineCanvas = dynamic(
  () => import("./spine/BackupSpineCanvas").then((mod) => mod.BackupSpineCanvas),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: 520,
          background: "transparent",
        }}
      />
    ),
  }
);

interface BackupStageCanvasProps {
  progress: number;
  currentBeat: 1 | 2 | 3;
  activeMorningStep: number;
  hoveredMilestone?: number;
}

export function BackupStageCanvas({
  progress,
  currentBeat,
  activeMorningStep,
  hoveredMilestone = -1,
}: BackupStageCanvasProps) {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  const useFallback = !hasWebGL;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 520,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        background: "transparent",
      }}
      aria-label="The Operations Control Spine 3D visualization"
    >
      {!useFallback ? (
        <BackupSpineCanvas
          progress={progress}
          currentBeat={currentBeat}
          activeMorningStep={activeMorningStep}
          hoveredMilestone={hoveredMilestone}
        />
      ) : (
        /* High-Craft Fallback Poster for environments without WebGL context */
        <div
          style={{
            padding: 32,
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: 4,
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          aria-hidden="true"
        >
          <div
            style={{
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "var(--muted)",
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            FIG. 1B — OPERATIONS CONTROL SPINE (POSTER FALLBACK)
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {["Commvault", "Veeam", "Dell PowerProtect Data Manager", "Dell NetWorker"].map(
              (name) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 3,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body), Inter, sans-serif",
                      fontSize: 13,
                      color: "var(--ink)",
                    }}
                  >
                    {name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "var(--orange)",
                    }}
                  >
                    → Unified Spine
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
