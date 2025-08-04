"use client";
import { useRef, useCallback, useState } from "react";
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
  const lastKnownContentRef = useRef<string>("");
  const [isFocused, setIsFocused] = useState(false);

  const getCursorPosition = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || !contentRef.current) return 0;

    const range = selection.getRangeAt(0);
    const preCursorRange = range.cloneRange();
    preCursorRange.selectNodeContents(contentRef.current);
    preCursorRange.setEnd(range.endContainer, range.endOffset);
    return preCursorRange.toString().length;
  }, []);

  const setCursorPositionAt = useCallback((position: number) => {
    if (!contentRef.current) return;

    const selection = window.getSelection();
    if (!selection) return;

    const walker = document.createTreeWalker(
      contentRef.current,
      NodeFilter.SHOW_TEXT,
      null
    );

    let currentNode: Node | null = null;
    let currentIndex = 0;

    while ((currentNode = walker.nextNode())) {
      const len = currentNode.textContent?.length || 0;
      if (position <= currentIndex + len) {
        const range = document.createRange();
        range.setStart(currentNode, position - currentIndex);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        return;
      }
      currentIndex += len;
    }

    // Se não encontrou posição, coloca no final
    const lastNode = contentRef.current.lastChild;
    if (lastNode && lastNode.nodeType === Node.TEXT_NODE) {
      const range = document.createRange();
      range.setStart(lastNode, lastNode.textContent?.length || 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const newContent = e.currentTarget.textContent || "";
      lastKnownContentRef.current = newContent;
      onChange(newContent);
    },
    [onChange]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text/plain");
      const currentCursorPosition = getCursorPosition();
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

  // Handlers para permitir seleção de texto no input
  const handleInputMouseDown = useCallback((e: React.MouseEvent) => {
    // Impede que o evento se propague para o Rnd
    e.stopPropagation();
  }, []);

  const handleInputMouseMove = useCallback((e: React.MouseEvent) => {
    // Permite seleção de texto durante o arraste do mouse
    e.stopPropagation();
  }, []);

  const handleInputClick = useCallback((e: React.MouseEvent) => {
    // Impede que o clique se propague para o Rnd
    e.stopPropagation();
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
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseDown={handleInputMouseDown}
          onMouseMove={handleInputMouseMove}
          onClick={handleInputClick}
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
            outline-none text-right font-mono select-text
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
