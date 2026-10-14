"use client";

import { useRef, useState } from "react";
import { useStageProgress } from "@/app/platform/observability/hooks/useStageProgress";
import { BackupStageBeats } from "./BackupStageBeats";
import { BackupStageCanvas } from "./BackupStageCanvas";

export function BackupStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useStageProgress(containerRef);
  const [activeMorningStep, setActiveMorningStep] = useState<number>(0);

  // Beat 1: 0..0.30, Beat 2: 0.30..0.64, Beat 3: 0.64..1.0
  const currentBeat: 1 | 2 | 3 =
    progress < 0.30 ? 1 : progress < 0.64 ? 2 : 3;

  const handleSelectMorningStep = (step: number) => {
    setActiveMorningStep(step);
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const scrollableRange = container.offsetHeight - window.innerHeight;

    // Map step 0 -> 0.35, step 1 -> 0.47, step 2 -> 0.58
    const targetP = 0.35 + step * 0.11;
    const targetScrollY = containerTop + targetP * scrollableRange;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id="operations-spine"
      style={{
        position: "relative",
        height: "240vh",
        background: "var(--bg)",
        color: "var(--ink)",
      }}
    >
      {/* 100svh sticky container covering Folds 1-3 */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "96px 0 24px",
          overflow: "hidden",
          background: "var(--bg)",
        }}
      >
        <div
          className="container"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top Eyebrow Meta Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--border)",
              paddingBottom: 14,
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--orange)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body), Inter, sans-serif",
                  fontSize: 13,
                  color: "var(--muted)",
                }}
              >
                Platform · Backup Operations
              </span>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
                letterSpacing: "0.06em",
              }}
            >
              BEAT 0{currentBeat} / 03 · PROGRESS {Math.round(progress * 100)}%
            </div>
          </div>

          {/* 12-Column Grid: Text on Cols 1-5 (5fr), Canvas on Cols 6-12 (7fr) */}
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "5fr 7fr",
              gap: 36,
              alignItems: "center",
              minHeight: 0,
            }}
            className="backup-stage-grid"
          >
            {/* Left 5 Cols: Beats Content */}
            <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
              <BackupStageBeats
                currentBeat={currentBeat}
                activeMorningStep={activeMorningStep}
                onSelectMorningStep={handleSelectMorningStep}
              />
            </div>

            {/* Right 7 Cols: 3D WebGL Canvas */}
            <div style={{ position: "relative", height: "100%", minHeight: 440 }}>
              <BackupStageCanvas
                progress={progress}
                currentBeat={currentBeat}
                activeMorningStep={activeMorningStep}
              />
            </div>
          </div>
        </div>

        {/* 1px Hairline at Stage Exit */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "var(--border)",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
