import "server-only";

import { cache } from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import {
  DEFAULT_FOOTER_NAV_GROUPS,
  DEFAULT_MEGA_MENUS,
  DEFAULT_SITE_SETTINGS,
  type FooterNavGroup,
  type MegaMenuSection,
} from "./siteChromeDefaults";
import type { CmsAsset, CmsFooterSettings, CmsHeaderSettings, CmsSiteSettings } from "./siteSettingsTypes";

type RecordValue = Record<string, unknown>;
const record = (value: unknown): RecordValue =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as RecordValue)
    : {};
const string = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : fallback;
const asset = (value: unknown): CmsAsset => {
  if (!value || typeof value !== "object") return null;
  const media = record(value);
  return {
    url: typeof media.url === "string" ? media.url : null,
    alt: typeof media.alt === "string" ? media.alt : null,
  };
};

function normalizeMenus(value: unknown): MegaMenuSection[] {
  if (!Array.isArray(value)) return DEFAULT_MEGA_MENUS;
  return value.map((entry, index) => {
    const menu = record(entry);
    const fallback = DEFAULT_MEGA_MENUS[index];
    const columns = Array.isArray(menu.columns) ? menu.columns : [];
    const normalized: MegaMenuSection = {
      key: string(menu.key, fallback?.key || `menu-${index + 1}`),
      label: string(menu.label),
      columns: columns.map((columnValue) => {
        const column = record(columnValue);
        const items = Array.isArray(column.items) ? column.items : [];
        return {
          eyebrow: string(column.eyebrow),
          items: items.map((itemValue) => {
            const item = record(itemValue);
            return {
              label: string(item.label),
              desc: string(item.desc),
              href: string(item.href),
            };
          }),
        };
      }),
    };
    const featured = record(menu.featured);
    if (string(featured.title) || string(featured.tag) || string(featured.cta)) {
      normalized.featured = {
        tag: string(featured.tag),
        title: string(featured.title),
        desc: string(featured.desc),
        cta: string(featured.cta),
        href: string(featured.href),
      };
    }
    return normalized;
  });
}

function normalizeFooterGroups(value: unknown): FooterNavGroup[] {
  if (!Array.isArray(value)) return DEFAULT_FOOTER_NAV_GROUPS;
  return value.map((entry, index) => {
    const group = record(entry);
    const fallback = DEFAULT_FOOTER_NAV_GROUPS[index];
    const links = Array.isArray(group.links) ? group.links : [];
    return {
      num: string(group.num, fallback?.num || String(index + 1).padStart(2, "0")),
      title: string(group.title),
      links: links.map((linkValue) => {
        const link = record(linkValue);
        return {
          label: string(link.label),
          href: string(link.href),
          badge: string(link.badge),
        };
      }),
    };
  });
}

function normalizeLegalLinks(value: unknown, defaults: CmsFooterSettings["legalLinks"]) {
  if (!Array.isArray(value)) return defaults;
  return value.map((entry) => {
    const link = record(entry);
    return { label: string(link.label), href: string(link.href) };
  });
}

export const getCmsSiteSettings = cache(async (): Promise<CmsSiteSettings> => {
  try {
    const payload = await getPayload({ config: configPromise });
    const document = await payload.findGlobal({
      slug: "siteSettings",
      depth: 1,
      overrideAccess: true,
      disableErrors: true,
    });
    if (!document.createdAt) return DEFAULT_SITE_SETTINGS as CmsSiteSettings;

    const raw = record(document);
    const header = record(raw.header);
    const footer = record(raw.footer);
    const defaultHeader = DEFAULT_SITE_SETTINGS.header;
    const defaultFooter = DEFAULT_SITE_SETTINGS.footer;
    const cta = record(header.primaryCta);

    return {
      header: {
        brandName: string(header.brandName, defaultHeader.brandName),
        logoAlt: string(header.logoAlt, defaultHeader.logoAlt),
        logoHeight: typeof header.logoHeight === "number" ? header.logoHeight : defaultHeader.logoHeight,
        logoAsset: asset(header.logoAsset),
        showPrimaryNavigation: typeof header.showPrimaryNavigation === "boolean" ? header.showPrimaryNavigation : defaultHeader.showPrimaryNavigation,
        showThemeToggle: typeof header.showThemeToggle === "boolean" ? header.showThemeToggle : defaultHeader.showThemeToggle,
        featuredColumnLabel: string(header.featuredColumnLabel, defaultHeader.featuredColumnLabel),
        primaryCta: {
          label: string(cta.label, defaultHeader.primaryCta.label),
          href: string(cta.href, defaultHeader.primaryCta.href),
        },
        menus: normalizeMenus(header.menus),
      },
      footer: {
        brandName: string(footer.brandName, defaultFooter.brandName),
        logoAlt: string(footer.logoAlt, defaultFooter.logoAlt),
        logoAsset: asset(footer.logoAsset),
        tagline: string(footer.tagline, defaultFooter.tagline),
        body: string(footer.body, defaultFooter.body),
        statusText: string(footer.statusText, defaultFooter.statusText),
        showNewsletter: typeof footer.showNewsletter === "boolean" ? footer.showNewsletter : defaultFooter.showNewsletter,
        newsletterHeading: string(footer.newsletterHeading, defaultFooter.newsletterHeading),
        newsletterDescription: string(footer.newsletterDescription, defaultFooter.newsletterDescription),
        newsletterPlaceholder: string(footer.newsletterPlaceholder, defaultFooter.newsletterPlaceholder),
        newsletterInputLabel: string(footer.newsletterInputLabel, defaultFooter.newsletterInputLabel),
        newsletterButtonLabel: string(footer.newsletterButtonLabel, defaultFooter.newsletterButtonLabel),
        newsletterPrivacyNote: string(footer.newsletterPrivacyNote, defaultFooter.newsletterPrivacyNote),
        newsletterSuccessMessage: string(footer.newsletterSuccessMessage, defaultFooter.newsletterSuccessMessage),
        navigationGroups: normalizeFooterGroups(footer.navigationGroups),
        copyrightText: string(footer.copyrightText, defaultFooter.copyrightText),
        legalLinks: normalizeLegalLinks(footer.legalLinks, defaultFooter.legalLinks),
        environmentText: string(footer.environmentText, defaultFooter.environmentText),
        email: string(footer.email, defaultFooter.email),
      },
    };
  } catch {
    return DEFAULT_SITE_SETTINGS as CmsSiteSettings;
  }
});
