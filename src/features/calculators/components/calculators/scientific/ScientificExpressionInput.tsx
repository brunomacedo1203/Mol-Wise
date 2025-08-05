"use client";
import { useRef, useCallback, useState } from "react";

// Props do componente de entrada de expressão científica
interface ScientificExpressionInputProps {
  value: string;
  onChange: (newFormula: string) => void;
  onEnterPress: () => void;
  errorMessage: string | null;
  placeholder: string;
  result: string | null;
}

const ScientificExpressionInput = ({
  value,
  onChange,
  onEnterPress,
  errorMessage,
  placeholder,
  result,
}: ScientificExpressionInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Valor do input: fórmula + resultado quando disponível
  const displayValue = result && !errorMessage ? `${value} = ${result}` : value;

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
      // Extrai apenas a parte da fórmula (antes do "=")
      const inputValue = e.target.value;
      const formulaPart = inputValue.split(" = ")[0];
      onChange(formulaPart);
    },
    [onChange]
  );

  return (
    <div className="flex flex-col w-full space-y-2">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full px-3 py-2 text-lg font-mono bg-white dark:bg-gray-800 border rounded-lg shadow-sm transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
            errorMessage
              ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800"
              : isFocused
              ? "border-blue-500 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800"
              : "border-gray-300 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500 focus:ring-gray-200 dark:focus:ring-gray-700"
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
