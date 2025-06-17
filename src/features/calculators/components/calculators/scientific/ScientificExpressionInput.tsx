import { useRef, useEffect, useCallback, useState } from "react";
import { isValidZeroInsertion } from "@/features/calculators/utils/zeroValidation";

interface ScientificExpressionInputProps {
  value?: string;
  onChange: (val: string) => void;
  onEnterPress: () => void;
  errorMessage?: string | null;
  placeholder?: string;
  className?: string;
}

const ScientificExpressionInput = ({
  value = "",
  onChange,
  onEnterPress,
  errorMessage,
  placeholder = "Digite uma expressão...",
  className,
}: ScientificExpressionInputProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Keep track of the actual DOM content to compare with the controlled 'value'
  const lastKnownContentRef = useRef<string>(value || "");

  // Função para obter a posição atual do cursor
  const getCursorPosition = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && contentRef.current) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(contentRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      return preCaretRange.toString().length;
    }
    return 0;
  }, []);

  // Função para definir a posição do cursor
  const setCursorPositionAt = useCallback((position: number) => {
    if (!contentRef.current) return;

    const range = document.createRange();
    const selection = window.window.getSelection();

    if (contentRef.current.firstChild) {
      const textLength = contentRef.current.textContent?.length || 0;
      const safePosition = Math.min(position, textLength);

      try {
        range.setStart(contentRef.current.firstChild, safePosition);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
      } catch (_error) {
        console.error("Error restoring cursor position:", _error);
        // Fallback: posicionar no final
        range.setStart(contentRef.current.firstChild, textLength);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }, []);

  // Sincronizar o conteúdo do DOM com o valor controlado
  useEffect(() => {
    if (contentRef.current && contentRef.current.textContent !== value) {
      const currentCursorPosition = getCursorPosition();
      contentRef.current.textContent = value;

      // Restaurar posição do cursor se o componente estiver focado
      if (isFocused) {
        setCursorPositionAt(currentCursorPosition);
      }
    }
  }, [value, isFocused, getCursorPosition, setCursorPositionAt]);

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const currentContent = e.currentTarget.textContent || "";
      const previousContent = lastKnownContentRef.current;

      // Determine the character that was just added
      let newChar = "";
      if (currentContent.length > previousContent.length) {
        newChar = currentContent.substring(previousContent.length);
      } else {
        // If content length decreased or stayed same, it's not a simple addition
        // For simplicity, we'll assume a single char addition if length increased
      }

      // Only validate if a single '0' was added that would create an invalid sequence
      if (newChar === "0") {
        // Check if the resulting full string (previousContent + newChar) is invalid
        if (!isValidZeroInsertion(previousContent, newChar)) {
          // If invalid, revert DOM content and prevent state update
          if (contentRef.current) {
            contentRef.current.textContent = previousContent;
            // Restore cursor position
            const range = document.createRange();
            const selection = window.getSelection();
            if (selection && contentRef.current.firstChild) {
              range.setStart(
                contentRef.current.firstChild,
                previousContent.length
              );
              range.collapse(true);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
          return; // Stop here, do not call onChange
        }
      }

      // If valid, or not a '0' being added, update the state
      onChange(currentContent);
      lastKnownContentRef.current = currentContent; // Update last known content after successful change
    },
    [onChange]
  );

  // Interceptar colagem para validar
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();

      const pastedText = e.clipboardData.getData("text/plain");
      const currentCursorPosition = getCursorPosition();

      // Construir o novo valor após a colagem
      const beforeCursor = value.substring(0, currentCursorPosition);
      const afterCursor = value.substring(currentCursorPosition);

      // Validar caractere por caractere do texto colado
      let validatedText = "";
      for (let i = 0; i < pastedText.length; i++) {
        const char = pastedText[i];

        if (char === "0") {
          const beforeChar = beforeCursor + validatedText;
          if (isValidZeroInsertion(beforeChar, "0")) {
            validatedText += char;
          }
          // Se inválido, pular o caractere
        } else {
          validatedText += char;
        }
      }

      // Aplicar o texto validado
      const finalValue = beforeCursor + validatedText + afterCursor;
      onChange(finalValue);

      // Posicionar cursor após o texto colado válido
      setTimeout(() => {
        setCursorPositionAt(currentCursorPosition + validatedText.length);
      }, 0);
    },
    [value, onChange, getCursorPosition, setCursorPositionAt]
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
    // On blur, ensure the displayed content matches the value (e.g., after a paste)
    if (typeof value === "string" && contentRef.current) {
      contentRef.current.textContent = value;
      lastKnownContentRef.current = value;
    }
  }, [value]);

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
          onPaste={handlePaste}
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
