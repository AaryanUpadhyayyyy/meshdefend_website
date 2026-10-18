"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface NumberCounterProps {
  value: string; // e.g. "4,820", "100%", "99.98%", "< 60s", "30–50%", "Up to 80%"
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function NumberCounter({
  value,
  duration = 1800,
  className = "",
  style = {},
}: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Initialize with the real value so SSR HTML, crawlers, and no-JS visitors see the true metric
  const [displayValue, setDisplayValue] = useState<string>(value);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) return;

    // Check prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplayValue(value);
      hasAnimatedRef.current = true;
      return;
    }

    // Extract all numbers in the string
    const numbers = value.match(/\d+(\.\d+)?/g);
    if (!numbers) {
      setDisplayValue(value);
      hasAnimatedRef.current = true;
      return;
    }

    hasAnimatedRef.current = true;
    const targets = numbers.map(Number);
    const startTimestamp = performance.now();

    let animationFrameId: number;

    const step = (timestamp: number) => {
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Spring-like ease out (cubic-bezier(0.16, 1, 0.3, 1))
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);

      let numIdx = 0;
      const currentString = value.replace(/\d+(\.\d+)?/g, (match) => {
        const target = targets[numIdx++];
        const hasDecimals = match.includes(".");
        const decimalPlaces = hasDecimals ? match.split(".")[1].length : 0;
        const current = target * easeOutProgress;

        if (decimalPlaces > 0) {
          return current.toFixed(decimalPlaces);
        }

        // Add thousands separator if original match has comma
        const intVal = Math.round(current);
        if (value.includes(",")) {
          return intVal.toLocaleString();
        }
        return String(intVal);
      });

      setDisplayValue(currentString);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, value, duration]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums", ...style }}
    >
      {displayValue}
    </span>
  );
}
