"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ResocSlideVisual } from "./ResocSlideVisuals";

export type CapabilityWheelItem = {
  sourceIndex: number;
  num: string;
  capability: string;
  solves: string;
  href: string;
};

type Geometry = {
  zoneWidth: number;
  height: number;
  horizontal: boolean;
  centerX: number;
  centerY: number;
  itemRadius: number;
  discRadius: number;
};

const EMPTY_GEOMETRY: Geometry = {
  zoneWidth: 0,
  height: 0,
  horizontal: false,
  centerX: 0,
  centerY: 0,
  itemRadius: 0,
  discRadius: 0,
};

const ITEM_HALF_WIDTH = 200;
const ACTIVE_LABEL_CENTER_OFFSET = 22;
const MAX_LABEL_HALF_HEIGHT = 43;
const LABEL_CLEARANCE = 21;
const VISUAL_WIDTH = 1200;
const VISUAL_HEIGHT = 620;
const WHEEL_DURATION = 860;
const WHEEL_LOCK_MS = 940;
const WHEEL_DELTA_THRESHOLD = 40;
function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function positiveModulo(value: number, modulus: number) {
  return ((value % modulus) + modulus) % modulus;
}

function getCircularWheelPoint(
  rawDelta: number,
  count: number,
  centerX: number,
  centerY: number,
  radius: number,
  slotSpacing: number,
) {
  const halfSlots = (count - 1) / 2;
  let delta: number;
  let x: number;
  let opacity = 1;

  // The front arc uses fixed, equally spaced slots. When an item leaves one
  // end, carry it behind the off-screen hub and bring it back at the other.
  if (rawDelta < -halfSlots && rawDelta > -halfSlots - 1) {
    const progress = clamp(-halfSlots - rawDelta, 0, 1);
    delta = -halfSlots + (count - 1) * progress;
    const yOffset = delta * slotSpacing;
    x = centerX + Math.sqrt(Math.max(0, radius * radius - yOffset * yOffset)) - Math.sin(Math.PI * progress) * (radius + 24);
    opacity = Math.abs(Math.cos(Math.PI * progress));
  } else if (rawDelta > halfSlots && rawDelta < halfSlots + 1) {
    const progress = clamp(rawDelta - halfSlots, 0, 1);
    delta = halfSlots - (count - 1) * progress;
    const yOffset = delta * slotSpacing;
    x = centerX + Math.sqrt(Math.max(0, radius * radius - yOffset * yOffset)) - Math.sin(Math.PI * progress) * (radius + 24);
    opacity = Math.abs(Math.cos(Math.PI * progress));
  } else {
    delta = positiveModulo(rawDelta + halfSlots, count) - halfSlots;
    const yOffset = delta * slotSpacing;
    x = centerX + Math.sqrt(Math.max(0, radius * radius - yOffset * yOffset));
  }

  return {
    delta,
    x,
    y: centerY + delta * slotSpacing,
    opacity,
  };
}

function easeWheel(progress: number) {
  const damping = 8;
  const frequency = 6;
  const response = (time: number) => 1 - Math.exp(-damping * time) * (
    Math.cos(frequency * time) + (damping / frequency) * Math.sin(frequency * time)
  );
  return clamp(response(progress) / response(1), 0, 1.02);
}

function ScaledCapabilityVisual({ index }: { index: number }) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      const { width, height } = viewport.getBoundingClientRect();
      const styles = window.getComputedStyle(viewport);
      const availableWidth = width - Number.parseFloat(styles.paddingLeft) - Number.parseFloat(styles.paddingRight);
      const availableHeight = height - Number.parseFloat(styles.paddingTop) - Number.parseFloat(styles.paddingBottom);
      // Treat 1.2 as a maximum enlargement, not a multiplier after fitting.
      // Multiplying a fitted image by 1.2 made it spill out of the visual
      // stage and cover the description and Read more link on shorter screens.
      const nextScale = Math.min(availableWidth / VISUAL_WIDTH, availableHeight / VISUAL_HEIGHT, 1.2);
      setScale(Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 0);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={viewportRef} className="solution-wheel-feature__visual">
      <div
        className="solution-wheel-feature__visual-scale"
        style={{
          width: VISUAL_WIDTH,
          height: VISUAL_HEIGHT,
          transform: `translate(-50%, -50%) scale(${scale ?? 0})`,
          visibility: scale === null || scale <= 0 ? "hidden" : "visible",
        }}
      >
        <ResocSlideVisual index={index} />
      </div>
    </div>
  );
}

