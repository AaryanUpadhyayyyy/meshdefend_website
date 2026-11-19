import React from "react";
import Link from "next/link";

interface ShimmerButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  textColor?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function ShimmerButton({
  href,
  children,
  className = "",
  shimmerColor = "rgba(255, 255, 255, 0.45)",
  shimmerSize = "0.08em",
  shimmerDuration = "2.8s",
  borderRadius = "6px",
  background = "var(--orange, #f45532)",
  textColor = "#fefdfd",
  onClick,
  style,
}: ShimmerButtonProps) {
  const content = (
    <span
      className={`magic-shimmer-btn ${className}`}
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-size": shimmerSize,
          "--shimmer-duration": shimmerDuration,
          "--border-radius": borderRadius,
          "--bg": background,
          "--text-color": textColor,
          ...style,
        } as React.CSSProperties
      }
      onClick={onClick}
    >
      <span className="magic-shimmer-highlight" />
      <span className="magic-shimmer-content">{children}</span>
      <style>{`
        .magic-shimmer-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--bg);
          color: var(--text-color);
          font-weight: 600;
          font-size: 15px;
          padding: 13px 28px;
          border-radius: var(--border-radius);
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(244, 85, 50, 0.28), 0 1px 2px rgba(244, 85, 50, 0.16);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          user-select: none;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .magic-shimmer-btn:hover {
          transform: translateY(-1.5px);
          box-shadow: 0 6px 20px rgba(244, 85, 50, 0.4), 0 2px 4px rgba(244, 85, 50, 0.2);
        }

        .magic-shimmer-btn:active {
          transform: translateY(0.5px);
          box-shadow: 0 2px 6px rgba(244, 85, 50, 0.25);
        }

        .magic-shimmer-highlight {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 20%,
            var(--shimmer-color) 45%,
            transparent 65%
          );
          transform: translateX(-100%);
          animation: magic-shimmer-sweep var(--shimmer-duration) infinite ease-in-out;
          pointer-events: none;
        }

        .magic-shimmer-content {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        @keyframes magic-shimmer-sweep {
          0% {
            transform: translateX(-120%);
          }
          60%, 100% {
            transform: translateX(120%);
          }
        }
      `}</style>
    </span>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none", display: "inline-block" }}>
        {content}
      </Link>
    );
  }

  return content;
}
