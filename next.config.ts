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
  }
};

export default withNextIntl(nextConfig);
