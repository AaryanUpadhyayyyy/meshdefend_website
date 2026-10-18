"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SAMPLE_PRESS_RELEASES,
  SAMPLE_IN_THE_NEWS,
  SAMPLE_AWARDS,
  type PressReleaseItem,
  type InTheNewsItem,
  type AwardCardItem,
} from "../content";

export function NewsroomClient() {
  const [pressCount, setPressCount] = useState(9);
  const [newsCount, setNewsCount] = useState(6);
  const [awardsCount, setAwardsCount] = useState(6);

  const visiblePress = SAMPLE_PRESS_RELEASES.slice(0, pressCount);
  const visibleNews = SAMPLE_IN_THE_NEWS.slice(0, newsCount);
  const visibleAwards = SAMPLE_AWARDS.slice(0, awardsCount);

  return (
    <div className="bp-newsroom-page" suppressHydrationWarning>
      {/* ─── 0. TOP HERO: "Newsroom" on top ─── */}
      <section className="bp-hero-section">
        <div className="bp-container">
          <h1 className="bp-hero-title">Newsroom</h1>
          <p className="bp-hero-subtitle">
            Press releases and independent news coverage about MeshDefend, our customers, and partners
          </p>
        </div>
      </section>

      {/* ─── 1. SECTION 1: PRESS RELEASE — What MeshDefend releases as news ─── */}
      <section className="bp-section-press" id="pressreleases">
        <div className="bp-container">
          <h2 className="bp-section-title">Press release</h2>
          <p className="bp-section-subtitle">
            What MeshDefend releases as news
          </p>

          <div className="bp-grid-3col">
            {visiblePress.map((item: PressReleaseItem) => (
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
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bp-card-title-link"
                    >
                      {item.title}
                    </a>
                  </h4>
                  <div className="bp-press-date">{item.date}</div>
                </div>

                <div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bp-read-more-link"
                  >
                    Read more
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="bp-btn-wrapper">
            <button
              type="button"
              className="bp-load-more-btn"
              onClick={() => setPressCount((prev) => prev + 3)}
            >
              Load more press releases
            </button>
          </div>
        </div>
      </section>

      {/* ─── 2. SECTION 2: IN THE NEWS — Where MeshDefend is mentioned in the news ─── */}
      <section className="bp-section-in-the-news" id="in-the-news">
        <div className="bp-container">
          <h2 className="bp-section-title">In the news</h2>
          <p className="bp-section-subtitle">
            Where MeshDefend is mentioned in the news
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
                  <span className="bp-read-more-link">Read more</span>
                </div>
              </a>
            ))}
          </div>

          <div className="bp-btn-wrapper">
            <button
              type="button"
              className="bp-load-more-btn"
              onClick={() => setNewsCount((prev) => prev + 3)}
            >
              Load more
            </button>
          </div>
        </div>
      </section>

      {/* ─── 3. SECTION 3: AWARDS — Like Tejas recent linkedin post, where MD received award from CII ─── */}
      <section className="bp-section-awards" id="awards">
        <div className="bp-container">
          <h2 className="bp-section-title">Awards</h2>
          <p className="bp-section-subtitle">
            MeshDefend is always grateful to be recognized for our innovation, focus on customer service, and employee culture.
          </p>

          <div className="bp-grid-3col">
            {visibleAwards.map((item: AwardCardItem) => (
              <article key={item.id} className="bp-award-card">
                <div>
                  <div className="bp-award-badge-wrap">
                    <img
                      src={item.badgeSrc}
                      alt={item.badgeAlt}
                      className="bp-award-badge-img"
                      width="58"
                      height="58"
                    />
                  </div>
                  <h4 className="bp-award-title">{item.title}</h4>
                  <p className="bp-award-desc">{item.description}</p>
                </div>

                <div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bp-read-more-link"
                  >
                    Read more
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="bp-btn-wrapper">
            <button
              type="button"
              className="bp-load-more-btn"
              onClick={() => setAwardsCount((prev) => prev + 3)}
            >
              Load more
            </button>
          </div>
        </div>
      </section>

      {/* ─── 4. SECTION 4: BANNER "Unleashing Agentic IT Operations" ─── */}
      <section className="bp-section-banner">
        <div className="bp-container">
          <div className="bp-banner-row">
            <div className="bp-banner-img-wrap">
              <picture>
                <img
                  src="/newsroom/meshdefend-agentic-operations-orange.png"
                  alt="Unleashing Agentic IT Operations"
                />
              </picture>
            </div>
            <div className="bp-banner-content">
              <h2 className="bp-banner-title">Unleashing Agentic IT Operations</h2>
              <p className="bp-banner-text">
                Explore the vision behind our agentic IT operations platform—built to help enterprises automate ITOps and incident management.
              </p>
              <Link href="/demo" className="bp-cta-button-black">
                Watch the webinar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
