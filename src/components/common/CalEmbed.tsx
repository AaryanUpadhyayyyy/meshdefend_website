"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

export function CalEmbed() {
  useEffect(() => {
    // Cal element-click embed initialization
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const script = d.createElement("script");
            script.src = A;
            script.async = true;
            d.head.appendChild(script);
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = window.Cal;
    if (Cal) {
      Cal("init", "intro", { origin: "https://app.cal.com" });
      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;
      if (Cal.ns && Cal.ns.intro) {
        Cal.ns.intro("ui", {
          cssVarsPerTheme: {
            light: { "cal-brand": "#f2562d" },
            dark: { "cal-brand": "#f2562d" },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      }
    }

    // Global click listener as a seamless fallback for any "Book a demo" or "/demo" element
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const trigger = target.closest<HTMLElement>(
        '[data-cal-link], a[href="/demo"], button[data-demo], .nav-cta-btn, .nav-mobile-hero-primary'
      );
      if (!trigger) return;

      const href = trigger.getAttribute("href");
      const text = (trigger.textContent || "").trim().toLowerCase();
      const isDemo =
        trigger.hasAttribute("data-cal-link") ||
        href === "/demo" ||
        href?.includes("demo") ||
        text.includes("book a demo");

      if (isDemo) {
        e.preventDefault();
        e.stopPropagation();
        if (window.Cal?.ns?.intro) {
          window.Cal.ns.intro("modal", {
            calLink: "meshdefend/intro",
            config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
          });
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  return null;
}
