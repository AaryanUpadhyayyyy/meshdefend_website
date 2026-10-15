"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { OBSERVABILITY_CONTENT } from "../content";

// Dynamically import Three.js LoomCanvas with ssr: false
const LoomCanvas = dynamic(
  () => import("./loom/LoomCanvas").then((mod) => mod.LoomCanvas),
  { ssr: false, loading: () => <div className="loom-loading-placeholder" /> }
);

interface StageCanvasProps {
  progress: number;
  currentBeat: 1 | 2 | 3;
  activeView: "separate" | "unified";
}

export function StageCanvas({
  progress,
  currentBeat,
  activeView,
}: StageCanvasProps) {
  const isReducedMotion = useReducedMotion();
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  // Check WebGL availability and screen width
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }

    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkSize();
    window.addEventListener("resize", checkSize, { passive: true });
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Render WebGL canvas whenever WebGL context is available
  const useFallback = !hasWebGL;

  return (
    <div className="stage-canvas-wrapper" aria-label="The Overnight Loom 3D visualization">
      {!useFallback ? (
        <LoomCanvas
          progress={progress}
          currentBeat={currentBeat}
          activeView={activeView}
        />
      ) : (
        /* High-Craft Fallback Poster for WebGL disabled, reduced motion, or mobile */
        <div className="fallback-poster-stage" aria-hidden="true">
          {currentBeat === 1 && (
            <div className="poster-layer poster-beat-1">
              <div className="poster-caption">Fig. 1 — Six consoles, one night (poster fallback)</div>
              <div className="poster-strands-list">
                {OBSERVABILITY_CONTENT.stage.beat1.consoles.map((c) => (
                  <div key={c.source} className="poster-strand-row">
                    <span className="p-strand-name">{c.source}</span>
                    <span className="p-strand-track" />
                    <span className="p-strand-time mono-tick">{c.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentBeat === 2 && (
            <div className="poster-layer poster-beat-2">
              <div className="poster-caption">Fig. 2 — Unified visibility (poster fallback)</div>
              <div className="poster-unified-card">
                <div className="poster-threshold-bar">
                  <div className="threshold-bar-ink" style={{ width: "74%" }} />
                  <div className="threshold-bar-orange" style={{ width: "8%" }} />
                  <div className="threshold-tick" />
                </div>
                <span className="poster-note">Backup window · rising 3 nights · still within SLA</span>
              </div>
            </div>
          )}

          {currentBeat === 3 && (
            <div className="poster-layer poster-beat-3">
              <div className="poster-caption">Fig. 3 — Quiet correlation (poster fallback)</div>
              <div className="poster-quiet-card">
                <div className="quiet-pill" />
                <span className="poster-quiet-title">Backup warning · payments-db</span>
                <span className="poster-quiet-sub">Everything else: normal, no action.</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
