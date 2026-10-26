"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { CmsHeaderSettings } from "@/lib/siteSettingsTypes";

export function NavbarClient({ settings }: { settings: CmsHeaderSettings }) {
  const menuEntries = settings.menus.map((section) => [section.key, section] as const);
  const megaMenus = Object.fromEntries(menuEntries);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearCloseTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseEnter = (menuKey: string) => {
    clearCloseTimeout();
    setOpenMenu(menuKey);
  };

  const handleMenuEnter = () => {
    clearCloseTimeout();
  };

  const handleMouseLeave = () => {
    clearCloseTimeout();
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 180);
  };

  const handleToggle = (menuKey: string) => {
    clearCloseTimeout();
    setOpenMenu(openMenu === menuKey ? null : menuKey);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header ref={navRef} className="nav-header">
      <div
        className={`nav-bar ${scrolled ? "is-scrolled" : ""} ${openMenu ? "has-open-menu" : ""}`}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo: Brand lockup containing both mark & wordmark */}
        <Link
          href="/"
          aria-label={`${settings.brandName} home`}
          className="nav-logo"
          onClick={() => setOpenMenu(null)}
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

        {/* Desktop Nav */}
        {settings.showPrimaryNavigation && (
          <nav className="desktop-nav" aria-label="Main navigation">
          {menuEntries.map(([key, section]) => {
            const isActive = openMenu === key;
            return (
              <button
                key={key}
                type="button"
                className={`nav-item-btn ${isActive ? "is-active" : ""}`}
                onClick={() => handleToggle(key)}
                onMouseEnter={() => handleMouseEnter(key)}
                onFocus={() => handleMouseEnter(key)}
                aria-expanded={isActive}
                aria-haspopup="true"
              >
                <span>{section.label}</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="nav-chevron"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            );
          })}
          </nav>
        )}

        {/* Right actions */}
        <div className="nav-actions">
          {settings.showThemeToggle && <ThemeToggle />}
          {settings.primaryCta.label && settings.primaryCta.href && (
            <Link
              href={settings.primaryCta.href}
              className="btn btn-primary nav-cta-btn"
              onClick={() => setOpenMenu(null)}
            >
              {settings.primaryCta.label}
            </Link>
          )}
          {settings.showPrimaryNavigation && <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>}
        </div>

        {/* Mega Menu Dropdown: anchored to exact width & position of nav-bar */}
        {settings.showPrimaryNavigation && openMenu && megaMenus[openMenu] && (
          <div
            className="nav-mega-menu"
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="nav-mega-grid">
              {megaMenus[openMenu].columns.map((column) => (
                <div key={column.eyebrow} className="nav-mega-col">
                  <div className="nav-mega-eyebrow">{column.eyebrow}</div>
                  <div className="nav-mega-items">
                    {column.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="nav-mega-link"
                        onClick={() => setOpenMenu(null)}
                      >
                        <span className="nav-mega-link-title">{item.label}</span>
                        {item.desc && (
                          <span className="nav-mega-link-desc">{item.desc}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {megaMenus[openMenu].featured && (
                <div className="nav-mega-col">
                  <div className="nav-mega-eyebrow">{settings.featuredColumnLabel}</div>
                  <Link
                    href={megaMenus[openMenu].featured!.href}
                    className="nav-mega-card"
                    onClick={() => setOpenMenu(null)}
                  >
                    <div>
                      <span className="nav-mega-card-tag">
                        {megaMenus[openMenu].featured!.tag}
                      </span>
                      <span className="nav-mega-card-title">
                        {megaMenus[openMenu].featured!.title}
                      </span>
                      <span className="nav-mega-card-body">
                        {megaMenus[openMenu].featured!.desc}
                      </span>
                    </div>
                    <span className="nav-mega-card-cta">
                      {megaMenus[openMenu].featured!.cta}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile nav overlay */}
      {settings.showPrimaryNavigation && mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: 68,
            background: "var(--bg)",
            zIndex: 79,
            padding: "24px 20px 48px",
            overflowY: "auto",
            borderTop: "1px solid var(--border)",
          }}
        >
          <nav aria-label="Mobile navigation" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {menuEntries.map(([key, section]) => {
              const allItems = section.columns.flatMap((col) => col.items);
              return (
                <details key={key} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 8 }}>
                  <summary style={{ padding: "12px 0", fontSize: 15, fontWeight: 600, cursor: "pointer", color: "var(--ink)" }}>
                    {section.label}
                  </summary>
                  <div style={{ paddingLeft: 12, display: "flex", flexDirection: "column", gap: 4 }}>
                    {allItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        style={{ padding: "8px 0", fontSize: 14, color: "var(--muted)", textDecoration: "none" }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </details>
              );
            })}
            <div style={{ marginTop: 20 }}>
              {settings.primaryCta.label && settings.primaryCta.href && <Link
                href={settings.primaryCta.href}
                onClick={() => setMobileOpen(false)}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", height: 44, fontSize: 14 }}
              >
                {settings.primaryCta.label}
              </Link>}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
