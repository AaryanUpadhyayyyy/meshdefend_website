import type { Block, Field } from "payload";

const text = (name: string, label: string, required = false): Field => ({
  name,
  label,
  type: "text",
  required,
});

const textarea = (name: string, label: string, required = false): Field => ({
  name,
  label,
  type: "textarea",
  required,
});

const mediaRelation = (name: string, label: string): Field => ({
  name,
  label,
  type: "relationship",
  relationTo: "media",
});

const ctaGroup = (name: string, label: string): Field => ({
  name,
  label,
  type: "group",
  fields: [
    text("label", "Button label", true),
    { name: "href", label: "Link destination", type: "text", required: true },
  ],
});

export const HeroBlock: Block = {
  slug: "hero",
  interfaceName: "HeroSectionBlock",
  labels: { singular: "Hero", plural: "Hero sections" },
  fields: [
    text("h1Prefix", "Heading", true),
    text("h1Accent", "Heading accent"),
    textarea("subheading", "Supporting heading", true),
    textarea("body", "Description"),
    ctaGroup("primaryCta", "Primary button"),
    ctaGroup("secondaryCta", "Secondary link"),
    text("backingLine", "Backing line"),
    mediaRelation("dashboardImage", "Dashboard image upload"),
    {
      name: "dashboardImageUrl",
      label: "Dashboard image URL (fallback)",
      type: "text",
      defaultValue: "/images/dashboard/image.png",
    },
    text("dashboardImageAlt", "Dashboard image description"),
  ],
};

export const TrustStripBlock: Block = {
  slug: "trustStrip",
  interfaceName: "TrustStripBlock",
  labels: { singular: "Trust strip", plural: "Trust strips" },
  fields: [
    text("backedByLabel", "Backed by label"),
    text("backedByCaption", "Backed by caption"),
    {
      name: "backers",
      label: "Investors and backers",
      type: "array",
      fields: [
        text("name", "Organization name", true),
        mediaRelation("lightLogo", "Logo for light theme"),
        mediaRelation("darkLogo", "Logo for dark theme"),
        text("lightUrl", "Light theme logo URL fallback"),
        text("darkUrl", "Dark theme logo URL fallback"),
        { name: "height", label: "Logo height (px)", type: "number", defaultValue: 34 },
        text("href", "Optional link"),
      ],
    },
    text("partnersLabel", "Partner logos label"),
    {
      name: "partners",
      label: "Partner logos",
      type: "array",
      fields: [
        text("name", "Organization name", true),
        mediaRelation("lightAsset", "Light theme logo upload"),
        mediaRelation("darkAsset", "Dark theme logo upload"),
        text("lightSrc", "Light theme logo URL"),
        text("darkSrc", "Dark theme logo URL"),
        { name: "height", label: "Logo height", type: "number", defaultValue: 28 },
      ],
    },
  ],
};

export const PainPointsBlock: Block = {
  slug: "painPoints",
  interfaceName: "PainPointsBlock",
  labels: { singular: "Resilience challenges", plural: "Resilience challenges" },
  fields: [
    text("eyebrow", "Eyebrow"),
    text("headline", "Heading", true),
    textarea("openingLine", "Intro text"),
    text("previousButtonLabel", "Previous slide accessibility label"),
    text("nextButtonLabel", "Next slide accessibility label"),
    text("slideButtonLabelPrefix", "Slide selector accessibility label"),
    {
      name: "cards",
      label: "Challenge slides",
      type: "array",
      minRows: 1,
      fields: [
        text("num", "Number"),
        text("group", "Category", true),
        textarea("summary", "Summary", true),
        text("imageAlt", "Image description"),
        mediaRelation("image", "Image upload"),
        text("imageUrl", "Image URL (fallback)"),
      ],
    },
  ],
};

export const CapabilitiesBlock: Block = {
  slug: "capabilities",
  interfaceName: "CapabilitiesBlock",
  labels: { singular: "ResOC capabilities", plural: "ResOC capabilities" },
  fields: [
    text("eyebrow", "Eyebrow"),
    text("headline", "Heading", true),
    textarea("lede", "Intro text"),
    {
      name: "columns",
      type: "group",
      fields: [
        text("number", "Row number column label"),
        text("col1", "First column"),
        text("col2", "Second column"),
      ],
    },
    {
      name: "items",
      label: "Capability rows",
      type: "array",
      minRows: 1,
      fields: [
        text("num", "Number"),
        text("capability", "Capability", true),
        textarea("solves", "What it solves", true),
        text("href", "Link destination"),
      ],
    },
  ],
};

export const AgentMeshBlock: Block = {
  slug: "agentMesh",
  interfaceName: "AgentMeshBlock",
  labels: { singular: "Agent Mesh section", plural: "Agent Mesh sections" },
  fields: [
    text("eyebrow", "Eyebrow"),
    text("headingFirst", "First heading line", true),
    text("headingSecond", "Second heading line", true),
    textarea("intro", "Description", true),
    text("policyStatus", "Policy status label"),
    text("cycleAriaLabel", "Reasoning cycle accessibility label"),
    textarea("closingLine", "Closing statement"),
    {
      name: "steps",
      label: "Learn, reason, act steps",
      type: "array",
      minRows: 3,
      maxRows: 3,
      fields: [
        text("label", "Step heading", true),
        textarea("description", "Step description", true),
        text("status", "Approval status", true),
      ],
    },
    {
      name: "pillars",
      label: "Supporting points",
      type: "array",
      fields: [text("title", "Heading", true), textarea("desc", "Description", true)],
    },
  ],
};

