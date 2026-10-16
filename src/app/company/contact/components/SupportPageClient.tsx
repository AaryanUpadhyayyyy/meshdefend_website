"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { SupportHeadline } from "./SupportHeadline";
import { PathCards } from "./PathCards";
import { SupportForm, type FormTopic } from "./SupportForm";
import { SupportMeshFallback } from "./SupportMeshFallback";
import type { MeshState, TargetCluster } from "./SupportMesh3D";
import { useHeroState } from "@/lib/heroState";

// Dynamically import 3D canvas with ssr: false so LCP is completely unaffected
const SupportMesh3D = dynamic(
  () => import("./SupportMesh3D").then((mod) => mod.SupportMesh3D),
  {
    ssr: false,
    loading: () => <div className="mesh-loading-placeholder" style={{ width: "100%", height: "100%" }} />,
  }
);

// Mapping from Topic to 3D Mesh Cluster
const TOPIC_CLUSTER_MAP: Record<FormTopic, TargetCluster> = {
  "Technical support": "Backup",
  "Demo or sales": "Business apps",
  Partnerships: "Cloud",
  "Security question": "Security",
  Other: "ITSM",
};

export function SupportPageClient() {
  const [selectedTopic, setSelectedTopic] = useState<FormTopic>("Technical support");
  const [targetCluster, setTargetCluster] = useState<TargetCluster>("Backup");
  const [meshState, setMeshState] = useState<MeshState>("idle");

  // Device & Fallback detection
  const [isClient, setIsClient] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Hook into shared pause control
  const { isPaused } = useHeroState();

  useEffect(() => {
    setIsClient(true);

    // 1. Reduced motion detection
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mqMotion.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mqMotion.addEventListener("change", motionHandler);

    // 2. Screen width detection (< 768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    // 3. WebGL check
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }

    // 4. Low power device check (hardwareConcurrency <= 4)
    if (typeof navigator !== "undefined" && navigator.hardwareConcurrency) {
      if (navigator.hardwareConcurrency <= 4) {
        setIsLowPower(true);
      }
    }

    return () => {
      mqMotion.removeEventListener("change", motionHandler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Handle topic change from either PathCards or Form Select
  const handleTopicChange = (topic: FormTopic, cluster?: TargetCluster) => {
    setSelectedTopic(topic);
    const nextCluster = cluster || TOPIC_CLUSTER_MAP[topic] || "Backup";
    setTargetCluster(nextCluster);
  };

  const handlePathCardSelect = (topic: string, cluster: "Backup" | "Business apps" | "Cloud") => {
    setSelectedTopic(topic as FormTopic);
    setTargetCluster(cluster);
  };

  // Determine if we should use the 2D fallback mesh
  const shouldUseFallback =
    !isClient || !hasWebGL || isMobile || isLowPower || reducedMotion;

  return (
    <div
      style={{
        backgroundColor: "#1c1c1c",
        color: "#fefdfd",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        paddingTop: "calc(76px + 40px)",
        paddingBottom: 96,
      }}
    >
      {/* ─── DOTTED CONTROL ROOM GRID BACKGROUND ─── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          opacity: 0.8,
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* DESKTOP LAYOUT (Left 45%, Right 55%) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "45% 55%",
            gap: isMobile ? 36 : 48,
            alignItems: "start",
          }}
        >
          {/* ─── LEFT COLUMN: Eyebrow, H1, Subhead, Path Cards, Direct Email ─── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              order: isMobile ? 2 : 1, // On mobile, path cards come after form
            }}
          >
            {/* On mobile, H1 and subhead are shown at top before form */}
            {!isMobile && (
              <>
                {/* Eyebrow (mono) */}
                <div style={{ marginBottom: 16 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      color: "#fd4703",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    CONTACT US
                  </span>
                </div>

                {/* H1 with single-time character reveal */}
                <SupportHeadline />

                {/* Subhead */}
                <p
                  style={{
                    fontFamily: "var(--font-body, Inter, sans-serif)",
                    fontSize: 17,
                    lineHeight: 1.6,
                    color: "rgba(255, 255, 255, 0.7)",
                    margin: "0 0 40px",
                    maxWidth: 500,
                  }}
                >
                  Technical question, demo request, partnership or something else? Tell us what you need and we will point it to the right team.
                </p>
              </>
            )}

            {/* Path Cards: Stacked on Desktop, Horizontal Chips on Mobile */}
            <div style={{ marginTop: isMobile ? 8 : 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 11,
                  color: "rgba(255, 255, 255, 0.45)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                SELECT ENGAGEMENT TRACK
              </div>

              <PathCards
                selectedTopic={selectedTopic}
                onSelectTopic={handlePathCardSelect}
                isMobileChips={isMobile}
              />
            </div>

            {/* Direct Email Line (Desktop) */}
            {!isMobile && (
              <div
                style={{
                  marginTop: 48,
                  paddingTop: 24,
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 12,
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  Direct contact:
                </span>
                <a
                  href="mailto:hello@meshdefend.ai"
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 13,
                    color: "#fefdfd",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  hello@meshdefend.ai
                </a>
              </div>
            )}
          </div>

          {/* ─── RIGHT COLUMN: 3D Mesh Orb behind Solid Form Card ─── */}
          <div
            style={{
              position: "relative",
              order: isMobile ? 1 : 2,
            }}
          >
            {/* Mobile Header (Rendered above form on mobile) */}
            {isMobile && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ marginBottom: 12 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      color: "#fd4703",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    CONTACT US
                  </span>
                </div>
                <SupportHeadline />
                <p
                  style={{
                    fontFamily: "var(--font-body, Inter, sans-serif)",
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "rgba(255, 255, 255, 0.7)",
                    margin: 0,
                  }}
                >
                  Technical question, demo request, partnership or something else? Tell us what you need and we will point it to the right team.
                </p>
              </div>
            )}

            {/* 3D Mesh Orb Stage (Positioned behind and around the form card) */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -60,
                bottom: -60,
                left: -60,
                right: -60,
                pointerEvents: "none",
                zIndex: 0,
                opacity: 0.75,
              }}
            >
              {shouldUseFallback ? (
                <SupportMeshFallback
                  state={meshState}
                  targetCluster={targetCluster}
                  isPaused={isPaused}
                />
              ) : (
                <SupportMesh3D
                  state={meshState}
                  targetCluster={targetCluster}
                  isPaused={isPaused}
                />
              )}
            </div>

            {/* Solid Dark Form Card (Z-index 2 over 3D canvas) */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <SupportForm
                selectedTopic={selectedTopic}
                onTopicChange={handleTopicChange}
                onMeshStateChange={setMeshState}
                targetCluster={targetCluster}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
