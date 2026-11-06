"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { CapabilityWheelItem } from "./CapabilityWheel";
import { ResocSlideVisual } from "./ResocSlideVisuals";
import "./CapabilityList.css";

const PREVIEW_WIDTH = 1200;
const BACKUP_PREVIEW_HEIGHT = 320;
const STANDARD_PREVIEW_HEIGHT = 620;
const POPOVER_OVERHANG = 50;
const CYBER_RECOVERY_PREVIEW_SCALE = 0.84;
const EASE = [0.22, 1, 0.36, 1] as const;

type CapabilityPreviewSize = {
  width: number;
  height: number;
};

type PreviewBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function previewSize(sourceIndex: number): CapabilityPreviewSize {
  return sourceIndex === 1
    ? { width: PREVIEW_WIDTH + POPOVER_OVERHANG, height: BACKUP_PREVIEW_HEIGHT }
    : { width: PREVIEW_WIDTH, height: STANDARD_PREVIEW_HEIGHT };
}

function CapabilityIcon({ sourceIndex }: { sourceIndex: number }) {
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
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {icons[sourceIndex % icons.length]}
    </svg>
  );
}

function SummaryIcon({ kind }: { kind: "total" | "failed" | "success" | "other" }) {
  if (kind === "success") {
    return <svg aria-hidden="true" viewBox="0 0 32 32" fill="none"><path d="M7 16.5 13 22l12-13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" /></svg>;
  }
  if (kind === "failed") {
    return <svg aria-hidden="true" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2.5" /><path d="m11 11 10 10m0-10L11 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>;
  }
  if (kind === "other") {
    return <svg aria-hidden="true" viewBox="0 0 32 32" fill="none"><path d="M6 9h20M6 16h20M6 23h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /><circle cx="11" cy="9" r="3" fill="currentColor" /><circle cx="21" cy="16" r="3" fill="currentColor" /></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 32 32" fill="none"><rect x="5" y="5" width="22" height="22" rx="5" stroke="currentColor" strokeWidth="2.5" /><path d="M10 11h12M10 16h12M10 21h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
}

function WorkloadIcon({ kind }: { kind: string }) {
  if (kind === "database") {
    return <svg aria-hidden="true" viewBox="0 0 18 18" fill="none"><ellipse cx="9" cy="4" rx="6" ry="2.5" /><path d="M3 4v9c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V4M3 8.5C3 9.9 5.7 11 9 11s6-1.1 6-2.5" /></svg>;
  }
  if (kind === "queue") {
    return <svg aria-hidden="true" viewBox="0 0 18 18" fill="none"><rect x="3" y="2.5" width="12" height="13" rx="2" /><path d="M6 6h6M6 9h6M6 12h4" /></svg>;
  }
  if (kind === "auth") {
    return <svg aria-hidden="true" viewBox="0 0 18 18" fill="none"><path d="m9 2 5 2v4c0 3.3-2 5.8-5 7.5C6 13.8 4 11.3 4 8V4l5-2Z" /><path d="m6.8 8.5 1.5 1.5 3-3" /></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 18 18" fill="none"><rect x="3" y="3" width="12" height="12" rx="3" /><path d="M6 7h6M6 10h6" /></svg>;
}

function StatusIcon({ failed = false }: { failed?: boolean }) {
  return failed
    ? <svg aria-hidden="true" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" /><path d="m5.5 5.5 5 5m0-5-5 5" /></svg>
    : <svg aria-hidden="true" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" /><path d="m4.8 8.1 2.1 2.1 4.3-4.5" /></svg>;
}

const backupJobs = [
  { id: "264", plan: "Daily-DB-Backup", workload: "payments-db", type: "database", time: "Nov 03, 02:00 AM", duration: "12m 14s", status: "Success" },
  { id: "265", plan: "App-Backup", workload: "checkout-svc", type: "application", time: "Nov 03, 02:15 AM", duration: "08m 37s", status: "Success" },
  { id: "268", plan: "Full-Backup", workload: "auth-svc", type: "auth", time: "Nov 03, 02:30 AM", duration: "-", status: "Failed" },
  { id: "269", plan: "Config-Backup", workload: "queue", type: "queue", time: "Nov 03, 03:00 AM", duration: "05m 21s", status: "Success" },
] as const;

function BackupJobsPreview({ reducedMotion }: { reducedMotion: boolean }) {
  const items = [
    { label: "Total jobs", value: "258", kind: "total" as const },
    { label: "Failed jobs", value: "4", kind: "failed" as const },
    { label: "Success jobs", value: "251", kind: "success" as const },
    { label: "Other jobs", value: "3", kind: "other" as const },
  ];

  return (
    <div className="capability-list__backup-preview">
      <div className="capability-list__summary-row">
        {items.map((tile, index) => (
          <motion.div
            key={tile.kind}
            className={`capability-list__summary-tile is-${tile.kind}`}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.3, delay: reducedMotion ? 0 : 0.18 + index * 0.04, ease: EASE }}
          >
            <span className="capability-list__summary-icon"><SummaryIcon kind={tile.kind} /></span>
            <span className="capability-list__summary-copy"><span>{tile.label}</span><strong>{tile.value}</strong></span>
          </motion.div>
        ))}
      </div>

      <div className="capability-list__table-wrap">
        <table className="capability-list__jobs-table">
          <colgroup>
            <col className="col-check" /><col className="col-id" /><col className="col-plan" /><col className="col-workload" />
            <col className="col-time" /><col className="col-duration" /><col className="col-status" /><col className="col-menu" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col"><span className="sr-only">Select</span><input type="checkbox" aria-label="Select all jobs" /></th>
              <th scope="col">Job ID</th>
              <th scope="col">Protection plan</th>
              <th scope="col">Workload</th>
              <th scope="col">Start time</th>
              <th scope="col">Duration</th>
              <th scope="col">Status</th>
              <th scope="col"><span className="sr-only">More</span></th>
            </tr>
          </thead>
          <tbody>
            {backupJobs.map((job, index) => {
              const failed = job.status === "Failed";
              return (
                <motion.tr
                  key={job.id}
                  className={failed ? "is-failed" : ""}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0.15 : 0.28, delay: reducedMotion ? 0 : 0.28 + index * 0.03, ease: EASE }}
                >
                  <td><input type="checkbox" aria-label={`Select job ${job.id}`} /></td>
                  <td>#{job.id}</td>
                  <td>{job.plan}</td>
                  <td><span className="capability-list__workload"><WorkloadIcon kind={job.type} />{job.workload}</span></td>
                  <td>{job.time}</td>
                  <td>{job.duration}</td>
                  <td><span className={`capability-list__status${failed ? " is-failed" : ""}`}><StatusIcon failed={failed} />{job.status}</span></td>
                  <td><button type="button" className="capability-list__row-menu" aria-label={`More options for job ${job.id}`}>···</button></td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>

        <motion.div
          className="capability-list__retry-popover"
          initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.94, y: reducedMotion ? 0 : 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: reducedMotion ? "tween" : "spring", stiffness: 300, damping: 28, duration: reducedMotion ? 0.15 : undefined, delay: reducedMotion ? 0 : 0.35 }}
        >
          <strong>Retry job 268</strong>
          <span>Approval required</span>
          <div><button type="button">Approve</button><button type="button" className="is-ghost">Skip</button></div>
        </motion.div>
      </div>
    </div>
  );
}

