import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Configuração para servir arquivos WASM
  async headers() {
    return [
      {
        source: '/(.*)\.wasm',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/wasm',
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.experiments = config.experiments || {};
    config.experiments.asyncWebAssembly = true;
    config.experiments.syncWebAssembly = true;
    
    // Configuração específica para OpenChemLib
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    
    // Configuração para arquivos WASM
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });
    
    return config;
  }
};

export default withNextIntl(nextConfig);
