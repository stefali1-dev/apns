import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [], // Add external domains if needed
    minimumCacheTTL: 60,
    // Vercel-optimized settings
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Enable image optimization for better performance
    unoptimized: false, // Ensure optimization is enabled
    // Set reasonable limits for Vercel
    remotePatterns: [
      // Add any external image domains here if needed
    ],
  },
};

export default nextConfig;
