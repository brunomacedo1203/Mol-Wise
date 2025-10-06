// src/features/visualization/events/moleculeSearchEvents.ts

import { event } from "@/lib/gtag";

export const trackMoleculeSearch = ({
  search_term,
  section = "molecule_visualizer",
  search_type,
  success = false,
}: {
  search_term: string;
  section?: string;
  search_type?: "name" | "formula" | "smiles" | "cid" | "unknown";
  success?: boolean;
}): void => {
  // Removido console.log para limpar o console
  event("search", {
    search_term,
    section,
    search_type,
    success,
  });
};
