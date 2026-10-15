import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  getImageCoverMetrics,
  mapImageToContainer,
  mapContainerToImage,
  type Dimensions,
  type NormalizedPoint,
} from "../imageAnchor.ts";

describe("imageAnchor coordinate mapping", () => {
  const image: Dimensions = { width: 1672, height: 941 }; // ~1.777 aspect ratio

  describe("Wider-than aspect ratio (container wider than image)", () => {
    // 2560x1000 has aspect ratio 2.56 > 1.777
    const container: Dimensions = { width: 2560, height: 1000 };

    test("computes correct cover metrics", () => {
      const metrics = getImageCoverMetrics(container, image, { x: 0.5, y: 0.5 });
      assert.strictEqual(metrics.isWiderThanImage, true);
      assert.strictEqual(metrics.renderedWidth, 2560);
      const expectedScale = 2560 / 1672;
      assert.ok(Math.abs(metrics.scale - expectedScale) < 1e-6);
      const expectedHeight = 941 * expectedScale;
      assert.ok(Math.abs(metrics.renderedHeight - expectedHeight) < 1e-6);
      assert.strictEqual(metrics.offsetX, 0);
      // Overflow is vertically centered: (1000 - expectedHeight) * 0.5 < 0
      const expectedOffsetY = (1000 - expectedHeight) * 0.5;
      assert.ok(Math.abs(metrics.offsetY - expectedOffsetY) < 1e-6);
    });

    test("maps center point (0.5, 0.5) to container center", () => {
      const pt: NormalizedPoint = { u: 0.5, v: 0.5 };
      const pixel = mapImageToContainer(pt, container, image, { x: 0.5, y: 0.5 });
      assert.ok(Math.abs(pixel.x - 1280) < 1e-4);
      assert.ok(Math.abs(pixel.y - 500) < 1e-4);
    });

    test("round-trips coordinates accurately", () => {
      const original: NormalizedPoint = { u: 0.6738, v: 0.3802 }; // Hub position
      const pixel = mapImageToContainer(original, container, image, { x: 0.5, y: 0.5 });
      const mappedBack = mapContainerToImage(pixel, container, image, { x: 0.5, y: 0.5 });
      assert.ok(Math.abs(mappedBack.u - original.u) < 1e-5);
      assert.ok(Math.abs(mappedBack.v - original.v) < 1e-5);
    });
  });

  describe("Taller-than aspect ratio (container taller than image)", () => {
    // 1000x1200 has aspect ratio 0.833 < 1.777
    const container: Dimensions = { width: 1000, height: 1200 };

    test("computes correct cover metrics", () => {
      const metrics = getImageCoverMetrics(container, image, { x: 0.5, y: 0.5 });
      assert.strictEqual(metrics.isWiderThanImage, false);
      assert.strictEqual(metrics.renderedHeight, 1200);
      const expectedScale = 1200 / 941;
      assert.ok(Math.abs(metrics.scale - expectedScale) < 1e-6);
      const expectedWidth = 1672 * expectedScale;
      assert.ok(Math.abs(metrics.renderedWidth - expectedWidth) < 1e-6);
      assert.strictEqual(metrics.offsetY, 0);
      // Overflow is horizontally centered
      const expectedOffsetX = (1000 - expectedWidth) * 0.5;
      assert.ok(Math.abs(metrics.offsetX - expectedOffsetX) < 1e-6);
    });

    test("maps center point (0.5, 0.5) to container center", () => {
      const pt: NormalizedPoint = { u: 0.5, v: 0.5 };
      const pixel = mapImageToContainer(pt, container, image, { x: 0.5, y: 0.5 });
      assert.ok(Math.abs(pixel.x - 500) < 1e-4);
      assert.ok(Math.abs(pixel.y - 600) < 1e-4);
    });

    test("handles custom object-position (e.g. right-bottom)", () => {
      const pt: NormalizedPoint = { u: 1.0, v: 1.0 };
      const pixel = mapImageToContainer(pt, container, image, { x: 1.0, y: 1.0 });
      // When object-position is right-bottom (1, 1), the right edge of image aligns with container width
      assert.ok(Math.abs(pixel.x - 1000) < 1e-4);
      assert.ok(Math.abs(pixel.y - 1200) < 1e-4);
    });
  });

  describe("Degenerate and zero dimension safeguards", () => {
    test("handles zero dimensions safely without throwing", () => {
      const metrics = getImageCoverMetrics({ width: 0, height: 0 }, image);
      assert.strictEqual(metrics.renderedWidth, 0);
      assert.strictEqual(metrics.renderedHeight, 0);
    });
  });
});
