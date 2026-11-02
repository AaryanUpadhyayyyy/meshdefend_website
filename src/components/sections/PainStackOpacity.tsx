"use client";

import { useEffect } from "react";

const STACK_MEDIA_QUERY = "(min-width: 1200px)";
const STACK_OPACITY_STEP = 0.5;

/** Applies 100%, 50%, then 0% opacity by each card's position in the stack. */
export function PainStackOpacity() {
  useEffect(() => {
    const section = document.getElementById("pain");
    if (!section) return;

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>(".pain-feature-row")
    );
    if (!cards.length) return;

    const media = window.matchMedia(STACK_MEDIA_QUERY);
    let frame = 0;

    const updateOpacity = () => {
      frame = 0;

      if (!media.matches) {
        cards.forEach((card) => card.style.removeProperty("opacity"));
        return;
      }

      const rects = cards.map((card) => card.getBoundingClientRect());
      const stickyTop = Number.parseFloat(getComputedStyle(cards[0]).top) || 104;

      cards.forEach((card, index) => {
        let stackedAbove = 0;
        while (
          index + stackedAbove + 1 < cards.length &&
          rects[index + stackedAbove + 1].top <= stickyTop + 1
        ) {
          stackedAbove += 1;
        }

        const topOfStackIndex = index + stackedAbove;
        const incomingIndex = topOfStackIndex + 1;
        let incomingOverlap = 0;

        if (incomingIndex < cards.length) {
          const topCard = rects[topOfStackIndex];
          const incomingCard = rects[incomingIndex];
          incomingOverlap = Math.max(
            0,
            Math.min(
              1,
              (stickyTop + topCard.height - incomingCard.top) / topCard.height
            )
          );
        }

        const opacity = Math.max(
          0,
          1 - STACK_OPACITY_STEP * (stackedAbove + incomingOverlap)
        );
        card.style.opacity = opacity.toFixed(3);
      });
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateOpacity);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    media.addEventListener("change", scheduleUpdate);
    updateOpacity();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      media.removeEventListener("change", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      cards.forEach((card) => card.style.removeProperty("opacity"));
    };
  }, []);

  return null;
}
