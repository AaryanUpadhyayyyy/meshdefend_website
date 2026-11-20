"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Logo, LogoMark } from "@/components/brand/Logo";
import type { CmsHeaderSettings } from "@/lib/siteSettingsTypes";

export function NavbarClient({
  settings,
  heroVariant = false,
}: {
  settings: CmsHeaderSettings;
  heroVariant?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 20);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const lenis = (window as Window & { lenis?: { on?: (event: string, cb: () => void) => void; off?: (event: string, cb: () => void) => void } }).lenis;
    lenis?.on?.("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis?.off?.("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleNavClick = (hrefOrEvent?: string | React.MouseEvent) => {
    if (typeof window !== "undefined") {
      const href = typeof hrefOrEvent === "string" ? hrefOrEvent : ((hrefOrEvent as any)?.currentTarget?.getAttribute?.("href") || undefined);
      if (href && href.includes("#")) {
        const hash = href.substring(href.indexOf("#"));
        const target = document.querySelector(hash);
        if (target) {
          (window as unknown as { lenis?: { scrollTo?: (target: Element | string, opts?: unknown) => void } }).lenis?.scrollTo?.(hash, { offset: -40 });
          return;
        }
      }
      (window as unknown as { lenis?: { scrollTo?: (target: number, opts?: unknown) => void } }).lenis?.scrollTo?.(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <header ref={navRef} className={`nav-header${heroVariant ? " nav-header--hero" : ""}`}>
        <div
          className={`nav-bar${heroVariant ? " nav-bar--hero" : ""} ${scrolled ? "is-scrolled" : ""}`}
        >
          {/* Logo: Brand lockup containing both mark & wordmark */}
          <Link
            href="/"
            aria-label={`${settings.brandName} home`}
            className="nav-logo"
            onClick={handleNavClick}
          >
            {settings.logoAsset?.url ? (
              <img
                src={settings.logoAsset.url}
                alt={settings.logoAlt || settings.brandName}
                style={{ height: settings.logoHeight, width: "auto", objectFit: "contain" }}
              />
            ) : settings.brandName === "MeshDefend" ? (
              <Logo height={settings.logoHeight} alt={settings.logoAlt || settings.brandName} />
            ) : (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--ink)", fontWeight: 650, fontSize: 20 }}>
                <LogoMark size={settings.logoHeight} />
                {settings.brandName}
              </span>
            )}
          </Link>

          {/* Right actions: Book a demo CTA */}
          <div className="nav-actions">
            <Link
              href="#"
              data-cal-link="meshdefend/intro"
              data-cal-namespace="intro"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className={`btn btn-primary nav-cta-btn${heroVariant ? " nav-hero-primary" : ""}`}
              onClick={handleNavClick}
            >
              Book a demo
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
