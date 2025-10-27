import type { RuntimeCaching } from "workbox-build";

const runtimeCaching: RuntimeCaching[] = [
  // 🚫 Evita interceptar o Microsoft Clarity (telemetria)
  {
    urlPattern: /^https:\/\/www\.clarity\.ms\/.*/i,
    handler: "NetworkOnly",
    options: {
      cacheName: "clarity-tracking",
    },
  },

  // 🚫 Ignora URLs internas do Next.js (evita erro 404 de app-build-manifest.json)
  {
    urlPattern: /^https:\/\/(www\.)?molclass\.com\/_next\/.*/i,
    handler: "NetworkOnly",
    options: {
      cacheName: "next-internal-cache",
    },
  },

  // ⚙️ Assets estáticos gerados pelo Next.js (JS, CSS, etc.)
  {
    urlPattern: ({ url }) => url.pathname.startsWith("/_next/static/"),
    handler: "CacheFirst",
    options: {
      cacheName: "static-assets",
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      },
      cacheableResponse: { statuses: [200] },
    },
  },

  // Scripts e estilos externos
  {
    urlPattern: ({ request }) =>
      request.destination === "style" || request.destination === "script",
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-resources",
      cacheableResponse: { statuses: [200] },
    },
  },

  // Imagens otimizadas pelo Next.js
  {
    urlPattern: ({ url }) => url.pathname.startsWith("/_next/image"),
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "next-image",
      expiration: {
        maxEntries: 60,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
      },
      cacheableResponse: { statuses: [200] },
    },
  },

  // Imagens do site
  {
    urlPattern: ({ request }) => request.destination === "image",
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "image-assets",
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
      },
      cacheableResponse: { statuses: [200] },
    },
  },

  // Google Fonts
  {
    urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
    handler: "CacheFirst",
    options: {
      cacheName: "google-fonts",
      expiration: {
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      },
      cacheableResponse: { statuses: [0, 200] },
    },
  },

  // Bibliotecas CDN
  {
    urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/3Dmol\/.*/i,
    handler: "CacheFirst",
    options: {
      cacheName: "cdn-libraries",
      expiration: {
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      },
      cacheableResponse: { statuses: [0, 200] },
    },
  },

  // Dados de páginas renderizadas pelo Next.js
  {
    urlPattern: ({ url }) => url.pathname.startsWith("/_next/data/"),
    handler: "NetworkFirst",
    options: {
      cacheName: "next-data",
      networkTimeoutSeconds: 10,
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 60 * 60 * 24, // 24 hours
      },
      cacheableResponse: { statuses: [200] },
    },
  },

  // API endpoints
  {
    urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
    handler: "NetworkFirst",
    method: "GET",
    options: {
      cacheName: "api-responses",
      networkTimeoutSeconds: 10,
      expiration: {
        maxEntries: 30,
        maxAgeSeconds: 60 * 5, // 5 minutes
      },
      cacheableResponse: { statuses: [200] },
    },
  },

  // Páginas (modo offline)
  {
    urlPattern: ({ request }) => request.mode === "navigate",
    handler: "NetworkFirst",
    options: {
      cacheName: "pages",
      networkTimeoutSeconds: 10,
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 60 * 60 * 24, // 24 hours
      },
      cacheableResponse: { statuses: [200] },
    },
  },
];

export default runtimeCaching;
