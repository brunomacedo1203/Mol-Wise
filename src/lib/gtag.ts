import type { Gtag } from '../types/gtag';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

const enabled = typeof window !== "undefined" && !!GA_TRACKING_ID;

const hasGtag = () =>
  typeof window !== "undefined" && typeof window.gtag === "function";

const canSend = () => enabled && hasGtag();

export const pageview = (url: string) => {
  if (!canSend()) return;
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = (name: string, params: Gtag.EventParams = {}) => {
  if (!canSend()) return;

  const payload = {
    ...params,
    send_to: GA_TRACKING_ID,
    debug_mode: process.env.NODE_ENV !== "production",
  };

  // 🔍 Log útil apenas em desenvolvimento
  if (process.env.NODE_ENV !== "production") {
    console.log("[GA EVENT]", name, payload);
  }

  window.gtag("event", name, payload);
};

export const exception = ({
  description,
  fatal,
}: {
  description?: string;
  fatal?: boolean;
}) => {
  event("exception", { description, fatal });
};
