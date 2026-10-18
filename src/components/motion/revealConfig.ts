export type RevealVariant =
  | "fade-up"
  | "fade"
  | "scale-in"
  | "slide-left"
  | "slide-right";

export const REVEAL_CONFIG = {
  // Duration & Easing
  duration: 0.7, // 0.7s
  ease: [0.22, 1, 0.36, 1] as const, // soft ease-out, no bounce

  // Spatial offsets
  y: 28, // translateY 28px -> 0
  x: 32, // translateX ±32px -> 0 (slide-left / slide-right)
  scale: 0.96, // scale 0.96 -> 1 (cards and dashboard preview)

  // IntersectionObserver trigger bounds
  viewport: {
    once: true, // trigger once per element (no replay on scroll up)
    amount: 0.2, // ~20% of element visible
    margin: "0px 0px -10% 0px", // bottom rootMargin about -10%
  },

  // Stagger intervals
  stagger: {
    step: 0.08, // 0.08s step for eyebrow -> heading -> paragraph -> CTA
    children: 0.1, // 0.1s step between direct children in RevealGroup
    maxTotal: 0.6, // max total stagger capped at ~0.6s
  },
} as const;

export function getVariantStyles(
  variant: RevealVariant = "fade-up",
  customY?: number
) {
  const yOffset = customY ?? REVEAL_CONFIG.y;
  const xOffset = REVEAL_CONFIG.x;
  const scaleValue = REVEAL_CONFIG.scale;

  switch (variant) {
    case "fade":
      return {
        hidden: { opacity: 0, x: 0, y: 0, scale: 1 },
        visible: { opacity: 1, x: 0, y: 0, scale: 1 },
      };
    case "scale-in":
      return {
        hidden: { opacity: 0, x: 0, y: 0, scale: scaleValue },
        visible: { opacity: 1, x: 0, y: 0, scale: 1 },
      };
    case "slide-left":
      return {
        hidden: { opacity: 0, x: -xOffset, y: 0, scale: 1 },
        visible: { opacity: 1, x: 0, y: 0, scale: 1 },
      };
    case "slide-right":
      return {
        hidden: { opacity: 0, x: xOffset, y: 0, scale: 1 },
        visible: { opacity: 1, x: 0, y: 0, scale: 1 },
      };
    case "fade-up":
    default:
      return {
        hidden: { opacity: 0, x: 0, y: yOffset, scale: 1 },
        visible: { opacity: 1, x: 0, y: 0, scale: 1 },
      };
  }
}
