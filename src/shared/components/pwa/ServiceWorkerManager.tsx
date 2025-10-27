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
    let waitingListener: (() => void) | undefined;

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

      waitingListener?.();
    };

    register();

    waitingListener = () => {
      if (!workbox) {
        return;
      }

      workbox.removeEventListener("waiting", handleWaiting);
      workbox.removeEventListener("externalwaiting", handleWaiting);
      workbox.removeEventListener("controlling", handleControlling);
      workbox = null;
    };

    return () => {
      waitingListener?.();
    };
  }, []);

  return null;
}
