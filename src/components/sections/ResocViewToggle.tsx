"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import "./ResocViewToggle.css";

export type SolutionView = "list" | "wheel" | "slides" | "map";

const VIEW_OPTIONS: Array<{ value: SolutionView; label: string }> = [
  { value: "list", label: "Capability list" },
  { value: "wheel", label: "Capability wheel" },
  { value: "slides", label: "Five-slide scroll view" },
  { value: "map", label: "Orbital capability map" },
];

export function ResocViewToggle({
  view,
  onChange,
}: {
  view: SolutionView;
  onChange: (view: SolutionView) => void;
}) {
  const id = useId().replaceAll(":", "");
  const prefersReducedMotion = useReducedMotion() ?? false;
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [selectedView, setSelectedView] = useState(view);
  const pendingViewRef = useRef<SolutionView | null>(null);
  const selectionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (pendingViewRef.current === view) {
      pendingViewRef.current = null;
      setSelectedView(view);
    } else if (!pendingViewRef.current) {
      setSelectedView(view);
    }
  }, [view]);

  useEffect(() => () => {
    if (selectionTimerRef.current !== null) window.clearTimeout(selectionTimerRef.current);
  }, []);

  const selectView = (nextView: SolutionView) => {
    setSelectedView(nextView);
    pendingViewRef.current = nextView;
    if (selectionTimerRef.current !== null) window.clearTimeout(selectionTimerRef.current);
    selectionTimerRef.current = window.setTimeout(() => {
      pendingViewRef.current = null;
      onChange(nextView);
      selectionTimerRef.current = null;
    }, prefersReducedMotion ? 150 : 240);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % VIEW_OPTIONS.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + VIEW_OPTIONS.length) % VIEW_OPTIONS.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = VIEW_OPTIONS.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    const option = VIEW_OPTIONS[nextIndex];
    selectView(option.value);
    requestAnimationFrame(() => optionRefs.current[nextIndex!]?.focus());
  };

  return (
    <div className="resoc-view-toggle">
      <div className="resoc-view-toggle__group" role="radiogroup" aria-label="ResOC presentation modes">
        {VIEW_OPTIONS.map((option, index) => {
          const selected = selectedView === option.value;
          return (
            <button
              key={option.value}
              ref={(node) => { optionRefs.current[index] = node; }}
              id={`resoc-view-${id}-${option.value}`}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              className={`resoc-view-toggle__option${selected ? " is-selected" : ""}`}
              onClick={() => selectView(option.value)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {selected && (
                <motion.span
                  layoutId={prefersReducedMotion ? undefined : `resoc-view-toggle-pill-${id}`}
                  className="resoc-view-toggle__pill"
                  initial={prefersReducedMotion ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0.15 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                />
              )}
              <span className="resoc-view-toggle__label">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
