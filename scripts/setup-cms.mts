import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";

const root = process.cwd();
const envFile = path.join(root, ".env.local");
if (existsSync(envFile)) {
  (process as NodeJS.Process & { loadEnvFile?: (path?: string) => void }).loadEnvFile?.(envFile);
}

function ensureSecret(name: string) {
  if (process.env[name]) return process.env[name] as string;
  const value = randomBytes(32).toString("base64url");
  const envPath = envFile;
  if (!existsSync(envPath)) writeFileSync(envPath, "", "utf8");
  const contents = readFileSync(envPath, "utf8");
  appendFileSync(envPath, `${contents && !contents.endsWith("\n") ? "\n" : ""}${name}=${value}\n`);
  process.env[name] = value;
  return value;
}

/** Add newly introduced CMS defaults without replacing values already edited in the admin. */
function fillMissing(existing: unknown, defaults: unknown): { value: unknown; changed: boolean } {
  if (existing === undefined) return { value: defaults, changed: true };
  // Payload uses null for empty optional fields; keep those explicit blanks intact.
  if (existing === null) return { value: existing, changed: false };

  if (Array.isArray(defaults)) {
    if (!Array.isArray(existing)) return { value: defaults, changed: true };
    const identityKeys = ["blockType", "key", "id", "name", "group", "num", "label", "title", "capability", "eyebrow", "point", "href"];
    let changed = false;
    const value = existing.map((item, index) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return item;
      const current = item as Record<string, unknown>;
      const matchKey = identityKeys.find((key) =>
        current[key] !== undefined && defaults.some((candidate) =>
          candidate && typeof candidate === "object" && !Array.isArray(candidate) &&
          (candidate as Record<string, unknown>)[key] === current[key],
        ),
      );
      const defaultIndex = matchKey
        ? defaults.findIndex((candidate) =>
            candidate && typeof candidate === "object" && !Array.isArray(candidate) &&
            (candidate as Record<string, unknown>)[matchKey] === current[matchKey],
          )
        : defaults.length === existing.length ? index : -1;
      if (defaultIndex < 0) return item;
      const result = fillMissing(item, defaults[defaultIndex]);
      changed ||= result.changed;
      return result.value;
    });
    return { value, changed };
  }

  if (defaults && typeof defaults === "object") {
    if (typeof existing !== "object" || Array.isArray(existing)) return { value: defaults, changed: true };
    const current = existing as Record<string, unknown>;
    const value: Record<string, unknown> = { ...current };
    let changed = false;
    for (const [key, defaultValue] of Object.entries(defaults)) {
      if (!Object.hasOwn(current, key)) {
        value[key] = defaultValue;
        changed = true;
        continue;
      }
      const result = fillMissing(current[key], defaultValue);
      if (result.changed) {
        value[key] = result.value;
        changed = true;
      }
    }
    return { value, changed };
  }

  return { value: existing, changed: false };
}

