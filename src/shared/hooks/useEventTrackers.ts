import { event } from "@/lib/gtag";
import {
  trackThemeChange,
  trackLanguageChange,
  trackMenuInteraction,
  trackInterfaceToggle,
  trackSettingsChange,
} from "@/shared/events/interfaceEvents";

export function useEventTrackers() {
  const trackSearch = ({
    search_term,
    section,
    result_count,
  }: {
    search_term: string;
    section?: string;
    result_count?: number;
  }) => {
    event("search_element", { search_term, section, result_count });
    // Alternativa recomendada do GA4:
    // event("search", { search_term });
  };

  const trackElementSearch = ({
    symbol,
    name,
    atomic_number,
    section = "periodic_table",
  }: {
    symbol?: string;
    name?: string;
    atomic_number?: number;
    section?: string;
  }) => {
    // Evento custom:
    event("search_element", { symbol, name, atomic_number, section });
    // Opcionalmente alinhar com "select_item":
    // event("select_item", { item_id: symbol ?? String(atomic_number), item_name: name, item_category: section });
  };

  const trackCalculation = ({
    calculator,
    expression,
    result,
  }: {
    calculator: string;
    expression: string;
    result: string | number;
  }) => {
    event("calculation_performed", { calculator, expression, result });
  };

  const trackModeSwitch = ({
    from_mode,
    to_mode,
  }: {
    from_mode: "2D" | "3D";
    to_mode: "2D" | "3D";
  }) => {
    event("mode_switch", { from_mode, to_mode });
  };

  return {
    trackSearch,
    trackElementSearch,
    trackCalculation,
    trackModeSwitch,
    // Interface events
    trackThemeChange,
    trackLanguageChange,
    trackMenuInteraction,
    trackInterfaceToggle,
    trackSettingsChange,
  };
}

