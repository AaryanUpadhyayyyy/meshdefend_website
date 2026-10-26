import { Reveal } from "@/components/motion";
import { MeshDefendBackground } from "@/components/hero/MeshDefendBackground";
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
  const copy = { ...PAIN, ...content };
  const cards: PainCardCMSContent[] = content?.cards?.length
    ? content.cards
    : PAIN_CAROUSEL_CARDS;

  return (
    <section
      id="pain"
      className="pain-section"
      style={{
        background: "var(--bg)",
        position: "relative",
        padding: "clamp(56px, 7vw, 96px) 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <MeshDefendBackground variant="subtle" density="sparse" />

      <div className="container pain-section__container">
        <header className="pain-section__header">
          <Reveal delay={0}>
            <div className="pain-section__eyebrow">
              <span aria-hidden="true" />
              {copy.eyebrow}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="display pain-section__title">{copy.headline}</h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="pain-section__intro">{copy.openingLine}</p>
          </Reveal>
        </header>

        <div className="pain-feature-list">
          {cards.map((card, index) => {
            const fallback = PAIN_CAROUSEL_CARDS[index % PAIN_CAROUSEL_CARDS.length];
            const imageSrc = card.image?.url || card.imageUrl || fallback.imageUrl;
            const number = card.num || fallback.num;
            const title = card.group || fallback.group;
            const summary = card.summary || fallback.summary;
            const imageAlt = card.imageAlt || fallback.imageAlt;
            const points: PainPointCMSContent[] =
              card.points?.length
                ? card.points
                : PAIN.clusters[index % PAIN.clusters.length]?.items ?? [];

            return (
              <article
                className="pain-feature-row"
                key={`${number}-${title}`}
                style={{ zIndex: index + 1 }}
              >
                <Reveal
                  as="figure"
                  className="pain-feature-visual"
                  variant="slide-left"
                  delay={Math.min(index * 0.08, 0.16)}
                  threshold={0.12}
                >
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                </Reveal>

                <Reveal
                  as="div"
                  className="pain-feature-copy"
                  variant="slide-right"
                  delay={Math.min(index * 0.08 + 0.08, 0.24)}
                  threshold={0.12}
                >
                  <h3 className="pain-feature-title">{title}</h3>
                  <p className="pain-feature-summary">{summary}</p>
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
      </div>
    </section>
  );
}
