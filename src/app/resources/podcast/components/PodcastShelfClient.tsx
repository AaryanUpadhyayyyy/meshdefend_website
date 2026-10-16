"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PODCAST_EPISODES } from "../podcastData";
import { Podcast3DScene } from "./Podcast3DScene";

export function PodcastShelfClient() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mode, setMode] = useState<"hero" | "detail" | "opening" | "closing">("hero");
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

  const activeEpisode = PODCAST_EPISODES[selectedIndex];

  const handleNext = useCallback(() => {
    if (mode === "detail") return;
    setSelectedIndex((prev) => (prev + 1) % PODCAST_EPISODES.length);
  }, [mode]);

  const handlePrev = useCallback(() => {
    if (mode === "detail") return;
    setSelectedIndex((prev) => (prev - 1 + PODCAST_EPISODES.length) % PODCAST_EPISODES.length);
  }, [mode]);

  const handleOpenDetail = useCallback(() => {
    setMode("opening");
    setTimeout(() => {
      setMode("detail");
    }, 700);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setMode("closing");
    setTimeout(() => {
      setMode("hero");
    }, 700);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mode === "detail") {
        e.preventDefault();
        handleCloseDetail();
      } else if (mode === "hero") {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNext();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrev();
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpenDetail();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode, handleNext, handlePrev, handleOpenDetail, handleCloseDetail]);

  return (
    <div
      className={`experience mode-${mode === "hero" ? "hero" : "detail"} ${
        mode === "opening" ? "is-opening" : ""
      }`}
      id="experience"
    >
      {/* ── Top Masthead / Hero Editorial Header ── */}
      <header className="masthead">
        <div className="masthead__main">
          <div className="masthead__pill">
            <span className="masthead__pill-dot" />
            <span>Video Podcast Series · Recorded Episodes</span>
          </div>
          <h1 className="masthead__title">The Resilience Ledger</h1>
          <p className="masthead__deck">
            Unfiltered conversations with enterprise infrastructure leaders and resilience architects on AI operations, autonomous recovery, and cyber defense truth.
          </p>
          <div className="masthead__prompt">
            <span className="masthead__prompt-icon">✦</span>
            <span>Select any episode below to launch archival broadcast</span>
          </div>
        </div>

        <div className="masthead__meta">
          <span className="masthead__badge">ARCHIVAL DISPATCHES</span>
          <p className="issue">AI Infrastructure &amp; Cyber Resilience</p>
        </div>
      </header>

      {/* ── 3D WebGL Canvas (Fixed Sunset Landscape Background) ── */}
      <Podcast3DScene
        key="podcast-shelf-scene-v14"
        selectedIndex={selectedIndex}
        onSelectIndex={setSelectedIndex}
        mode={mode}
        onOpenDetail={handleOpenDetail}
        onCloseDetail={handleCloseDetail}
        hoveredIndex={hoveredIndex}
        setHoveredIndex={setHoveredIndex}
        pointerPos={pointerPos}
        setPointerPos={setPointerPos}
      />

      {/* ── Hover Tooltip Label following cursor ── */}
      {hoveredIndex >= 0 && mode === "hero" && (
        <div
          className="pointer-label"
          style={{
            left: `${pointerPos.x}px`,
            top: `${pointerPos.y}px`,
          }}
        >
          <span className="pointer-label-index">
            {PODCAST_EPISODES[hoveredIndex].episodeNumber} · {hoveredIndex === selectedIndex ? "Click to Play" : "Click to View"}
          </span>
          <span className="pointer-label-title">
            {PODCAST_EPISODES[hoveredIndex].title}
          </span>
        </div>
      )}

      {/* ── Detail Mode: Open Book YouTube Player & Archival Panel ── */}
      {mode === "detail" && (
        <div className="detail-layout animate-fade-in">
          {/* Active 16:9 YouTube Player over the open left page */}
          <div className="open-book-player-overlay">
            <div className="video-player-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeEpisode.ytId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={activeEpisode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="video-iframe"
              />
            </div>
            <div className="video-player-footer">
              <span className="live-status-pill">
                <span className="live-pulse" />
                <span>NOW PLAYING ARCHIVAL DISPATCH</span>
              </span>
              <a
                href={`https://www.youtube.com/watch?v=${activeEpisode.ytId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="yt-ext-link"
              >
                <span>Watch on YouTube</span>
                <span className="arrow">↗</span>
              </a>
            </div>
          </div>

          {/* Right Editorial Detail Panel matching 1.html */}
          <aside className="detail-panel" id="detail-panel">
            <button
              className="close-button"
              id="close-detail"
              onClick={handleCloseDetail}
              aria-label="Close video and return to episodes"
              title="Return to Episodes (Esc)"
            >
              <svg viewBox="0 0 15 15">
                <path d="M4 4L11 11M11 4L4 11" />
              </svg>
            </button>

            <p className="eyebrow" id="detail-eyebrow">
              EPISODE {activeEpisode.episodeNumber} · {activeEpisode.discipline.toUpperCase()}
            </p>

            <h2 className="detail-title" id="detail-title">
              {activeEpisode.title}
            </h2>

            <p className="detail-deck" id="detail-deck">
              {activeEpisode.description}
            </p>

            <dl className="meta-list">
              <div>
                <dt>GUEST / SPEAKER</dt>
                <dd>{activeEpisode.guest}</dd>
              </div>
              <div>
                <dt>DATE RECORDED</dt>
                <dd>{activeEpisode.date}</dd>
              </div>
              <div>
                <dt>RUNTIME</dt>
                <dd>{activeEpisode.duration}</dd>
              </div>
              <div>
                <dt>BROADCAST FORMAT</dt>
                <dd>{activeEpisode.binding}</dd>
              </div>
            </dl>

            <div className="detail-controls">
              <button className="text-button" onClick={handleCloseDetail}>
                RETURN TO EPISODES
              </button>
              <p className="microcopy">Press ESC to return</p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
