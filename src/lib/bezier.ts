/**
 * Cubic Bezier easing evaluator matching CSS transition timing functions.
 */

export function makeCubicBezier(x1: number, y1: number, x2: number, y2: number) {
  return function ease(t: number): number {
    if (t <= 0) return 0;
    if (t >= 1) return 1;

    let s = t;
    for (let i = 0; i < 8; i++) {
      const currentX =
        3 * (1 - s) * (1 - s) * s * x1 +
        3 * (1 - s) * s * s * x2 +
        s * s * s;
      const dx =
        3 * (1 - s) * (1 - s) * x1 +
        6 * (1 - s) * s * (x2 - x1) +
        3 * s * s * (1 - x2);
      if (Math.abs(currentX - t) < 1e-6 || Math.abs(dx) < 1e-7) break;
      s -= (currentX - t) / dx;
    }

    s = Math.max(0, Math.min(1, s));
    return (
      3 * (1 - s) * (1 - s) * s * y1 +
      3 * (1 - s) * s * s * y2 +
      s * s * s
    );
  };
}

export const easeReveal = makeCubicBezier(0.65, 0, 0.15, 1);
export const easeConsoleRise = makeCubicBezier(0.16, 1, 0.3, 1);
