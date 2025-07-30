// src/lib/gtag.ts

export const GA_TRACKING_ID = "G-P4NHF7L5NV";

// Verifica se o gtag está disponível
const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

// Função para inicializar o Google Analytics
export const initializeGA = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date().toISOString());
    window.gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
    });
  }
};

// Função para enviar pageviews
export const pageview = (url: string) => {
  if (isGtagAvailable()) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Função para enviar eventos personalizados
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  if (isGtagAvailable()) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Função para enviar eventos de conversão
export const conversion = (conversionId: string, conversionLabel: string) => {
  if (isGtagAvailable()) {
    window.gtag("event", "conversion", {
      send_to: `${GA_TRACKING_ID}/${conversionId}/${conversionLabel}`,
    });
  }
};

// Função para enviar eventos de exceção
export const exception = (description: string, fatal: boolean = false) => {
  if (isGtagAvailable()) {
    window.gtag("event", "exception", {
      description: description,
      fatal: fatal,
    });
  }
};
