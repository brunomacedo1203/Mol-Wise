"use client";
import { useRef, useCallback, useState } from "react";
import { translateFormulaToPortuguese } from "@/features/calculators/domain/services/formulaParser";

// Props do componente de entrada de expressão científica
interface ScientificExpressionInputProps {
  value: string;
  onChange: (newFormula: string) => void;
  onEnterPress: () => void;
  errorMessage: string | null;
  placeholder: string;
  result: string | null;
  onCursorPositionChange?: (position: number) => void;
  locale?: string;
}

const ScientificExpressionInput = ({
  value,
  onChange,
  onEnterPress,
  errorMessage,
  placeholder,
  result,
  onCursorPositionChange,
  locale = "en",
}: ScientificExpressionInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Valor do input: fórmula + resultado quando disponível
  const displayValue = result && !errorMessage ? `${value} = ${result}` : value;

  // Traduzir funções para português se necessário
  const translatedValue =
    locale === "pt" ? translateFormulaToPortuguese(displayValue) : displayValue;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onEnterPress();
      }
    },
    [onEnterPress]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const cursorPosition = e.target.selectionStart || 0;

      // Notifica a posição do cursor
      onCursorPositionChange?.(cursorPosition);

      // Se o valor contém " = ", extrai apenas a parte da fórmula
      if (inputValue.includes(" = ")) {
        const formulaPart = inputValue.split(" = ")[0];
        onChange(formulaPart);
      } else {
        // Se não contém " = ", é uma edição manual
        onChange(inputValue);
      }
    },
    [onChange, onCursorPositionChange]
  );

  // Handlers para permitir seleção de texto no input
  const handleInputMouseDown = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      // Impede que o evento se propague para o Rnd
      e.stopPropagation();
    },
    []
  );

  const handleInputMouseMove = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      // Permite seleção de texto durante o arraste do mouse
      e.stopPropagation();
    },
    []
  );

  const handleInputClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      // Impede que o clique se propague para o Rnd
      e.stopPropagation();
      const cursorPosition = e.currentTarget.selectionStart || 0;
      onCursorPositionChange?.(cursorPosition);
    },
    [onCursorPositionChange]
  );

  return (
    <div className="flex flex-col w-full space-y-2">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={translatedValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseDown={handleInputMouseDown}
          onMouseMove={handleInputMouseMove}
          onClick={handleInputClick}
          placeholder={placeholder}
          className={`w-full pt-2 pb-2 px-3 text-xl bg-white dark:bg-white/5 border rounded-xl shadow-sm transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 min-h-[3rem] ${
            errorMessage
              ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800"
              : isFocused
              ? "border-blue-500 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800"
              : "border-gray-300 dark:border-white/20 focus:border-gray-400 dark:focus:border-gray-500 focus:ring-gray-200 dark:focus:ring-gray-700"
          } focus:outline-none focus:ring-2`}
        />
      </div>

      {errorMessage && (
        <div className="text-red-500 dark:text-red-400 text-sm font-medium px-1">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ScientificExpressionInput;
