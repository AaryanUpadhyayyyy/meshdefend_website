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

      <style jsx>{`
        /* ─── Full-bleed ink (#221f22), 120px vertical padding ─────── */
        .handoff-ink-band {
          background: #221f22;
          color: #fefdfd;
          padding: 120px 0;
          position: relative;
          overflow: hidden;
        }

        .handoff-container {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
        }

        /* ─── Strip (top, Inter 13px, ink at 60%, white active) ────── */
        .handoff-strip {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 48px;
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          line-height: 1.4;
        }

        .strip-item {
          color: rgba(254, 253, 253, 0.6);
          white-space: nowrap;
        }

        .strip-item.is-active {
          color: #fefdfd;
          font-weight: 500;
        }

        .strip-arrow {
          color: rgba(254, 253, 253, 0.3);
          font-size: 13px;
        }

        /* ─── H2 (Cols 1-7, Instrument Serif, balance) ─────────────── */
        .handoff-h2-block {
          max-width: 680px;
          margin-bottom: 72px;
        }

        .handoff-display-h2 {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(44px, 5.4vw, 80px);
          line-height: 1.05;
          letter-spacing: -0.03em;
          text-wrap: balance;
          font-weight: 400;
          margin: 0;
          display: flex;
          flex-direction: column;
        }

        .h2-white-line {
          color: #fefdfd;
          display: block;
        }

        .h2-orange-line {
          color: var(--orange);
          font-style: italic;
          display: block;
        }

        /* ─── Giant Link (Cols 5-12, right-aligned) ────────────────── */
        .handoff-link-wrapper {
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }

        .giant-resolution-link {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-decoration: none;
          max-width: fit-content;
          cursor: pointer;
        }

        .giant-resolution-link:focus-visible {
          outline: 2px solid var(--orange);
          outline-offset: 4px;
          border-radius: 2px;
        }

        .link-title-row {
          display: inline-flex;
          align-items: baseline;
          gap: 16px;
        }

        .link-title-text {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(56px, 10vw, 148px);
          line-height: 0.92;
          letter-spacing: -0.01em;
          font-weight: 400;
          color: rgba(254, 253, 253, 0.4);
          transition: color 240ms ease;
          white-space: nowrap;
        }

        .link-title-text.is-bright {
          color: #fefdfd;
        }

        .link-arrow {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(36px, 6vw, 84px);
          line-height: 1;
          color: #fefdfd;
          transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .link-arrow.is-hovered {
          transform: translate(8px, -8px);
        }

        .link-sub-sentence {
          font-family: var(--font-body), sans-serif;
          font-size: 17px;
          line-height: 1.5;
          color: rgba(254, 253, 253, 0.7);
          margin: 20px 0 16px;
          text-wrap: pretty;
        }

        .link-label-row {
          position: relative;
          display: inline-flex;
          flex-direction: column;
        }

        .link-label-text {
          font-family: var(--font-body), sans-serif;
          font-size: 15px;
          line-height: 1.4;
          color: #fefdfd;
          font-weight: 500;
        }

        .link-label-underline {
          position: absolute;
          bottom: -2px;
          left: 0;
          height: 1px;
          width: 0;
          background: #fefdfd;
          transition: width 240ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .link-label-underline.is-hovered {
          width: 100%;
        }

        /* ─── Desktop 1px Line & Carried Chip ────────────────────────── */
        .desktop-line-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .carried-1px-line {
          position: absolute;
          left: 0;
          height: 1px;
          background: rgba(254, 253, 253, 0.3);
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 900ms cubic-bezier(0.65, 0, 0.15, 1),
            background 240ms ease;
        }

        .carried-1px-line.is-drawn {
          transform: scaleX(1);
        }

        .carried-1px-line.is-hovered {
          background: rgba(254, 253, 253, 0.6);
        }

        .carried-issue-chip {
          position: absolute;
          left: 0;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px;
          border: 1px solid rgba(254, 253, 253, 0.4);
          border-radius: 4px;
          background: #221f22;
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          color: #fefdfd;
          white-space: nowrap;
          opacity: 1;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .carried-issue-chip.is-sliding {
          transition: transform 900ms cubic-bezier(0.65, 0, 0.15, 1);
        }

        .carried-issue-chip.is-faded {
          opacity: 0;
          transition: opacity 240ms ease;
        }

        .chip-orange-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--orange);
          flex-shrink: 0;
        }

        .mobile-connector-layer {
          display: none;
        }

        /* ─── Progressive Enhancement for view() ───────────────────── */
        @supports (animation-timeline: view()) {
          /* Compatible with CSS view timeline where supported */
        }

        /* ─── prefers-reduced-motion ───────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .carried-1px-line {
            transform: scaleX(1) !important;
            transition: none !important;
          }
          .carried-issue-chip {
            display: none !important;
          }
          .link-title-text {
            color: #fefdfd !important;
            transition: none !important;
          }
          .link-arrow,
          .link-label-underline {
            transition: none !important;
          }
        }

        /* ─── Mobile (< 768px) ─────────────────────────────────────── */
        @media (max-width: 767px) {
          .handoff-ink-band {
            padding: 80px 0;
          }

          .handoff-strip {
            flex-wrap: wrap;
            gap: 8px 12px;
            margin-bottom: 32px;
          }

          .handoff-h2-block {
            margin-bottom: 40px;
          }

          .desktop-line-layer {
            display: none;
          }

          .mobile-connector-layer {
            display: block;
            margin: 32px 0 20px;
          }

          .mobile-vertical-line {
            position: relative;
            width: 1px;
            height: 64px;
            background: rgba(254, 253, 253, 0.3);
            margin-left: 20px;
          }

          .mobile-chip {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 4px 10px;
            border: 1px solid rgba(254, 253, 253, 0.4);
            border-radius: 4px;
            background: #221f22;
            font-family: var(--font-body), sans-serif;
            font-size: 13px;
            color: #fefdfd;
            white-space: nowrap;
          }

          .handoff-link-wrapper {
            justify-content: flex-start;
          }

          .link-title-text {
            font-size: clamp(44px, 12vw, 64px);
            white-space: normal;
          }

          .link-arrow {
            font-size: clamp(28px, 8vw, 40px);
          }
        }
      `}</style>
    </section>
  );
}
