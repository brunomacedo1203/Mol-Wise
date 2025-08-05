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
}

function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Função melhorada para substituir argumentos de funções trigonométricas por radianos
function convertTrigArgsToRad(expr: string): string {
  // Regex melhorada para capturar funções trigonométricas com argumentos complexos
  return expr.replace(/(sin|cos|tan)\s*\(([^)]+)\)/gi, (match, fn, arg) => {
    try {
      // Se o argumento é um número simples, converter diretamente
      const simpleNumber = Number(arg);
      if (!isNaN(simpleNumber)) {
        return `${fn}(${degToRad(simpleNumber)})`;
      }
      
      // Se é uma expressão complexa, avaliar primeiro e depois converter
      const evaluatedArg = evaluate(arg);
      return `${fn}(${degToRad(evaluatedArg)})`;
    } catch {
      // Se não conseguir avaliar, tentar converter como número
      const fallbackValue = Number(arg);
      if (!isNaN(fallbackValue)) {
        return `${fn}(${degToRad(fallbackValue)})`;
      }
      // Se tudo falhar, retornar a expressão original
      return match;
    }
  });
}

// Função para validar divisão por zero
function validateDivisionByZero(formula: string): boolean {
  // Regex para encontrar divisões
  const divisionRegex = /\/\s*([^+\-*/()]+)/g;
  let match;
  
  while ((match = divisionRegex.exec(formula)) !== null) {
    const divisor = match[1].trim();
    
    // Se o divisor é um número simples
    const divisorNumber = Number(divisor);
    if (!isNaN(divisorNumber) && divisorNumber === 0) {
      return false; // Divisão por zero detectada
    }
    
    // Se o divisor é uma expressão, tentar avaliar
    try {
      const evaluatedDivisor = evaluate(divisor);
      if (evaluatedDivisor === 0) {
        return false; // Divisão por zero detectada
      }
    } catch {
      // Se não conseguir avaliar, continuar
      continue;
    }
  }
  
  return true; // Nenhuma divisão por zero detectada
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

      // Validar divisão por zero antes do cálculo
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

      // Converter ponto para vírgula se o locale for português
      if (locale === "pt") {
        formattedResult = formattedResult.replace(/\./g, ",");
      }

      setResult(formattedResult);
      onResultChange?.(formattedResult);
      setErrorMessage(null);

      // Adicionar ao histórico
      setCalculationHistory(prev => [
        {
          expression: formula,
          result: formattedResult,
          timestamp: Date.now()
        },
        ...prev.slice(0, 9) // Manter apenas os últimos 10 cálculos
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
    onResultChange?.(null);
  }, [onResultChange]);

  const backspace = useCallback(() => {
    handleFormulaChange(formula.slice(0, -1));
  }, [formula, handleFormulaChange]);

  const handleKeyPress = useCallback(
    (key: string) => {
      // Se há um resultado e o usuário começa a digitar, usar o resultado automaticamente
      if (result && formula === "") {
        // Converter vírgula para ponto se necessário para cálculos
        const cleanResult = locale === "pt" ? result.replace(/,/g, ".") : result;
        handleFormulaChange(cleanResult + key);
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
    [formula, handleFormulaChange, backspace, result, locale]
  );

  const handleFunction = useCallback(
    (func: string) => {
      // Se há um resultado e o usuário começa com uma função, usar o resultado automaticamente
      if (result && formula === "") {
        // Converter vírgula para ponto se necessário para cálculos
        const cleanResult = locale === "pt" ? result.replace(/,/g, ".") : result;
        handleFormulaChange(cleanResult + func);
        return;
      }

      handleFormulaChange(formula + func);
    },
    [formula, handleFormulaChange, result, locale]
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

  // Nova funcionalidade: Usar Resultado
  const useResult = useCallback(() => {
    if (result) {
      // Converter vírgula para ponto se necessário para cálculos
      const cleanResult = locale === "pt" ? result.replace(/,/g, ".") : result;
      handleFormulaChange(cleanResult);
    }
  }, [result, handleFormulaChange, locale]);

  // Nova funcionalidade: Limpar Histórico
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
  };
}
