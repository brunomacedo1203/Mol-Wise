export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

const canSend = () =>
  typeof window !== "undefined" && typeof window.gtag === "function";

// Pageview
export const pageview = (url: string) => {
  if (canSend()) {
    window.gtag("config", GA_TRACKING_ID, { page_path: url });
  }
};

// Evento personalizado (GA4-style)
export type GAParams = Record<string, string | number | boolean | undefined>;

export const event = (name: string, params?: GAParams) => {
  if (canSend()) {
    window.gtag("event", name, params ?? {});
  }
};

// (Opcional) log de erro
export const exception = (description: string, fatal = false) => {
  event("exception", { description, fatal });
};
