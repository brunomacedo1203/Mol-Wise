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
    <div>
      {/* O input propriamente dito (contenteditable) */}
      <div
        ref={contentRef}
        className="molecular-formula-input"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        style={{ minHeight: 32, border: '1px solid #ccc', borderRadius: 4, padding: '4px 8px', color: '#27272a' }}
      />
      {/* Resultado formatado (massa molar) */}
      {resultHtml && (
        <div
          className="result-html text-zinc-800 text-center text-xl"
          style={{
            marginTop: 20, 
            maxWidth: '100%',
            wordBreak: 'break-all',
            overflowWrap: 'anywhere',
            textAlign: 'center',
            display: 'block'
          }}
          dangerouslySetInnerHTML={{ __html: resultHtml }}
        />
      )}
      {/* Mensagem de erro associada ao input */}
      {errorMessage && (
        <div className="error-message" style={{ color: 'red', marginTop: 4, textAlign: 'center', fontSize: '0.85rem', fontWeight: 500 }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default MolecularFormulaInput;
