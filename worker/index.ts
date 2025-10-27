/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope & {
  __WB_DISABLE_DEV_LOGS?: boolean;
};

self.__WB_DISABLE_DEV_LOGS = true;

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting().catch((error) => {
      console.error("[PWA] Failed to skip waiting service worker", error);
    });
  }
});

export {};