export function CapabilityWheel({ items }: { items: CapabilityWheelItem[] }) {
  const initialIndex = Math.min(2, Math.max(0, items.length - 1));
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<-1 | 1>(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [geometry, setGeometry] = useState(EMPTY_GEOMETRY);
  const wheelColumnRef = useRef<HTMLDivElement | null>(null);
  const zoneRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rimNodeRefs = useRef<Array<SVGGElement | null>>([]);
  const spokesRef = useRef<SVGGElement | null>(null);
  const geometryRef = useRef(EMPTY_GEOMETRY);
  const positionRef = useRef(initialIndex);
  const targetIndexRef = useRef(initialIndex);
  const targetPositionRef = useRef(initialIndex);
  const animationFrameRef = useRef<number | null>(null);
  const reactId = useId().replaceAll(":", "");
  const panelId = `capability-wheel-panel-${reactId}`;
  const itemIds = items.map((_, index) => `capability-wheel-tab-${reactId}-${index}`);

  const paintPosition = useCallback((position: number) => {
    const { centerX, centerY, itemRadius, discRadius, height, horizontal } = geometryRef.current;
    if (!itemRadius || !centerY) return;

    const count = itemRefs.current.length;
    const verticalRoom = Math.max(0, height / 2 - MAX_LABEL_HALF_HEIGHT - LABEL_CLEARANCE);
    const slotSpacing = count > 1 ? Math.min(112, verticalRoom * 2 / (count - 1)) : 0;

    itemRefs.current.forEach((button, index) => {
      if (!button) return;
      const point = getCircularWheelPoint(index - position, count, centerX, centerY, itemRadius, slotSpacing);
      const distance = Math.abs(point.delta);
      const activeMix = clamp(1 - distance, 0, 1);
      const labelCenterX = point.x - activeMix * ACTIVE_LABEL_CENTER_OFFSET;
      const baseFontSize = clamp(window.innerWidth * 0.01, 14, 17);
      const activeFontSize = clamp(window.innerWidth * 0.019, 30, 36);
      button.style.setProperty("--wheel-item-transform", horizontal ? "none" : `translate3d(${labelCenterX}px, ${point.y}px, 0) translate(-50%, -50%) scale(${0.94 + activeMix * 0.1})`);
      button.style.opacity = String(point.opacity);
      button.style.pointerEvents = point.opacity > 0.2 ? "auto" : "none";
      button.style.setProperty("--wheel-active-mix", `${activeMix * 100}%`);
      button.style.setProperty("--wheel-active-progress", String(activeMix));
      button.style.setProperty("--wheel-label-font-size", `${baseFontSize + (activeFontSize - baseFontSize) * activeMix}px`);
      button.style.setProperty("--wheel-tint-mix", `${activeMix * 9}%`);
      button.style.setProperty("--wheel-shadow-mix", `${activeMix * 18}%`);
      button.style.setProperty("--wheel-label-scale", String(1 + activeMix * 0.02));
      button.style.setProperty("--wheel-icon-scale", String(1 + activeMix * 0.06));
    });

    rimNodeRefs.current.forEach((node, index) => {
      if (!node) return;
      const point = getCircularWheelPoint(index + 0.5 - position, count, centerX, centerY, discRadius, slotSpacing);
      node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
      node.style.opacity = String(point.opacity);
    });

    if (spokesRef.current) {
      spokesRef.current.style.transformOrigin = `${centerX}px ${centerY}px`;
      spokesRef.current.style.transform = `rotate(${-position * (360 / Math.max(count, 1))}deg)`;
    }
  }, []);

  useEffect(() => {
    const column = wheelColumnRef.current;
    if (!column) return;

    const measure = () => {
      const width = window.innerWidth;
      const height = column.clientHeight;
      if (!height) return;

      const itemRadius = Math.min(
        clamp(height * 0.9 - 10, 300, 560),
        column.clientWidth - ITEM_HALF_WIDTH - 2,
      );
      const activeX = itemRadius;
      const horizontal = width < 1024;
      const nextGeometry: Geometry = {
        zoneWidth: horizontal ? column.clientWidth : Math.min(column.clientWidth, activeX + ITEM_HALF_WIDTH + 24),
        height,
        horizontal,
        centerX: 0,
        centerY: height / 2,
        itemRadius,
        // Keep the text centered on the wheel rim: half of the label sits
        // inside the disc and half outside. The radius is viewport based,
        // never derived from the currently selected label's width.
        discRadius: itemRadius,
      };
      geometryRef.current = nextGeometry;
      setGeometry(nextGeometry);
      paintPosition(positionRef.current);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    // The radius and spacing are derived only from the wheel viewport; label
    // resizing during the spring animation must not trigger layout measuring.
    resizeObserver.observe(column);
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [activeIndex, paintPosition]);

  const goTo = useCallback((requestedIndex: number, requestedDirection?: -1 | 1) => {
    const count = items.length;
    const nextIndex = positiveModulo(requestedIndex, count);
    if (nextIndex === targetIndexRef.current) return;

    const previousTarget = targetIndexRef.current;
    const forwardDistance = positiveModulo(nextIndex - previousTarget, count);
    const signedDistance = requestedDirection
      ? (requestedDirection > 0 ? forwardDistance : forwardDistance - count)
      : (forwardDistance > count / 2 ? forwardDistance - count : forwardDistance);
    const nextPosition = targetPositionRef.current + signedDistance;
    targetIndexRef.current = nextIndex;
    targetPositionRef.current = nextPosition;
    setDirection(signedDistance > 0 ? 1 : -1);
    setActiveIndex(nextIndex);
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      positionRef.current = nextPosition;
      paintPosition(nextPosition);
      return;
    }

    const from = positionRef.current;
    const startedAt = performance.now();
    const animate = (now: number) => {
      const progress = clamp((now - startedAt) / WHEEL_DURATION, 0, 1);
      const eased = easeWheel(progress);
      const position = from + (nextPosition - from) * eased;
      positionRef.current = position;
      paintPosition(position);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        positionRef.current = nextPosition;
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [items.length, paintPosition]);

  useEffect(() => () => {
    if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
  }, []);

  useEffect(() => {
    paintPosition(positionRef.current);
  }, [geometry, paintPosition]);

  useEffect(() => {
    if (!geometry.horizontal) return;
    const zone = zoneRef.current;
    const button = itemRefs.current[activeIndex];
    if (!zone || !button) return;
    zone.scrollTo({ left: Math.max(0, button.offsetLeft - 2), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [activeIndex, geometry.horizontal]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(media.matches);
    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone || items.length < 2) return;

    const finePointerQuery = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    let accumulator = 0;
    let lastEventAt = 0;
    let lastDeltaMagnitude = 0;
    let lockedUntil = 0;
    let awaitFreshGesture = false;
    let lastDirection = 0;

    const onWheel = (event: WheelEvent) => {
      const direction = Math.sign(event.deltaY);
      if (!direction) return;

      event.preventDefault();
      const now = performance.now();
      const multiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1;
      const delta = event.deltaY * multiplier;
      const magnitude = Math.abs(delta);

      if (now < lockedUntil) {
        lastEventAt = now;
        lastDeltaMagnitude = magnitude;
        return;
      }

      if (awaitFreshGesture) {
        const quietLongEnough = now - lastEventAt >= 90;
        const freshFlick = magnitude > lastDeltaMagnitude;
        if (!quietLongEnough && !freshFlick) {
          lastEventAt = now;
          lastDeltaMagnitude = magnitude;
          return;
        }
        awaitFreshGesture = false;
        accumulator = 0;
      }

      if (now - lastEventAt > 150 || (lastDirection && direction !== lastDirection)) accumulator = 0;
      accumulator += delta;
      lastDirection = direction;
      lastEventAt = now;
      lastDeltaMagnitude = magnitude;

      if (Math.abs(accumulator) >= WHEEL_DELTA_THRESHOLD) {
        goTo(targetIndexRef.current + direction, direction > 0 ? 1 : -1);
        accumulator = 0;
        lockedUntil = now + WHEEL_LOCK_MS;
        awaitFreshGesture = true;
      }
    };

    const attach = () => zone.addEventListener("wheel", onWheel, { passive: false });
    const detach = () => zone.removeEventListener("wheel", onWheel);
    if (finePointerQuery.matches) attach();
    const onMediaChange = (event: MediaQueryListEvent) => event.matches ? attach() : detach();
    finePointerQuery.addEventListener("change", onMediaChange);

    return () => {
      detach();
      finePointerQuery.removeEventListener("change", onMediaChange);
    };
  }, [goTo, items.length]);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    let nextDirection: -1 | 1 | undefined;
    if (geometry.horizontal) {
      if (event.key === "ArrowRight") { nextIndex = (index + 1) % items.length; nextDirection = 1; }
      if (event.key === "ArrowLeft") { nextIndex = positiveModulo(index - 1, items.length); nextDirection = -1; }
    } else {
      if (event.key === "ArrowDown") { nextIndex = (index + 1) % items.length; nextDirection = 1; }
      if (event.key === "ArrowUp") { nextIndex = positiveModulo(index - 1, items.length); nextDirection = -1; }
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = items.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    goTo(nextIndex, nextDirection);
    requestAnimationFrame(() => itemRefs.current[nextIndex!]?.focus());
  };

  if (!items.length) return null;

  const activeItem = items[activeIndex] ?? items[0];
  const centerGap = Math.min(64, Math.max(48, geometry.height * 0.08));
  const gapAngle = geometry.discRadius > 0 ? Math.asin(clamp(centerGap / geometry.discRadius, 0, 0.9)) : 0;
  const rimBottomX = geometry.centerX + geometry.discRadius * Math.cos(gapAngle);
  const rimBottomY = geometry.centerY + geometry.discRadius * Math.sin(gapAngle);
  const rimTopX = geometry.centerX + geometry.discRadius * Math.cos(gapAngle);
  const rimTopY = geometry.centerY - geometry.discRadius * Math.sin(gapAngle);
  const rimPath = `M ${rimBottomX} ${rimBottomY} A ${geometry.discRadius} ${geometry.discRadius} 0 1 1 ${rimTopX} ${rimTopY}`;
  const cssVars = {
    "--wheel-zone-width": `${geometry.zoneWidth}px`,
    "--wheel-disc-left": `${geometry.centerX - geometry.discRadius}px`,
    "--wheel-disc-top": `${geometry.centerY - geometry.discRadius}px`,
    "--wheel-disc-size": `${geometry.discRadius * 2}px`,
  } as CSSProperties;

  return (
    <div className="solution-wheel-story__layout">
      <div ref={wheelColumnRef} className="solution-wheel-column">
        {geometry.height > 0 && (
          <>
            <div className="solution-capability-wheel__disc" style={cssVars} aria-hidden="true" />
            <svg
              className="solution-capability-wheel__drawing"
              viewBox={`0 0 ${Math.max(1, geometry.zoneWidth)} ${Math.max(1, geometry.height)}`}
              preserveAspectRatio="none"
              aria-hidden="true"
              style={cssVars}
            >
              <path className="solution-capability-wheel__rim" d={rimPath} />
              <g ref={spokesRef} className="solution-capability-wheel__spokes">
                {Array.from({ length: 12 }, (_, index) => {
                  const angle = (index * 30 * Math.PI) / 180;
                  const endX = geometry.centerX + geometry.discRadius * Math.cos(angle);
                  const endY = geometry.centerY + geometry.discRadius * Math.sin(angle);
                  return <path key={index} d={`M ${geometry.centerX} ${geometry.centerY} L ${endX} ${endY}`} />;
                })}
              </g>
              <g className="solution-capability-wheel__rim-nodes">
                {Array.from({ length: items.length }, (_, index) => (
                  <g key={index} ref={(node) => { rimNodeRefs.current[index] = node; }}>
                    <circle r="6" />
                  </g>
                ))}
              </g>
            </svg>
          </>
        )}

        <nav
          ref={zoneRef}
          className="solution-capability-wheel"
          aria-label="ResOC capabilities"
          role="tablist"
          aria-orientation={geometry.horizontal ? "horizontal" : "vertical"}
          data-lenis-prevent
          style={{ width: geometry.zoneWidth || undefined, height: "100%" }}
        >
          {items.map((item, index) => (
            <button
              key={`${item.num}-${item.sourceIndex}`}
              ref={(button) => { itemRefs.current[index] = button; }}
              id={itemIds[index]}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls={panelId}
              tabIndex={index === activeIndex ? 0 : -1}
              aria-label={`Show capability ${String(index + 1).padStart(2, "0")}: ${item.capability}`}
              className={`solution-capability-wheel__item${index === activeIndex ? " is-active" : ""}`}
              onClick={() => goTo(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >
              <span className="solution-capability-wheel__icon" aria-hidden="true">
                <WheelIcon index={item.sourceIndex} />
              </span>
              <span className="solution-capability-wheel__label">{item.capability}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="solution-wheel-feature" aria-live="polite">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            id={panelId}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={itemIds[activeIndex]}
            className="solution-wheel-feature__panel"
            custom={direction}
            variants={{
              enter: (travel: number) => ({ opacity: 0, x: prefersReducedMotion ? 0 : travel > 0 ? 20 : -20 }),
              center: { opacity: 1, x: 0, transition: { duration: prefersReducedMotion ? 0.15 : 0.68, ease: [0.22, 1, 0.36, 1] } },
              exit: (travel: number) => ({ opacity: 0, x: prefersReducedMotion ? 0 : travel > 0 ? -20 : 20, transition: { duration: prefersReducedMotion ? 0.15 : 0.34, ease: [0.22, 1, 0.36, 1] } }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.div
              className="solution-wheel-feature__visual-stage"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28, scale: prefersReducedMotion ? 1 : 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.95, delay: prefersReducedMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              <ScaledCapabilityVisual index={activeItem.sourceIndex} />
            </motion.div>

            <article className="solution-wheel-feature__copy">
              <motion.p
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.15 : 0.78, delay: prefersReducedMotion ? 0 : 0.98, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeItem.solves}
              </motion.p>
              <motion.span
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.15 : 0.72, delay: prefersReducedMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={activeItem.href} className="solution-story__link">
                  Read more <span aria-hidden="true">→</span>
                </Link>
              </motion.span>
            </article>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function WheelIcon({ index }: { index: number }) {
  const icons = [
    <><circle cx="10.5" cy="10.5" r="5.5" /><path d="m15 15 5 5M8 10.5h5M10.5 8v5" /></>,
    <><path d="m12 3 8 4-8 4-8-4 8-4Z" /><path d="m4 12 8 4 8-4M4 17l8 4 8-4" /></>,
    <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
    <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="7" r="2" /><circle cx="12" cy="18" r="2" /><path d="m8 6.3 8-.1M7.2 8l3.6 8M16.8 9l-3.6 7" /></>,
    <><path d="M12 3 5 6v5c0 4.7 2.8 8 7 10 4.2-2 7-5.3 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  ];

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {icons[index % icons.length]}
    </svg>
  );
}
