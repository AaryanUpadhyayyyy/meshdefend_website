"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SAMPLE_PRESS_RELEASES,
  SAMPLE_IN_THE_NEWS,
  type PressReleaseItem,
  type InTheNewsItem,
} from "../content";

export function NewsroomClient() {
  const [pressCount, setPressCount] = useState(6);
  const [newsCount, setNewsCount] = useState(6);

  const visiblePress = SAMPLE_PRESS_RELEASES.slice(0, pressCount);
  const visibleNews = SAMPLE_IN_THE_NEWS.slice(0, newsCount);

  return (
    <div className="bp-newsroom-page" suppressHydrationWarning>
      {/* ─── 0. TOP HERO: "Newsroom" on top ─── */}
      <section className="bp-hero-section">
        <div className="bp-container">
          <h1 className="bp-hero-title">Newsroom</h1>
          <p className="bp-hero-subtitle">
            Press releases and independent news coverage about MeshDefend, our customers, and partners.
          </p>
        </div>
      </section>

      {/* ─── 1. SECTION 1: PRESS RELEASES — What MeshDefend releases as news ─── */}
      <section className="bp-section-press" id="pressreleases">
        <div className="bp-container">
          <h2 className="bp-section-title">Press Releases & Dispatches</h2>
          <p className="bp-section-subtitle">
            Official announcements, funding milestones, and architectural research from MeshDefend.
          </p>

          <div className="bp-grid-3col">
            {visiblePress.map((item: PressReleaseItem) => {
              const isExternal = item.url.startsWith("http");
              return (
                <article key={item.id} className="bp-press-card">
                  <div>
                    <div className="bp-press-icon-wrap">
                      <img
                        src="/newsroom/meshdefend-orange-dot-icon.svg"
                        alt=""
                        className="bp-press-dot-icon"
                        width="32"
                        height="32"
                      />
                    </div>
                    <h4 className="bp-press-title">
                      {isExternal ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bp-card-title-link"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <Link href={item.url} className="bp-card-title-link">
                          {item.title}
                        </Link>
                      )}
                    </h4>
                    <div className="bp-press-date">{item.date}</div>
                  </div>

                  <div>
                    {isExternal ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bp-read-more-link"
                      >
                        Read dispatch →
                      </a>
                    ) : (
                      <Link href={item.url} className="bp-read-more-link">
                        Read dispatch →
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {pressCount < SAMPLE_PRESS_RELEASES.length && (
            <div className="bp-btn-wrapper">
              <button
                type="button"
                className="bp-load-more-btn"
                onClick={() => setPressCount((prev) => prev + 3)}
              >
                Load more press releases
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── 2. SECTION 2: IN THE NEWS — Independent Coverage ─── */}
      <section className="bp-section-in-the-news" id="in-the-news">
        <div className="bp-container">
          <h2 className="bp-section-title">In the News</h2>
          <p className="bp-section-subtitle">
            Coverage across leading technology and business publications.
          </p>

          <div className="bp-grid-3col">
            {visibleNews.map((item: InTheNewsItem) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bp-news-card"
              >
                <div>
                  <div className="bp-news-logo-wrap">
                    <span className="bp-news-pub-name">{item.publication}</span>
                  </div>
                  <h4 className="bp-news-title">{item.title}</h4>
                  <div className="bp-news-date">{item.date}</div>
                </div>

                <div>
                  <span className="bp-read-more-link">Read article →</span>
                </div>
              </a>
            ))}
          </div>

          {newsCount < SAMPLE_IN_THE_NEWS.length && (
            <div className="bp-btn-wrapper">
              <button
                type="button"
                className="bp-load-more-btn"
                onClick={() => setNewsCount((prev) => prev + 3)}
              >
                Load more coverage
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── 3. SECTION 3: TECHNICAL BRIEFING BANNER ─── */}
      <section className="bp-section-banner">
        <div className="bp-container">
          <div className="bp-banner-row">
            <div className="bp-banner-img-wrap">
              <picture>
                <img
                  src="/newsroom/meshdefend-agentic-operations-orange.png"
                  alt="Autonomous Cyber Resilience"
                />
              </picture>
            </div>
            <div className="bp-banner-content">
              <h2 className="bp-banner-title">
                Autonomous Cyber Resilience: Bridging Detection and Guaranteed Recovery
              </h2>
              <p className="bp-banner-text">
                Explore the architectural shift from passive backup monitoring to autonomous recovery validation and incident resolution across heterogeneous enterprise estates.
              </p>
              <Link href="/company/contact?intent=demo" className="bp-cta-button-black">
                Schedule architectural briefing →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
