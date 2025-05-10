"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import { formatWithSub } from "@/shared/utils/formatWithSub";

interface MolecularFormulaInputProps {
  value?: string;
  onChange: (val: string) => void;
  onEnterPress: () => void;
  errorMessage?: string;
  resultHtml?: string;
}

const MolecularFormulaInput = ({
  value,
  onChange,
  onEnterPress,
  errorMessage,
  resultHtml,
}: MolecularFormulaInputProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Efeito para piscar o cursor
  useEffect(() => {
    if (!isFocused) return;

    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530); // Taxa de piscada padrão para cursores

    return () => clearInterval(interval);
  }, [isFocused]);

  const updateFormattedContent = useCallback(
    (rawText: string) => {
      if (contentRef.current) {
        const formatted = formatWithSub(rawText);
        contentRef.current.innerHTML = formatted;

        // Adiciona o cursor apenas quando estiver focado
        if (isFocused) {
          const cursorSpan = document.createElement("span");
          cursorSpan.className = cursorVisible
            ? "inline-block w-px h-5 bg-black align-middle ml-px"
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawText = e.target.value;
    onChange(rawText);
    updateFormattedContent(rawText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnterPress();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setCursorVisible(true);
    updateFormattedContent(value || "");
  };

  const handleBlur = () => {
    setIsFocused(false);
    updateFormattedContent(value || "");
  };

  const handleContainerClick = () => {
    // Foca o input quando o usuário clica na área do container
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Apenas mostre o placeholder se NÃO estiver focado E o valor estiver vazio
  const shouldShowPlaceholder = !isFocused && (!value || value.length === 0);

  return (
    <div className="w-full">
      <div
        className="relative w-full min-h-[2.5rem] max-h-32"
        onClick={handleContainerClick}
      >
        <input
          ref={inputRef}
          type="text"
          value={value || ""}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full h-full absolute inset-0 opacity-0 z-10 cursor-text"
          spellCheck={false}
          aria-label="Chemical formula input"
        />
        <div
          ref={contentRef}
          className={`molecular-formula-input border ${
            errorMessage ? "border-red-500" : "border-gray-300"
          } rounded p-2 text-gray-900 text-xl min-h-[2.5rem] max-h-32 overflow-auto cursor-text ${
            isFocused ? "ring-2 ring-blue-500 ring-opacity-50" : ""
          }`}
        />
        {shouldShowPlaceholder && (
          <span
            className={`absolute inset-0 w-full h-full flex items-start pl-2 pt-2 pointer-events-none select-none text-xl font-sans whitespace-pre-wrap break-words ${
              errorMessage ? "text-red-500" : "text-gray-400"
            }`}
          >
            {errorMessage || "Ex: Al, H₂O..."}
          </span>
        )}
      </div>
      <div
        className="result-html text-blue-600 text-left text-lg min-h-8 mt-3 -mb-2 w-full overflow-hidden break-words"
        style={{ wordWrap: "break-word", hyphens: "auto" }}
        dangerouslySetInnerHTML={
          resultHtml ? { __html: resultHtml } : undefined
        }
      />
    </div>
  );
};

export default MolecularFormulaInput;
