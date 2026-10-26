import type { FooterNavGroup, MegaMenuSection } from "./siteChromeDefaults";

export type CmsAsset = { url?: string | null; alt?: string | null } | null;

export type CmsHeaderSettings = {
  brandName: string;
  logoAlt: string;
  logoHeight: number;
  logoAsset: CmsAsset;
  showPrimaryNavigation: boolean;
  showThemeToggle: boolean;
  featuredColumnLabel: string;
  primaryCta: { label: string; href: string };
  menus: MegaMenuSection[];
};

export type CmsFooterSettings = {
  brandName: string;
  logoAlt: string;
  logoAsset: CmsAsset;
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

export type CmsSiteSettings = {
  header: CmsHeaderSettings;
  footer: CmsFooterSettings;
};
