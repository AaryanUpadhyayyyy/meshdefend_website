"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Disable automatic browser scroll restoration to prevent landing at bottom on route transitions
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis to global window for external access if needed
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  // When pathname changes (user navigated via navbar or links), reset scroll to top or target hash
  useEffect(() => {
    const handleNavigationScroll = () => {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(hash, { offset: -40 });
          } else {
            target.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }
      }

      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true, force: true });
        lenisRef.current.resize();
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    handleNavigationScroll();
    const frameId = requestAnimationFrame(handleNavigationScroll);
    const timer1 = setTimeout(handleNavigationScroll, 50);
    const timer2 = setTimeout(handleNavigationScroll, 150);

    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target && lenisRef.current) {
          lenisRef.current.scrollTo(hash, { offset: -40 });
        }
      }
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname]);

  return <>{children}</>;
}
