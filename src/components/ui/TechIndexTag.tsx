"use client";

import { motion } from "framer-motion";

interface TechIndexTagProps {
  tag: string; // e.g. "[01 // RESOC ARCHITECTURE]"
  status?: string; // e.g. "SYS_ACTIVE" or "VERIFIED"
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function TechIndexTag({
  tag,
  status,
  dark = false,
  className = "",
  style = {},
}: TechIndexTagProps) {
  // Ensure the tag is uppercase
  const formattedTag = tag.toUpperCase();

  return (
    <div
      className={`tech-index-wrapper ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
        fontSize: 11,
        letterSpacing: "0.12em",
        fontWeight: 500,
        textTransform: "uppercase",
        color: dark ? "#a09a9c" : "var(--muted, #6b6568)",
        marginBottom: 16,
        ...style,
      }}
    >
      {/* 5px Signal dot pulse */}
      <span
        style={{
          display: "inline-block",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#f45532",
          flexShrink: 0,
        }}
      />

      <span
        style={{
          color: dark ? "#fefdfd" : "var(--ink, #221f22)",
          fontWeight: 600,
        }}
      >
        {formattedTag}
      </span>

      {status && (
        <span
          style={{
            fontSize: 9.5,
            padding: "1px 6px",
            borderRadius: 2,
            border: dark
              ? "1px solid rgba(254, 253, 253, 0.12)"
              : "1px solid rgba(34, 31, 34, 0.12)",
            background: dark ? "#2a272a" : "#f5f4f2",
            color: dark ? "#a09a9c" : "#6b6568",
            letterSpacing: "0.08em",
          }}
        >
          {status}
        </span>
      )}
    </div>
  );
}
