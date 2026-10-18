"use client";

import React from "react";
import { DashboardPreview } from "./DashboardPreview";
import { TechIndexTag } from "@/components/ui/TechIndexTag";
import { Reveal } from "@/components/motion";

export function ConsoleSection() {
  return (
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
        {/* Section Header with 0.08s stepped reveals */}
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <Reveal delay={0}>
            <TechIndexTag
              tag="[ 01 // THE RESILIENCE CONSOLE ]"
              style={{ marginBottom: 16 }}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className="display"
              style={{
                fontSize: "clamp(34px, 4.4vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                margin: "0 0 16px",
              }}
            >
              One console, every vendor.
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
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
          </Reveal>
        </div>

        {/* Full Dashboard Surface - scale-in reveal */}
        <Reveal variant="scale-in" delay={0.24}>
          <div style={{ position: "relative" }}>
            <DashboardPreview />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
