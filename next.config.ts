import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [75, 92],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/support",
        destination: "/company/contact",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/company/contact",
        permanent: true,
      },
      {
        source: "/legal/privacy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/whitepaper/cyber-resilience-architecture",
        destination: "/downloads/meshdefend-enterprise-onepager.pdf",
        permanent: false,
      },
      {
        source: "/resources/blogs",
        destination: "/resources/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
