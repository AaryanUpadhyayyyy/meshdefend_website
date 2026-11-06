"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { SOLUTION } from "@/lib/sections";
import { Reveal } from "@/components/motion";
import { CapabilityList } from "./CapabilityList";
import { CapabilityWheel, type CapabilityWheelItem } from "./CapabilityWheel";
import { ResocSlideVisual } from "./ResocSlideVisuals";
import { ResOCJourney } from "@/components/hero/ResOCJourney";
import { ResocViewToggle, type SolutionView } from "./ResocViewToggle";
import "./SolutionSection.css";

function CapabilityIcon({ index }: { index: number }) {
  const icons = [
    <>
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="m15 15 5 5M8 10.5h5M10.5 8v5" />
    </>,
    <>
      <path d="m12 3 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4M4 17l8 4 8-4" />
    </>,
    <>
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
    </>,
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="m8 6.3 8-.1M7.2 8l3.6 8M16.8 9l-3.6 7" />
    </>,
    <>
      <path d="M12 3 5 6v5c0 4.7 2.8 8 7 10 4.2-2 7-5.3 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>,
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[index % icons.length]}
    </svg>
  );
}

function CapabilityConnectors() {
  return (
    <svg
      className="solution-section__connectors"
      viewBox="0 0 1000 500"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="solution-dot-glow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path id="solution-connector-1" d="M500 158 C444 158 426 82 370 82" />
      <path id="solution-connector-2" d="M500 158 C444 158 426 250 370 250" />
      <path id="solution-connector-3" d="M500 158 C556 158 574 82 630 82" />
      <path id="solution-connector-4" d="M500 158 C556 158 574 250 630 250" />
      <path id="solution-connector-5" d="M500 300 C500 328 500 344 500 370" />
      <circle cx="500" cy="158" r="4" />
      <circle cx="370" cy="82" r="3" />
      <circle cx="370" cy="250" r="3" />
      <circle cx="630" cy="82" r="3" />
      <circle cx="630" cy="250" r="3" />
      <circle cx="500" cy="370" r="3" />
      {[1, 2, 3, 4, 5].map((connector, index) => (
        <circle
          key={connector}
          className="solution-section__travel-dot"
          r={index === 4 ? 2.4 : 2.8}
          filter="url(#solution-dot-glow)"
        >
          <animateMotion
            dur={`${4.8 + index * 0.35}s`}
            begin={`${index * 0.62}s`}
            repeatCount="indefinite"
            calcMode="paced"
          >
            <mpath href={`#solution-connector-${connector}`} />
          </animateMotion>
        </circle>
      ))}
    </svg>
  );
}

