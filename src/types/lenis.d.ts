declare module "lenis" {
  export default class Lenis {
    constructor(options?: {
      duration?: number;
      easing?: (progress: number) => number;
      orientation?: "vertical" | "horizontal";
      gestureOrientation?: "vertical" | "horizontal" | "both";
      smoothWheel?: boolean;
      wheelMultiplier?: number;
      touchMultiplier?: number;
    });
    raf(time: number): void;
    destroy(): void;
  }
}
