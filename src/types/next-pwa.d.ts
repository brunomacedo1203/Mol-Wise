declare module 'next-pwa' {
  // Minimal typings to satisfy Next 15 usage in this repo
  export type NextConfig = import('next').NextConfig;

  export interface NextPWAOptions {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    clientsClaim?: boolean;
    customWorkerDir?: string;
    scope?: string;
    sw?: string;
    cacheStartUrl?: boolean;
    dynamicStartUrl?: boolean;
    dynamicStartUrlRedirect?: string;
    cleanupOutdatedCaches?: boolean;
    publicExcludes?: string[];
    buildExcludes?: Array<string | RegExp>;
    fallbacks?: {
      document?: string;
      image?: string;
      audio?: string;
      video?: string;
      font?: string;
    };
    runtimeCaching?: unknown;
    importScripts?: string[];
  }

  // Returns a Next.js plugin wrapper
  export default function withPWA(
    options?: NextPWAOptions
  ): (nextConfig?: NextConfig) => NextConfig;
}

