// src/features/calculators/events/scientificEvents.ts

import { event } from "@/lib/gtag";

export const trackScientificCalculation = ({
  expression,
  result_value,
  success = true,
  error_type,
  section = "calculators",
}: {
  expression: string;
  result_value?: string | number;
  success?: boolean;
  error_type?: string;
  section?: string;
}): void => {
  console.log("[SCIENTIFIC_EVENTS] Disparando trackScientificCalculation:", {
    expression,
    result_value,
    success,
    error_type,
    section,
  });

  event("calculation_performed", {
    calculator_type: "scientific",
    expression,
    result_value: result_value?.toString(),
    success,
    error_type,
    section,
  });
};

export const trackScientificReset = ({
  section = "calculators",
}: {
  section?: string;
}): void => {
  console.log("[SCIENTIFIC_EVENTS] Disparando trackScientificReset:", {
    section,
  });

  event("calculator_reset", {
    calculator_type: "scientific",
    section,
  });
};

export const trackScientificFunction = ({
  function_name,
  section = "calculators",
}: {
  function_name: string;
  section?: string;
}): void => {
  console.log("[SCIENTIFIC_EVENTS] Disparando trackScientificFunction:", {
    function_name,
    section,
  });

  event("function_used", {
    calculator_type: "scientific",
    function_name,
    section,
  });
};

export const trackScientificMemory = ({
  memory_action,
  section = "calculators",
}: {
  memory_action: "store" | "recall" | "clear";
  section?: string;
}): void => {
  console.log("[SCIENTIFIC_EVENTS] Disparando trackScientificMemory:", {
    memory_action,
    section,
  });

  event("memory_action", {
    calculator_type: "scientific",
    memory_action,
    section,
  });
};

export const trackScientificHistory = ({
  history_action,
  history_size,
  section = "calculators",
}: {
  history_action: "view" | "clear";
  history_size?: number;
  section?: string;
}): void => {
  console.log("[SCIENTIFIC_EVENTS] Disparando trackScientificHistory:", {
    history_action,
    history_size,
    section,
  });

  event("history_action", {
    calculator_type: "scientific",
    history_action,
    history_size,
    section,
  });
};
