/**
 * Utility for mapping coordinates between an image rendered with CSS `object-fit: cover`
 * and its bounding container.
 */

export interface Dimensions {
  width: number;
  height: number;
}

export interface NormalizedPoint {
  u: number; // 0 to 1 across the image width
  v: number; // 0 to 1 across the image height
}

export interface PixelPoint {
  x: number; // Pixels from container left
  y: number; // Pixels from container top
}

export interface ObjectPosition {
  x: number; // 0 (left) to 1 (right), default 0.5 (center)
  y: number; // 0 (top) to 1 (bottom), default 0.5 (center)
}

export interface ImageAnchorMetrics {
  scale: number;
  renderedWidth: number;
  renderedHeight: number;
  offsetX: number;
  offsetY: number;
  isWiderThanImage: boolean;
}

/**
 * Calculates the rendered dimensions and container offsets for an image
 * styled with `object-fit: cover`.
 */
export function getImageCoverMetrics(
  container: Dimensions,
  image: Dimensions,
  objectPosition: ObjectPosition = { x: 0.5, y: 0.5 }
): ImageAnchorMetrics {
  if (container.width <= 0 || container.height <= 0 || image.width <= 0 || image.height <= 0) {
    return {
      scale: 1,
      renderedWidth: 0,
      renderedHeight: 0,
      offsetX: 0,
      offsetY: 0,
      isWiderThanImage: false,
    };
  }

  const containerAspect = container.width / container.height;
  const imageAspect = image.width / image.height;

  let scale: number;
  let renderedWidth: number;
  let renderedHeight: number;
  let offsetX: number;
  let offsetY: number;
  const isWiderThanImage = containerAspect > imageAspect;

  if (isWiderThanImage) {
    // Container is wider than the image aspect ratio:
    // Image scales to fit container width, overflowing top/bottom.
    scale = container.width / image.width;
    renderedWidth = container.width;
    renderedHeight = image.height * scale;
    offsetX = 0;
    offsetY = (container.height - renderedHeight) * objectPosition.y;
  } else {
    // Container is taller (or equal) to image aspect ratio:
    // Image scales to fit container height, overflowing left/right.
    scale = container.height / image.height;
    renderedHeight = container.height;
    renderedWidth = image.width * scale;
    offsetX = (container.width - renderedWidth) * objectPosition.x;
    offsetY = 0;
  }

  return {
    scale,
    renderedWidth,
    renderedHeight,
    offsetX,
    offsetY,
    isWiderThanImage,
  };
}

/**
 * Maps a normalized point (u, v) on the original image into container pixel coordinates (x, y).
 */
export function mapImageToContainer(
  point: NormalizedPoint,
  container: Dimensions,
  image: Dimensions,
  objectPosition: ObjectPosition = { x: 0.5, y: 0.5 }
): PixelPoint {
  const metrics = getImageCoverMetrics(container, image, objectPosition);
  return {
    x: metrics.offsetX + point.u * metrics.renderedWidth,
    y: metrics.offsetY + point.v * metrics.renderedHeight,
  };
}

/**
 * Maps a container pixel coordinate (x, y) back to normalized image coordinates (u, v).
 */
export function mapContainerToImage(
  pixel: PixelPoint,
  container: Dimensions,
  image: Dimensions,
  objectPosition: ObjectPosition = { x: 0.5, y: 0.5 }
): NormalizedPoint {
  const metrics = getImageCoverMetrics(container, image, objectPosition);
  if (metrics.renderedWidth <= 0 || metrics.renderedHeight <= 0) {
    return { u: 0, v: 0 };
  }
  return {
    u: (pixel.x - metrics.offsetX) / metrics.renderedWidth,
    v: (pixel.y - metrics.offsetY) / metrics.renderedHeight,
  };
}
