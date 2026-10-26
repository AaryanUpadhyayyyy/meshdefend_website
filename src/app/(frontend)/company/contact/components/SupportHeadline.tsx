"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HEADLINE_TEXT = "Reach the MeshDefend team.";

export function SupportHeadline() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const characters = Array.from(HEADLINE_TEXT);

  return (
    <h1
      aria-label={HEADLINE_TEXT}
      style={{
        fontFamily: "var(--font-serif, 'Instrument Serif', Georgia, serif)",
        fontSize: "clamp(42px, 4.8vw, 68px)",
        lineHeight: 1.04,
        letterSpacing: "-0.03em",
        color: "#fefdfd",
        margin: "0 0 20px",
        fontWeight: 400,
        display: "block",
      }}
    >
      {reducedMotion ? (
        <span>{HEADLINE_TEXT}</span>
      ) : (
        <span aria-hidden="true" style={{ display: "inline" }}>
          {characters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.02, // 20ms stagger
                ease: [0.2, 0.7, 0.2, 1],
              }}
              style={{
                display: "inline-block",
                whiteSpace: char === " " ? "pre" : "normal",
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      )}
    </h1>
  );
}
