import { useState } from "react";
import { validateFormula, normalizeFormula } from "@/shared/utils/validateAndNormalizeFormula";
import { calculateMolarMassFromFormula } from "@/features/calculators/services/molarMass";
import { formatWithSub } from "@/shared/utils/formatWithSub";

/**
 * Hook customizado para encapsular a lógica de cálculo de massa molar,
 * incluindo validação, normalização e gerenciamento de estados.
 * Pode ser reutilizado em qualquer componente/calculadora que precise dessa lógica.
 */
export function useMolarMassCalculator() {
  const [formula, setFormula] = useState("");
  const [molarMass, setMolarMass] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const calculate = () => {
    const validationError = validateFormula(formula);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    const formattedFormula = normalizeFormula(formula);
    try {
      const totalMolarMass = calculateMolarMassFromFormula(formattedFormula);
      setMolarMass(
        `The molar mass of ${formatWithSub(formattedFormula)} is: ${totalMolarMass.toFixed(2)} g/mol`
      );
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return {
    formula,
    setFormula,
    molarMass,
    errorMessage,
    calculate,
  };
}
