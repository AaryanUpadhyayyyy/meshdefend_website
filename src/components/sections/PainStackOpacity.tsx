"use client";

import { useEffect } from "react";

const STACK_MEDIA_QUERY = "(min-width: 992px)";
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

        const stackDepth = stackedAbove + incomingOverlap;
        const opacity = Math.max(
          0.18,
          1 - 0.38 * stackDepth
        );
        const scale = Math.max(
          0.91,
          1 - 0.045 * stackDepth
        );
        const translateY = -12 * stackDepth;
        card.style.opacity = opacity.toFixed(3);
        card.style.transform = stackDepth > 0
          ? `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`
          : "";
        card.style.transformOrigin = "top center";
        card.style.filter = stackDepth > 0 ? `brightness(${(1 - 0.04 * stackDepth).toFixed(2)})` : "";
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
      cards.forEach((card) => {
        card.style.removeProperty("opacity");
        card.style.removeProperty("transform");
        card.style.removeProperty("transform-origin");
        card.style.removeProperty("filter");
      });
    };
  }, []);

  return null;
}
