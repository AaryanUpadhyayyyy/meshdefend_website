"use client";

import { motion } from "framer-motion";

export function AnimatedLaserBeam({
  className = "",
  style = {},
  variant = "horizontal",
}: {
  className?: string;
  style?: React.CSSProperties;
  variant?: "horizontal" | "vertical" | "circuit";
}) {
  if (variant === "horizontal") {
    return (
      <div
        className={className}
        style={{
          width: "100%",
          height: 14,
          position: "relative",
          overflow: "hidden",
          ...style,
        }}
      >
        <svg
          width="100%"
          height="14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          {/* Base structural hairline */}
          <line
            x1="0"
            y1="7"
            x2="100%"
            y2="7"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Animated laser pulse beam */}
          <motion.line
            x1="0"
            y1="7"
            x2="100%"
            y2="7"
            stroke="#f45532"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, strokeDashoffset: 100 }}
            animate={{
              strokeDashoffset: [200, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            strokeDasharray="60 400"
          />
        </svg>
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div
        className={className}
        style={{
          width: 14,
          height: "100%",
          position: "relative",
          overflow: "hidden",
          ...style,
        }}
      >
        <svg
          width="14"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <line
            x1="7"
            y1="0"
            x2="7"
            y2="100%"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <motion.line
            x1="7"
            y1="0"
            x2="7"
            y2="100%"
            stroke="#f45532"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 200 }}
            animate={{
              strokeDashoffset: [200, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "linear",
            }}
            strokeDasharray="50 300"
          />
        </svg>
      </div>
    );
  }

  // Circuit variant: multi-node interconnect
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: 80,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 800 80"
        fill="none"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Node 1 to Central Hub */}
        <path
          d="M 40 40 L 200 40 L 260 20 L 400 20"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <motion.path
          d="M 40 40 L 200 40 L 260 20 L 400 20"
          stroke="#f45532"
          strokeWidth="1.5"
          strokeDasharray="30 200"
          animate={{ strokeDashoffset: [230, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Node 2 to Central Hub */}
        <path
          d="M 760 40 L 600 40 L 540 60 L 400 60"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <motion.path
          d="M 760 40 L 600 40 L 540 60 L 400 60"
          stroke="#f45532"
          strokeWidth="1.5"
          strokeDasharray="30 200"
          animate={{ strokeDashoffset: [0, 230] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Central Core Crosshair */}
        <circle cx="400" cy="40" r="12" stroke="var(--border)" strokeWidth="1" fill="var(--bg)" />
        <circle cx="400" cy="40" r="4" fill="#f45532" />
        <line x1="390" y1="40" x2="410" y2="40" stroke="#f45532" strokeWidth="1" />
        <line x1="400" y1="30" x2="400" y2="50" stroke="#f45532" strokeWidth="1" />
      </svg>
    </div>
  );
}
