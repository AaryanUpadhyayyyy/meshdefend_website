"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { BLOG_POSTS, type BlogPost } from "../blogData";

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
  "Tejas Pandit": "Co-Founder & CEO",
  "Ravi Chitloor": "Co-Founder & CTO",
  "Marcus Vane": "Head of Security Architecture",
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
              fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
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
              fontFamily: 'var(--font-display), "Instrument Serif", serif',
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

export function BlogClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { label: "All Dispatches", value: "All" },
    { label: "Cyber Resilience", value: "Cyber Resilience" },
    { label: "Architecture & Engineering", value: "Architecture_Engineering" },
  ];

  const filteredPosts =
    activeCategory === "All"
      ? BLOG_POSTS
      : activeCategory === "Architecture_Engineering"
      ? BLOG_POSTS.filter(
          (post) =>
            post.category === "Architecture" || post.category === "Engineering"
        )
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

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
    <div className="blog-page-client">
      <div className="blog-container">
        {/* ===================================================================
            HERO FOLD: Architectural Masthead
            =================================================================== */}
        <section className="blog-hero" aria-labelledby="blog-main-title">
          <div className="blog-eyebrow">
            [ RESOURCES // ARCHITECTURAL DISPATCHES ]
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
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`blog-category-btn ${
                  activeCategory === cat.value ? "is-active" : ""
                }`}
                aria-pressed={activeCategory === cat.value}
              >
                {cat.label}
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
          {/* 1. Lead / Featured Post (Asymmetrical Split Blueprint) */}
          <AnimatePresence mode="popLayout">
            {featuredPost && (
              <Link
                key={`featured-${featuredPost.id}`}
                href={`/resources/blog/${featuredPost.slug}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <motion.article
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
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
                          {featuredPost.readTime}
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
                              featuredPost.authorRole}
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
              </Link>
            )}
          </AnimatePresence>

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
            <AnimatePresence mode="popLayout">
              {secondaryPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/resources/blog/${post.slug}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <motion.article
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    whileHover="hover"
                    className="grid-card"
                    layout
                    style={{ height: "100%" }}
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
                          {post.readTime}
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
                                post.authorRole}
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
                </Link>
              ))}
            </AnimatePresence>
          </div>
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
            href="/company/contact?intent=demo"
            className="newsletter-banner-btn"
          >
            <span>Subscribe to Briefing</span>
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
