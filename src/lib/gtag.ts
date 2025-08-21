
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

export const event = (name: string, params?: Gtag.EventParams) => {
  if (!canSend()) return;
  window.gtag("event", name, params);
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
