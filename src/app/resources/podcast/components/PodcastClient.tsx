"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  PODCAST_EPISODES,
  PODCAST_CATEGORIES,
  LEARN_HIGHLIGHTS,
  type PodcastEpisode,
} from "../podcastData";

const ITEMS_PER_PAGE = 5;

/* ─── 1px Architectural Vector Icons for Technical Curriculum ─── */
function IconAutonomousRecovery({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconThreatDetection({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 12h4l3-8 4 16 3-8h4" />
      <circle cx="14" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconMultiCloud({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="4" width="6" height="4" rx="1" />
      <rect x="2" y="10" width="6" height="4" rx="1" />
      <rect x="2" y="16" width="6" height="4" rx="1" />
      <path d="M8 6h5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8" />
      <path d="M15 12h7" />
      <circle cx="21" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconAgenticAI({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="16" r="1.5" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <path d="M12 2v2" />
    </svg>
  );
}

function IconCompliance({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconLeadership({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

const HIGHLIGHT_ICONS: Record<string, React.FC<{ className?: string }>> = {
  "autonomous-recovery": IconAutonomousRecovery,
  "silent-failure": IconThreatDetection,
  "heterogeneous-cloud": IconMultiCloud,
  "agentic-ai": IconAgenticAI,
  "dora-nis2": IconCompliance,
  "executive-leadership": IconLeadership,
};

export function PodcastClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);

  // Filter episodes based on category and search query
  const filteredEpisodes = useMemo(() => {
    return PODCAST_EPISODES.filter((episode) => {
      const matchesCategory =
        activeCategory === "All" || episode.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        episode.title.toLowerCase().includes(q) ||
        episode.description.toLowerCase().includes(q) ||
        episode.guest.toLowerCase().includes(q) ||
        episode.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, activeCategory]);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(filteredEpisodes.length / ITEMS_PER_PAGE));

  // Current page items
  const paginatedEpisodes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEpisodes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEpisodes, currentPage]);

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedEpisode(null);
      }
    };
    if (selectedEpisode) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedEpisode]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    const listingEl = document.getElementById("podcast-episodes");
    if (listingEl) {
      listingEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const featuredEpisode = PODCAST_EPISODES[0];

  return (
    <div className="md-podcast-page">
      {/* ─── SECTION 1: HERO MASTHEAD (Editorial Broadsheet) ─── */}
      <section className="md-podcast-hero" aria-label="Podcast Hero">
        <div className="md-podcast-container md-podcast-hero__inner">
          <div className="md-podcast-hero__left">
            <div className="md-podcast-hero__eyebrow">
              <span className="md-podcast-hero__eyebrow-dot" />
              Resources · The Resilience Ledger Video Podcast
            </div>
            <h1 className="md-podcast-hero__title">The Resilience Ledger</h1>
            <p className="md-podcast-hero__subtitle">
              Engineering dispatches on heterogeneous storage estates, automated recovery validation, and eliminating silent backup failures across enterprise infrastructure.
            </p>
          </div>

          {/* Featured Episode Stage */}
          <div className="md-podcast-hero__right">
            <div
              className="md-podcast-hero__featured-card"
              onClick={() => setSelectedEpisode(featuredEpisode)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedEpisode(featuredEpisode);
                }
              }}
              aria-label={`Play Featured Dispatch: ${featuredEpisode.title}`}
            >
              <div className="md-podcast-hero__featured-top">
                <div className="md-podcast-hero__featured-tag-wrap">
                  <span className="md-podcast-hero__live-dot" />
                  <span className="md-podcast-hero__featured-tag">
                    FEATURED DISPATCH · EPISODE {featuredEpisode.episodeNumber}
                  </span>
                </div>
                <span className="md-podcast-hero__featured-duration">
                  {featuredEpisode.duration}
                </span>
              </div>

              <div className="md-podcast-hero__featured-media">
                <Image
                  src={featuredEpisode.thumbnail}
                  alt={featuredEpisode.title}
                  width={640}
                  height={360}
                  priority
                  className="md-podcast-hero__featured-img"
                />
                <div className="md-podcast-hero__featured-play-btn" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 4 20 12 6 20 6 4" />
                  </svg>
                </div>
              </div>

              <div className="md-podcast-hero__featured-body">
                <h3 className="md-podcast-hero__featured-title">
                  {featuredEpisode.title}
                </h3>
                <div className="md-podcast-hero__featured-meta">
                  <span className="md-podcast-hero__featured-note">
                    Click to launch video player
                  </span>
                  <span className="md-podcast-hero__featured-res">
                    4K MASTER
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: 2-COLUMN MAIN BODY (Sidebar + Episode Grid) ─── */}
      <section className="md-podcast-body" id="podcast-episodes">
        <div className="md-podcast-container md-podcast-body__grid">
          
          {/* LEFT SIDEBAR: Overview, Contact, Hosted By */}
          <aside className="md-podcast-sidebar">
            <div className="md-podcast-sidebar__sticky">
              <div className="md-podcast-sidebar__overview">
                <h4 className="md-podcast-sidebar__heading">Scope &amp; Intent</h4>
                <p>
                  <strong>The Resilience Ledger</strong> is an engineering-first video dispatch examining data resilience, automated recovery validation, and multi-cloud storage operations.
                </p>
                <p>
                  Designed for storage architects, principal infrastructure engineers, and operational risk teams who need to eliminate silent recovery failure before crisis arrives.
                </p>
              </div>

              {/* Contact */}
              <div className="md-podcast-contact">
                <h4 className="md-podcast-sidebar__heading">Editorial Contact</h4>
                <a
                  href="mailto:podcast@meshdefend.ai"
                  className="md-podcast-contact__link"
                >
                  podcast@meshdefend.ai
                </a>
              </div>

              {/* Hosted By */}
              <div className="md-podcast-host-card">
                <h4 className="md-podcast-sidebar__heading">Series Host</h4>
                <div className="md-podcast-host-card__row">
                  <div className="md-podcast-host-card__avatar-wrap">
                    <Image
                      src="/images/author-tejas.jpg"
                      alt="Tejas Pandit - Co-Founder & CEO, MeshDefend"
                      width={64}
                      height={64}
                      className="md-podcast-host-card__avatar"
                    />
                  </div>
                  <div className="md-podcast-host-card__info">
                    <h5 className="md-podcast-host-card__name">Tejas Pandit</h5>
                    <p className="md-podcast-host-card__role">
                      Co-Founder &amp; CEO, MeshDefend
                    </p>
                    <p className="md-podcast-host-card__bio">
                      Former storage systems engineer at Dell Technologies. Focuses on autonomous recovery orchestration, immutable validation, and multi-vendor resilience telemetry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: Search, Filters, Episode List, Pagination */}
          <main className="md-podcast-content">
            
            {/* Search Bar */}
            <div className="md-podcast-search-bar">
              <form
                className="md-podcast-search-bar__form"
                onSubmit={(e) => e.preventDefault()}
                role="search"
              >
                <div className="md-podcast-search-bar__input-wrapper">
                  <div className="md-podcast-search-bar__input-container">
                    <svg
                      className="md-podcast-search-bar__icon"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      className="md-podcast-search-bar__input"
                      placeholder="Filter by topic, guest, or keyword..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search podcast episodes"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        className="md-podcast-search-bar__clear"
                        onClick={() => setSearchQuery("")}
                        aria-label="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="md-podcast-search-bar__button"
                  >
                    Filter
                  </button>
                </div>
              </form>
            </div>

            {/* Category Filter Toolbar */}
            <div className="md-podcast-category-filter">
              <span className="md-podcast-category-filter__label">Filter by Topic:</span>
              <div className="md-podcast-category-filter__pills" role="group" aria-label="Category Filter">
                {PODCAST_CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`md-podcast-category-pill ${
                        isActive ? "md-podcast-category-pill--active" : ""
                      }`}
                      aria-pressed={isActive}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Status */}
            {searchQuery && (
              <div className="md-podcast-results-meta">
                <span>
                  Showing {filteredEpisodes.length} dispatch{filteredEpisodes.length === 1 ? "" : "es"} for &ldquo;{searchQuery}&rdquo;
                </span>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="md-podcast-results-meta__reset"
                >
                  Reset Filter
                </button>
              </div>
            )}

            {/* Episodes List */}
            <div className="md-podcast-episodes-list">
              {paginatedEpisodes.length > 0 ? (
                paginatedEpisodes.map((episode) => (
                  <article
                    key={episode.id}
                    className="md-podcast-card"
                    onClick={() => setSelectedEpisode(episode)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedEpisode(episode);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Play episode: ${episode.title}`}
                  >
                    <div className="md-podcast-card__inner">
                      {/* Left: Thumbnail with Play Button */}
                      <div className="md-podcast-card__image-wrap">
                        <Image
                          src={episode.thumbnail}
                          alt={episode.title}
                          width={512}
                          height={288}
                          className="md-podcast-card__image"
                          loading="lazy"
                        />
                        <div className="md-podcast-card__play-badge" aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="6 4 20 12 6 20 6 4" />
                          </svg>
                        </div>
                        {episode.duration && (
                          <span className="md-podcast-card__duration">
                            {episode.duration}
                          </span>
                        )}
                      </div>

                      {/* Right: Content */}
                      <div className="md-podcast-card__content">
                        <div className="md-podcast-card__header-section">
                          <div className="md-podcast-card__meta-row">
                            <span className="md-podcast-card__category">
                              EPISODE {episode.episodeNumber} · {episode.category}
                            </span>
                            <span className="md-podcast-card__date">
                              {episode.date}
                            </span>
                          </div>
                          <h3 className="md-podcast-card__title">
                            {episode.title}
                          </h3>
                        </div>
                        <p className="md-podcast-card__description">
                          {episode.description}
                        </p>
                        <div className="md-podcast-card__footer">
                          <span className="md-podcast-card__guest">
                            <strong>Guest:</strong> {episode.guest}
                          </span>
                          <span className="md-podcast-card__watch-action">
                            Watch Dispatch →
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="md-podcast-empty">
                  <h3>No dispatches match current criteria</h3>
                  <p>Try clearing search keywords or selecting a broader technical category.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All");
                    }}
                    className="md-podcast-empty__btn"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav className="md-podcast-pagination" aria-label="Pagination">
                <div className="md-podcast-pagination__container">
                  <button
                    type="button"
                    className={`md-podcast-pagination__control ${
                      currentPage === 1 ? "md-podcast-pagination__control--disabled" : ""
                    }`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    aria-label="Go to previous page"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M10 12L6 8l4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Previous</span>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      className={`md-podcast-pagination__page ${
                        currentPage === pageNum ? "md-podcast-pagination__page--active" : ""
                      }`}
                      onClick={() => handlePageChange(pageNum)}
                      aria-label={`Go to page ${pageNum}`}
                      aria-current={currentPage === pageNum ? "page" : undefined}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    type="button"
                    className={`md-podcast-pagination__control ${
                      currentPage === totalPages
                        ? "md-podcast-pagination__control--disabled"
                        : ""
                    }`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    aria-label="Go to next page"
                  >
                    <span>Next</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </nav>
            )}

          </main>
        </div>
      </section>

      {/* ─── SECTION 3: ARCHITECTURAL FOCUS (6-Card Grid with 1px Vector Icons) ─── */}
      <section className="md-podcast-learn" aria-label="Curriculum and Operating Themes">
        <div className="md-podcast-container">
          <div className="md-podcast-learn__header">
            <span className="md-podcast-learn__eyebrow">
              Curriculum &amp; Operating Themes
            </span>
            <h2 className="md-podcast-learn__title">Architectural Focus Areas</h2>
            <p className="md-podcast-learn__subtitle">
              Key engineering disciplines explored throughout the series, grounded in enterprise storage architecture and continuous resilience verification.
            </p>
          </div>
          <div className="md-podcast-learn__grid" role="list">
            {LEARN_HIGHLIGHTS.map((item) => {
              const IconComponent = HIGHLIGHT_ICONS[item.id] || IconAutonomousRecovery;
              return (
                <article key={item.id} className="md-podcast-learn-card" role="listitem">
                  <div className="md-podcast-learn-card__icon-wrap">
                    <IconComponent className="md-podcast-learn-card__icon" />
                  </div>
                  <h3 className="md-podcast-learn-card__title">{item.title}</h3>
                  <p className="md-podcast-learn-card__desc">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── VIDEO PLAYER MODAL ─── */}
      {selectedEpisode && (
        <div
          className="md-podcast-modal-backdrop"
          onClick={() => setSelectedEpisode(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-episode-title"
        >
          <div
            className="md-podcast-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="md-podcast-modal-close"
              onClick={() => setSelectedEpisode(null)}
              aria-label="Close video player"
            >
              ✕
            </button>
            <div className="md-podcast-modal-player-wrap">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedEpisode.ytId}?autoplay=1&rel=0`}
                title={selectedEpisode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="md-podcast-modal-iframe"
              />
            </div>
            <div className="md-podcast-modal-details">
              <div className="md-podcast-modal-meta">
                <span className="md-podcast-modal-chip">
                  EPISODE {selectedEpisode.episodeNumber}
                </span>
                <span className="md-podcast-modal-chip">
                  {selectedEpisode.category}
                </span>
                <span className="md-podcast-modal-date">
                  {selectedEpisode.date}
                </span>
                <span className="md-podcast-modal-guest">
                  Guest: {selectedEpisode.guest}
                </span>
              </div>
              <h2 id="modal-episode-title" className="md-podcast-modal-title">
                {selectedEpisode.title}
              </h2>
              <p className="md-podcast-modal-desc">
                {selectedEpisode.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
