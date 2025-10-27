"use client";

import { useEffect } from "react";
import { Workbox } from "workbox-window";

const SW_URL = "/sw.js";

const isProduction = process.env.NODE_ENV === "production";

export function ServiceWorkerManager() {
  useEffect(() => {
    if (!isProduction) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    if (!("serviceWorker" in navigator)) {
      return;
    }

    let workbox: Workbox | null = new Workbox(SW_URL, { scope: "/" });

    const register = async () => {
      try {
        workbox?.addEventListener("waiting", handleWaiting);
        workbox?.addEventListener("externalwaiting", handleWaiting);
        workbox?.addEventListener("controlling", handleControlling);
        await workbox?.register();
        if (workbox) {
          (window as typeof window & { __PWA_WORKBOX?: Workbox }).__PWA_WORKBOX = workbox;
        }
      } catch (error) {
        console.error("[PWA] Failed to register service worker", error);
      }
    };

    const handleControlling = () => {
      window.location.reload();
    };

    const handleWaiting = () => {
      if (!workbox) {
        return;
      }

      const shouldUpdate = window.confirm(
        "Uma nova versão do Mol Class está disponível. Deseja atualizar agora?"
      );

      if (shouldUpdate) {
        workbox
          .messageSkipWaiting()
          .catch((error) => console.error("[PWA] Failed to trigger skipWaiting", error));
      }

      cleanupListeners();
    };

    const cleanupListeners = () => {
      if (!workbox) {
        return;
      }

      workbox.removeEventListener("waiting", handleWaiting);
      workbox.removeEventListener("externalwaiting", handleWaiting);
      workbox.removeEventListener("controlling", handleControlling);
      workbox = null;
    };

    register();

    return () => {
      cleanupListeners();
    };
  }, []);

  return null;
}
