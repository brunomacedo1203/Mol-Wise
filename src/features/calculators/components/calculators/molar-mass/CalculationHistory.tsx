"use client";
import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import DOMPurify from "dompurify";
import { formatWithSub } from "@/shared/utils/formatWithSub";

interface CalculationHistoryProps {
  history: Array<{
    formula: string; // pode vir com HTML escapado
    rawFormula: string; // texto puro (ex.: CH3CH2CH2CH3)
    result: string; // frase renderizada
    timestamp: number;
  }>;
  onUseResult: (formula: string) => void;
  onClearHistory: () => void;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

/** Altura (visual) suficiente para exibir exatamente 1 item do histórico */
const ONE_ROW_HEIGHT = "7rem"; // ajuste fino aqui se achar que está cortando/sobrando

const decodeHtmlDeep = (s: string): string => {
  let decoded = s;
  for (let i = 0; i < 3; i++) {
    const doc = new DOMParser().parseFromString(decoded, "text/html");
    const text = doc.documentElement.textContent ?? decoded;
    if (text === decoded) break;
    decoded = text;
  }
  return decoded;
};

const sanitizeSubSup = (html: string): string =>
  DOMPurify.sanitize(html, { ALLOWED_TAGS: ["sub", "sup"], ALLOWED_ATTR: [] });

const CalculationHistory = ({
  history,
  onUseResult,
  onClearHistory,
  isVisible,
  onToggleVisibility,
}: CalculationHistoryProps) => {
  const t = useTranslations("calculators.molarMass");

  const formatTime = useCallback((timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, []);

  const stop = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  // Altura da área da lista:
  // - sem itens: pequena (evita buraco grande)
  // - com >=1 item: altura fixa p/ caber 1 item (rolagem a partir do segundo)
  const listStyle = useMemo<React.CSSProperties>(() => {
    if (history.length === 0) {
      return { maxHeight: "2.75rem" };
    }
    return {
      minHeight: ONE_ROW_HEIGHT,
      maxHeight: ONE_ROW_HEIGHT,
      scrollbarGutter: "stable" as React.CSSProperties["scrollbarGutter"], // ✅ tipagem correta
    };
  }, [history.length]);

  if (!isVisible) {
    return (
      <button
        onClick={onToggleVisibility}
        className="w-full p-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        📋 {t("history.show")}
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
      {/* Header */}
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
            ✕
          </button>
        </div>
      </div>

      {/* Lista – 1 item visível; rolagem a partir do segundo */}
      <div className="overflow-y-auto" style={listStyle}>
        {history.length === 0 ? (
          <div className="p-2 text-center text-gray-500 dark:text-gray-400 text-sm">
            {t("history.empty")}
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {history.map((calculation) => {
              // Fórmula (linha de cima)
              let formulaHtml = decodeHtmlDeep(calculation.formula);
              if (!/<\/?sub>/i.test(formulaHtml)) {
                formulaHtml = formatWithSub(calculation.rawFormula);
              }
              formulaHtml = sanitizeSubSup(formulaHtml);

              // Formatar a fórmula com subscritos para exibição
              const formattedFormulaForResult = sanitizeSubSup(
                formatWithSub(calculation.rawFormula)
              );
              
              // Construir o texto do resultado usando as chaves de tradução
              const resultText = `${t("result.prefix")} ${formattedFormulaForResult} ${t("result.suffix")} ${calculation.result} ${t("result.unit")}`;
              
              // Sanitizar o HTML do resultado
              const resultHtml = sanitizeSubSup(resultText);

              return (
                <div
                  key={calculation.timestamp}
                  className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                  onClick={() => onUseResult(calculation.rawFormula)}
                >
                  <div
                    className="text-sm text-gray-600 dark:text-gray-400 font-mono"
                    dangerouslySetInnerHTML={{ __html: formulaHtml }}
                  />
                  <div
                    className="text-lg font-mono text-blue-600 dark:text-blue-400"
                    dangerouslySetInnerHTML={{ __html: resultHtml }}
                  />
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {formatTime(calculation.timestamp)}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t("history.clickToUse")}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculationHistory;
