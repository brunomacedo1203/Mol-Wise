"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import { formatWithSub } from "@/shared/utils/formatWithSub";

// Props do componente de entrada de fórmula molecular
interface MolecularFormulaInputProps {
  value?: string;
  onChange: (val: string) => void;
  onEnterPress: () => void;
  errorMessage?: string | null;
  resultHtml?: string | null;
}

const MolecularFormulaInput = ({
  value,
  onChange,
  onEnterPress,
  errorMessage,
  resultHtml,
}: MolecularFormulaInputProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const updateFormattedContent = useCallback(
    (rawText: string, preserveCursor: boolean = false) => {
      if (!contentRef.current) return;

      const selection = window.getSelection();
      const cursorIndex =
        preserveCursor &&
        selection &&
        contentRef.current.contains(selection.anchorNode)
          ? (() => {
              const range = selection.getRangeAt(0);
              const preCursorRange = range.cloneRange();
              preCursorRange.selectNodeContents(contentRef.current);
              preCursorRange.setEnd(range.endContainer, range.endOffset);
              return preCursorRange.toString().length;
            })()
          : null;

      const formatted = formatWithSub(rawText);
      contentRef.current.innerHTML = formatted;

      if (preserveCursor && cursorIndex !== null && selection) {
        try {
          const walker = document.createTreeWalker(
            contentRef.current,
            NodeFilter.SHOW_TEXT,
            null
          );
          let currentNode: Node | null = null;
          let currentIndex = 0;

          while ((currentNode = walker.nextNode())) {
            const len = currentNode.textContent?.length || 0;
            if (cursorIndex <= currentIndex + len) {
              const range = document.createRange();
              range.setStart(currentNode, cursorIndex - currentIndex);
              range.collapse(true);
              selection.removeAllRanges();
              selection.addRange(range);
              break;
            }
            currentIndex += len;
          }
        } catch (e) {
          console.warn("Erro ao restaurar posição do cursor:", e);
        }
      }
    },
    []
  );

  useEffect(() => {
    if (typeof value === "string") {
      updateFormattedContent(value, true);
    }
  }, [value, updateFormattedContent]);

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const rawText = e.currentTarget.textContent || "";
      onChange(rawText);
      updateFormattedContent(rawText, true);
    },
    [onChange, updateFormattedContent]
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
    if (contentRef.current) {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(contentRef.current);
        range.collapse(false); // Move para o final
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (typeof value === "string") {
      updateFormattedContent(value);
    }
  }, [value, updateFormattedContent]);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text/plain");
      const selection = window.getSelection();

      if (selection && contentRef.current) {
        const range = selection.getRangeAt(0);
        const start = range.startOffset;
        const end = range.endOffset;
        const currentText = contentRef.current.textContent || "";

        const newText =
          currentText.substring(0, start) +
          pastedText +
          currentText.substring(end);
        onChange(newText);

        // Atualiza o conteúdo formatado e mantém o cursor na posição correta
        updateFormattedContent(newText, true);

        // Restaura o cursor após a posição do texto colado
        setTimeout(() => {
          if (contentRef.current) {
            const newRange = document.createRange();
            const textNode = contentRef.current.firstChild;
            if (textNode) {
              const newPosition = start + pastedText.length;
              newRange.setStart(
                textNode,
                Math.min(newPosition, textNode.textContent?.length || 0)
              );
              newRange.collapse(true);
              selection.removeAllRanges();
              selection.addRange(newRange);
            }
          }
        }, 0);
      }
    },
    [onChange, updateFormattedContent]
  );

  // Handlers para permitir seleção de texto no resultado
  const handleResultMouseDown = useCallback((e: React.MouseEvent) => {
    // Impede que o evento se propague para o Rnd
    e.stopPropagation();
  }, []);

  const handleResultMouseMove = useCallback((e: React.MouseEvent) => {
    // Permite seleção de texto durante o arraste do mouse
    e.stopPropagation();
  }, []);

  const handleResultClick = useCallback((e: React.MouseEvent) => {
    // Impede que o clique se propague para o Rnd
    e.stopPropagation();
  }, []);

  const shouldShowPlaceholder = !isFocused && (!value || value.length === 0);

  return (
    <div className="w-full">
      <div
        className="relative w-full min-h-[3rem] max-h-32"
        onClick={() => contentRef.current?.focus()}
      >
        <div
          ref={contentRef}
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPaste={handlePaste}
          className={`molecular-formula-input border 
            ${
              errorMessage
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-white/20"
            } 
            rounded-xl pt-2 pb-2 px-3 text-gray-900 dark:text-white 
            bg-white dark:bg-white/5 dark:border-white/20
            text-xl min-h-[3rem] max-h-48 cursor-text
            transition-all whitespace-pre-wrap break-words overflow-y-auto
            ${isFocused ? "ring-2 ring-blue-500 ring-opacity-50" : ""}
            outline-none
          `}
          spellCheck={false}
          aria-label="Chemical formula input"
        />
        {shouldShowPlaceholder && (
          <span
            className={`absolute inset-0 w-full h-full flex items-start pl-3 pt-3 pb-3 pointer-events-none select-none text-xl font-sans whitespace-pre-wrap break-words ${
              errorMessage
                ? "text-red-500 dark:text-red-400"
                : "text-gray-400 dark:text-white/40"
            }`}
          >
            {errorMessage || "Ex: Al, H₂O..."}
          </span>
        )}
      </div>
      <div
        ref={resultRef}
        className="result-html text-blue-600 dark:text-blue-400 text-left text-lg min-h-8 mt-3 -mb-2 w-full overflow-hidden break-words select-text cursor-text"
        style={{ wordWrap: "break-word", hyphens: "auto" }}
        dangerouslySetInnerHTML={
          resultHtml ? { __html: resultHtml } : undefined
        }
        onMouseDown={handleResultMouseDown}
        onMouseMove={handleResultMouseMove}
        onClick={handleResultClick}
      />
    </div>
  );
};

export default MolecularFormulaInput;
