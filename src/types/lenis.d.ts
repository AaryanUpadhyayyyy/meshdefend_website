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
    scrollTo(
      target: number | string | HTMLElement,
      options?: {
        immediate?: boolean;
        force?: boolean;
        lock?: boolean;
        duration?: number;
        offset?: number;
      }
    ): void;
    resize(): void;
    on(event: string, callback: (...args: any[]) => void): void;
    off(event: string, callback: (...args: any[]) => void): void;
    scroll: number;
    limit: number;
  }
}
