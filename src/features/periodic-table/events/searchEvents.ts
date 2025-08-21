// src/features/periodic-table/events/searchEvents.ts

import { event } from "@/lib/gtag";

export const trackElementSearch = ({
  search_term,
  section = "periodic_table",
}: {
  search_term: string;
  section?: string;
}): void => {
  console.log("[SEARCH_EVENTS] Disparando trackElementSearch:", {
    search_term,
    section,
  });

  event("search_element", {
    search_term,
    section,
  });
};
