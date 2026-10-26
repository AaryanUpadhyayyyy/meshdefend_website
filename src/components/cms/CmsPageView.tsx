import Image from "next/image";
import Link from "next/link";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { AgentMeshSection } from "@/components/sections/AgentMeshSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { PainSection } from "@/components/sections/PainSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { TrustSection, type TrustSectionCMSContent } from "@/components/sections/TrustSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { HeroStateProvider } from "@/lib/heroState";
import { HOME_AGENT_MESH_SECTION_VISIBLE } from "@/lib/sections";
import { CmsPageDocument } from "@/lib/cmsPages";

type CmsBlock = Record<string, unknown> & { blockType: string; id?: string };
type MediaAsset = { url?: string; alt?: string } | number | null;

const asText = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : fallback;
const asBlocks = (value: unknown): CmsBlock[] =>
  Array.isArray(value) ? (value as CmsBlock[]) : [];
const asMedia = (value: unknown): Exclude<MediaAsset, number | null> | null =>
  value && typeof value === "object"
    ? {
        url: typeof (value as { url?: unknown }).url === "string" ? (value as { url: string }).url : undefined,
        alt: typeof (value as { alt?: unknown }).alt === "string" ? (value as { alt: string }).alt : undefined,
      }
    : null;

function GenericTextSection({ block }: { block: CmsBlock }) {
  const dark = block.tone === "dark";
  const centered = block.alignment === "center";
  return (
    <section
      style={{
        padding: "clamp(64px, 8vw, 112px) 0",
        background: dark ? "var(--dark)" : "var(--bg)",
        color: dark ? "var(--white)" : "var(--ink)",
        borderBottom: dark ? "1px solid rgba(255,255,255,.12)" : "1px solid var(--border)",
      }}
    >
      <div className="container" style={{ maxWidth: 900, textAlign: centered ? "center" : "left" }}>
        {typeof block.eyebrow === "string" && <p className="cms-eyebrow">{block.eyebrow}</p>}
        {typeof block.heading === "string" && <h2 className="display cms-heading">{block.heading}</h2>}
        {typeof block.body === "string" && <p className="cms-body">{block.body}</p>}
      </div>
    </section>
  );
}

