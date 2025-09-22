// src/features/visualization/events/molecule3DEvents.ts
import { event } from "@/lib/gtag";

export const trackMolecule3DView = ({
  molecule_name,
  render_time,
  view_style = "default",
  success = true,
  section = "molecule_visualizer_3d",
}: {
  molecule_name: string;
  render_time?: number;
  view_style?: string;
  success?: boolean;
  section?: string;
}): void => {
  console.log("[MOLECULE_3D_EVENTS] Disparando trackMolecule3DView:", {
    molecule_name,
    render_time,
    view_style,
    success,
    section,
  });

  event("molecule_3d_view", {
    molecule_name,
    render_time,
    view_style,
    success,
    section,
  });
};

export const trackMolecule3DInteraction = ({
  molecule_name,
  interaction_type,
  interaction_value,
  section = "molecule_visualizer_3d",
}: {
  molecule_name: string;
  interaction_type: "zoom" | "rotate" | "style_change" | "reset_view";
  interaction_value?: string | number;
  section?: string;
}): void => {
  console.log("[MOLECULE_3D_EVENTS] Disparando trackMolecule3DInteraction:", {
    molecule_name,
    interaction_type,
    interaction_value,
    section,
  });

  event("molecule_3d_interaction", {
    molecule_name,
    interaction_type,
    interaction_value,
    section,
  });
};

export const trackMolecule3DError = ({
  molecule_name,
  error_type,
  error_message,
  section = "molecule_visualizer_3d",
}: {
  molecule_name?: string;
  error_type: "render_failed" | "library_load_failed" | "data_invalid";
  error_message: string;
  section?: string;
}): void => {
  console.log("[MOLECULE_3D_EVENTS] Disparando trackMolecule3DError:", {
    molecule_name,
    error_type,
    error_message,
    section,
  });

  event("molecule_3d_error", {
    molecule_name,
    error_type,
    error_message,
    section,
  });
};