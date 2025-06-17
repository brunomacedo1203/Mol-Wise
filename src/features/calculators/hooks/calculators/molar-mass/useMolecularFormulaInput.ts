import { useRef, useEffect, useCallback, useState } from "react";
import { formatWithSub } from "@/shared/utils/formatWithSub";
import { UseMolecularFormulaInputProps, UseMolecularFormulaInputReturn } from "../../../domain/types/molecularFormulaInput";

/**
 * Hook para gerenciar o estado e comportamento do input de fórmula molecular
 */
export function useMolecularFormulaInput({
  value,
  onChange,
  onEnterPress,
}: UseMolecularFormulaInputProps): UseMolecularFormulaInputReturn {
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (!isFocused) return;
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, [isFocused]);

  const updateFormattedContent = useCallback(
    (rawText: string) => {
      if (contentRef.current) {
        const formatted = formatWithSub(rawText);
        contentRef.current.innerHTML = formatted;
        if (isFocused) {
          const cursorSpan = document.createElement("span");
          cursorSpan.className = cursorVisible
            ? "inline-block w-px h-5 bg-black dark:bg-white align-middle ml-px"
            : "inline-block w-px h-5 bg-transparent align-middle ml-px";
          contentRef.current.appendChild(cursorSpan);
        }
      }
    },
    [isFocused, cursorVisible]
  );

  useEffect(() => {
    if (typeof value === "string") {
      updateFormattedContent(value);
    }
  }, [value, updateFormattedContent]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const rawText = e.target.value;
    onChange(rawText);
    updateFormattedContent(rawText);
  }, [onChange, updateFormattedContent]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnterPress();
    }
  }, [onEnterPress]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setCursorVisible(true);
    updateFormattedContent(value || "");
  }, [value, updateFormattedContent]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    updateFormattedContent(value || "");
  }, [value, updateFormattedContent]);

  const handleContainerClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const shouldShowPlaceholder = !isFocused && (!value || value.length === 0);

  return {
    isFocused,
    cursorVisible,
    contentRef,
    inputRef,
    handleInput,
    handleKeyDown,
    handleFocus,
    handleBlur,
    handleContainerClick,
    shouldShowPlaceholder,
    updateFormattedContent,
  };
} 