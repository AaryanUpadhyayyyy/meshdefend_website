"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export function Handoff() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  // Animation lifecycle: "idle" | "drawing" | "completed"
  const [animStage, setAnimStage] = useState<"idle" | "drawing" | "completed">("idle");
  const [isHovered, setIsHovered] = useState(false);

  // Line coordinates (from viewport left edge to first letter of "Incident Resolution")
  const [lineCoords, setLineCoords] = useState<{ targetX: number; targetY: number } | null>(null);

  // Measure pixel-exact endpoint at the first letter 'I' of "Incident Resolution"
  const updateCoords = useCallback(() => {
    if (!sectionRef.current || !titleTextRef.current) return;
    const sRect = sectionRef.current.getBoundingClientRect();
    const tRect = titleTextRef.current.getBoundingClientRect();

    // Distance from section left (viewport left) to the first letter 'I'
    const targetX = Math.max(0, tRect.left - sRect.left);
    // Vertical center of the word "Incident Resolution" relative to the section
    const targetY = tRect.top - sRect.top + tRect.height * 0.5;

    setLineCoords({ targetX, targetY });
  }, []);

  useEffect(() => {
    updateCoords();
    window.addEventListener("resize", updateCoords, { passive: true });
    return () => window.removeEventListener("resize", updateCoords);
  }, [updateCoords]);

  // Motion triggers ONCE when band is 40% in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimStage("completed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.38) {
          updateCoords();
          setAnimStage("drawing");
          observer.disconnect();

          // After 900ms line draw and chip slide, fade chip and brighten title over 240ms
          const timer = setTimeout(() => {
            setAnimStage("completed");
          }, 900);

          return () => clearTimeout(timer);
        }
      },
      { threshold: [0.38, 0.45] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [updateCoords]);

  // Chip width helper (default ~230px)
  const chipWidth = 230;
  const chipSlideX = lineCoords ? Math.max(0, lineCoords.targetX - chipWidth - 12) : 0;

  return (
    <section
      ref={sectionRef}
      id="incident-resolution"
      className="handoff-ink-band"
      aria-labelledby="handoff-h2-title"
    >
      <div className="container handoff-container">
        {/* ─── Strip (top, Inter 13px, ink at 60%, no mono) ─────────── */}
        <div className="handoff-strip" role="navigation" aria-label="Incident resolution progression">
          <span className="strip-item is-active">See what matters</span>
          <span className="strip-arrow" aria-hidden="true">→</span>
          <span className="strip-item">Resolve what needs action</span>
          <span className="strip-arrow" aria-hidden="true">→</span>
          <span className="strip-item">Learn from what happened</span>
        </div>

        {/* ─── H2 (two lines, Instrument Serif, balance) ────────────── */}
        <div className="handoff-h2-block">
          <h2 id="handoff-h2-title" className="handoff-display-h2">
            <span className="h2-white-line">You&apos;ve found what needs attention.</span>
            <span className="h2-orange-line">What happens next?</span>
          </h2>
        </div>

        {/* ─── Asymmetric Giant Link (Cols 5-12, bottom-right) ──────── */}
        <div className="handoff-link-wrapper">
          <a
            href="/platform/incident-resolution"
            className="giant-resolution-link"
            aria-label="Incident Resolution: see how MeshDefend takes action"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            <div className="link-title-row">
              <span
                ref={titleTextRef}
                className={`link-title-text ${animStage === "completed" ? "is-bright" : ""}`}
              >
                Incident Resolution
              </span>
              <span className={`link-arrow ${isHovered ? "is-hovered" : ""}`} aria-hidden="true">
                ↗
              </span>
            </div>

            <p className="link-sub-sentence">
              From the signal to a proposed fix, with a person approving it.
            </p>

            <div className="link-label-row">
              <span className="link-label-text">See how MeshDefend takes action</span>
              <span className={`link-label-underline ${isHovered ? "is-hovered" : ""}`} aria-hidden="true" />
            </div>
          </a>
        </div>
      </div>

      {/* ─── Desktop 1px Line & Carried Chip ─────────────────────────── */}
      {lineCoords && (
        <div className="desktop-line-layer" aria-hidden="true">
          <div
            className={`carried-1px-line ${animStage !== "idle" ? "is-drawn" : ""} ${
              isHovered ? "is-hovered" : ""
            }`}
            style={{
              top: `${lineCoords.targetY}px`,
              width: `${lineCoords.targetX}px`,
            }}
          />

          <div
            ref={chipRef}
            className={`carried-issue-chip ${animStage === "drawing" ? "is-sliding" : ""} ${
              animStage === "completed" ? "is-faded" : ""
            }`}
            style={{
              top: `${lineCoords.targetY}px`,
              transform:
                animStage === "idle"
                  ? "translate(0, -50%)"
                  : `translate(${chipSlideX}px, -50%)`,
            }}
          >
            <span className="chip-orange-dot" />
            <span className="chip-text">payments-db · recovery risk: at risk</span>
          </div>
        </div>
      )}

      {/* ─── Mobile Vertical Line & Chip (< 768px) ─────────────────── */}
      <div className="mobile-connector-layer" aria-hidden="true">
        <div className="mobile-vertical-line">
          <div className="mobile-chip">
            <span className="chip-orange-dot" />
            <span className="chip-text">payments-db · recovery risk: at risk</span>
          </div>
        </div>
      </div>
    </section>
  );
}
