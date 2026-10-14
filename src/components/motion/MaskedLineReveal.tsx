"use client";

import { motion } from "framer-motion";
import { SPRING_PHYSICS } from "./MotionPhysics";

interface MaskedLineRevealProps {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "div" | "p";
  className?: string;
  style?: React.CSSProperties;
  lineStyle?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  highlightIndices?: number[];
  highlightStyle?: React.CSSProperties;
}

export function MaskedLineReveal({
  lines,
  as: Component = "h2",
  className = "",
  style = {},
  lineStyle = {},
  delay = 0,
  stagger = 0.12,
  highlightIndices = [],
  highlightStyle = { color: "var(--orange)", fontStyle: "italic" },
}: MaskedLineRevealProps) {
  return (
    <Component className={className} style={{ margin: 0, ...style }}>
      {lines.map((line, idx) => {
        const isHighlighted = highlightIndices.includes(idx);
        return (
          <span
            key={idx}
            style={{
              display: "block",
              overflow: "hidden",
              lineHeight: "1.15",
              paddingBottom: "0.08em",
            }}
          >
            <motion.span
              initial={{ y: "115%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                ...SPRING_PHYSICS,
                delay: delay + idx * stagger,
              }}
              style={{
                display: "inline-block",
                ...(isHighlighted ? highlightStyle : {}),
                ...lineStyle,
              }}
            >
              {line}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
}
