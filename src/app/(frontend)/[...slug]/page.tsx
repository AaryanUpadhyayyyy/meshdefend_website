import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { draftMode } from "next/headers";
import { CmsPageView } from "@/components/cms/CmsPageView";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getCmsPageBySlug } from "@/lib/cmsPages";

type PageProps = { params: Promise<{ slug: string[] }> };

async function getPageFromParams(params: PageProps["params"]) {
  const { slug } = await params;
  return getCmsPageBySlug(slug.join("/"));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);
  if (!page) return {};
  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description || undefined,
  };
}

function CmsLoading() {
  return (
    <div className="container" role="status" aria-live="polite" style={{ minHeight: 320, paddingTop: 96 }}>
      Loading page…
    </div>
  );
}

async function CmsRoutePageContent({ params }: PageProps) {
  const [page, draft] = await Promise.all([getPageFromParams(params), draftMode()]);
  if (!page) notFound();
  return <CmsPageView page={page} isPreview={draft.isEnabled} />;
}

export default function CmsRoutePage({ params }: PageProps) {
  return (
    <>
      <Navbar />
      <main id="main"><Suspense fallback={<CmsLoading />}><CmsRoutePageContent params={params} /></Suspense></main>
      <Suspense fallback={<div aria-hidden="true" style={{ minHeight: 180 }} />}><Footer /></Suspense>
    </>
  );
}