async function main() {
  ensureSecret("PAYLOAD_SECRET");
  ensureSecret("PAYLOAD_PREVIEW_SECRET");
  mkdirSync(path.join(root, "data"), { recursive: true });

  const [configModule, payloadModule, homeModule, sectionsModule, cmsModule, siteChromeModule] = await Promise.all([
    import("../src/payload.config.ts"),
    import("payload"),
    import("../src/content/home.ts"),
    import("../src/lib/sections.ts"),
    import("../src/lib/cmsHomepage.ts"),
    import("../src/lib/siteChromeDefaults.ts"),
  ]);
  const config = configModule.default;
  const { getPayload } = payloadModule;
  const { METADATA, HERO_CONTENT } = homeModule;
  const { PAIN, SOLUTION, IMPACT, AUDIENCE, FINAL_CTA } = sectionsModule;
  const { TRUST_SECTION_CONTENT, PAIN_CAROUSEL_CARDS, AGENT_MESH_SECTION_CONTENT } = cmsModule;
  const { DEFAULT_SITE_SETTINGS } = siteChromeModule;

  const payload = await getPayload({ config });
  try {
    const existingSettings = await payload.findGlobal({
      slug: "siteSettings",
      overrideAccess: true,
      disableErrors: true,
    });
    const settingsMigration = fillMissing(
      { header: existingSettings.header, footer: existingSettings.footer },
      DEFAULT_SITE_SETTINGS,
    );
    if (settingsMigration.changed) {
      await payload.updateGlobal({
        slug: "siteSettings",
        overrideAccess: true,
        data: settingsMigration.value as never,
      });
      console.info("Added any missing editable header and footer settings without replacing saved values.");
    }

    const layout = [
      {
        blockType: "hero",
        h1Prefix: HERO_CONTENT.h1Prefix,
        h1Accent: HERO_CONTENT.h1Accent,
        subheading: HERO_CONTENT.subheading,
        body: HERO_CONTENT.body,
        primaryCta: HERO_CONTENT.primaryCta,
        secondaryCta: HERO_CONTENT.secondaryCta,
        backingLine: "Backed by Kalaari Capital · Kettleborough VC",
        dashboardImageUrl: "/images/dashboard/image.png",
        dashboardImageAlt: "MeshDefend Data Protection Overview dashboard",
      },
      {
        blockType: "trustStrip",
        backedByLabel: TRUST_SECTION_CONTENT.backedByLabel,
        backedByCaption: TRUST_SECTION_CONTENT.backedByCaption,
        backers: TRUST_SECTION_CONTENT.backers.map((backer) => ({
          name: backer.name,
          lightUrl: backer.lightSrc,
          darkUrl: backer.darkSrc,
          height: backer.height,
          href: backer.href,
        })),
        partnersLabel: TRUST_SECTION_CONTENT.partnersLabel,
        partners: TRUST_SECTION_CONTENT.partners,
      },
      {
        blockType: "painPoints",
        eyebrow: PAIN.eyebrow,
        headline: PAIN.headline,
        openingLine: PAIN.openingLine,
        previousButtonLabel: "Previous failure domain",
        nextButtonLabel: "Next failure domain",
        slideButtonLabelPrefix: "Go to problem",
        cards: PAIN_CAROUSEL_CARDS,
      },
      { blockType: "capabilities", ...SOLUTION },
      { blockType: "agentMesh", ...AGENT_MESH_SECTION_CONTENT },
      {
        blockType: "impact",
        ...IMPACT,
        stats: IMPACT.stats,
        costOptimization: IMPACT.costOptimization,
        resiliencePosture: {
          ...IMPACT.resiliencePosture,
          points: IMPACT.resiliencePosture.points.map((point) => ({ point })),
        },
      },
      { blockType: "audiences", ...AUDIENCE },
      {
        blockType: "callToAction",
        ...FINAL_CTA,
        ctaPrimaryHref: "/demo",
        ctaSecondaryHref: "/platform/observability",
      },
    ];

    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: "home" } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length) {
      const home = existing.docs[0];
      const migration = fillMissing(
        { meta: home.meta, layout: home.layout },
        { meta: { title: METADATA.title, description: METADATA.description }, layout },
      );
      if (migration.changed) {
        const migrated = migration.value as { meta: unknown; layout: unknown };
        await payload.update({
          collection: "pages",
          id: home.id,
          overrideAccess: true,
          data: { meta: migrated.meta, layout: migrated.layout } as never,
        });
        console.info("Added missing homepage fields while preserving saved copy, section order, and removed items.");
      } else {
        console.info("The homepage already has all current CMS fields; saved content was left unchanged.");
      }
    } else {
      await payload.create({
        collection: "pages",
        overrideAccess: true,
        data: {
          title: "Home",
          slug: "home",
          meta: { title: METADATA.title, description: METADATA.description },
          layout,
          _status: "published",
        } as never,
      });
      console.info("Created the published homepage with its existing copy and section order.");
    }
  } finally {
    await payload.destroy();
  }

  console.info("CMS setup is ready. Start the site and open /admin to create the first super admin login.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => {
  // Exit after cleanup so SQLite/native handles do not keep this setup CLI open.
  setTimeout(() => process.exit(process.exitCode || 0), 0);
});
