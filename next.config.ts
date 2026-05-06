import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
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
};

export default nextConfig;
