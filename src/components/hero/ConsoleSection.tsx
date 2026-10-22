"use client";

import React from "react";

export function ConsoleSection() {
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
      <div className="container" style={{ maxWidth: 1240, margin: "0 auto" }}>
        <img
          src="/images/img/protection-jobs-command-dashboard.png"
          alt="MeshDefend Resilience Operations Console"
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
