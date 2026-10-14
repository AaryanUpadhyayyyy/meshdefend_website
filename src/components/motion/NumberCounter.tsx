"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface NumberCounterProps {
  value: string; // e.g. "4,820", "100%", "99.98%", "< 60s", "30–50%"
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
  const [displayValue, setDisplayValue] = useState<string>(() => {
    // If it's a range like "30–50%", start at "0–0%"
    // If it has a prefix like "< 60s", start at "< 0s"
    return value.replace(/\d+(\.\d+)?/g, "0");
  });

  useEffect(() => {
    if (!isInView) return;

    // Extract all numbers in the string
    const numbers = value.match(/\d+(\.\d+)?/g);
    if (!numbers) {
      setDisplayValue(value);
      return;
    }

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

        // Add thousands separator if match has comma
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

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {displayValue}
    </span>
  );
}