export const ImpactBlock: Block = {
  slug: "impact",
  interfaceName: "ImpactBlock",
  labels: { singular: "Impact section", plural: "Impact sections" },
  fields: [
    text("eyebrow", "Eyebrow"),
    text("headline", "Heading", true),
    { name: "metricPrefix", label: "Metric prefix", type: "text", required: true, defaultValue: "TELEMETRY //" },
    {
      name: "stats",
      label: "Impact metrics",
      type: "array",
      fields: [
        text("tag", "Metric category label"),
        text("value", "Metric", true),
        text("label", "Label", true),
        textarea("desc", "Description", true),
      ],
    },
    {
      name: "costOptimization",
      label: "Financial ROI",
      type: "group",
      fields: [
        text("title", "Heading"),
        text("label", "Section label"),
        {
          name: "points",
          type: "array",
          fields: [text("title", "Point", true), textarea("desc", "Additional detail")],
        },
      ],
    },
    {
      name: "resiliencePosture",
      label: "Resilience posture",
      type: "group",
      fields: [
        text("title", "Heading"),
        text("label", "Section label"),
        {
          name: "points",
          type: "array",
          fields: [textarea("point", "Point", true)],
        },
      ],
    },
  ],
};

export const AudienceBlock: Block = {
  slug: "audiences",
  interfaceName: "AudienceBlock",
  labels: { singular: "Audience section", plural: "Audience sections" },
  fields: [
    text("eyebrow", "Eyebrow"),
    text("headline", "Heading", true),
    {
      name: "segments",
      label: "Audience items",
      type: "array",
      minRows: 1,
      fields: [
        text("id", "Stable ID"),
        text("num", "Number"),
        text("title", "Heading", true),
        textarea("desc", "Description", true),
        text("href", "Link destination"),
      ],
    },
  ],
};

export const CallToActionBlock: Block = {
  slug: "callToAction",
  interfaceName: "CallToActionBlock",
  labels: { singular: "Call to action", plural: "Calls to action" },
  fields: [
    text("eyebrow", "Eyebrow"),
    text("headline", "Heading", true),
    textarea("lede", "Description"),
    text("ctaPrimary", "Primary button label"),
    text("ctaPrimaryHref", "Primary link"),
    text("ctaSecondary", "Secondary button label"),
    text("ctaSecondaryHref", "Secondary link"),
  ],
};

export const TextSectionBlock: Block = {
  slug: "textSection",
  interfaceName: "TextSectionBlock",
  labels: { singular: "Text section", plural: "Text sections" },
  fields: [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    textarea("body", "Text"),
    {
      name: "alignment",
      type: "select",
      defaultValue: "left",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
      ],
    },
    {
      name: "tone",
      type: "select",
      defaultValue: "light",
      options: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
      ],
    },
  ],
};

export const FeatureGridBlock: Block = {
  slug: "featureGrid",
  interfaceName: "FeatureGridBlock",
  labels: { singular: "Feature grid", plural: "Feature grids" },
  fields: [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading", true),
    textarea("intro", "Intro text"),
    { name: "linkLabel", label: "Card link label", type: "text", required: true, defaultValue: "Explore" },
    {
      name: "columns",
      type: "select",
      defaultValue: "3",
      options: [
        { label: "Two", value: "2" },
        { label: "Three", value: "3" },
        { label: "Four", value: "4" },
      ],
    },
    {
      name: "items",
      label: "Items",
      type: "array",
      minRows: 1,
      fields: [
        text("title", "Heading", true),
        textarea("description", "Description", true),
        text("href", "Link destination"),
      ],
    },
  ],
};

export const ImageSectionBlock: Block = {
  slug: "imageSection",
  interfaceName: "ImageSectionBlock",
  labels: { singular: "Image section", plural: "Image sections" },
  fields: [
    mediaRelation("media", "Upload or select image"),
    text("imageUrl", "Image URL (fallback)"),
    text("alt", "Image description", true),
    textarea("caption", "Caption"),
    {
      name: "size",
      type: "select",
      defaultValue: "wide",
      options: [
        { label: "Standard", value: "standard" },
        { label: "Wide", value: "wide" },
        { label: "Full width", value: "full" },
      ],
    },
    {
      name: "alignment",
      type: "select",
      defaultValue: "center",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
  ],
};

export const PageBuilderBlocks: Block[] = [
  HeroBlock,
  TrustStripBlock,
  PainPointsBlock,
  CapabilitiesBlock,
  AgentMeshBlock,
  ImpactBlock,
  AudienceBlock,
  CallToActionBlock,
  TextSectionBlock,
  FeatureGridBlock,
  ImageSectionBlock,
];
