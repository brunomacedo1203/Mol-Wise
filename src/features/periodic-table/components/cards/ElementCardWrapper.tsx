import SingleCardPeriodicTable from "../SingleCardPeriodicTable";
import { Element } from "../../domain/types/element";
import React from "react";
import { useTranslations } from "next-intl";
import {
  CATEGORY_COLOR_MAP,
  RARE_EARTHS_LABEL,
  RARE_EARTHS_COLOR,
} from "../../domain/types/elementCategories";

interface ElementCardWrapperProps {
  element: Element;
  setHighlight: (
    e: Element | null,
    source: "hover" | "search" | "click" | null
  ) => void;
  highlightedElement?: Element;
  highlightSource?: "hover" | "search" | "click" | null;
  highlightedCategories?: string[];
}

export default function ElementCardWrapper({
  element,
  setHighlight,
  highlightedElement,
  highlightSource,
  highlightedCategories = [],
}: ElementCardWrapperProps) {
  const t = useTranslations("periodicTable");
  const translatedElementName = t(`elements.${element.symbol}`);

  const terrasRarasAtiva = highlightedCategories.includes(RARE_EARTHS_LABEL);
  const isTerraRara = !!element.isRareEarth;

  let highlightClass = "";
  if (terrasRarasAtiva && isTerraRara) {
    highlightClass = RARE_EARTHS_COLOR;
  } else if (highlightedCategories.includes(element.category)) {
    highlightClass = CATEGORY_COLOR_MAP[element.category] || "";
  }

  const isHighlighted =
    highlightedElement?.atomicNumber === element.atomicNumber;

  const ringHighlightClass =
    isHighlighted && highlightSource === "search"
      ? "ring-[6px] ring-yellow-300 dark:ring-yellow-200 scale-[1.15] z-20 shadow-2xl transition-transform duration-300"
      : isHighlighted && highlightSource === "click"
      ? "ring-4 ring-yellow-400 dark:ring-yellow-300 scale-105 z-30 shadow-xl transition-transform duration-200"
      : isHighlighted && highlightSource === "hover"
      ? "ring-4 ring-yellow-500 dark:ring-yellow-100 z-20 shadow-md transition-transform duration-200"
      : "";

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={t("ariaLabel", {
        name: translatedElementName,
        symbol: element.symbol,
        atomicNumber: element.atomicNumber,
      })}
      onMouseEnter={() => {
        if (highlightSource !== "search") {
          setHighlight(element, "hover");
        }
      }}
      onFocus={() => {
        if (highlightSource !== "search") {
          setHighlight(element, "hover");
        }
      }}
      onMouseLeave={() => {
        if (highlightSource === "hover") {
          setHighlight(null, null);
        }
      }}
      onClick={() => {
        const isSame =
          highlightedElement?.atomicNumber === element.atomicNumber;
        const isClick = highlightSource === "click";

        // Se é o mesmo elemento e já está com highlight de click, remove
        if (isSame && isClick) {
          setHighlight(null, null);
        }
        // Senão, aplica highlight de click
        else {
          setHighlight(element, "click");
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setHighlight(element, "click");
        }
      }}
      className={`focus:outline-none focus:ring-0 transition-all duration-150 ${highlightClass} ${ringHighlightClass}`}
    >
      <SingleCardPeriodicTable
        atomicNumber={element.atomicNumber}
        symbol={element.symbol}
        name={translatedElementName}
        molarMass={element.molarMass}
        showColummNumber={element.showColumnNumber}
        highlightClass={highlightClass}
      />
    </div>
  );
}
