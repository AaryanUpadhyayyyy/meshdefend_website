"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV } from "@/lib/content";

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

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
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      ref={navRef}
      className="nav-header"
      style={{
        position: "sticky",
        top: 16,
        zIndex: 80,
        padding: "0 16px",
      }}
    >
      <div
        className="nav-bar container"
        style={{
          background: "var(--nav-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--nav-border)",
          borderRadius: "var(--radius)",
          padding: "0 24px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          transition: "box-shadow 0.3s",
          boxShadow: scrolled ? "0 4px 24px rgba(34,31,34,0.08)" : "none",
        }}
      >
        {/* Logo: 28px mark + 20px semibold wordmark */}
        <Link href="/" aria-label="MeshDefend home" style={{ display: "inline-flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <LogoMark size={28} />
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
              fontFamily: "var(--font-body), sans-serif",
            }}
          >
            MeshDefend
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" aria-label="Main navigation" style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          marginInline: "auto",
        }}>
          {/* Platform */}
          <NavDropdown
            label={NAV.platform.label}
            isOpen={openMenu === "platform"}
            onToggle={() => setOpenMenu(openMenu === "platform" ? null : "platform")}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24, minWidth: 640 }}>
              {NAV.platform.groups.map((group) => (
                <div key={group.title}>
                  <div className="mono-sm" style={{ marginBottom: 12, fontSize: 11, textTransform: "uppercase", color: "var(--muted)" }}>{group.title}</div>
                  {group.items.map((item) => (
                    <MegaLink key={item.label} label={item.label} desc={"desc" in item ? (item as any).desc : undefined} href={item.href} />
                  ))}
                </div>
              ))}
            </div>
          </NavDropdown>

          {/* Solutions */}
          <NavDropdown
            label={NAV.solutions.label}
            isOpen={openMenu === "solutions"}
            onToggle={() => setOpenMenu(openMenu === "solutions" ? null : "solutions")}
          >
            <div style={{ padding: 24, minWidth: 260 }}>
              {NAV.solutions.items.map((item) => (
                <MegaLink key={item.label} label={item.label} href={item.href} />
              ))}
            </div>
          </NavDropdown>

          {/* Support */}
          <NavDropdown
            label={NAV.support.label}
            isOpen={openMenu === "support"}
            onToggle={() => setOpenMenu(openMenu === "support" ? null : "support")}
          >
            <div style={{ padding: 18, minWidth: 220 }}>
              {NAV.support.items.map((item) => (
                <MegaLink key={item.label} label={item.label} href={item.href} />
              ))}
            </div>
          </NavDropdown>

          {/* Resources */}
          <NavDropdown
            label={NAV.resources.label}
            isOpen={openMenu === "resources"}
            onToggle={() => setOpenMenu(openMenu === "resources" ? null : "resources")}
          >
            <div style={{ padding: 24, minWidth: 240 }}>
              {NAV.resources.items.map((item) => (
                <MegaLink key={item.label} label={item.label} href={item.href} />
              ))}
            </div>
          </NavDropdown>

          {/* Company */}
          <NavDropdown
            label={NAV.company.label}
            isOpen={openMenu === "company"}
            onToggle={() => setOpenMenu(openMenu === "company" ? null : "company")}
          >
            <div style={{ padding: 24, minWidth: 280 }}>
              {NAV.company.items.map((item) => (
                <MegaLink key={item.label} label={item.label} desc={"desc" in item ? (item as any).desc : undefined} href={item.href} />
              ))}
            </div>
          </NavDropdown>
        </nav>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <ThemeToggle />
          <a
            href="/demo"
            className="btn btn-primary"
            style={{ fontSize: 12, padding: "10px 18px", height: 36 }}
          >
            Book a Demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          style={{
            display: "none",
            width: 36,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {mobileOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: 80,
            background: "var(--bg)",
            zIndex: 79,
            padding: "24px 20px",
            overflowY: "auto",
          }}
        >
          <nav aria-label="Mobile navigation" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[NAV.platform, NAV.solutions, NAV.support, NAV.resources, NAV.company].map((section) => {
              const items: {label: string; href: string}[] = "groups" in section
                ? section.groups.flatMap((g): {label: string; desc?: string; href: string}[] => [...g.items])
                : [...section.items];
              return (
                <details key={section.label} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 8 }}>
                  <summary style={{ padding: "12px 0", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                    {section.label}
                  </summary>
                  <div style={{ paddingLeft: 12, display: "flex", flexDirection: "column", gap: 4 }}>
                    {items.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        style={{ padding: "8px 0", fontSize: 14, color: "var(--muted)" }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </details>
              );
            })}
            <div style={{ marginTop: 16 }}>
              <a href="/demo" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Book a Demo
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ─── Sub-components ──────────────────────────────────────────── */

const navLinkStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  padding: "8px 12px",
  borderRadius: "var(--radius)",
  transition: "background 0.15s, color 0.15s",
  cursor: "pointer",
  whiteSpace: "nowrap",
  color: "var(--ink)",
  background: "transparent",
  border: "none",
};

function NavDropdown({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          ...navLinkStyle,
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: isOpen ? "var(--surface-raised)" : "transparent",
          color: "var(--ink)",
        }}
      >
        <span>{label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(180deg)" : "none",
            color: "var(--ink)",
          }}
        >
          <path d="m7 10 5 5 5-5" />
        </svg>
      </button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--bg)",
            color: "var(--ink)",
            border: "1px solid var(--border)",
            borderTop: "2px solid var(--orange)",
            borderRadius: "var(--radius)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
            zIndex: 90,
            animation: "menuIn 0.15s ease",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function MegaLink({ label, desc, href }: { label: string; desc?: string; href: string }) {
  return (
    <a
      href={href}
      style={{
        display: "block",
        padding: "10px 8px",
        borderRadius: "var(--radius)",
        transition: "background 0.15s, color 0.15s",
        color: "var(--ink)",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-raised)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span style={{ fontSize: 13, fontWeight: 600, display: "block", lineHeight: 1.35, color: "var(--ink)" }}>
        {label}
      </span>
      {desc && (
        <span style={{ fontSize: 12, color: "var(--muted)", display: "block", marginTop: 2 }}>
          {desc}
        </span>
      )}
    </a>
  );
}
