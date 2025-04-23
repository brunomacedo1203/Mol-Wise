import { useRef } from "react";

interface ElementData {
  symbol: string;
  molarMass: number;
}

const MolarMassCalculator = ({
  onChange,
  onEnterPress,
}: {
  onChange: (val: string) => void;
  onEnterPress: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const formatWithSub = (str: string) => {
    return str.replace(/(\d+)/g, "<sub>$1</sub>");
  };

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
      className="border border-gray-300 p-2 min-w-[200px] font-sans text-black"
      spellCheck="false"
    />
  );
};

export default MolarMassCalculator;
