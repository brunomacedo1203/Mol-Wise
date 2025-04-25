"use client";
import { useRef, useEffect } from "react";
import { formatWithSub } from "@/shared/utils/formatWithSub";

interface MolecularFormulaInputProps {
  value?: string;
  onChange: (val: string) => void;
  onEnterPress: () => void;
}

const MolecularFormulaInput = ({
  value,
  onChange,
  onEnterPress,
}: MolecularFormulaInputProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Função utilitária para atualizar o conteúdo formatado
  const updateFormattedContent = (rawText: string) => {
    if (contentRef.current) {
      const formatted = formatWithSub(rawText);
      if (contentRef.current.innerHTML !== formatted) {
        contentRef.current.innerHTML = formatted;
        setCaretToEnd(contentRef.current);
      }
    }
  };

  // Atualiza o conteúdo do input quando value muda (modo controlado)
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
    <div
      ref={contentRef}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      className="border border-gray-300 p-2 min-w-[200px] font-sans text-black rounded-md focus:outline-none focus:border-blue-400"
      spellCheck="false"
    />
  );
};

export default MolecularFormulaInput;
