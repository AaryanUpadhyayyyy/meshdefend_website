import { mkdirSync } from "node:fs";
import path from "node:path";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./cms/collections/Media.ts";
import { Pages } from "./cms/collections/Pages.ts";
import { SiteSettings } from "./cms/globals/SiteSettings.ts";
import { Users } from "./cms/collections/Users.ts";

const dataDirectory = path.resolve(process.cwd(), "data");
mkdirSync(dataDirectory, { recursive: true });

const databaseURL = process.env.DATABASE_URL;
const localSchemaPushEnabled = process.env.PAYLOAD_DISABLE_SCHEMA_PUSH !== "1";
const database = databaseURL
  ? postgresAdapter({
      pool: { connectionString: databaseURL },
      push: process.env.NODE_ENV !== "production" && localSchemaPushEnabled,
    })
  : sqliteAdapter({
      client: { url: `file:${path.join(dataDirectory, "payload.db")}` },
      push: process.env.NODE_ENV !== "production" && localSchemaPushEnabled,
    });

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(process.cwd(), "src"),
    },
  },
  collections: [Users, Pages, Media],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  db: database,
  sharp,
  typescript: {
    outputFile: path.resolve(process.cwd(), "src/payload-types.ts"),
  },
  graphQL: {
    disable: true,
  },
});
