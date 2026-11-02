import { readFileSync } from "node:fs";
import { join } from "node:path";
import { useId } from "react";
import { Reveal } from "@/components/motion";
import { MeshDefendBackground } from "@/components/hero/MeshDefendBackground";
import { PainStackOpacity } from "@/components/sections/PainStackOpacity";
import { PAIN_CAROUSEL_CARDS } from "@/lib/cmsHomepage";
import { PAIN } from "@/lib/sections";

type PainPointCMSContent = { label?: string; desc?: string };

type PainCardCMSContent = {
  num?: string;
  group?: string;
  imageUrl?: string;
  image?: { url?: string } | null;
  summary?: string;
  imageAlt?: string;
  points?: PainPointCMSContent[];
};

const LEGACY_PAIN_ARTWORK: Record<string, string> = {
  "/images/img/backup-success-recovery-unproven.png": "/images/home/recovery-confidence-timeline.svg",
  "/images/img/Recovery Confidence Timeline Dashboard.png": "/images/home/recovery-confidence-timeline.svg",
  "/images/img/fragmented-systems-missing-single-view.png": "/images/home/platform-sprawl.svg",
  "/images/img/context-loss-support.png": "/images/home/operational-friction.svg",
};

const INLINE_PAIN_ARTWORK_PATHS = [
  "/images/home/recovery-confidence-timeline.svg",
  "/images/home/platform-sprawl.svg",
  "/images/home/operational-friction.svg",
];

const INLINE_PAIN_ARTWORK: Record<string, string> = Object.fromEntries(
  INLINE_PAIN_ARTWORK_PATHS.map((src) => [
    src,
    readFileSync(join(process.cwd(), "public", src.slice(1)), "utf8"),
  ])
);

function namespaceSvgIds(svg: string, prefix: string, compactRecovery = false) {
  return svg
    .replace(
      /<svg\b([^>]*)>/,
      (_match, attributes: string) => {
        const normalizedAttributes = compactRecovery
          ? attributes
              .replace(/\bviewBox="[^"]*"/, 'viewBox="46 105 1580 555"')
              .replace(/\s+preserveAspectRatio="[^"]*"/, "")
          : attributes;
        const preserveAspectRatio = compactRecovery
          ? ' preserveAspectRatio="xMidYMid meet"'
          : "";
        return `<svg${normalizedAttributes}${preserveAspectRatio} style="display:block;width:100%;height:auto;max-width:100%;user-select:text;-webkit-user-select:text;">`;
      }
    )
    .replace(
      /<text\b/g,
      '<text style="cursor:text;user-select:text;-webkit-user-select:text;"'
    )
    .replace(
      /<tspan\b/g,
      '<tspan style="cursor:text;user-select:text;-webkit-user-select:text;"'
    )
    .replace(/\bid="([^"]+)"/g, (_match, id: string) => `id="${prefix}-${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_match, id: string) => `url(#${prefix}-${id})`)
    .replace(
      /\b(aria-labelledby|aria-describedby)="([^"]+)"/g,
      (_match, attribute: string, ids: string) =>
        `${attribute}="${ids
          .split(/\s+/)
          .map((id) => `${prefix}-${id}`)
          .join(" ")}"`
    )
    .replace(
      /\b(href|xlink:href)="#([^"]+)"/g,
      (_match, attribute: string, id: string) => `${attribute}="#${prefix}-${id}"`
    );
}

const REMOVED_PAIN_SUMMARY_PREFIXES = [
  "Successful backups do not prove application recovery.",
  "Disconnected platforms, clouds, and protection vendors",
  "Critical operational context is lost across L1, L2, L3",
];

export type PainSectionCMSContent = Partial<
  Pick<typeof PAIN, "eyebrow" | "headline" | "openingLine">
> & {
  cards?: PainCardCMSContent[];
  previousButtonLabel?: string;
  nextButtonLabel?: string;
  slideButtonLabelPrefix?: string;
};

