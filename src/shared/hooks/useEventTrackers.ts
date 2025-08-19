import { event } from "@/lib/gtag";

export function useEventTrackers() {
  const trackSearch = ({
    search_term,
    section,
    result_count,
  }: {
    search_term: string;
    section?: string;
    result_count?: number;
  }) =>
    event("search_element", {
      search_term,
      section,
      result_count,
    });

  const trackElementSearch = ({
    search_term,
    section = "periodic_table",
  }: {
    search_term: string;
    section?: string;
  }) =>
    event("search_element", {
      search_term,
      section,
    });

  const trackCalculation = ({
    calculator_type,
    input_formula,
    result_value,
  }: {
    calculator_type: "molar_mass" | "scientific";
    input_formula?: string;
    result_value?: number;
  }) =>
    event("calculation_performed", {
      calculator_type,
      input_formula,
      result_value,
    });

  const trackModeSwitch = ({
    from_mode,
    to_mode,
  }: {
    from_mode: "2D" | "3D";
    to_mode: "2D" | "3D";
  }) =>
    event("mode_switch", {
      from_mode,
      to_mode,
    });

  return {
    trackSearch,
    trackElementSearch, // ✅ novo
    trackCalculation,
    trackModeSwitch,
  };
}