function ScaledPreview({ item, size, reducedMotion, direction }: {
  item: CapabilityWheelItem;
  size: CapabilityPreviewSize;
  reducedMotion: boolean;
  direction: -1 | 1;
}) {
  const slotRef = useRef<HTMLDivElement | null>(null);
  const [slotSize, setSlotSize] = useState({ width: 0, height: 0 });
  const [bounds, setBounds] = useState<PreviewBounds | null>(null);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    const measure = () => {
      const { width, height } = slot.getBoundingClientRect();
      setSlotSize({ width, height });

      if (item.sourceIndex === 1) {
        setBounds({ x: 0, y: 0, width: size.width, height: size.height });
        return;
      }

      const preview = slot.querySelector<SVGSVGElement>(`[data-preview-index="${item.sourceIndex}"] svg`);
      if (!preview) return;
      try {
        const box = preview.getBBox();
        if (box.width > 0 && box.height > 0) {
          setBounds({ x: box.x, y: box.y, width: box.width, height: box.height });
        }
      } catch {
        setBounds({ x: 0, y: 0, width: size.width, height: size.height });
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(slot);
    return () => observer.disconnect();
  }, [item.sourceIndex, size.height, size.width]);

  const fittedScale = bounds && slotSize.width > 0 && slotSize.height > 0
    ? Math.min(slotSize.width / bounds.width, slotSize.height / bounds.height, 1)
    : 0;
  const scale = fittedScale * (item.sourceIndex === 4 ? CYBER_RECOVERY_PREVIEW_SCALE : 1);
  const artboardWidth = bounds ? bounds.width * scale : 0;
  const artboardHeight = bounds ? bounds.height * scale : 0;

  return (
    <div ref={slotRef} className={`capability-list__preview-slot${item.sourceIndex === 1 ? " is-backup" : " is-standard"}`}>
      <AnimatePresence initial={false} custom={direction}>
        {item.sourceIndex === 1 ? (
          <motion.div
            key={item.sourceIndex}
            data-preview-index={item.sourceIndex}
            className="capability-list__preview-artboard"
            style={{ width: artboardWidth, height: artboardHeight, visibility: scale ? "visible" : "hidden" }}
            initial={{ opacity: 0, y: reducedMotion ? 0 : direction * 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -direction * 16 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: EASE }}
          >
            <div className="capability-list__preview-canvas capability-list__backup-canvas" style={{ width: size.width, height: size.height, transform: `scale(${scale})` }}>
              <BackupJobsPreview reducedMotion={reducedMotion} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={item.sourceIndex}
            data-preview-index={item.sourceIndex}
            className="capability-list__preview-artboard capability-list__standard-preview"
            style={{ width: artboardWidth, height: artboardHeight, visibility: scale ? "visible" : "hidden" }}
            initial={{ opacity: 0, y: reducedMotion ? 0 : direction * 28, scale: reducedMotion ? 1 : 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -direction * 16 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.48, delay: reducedMotion ? 0 : 0.18, ease: EASE }}
          >
            <div className="capability-list__preview-canvas capability-list__standard-canvas" style={{ width: size.width, height: size.height, left: bounds ? -bounds.x * scale : 0, top: bounds ? -bounds.y * scale : 0, transform: `scale(${scale})` }}>
              <ResocSlideVisual index={item.sourceIndex} variant="bare" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CapabilityList({
  items,
  activeIndex,
  direction,
  onActiveIndexChange,
}: {
  items: CapabilityWheelItem[];
  activeIndex: number;
  direction: -1 | 1;
  onActiveIndexChange: (index: number, direction?: -1 | 1) => void;
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reactId = useId().replaceAll(":", "");
  const tabIds = items.map((_, index) => `capability-list-tab-${reactId}-${index}`);
  const detailIds = items.map((_, index) => `capability-list-details-${reactId}-${index}`);

  const goTo = useCallback((requestedIndex: number, requestedDirection?: -1 | 1) => {
    const nextIndex = Math.max(0, Math.min(items.length - 1, requestedIndex));
    if (nextIndex === activeIndex) return;
    const nextDirection = requestedDirection ?? (nextIndex > activeIndex ? 1 : -1);
    onActiveIndexChange(nextIndex, nextDirection);
  }, [activeIndex, items.length, onActiveIndexChange]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setPrefersReducedMotion(media.matches);
    syncMotion();
    media.addEventListener("change", syncMotion);
    return () => media.removeEventListener("change", syncMotion);
  }, []);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowDown") nextIndex = Math.min(items.length - 1, index + 1);
    if (event.key === "ArrowUp") nextIndex = Math.max(0, index - 1);
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = items.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    goTo(nextIndex, nextIndex >= index ? 1 : -1);
    requestAnimationFrame(() => itemRefs.current[nextIndex!]?.focus());
  };

  if (!items.length) return null;

  const activeItem = items[activeIndex] ?? items[0];
  const designSize = previewSize(activeItem.sourceIndex);
  const inactiveActiveLabelY = direction > 0 ? -8 : 8;

  return (
    <LayoutGroup id={`resoc-capability-list-${reactId}`}>
      <div className="capability-list">
        <div className="capability-list__body">
          <div className="capability-list__list-zone">
            <div className="capability-list__tabs" role="list" aria-label="ResOC capabilities">
              {items.map((item, index) => {
                const active = index === activeIndex;
                return (
                  <motion.div
                    key={`${item.num}-${item.sourceIndex}`}
                    role="listitem"
                    className={`capability-list__tab-row${active ? " is-active" : ""}`}
                    style={{ flexGrow: active ? 2.5 : 1 }}
                  >
                    {active && (
                      <motion.span
                        layoutId={prefersReducedMotion ? undefined : "capability-list-active-highlight"}
                        className="capability-list__active-highlight"
                        initial={prefersReducedMotion ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.15 : 0.45, ease: EASE }}
                        aria-hidden="true"
                      />
                    )}
                    <button
                      ref={(node) => { itemRefs.current[index] = node; }}
                      id={tabIds[index]}
                      type="button"
                      aria-pressed={active}
                      aria-describedby={active ? detailIds[index] : undefined}
                      aria-label={`Show capability ${String(index + 1).padStart(2, "0")}: ${item.capability}`}
                      tabIndex={active ? 0 : -1}
                      className="capability-list__tab-trigger"
                      onClick={() => goTo(index)}
                      onKeyDown={(event) => onTabKeyDown(event, index)}
                    >
                      <motion.span className="capability-list__icon" animate={{ x: !prefersReducedMotion && active ? 4 : 0 }} transition={{ duration: prefersReducedMotion ? 0.15 : 0.3, ease: EASE }}>
                        <CapabilityIcon sourceIndex={item.sourceIndex} />
                      </motion.span>
                      <span className="capability-list__label-stack">
                        <motion.span className="capability-list__label capability-list__label--inactive" aria-hidden="true" animate={{ opacity: active ? 0 : 1, x: active && !prefersReducedMotion ? -4 : 0, scale: active && !prefersReducedMotion ? 0.96 : 1 }} transition={{ duration: prefersReducedMotion ? 0.15 : 0.32, ease: EASE }}>{item.capability}</motion.span>
                        <motion.span className="capability-list__label capability-list__label--active" aria-hidden={!active} animate={{ opacity: active ? 1 : 0, y: active || prefersReducedMotion ? 0 : inactiveActiveLabelY }} transition={{ duration: prefersReducedMotion ? 0.15 : 0.38, ease: EASE }}>{item.capability}</motion.span>
                      </span>
                    </button>
                    <AnimatePresence initial={false} mode="popLayout">
                      {active && (
                        <motion.div
                          key={`details-${activeIndex}`}
                          id={detailIds[index]}
                          className="capability-list__details"
                          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : direction * 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : direction * -6 }}
                          transition={{ duration: prefersReducedMotion ? 0.15 : 0.38, ease: EASE }}
                        >
                          <p>{item.solves}</p>
                          <Link className="capability-list__read-more" href={item.href}>
                            <span>Read more</span>
                            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="capability-list__feature">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                className="capability-list__feature-content"
                custom={direction}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : direction * 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -direction * 16 }}
                transition={{ duration: prefersReducedMotion ? 0.15 : 0.2, ease: EASE }}
              >
                <ScaledPreview item={activeItem} size={designSize} reducedMotion={prefersReducedMotion} direction={direction} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </LayoutGroup>
  );
}
