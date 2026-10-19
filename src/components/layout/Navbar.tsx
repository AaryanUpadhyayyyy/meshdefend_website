"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface MegaLinkItem {
  label: string;
  desc?: string;
  href: string;
}

interface MegaColumn {
  eyebrow: string;
  items: MegaLinkItem[];
}

interface FeaturedCard {
  tag: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
}

interface MegaMenuSection {
  label: string;
  columns: MegaColumn[];
  featured?: FeaturedCard;
}

const MEGA_MENUS: Record<string, MegaMenuSection> = {
  platform: {
    label: "Platform",
    columns: [
      {
        eyebrow: "PLATFORM CAPABILITIES",
        items: [
          {
            label: "Unified Resilience Observability",
            desc: "Cross-vendor telemetry, estate map & posture",
            href: "/platform/observability",
          },
          {
            label: "Backup Operations",
            desc: "Policy automation & backup job validation",
            href: "/platform/backup-operations",
          },
          {
            label: "Incident Resolution",
            desc: "Autonomous root cause analysis & runbooks",
            href: "/platform/incident-resolution",
          },
        ],
      },
      {
        eyebrow: "CYBER RESILIENCE",
        items: [
          {
            label: "Cyber Resilience",
            desc: "Air-gapped immutable recovery orchestration",
            href: "/platform/cyber-resilience",
          },
          {
            label: "Integrations",
            desc: "Commvault, Veeam, Dell PowerProtect & ServiceNow",
            href: "/platform/integrations",
          },
        ],
      },
      {
        eyebrow: "ENTERPRISE FOUNDATION",
        items: [
          {
            label: "Enterprise Readiness",
            desc: "Zero-trust governance, audit trails & scale",
            href: "/platform/enterprise-readiness",
          },
          {
            label: "Deploy Architecture",
            desc: "Air-gapped, on-premises, hybrid & multi-cloud",
            href: "/platform/deploy",
          },
          {
            label: "Built for Flexibility",
            desc: "BYO models, backup engines, storage & ITSM",
            href: "/platform/built-for-flexibility",
          },
        ],
      },
    ],
  },
  solutions: {
    label: "Solutions",
    columns: [
      {
        eyebrow: "PARTNER ECOSYSTEM",
        items: [
          {
            label: "System Integrators",
            desc: "Architecture practices & enterprise delivery acceleration",
            href: "/solutions/system-integrators",
          },
          {
            label: "Managed Services (MSPs)",
            desc: "Multi-tenant operations with autonomous policy enforcement",
            href: "/solutions/managed-services",
          },
        ],
      },
      {
        eyebrow: "ORGANIZATIONS",
        items: [
          {
            label: "Enterprises",
            desc: "Mission-critical estate protection & compliance assurance",
            href: "/solutions/enterprises",
          },
          {
            label: "Advisory & Consulting",
            desc: "Resilience frameworks & operational risk readiness",
            href: "/solutions/advisory-consulting",
          },
        ],
      },
    ],
    featured: {
      tag: "READINESS ASSESSMENT",
      title: "Validate Cyber Recovery Posture",
      desc: "Evaluate cross-vendor backup SLAs, air-gapped vaults, and recovery posture with our architecture team.",
      cta: "Request Architecture Review →",
      href: "/company/contact?intent=arch-review",
    },
  },
  resources: {
    label: "Resources",
    columns: [
      {
        eyebrow: "PUBLICATIONS",
        items: [
          {
            label: "The Resilience Pulse",
            desc: "Bi-weekly executive briefings on autonomous cyber recovery",
            href: "/resources/newsletter",
          },
          {
            label: "Engineering Blog",
            desc: "Technical deep dives, post-mortems & systems architecture",
            href: "/resources/blog",
          },
        ],
      },
      {
        eyebrow: "MEDIA & SUPPORT",
        items: [
          {
            label: "Resilience Podcast",
            desc: "Conversations with infrastructure architects & operators",
            href: "/resources/podcast",
          },
          {
            label: "Technical FAQ",
            desc: "Architecture, integration security & deployment answers",
            href: "/resources/faq",
          },
        ],
      },
    ],
    featured: {
      tag: "TECHNICAL ARCHITECTURE",
      title: "Autonomous Resilience Operations",
      desc: "Deep-dive into Agent Mesh™ non-disintermediation covenants, air-gap integrity, and failover runbooks.",
      cta: "Read Architecture FAQs →",
      href: "/resources/faq",
    },
  },
  company: {
    label: "Company",
    columns: [
      {
        eyebrow: "ORGANIZATION",
        items: [
          {
            label: "About Us",
            desc: "Mission, executive leadership & the resilience thesis",
            href: "/company/about",
          },
          {
            label: "Careers",
            desc: "Join our systems engineering & agent architecture teams",
            href: "/company/careers",
          },
        ],
      },
      {
        eyebrow: "ECOSYSTEM & PRESS",
        items: [
          {
            label: "Investors & Partners",
            desc: "Backed by Kalaari Capital & enterprise industry leaders",
            href: "/company/investors-partners",
          },
          {
            label: "Newsroom",
            desc: "Press releases, product announcements & media coverage",
            href: "/company/newsroom",
          },
          {
            label: "Contact Us",
            desc: "Direct access to solutions architects & leadership",
            href: "/company/contact",
          },
        ],
      },
    ],
    featured: {
      tag: "EXPERIENCE RESOC",
      title: "Private Architecture Briefing",
      desc: "See how ResOC orchestrates cross-vendor recovery across Commvault, Veeam, Dell, and ServiceNow in a live console.",
      cta: "Book a Live Demo →",
      href: "/demo",
    },
  },
};

export function Navbar() {
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
          aria-label="MeshDefend home"
          className="nav-logo"
          onClick={() => setOpenMenu(null)}
        >
          <Logo height={30} />
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {Object.entries(MEGA_MENUS).map(([key, section]) => {
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

        {/* Right actions */}
        <div className="nav-actions">
          <ThemeToggle />
          <Link
            href="/demo"
            className="btn btn-primary nav-cta-btn"
            onClick={() => setOpenMenu(null)}
          >
            Book a Demo
          </Link>
          <button
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
          </button>
        </div>

        {/* Mega Menu Dropdown: anchored to exact width & position of nav-bar */}
        {openMenu && MEGA_MENUS[openMenu] && (
          <div
            className="nav-mega-menu"
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="nav-mega-grid">
              {MEGA_MENUS[openMenu].columns.map((column) => (
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

              {MEGA_MENUS[openMenu].featured && (
                <div className="nav-mega-col">
                  <div className="nav-mega-eyebrow">EXPLORE</div>
                  <Link
                    href={MEGA_MENUS[openMenu].featured!.href}
                    className="nav-mega-card"
                    onClick={() => setOpenMenu(null)}
                  >
                    <div>
                      <span className="nav-mega-card-tag">
                        {MEGA_MENUS[openMenu].featured!.tag}
                      </span>
                      <span className="nav-mega-card-title">
                        {MEGA_MENUS[openMenu].featured!.title}
                      </span>
                      <span className="nav-mega-card-body">
                        {MEGA_MENUS[openMenu].featured!.desc}
                      </span>
                    </div>
                    <span className="nav-mega-card-cta">
                      {MEGA_MENUS[openMenu].featured!.cta}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile nav overlay */}
      {mobileOpen && (
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
            {Object.entries(MEGA_MENUS).map(([key, section]) => {
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
              <Link
                href="/demo"
                onClick={() => setMobileOpen(false)}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", height: 44, fontSize: 14 }}
              >
                Book a Demo
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
