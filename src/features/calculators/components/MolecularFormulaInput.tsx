import { useRef } from "react";
import { formatWithSub } from "@/shared/utils/formatWithSub";

interface ElementData {
  symbol: string;
  molarMass: number;
}

/**
 * Input especializado para fórmulas químicas (ex: H2O, C6H12O6).
 * Formata números como subscritos e aciona callbacks ao digitar e pressionar Enter.
 * Reutilizável em qualquer contexto que exija input de fórmula molecular.
 */
const MolecularFormulaInput = ({
  onChange,
  onEnterPress,
}: {
  onChange: (val: string) => void;
  onEnterPress: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const rawText = e.currentTarget.textContent || "";
    onChange(rawText);

    const formattedText = formatWithSub(rawText);

    if (contentRef.current && contentRef.current.innerHTML !== formattedText) {
      contentRef.current.innerHTML = formattedText;
      setCaretToEnd(contentRef.current);
    }
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
