"use client";
import { useRef, useEffect } from "react";
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

  const updateFormattedContent = (rawText: string) => {
    if (contentRef.current) {
      const formatted = formatWithSub(rawText);
      if (contentRef.current.innerHTML !== formatted) {
        contentRef.current.innerHTML = formatted;
        setCaretToEnd(contentRef.current);
      }
    }
  };

  useEffect(() => {
    if (typeof value === "string") {
      updateFormattedContent(value);
    }
  }, [value]);

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

  return (
    <div>
      <div
        ref={contentRef}
        className="molecular-formula-input border border-gray-300 rounded p-2 text-gray-900"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        spellCheck={false}
      />
      <div
        className="result-html text-zinc-800 text-center text-xl min-h-8 flex items-center justify-center mt-3 -mb-2 max-w-full break-all break-words"
        dangerouslySetInnerHTML={resultHtml ? { __html: resultHtml } : undefined}
      />
      {errorMessage && (
        <div className="error-message text-red-500 mt-1 text-center text-xs font-medium">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default MolecularFormulaInput;