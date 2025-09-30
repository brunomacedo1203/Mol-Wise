// src/features/visualization/events/molecule2DEvents.ts
import { event } from "@/lib/gtag";

export const trackMolecule2DView = ({
  molecule_name,
  render_time,
  view_style = "default",
  success = true,
  section = "molecule_visualizer_2d",
}: {
  molecule_name: string;
  render_time?: number;
  view_style?: string;
  success?: boolean;
  section?: string;
}): void => {
  console.log("[MOLECULE_2D_EVENTS] Disparando trackMolecule2DView:", {
    molecule_name,
    render_time,
    view_style,
    success,
    section,
  });

  event("molecule_2d_view", {
    molecule_name,
    render_time,
    view_style,
    success,
    section,
  });
};

export const trackMolecule2DInteraction = ({
  molecule_name,
  interaction_type,
  interaction_value,
  section = "molecule_visualizer_2d",
}: {
  molecule_name: string;
  interaction_type: "zoom" | "pan" | "reset_view" | "double_click" | "wheel_zoom" | "style_change";
  interaction_value?: string | number;
  section?: string;
}): void => {
  console.log("[MOLECULE_2D_EVENTS] Disparando trackMolecule2DInteraction:", {
    molecule_name,
    interaction_type,
    interaction_value,
    section,
  });

  event("molecule_2d_interaction", {
    molecule_name,
    interaction_type,
    interaction_value,
    section,
  });
};

export const trackMolecule2DError = ({
  molecule_name,
  error_type,
  error_message,
  section = "molecule_visualizer_2d",
}: {
  molecule_name?: string;
  error_type: "render_failed" | "library_load_failed" | "data_invalid" | "svg_creation_failed";
  error_message: string;
  section?: string;
}): void => {
  console.log("[MOLECULE_2D_EVENTS] Disparando trackMolecule2DError:", {
    molecule_name,
    error_type,
    error_message,
    section,
  });

  event("molecule_2d_error", {
    molecule_name,
    error_type,
    error_message,
    section,
  });
};

export const trackMolecule2DLoad = ({
  molecule_name,
  load_time,
  data_source,
  success = true,
  section = "molecule_visualizer_2d",
}: {
  molecule_name: string;
  load_time?: number;
  data_source?: "smiles" | "sdf" | "molfile";
  success?: boolean;
  section?: string;
}): void => {
  console.log("[MOLECULE_2D_EVENTS] Disparando trackMolecule2DLoad:", {
    molecule_name,
    load_time,
    data_source,
    success,
    section,
  });

  event("molecule_2d_load", {
    molecule_name,
    load_time,
    data_source,
    success,
    section,
  });
};