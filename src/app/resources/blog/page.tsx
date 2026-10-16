"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { BLOG_POSTS, BlogPost } from "./blogData";
import "./blog.css";

// Re-export BLOG_POSTS directly for external/decoupled consumption
export { BLOG_POSTS };

// Author initials generator for graceful avatar fallback
function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

// Map author roles for architectural fidelity
const AUTHOR_ROLES: Record<string, string> = {
  "Tejas Pandit": "Resilience Architecture",
  "Ravi Chitlur": "Resilience Engineering",
  "Marcus Vane": "Infrastructure Security",
  "Andrew Bayers": "Threat Intelligence",
};

// Map default read times
const READ_TIMES: Record<string, string> = {
  "post-1": "6 MIN READ",
  "post-2": "8 MIN READ",
  "post-3": "5 MIN READ",
  "post-4": "7 MIN READ",
};

// Media Image Component with Neutral Gray Fallback Box
function ArticleMedia({
  src,
  alt,
  category,
}: {
  src: string;
  alt: string;
  category: string;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="neutral-media-fallback">
      {!hasError ? (
        <motion.img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          variants={{
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        /* Neutral gray #f3f1f1 box fallback per design mandate */
        <motion.div
          variants={{
            hover: { scale: 1.03 },
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#f3f1f1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            position: "relative",
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(to right, rgba(34,31,34,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,31,34,0.04) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--orange)",
              fontWeight: 600,
              position: "relative",
              marginBottom: 6,
            }}
          >
            [ {category} ]
          </span>
          <span
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
              fontSize: 20,
              color: "var(--ink)",
              position: "relative",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Architectural Schematic
          </span>
        </motion.div>
      )}
    </div>
  );
}

// Author Avatar with Graceful Monogram Circle Fallback
function AuthorAvatar({
  name,
  avatarSrc,
}: {
  name: string;
  avatarSrc?: string;
}) {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc =
    avatarSrc || `/images/author-${name.toLowerCase().split(" ")[0]}.jpg`;

  if (hasError) {
    return (
      <div className="author-avatar-circle" title={name}>
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div className="author-avatar-circle" title={name}>
      <img
        src={resolvedSrc}
        alt={name}
        onError={() => setHasError(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Cyber Resilience",
    "Engineering",
    "Architecture",
    "Threat Intel",
  ];

  const filteredPosts =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  // Staggered motion container variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  // Card item entrance variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  const isAllView = activeCategory === "All";
  const featuredPost = isAllView
    ? filteredPosts.find((p) => p.isFeatured) || filteredPosts[0]
    : null;
  const secondaryPosts = isAllView
    ? filteredPosts.filter((p) => p.id !== featuredPost?.id)
    : filteredPosts;

  return (
    <>
      <Navbar />

      <main id="main" className="blog-page">
        <div className="blog-container">
          {/* ===================================================================
              HERO FOLD: Architectural Masthead
              =================================================================== */}
          <section className="blog-hero" aria-labelledby="blog-main-title">
            <div className="blog-eyebrow">
              [ RESOURCES · ARCHITECTURAL DISPATCHES ]
            </div>

            <h1 id="blog-main-title" className="blog-title">
              Engineering truth on recovery, runbooks, and resilience.
            </h1>

            <p className="blog-deck">
              Unfiltered technical dispatches on multi-cloud recovery posture,
              air-gapped operations, and autonomous agentic resilience. Built for
              infrastructure architects.
            </p>
          </section>

          {/* ===================================================================
              TOOLBAR: Category Filter & Editorial Ticker
              =================================================================== */}
          <div
            className="blog-toolbar"
            role="toolbar"
            aria-label="Article categories"
          >
            <div className="blog-categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`blog-category-btn ${
                    activeCategory === cat ? "is-active" : ""
                  }`}
                  aria-pressed={activeCategory === cat}
                >
                  {cat === "All"
                    ? `All Dispatches (${BLOG_POSTS.length})`
                    : cat}
                </button>
              ))}
            </div>
          </div>

          {/* ===================================================================
              EDITORIAL GRID: Framer-Motion Asymmetrical Blueprint Canvas
              =================================================================== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            key={activeCategory}
            layout
          >
            <AnimatePresence mode="popLayout">
              {/* 1. Lead / Featured Post (Asymmetrical Split Blueprint) */}
              {featuredPost && (
                <motion.article
                  key={featuredPost.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="featured-card"
                  layout
                >
                  <div className="featured-media">
                    <ArticleMedia
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      category={featuredPost.category}
                    />
                  </div>

                  <div className="featured-content">
                    <div>
                      <div className="meta-row">
                        <span className="meta-category">
                          [ {featuredPost.category} ]
                        </span>
                        <span className="meta-dot">·</span>
                        <span className="meta-date">{featuredPost.date}</span>
                        <span className="meta-time">
                          {READ_TIMES[featuredPost.id] || "6 MIN READ"}
                        </span>
                      </div>

                      <h2 className="featured-headline">
                        {featuredPost.title}
                      </h2>

                      <p className="featured-excerpt">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="author-row">
                      <div className="author-profile">
                        <AuthorAvatar
                          name={featuredPost.authorName}
                          avatarSrc={featuredPost.authorAvatar}
                        />
                        <div className="author-info">
                          <span className="author-name">
                            {featuredPost.authorName}
                          </span>
                          <span className="author-role">
                            {AUTHOR_ROLES[featuredPost.authorName] ||
                              "Resilience Architecture"}
                          </span>
                        </div>
                      </div>

                      <span className="read-action">
                        Read Dispatch
                        <span className="read-arrow" aria-hidden="true">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </motion.article>
              )}

              {/* 2. Secondary Posts: Snapped Blueprint Grid */}
              <div
                className="blueprint-grid"
                style={{
                  gridTemplateColumns:
                    secondaryPosts.length === 1
                      ? "1fr"
                      : secondaryPosts.length === 2
                      ? "repeat(2, 1fr)"
                      : "repeat(3, 1fr)",
                }}
              >
                {secondaryPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    variants={cardVariants}
                    whileHover="hover"
                    className="grid-card"
                    layout
                  >
                    <div className="grid-card-media">
                      <ArticleMedia
                        src={post.image}
                        alt={post.title}
                        category={post.category}
                      />
                    </div>

                    <div className="grid-card-content">
                      <div className="meta-row">
                        <span className="meta-category">
                          [ {post.category} ]
                        </span>
                        <span className="meta-dot">·</span>
                        <span className="meta-date">{post.date}</span>
                        <span className="meta-time">
                          {READ_TIMES[post.id] || "5 MIN READ"}
                        </span>
                      </div>

                      <h2 className="grid-card-headline">{post.title}</h2>

                      <p className="grid-card-excerpt">{post.excerpt}</p>

                      <div className="author-row">
                        <div className="author-profile">
                          <AuthorAvatar
                            name={post.authorName}
                            avatarSrc={post.authorAvatar}
                          />
                          <div className="author-info">
                            <span className="author-name">
                              {post.authorName}
                            </span>
                            <span className="author-role">
                              {AUTHOR_ROLES[post.authorName] ||
                                "Resilience Engineering"}
                            </span>
                          </div>
                        </div>

                        <span className="read-action">
                          Read Dispatch
                          <span className="read-arrow" aria-hidden="true">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </AnimatePresence>
          </motion.div>

          {/* ===================================================================
              NEWSLETTER / CAPTURE BANNER: Brutalist Hairline Blueprint
              =================================================================== */}
          <section
            className="blog-newsletter-banner"
            aria-labelledby="banner-briefing-title"
          >
            <div className="newsletter-banner-left">
              <div className="newsletter-banner-eyebrow">
                [ WEEKLY RESILIENCE BRIEF ]
              </div>
              <h2
                id="banner-briefing-title"
                className="newsletter-banner-title"
              >
                Operational thinking, direct to your inbox.
              </h2>
              <p className="newsletter-banner-deck">
                Join technical leaders receiving our weekly executive briefing on
                multi-vendor cyber recovery and agentic resilience.
              </p>
            </div>

            <Link
              href="/resources/newsletter"
              className="newsletter-banner-btn"
            >
              <span>Subscribe to Briefing</span>
              <span aria-hidden="true">→</span>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
