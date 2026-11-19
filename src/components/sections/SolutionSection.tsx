"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { SOLUTION } from "@/lib/sections";
import { CapabilityList } from "./CapabilityList";
import type { CapabilityWheelItem } from "./CapabilityWheel";
import "./SolutionSection.css";

function clamp(val: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, val));
}

export function SolutionSection({ content }: { content?: Partial<typeof SOLUTION> } = {}) {
  const solution = {
    ...SOLUTION,
    ...content,
    columns: { ...SOLUTION.columns, ...content?.columns },
    items: content?.items ?? SOLUTION.items,
  };
  const headlineParts = solution.headline.match(/^(ResOC:)(\s*)(.*)$/);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeListSlide, setActiveListSlide] = useState(0);
  const [listDirection, setListDirection] = useState<-1 | 1>(1);
  const sectionRef = useRef<HTMLElement | null>(null);
  const listTrackRef = useRef<HTMLDivElement | null>(null);
  const listPinRef = useRef<HTMLDivElement | null>(null);
  const activeListSlideRef = useRef(0);
  const slideCount = solution.items.length;
  const listItemCount = Math.min(5, slideCount);

  // Natural sequential order 01 -> 02 -> 03 -> 04 -> 05
  const capabilityItems: CapabilityWheelItem[] = solution.items.map((item, index) => ({
    ...item,
    sourceIndex: index,
  }));

  const updateActiveListSlide = useCallback(
    (requestedIndex: number, requestedDirection?: -1 | 1) => {
      const nextIndex = Math.max(0, Math.min(listItemCount - 1, requestedIndex));
      const previousIndex = activeListSlideRef.current;
      if (nextIndex === previousIndex) return;

      const nextDirection = requestedDirection ?? (nextIndex > previousIndex ? 1 : -1);
      activeListSlideRef.current = nextIndex;
      setListDirection(nextDirection);
      setActiveListSlide(nextIndex);
    },
    [listItemCount]
  );

  const selectListSlide = useCallback(
    (requestedIndex: number, requestedDirection?: -1 | 1) => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        const track = listTrackRef.current;
        const pin = listPinRef.current;
        if (track && pin && window.getComputedStyle(pin).position === "sticky") {
          const trackTop = track.getBoundingClientRect().top + window.scrollY;
          const stickyTop = Number.parseFloat(window.getComputedStyle(pin).top) || 0;
          const scrollDistance = Math.max(1, track.offsetHeight - pin.offsetHeight);
          const progressTarget = (requestedIndex + 0.5) / listItemCount;
          const target = trackTop - stickyTop + scrollDistance * progressTarget;
          const lenis = (
            window as Window & {
              lenis?: { scrollTo?: (value: number, options?: { duration?: number; immediate?: boolean }) => void };
            }
          ).lenis;

          if (lenis?.scrollTo) {
            lenis.scrollTo(target, {
              duration: prefersReducedMotion ? 0 : 0.72,
              immediate: prefersReducedMotion,
            });
          } else {
            window.scrollTo({ top: target, behavior: prefersReducedMotion ? "auto" : "smooth" });
          }
          return;
        }
      }

      updateActiveListSlide(requestedIndex, requestedDirection);
    },
    [listItemCount, prefersReducedMotion, updateActiveListSlide]
  );

  useEffect(() => {
    if (listItemCount < 1) return;

    let frame = 0;
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    type HeroLenis = {
      on?: (event: "scroll", handler: () => void) => void;
      off?: (event: "scroll", handler: () => void) => void;
    };
    let lenis: HeroLenis | undefined;
    const readLenis = () => (window as Window & { lenis?: HeroLenis }).lenis;

    const updateActiveFromScroll = () => {
      if (!desktopQuery.matches) return;
      const track = listTrackRef.current;
      const pin = listPinRef.current;
      if (!track || !pin) return;

      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const stickyTop = Number.parseFloat(window.getComputedStyle(pin).top) || 0;
      const scrollStart = trackTop - stickyTop;
      const scrollDistance = Math.max(1, track.offsetHeight - pin.offsetHeight);
      const progress = clamp((window.scrollY - scrollStart) / scrollDistance);

      // Section heading and preview cards stay permanently pinned and visible - NO fading, NO vanishing
      pin.style.setProperty("--solution-header-y", "0px");
      pin.style.setProperty("--solution-header-opacity", "1");
      pin.style.setProperty("--solution-card-scale", "1");
      pin.style.setProperty("--solution-card-y", "0px");
      pin.style.setProperty("--solution-preview-scale", "1");

      // Weighted deliberate scroll dwell across the capabilities (0 to 4)
      const rawPos = progress * (listItemCount - 1);
      const cur = activeListSlideRef.current;

      let nextIndex = cur;
      if (rawPos > cur + 0.65 && cur < listItemCount - 1) {
        nextIndex = Math.min(listItemCount - 1, cur + 1);
      } else if (rawPos < cur - 0.35 && cur > 0) {
        nextIndex = Math.max(0, cur - 1);
      }

      // Telemetry dwell progress within current capability (0 to 1)
      const dwellFraction = clamp(rawPos - cur + 0.5);
      pin.style.setProperty("--solution-slide-dwell", String(dwellFraction.toFixed(3)));

      updateActiveListSlide(nextIndex);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveFromScroll();
      });
    };

    const subscribeToLenis = () => {
      const activeLenis = readLenis();
      if (!activeLenis || activeLenis === lenis) return;
      lenis?.off?.("scroll", requestUpdate);
      lenis = activeLenis;
      lenis.on?.("scroll", requestUpdate);
    };

    updateActiveFromScroll();
    window.requestAnimationFrame(subscribeToLenis);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      lenis?.off?.("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [listItemCount, updateActiveListSlide]);

  useEffect(() => {
    const lenis = (window as Window & { lenis?: { resize?: () => void } }).lenis;
    const timeout = window.setTimeout(() => lenis?.resize?.(), 220);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const header = document.querySelector<HTMLElement>(".nav-header");
    if (!section) return;

    const updateHeaderOffset = () => {
      const measuredBottom = header?.getBoundingClientRect().bottom ?? 71;
      section.style.setProperty("--solution-header-bottom", `${Math.max(0, measuredBottom)}px`);
    };

    updateHeaderOffset();
    const observer = header ? new ResizeObserver(updateHeaderOffset) : null;
    if (header && observer) observer.observe(header);
    window.addEventListener("resize", updateHeaderOffset);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateHeaderOffset);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="home-solution-section solution-section--light solution-section--list-mode"
    >
      <div className="container solution-section__container">
        <div
          ref={listTrackRef}
          className="solution-list-stage"
          style={{ height: `${listItemCount * 110}svh` }}
        >
          <div ref={listPinRef} className="solution-list-pin">
            <header className="solution-section__header">
              <div className="solution-section__intro">
                {solution.eyebrow && <p className="solution-section__eyebrow">{solution.eyebrow}</p>}
                <h2 className="solution-section__headline">
                  {headlineParts ? (
                    <>
                      <span className="solution-section__headline-accent">{headlineParts[1]}</span>
                      {headlineParts[2]}
                      {headlineParts[3]}
                    </>
                  ) : (
                    solution.headline
                  )}
                </h2>
              </div>

              <p className="solution-section__lede">{solution.lede}</p>
            </header>

            <CapabilityList
              items={capabilityItems}
              activeIndex={activeListSlide}
              direction={listDirection}
              onActiveIndexChange={selectListSlide}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
