"use client";

import React from "react";

type ConsoleSectionProps = {
  imageSrc?: string;
  imageAlt?: string;
};

export function ConsoleSection({ imageSrc, imageAlt }: ConsoleSectionProps = {}) {
  return (
    <section
      id="console"
      className="console-section"
      style={{
        position: "relative",
        padding: "0 0 24px",
        background: "var(--bg)",
      }}
    >
      <div className="container" style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px" }}>
        <img
          src={imageSrc || "/images/img/protection-jobs-command-dashboard.png"}
          alt={imageAlt || "MeshDefend Resilience Operations Console"}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            border: "none",
            borderRadius: 0,
            boxShadow: "none",
          }}
        />
      </div>
    </section>
  );
}
