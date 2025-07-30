declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: {
        page_path?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        anonymize_ip?: boolean;
        cookie_flags?: string;
        description?: string;
        fatal?: boolean;
        send_to?: string;
        [key: string]: string | number | boolean | undefined;
      }
    ) => void;
    dataLayer: unknown[];
  }
}

export {}; 