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
import { HeroSection } from "@/components/hero/HeroSection";
import { HeroStateProvider } from "@/lib/heroState";
import { HOME_AGENT_MESH_SECTION_VISIBLE } from "@/lib/sections";
import { getCmsPageBySlug } from "@/lib/cmsPages";

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
      <HeroStateProvider><HeroSection /></HeroStateProvider>
      <TrustSection />
      <PainSection />
      <SolutionSection />
      {HOME_AGENT_MESH_SECTION_VISIBLE && <AgentMeshSection />}
      <ImpactSection showQualitativeSplit={false} />
      <AudienceSection />
      <FinalCTA />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main"><Suspense fallback={<CmsLoading />}><HomePageContent /></Suspense></main>
      <Suspense fallback={<div aria-hidden="true" style={{ minHeight: 180 }} />}><Footer /></Suspense>
    </>
  );
}
