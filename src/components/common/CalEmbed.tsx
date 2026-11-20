"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

export function CalEmbed() {
  useEffect(() => {
    // 1. Initialize Cal embed script
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
            const api: any = function () {
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

        // Preload calendar link so modal opens instantaneously without loading lag
        Cal.ns.intro("preload", {
          calLink: "meshdefend/intro",
        });
      }

      Cal("preload", {
        calLink: "meshdefend/intro",
      });
    }

    // 2. Hide Cal.com branding text in light DOM and shadow DOM
    const removeBranding = () => {
      // Light DOM check
      const modalBoxes = document.querySelectorAll("cal-modal-box, [data-cal-modal]");
      modalBoxes.forEach((box) => {
        // If shadowRoot exists, inject style to hide branding
        if ((box as any).shadowRoot) {
          const shadow = (box as any).shadowRoot;
          if (!shadow.querySelector("#hide-cal-branding")) {
            const style = document.createElement("style");
            style.id = "hide-cal-branding";
            style.textContent = `
              a[href*="cal.com"],
              a[href*="utm_source=embed"],
              [class*="branding"],
              [class*="powered"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                pointer-events: none !important;
              }
            `;
            shadow.appendChild(style);
          }
        }

        // Direct light DOM links
        box.querySelectorAll("a").forEach((a) => {
          if (
            a.textContent?.toLowerCase().includes("cal.com") ||
            a.href.includes("cal.com")
          ) {
            a.style.setProperty("display", "none", "important");
          }
        });
      });

      // Target any stand-alone Cal.com text/link below modal
      document.querySelectorAll('a[href*="cal.com"]').forEach((a) => {
        if ((a.textContent || "").toLowerCase().includes("cal.com")) {
          (a as HTMLElement).style.setProperty("display", "none", "important");
        }
      });
    };

    // Run immediately and observe for modal injection
    removeBranding();
    const observer = new MutationObserver(() => {
      removeBranding();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 3. Global click listener to open popup immediately
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
        href === "#demo" ||
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
      observer.disconnect();
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  return (
    <style>{`
      cal-modal-box a[href*="cal.com"],
      cal-modal-box a,
      [data-cal-modal] a[href*="cal.com"],
      a[href*="cal.com?utm_source=embed"],
      a[href*="cal.com"],
      cal-modal-box [class*="branding"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `}</style>
  );
}
