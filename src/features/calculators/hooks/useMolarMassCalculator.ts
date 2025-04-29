"use client";
import { useState } from "react";
import { validateFormula, normalizeFormula } from "@/shared/utils/validateAndNormalizeFormula";
import { calculateMolarMassFromFormula } from "@/features/calculators/services/molarMass";
import { formatWithSub } from "@/shared/utils/formatWithSub";

export function useMolarMassCalculator() {
  const [formula, setFormula] = useState("");
  const [molarMass, setMolarMass] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handler dedicado para mudança da fórmula
  const handleFormulaChange = (val: string) => {
    setFormula(val);
  };

  const reset = () => {
    setFormula("");
    setMolarMass(null);
    setErrorMessage("");
  };

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
        `The molar mass of "${formatWithSub(formattedFormula)}" is: ${totalMolarMass.toFixed(2)} g/mol`
      );
      setErrorMessage("");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Ocorreu um erro ao calcular a massa molar';
      setErrorMessage(errorMessage);
      setMolarMass(null);
    }
  };

  return {
    formula,
    handleFormulaChange,
    molarMass,
    errorMessage,
    calculate,
    reset,
  };
}
