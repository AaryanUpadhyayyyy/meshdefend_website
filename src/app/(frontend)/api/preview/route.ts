import { timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

function matchesSecret(provided: string, expected: string) {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  return providedBuffer.length === expectedBuffer.length && timingSafeEqual(providedBuffer, expectedBuffer);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const providedSecret = url.searchParams.get("secret") || "";
  const expectedSecret = process.env.PAYLOAD_PREVIEW_SECRET || "";
  const slug = url.searchParams.get("slug") || "";

  if (!expectedSecret || !matchesSecret(providedSecret, expectedSecret)) {
    return new Response("Invalid preview secret", { status: 401 });
  }
  if (!slug || !slug.split("/").every((part) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(part))) {
    return new Response("Invalid page slug", { status: 400 });
  }

  const payload = await getPayload({ config: configPromise });
  const page = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  });
  if (!page.docs.length) return new Response("Page not found", { status: 404 });

  (await draftMode()).enable();
  const destination = slug === "home" ? "/" : `/${slug}`;
  return NextResponse.redirect(new URL(destination, url.origin));
}
