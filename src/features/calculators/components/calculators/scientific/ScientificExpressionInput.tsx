import { useRef, useEffect, useCallback, useState } from "react";

interface ScientificExpressionInputProps {
  value?: string;
  onChange: (val: string) => void;
  onEnterPress: () => void;
  errorMessage?: string | null;
  placeholder?: string;
  className?: string;
}

const ScientificExpressionInput = ({
  value,
  onChange,
  onEnterPress,
  errorMessage,
  placeholder = "Digite uma expressão...",
  className,
}: ScientificExpressionInputProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (typeof value === "string" && contentRef.current) {
      contentRef.current.textContent = value;
    }
  }, [value]);

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const rawText = e.currentTarget.textContent || "";
      onChange(rawText);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
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

  const shouldShowPlaceholder = !isFocused && (!value || value.length === 0);

  return (
    <div className={`w-full ${className}`}>
      <div
        className="relative w-full min-h-[3rem] max-h-32"
        onClick={() => contentRef.current?.focus()}
      >
        <div
          ref={contentRef}
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`molecular-formula-input border 
            ${
              errorMessage
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-white/20"
            }
            rounded-xl pt-2 pb-2 px-3 text-gray-900 dark:text-white 
            bg-white dark:bg-white/5 dark:border-white/20
            text-xl h-[3rem] cursor-text
            transition-all whitespace-pre-wrap break-words
            ${isFocused ? "ring-2 ring-blue-500 ring-opacity-50" : ""}
            outline-none text-right font-mono
          `}
          spellCheck={false}
          aria-label="Scientific expression input"
        />
        {shouldShowPlaceholder && (
          <span
            className={`absolute inset-0 w-full h-full flex items-center pl-3 pointer-events-none select-none text-xl font-sans whitespace-pre-wrap break-words text-gray-400 dark:text-white/40`}
          >
            {placeholder}
          </span>
        )}
      </div>
    </div>
  );
};

export default ScientificExpressionInput;
