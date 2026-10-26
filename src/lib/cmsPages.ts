import "server-only";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export type CmsPageDocument = {
  id: string | number;
  title: string;
  slug: string;
  _status?: "draft" | "published" | null;
  meta?: { title?: string | null; description?: string | null } | null;
  layout?: Array<Record<string, unknown> & { blockType: string }> | null;
};

export async function getCmsPageBySlug(
  slug: string,
): Promise<CmsPageDocument | null> {
  const { isEnabled } = await draftMode();
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft: isEnabled,
    overrideAccess: isEnabled,
  });
  return (result.docs[0] as CmsPageDocument | undefined) ?? null;
}
