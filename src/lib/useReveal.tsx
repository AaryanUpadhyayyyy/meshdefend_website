"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Global ScrollRevealObserver
 * Mounts in layout/providers to automatically track and animate all .reveal-on-scroll,
 * .rv, and [data-reveal] elements as the user scrolls down the page.
 */
export function ScrollRevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Honor reduced-motion accessibility preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    document.documentElement.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -44px 0px",
        threshold: 0.05,
      }
    );

    const observeElements = () => {
      const targets = document.querySelectorAll(
        ".reveal-on-scroll:not(.is-revealed), .rv:not(.is-revealed), [data-reveal]:not(.is-revealed), .text-blur-in:not(.is-revealed), .text-reveal-block:not(.is-revealed), .line-mask:not(.is-revealed)"
      );

      const vh = window.innerHeight;
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already in initial view (or above fold), reveal immediately
        if (rect.top < vh * 0.92) {
          el.classList.add("is-revealed");
        } else {
          observer.observe(el);
        }
      });
    };

    observeElements();

    // Scan for dynamically injected or tab-swapped elements
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}

/**
 * useReveal — smooth fade-in + slide-up on scroll.
 * Supports both CSS class-based reveals (.is-revealed) and GSAP animations.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: { y?: number; delay?: number; duration?: number; stagger?: number } = {}
) {
  const ref = useRef<T>(null);
  const { y = 28, delay = 0, duration = 0.75, stagger = 0.1 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-revealed");
      el.querySelectorAll(".rv, .reveal-on-scroll").forEach((c) => c.classList.add("is-revealed"));
      return;
    }

    // Look for child elements with .rv, or target element itself
    const targets = el.querySelectorAll(".rv");
    const elements = targets.length > 0 ? Array.from(targets) : [el];

    // Mark as reveal elements
    elements.forEach((item) => {
      item.classList.add("reveal-on-scroll");
    });

    const triggerReveal = () => {
      elements.forEach((item, idx) => {
        setTimeout(() => {
          item.classList.add("is-revealed");
        }, (delay + idx * stagger) * 1000);
      });
    };

    // If already in viewport, trigger
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      triggerReveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerReveal();
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [y, delay, duration, stagger]);

  return ref;
}

/**
 * RevealSection — wrapper component for scroll-reveal animations.
 */
export function RevealSection({
  children,
  className = "",
  style,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}) {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className={`${className} reveal-on-scroll`} style={style} id={id}>
      {children}
    </section>
  );
}

