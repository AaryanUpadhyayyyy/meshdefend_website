"use client";

import React, { useEffect, useRef, useState } from "react";
import { REVEAL_CONFIG, type RevealVariant } from "./revealConfig";
import { observeReveal } from "./useScrollReveal";

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  variant?: RevealVariant;
  threshold?: number;
  margin?: string;
  id?: string;
}

export function Reveal({
  children,
  delay = 0,
  y = REVEAL_CONFIG.y,
  duration = REVEAL_CONFIG.duration,
  as = "div",
  className = "",
  style = {},
  variant = "fade-up",
  threshold = REVEAL_CONFIG.viewport.amount,
  margin = REVEAL_CONFIG.viewport.margin,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return observeReveal(
      el,
      () => {
        setRevealed(true);
      },
      { threshold, margin }
    );
  }, [threshold, margin]);

  const customStyle: React.CSSProperties = {
    ...style,
    ...(revealed && delay > 0 ? { transitionDelay: `${delay}s` } : {}),
    ...(duration !== REVEAL_CONFIG.duration
      ? { transitionDuration: `${duration}s` }
      : {}),
    ...(y !== REVEAL_CONFIG.y
      ? ({ "--reveal-y": `${y}px` } as React.CSSProperties)
      : {}),
  };

  const Tag = as as any;

  return (
    <Tag
      id={id}
      ref={ref}
      className={className}
      style={customStyle}
      data-reveal={variant}
      data-revealed={revealed ? "true" : "false"}
    >
      {children}
    </Tag>
  );
}

Reveal.displayName = "Reveal";
