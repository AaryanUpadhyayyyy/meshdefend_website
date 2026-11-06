import type { Metadata } from "next";
import { Suspense } from "react";
import { draftMode } from "next/headers";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CmsPageView } from "@/components/cms/CmsPageView";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { AgentMeshSection } from "@/components/sections/AgentMeshSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { PainSection } from "@/components/sections/PainSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { PixelStudioHero } from "@/components/hero/PixelStudioHero";
import { HOME_AGENT_MESH_SECTION_VISIBLE } from "@/lib/sections";
import { getCmsPageBySlug } from "@/lib/cmsPages";

// The home page resolves Payload CMS content (and draft preview state) per
// request, so this route is allowed to finish after navigation instead of
// claiming an instant, fully prefetched UI.
export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPageBySlug("home");
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

async function HomePageContent() {
  const [page, draft] = await Promise.all([getCmsPageBySlug("home"), draftMode()]);
  return (
    page ? <CmsPageView page={page} isPreview={draft.isEnabled} /> : <>
      <PixelStudioHero />
      <TrustSection />
      <PainSection />
      <SolutionSection />
      {HOME_AGENT_MESH_SECTION_VISIBLE && <AgentMeshSection />}
      <ImpactSection isHomepage />
      <AudienceSection />
      <FinalCTA />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar heroVariant />
      <main id="main" className="home-page"><Suspense fallback={<CmsLoading />}><HomePageContent /></Suspense></main>
      <Suspense fallback={<div aria-hidden="true" style={{ minHeight: 180 }} />}><Footer /></Suspense>
    </>
  );
}
