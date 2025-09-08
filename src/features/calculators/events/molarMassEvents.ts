// src/features/calculators/events/molarMassEvents.ts

import { event } from "@/lib/gtag";

export const trackMolarMassCalculation = ({
  formula_input,
  result_value,
  success = true,
  error_type,
  section = "calculators",
}: {
  formula_input: string;
  result_value?: string | number;
  success?: boolean;
  error_type?: string;
  section?: string;
}): void => {
  console.log("[MOLAR_MASS_EVENTS] Disparando trackMolarMassCalculation:", {
    formula_input,
    result_value,
    success,
    error_type,
    section,
  });

  event("calculation_performed", {
    calculator_type: "molar_mass",
    formula_input,
    result_value: result_value?.toString(),
    success,
    error_type,
    section,
  });
};

export const trackMolarMassReset = ({
  section = "calculators",
}: {
  section?: string;
}): void => {
  console.log("[MOLAR_MASS_EVENTS] Disparando trackMolarMassReset:", {
    section,
  });

  event("calculator_reset", {
    calculator_type: "molar_mass",
    section,
  });
};

export const trackMolarMassFormulaChange = ({
  formula_input,
  section = "calculators",
}: {
  formula_input: string;
  section?: string;
}): void => {
  console.log("[MOLAR_MASS_EVENTS] Disparando trackMolarMassFormulaChange:", {
    formula_input,
    section,
  });

  event("formula_input_changed", {
    calculator_type: "molar_mass",
    formula_input,
    section,
  });
};