function FeatureGrid({ block }: { block: CmsBlock }) {
  const items = asBlocks(block.items).filter((item) => typeof item.title === "string");
  return (
    <section className="cms-generic-section">
      <div className="container">
        {typeof block.eyebrow === "string" && <p className="cms-eyebrow">{block.eyebrow}</p>}
        <h2 className="display cms-heading">{asText(block.heading)}</h2>
        {typeof block.intro === "string" && <p className="cms-body">{block.intro}</p>}
        <div className="cms-feature-grid" style={{ gridTemplateColumns: `repeat(${Number(block.columns) || 3}, minmax(0, 1fr))` }}>
          {items.map((item, index) => (
            <article className="cms-feature-item" key={String(item.id ?? index)}>
              <h3>{asText(item.title)}</h3>
              <p>{asText(item.description)}</p>
              {typeof item.href === "string" && item.href.startsWith("/") && (
                <Link href={item.href} className="cms-text-link">{asText(block.linkLabel, "Explore")} <span aria-hidden="true">→</span></Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImageSection({ block }: { block: CmsBlock }) {
  const media = asMedia(block.media);
  const source = media?.url || asText(block.imageUrl);
  if (!source) return null;
  const maxWidth = block.size === "full" ? "100%" : block.size === "wide" ? "1200px" : "900px";
  const justify = block.alignment === "left" ? "flex-start" : block.alignment === "right" ? "flex-end" : "center";
  return (
    <section className="cms-generic-section">
      <div className="container" style={{ display: "flex", justifyContent: justify }}>
        <figure style={{ width: "100%", maxWidth, margin: 0 }}>
          <Image
            src={source}
            alt={asText(block.alt, media?.alt || "")}
            width={1600}
            height={1000}
            unoptimized
            style={{ display: "block", width: "100%", height: "auto", borderRadius: 0, boxShadow: "none" }}
          />
          {typeof block.caption === "string" && block.caption && <figcaption className="cms-caption">{block.caption}</figcaption>}
        </figure>
      </div>
    </section>
  );
}

function renumberHomepageEyebrow(value: string, oldNumber: number, newNumber: number) {
  return value.replace(/^(\s*\[\s*)0*(\d+)(\s*\/\/)/, (match, prefix: string, number: string, divider: string) =>
    Number(number) === oldNumber
      ? `${prefix}${String(newNumber).padStart(2, "0")}${divider}`
      : match,
  );
}

function renderBlock(block: CmsBlock, index: number, isHomepage: boolean) {
  const key = String(block.id ?? `${block.blockType}-${index}`);
  switch (block.blockType) {
    case "hero":
      return (
        <HeroStateProvider key={key}>
          <HeroSection content={{
            h1Prefix: asText(block.h1Prefix),
            h1Accent: asText(block.h1Accent),
            subheading: asText(block.subheading),
            body: asText(block.body),
            primaryCta: block.primaryCta as { label: string; href: string } | undefined,
            secondaryCta: block.secondaryCta as { label: string; href: string } | undefined,
            backingLine: asText(block.backingLine),
            dashboardImage: asMedia(block.dashboardImage),
            dashboardImageUrl: asText(block.dashboardImageUrl),
            dashboardImageAlt: asText(block.dashboardImageAlt),
          }} />
        </HeroStateProvider>
      );
    case "trustStrip": {
      const backers = asBlocks(block.backers).map((backer) => {
        const light = asMedia(backer.lightLogo);
        const dark = asMedia(backer.darkLogo);
        const fallbackLight = asText(backer.lightUrl);
        const fallbackDark = asText(backer.darkUrl);
        const lightSrc = light?.url || fallbackLight || dark?.url || fallbackDark;
        const darkSrc = dark?.url || fallbackDark || light?.url || fallbackLight;
        return {
          name: asText(backer.name),
          lightSrc,
          darkSrc,
          height: typeof backer.height === "number" ? backer.height : 34,
          href: asText(backer.href),
        };
      }).filter((backer) => backer.name && (backer.lightSrc || backer.darkSrc));
      const partners = asBlocks(block.partners).map((partner) => {
        const light = asMedia(partner.lightAsset);
        const dark = asMedia(partner.darkAsset);
        return {
          name: asText(partner.name),
          lightSrc: light?.url || asText(partner.lightSrc),
          darkSrc: dark?.url || asText(partner.darkSrc),
          height: typeof partner.height === "number" ? partner.height : 28,
        };
      }).filter((partner) => partner.name && partner.lightSrc && partner.darkSrc);
      const trustContent: TrustSectionCMSContent = {
        backedByLabel: asText(block.backedByLabel),
        backedByCaption: asText(block.backedByCaption),
        backers,
        partnersLabel: asText(block.partnersLabel),
        partners,
      };
      return <TrustSection key={key} content={trustContent} />;
    }
    case "painPoints":
      return <PainSection key={key} content={{
        eyebrow: asText(block.eyebrow),
        headline: asText(block.headline),
        openingLine: asText(block.openingLine),
        previousButtonLabel: asText(block.previousButtonLabel),
        nextButtonLabel: asText(block.nextButtonLabel),
        slideButtonLabelPrefix: asText(block.slideButtonLabelPrefix),
        cards: asBlocks(block.cards).map((card) => ({
          num: asText(card.num),
          group: asText(card.group),
          summary: asText(card.summary),
          imageAlt: asText(card.imageAlt),
          image: asMedia(card.image),
          imageUrl: asText(card.imageUrl),
        })),
      }} />;
    case "capabilities":
      return <SolutionSection key={key} content={{
        eyebrow: asText(block.eyebrow),
        headline: asText(block.headline),
        lede: asText(block.lede),
        columns: {
          number: asText((block.columns as Record<string, unknown> | undefined)?.number, "#"),
          col1: asText((block.columns as Record<string, unknown> | undefined)?.col1),
          col2: asText((block.columns as Record<string, unknown> | undefined)?.col2),
        },
        items: asBlocks(block.items).map((item, itemIndex) => ({
          num: asText(item.num, String(itemIndex + 1).padStart(2, "0")),
          capability: asText(item.capability),
          solves: asText(item.solves),
          href: asText(item.href, "/platform/observability"),
        })),
      }} />;
    case "agentMesh":
      if (isHomepage && !HOME_AGENT_MESH_SECTION_VISIBLE) return null;
      return <AgentMeshSection key={key} content={{
        eyebrow: asText(block.eyebrow),
        headingFirst: asText(block.headingFirst),
        headingSecond: asText(block.headingSecond),
        intro: asText(block.intro),
        policyStatus: asText(block.policyStatus),
        cycleAriaLabel: asText(block.cycleAriaLabel),
        closingLine: asText(block.closingLine),
        steps: asBlocks(block.steps).map((step) => ({
          label: asText(step.label),
          description: asText(step.description),
          status: asText(step.status),
        })),
        pillars: asBlocks(block.pillars).map((pillar) => ({
          title: asText(pillar.title),
          desc: asText(pillar.desc),
        })),
      }} />;
    case "impact":
      return <ImpactSection key={key} content={{
        eyebrow: isHomepage ? renumberHomepageEyebrow(asText(block.eyebrow), 5, 4) : asText(block.eyebrow),
        headline: asText(block.headline),
        metricPrefix: asText(block.metricPrefix),
        stats: asBlocks(block.stats).map((stat) => ({
          tag: asText(stat.tag),
          value: asText(stat.value),
          label: asText(stat.label),
          desc: asText(stat.desc),
        })),
        costOptimization: {
          ...(block.costOptimization as Record<string, unknown> | undefined),
          title: asText((block.costOptimization as Record<string, unknown> | undefined)?.title),
          label: asText((block.costOptimization as Record<string, unknown> | undefined)?.label),
          points: asBlocks((block.costOptimization as Record<string, unknown> | undefined)?.points).map((point) => ({
            title: asText(point.title),
            desc: asText(point.desc),
          })),
        },
        resiliencePosture: {
          label: asText((block.resiliencePosture as Record<string, unknown> | undefined)?.label),
          title: asText((block.resiliencePosture as Record<string, unknown> | undefined)?.title),
          points: asBlocks((block.resiliencePosture as Record<string, unknown> | undefined)?.points).map((point) => asText(point.point)),
        },
      }} showQualitativeSplit={!isHomepage} />;
    case "audiences":
      return <AudienceSection key={key} content={{
        eyebrow: isHomepage ? renumberHomepageEyebrow(asText(block.eyebrow), 6, 5) : asText(block.eyebrow),
        headline: asText(block.headline),
        segments: asBlocks(block.segments).map((segment, segmentIndex) => ({
          id: asText(segment.id, String(segmentIndex)),
          num: asText(segment.num, String(segmentIndex + 1).padStart(2, "0")),
          title: asText(segment.title),
          desc: asText(segment.desc),
          href: asText(segment.href, "/solutions/enterprises"),
        })),
      }} />;
    case "callToAction":
      return <FinalCTA key={key} content={{
        eyebrow: asText(block.eyebrow),
        headline: asText(block.headline),
        lede: asText(block.lede),
        ctaPrimary: asText(block.ctaPrimary),
        ctaPrimaryHref: asText(block.ctaPrimaryHref, "/demo"),
        ctaSecondary: asText(block.ctaSecondary),
        ctaSecondaryHref: asText(block.ctaSecondaryHref, "/platform/observability"),
      }} />;
    case "textSection":
      return <GenericTextSection key={key} block={block} />;
    case "featureGrid":
      return <FeatureGrid key={key} block={block} />;
    case "imageSection":
      return <ImageSection key={key} block={block} />;
    default:
      return null;
  }
}

export function CmsPageView({ page, isPreview = false }: { page: CmsPageDocument; isPreview?: boolean }) {
  return (
    <>
      {isPreview && (
        <div className="cms-preview-banner">
          Draft preview <Link href="/api/preview/exit">Exit preview</Link>
        </div>
      )}
      <div className="cms-page-builder">
        {asBlocks(page.layout).map((block, index) => renderBlock(block, index, page.slug === "home"))}
      </div>
    </>
  );
}
