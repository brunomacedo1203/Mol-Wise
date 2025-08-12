"use client";
import { useCallback, useState } from "react";
import { useMolarMassCalculatorAdapter } from "@/core/application/hooks/useMolarMassCalculatorAdapter";
import { useCalculatorInstancesStore } from "@/features/calculators/store/calculatorInstancesStore";
import { formatWithSub } from "@/shared/utils/formatWithSub";

// Props para o hook de calculadora de massa molar
interface UseMolarMassCalculatorProps {
  initialFormula?: string;
  initialResult?: string | null;
  onFormulaChange?: (formula: string) => void;
  onResultChange?: (result: string | null) => void;
  calculatorId: number;
}

// Item do histórico (formato atual, tipado)
export interface MolarHistoryItem {
  formula: string;     // HTML com <sub>
  rawFormula: string;  // texto puro digitado
  result: string;      // apenas o valor numérico como string
  timestamp: number;
}

// Retorno do hook
interface UseMolarMassCalculatorReturn {
  formula: string;
  molarMass: string | null;
  errorMessage: string | null;
  calculationHistory: MolarHistoryItem[];
  handleFormulaChange: (newFormula: string) => void;
  calculate: () => Promise<string | null>;
  reset: () => void;
  backspace: () => void;
  handleKeyPress: (key: string) => void;
  handleFormulaBtn: (value: string) => void;
  handleParenthesis: (paren: string) => void;
  clearHistory: () => void;
}

// ---- Helpers de migração/tipagem segura ----

type UnknownRecord = Record<string, unknown>;

/** Extrai um número (com ponto ou vírgula) de uma string. Retorna string numérica com ponto. */
function extractNumericString(s: string): string {
  const m = s.match(/[\d.,]+/);
  if (!m) return "";
  // normaliza vírgula para ponto (opcional; ajuste se quiser manter vírgula)
  return m[0].replace(",", ".");
}

/** Converte um item desconhecido salvo no localStorage para MolarHistoryItem */
function coerceToHistoryItem(item: unknown): MolarHistoryItem {
  const obj = (item ?? {}) as UnknownRecord;

  const formula = typeof obj.formula === "string" ? obj.formula : "";
  const rawFormula = typeof obj.rawFormula === "string" ? obj.rawFormula : "";
  const timestamp =
    typeof obj.timestamp === "number" ? obj.timestamp : Date.now();

  let result = "";
  if (typeof obj.result === "string") {
    // Pode ter vindo no formato antigo (frase com "g/mol"); extrai número
    result = obj.result.includes("g/mol")
      ? extractNumericString(obj.result)
      : obj.result;
  } else if (typeof obj.result === "number") {
    result = String(obj.result);
  }

  return { formula, rawFormula, result, timestamp };
}

/** Migra um payload desconhecido (parse do JSON) para array tipado de histórico */
function migrateHistoryPayload(payload: unknown): MolarHistoryItem[] {
  if (!Array.isArray(payload)) return [];
  return payload.map(coerceToHistoryItem).slice(0, 10);
}

// --------------------------------------------

export default function useMolarMassCalculator({
  initialFormula = "",
  initialResult = null,
  onFormulaChange,
  onResultChange,
  calculatorId,
}: UseMolarMassCalculatorProps): UseMolarMassCalculatorReturn {
  const resetCalculatorState = useCalculatorInstancesStore(
    (state) => state.resetCalculatorState
  );

  // Estado para o histórico com persistência no localStorage (migração segura)
  const [calculationHistory, setCalculationHistory] = useState<MolarHistoryItem[]>(
    () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(
          `molwise_molar_mass_history_${calculatorId}`
        );
        if (saved) {
          try {
            const parsed: unknown = JSON.parse(saved);
            return migrateHistoryPayload(parsed);
          } catch (e) {
            console.error(
              "Erro ao carregar histórico da calculadora de massa molar:",
              e
            );
          }
        }
      }
      return [];
    }
  );

  const {
    formula,
    handleFormulaChange: _handleFormulaChange,
    molarMass,
    errorMessage,
    calculate: _calculate,
    reset: _reset,
  } = useMolarMassCalculatorAdapter(initialFormula, initialResult);

  const handleFormulaChange = useCallback(
    (newFormula: string) => {
      _handleFormulaChange(newFormula);
      onFormulaChange?.(newFormula);
    },
    [_handleFormulaChange, onFormulaChange]
  );

  const calculate = useCallback(async () => {
    const result = await _calculate();
    const currentResult = result || molarMass;

    if (currentResult) {
      // Formata a fórmula com subscritos e permite somente <sub>
      const formattedFormula = formatWithSub(formula);
      const sanitizedFormula = formattedFormula.replace(
        /<(?!\/?(sub)\b)[^>]+>/gi,
        ""
      );

      setCalculationHistory((prev) => {
        // extrai apenas o valor numérico do resultado (caso venha com texto)
        const numeric = extractNumericString(currentResult) || currentResult;

        const newHistory: MolarHistoryItem[] = [
          {
            formula: sanitizedFormula,
            rawFormula: formula,
            result: numeric,
            timestamp: Date.now(),
          },
          ...prev.slice(0, 9),
        ];

        if (typeof window !== "undefined") {
          localStorage.setItem(
            `molwise_molar_mass_history_${calculatorId}`,
            JSON.stringify(newHistory)
          );
        }

        return newHistory;
      });
    }

    onResultChange?.(currentResult);
    onFormulaChange?.(formula);

    return currentResult;
  }, [_calculate, molarMass, formula, onResultChange, onFormulaChange, calculatorId]);

  const reset = useCallback(() => {
    _reset();
    onResultChange?.(null);
    resetCalculatorState(calculatorId);
  }, [_reset, onResultChange, resetCalculatorState, calculatorId]);

  const clearHistory = useCallback(() => {
    setCalculationHistory([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(`molwise_molar_mass_history_${calculatorId}`);
    }
  }, [calculatorId]);

  const backspace = useCallback(
    () => handleFormulaChange(formula.slice(0, -1)),
    [formula, handleFormulaChange]
  );

  const handleKeyPress = useCallback(
    (key: string) => {
      if (key === "⌫") {
        backspace();
      } else if (key === "⇧") {
        // caps lock opcional
      } else {
        handleFormulaChange(formula + key);
      }
    },
    [formula, handleFormulaChange, backspace]
  );

  const handleFormulaBtn = useCallback(
    (value: string) => handleFormulaChange(formula + value),
    [formula, handleFormulaChange]
  );

  const handleParenthesis = useCallback(
    (paren: string) => handleFormulaChange(formula + paren),
    [formula, handleFormulaChange]
  );

  return {
    formula,
    molarMass,
    errorMessage,
    calculationHistory,
    handleFormulaChange,
    calculate,
    reset,
    backspace,
    handleKeyPress,
    handleFormulaBtn,
    handleParenthesis,
    clearHistory,
  };
}
