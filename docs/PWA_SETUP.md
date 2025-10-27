# Progressive Web App Setup

Mol Class now ships with a production-ready PWA stack powered by Next.js 15 and next-pwa. Use this guide to understand the moving pieces, local verification steps, and how to maintain the configuration.

## Key Files

- `next.config.ts` – wraps the Next config with `next-pwa`, runtime caching rules, and offline fallbacks.
- `public/manifest.webmanifest` – app metadata, color palette, and icon declarations.
- `public/icons/` – generated icon set (`192`, `512`, and maskable variants).
- `worker/index.ts` – custom Workbox hooks (e.g., `skipWaiting` handling and log suppression).
- `src/shared/components/pwa/ServiceWorkerManager.tsx` – client component that registers the worker, prompts for updates, and reloads when the new version takes control.
- `src/app/[locale]/offline/page.tsx` – offline fallback page served when navigation fails without network.
- `config/pwaRuntimeCaching.ts` – Workbox runtime caching recipes for static assets, API calls, images, and external CDNs.

## Local Verification Checklist

1. Build the production bundle (service worker only exists in prod):
   ```bash
   pnpm build && pnpm start
   ```
2. Visit `http://localhost:3000`, open DevTools → Application → Service Workers, and confirm the worker is registered.
3. Check the **Manifest** panel for installability warnings; icons and theme colors should match the manifest entries.
4. Switch Chrome to **Offline** (Application → Service Workers → Offline) and reload to see `/offline`.
5. Trigger an update flow by editing any client file, rebuilding, and observing the “Nova versão disponível…” confirm dialog; accepting it should refresh the app.

## Maintenance Tips

- **Icons** – regenerate with `pnpm dlx sharp-cli` if the brand asset changes:
  ```bash
  mkdir -p public/icons
  pnpm dlx sharp-cli -i public/favicon.png -o public/icons/pwa-512.png resize 512 512
  pnpm dlx sharp-cli -i public/favicon.png -o public/icons/pwa-192.png resize 192 192
  pnpm dlx sharp-cli -i public/favicon.png -o public/icons/pwa-maskable-512.png resize 384 384 --fit contain --background 'rgba(0,0,0,0)'
  pnpm dlx sharp-cli -i public/icons/pwa-maskable-512.png -o public/icons/pwa-maskable-512.png extend 64 64 64 64 --background 'rgba(0,0,0,0)'
  ```
- **Runtime caching** – update `config/pwaRuntimeCaching.ts` when new remote APIs, CDNs, or assets require tailored strategies.
- **Offline copy** – adjust `src/app/[locale]/offline/page.tsx` to support additional locales or richer UX.
- **Testing** – run targeted linting before shipping PWA changes:
  ```bash
  pnpm exec next lint --fix --file src/shared/components/pwa/ServiceWorkerManager.tsx
  ```
- **Cache resets** – to force an update in the field, bump any asset filename (e.g., add a query param to `manifest.webmanifest` or change the worker logic) and inform users to accept the in-app reload prompt.

## Deployment Notes

- Service worker registration is disabled in development, so `pnpm dev` behaves as before.
- The Workbox-generated bundles (`sw.js`, `workbox-*.js`) are emitted to `public/` during `pnpm build` and served statically in production.
- Every deployment should include a quick Lighthouse run (PWA category) to validate installability and offline coverage. Automate via GitHub Action or a manual `pnpm exec lighthouse http://localhost:3000 --view --only-categories=pwa`.

