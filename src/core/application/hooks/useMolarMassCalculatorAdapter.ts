import { useState } from "react";
import { useTranslations } from "next-intl";
import { useFormulaValidation } from "@/shared/hooks/useFormulaValidation";
import { normalizeFormula } from "@/shared/utils/validateAndNormalizeFormula";
import { formatWithSub } from "@/shared/utils/formatWithSub";
import { useCalculator } from "./useCalculator";

export function useMolarMassCalculatorAdapter(
  initialFormula: string = '',
  initialResult: string | null = null
) {
  const t = useTranslations();
  const { validateFormula } = useFormulaValidation();
  const [formula, setFormula] = useState(initialFormula);
  const { isLoading, calculate: calculateCore, reset: resetCore } = useCalculator('molar-mass');

  const [molarMass, setMolarMass] = useState<string | null>(() => {
    if (initialResult) return initialResult;
    if (!initialFormula) return null;

    const validationError = validateFormula(initialFormula);
    if (validationError) return null;

    const formattedFormula = normalizeFormula(initialFormula);
    try {
      // Usa o novo serviço para cálculo
      calculateCore(formattedFormula).then(totalMolarMass => {
        if (totalMolarMass !== null) {
          setMolarMass(
            `${t('calculators.molarMass.result.prefix')} ${formatWithSub(formattedFormula)} ${t('calculators.molarMass.result.suffix')} ${totalMolarMass.toFixed(2)} ${t('calculators.molarMass.result.unit')}`
          );
        }
      });
    } catch {
      return null;
    }
    return null;
  });

  const [errorMessage, setErrorMessage] = useState<string>(() => {
    if (!initialFormula) return "";
    const validationError = validateFormula(initialFormula);
    return validationError || "";
  });

  const handleFormulaChange = (val: string) => {
    setFormula(val);
    setErrorMessage(""); // Limpa o erro quando o usuário digita
  };

  const reset = () => {
    setFormula("");
    setMolarMass(null);
    setErrorMessage("");
    resetCore();
  };

  const calculate = async () => {
    const validationError = validateFormula(formula);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const formattedFormula = normalizeFormula(formula);
    try {
      const totalMolarMass = await calculateCore(formattedFormula);
      if (totalMolarMass !== null) {
        setMolarMass(
          `${t('calculators.molarMass.result.prefix')} ${formatWithSub(formattedFormula)} ${t('calculators.molarMass.result.suffix')} ${totalMolarMass.toFixed(2)} ${t('calculators.molarMass.result.unit')}`
        );
        setErrorMessage("");
      }
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
    isLoading
  };
} 