import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer"; 
import withPWAInit from "next-pwa";
import runtimeCaching from "./config/pwaRuntimeCaching";

// ⚙️ Ativa o bundle analyzer se a variável de ambiente ANALYZE=true
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin();

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: false,
  skipWaiting: false,
  clientsClaim: true,
  customWorkerDir: "worker",
  fallbacks: {
    document: "/offline",
  },
  runtimeCaching,
});

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  trailingSlash: false,
  // ✅ Otimizações de CSS para evitar warnings de preload
  experimental: {
    optimizeCss: true,
    cssChunking: 'strict',
  },
  async headers() {
    return [
      {
        source: "/(.*)\\.wasm",
        headers: [
          {
            key: "Content-Type",
            value: "application/wasm",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.experiments = config.experiments || {};
    config.experiments.asyncWebAssembly = true;
    config.experiments.syncWebAssembly = true;

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };

    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/async",
    });

    return config;
  },
};

// Composição dos plugins: bundle analyzer + next-intl + PWA
export default withPWA(withAnalyzer(withNextIntl(nextConfig)));
