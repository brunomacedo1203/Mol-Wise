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
    handleFormulaChange,
    molarMass,
    errorMessage,
    calculate,
  };
}
