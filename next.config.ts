import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Netlify에서 이미지 최적화 비활성화
  images: {
    unoptimized: true,
  },

  // 에셋 경로 설정
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : undefined,

  // 실험적 기능 비활성화 (안정성 향상)
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;