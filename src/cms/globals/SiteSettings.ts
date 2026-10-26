import type { Field, GlobalConfig } from "payload";

const text = (name: string, label: string, required = false): Field => ({
  name,
  label,
  type: "text",
  required,
});

const textarea = (name: string, label: string): Field => ({
  name,
  label,
  type: "textarea",
});

const href = (name = "href", label = "Link destination"): Field => ({
  name,
  label,
  type: "text",
});

const media = (name: string, label: string): Field => ({
  name,
  label,
  type: "relationship",
  relationTo: "media",
});

const linkFields: Field[] = [
  text("label", "Link label", true),
  href(),
];

export const SiteSettings: GlobalConfig = {
  slug: "siteSettings",
  label: "Site settings",
  admin: {
    group: "Site",
    description: "Edit the shared header navigation and footer content.",
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "header",
      label: "Header and navigation",
      type: "group",
      fields: [
        text("brandName", "Brand name"),
        text("logoAlt", "Logo description"),
        media("logoAsset", "Header logo upload"),
        { name: "logoHeight", label: "Logo height (px)", type: "number", min: 16, max: 96 },
        { name: "showPrimaryNavigation", label: "Show primary navigation", type: "checkbox", defaultValue: true },
        { name: "showThemeToggle", label: "Show theme toggle", type: "checkbox", defaultValue: true },
        text("featuredColumnLabel", "Featured menu label"),
        {
          name: "primaryCta",
          label: "Header button",
          type: "group",
          fields: [text("label", "Button label"), href()],
        },
        {
          name: "menus",
          label: "Navigation menus",
          type: "array",
          minRows: 1,
          fields: [
            text("key", "Menu key (keep stable)", true),
            text("label", "Menu label", true),
            {
              name: "columns",
              label: "Menu columns",
              type: "array",
              fields: [
                text("eyebrow", "Column heading"),
                {
                  name: "items",
                  label: "Links",
                  type: "array",
                  fields: [text("label", "Link label", true), textarea("desc", "Link description"), href()],
                },
              ],
            },
            {
              name: "featured",
              label: "Featured menu card",
              type: "group",
              fields: [
                text("tag", "Eyebrow"),
                text("title", "Heading"),
                textarea("desc", "Description"),
                text("cta", "Button label"),
                href(),
              ],
            },
          ],
        },
      ],
    },
    {
      name: "footer",
      label: "Footer content",
      type: "group",
      fields: [
        text("brandName", "Brand name"),
        text("logoAlt", "Logo description"),
        media("logoAsset", "Footer logo upload"),
        text("tagline", "Brand headline"),
        textarea("body", "Brand description"),
        text("statusText", "Status line"),
        { name: "showNewsletter", label: "Show newsletter form", type: "checkbox", defaultValue: true },
        text("newsletterHeading", "Newsletter heading"),
        textarea("newsletterDescription", "Newsletter description"),
        text("newsletterPlaceholder", "Email placeholder"),
        text("newsletterInputLabel", "Email field accessibility label"),
        text("newsletterButtonLabel", "Subscribe button label"),
        text("newsletterPrivacyNote", "Privacy note"),
        text("newsletterSuccessMessage", "Confirmation message"),
        {
          name: "navigationGroups",
          label: "Footer link groups",
          type: "array",
          fields: [
            text("num", "Group number"),
            text("title", "Group heading", true),
            {
              name: "links",
              label: "Links",
              type: "array",
              fields: [...linkFields, text("badge", "Optional badge")],
            },
          ],
        },
        text("copyrightText", "Copyright line"),
        {
          name: "legalLinks",
          label: "Legal links",
          type: "array",
          fields: linkFields,
        },
        text("environmentText", "Environment summary"),
        text("email", "Contact email"),
      ],
    },
  ],
};
