"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useFormulaValidation } from "@/shared/hooks/useFormulaValidation";
import { normalizeFormula } from "@/shared/utils/validateAndNormalizeFormula";
import { calculateMolarMassFromFormula } from "@/features/calculators/services/molarMass";
import { formatWithSub } from "@/shared/utils/formatWithSub";

export function useMolarMassCalculator(
  initialFormula: string = '',
  initialResult: string | null = null
) {
  const t = useTranslations();
  const { validateFormula } = useFormulaValidation();
  const [formula, setFormula] = useState(initialFormula);
  const [molarMass, setMolarMass] = useState<string | null>(() => {
    if (initialResult) return initialResult;
    if (!initialFormula) return null;

    const validationError = validateFormula(initialFormula);
    if (validationError) return null;

    const formattedFormula = normalizeFormula(initialFormula);
    try {
      const totalMolarMass = calculateMolarMassFromFormula(formattedFormula, t);
      return t('common.results.molarMass', {
        formula: formatWithSub(formattedFormula),
        mass: totalMolarMass.toFixed(2)
      });
    } catch {
      return null;
    }
  });
  const [errorMessage, setErrorMessage] = useState<string>(() => {
    if (!initialFormula) return "";
    const validationError = validateFormula(initialFormula);
    return validationError || "";
  });

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
      const totalMolarMass = calculateMolarMassFromFormula(formattedFormula, t);
      setMolarMass(
        t('common.results.molarMass', {
          formula: formatWithSub(formattedFormula),
          mass: totalMolarMass.toFixed(2)
        })
      );
      setErrorMessage("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setFormula(""); // Clear input to show error message in placeholder
      } else {
        setErrorMessage(t('calculators.molarMass.errors.generic'));
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
