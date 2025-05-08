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
    setErrorMessage(""); // Limpa o erro quando o usuário digita
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
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setFormula(""); // Clear input to show error message in placeholder
      } else {
        setErrorMessage('An error occurred while calculating the molar mass');
      }
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
