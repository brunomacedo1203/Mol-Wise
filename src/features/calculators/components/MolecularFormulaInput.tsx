"use client";
import { useRef, useEffect, useCallback } from "react";
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

  const setCaretToEnd = (el: HTMLDivElement) => {
    const range = document.createRange();
    const sel = window.getSelection();
    if (sel) {
      range.selectNodeContents(el);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const updateFormattedContent = useCallback((rawText: string) => {
    if (contentRef.current) {
      const formatted = formatWithSub(rawText);
      if (contentRef.current.innerHTML !== formatted) {
        contentRef.current.innerHTML = formatted;
        setCaretToEnd(contentRef.current);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof value === "string") {
      updateFormattedContent(value);
    }
  }, [value, updateFormattedContent]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const rawText = e.currentTarget.textContent || "";
    onChange(rawText);
    updateFormattedContent(rawText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnterPress();
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full min-h-[2.5rem] max-h-32">
        <div
          ref={contentRef}
          className={`molecular-formula-input border ${
            errorMessage ? "border-red-500" : "border-gray-300"
          } rounded p-2 text-gray-900 text-xl min-h-[2.5rem] max-h-32 overflow-auto`}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          aria-label="Chemical formula input"
        />
        {(!value || value.length === 0) && (
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
