/**
 * Configuration file storing measured coordinates on `public/images/mainapagebg.png` (1672 x 941).
 * All u, v coordinates are normalized (0..1) across width and height.
 */

export interface NormalizedCoordinate {
  u: number; // 0..1 across image width
  v: number; // 0..1 across image height
}

export interface SpriteCoordinate extends NormalizedCoordinate {
  id: string;
  radius: number; // base pixel radius at natural scale
  intensity: number; // opacity multiplier (0..1)
}

export interface HotspotPin extends NormalizedCoordinate {
  id: string;
  label: string;
  text: string;
}

export interface HeroCoordinatesConfig {
  naturalDimensions: {
    width: number;
    height: number;
  };
  hub: NormalizedCoordinate & {
    pixelX: number;
    pixelY: number;
  };
  blackoutCluster: NormalizedCoordinate;
  blackoutSprites: SpriteCoordinate[];
  hotspots: HotspotPin[];
  netThreads: NormalizedCoordinate[];
}

export const HERO_COORDINATES: HeroCoordinatesConfig = {
  naturalDimensions: {
    width: 1182,
    height: 1330,
  },
  hub: {
    u: 760 / 1182,
    v: 790 / 1330,
    pixelX: 760,
    pixelY: 790,
  },
  blackoutCluster: {
    u: 0.480,
    v: 0.56718,
  },
  blackoutSprites: [
    {
      id: "blackout-sprite-1",
      u: 0.462,
      v: 0.56345,
      radius: 75,
      intensity: 0.50,
    },
    {
      id: "blackout-sprite-2",
      u: 0.505,
      v: 0.54853,
      radius: 85,
      intensity: 0.50,
    },
    {
      id: "blackout-sprite-3",
      u: 0.550,
      v: 0.58211,
      radius: 65,
      intensity: 0.45,
    },
  ],
  hotspots: [
    {
      id: "datacenter",
      u: 1126.6 / 1672, // 0.6738
      v: 677.8 / 1261,  // 0.53751
      label: "Data center",
      text: "Where the data lives. The net starts here.",
    },
    {
      id: "hospital",
      u: 0.585,
      v: 0.51644,
      label: "Hospital",
      text: "Patient records and scheduling run on data.",
    },
    {
      id: "port",
      u: 0.825,
      v: 0.5336,
      label: "Port crane",
      text: "Every container is tracked in data.",
    },
    {
      id: "blackout",
      u: 0.480,
      v: 0.56718,
      label: "Blackout cluster",
      text: "Outside the net, a failure leaves them dark.",
    },
  ],
  netThreads: [
    { u: 0.380, v: 0.52241 },
    { u: 0.445, v: 0.50749 },
    { u: 0.540, v: 0.52614 },
    { u: 0.585, v: 0.51644 },
    { u: 0.610, v: 0.61569 },
    { u: 0.740, v: 0.5448 },
    { u: 0.825, v: 0.5336 },
    { u: 0.900, v: 0.58211 },
  ],
};
