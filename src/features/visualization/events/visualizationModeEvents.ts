// src/features/visualization/events/visualizationModeEvents.ts
import { event } from "@/lib/gtag";

export const trackVisualizationModeChange = ({
  from_mode,
  to_mode,
  molecule_loaded = false,
  section = "molecule_visualizer",
}: {
  from_mode: "2D" | "3D";
  to_mode: "2D" | "3D";
  molecule_loaded?: boolean;
  section?: string;
}): void => {
  console.log("[VISUALIZATION_MODE_EVENTS] Disparando trackVisualizationModeChange:", {
    from_mode,
    to_mode,
    molecule_loaded,
    section,
  });

  event("visualization_mode_change", {
    from_mode,
    to_mode,
    molecule_loaded,
    section,
  });
};

export const trackVisualizationLoad = ({
  view_mode,
  molecule_name,
  load_time,
  success = true,
  section = "molecule_visualizer",
}: {
  view_mode: "2D" | "3D";
  molecule_name?: string;
  load_time?: number;
  success?: boolean;
  section?: string;
}): void => {
  console.log("[VISUALIZATION_MODE_EVENTS] Disparando trackVisualizationLoad:", {
    view_mode,
    molecule_name,
    load_time,
    success,
    section,
  });

  event("visualization_load", {
    view_mode,
    molecule_name,
    load_time,
    success,
    section,
  });
};