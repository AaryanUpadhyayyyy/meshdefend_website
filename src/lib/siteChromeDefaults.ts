import { SITE } from "./content.ts";

export type MegaLinkItem = { label: string; desc?: string; href: string };
export type MegaColumn = { eyebrow: string; items: MegaLinkItem[] };
export type FeaturedCard = {
  tag: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
};
export type MegaMenuSection = {
  key: string;
  label: string;
  columns: MegaColumn[];
  featured?: FeaturedCard;
};
export type FooterNavGroup = {
  num: string;
  title: string;
  links: Array<{ label: string; href: string; badge?: string }>;
};

export const DEFAULT_MEGA_MENUS: MegaMenuSection[] = [
  {
    key: "platform",
    label: "Platform",
    columns: [
      {
        eyebrow: "PLATFORM CAPABILITIES",
        items: [
          { label: "Unified Resilience Observability", desc: "Cross-vendor telemetry, estate map & posture", href: "/platform/observability" },
          { label: "Backup Operations", desc: "Policy automation & backup job validation", href: "/platform/backup-operations" },
          { label: "Incident Resolution", desc: "Autonomous root cause analysis & runbooks", href: "/platform/incident-resolution" },
        ],
      },
      {
        eyebrow: "CYBER RESILIENCE",
        items: [
          { label: "Cyber Resilience", desc: "Air-gapped immutable recovery orchestration", href: "/platform/cyber-resilience" },
          { label: "Integrations", desc: "Commvault, Veeam, Dell PowerProtect & ServiceNow", href: "/platform/integrations" },
        ],
      },
      {
        eyebrow: "ENTERPRISE FOUNDATION",
        items: [
          { label: "Enterprise Readiness", desc: "Zero-trust governance, audit trails & scale", href: "/platform/enterprise-readiness" },
          { label: "Deploy Architecture", desc: "Air-gapped, on-premises, hybrid & multi-cloud", href: "/platform/deploy" },
          { label: "Built for Flexibility", desc: "BYO models, backup engines, storage & ITSM", href: "/platform/built-for-flexibility" },
        ],
      },
    ],
  },
  {
    key: "solutions",
    label: "Solutions",
    columns: [
      {
        eyebrow: "PARTNER ECOSYSTEM",
        items: [
          { label: "System Integrators", desc: "Architecture practices & enterprise delivery acceleration", href: "/solutions/system-integrators" },
          { label: "Managed Services (MSPs)", desc: "Multi-tenant operations with autonomous policy enforcement", href: "/solutions/managed-services" },
        ],
      },
      {
        eyebrow: "ORGANIZATIONS",
        items: [
          { label: "Enterprises", desc: "Mission-critical estate protection & compliance assurance", href: "/solutions/enterprises" },
          { label: "Advisory & Consulting", desc: "Resilience frameworks & operational risk readiness", href: "/solutions/advisory-consulting" },
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
  {
    key: "support",
    label: "Support",
    columns: [
      {
        eyebrow: "CUSTOMER SUPPORT",
        items: [
          { label: "MD Support Portal", desc: "Technical documentation, ticketing & enterprise customer support", href: "/support" },
        ],
      },
    ],
  },
  {
    key: "resources",
    label: "Resources",
    columns: [
      {
        eyebrow: "PUBLICATIONS",
        items: [
          { label: "The Resilience Pulse", desc: "Bi-weekly executive briefings on autonomous cyber recovery", href: "/resources/newsletter" },
          { label: "Engineering Blog", desc: "Technical deep dives, post-mortems & systems architecture", href: "/resources/blog" },
        ],
      },
      {
        eyebrow: "MEDIA & SUPPORT",
        items: [
          { label: "Resilience Podcast", desc: "Conversations with infrastructure architects & operators", href: "/resources/podcast" },
          { label: "Technical FAQ", desc: "Architecture, integration security & deployment answers", href: "/resources/faq" },
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
  {
    key: "company",
    label: "Company",
    columns: [
      {
        eyebrow: "ORGANIZATION",
        items: [
          { label: "About Us", desc: "Mission, executive leadership & the resilience thesis", href: "/company/about" },
          { label: "Careers", desc: "Join our systems engineering & agent architecture teams", href: "/company/careers" },
        ],
      },
      {
        eyebrow: "ECOSYSTEM & PRESS",
        items: [
          { label: "Investors & Partners", desc: "Backed by Kalaari Capital & enterprise industry leaders", href: "/company/investors-partners" },
          { label: "Newsroom", desc: "Press releases, product announcements & media coverage", href: "/company/newsroom" },
          { label: "Contact Us", desc: "Direct access to solutions architects & leadership", href: "/company/contact" },
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
];

export const DEFAULT_FOOTER_NAV_GROUPS: FooterNavGroup[] = [
  {
    num: "01",
    title: "Product",
    links: [
      { label: "Unified Resilience Observability", href: "/platform/observability" },
      { label: "Backup Operations", href: "/platform/backup-operations" },
      { label: "Incident Resolution", href: "/platform/incident-resolution" },
      { label: "Cyber Resilience", href: "/platform/cyber-resilience" },
      { label: "Integrations", href: "/platform/integrations" },
    ],
  },
  {
    num: "02",
    title: "Platform Capabilities",
    links: [
      { label: "Enterprise readiness", href: "/platform/enterprise-readiness" },
      { label: "Deploy", href: "/platform/deploy" },
      { label: "Built for Flexibility", href: "/platform/built-for-flexibility" },
    ],
  },
  {
    num: "03",
    title: "Solutions",
    links: [
      { label: "System Integrators", href: "/solutions/system-integrators" },
      { label: "Managed Services", href: "/solutions/managed-services" },
      { label: "Advisory / Consulting", href: "/solutions/advisory-consulting" },
      { label: "Enterprises", href: "/solutions/enterprises" },
    ],
  },
  { num: "04", title: "Support", links: [{ label: "MD Support Portal", href: "/support" }] },
  {
    num: "05",
    title: "Resources",
    links: [
      { label: "Newsletter", href: "/resources/newsletter" },
      { label: "Podcast", href: "/resources/podcast" },
      { label: "Blogs", href: "/resources/blog" },
      { label: "FAQ", href: "/resources/faq" },
    ],
  },
  {
    num: "06",
    title: "Company",
    links: [
      { label: "About Us", href: "/company/about" },
      { label: "Investors & Partners", href: "/company/investors-partners" },
      { label: "Careers", href: "/company/careers" },
      { label: "Newsroom", href: "/company/newsroom" },
      { label: "Contact us", href: "/company/contact" },
    ],
  },
];

export const DEFAULT_SITE_SETTINGS = {
  header: {
    brandName: SITE.name,
    logoAlt: SITE.name,
    logoHeight: 30,
    logoAsset: null,
    showPrimaryNavigation: true,
    showThemeToggle: true,
    featuredColumnLabel: "EXPLORE",
    primaryCta: { label: "Book a Demo", href: "/demo" },
    menus: DEFAULT_MEGA_MENUS,
  },
  footer: {
    brandName: SITE.name,
    logoAlt: SITE.name,
    logoAsset: null,
    tagline: SITE.tagline,
    body: "ResOC unifies business, infrastructure and security to deliver continuous resilience.",
    statusText: "AGENT MESH™ FABRIC: OPERATIONAL",
    showNewsletter: true,
    newsletterHeading: "Stay informed",
    newsletterDescription: "Subscribe to the MeshDefend newsletter.",
    newsletterPlaceholder: "name@company.com",
    newsletterInputLabel: "Work Email Address",
    newsletterButtonLabel: "Subscribe",
    newsletterPrivacyNote: "No marketing spam. One-click unsubscribe anytime.",
    newsletterSuccessMessage: "✓ You’re subscribed. Expect the next briefing this Tuesday.",
    navigationGroups: DEFAULT_FOOTER_NAV_GROUPS,
    copyrightText: "© 2026 MeshDefend Inc. All rights reserved.",
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security Posture", href: "/security" },
    ],
    environmentText: "HYBRID · MULTI-CLOUD · ON-PREM",
    email: SITE.email,
  },
};
