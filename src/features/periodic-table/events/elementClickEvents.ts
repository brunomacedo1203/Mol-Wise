// src/features/periodic-table/events/elementClickEvents.ts

import { event } from "@/lib/gtag";

export const trackElementClick = ({
  element_symbol,
  element_name,
  atomic_number,
  element_category,
  action_type = "click",
  section = "periodic_table",
}: {
  element_symbol: string;
  element_name: string;
  atomic_number: number;
  element_category: string;
  action_type?: "click" | "hover" | "focus";
  section?: string;
}): void => {
  console.log("[ELEMENT_CLICK_EVENTS] Disparando trackElementClick:", {
    element_symbol,
    element_name,
    atomic_number,
    element_category,
    action_type,
    section,
  });

  event("element_interaction", {
    element_symbol,
    element_name,
    atomic_number,
    element_category,
    action_type,
    section,
  });
};