import { useCallback, useState } from "react";
import { evaluate } from "mathjs";
import { parseFormulaForEvaluation } from "@/features/calculators/domain/services/formulaParser";
import { isValidZeroInsertion } from "@/features/calculators/utils/zeroValidation";

interface UseScientificCalculatorProps {
  initialFormula?: string;
  initialResult?: string | null;
  onFormulaChange?: (formula: string) => void;
  onResultChange?: (result: string | null) => void;
  getErrorMessage?: (type: 'invalidExpression' | 'empty' | 'divisionByZero') => string;
  locale?: string;
}

interface UseScientificCalculatorReturn {
  formula: string;
  result: string | null;
  errorMessage: string | null;
  calculationHistory: Array<{ expression: string; result: string; timestamp: number }>;
  handleFormulaChange: (newFormula: string) => void;
  calculate: () => void;
  reset: () => void;
  backspace: () => void;
  handleKeyPress: (key: string) => void;
  handleFunction: (func: string) => void;
  handleMemory: (action: "store" | "recall" | "clear") => void;
  useResult: () => void;
  clearHistory: () => void;
  justCalculated: boolean; // NOVO: expõe flag
}

function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}

function convertTrigArgsToRad(expr: string): string {
  return expr.replace(/(sin|cos|tan)\s*\(([^)]+)\)/gi, (match, fn, arg) => {
    try {
      const simpleNumber = Number(arg);
      if (!isNaN(simpleNumber)) {
        return `${fn}(${degToRad(simpleNumber)})`;
      }
      const evaluatedArg = evaluate(arg);
      return `${fn}(${degToRad(evaluatedArg)})`;
    } catch {
      const fallbackValue = Number(arg);
      if (!isNaN(fallbackValue)) {
        return `${fn}(${degToRad(fallbackValue)})`;
      }
      return match;
    }
  });
}

function validateDivisionByZero(formula: string): boolean {
  const divisionRegex = /\/\s*([^+\-*/()]+)/g;
  let match;
  while ((match = divisionRegex.exec(formula)) !== null) {
    const divisor = match[1].trim();
    const divisorNumber = Number(divisor);
    if (!isNaN(divisorNumber) && divisorNumber === 0) {
      return false;
    }
    try {
      const evaluatedDivisor = evaluate(divisor);
      if (evaluatedDivisor === 0) {
        return false;
      }
    } catch {
      continue;
    }
  }
  return true;
}

export function useScientificCalculator({
  initialFormula = "",
  initialResult = null,
  onFormulaChange,
  onResultChange,
  getErrorMessage,
  locale,
}: UseScientificCalculatorProps): UseScientificCalculatorReturn {
  const [formula, setFormula] = useState(initialFormula);
  const [result, setResult] = useState<string | null>(initialResult);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [memory, setMemory] = useState<number | null>(null);
  const [calculationHistory, setCalculationHistory] = useState<Array<{ expression: string; result: string; timestamp: number }>>([]);
  const [justCalculated, setJustCalculated] = useState(false); // NOVO

  const handleFormulaChange = useCallback(
    (newFormula: string) => {
      setFormula(newFormula);
      setErrorMessage(null);
      setJustCalculated(false); // Zera flag a cada edição manual
      setResult(null); // Limpa o resultado anterior quando a fórmula é alterada
      onResultChange?.(null); // Notifica que o resultado foi limpo
      onFormulaChange?.(newFormula);
    },
    [onFormulaChange, onResultChange]
  );

  const calculate = useCallback(() => {
    try {
      if (!formula.trim()) {
        setResult(null);
        setErrorMessage(getErrorMessage ? getErrorMessage('empty') : "A expressão não pode estar vazia");
        return;
      }
      if (!validateDivisionByZero(formula)) {
        setResult(null);
        setErrorMessage(getErrorMessage ? getErrorMessage('divisionByZero') : "Divisão por zero não é permitida");
        return;
      }
      const formulaToEvaluate = parseFormulaForEvaluation(formula);
      const formulaWithRad = convertTrigArgsToRad(formulaToEvaluate);
      const calculatedResult = evaluate(formulaWithRad);

      let formattedResult = Number.isInteger(calculatedResult)
        ? calculatedResult.toString()
        : calculatedResult.toFixed(8).replace(/\.?0+$/, "");

      if (locale === "pt") {
        formattedResult = formattedResult.replace(/\./g, ",");
      }
      setResult(formattedResult);
      setJustCalculated(true); // ATIVA flag após cálculo
      onResultChange?.(formattedResult);
      setErrorMessage(null);

      setCalculationHistory(prev => [
        {
          expression: formula,
          result: formattedResult,
          timestamp: Date.now()
        },
        ...prev.slice(0, 9)
      ]);
    } catch {
      setErrorMessage(getErrorMessage ? getErrorMessage('invalidExpression') : "Expressão inválida");
      setResult(null);
    }
  }, [formula, onResultChange, getErrorMessage, locale]);

  const reset = useCallback(() => {
    setFormula("");
    setResult(null);
    setErrorMessage(null);
    setJustCalculated(false);
    onResultChange?.(null);
  }, [onResultChange]);

  const backspace = useCallback(() => {
    handleFormulaChange(formula.slice(0, -1));
  }, [formula, handleFormulaChange]);

  const handleKeyPress = useCallback(
    (key: string) => {
      const isOperator = ["+", "-", "*", "/"].includes(key);

      if (result && justCalculated && isOperator) {
        const cleanResult = locale === "pt" ? result.replace(/,/g, ".") : result;
        handleFormulaChange(cleanResult + key);
        setJustCalculated(false);
        return;
      }
      if (result && justCalculated && !isOperator) {
        handleFormulaChange(key);
        setJustCalculated(false);
        return;
      }
      if (key === "⌫") {
        backspace();
      } else if (key === "0") {
        if (isValidZeroInsertion(formula, key)) {
          handleFormulaChange(formula + key);
        }
      } else {
        handleFormulaChange(formula + key);
      }
    },
    [formula, handleFormulaChange, backspace, result, locale, justCalculated]
  );

  const handleFunction = useCallback(
    (func: string) => {
      if (result && justCalculated) {
        const cleanResult = locale === "pt" ? result.replace(/,/g, ".") : result;
        handleFormulaChange(cleanResult + func);
        setJustCalculated(false);
        return;
      }
      handleFormulaChange(formula + func);
    },
    [formula, handleFormulaChange, result, locale, justCalculated]
  );

  const handleMemory = useCallback(
    (action: "store" | "recall" | "clear") => {
      switch (action) {
        case "store":
          if (result) {
            setMemory(parseFloat(result.replace(/,/g, ".")));
          }
          break;
        case "recall":
          if (memory !== null) {
            handleFormulaChange(formula + memory.toString());
          }
          break;
        case "clear":
          setMemory(null);
          break;
      }
    },
    [formula, result, memory, handleFormulaChange]
  );

  const useResult = useCallback(() => {
    if (result) {
      const cleanResult = locale === "pt" ? result.replace(/,/g, ".") : result;
      handleFormulaChange(cleanResult);
      setJustCalculated(false);
    }
  }, [result, handleFormulaChange, locale]);

  const clearHistory = useCallback(() => {
    setCalculationHistory([]);
  }, []);

  return {
    formula,
    result,
    errorMessage,
    calculationHistory,
    handleFormulaChange,
    calculate,
    reset,
    backspace,
    handleKeyPress,
    handleFunction,
    handleMemory,
    useResult,
    clearHistory,
    justCalculated, // <-- ADICIONE isto ao retorno!
  };
}