export function PainSection({
  content,
}: {
  content?: PainSectionCMSContent;
} = {}) {
  const artworkId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const copy = { ...PAIN, ...content };
  const cards: PainCardCMSContent[] = content?.cards?.length
    ? content.cards
    : PAIN_CAROUSEL_CARDS;

  return (
    <section
      id="pain"
      className="pain-section home-pain-section"
    >
      <MeshDefendBackground variant="subtle" density="sparse" />

      <div className="container pain-section__container">
        <header className="pain-section__header">
          {copy.eyebrow && (
            <Reveal delay={0}>
              <div className="pain-section__eyebrow">
                <span aria-hidden="true" />
                {copy.eyebrow}
              </div>
            </Reveal>
          )}

          <Reveal delay={0.08}>
            <h2 className="display pain-section__title">{copy.headline}</h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="pain-section__intro">{copy.openingLine}</p>
          </Reveal>
        </header>

        <div
          className="pain-feature-list"
          style={{ width: "min(1200px, 100%)" }}
        >
          {cards.map((card, index) => {
            const fallback = PAIN_CAROUSEL_CARDS[index % PAIN_CAROUSEL_CARDS.length];
            const number = card.num || fallback.num;
            const title = card.group || fallback.group;
            const requestedImage = card.image?.url || card.imageUrl;
            const replacementImage =
              title === "Complexity at Scale"
                ? "/images/img/1000227811.png"
                : title === "Operational Friction"
                  ? "/images/img/Operational Friction.png"
                  : undefined;
            const imageSrc =
              replacementImage ||
              (requestedImage
                ? LEGACY_PAIN_ARTWORK[requestedImage] || requestedImage
                : fallback.imageUrl);
            const isRecoveryConfidenceImage =
              imageSrc === "/images/home/recovery-confidence-timeline.svg";
            const isComplexityImage = imageSrc === "/images/img/1000227811.png";
            const isOperationalFrictionImage =
              imageSrc === "/images/img/Operational Friction.png";
            const imageWidth = isOperationalFrictionImage
              ? 1754
              : isComplexityImage
                ? 1536
                : 1586;
            const imageHeight = isOperationalFrictionImage
              ? 896
              : isComplexityImage
                ? 608
                : 768;
            const imageModifier = isRecoveryConfidenceImage
              ? " pain-feature-row--recovery-confidence"
              : isComplexityImage
                ? " pain-feature-row--complexity-image"
                : isOperationalFrictionImage
                  ? " pain-feature-row--operational-friction-image"
                  : "";
            const svgArtwork = INLINE_PAIN_ARTWORK[imageSrc]
              ? namespaceSvgIds(
                  INLINE_PAIN_ARTWORK[imageSrc],
                  `${artworkId}-${index}`,
                  isRecoveryConfidenceImage
                )
              : null;
            const summary = card.summary || fallback.summary || "";
            const removedSummaryPrefix = REMOVED_PAIN_SUMMARY_PREFIXES[index];
            const hideRemovedSummary = removedSummaryPrefix
              ? summary.trimStart().startsWith(removedSummaryPrefix)
              : false;
            const imageAlt = card.imageAlt || fallback.imageAlt;
            const points: PainPointCMSContent[] =
              card.points?.length
                ? card.points
                : PAIN.clusters[index % PAIN.clusters.length]?.items ?? [];

            return (
              <article
                className={`pain-feature-row${imageModifier}`}
                key={`${number}-${title}`}
                style={{ zIndex: index + 1, padding: 20 }}
              >
                <Reveal
                  as="figure"
                  className="pain-feature-visual"
                  variant="slide-left"
                  delay={Math.min(index * 0.08, 0.16)}
                  threshold={0.12}
                >
                  {svgArtwork ? (
                    <div
                      className="pain-feature-graphic"
                      style={{ width: "100%", minWidth: 0 }}
                      dangerouslySetInnerHTML={{ __html: svgArtwork }}
                    />
                  ) : (
                    <img
                      src={imageSrc}
                      alt={imageAlt}
                      width={imageWidth}
                      height={imageHeight}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </Reveal>

                <Reveal
                  as="div"
                  className="pain-feature-copy"
                  variant="slide-right"
                  delay={Math.min(index * 0.08 + 0.08, 0.24)}
                  threshold={0.12}
                >
                  <h3 className="pain-feature-title">{title}</h3>
                  {summary && !hideRemovedSummary && (
                    <p className="pain-feature-summary">{summary}</p>
                  )}
                  <ul className="pain-feature-points">
                    {points.map((point, pointIndex) => (
                      <li key={`${point.label || "point"}-${pointIndex}`}>
                        <span className="pain-feature-point-mark" aria-hidden="true" />
                        <div>
                          <h4 className="pain-feature-point-label">{point.label}</h4>
                          <p className="pain-feature-point-description">{point.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </article>
            );
          })}
        </div>
        <PainStackOpacity />
      </div>
    </section>
  );
}
