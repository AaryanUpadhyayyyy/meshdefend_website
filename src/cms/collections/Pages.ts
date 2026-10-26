import type { CollectionConfig } from "payload";
import { PageBuilderBlocks } from "../blocks/index.ts";

const canEdit = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);
const previewSecret = () => process.env.PAYLOAD_PREVIEW_SECRET || "";

export const Pages: CollectionConfig = {
  slug: "pages",
  versions: { drafts: true },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    preview: (doc) => {
      const slug = typeof doc.slug === "string" ? doc.slug : "";
      if (!slug) return null;
      const query = new URLSearchParams({ slug, secret: previewSecret() });
      return `/api/preview?${query.toString()}`;
    },
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
    create: canEdit,
    update: canEdit,
    delete: canEdit,
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "meta",
      label: "Search and social metadata",
      type: "group",
      fields: [
        { name: "title", label: "Browser title", type: "text" },
        { name: "description", type: "textarea" },
      ],
    },
    {
      name: "layout",
      label: "Page sections",
      type: "blocks",
      minRows: 1,
      blocks: PageBuilderBlocks,
    },
  ],
};
