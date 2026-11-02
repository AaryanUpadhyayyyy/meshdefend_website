"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import { SOLUTION } from "@/lib/sections";
import { Reveal } from "@/components/motion";
import { ResocSlideVisual } from "./ResocSlideVisuals";
import { ResOCJourney } from "@/components/hero/ResOCJourney";
import "./SolutionSection.css";

type SolutionView = "wheel" | "story" | "map";

const wheelPositions = [
  { x: 16, y: 8 },
  { x: 31, y: 29 },
  { x: 40, y: 50 },
  { x: 31, y: 71 },
  { x: 16, y: 92 },
];

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
  const [viewMode, setViewMode] = useState<SolutionView>("wheel");
  const [activeSlide, setActiveSlide] = useState(4);
  const wheelToggleId = useId();
  const storyToggleId = useId();
  const sectionRef = useRef<HTMLElement | null>(null);
  const wheelTrackRef = useRef<HTMLDivElement | null>(null);
  const wheelPinRef = useRef<HTMLDivElement | null>(null);
  const wheelNavRef = useRef<HTMLElement | null>(null);
  const storyTrackRef = useRef<HTMLDivElement | null>(null);
  const storyPinRef = useRef<HTMLDivElement | null>(null);
  const slideCount = solution.items.length;
  const wheelOrder = useMemo(() => [0, 1, 4, 3, 2].filter((index) => index < slideCount), [slideCount]);
  const wheelFlow = useMemo(() => [4, 3, 2, 0, 1].filter((index) => index < slideCount), [slideCount]);
  const showScrollStory = viewMode === "story";
  const activeItem = solution.items[activeSlide] ?? solution.items[0];

  useEffect(() => {
    if (viewMode === "map" || slideCount < 1) return;

    let frame = 0;
    const updateActiveSlide = () => {
      const isWheel = viewMode === "wheel";
      const track = isWheel ? wheelTrackRef.current : storyTrackRef.current;
      const pin = isWheel ? wheelPinRef.current : storyPinRef.current;
      if (!track || !pin) return;

      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const stickyTop = Number.parseFloat(window.getComputedStyle(pin).top) || 0;
      const scrollStart = trackTop - stickyTop;
      const scrollDistance = Math.max(1, track.offsetHeight - pin.offsetHeight);
      const progress = Math.max(0, Math.min(1, (window.scrollY - scrollStart) / scrollDistance));
      const stepCount = isWheel ? wheelFlow.length : slideCount;
      const step = Math.min(stepCount - 1, Math.floor(progress * stepCount));
      const nextSlide = isWheel ? wheelFlow[step] : step;

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
  }, [viewMode, slideCount, wheelOrder, wheelFlow]);

  useEffect(() => {
    if (viewMode !== "wheel" || window.matchMedia("(min-width: 761px)").matches) return;

    const nav = wheelNavRef.current;
    const activeButton = nav?.querySelector<HTMLElement>(`[data-capability-index="${activeSlide}"]`);
    if (!nav || !activeButton) return;

    const left = activeButton.offsetLeft - (nav.clientWidth - activeButton.offsetWidth) / 2;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    nav.scrollTo({ left, behavior: reducedMotion ? "auto" : "smooth" });
  }, [activeSlide, viewMode]);

  const scrollSectionToTop = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const targetTop = section.getBoundingClientRect().top + window.scrollY - 92;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
      });
    });
  };

  const handleViewChange = (mode: "wheel" | "story", checked: boolean) => {
    setViewMode((current) => checked ? mode : current === mode ? "map" : current);
    scrollSectionToTop();
  };

  const selectWheelCapability = (index: number) => {
    const step = wheelFlow.indexOf(index);
    const track = wheelTrackRef.current;
    const pin = wheelPinRef.current;
    if (step < 0 || !track || !pin) return;

    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const stickyTop = Number.parseFloat(window.getComputedStyle(pin).top) || 0;
    const scrollStart = trackTop - stickyTop;
    const scrollDistance = Math.max(1, track.offsetHeight - pin.offsetHeight);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: scrollStart + scrollDistance * (step / wheelFlow.length),
      behavior: reducedMotion ? "auto" : "smooth",
    });
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

  const viewToggle = (
    <div className="solution-section__mode-row" role="group" aria-label="ResOC presentation modes">
      <label className="solution-section__mode-toggle" htmlFor={wheelToggleId}>
        <input
          id={wheelToggleId}
          type="checkbox"
          checked={viewMode === "wheel"}
          onChange={(event) => handleViewChange("wheel", event.currentTarget.checked)}
          aria-controls={viewMode === "wheel" ? "solution-wheel-story" : undefined}
        />
        <span className="solution-section__mode-switch" aria-hidden="true" />
        <span>Capability wheel</span>
      </label>
      <label className="solution-section__mode-toggle" htmlFor={storyToggleId}>
        <input
          id={storyToggleId}
          type="checkbox"
          checked={viewMode === "story"}
          onChange={(event) => handleViewChange("story", event.currentTarget.checked)}
          aria-controls={viewMode === "story" ? "solution-scroll-story" : undefined}
        />
        <span className="solution-section__mode-switch" aria-hidden="true" />
        <span>Five-slide scroll view</span>
      </label>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="solution"
      className={`home-solution-section solution-section--light${showScrollStory ? " solution-section--story-mode" : viewMode === "wheel" ? " solution-section--wheel-mode" : ""}`}
    >
      <div className="container solution-section__container">
        {viewMode === "wheel" ? (
          <div
            ref={wheelTrackRef}
            id="solution-wheel-story"
            className="solution-wheel-story"
            style={{ height: `${Math.max(1, wheelOrder.length) * 100}svh` }}
          >
            <div ref={wheelPinRef} className="solution-wheel-story__pin">
              {viewToggle}
              {sectionHeader}

              <div className="solution-wheel-story__layout">
                <nav ref={wheelNavRef} className="solution-capability-wheel" aria-label="ResOC capabilities">
                  <svg className="solution-capability-wheel__path" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M64 40 C118 62 154 91 124 145 C94 199 99 221 160 250 C99 279 94 301 124 355 C154 409 118 438 64 460" />
                    {wheelOrder.map((index, position) => {
                      const point = wheelPositions[position] ?? wheelPositions[wheelPositions.length - 1];
                      return (
                        <circle
                          key={solution.items[index].num}
                          className={index === activeSlide ? "is-active" : ""}
                          cx={point.x * 4}
                          cy={point.y * 5}
                          r={index === activeSlide ? 7 : 4}
                        />
                      );
                    })}
                  </svg>
                  {wheelOrder.map((index, position) => {
                    const item = solution.items[index];
                    const point = wheelPositions[position] ?? wheelPositions[wheelPositions.length - 1];
                    const isActive = index === activeSlide;
                    return (
                      <button
                        key={item.num}
                        type="button"
                        className={`solution-capability-wheel__item${isActive ? " is-active" : ""}`}
                        style={{ "--wheel-x": `${point.x}%`, "--wheel-y": `${point.y}%` } as CSSProperties}
                        data-capability-index={index}
                        aria-current={isActive ? "step" : undefined}
                        aria-label={`Show capability ${item.num}: ${item.capability}`}
                        onClick={() => selectWheelCapability(index)}
                      >
                        <span className="solution-capability-wheel__icon"><CapabilityIcon index={index} /></span>
                        <span className="solution-capability-wheel__label">{item.capability}</span>
                      </button>
                    );
                  })}
                </nav>

                {activeItem && (
                  <div className="solution-wheel-feature" aria-live="polite">
                    <div className="solution-wheel-feature__visual-card">
                      <div className="solution-wheel-feature__chrome" aria-hidden="true">
                        <span className="solution-wheel-feature__traffic-lights"><i /><i /><i /></span>
                        <span className="solution-wheel-feature__brand">ResOC</span>
                        <span className="solution-wheel-feature__chrome-title">{activeItem.capability}</span>
                      </div>
                      <div key={activeSlide} className="solution-wheel-feature__visual">
                        <ResocSlideVisual index={activeSlide} />
                      </div>
                    </div>

                    <article key={activeSlide} className="solution-wheel-feature__copy">
                      <span className="solution-story__index">CAPABILITY {activeItem.num} / {String(slideCount).padStart(2, "0")}</span>
                      <h3>{activeItem.capability}</h3>
                      <p>{activeItem.solves}</p>
                      <Link href={activeItem.href} className="solution-story__link">
                        Read more <span aria-hidden="true">→</span>
                      </Link>
                    </article>
                  </div>
                )}
              </div>

            </div>
          </div>
        ) : showScrollStory ? (
          <div
            ref={storyTrackRef}
            id="solution-scroll-story"
            className="solution-story"
            style={{ height: `${slideCount * 100}svh` }}
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
          </div>
        ) : (
          <>
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
          </>
        )}
        <ResOCJourney className="solution-section__journey" />
      </div>
    </section>
  );
}
