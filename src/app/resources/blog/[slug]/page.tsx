import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS, type BlogPost } from "../blogData";
import "../blog.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Dispatch Not Found | MeshDefend" };
  }

  return {
    title: `${post.title} | MeshDefend Architectural Dispatches`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | MeshDefend`,
      description: post.excerpt,
      type: "article",
      authors: [post.authorName],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <Navbar />

      <main id="main" className="blog-page" style={{ paddingTop: 120, paddingBottom: 100 }}>
        <article className="blog-container" style={{ maxWidth: 860, margin: "0 auto" }}>
          {/* Breadcrumb Navigation */}
          <div style={{ marginBottom: 32 }}>
            <Link
              href="/resources/blog"
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 12,
                color: "var(--orange)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              <span>←</span>
              <span>ALL DISPATCHES</span>
            </Link>
          </div>

          {/* Article Header */}
          <header style={{ marginBottom: 48, borderBottom: "1px solid var(--border)", paddingBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: "var(--orange)",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                [ {post.category.toUpperCase()} ]
              </span>
              <span style={{ color: "var(--muted)", fontSize: 13 }}>·</span>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: "var(--muted)" }}>
                {post.date}
              </span>
              <span style={{ color: "var(--muted)", fontSize: 13 }}>·</span>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: "var(--muted)" }}>
                {post.readTime}
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
                fontSize: "clamp(34px, 4.5vw, 56px)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                margin: "0 0 24px 0",
                fontWeight: 400,
              }}
            >
              {post.title}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body), Inter, sans-serif",
                fontSize: 18,
                lineHeight: 1.6,
                color: "var(--muted)",
                margin: "0 0 32px 0",
              }}
            >
              {post.excerpt}
            </p>

            {/* Author Attribution */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 20px",
                backgroundColor: "var(--card-bg, rgba(255,255,255,0.03))",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  backgroundColor: "var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono), monospace",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "var(--ink)",
                }}
              >
                {post.authorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>
                  {post.authorName}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 11,
                    color: "var(--orange)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {post.authorRole} · MeshDefend
                </div>
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div
            style={{
              fontFamily: "var(--font-body), Inter, sans-serif",
              fontSize: 17,
              lineHeight: 1.75,
              color: "var(--ink)",
              marginBottom: 64,
            }}
          >
            {post.content.map((paragraph, idx) => (
              <p key={idx} style={{ marginBottom: 24 }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Call to Action Banner */}
          <div
            style={{
              padding: "36px 32px",
              backgroundColor: "var(--card-bg, rgba(255,255,255,0.03))",
              border: "1px solid var(--border)",
              marginBottom: 64,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "var(--orange)",
                fontWeight: 600,
              }}
            >
              [ TECHNICAL BRIEFING // AUTONOMOUS RESILIENCE ]
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display), "Instrument Serif", serif',
                fontSize: 28,
                color: "var(--ink)",
                margin: 0,
                fontWeight: 400,
              }}
            >
              Eliminate silent recovery failures in your enterprise backup estate.
            </h3>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
              Schedule a focused architectural walk-through to see how MeshDefend correlates multi-vendor
              telemetry and validates recoverability in continuous cleanrooms.
            </p>
            <div>
              <Link
                href="/company/contact?intent=demo"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 20px",
                  backgroundColor: "var(--orange)",
                  color: "#ffffff",
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                }}
              >
                <span>Request Architectural Briefing</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Related Dispatches */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 12,
                letterSpacing: "0.08em",
                color: "var(--muted)",
                marginBottom: 20,
              }}
            >
              FURTHER TECHNICAL DISPATCHES //
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/resources/blog/${related.slug}`}
                  style={{
                    display: "block",
                    padding: 20,
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--card-bg, rgba(255,255,255,0.02))",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 10,
                      color: "var(--orange)",
                      marginBottom: 8,
                    }}
                  >
                    [ {related.category.toUpperCase()} ]
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      color: "var(--ink)",
                      marginBottom: 8,
                      lineHeight: 1.4,
                    }}
                  >
                    {related.title}
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.5 }}>
                    {related.excerpt.slice(0, 100)}...
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
