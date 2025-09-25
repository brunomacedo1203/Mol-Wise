"use client";
import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";

interface CalculationHistoryProps {
  history: Array<{ expression: string; result: string; timestamp: number }>;
  onUseResult: (result: string) => void;
  onClearHistory: () => void;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

/** Altura visual para exibir exatamente 1 item do histórico */
const ONE_ROW_HEIGHT = "7rem"; // ajuste fino se achar que está cortando/sobrando

const CalculationHistory = ({
  history,
  onUseResult,
  onClearHistory,
  isVisible,
  onToggleVisibility,
}: CalculationHistoryProps) => {
  const t = useTranslations("calculators.scientific");

  const formatTime = useCallback((timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, []);

  const formatExpression = useCallback((expression: string) => {
    return expression
      .replace(/([+\-*/^])/g, " $1 ")
      .replace(/\s+/g, " ")
      .trim();
  }, []);

  // Mesmo padrão do componente de massa molar: um único handler "stop"
  const stop = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  // Mesmo padrão de altura da lista:
  // - vazio: pequeno
  // - com >=1 item: altura fixa para 1 item (scroll do 2º em diante)
  const listStyle = useMemo<React.CSSProperties>(() => {
    if (history.length === 0) {
      return { maxHeight: "2.75rem" };
    }
    return {
      minHeight: ONE_ROW_HEIGHT,
      maxHeight: ONE_ROW_HEIGHT,
      scrollbarGutter:
        "stable both-edges" as React.CSSProperties["scrollbarGutter"],
    };
  }, [history.length]);

  if (!isVisible) {
    return (
      <button
        onClick={onToggleVisibility}
        className="w-full p-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors border-t border-gray-200 dark:border-gray-700"
      >
        ▼ {t("history.show")}
      </button>
    );
  }

  return (
    <div
      className="border-t border-gray-200 dark:border-gray-700"
      onMouseDown={stop}
      onMouseMove={stop}
      onClick={stop}
    >
      {/* Header do Histórico */}
      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          📋 {t("history.title")}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onClearHistory}
            className="text-xs px-2 py-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            title={t("history.clear")}
          >
            🗑️
          </button>
          <button
            onClick={onToggleVisibility}
            className="text-xs px-2 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            title={t("history.hide")}
          >
            ▲
          </button>
        </div>
      </div>

      {/* Lista – 1 item visível; rolagem a partir do segundo (mesmo padrão) */}
      <div
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
        className="overflow-y-auto"
        style={listStyle}
      >
        {history.length === 0 ? (
          <div className="p-2 text-center text-gray-500 dark:text-gray-400 text-sm">
            {t("history.empty")}
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {history.map((calculation) => (
              <div
                key={calculation.timestamp}
                className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                onClick={() => onUseResult(calculation.result)}
              >
                {/* Expressão */}
                <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                  {formatExpression(calculation.expression)}
                </div>

                {/* Resultado - traduzido dinamicamente */}
                <div className="text-lg font-mono text-blue-600 dark:text-blue-400">
                  = {calculation.result}
                </div>

                {/* Timestamp */}
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {formatTime(calculation.timestamp)}
                </div>

                {/* Indicador de clique */}
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {t("history.clickToUse")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculationHistory;
