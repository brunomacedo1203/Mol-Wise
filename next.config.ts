// next.config.ts
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack(config) {
    config.experiments = config.experiments || {};
    config.experiments.asyncWebAssembly = true;
    return config;
  },

  // 🔹 Adicione isto:
  i18n: {
    locales: ["pt", "en"],
    defaultLocale: "pt",
    
    
  },
};

export default withNextIntl(nextConfig);
