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

    let workbox: Workbox | null = null;

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

      if (!shouldUpdate) {
        return;
      }

      try {
        workbox.messageSkipWaiting();
      } catch (error: unknown) {
        console.error("[PWA] Failed to trigger skipWaiting", error);
      }
    };

    const register = async () => {
      try {
        workbox = new Workbox(SW_URL, { scope: "/" });
        workbox.addEventListener("waiting", handleWaiting);
        workbox.addEventListener("controlling", handleControlling);
        await workbox.register();
        (window as typeof window & { __PWA_WORKBOX?: Workbox }).__PWA_WORKBOX = workbox;
      } catch (error: unknown) {
        console.error("[PWA] Failed to register service worker", error);
      }
    };

    const cleanupListeners = () => {
      if (!workbox) {
        return;
      }

      workbox.removeEventListener("waiting", handleWaiting);
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
