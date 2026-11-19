import type { FooterNavGroup, MegaMenuSection } from "./siteChromeDefaults";

export type Asset = { url?: string | null; alt?: string | null } | null;
export type CmsAsset = Asset;

export type HeaderSettings = {
  brandName: string;
  logoAlt: string;
  logoHeight: number;
  logoAsset: Asset;
  showPrimaryNavigation: boolean;
  showThemeToggle: boolean;
  featuredColumnLabel: string;
  primaryCta: { label: string; href: string };
  menus: MegaMenuSection[];
};
export type CmsHeaderSettings = HeaderSettings;

export type FooterSettings = {
  brandName: string;
  logoAlt: string;
  logoAsset: Asset;
  tagline: string;
  body: string;
  statusText: string;
  showNewsletter: boolean;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterInputLabel: string;
  newsletterButtonLabel: string;
  newsletterPrivacyNote: string;
  newsletterSuccessMessage: string;
  navigationGroups: FooterNavGroup[];
  copyrightText: string;
  legalLinks: Array<{ label: string; href: string }>;
  environmentText: string;
  email: string;
};
export type CmsFooterSettings = FooterSettings;

export type SiteSettings = {
  header: HeaderSettings;
  footer: FooterSettings;
};
export type CmsSiteSettings = SiteSettings;
