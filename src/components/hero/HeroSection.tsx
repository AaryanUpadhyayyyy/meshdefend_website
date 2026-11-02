import Link from "next/link";
import Image from "next/image";
import { HERO_CONTENT } from "@/content/home";
import { HERO_BACKING_LINE } from "@/lib/cmsHomepage";
import { ResocIsometricVisual } from "./ResocIsometricVisual";
import "./HeroSection.css";

export type HeroSectionCMSContent = Partial<typeof HERO_CONTENT> & {
  backingLine?: string;
  dashboardImageUrl?: string;
  dashboardImage?: { url?: string } | null;
  dashboardImageAlt?: string;
  useResocVisual?: boolean;
};

export function HeroSection({
  content,
}: {
  content?: HeroSectionCMSContent;
} = {}) {
  const hero = {
    ...HERO_CONTENT,
    ...content,
    primaryCta: { ...HERO_CONTENT.primaryCta, ...content?.primaryCta },
    secondaryCta: { ...HERO_CONTENT.secondaryCta, ...content?.secondaryCta },
  };
  const headingPrefix = hero.h1Prefix.replace(/^Introducing\s+/i, "");
  const useResocVisual = content == null || content.useResocVisual === true;
  const dashboardImageSrc = hero.dashboardImage?.url ||
    hero.dashboardImageUrl ||
    "/images/agent-mesh_pixel-exact.svg";
  const dashboardImageAlt =
    hero.dashboardImageAlt ||
    "Agent Mesh connecting enterprise systems to a unified resilience dashboard";
  const isSelectableDashboardSvg =
    dashboardImageSrc === "/images/agent-mesh_pixel-exact.svg";

  return (
    <section
      id="hero"
      className={`home-hero ${useResocVisual ? "home-hero--resoc" : "home-hero--editorial"}`}
      aria-label={`${headingPrefix} ${hero.h1Accent}`}
    >
      {useResocVisual ? (
        <div className="home-hero__rulers" aria-hidden="true">
          <span className="home-hero__ruler home-hero__ruler--left" />
          <span className="home-hero__ruler home-hero__ruler--right" />
        </div>
      ) : (
        <div className="home-hero__mesh" aria-hidden="true">
          <svg viewBox="0 0 1440 560" preserveAspectRatio="none" focusable="false">
            <g className="home-hero__mesh-lines">
              <path d="M-40 156 92 94 224 146 356 78 488 130 620 62 752 116 884 54 1016 108 1148 48 1280 94 1480 18" />
              <path d="M-40 330 92 266 224 318 356 250 488 302 620 234 752 288 884 226 1016 280 1148 220 1280 266 1480 190" />
              <path d="M-40 506 92 442 224 494 356 426 488 478 620 410 752 464 884 402 1016 456 1148 396 1280 442 1480 366" />
              <path d="M92 94 92 266 92 442M224 146 224 318 224 494M356 78 356 250 356 426M488 130 488 302 488 478M620 62 620 234 620 410M752 116 752 288 752 464M884 54 884 226 884 402M1016 108 1016 280 1016 456M1148 48 1148 220 1148 396M1280 94 1280 266 1280 442" />
              <path d="M92 94 224 318 356 78 488 302 620 62 752 288 884 54 1016 280 1148 48 1280 266 1480 18M-40 330 92 442 224 318 356 426 488 302 620 410 752 288 884 402 1016 280 1148 396 1280 266 1480 366" />
            </g>
            <g className="home-hero__mesh-nodes">
              <circle cx="92" cy="94" r="2.5" /><circle cx="224" cy="146" r="2" />
              <circle cx="356" cy="78" r="2.5" /><circle cx="488" cy="130" r="2" />
              <circle cx="620" cy="62" r="2.5" /><circle cx="752" cy="116" r="2" />
              <circle cx="884" cy="54" r="2.5" /><circle cx="1016" cy="108" r="2" />
              <circle cx="1148" cy="48" r="2.5" /><circle cx="1280" cy="94" r="2" />
              <circle cx="92" cy="442" r="2" /><circle cx="356" cy="426" r="2" />
              <circle cx="620" cy="410" r="2" /><circle cx="884" cy="402" r="2" />
              <circle cx="1148" cy="396" r="2" /><circle cx="1280" cy="442" r="2" />
            </g>
          </svg>
        </div>
      )}

      <div className="home-hero__container">
        <div className="home-hero__content">
          {useResocVisual && <p className="home-hero__eyebrow">Introducing</p>}
          <h1 className="display home-hero__title">
            {headingPrefix}{" "}
            <span className="display-italic">{hero.h1Accent}</span>
          </h1>

          <p className="home-hero__subheading">{hero.subheading}</p>

          <p className="home-hero__body">{hero.body}</p>

          <div className="home-hero__actions">
            <Link href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="hero-secondary-link home-hero__secondary-link"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>

          <p className="home-hero__backing">
            <span aria-hidden="true" />
            {content?.backingLine || HERO_BACKING_LINE}
          </p>
        </div>

        <div className={`home-hero__visual${useResocVisual ? " home-hero__visual--isometric" : ""}`}>
          {useResocVisual ? (
            <ResocIsometricVisual />
          ) : isSelectableDashboardSvg ? (
            <object
              className="home-hero__dashboard-image"
              data={dashboardImageSrc}
              type="image/svg+xml"
              title={dashboardImageAlt}
            >
              {dashboardImageAlt}
            </object>
          ) : (
            <Image
              src={dashboardImageSrc}
              alt={dashboardImageAlt}
              width={useResocVisual ? 1504 : 1584}
              height={useResocVisual ? 1046 : 993}
              sizes="(max-width: 980px) 100vw, 58vw"
              unoptimized={useResocVisual}
              priority
              className="home-hero__dashboard-image"
            />
          )}
        </div>
      </div>
    </section>
  );
}