export function SolutionSection({ content }: { content?: Partial<typeof SOLUTION> } = {}) {
  const solution = {
    ...SOLUTION,
    ...content,
    columns: { ...SOLUTION.columns, ...content?.columns },
    items: content?.items ?? SOLUTION.items,
  };
  const headlineParts = solution.headline.match(/^(ResOC:)(\s*)(.*)$/);
  const [viewMode, setViewMode] = useState<SolutionView>("list");
  const [sectionView, setSectionView] = useState<SolutionView>("list");
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeSlide, setActiveSlide] = useState(4);
  const [activeListSlide, setActiveListSlide] = useState(0);
  const [listDirection, setListDirection] = useState<-1 | 1>(1);
  const sectionRef = useRef<HTMLElement | null>(null);
  const listTrackRef = useRef<HTMLDivElement | null>(null);
  const listPinRef = useRef<HTMLDivElement | null>(null);
  const activeListSlideRef = useRef(0);
  const storyTrackRef = useRef<HTMLDivElement | null>(null);
  const storyPinRef = useRef<HTMLDivElement | null>(null);
  const slideCount = solution.items.length;
  const listItemCount = Math.min(5, slideCount);
  const wheelItems: CapabilityWheelItem[] = [0, 1, 4, 3, 2]
    .filter((index) => index < slideCount)
    .map((sourceIndex) => ({ ...solution.items[sourceIndex], sourceIndex }));

  const updateActiveListSlide = useCallback((requestedIndex: number, requestedDirection?: -1 | 1) => {
    const nextIndex = Math.max(0, Math.min(listItemCount - 1, requestedIndex));
    const previousIndex = activeListSlideRef.current;
    if (nextIndex === previousIndex) return;

    const nextDirection = requestedDirection ?? (nextIndex > previousIndex ? 1 : -1);
    activeListSlideRef.current = nextIndex;
    setListDirection(nextDirection);
    setActiveListSlide(nextIndex);
  }, [listItemCount]);

  const selectListSlide = useCallback((requestedIndex: number, requestedDirection?: -1 | 1) => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      const track = listTrackRef.current;
      const pin = listPinRef.current;
      if (track && pin && window.getComputedStyle(pin).position === "sticky") {
        const trackTop = track.getBoundingClientRect().top + window.scrollY;
        const stickyTop = Number.parseFloat(window.getComputedStyle(pin).top) || 0;
        const scrollDistance = Math.max(1, track.offsetHeight - pin.offsetHeight);
        const target = trackTop - stickyTop + scrollDistance * ((requestedIndex + 0.5) / listItemCount);
        const lenis = (window as Window & {
          lenis?: { scrollTo?: (value: number, options?: { duration?: number; immediate?: boolean }) => void };
        }).lenis;

        if (lenis?.scrollTo) {
          lenis.scrollTo(target, { duration: prefersReducedMotion ? 0 : 0.72, immediate: prefersReducedMotion });
        } else {
          window.scrollTo({ top: target, behavior: prefersReducedMotion ? "auto" : "smooth" });
        }
        return;
      }
    }

    updateActiveListSlide(requestedIndex, requestedDirection);
  }, [listItemCount, prefersReducedMotion, updateActiveListSlide]);

  useEffect(() => {
    if (viewMode !== "list" || sectionView !== "list" || listItemCount < 1) return;

    let frame = 0;
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const updateActiveFromScroll = () => {
      if (!desktopQuery.matches) return;
      const track = listTrackRef.current;
      const pin = listPinRef.current;
      if (!track || !pin) return;

      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const stickyTop = Number.parseFloat(window.getComputedStyle(pin).top) || 0;
      const scrollStart = trackTop - stickyTop;
      const scrollDistance = Math.max(1, track.offsetHeight - pin.offsetHeight);
      const progress = Math.max(0, Math.min(1, (window.scrollY - scrollStart) / scrollDistance));
      const nextIndex = Math.min(listItemCount - 1, Math.floor(progress * listItemCount));
      updateActiveListSlide(nextIndex);
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveFromScroll();
      });
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [listItemCount, sectionView, updateActiveListSlide, viewMode]);

  useEffect(() => {
    if (viewMode !== "slides" || slideCount < 1) return;

    let frame = 0;
    const updateActiveSlide = () => {
      const track = storyTrackRef.current;
      const pin = storyPinRef.current;
      if (!track || !pin) return;

      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const stickyTop = Number.parseFloat(window.getComputedStyle(pin).top) || 0;
      const scrollStart = trackTop - stickyTop;
      const scrollDistance = Math.max(1, track.offsetHeight - pin.offsetHeight);
      const progress = Math.max(0, Math.min(1, (window.scrollY - scrollStart) / scrollDistance));
      const step = Math.min(slideCount - 1, Math.floor(progress * slideCount));
      const nextSlide = step;

      setActiveSlide((current) => current === nextSlide ? current : nextSlide);
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveSlide();
      });
    };

    updateActiveSlide();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [viewMode, slideCount]);

  useEffect(() => {
    const lenis = (window as Window & { lenis?: { resize?: () => void } }).lenis;
    const timeout = window.setTimeout(() => lenis?.resize?.(), 220);
    return () => window.clearTimeout(timeout);
  }, [viewMode]);

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

  const scrollSectionToTop = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const headerBottom = document.querySelector<HTMLElement>(".nav-header")?.getBoundingClientRect().bottom ?? 71;
        const targetTop = section.getBoundingClientRect().top + window.scrollY - headerBottom - 8;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
      });
    });
  };

  const handleViewChange = (mode: SolutionView) => {
    if (mode === viewMode) return;
    setViewMode(mode);
    scrollSectionToTop();
  };

  const sectionHeader = (
    <header className="solution-section__header">
      <Reveal className="solution-section__intro">
        {solution.eyebrow && <p className="solution-section__eyebrow">{solution.eyebrow}</p>}
        <h2 className="solution-section__headline">
          {headlineParts ? (
            <>
              <span className="solution-section__headline-accent">{headlineParts[1]}</span>
              {headlineParts[2]}
              {headlineParts[3]}
            </>
          ) : solution.headline}
        </h2>
      </Reveal>

      <Reveal as="p" className="solution-section__lede" delay={0.12}>
        {solution.lede}
      </Reveal>
    </header>
  );

  const viewToggle = <ResocViewToggle view={viewMode} onChange={handleViewChange} />;
  const rootModeClass = sectionView === "list"
    ? "solution-section--list-mode"
    : sectionView === "wheel"
      ? "solution-section--wheel-mode"
      : sectionView === "slides"
        ? "solution-section--story-mode"
        : "solution-section--map-mode";

  return (
    <section
      ref={sectionRef}
      id="solution"
      className={`home-solution-section solution-section--light ${rootModeClass}`}
    >
      <div className="container solution-section__container">
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => setSectionView(viewMode)}>
          {viewMode === "list" ? (
            <motion.div
              key="list"
              ref={listTrackRef}
              className="solution-list-stage"
              style={{ height: `${wheelItems.length * 100}svh` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div ref={listPinRef} className="solution-list-pin">
                {viewToggle}
                {sectionHeader}
                <CapabilityList
                  items={wheelItems}
                  activeIndex={activeListSlide}
                  direction={listDirection}
                  onActiveIndexChange={selectListSlide}
                />
              </div>
            </motion.div>
          ) : viewMode === "wheel" ? (
            <motion.div
              key="wheel"
              id="solution-wheel-story"
              className="solution-wheel-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {viewToggle}
              {sectionHeader}
              <CapabilityWheel items={wheelItems} />
            </motion.div>
          ) : viewMode === "slides" ? (
            <motion.div
              key="slides"
              ref={storyTrackRef}
              id="solution-scroll-story"
              className="solution-story"
              style={{ height: `${slideCount * 100}svh` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div ref={storyPinRef} className="solution-story__pin">
                {viewToggle}
                {sectionHeader}

                <div className="solution-story__viewport" aria-label="ResOC capabilities">
                  {solution.items.map((item, index) => (
                    <article
                      key={item.num}
                      className={`solution-story__slide${index === activeSlide ? " is-active" : ""}`}
                      aria-hidden={index !== activeSlide}
                    >
                      <div className="solution-story__copy">
                        <span className="solution-story__index">CAPABILITY {item.num} / {String(slideCount).padStart(2, "0")}</span>
                        <h3>{item.capability}</h3>
                        <p>{item.solves}</p>
                        <Link href={item.href} className="solution-story__link" tabIndex={index === activeSlide ? 0 : -1}>
                          Read more <span aria-hidden="true">→</span>
                        </Link>
                      </div>

                      <div className="solution-story__image-frame">
                        <ResocSlideVisual index={index} />
                      </div>
                    </article>
                  ))}
                </div>

                <div className="solution-story__progress" aria-live="polite">
                  <div className="solution-story__progress-track" aria-hidden="true">
                    {solution.items.map((item, index) => (
                      <span key={item.num} className={index <= activeSlide ? "is-complete" : ""} />
                    ))}
                  </div>
                  <span>{String(activeSlide + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="map"
              className="solution-map-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {viewToggle}
              {sectionHeader}

              <div className="solution-section__legend" aria-label="Capability list columns">
                <span className="solution-section__legend-number">{solution.columns.number}</span>
                <span>{solution.columns.col1}</span>
                <span className="solution-section__legend-arrow" aria-hidden="true">→</span>
                <span>{solution.columns.col2}</span>
              </div>

              <div id="solution-orbital-diagram" className="solution-section__stage">
                <CapabilityConnectors />

                <div className="solution-section__core" aria-hidden="true">
                  <div className="solution-section__core-orbit" />
                  <div className="solution-section__core-orb">ResOC</div>
                </div>

                {solution.items.map((item, index) => (
                  <Reveal
                    key={item.num}
                    className={`solution-capability solution-capability--${index + 1}`}
                    delay={0.08 * (index + 1)}
                    duration={0.48}
                  >
                    <Link className="solution-capability__link" href={item.href}>
                      <div className="solution-capability__heading">
                        <span className="solution-capability__icon">
                          <CapabilityIcon index={index} />
                        </span>
                        <span className="solution-capability__number">{item.num}</span>
                        <h3>{item.capability}</h3>
                        <span className="solution-capability__arrow" aria-hidden="true">→</span>
                      </div>
                      <p>{item.solves}</p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {viewMode !== "list" && <ResOCJourney className="solution-section__journey" />}
      </div>
    </section>
  );
}
