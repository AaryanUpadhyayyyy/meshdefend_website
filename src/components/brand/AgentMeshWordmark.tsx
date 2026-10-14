import React from "react";

export function AgentMeshWordmark({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-body), system-ui, sans-serif",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        ...style,
      }}
    >
      {/* Mini signature double chevron */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <path d="M4 18L10 12L4 6" stroke="#f45532" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 18L18 12L12 6" stroke="#f45532" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>
        Agent Mesh<sup style={{ fontSize: "0.65em", top: "-0.45em", fontWeight: 400 }}>™</sup>
      </span>
    </span>
  );
}
