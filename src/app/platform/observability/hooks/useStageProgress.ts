"use client";

import { useState, useEffect, RefObject } from "react";

/**
 * useStageProgress
 * Tracks the normalized 0..1 scroll progress through a tall sticky container
 * without causing unnecessary re-renders when progress delta is below epsilon.
 */
export function useStageProgress(containerRef: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const totalScrollable = rect.height - window.innerHeight;
          
          if (totalScrollable <= 0) {
            setProgress(0);
            ticking = false;
            return;
          }

          // When top of container hits top of viewport (rect.top <= 0)
          const scrolled = -rect.top;
          const rawProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
          
          setProgress(Number(rawProgress.toFixed(4)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef]);

  return progress;
}
