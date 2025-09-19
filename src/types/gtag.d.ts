declare global {
  interface Window {
    dataLayer: unknown[];
    gtag(command: 'js', date: Date): void;
    gtag(command: 'config', targetId: string, params?: Gtag.ConfigParams): void;
    gtag(command: 'event', name: string, params?: Gtag.EventParams): void;
    clarity?: (command: string, ...args: unknown[]) => void;
  }
}

export namespace Gtag {
  export interface ConfigParams {
    page_path?: string;
    anonymize_ip?: boolean;
    cookie_flags?: string;
    send_page_view?: boolean;
    [key: string]: string | number | boolean | undefined;
  }

  export interface EventParams {
    event_category?: string;
    event_label?: string;
    value?: number;
    description?: string;
    fatal?: boolean;
    send_to?: string;
    // Campos customizados (ex.: search_term, section, etc.)
    [key: string]: string | number | boolean | undefined;
  }
}
