"use client";
import { useState, useRef } from "react";
import elementsData from "@/features/periodic-table/services/elementsData";

interface ElementData {
  symbol: string;
  molarMass: number;
}

const SubscriptInput = ({
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

export default function MolarMassCalculatorPage() {
  const [formula, setFormula] = useState<string>("");
  const [molarMass, setMolarMass] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const calculateMolarMass = () => {
    let totalMolarMass = 0;

    if (formula === "") {
      setErrorMessage("Please enter an element symbol or a formula.");
      return;
    }

    const formattedFormula = formula
      .replace(/\s+/g, "")
      .replace(
        /(^|[^a-zA-Z])([a-z])/g,
        (match, p1, p2) => p1 + p2.toUpperCase()
      );

    try {
      totalMolarMass = calculateFromFormula(formattedFormula);
      // Format the formula result with subscripts
      const formattedMolarMass = `The molar mass of ${formatWithSub(
        formattedFormula
      )} is: ${totalMolarMass.toFixed(2)} g/mol`;
      setMolarMass(formattedMolarMass);
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const formatWithSub = (str: string) => {
    return str.replace(/(\d+)/g, "<sub>$1</sub>");
  };

  const calculateFromFormula = (formula: string): number => {
    const stack: { element: string; count: number }[] = [];
    let currentElement = "";
    let currentCount = "";
    const length = formula.length;

    for (let i = 0; i < length; i++) {
      const char = formula[i];

      if (/[A-Z]/.test(char)) {
        if (currentElement) {
          stack.push({
            element: currentElement,
            count: currentCount ? parseInt(currentCount, 10) : 1,
          });
          currentElement = "";
          currentCount = "";
        }
        currentElement += char;
      } else if (/[a-z]/.test(char)) {
        currentElement += char;
      } else if (/\d/.test(char)) {
        currentCount += char;
      } else if (char === "(" || char === "[") {
        if (currentElement) {
          stack.push({
            element: currentElement,
            count: currentCount ? parseInt(currentCount, 10) : 1,
          });
          currentElement = "";
          currentCount = "";
        }
        stack.push({ element: char, count: 1 });
      } else if (char === ")" || char === "]") {
        if (currentElement) {
          stack.push({
            element: currentElement,
            count: currentCount ? parseInt(currentCount, 10) : 1,
          });
          currentElement = "";
          currentCount = "";
        }

        const group: { element: string; count: number }[] = [];
        while (stack.length > 0) {
          const top = stack.pop();
          if (top && (top.element === "(" || top.element === "[")) {
            break;
          }
          if (top) {
            group.push(top);
          }
        }

        let groupMultiplier = "";
        while (i + 1 < length && /\d/.test(formula[i + 1])) {
          groupMultiplier += formula[++i];
        }

        const finalMultiplier = groupMultiplier
          ? parseInt(groupMultiplier, 10)
          : 1;

        for (const item of group) {
          stack.push({
            element: item.element,
            count: item.count * finalMultiplier,
          });
        }
      }
    }

    if (currentElement) {
      stack.push({
        element: currentElement,
        count: currentCount ? parseInt(currentCount, 10) : 1,
      });
    }

    let totalMolarMass = 0;
    while (stack.length > 0) {
      const item = stack.pop();
      if (item) {
        const elementSymbol: ElementData | undefined = elementsData.find(
          (i) => i.symbol === item.element
        );
        if (elementSymbol) {
          totalMolarMass += elementSymbol.molarMass * item.count;
        } else {
          throw new Error(
            `The element with the symbol "${item.element}" was not found in the periodic table`
          );
        }
      }
    }

    return totalMolarMass;
  };

  return (
    <>
      <div className="flex flex-col gap-5 p-4 max-w-lg w-full">
        <h1 className="text-xl text-zinc-800">
          Molar Mass Calculator
        </h1>
        <h2 className="text-base text-zinc-600 mb-2">
          Calculate the molar mass of compounds.
        </h2>
        <span className="text-zinc-800">
          Enter a Chemical Formula or Element Symbol
        </span>
        <SubscriptInput
          onChange={(val) => setFormula(val)}
          onEnterPress={calculateMolarMass}
        />
        <div className="flex justify-center items-center">
          <button
            className="btn-calculate w-40 h-12"
            onClick={calculateMolarMass}
          >
            <span className="text-2xl text-center">Calculate</span>
          </button>
        </div>
        <span className="flex justify-center items-center text-zinc-800 text-center text-2xl">
          {molarMass && <div dangerouslySetInnerHTML={{ __html: molarMass }} />}
        </span>
        <span className="flex justify-center items-center text-zinc-800 text-center text-2xl">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </span>
      </div>
    </>
  );
}
