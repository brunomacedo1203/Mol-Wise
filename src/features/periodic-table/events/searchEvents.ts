// features/periodic-table/events/searchEvents.ts
export const trackElementSearch = (elementName: string): void => {
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as Window & typeof globalThis & { gtag?: (...args: unknown[]) => void }).gtag?.(
        "event",
        "search_element",
        {
          event_category: "Periodic Table",
          event_label: elementName,
        }
      );
    }
  };
  