// src/shared/events/interfaceEvents.ts

import { event } from "@/lib/gtag";

export const trackThemeChange = ({
  from_theme,
  to_theme,
  trigger_method = "manual",
  section = "interface",
}: {
  from_theme: "light" | "dark" | "system";
  to_theme: "light" | "dark" | "system";
  trigger_method?: "manual" | "system" | "auto";
  section?: string;
}): void => {
  console.log("[INTERFACE_EVENTS] Disparando trackThemeChange:", {
    from_theme,
    to_theme,
    trigger_method,
    section,
  });

  event("theme_changed", {
    from_theme,
    to_theme,
    trigger_method,
    section,
  });
};

export const trackLanguageChange = ({
  from_language,
  to_language,
  trigger_method = "manual",
  section = "interface",
}: {
  from_language: string;
  to_language: string;
  trigger_method?: "manual" | "auto" | "browser_detection";
  section?: string;
}): void => {
  console.log("[INTERFACE_EVENTS] Disparando trackLanguageChange:", {
    from_language,
    to_language,
    trigger_method,
    section,
  });

  event("language_changed", {
    from_language,
    to_language,
    trigger_method,
    section,
  });
};

export const trackMenuInteraction = ({
  menu_item,
  action_type,
  menu_section,
  section = "interface",
}: {
  menu_item: string;
  action_type: "click" | "hover" | "open" | "close" | "toggle";
  menu_section?: "main_menu" | "sidebar" | "dropdown" | "context_menu" | "mobile_menu";
  section?: string;
}): void => {
  console.log("[INTERFACE_EVENTS] Disparando trackMenuInteraction:", {
    menu_item,
    action_type,
    menu_section,
    section,
  });

  event("menu_interaction", {
    menu_item,
    action_type,
    menu_section,
    section,
  });
};

export const trackInterfaceToggle = ({
  toggle_type,
  toggle_state,
  element_name,
  section = "interface",
}: {
  toggle_type: "sidebar" | "panel" | "modal" | "dropdown" | "accordion";
  toggle_state: "open" | "close" | "expand" | "collapse";
  element_name: string;
  section?: string;
}): void => {
  console.log("[INTERFACE_EVENTS] Disparando trackInterfaceToggle:", {
    toggle_type,
    toggle_state,
    element_name,
    section,
  });

  event("interface_toggle", {
    toggle_type,
    toggle_state,
    element_name,
    section,
  });
};

export const trackSettingsChange = ({
  setting_name,
  setting_value,
  setting_category,
  section = "interface",
}: {
  setting_name: string;
  setting_value: string | number | boolean;
  setting_category?: "display" | "accessibility" | "performance" | "privacy";
  section?: string;
}): void => {
  console.log("[INTERFACE_EVENTS] Disparando trackSettingsChange:", {
    setting_name,
    setting_value,
    setting_category,
    section,
  });

  event("settings_changed", {
    setting_name,
    setting_value: setting_value.toString(),
    setting_category,
    section,
  });
};