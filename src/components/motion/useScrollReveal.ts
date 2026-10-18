"use client";

interface ObserverOptions {
  threshold?: number;
  margin?: string;
}

const observers = new Map<string, IntersectionObserver>();
const callbacks = new Map<Element, () => void>();

function getObserverKey(threshold: number, margin: string): string {
  return `${threshold}_${margin}`;
}

export function observeReveal(
  element: Element,
  onReveal: () => void,
  options: ObserverOptions = {}
): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  // If user prefers reduced motion, reveal instantly
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    onReveal();
    return () => {};
  }

  // If IntersectionObserver is unavailable, fallback to instant reveal
  if (!("IntersectionObserver" in window)) {
    onReveal();
    return () => {};
  }

  const threshold = options.threshold ?? 0.2;
  const margin = options.margin ?? "0px 0px -10% 0px";
  const key = getObserverKey(threshold, margin);

  let observer = observers.get(key);
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = callbacks.get(entry.target);
            if (cb) {
              cb();
              callbacks.delete(entry.target);
              observer?.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold,
        rootMargin: margin,
      }
    );
    observers.set(key, observer);
  }

  callbacks.set(element, onReveal);
  observer.observe(element);

  return () => {
    callbacks.delete(element);
    observer?.unobserve(element);
  };
}
