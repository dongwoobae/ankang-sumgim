import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ["image/webp"],
    qualities: [75],
    minimumCacheTTL: 2678400,
    deviceSizes: [360, 640, 828, 1080, 1200, 1920],
    imageSizes: [40, 80, 120, 240, 400],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-b7ac63154d17462da44c76addda6b6be.r2.dev",
      },
      {
        protocol: "https",
        hostname: "nglnaobzmjixtookuwcl.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb", // 원본 이미지 최대 크기에 맞게 설정
    },
  },
  async redirects() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'ankang-sumgim.vercel.app' }],
      destination: 'https://sumgim-welfare.com/:path*',
      permanent: true,
    },
  ]
}
};

export default nextConfig;
