"use client";

import React from "react";
import { DashboardPreview } from "./DashboardPreview";
import { Reveal } from "@/components/motion";

export function ConsoleSection() {
  return (
    <section
      id="console"
      className="console-section"
      style={{
        position: "relative",
        padding: "48px 0 100px",
        background: "var(--bg)",
      }}
    >
      <div className="container">
        {/* Caption over visual */}
        <div
          style={{
            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
            fontSize: 12,
            letterSpacing: "0.04em",
            color: "var(--muted)",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)" }} />
          <span>Illustrative product preview. Sample data.</span>
        </div>

        {/* Full Dashboard Surface */}
        <Reveal variant="scale-in" delay={0.1}>
          <div style={{ position: "relative" }}>
            <DashboardPreview />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
