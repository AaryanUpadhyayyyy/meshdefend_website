"use client";

import React, { useState, useEffect } from "react";
import { DashboardPreview } from "./DashboardPreview";
import { TechIndexTag } from "@/components/ui/TechIndexTag";

export function ConsoleSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          #console,
          .console-section {
            display: none !important;
          }
        }
      `}</style>
      {!isMobile && (
        <section
          id="console"
          className="console-section"
          style={{
            position: "relative",
            padding: "80px 0 120px",
            background: "var(--bg)",
          }}
        >
          <div className="container">
            {/* Section Header */}
            <div style={{ maxWidth: 760, marginBottom: 48 }}>
              <TechIndexTag
                tag="[ 01 // THE CONSOLE ]"
                style={{ marginBottom: 16 }}
              />

              <h2
                className="display"
                style={{
                  fontSize: "clamp(36px, 4.4vw, 56px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "var(--ink)",
                  margin: "0 0 16px",
                }}
              >
                One console, every vendor.
              </h2>

              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                Unify backup software, storage targets, and multi-cloud estates into one autonomous Resilience Operations Center.
              </p>
            </div>

            {/* Full Dashboard Surface */}
            <div style={{ position: "relative" }}>
              <DashboardPreview />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
