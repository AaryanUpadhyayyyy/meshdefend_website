import type { CollectionConfig } from "payload";

const isSuperAdmin = ({ req }: { req: { user?: { role?: string } | null } }) =>
  req.user?.role === "superAdmin";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    lockTime: 10 * 60 * 1000,
    maxLoginAttempts: 5,
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "role", "updatedAt"],
  },
  access: {
    admin: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    create: async ({ req }) => {
      if (req.user) return isSuperAdmin({ req });
      const { totalDocs } = await req.payload.count({
        collection: "users",
        overrideAccess: true,
      });
      return totalDocs === 0;
    },
    update: ({ req }) => isSuperAdmin({ req }),
    delete: ({ req }) => isSuperAdmin({ req }),
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === "create" && !req.user) {
          const { totalDocs } = await req.payload.count({
            collection: "users",
            overrideAccess: true,
          });
          if (totalDocs === 0) data.role = "superAdmin";
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Editor", value: "editor" },
        { label: "Super admin", value: "superAdmin" },
      ],
      access: {
        update: ({ req }) => isSuperAdmin({ req }),
      },
    },
  ],
};
