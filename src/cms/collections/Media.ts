import type { CollectionConfig } from "payload";

const canEdit = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 480, height: 320, position: "centre" },
      { name: "wide", width: 1600, height: 1000, position: "centre" },
    ],
  },
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "updatedAt"],
  },
  access: {
    read: () => true,
    create: canEdit,
    update: canEdit,
    delete: canEdit,
  },
  fields: [
    { name: "alt", type: "text", required: true },
    { name: "caption", type: "text" },
  ],
};
