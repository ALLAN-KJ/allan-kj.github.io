import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: ["10.2.5.79", "192.168.29.112", "192.168.1.9", "10.244.8.236"],
};

export default nextConfig;
