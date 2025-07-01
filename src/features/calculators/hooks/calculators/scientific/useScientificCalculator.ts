import { useCallback, useState } from "react";
import { evaluate } from "mathjs";
import { parseFormulaForEvaluation } from "@/features/calculators/domain/services/formulaParser";
import { isValidZeroInsertion } from "@/features/calculators/utils/zeroValidation";

interface UseScientificCalculatorProps {
  initialFormula?: string;
  initialResult?: string | null;
  onFormulaChange?: (formula: string) => void;
  onResultChange?: (result: string | null) => void;
  getErrorMessage?: (type: 'invalidExpression' | 'empty') => string;
}

interface UseScientificCalculatorReturn {
  formula: string;
  result: string | null;
  errorMessage: string | null;
  handleFormulaChange: (newFormula: string) => void;
  calculate: () => void;
  reset: () => void;
  backspace: () => void;
  handleKeyPress: (key: string) => void;
  handleFunction: (func: string) => void;
  handleMemory: (action: "store" | "recall" | "clear") => void;
}

function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Função para substituir argumentos de funções trigonométricas por radianos
function convertTrigArgsToRad(expr: string): string {
  // Substitui sin(x), cos(x), tan(x) por sin(radians), etc.
  return expr.replace(/(sin|cos|tan)\s*\(([^)]+)\)/gi, (match, fn, arg) => {
    // Tenta avaliar o argumento, caso seja uma expressão
    let argValue = Number(arg);
    if (isNaN(argValue)) {
      try {
        argValue = evaluate(arg);
      } catch {
        argValue = Number(arg); // fallback
      }
    }
    return `${fn}(${degToRad(argValue)})`;
  });
}

export function useScientificCalculator({
  initialFormula = "",
  initialResult = null,
  onFormulaChange,
  onResultChange,
  getErrorMessage,
}: UseScientificCalculatorProps): UseScientificCalculatorReturn {
  const [formula, setFormula] = useState(initialFormula);
  const [result, setResult] = useState<string | null>(initialResult);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [memory, setMemory] = useState<number | null>(null);

  const handleFormulaChange = useCallback(
    (newFormula: string) => {
      setFormula(newFormula);
      setErrorMessage(null);
      onFormulaChange?.(newFormula);
    },
    [onFormulaChange]
  );

  const calculate = useCallback(() => {
    try {
      if (!formula.trim()) {
        setResult(null);
        setErrorMessage(getErrorMessage ? getErrorMessage('empty') : "A expressão não pode estar vazia");
        return;
      }

      const formulaToEvaluate = parseFormulaForEvaluation(formula);
      const formulaWithRad = convertTrigArgsToRad(formulaToEvaluate);

      const calculatedResult = evaluate(formulaWithRad);

      const formattedResult = Number.isInteger(calculatedResult)
        ? calculatedResult.toString()
        : calculatedResult.toFixed(8).replace(/\.?0+$/, "");

      setResult(formattedResult);
      onResultChange?.(formattedResult);
      setErrorMessage(null);
    } catch {
      setErrorMessage(getErrorMessage ? getErrorMessage('invalidExpression') : "Expressão inválida");
      setResult(null);
    }
  }, [formula, onResultChange, getErrorMessage]);

  const reset = useCallback(() => {
    setFormula("");
    setResult(null);
    setErrorMessage(null);
    onResultChange?.(null);
  }, [onResultChange]);

  const backspace = useCallback(() => {
    handleFormulaChange(formula.slice(0, -1));
  }, [formula, handleFormulaChange]);

  const handleKeyPress = useCallback(
    (key: string) => {
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
    [formula, handleFormulaChange, backspace]
  );

  const handleFunction = useCallback(
    (func: string) => {
      handleFormulaChange(formula + func);
    },
    [formula, handleFormulaChange]
  );

  const handleMemory = useCallback(
    (action: "store" | "recall" | "clear") => {
      switch (action) {
        case "store":
          if (result) {
            setMemory(parseFloat(result));
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

  return {
    formula,
    result,
    errorMessage,
    handleFormulaChange,
    calculate,
    reset,
    backspace,
    handleKeyPress,
    handleFunction,
    handleMemory,
  };
}
