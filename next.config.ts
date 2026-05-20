import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats — browser picks the best it supports
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 30 days (default is 60s)
    minimumCacheTTL: 2592000,
    // Device widths used to generate srcset variants
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Image sizes for fill/responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
