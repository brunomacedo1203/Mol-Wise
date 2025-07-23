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
  setSelectedElement: (e: Element) => void;
  highlightedCategories?: string[];
}

export default function ElementCardWrapper({
  element,
  setSelectedElement,
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

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={t("ariaLabel", {
        name: translatedElementName,
        symbol: element.symbol,
        atomicNumber: element.atomicNumber,
      })}
      onMouseEnter={() => setSelectedElement(element)}
      onFocus={() => setSelectedElement(element)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setSelectedElement(element);
        }
      }}
      className={`focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all duration-150 ${highlightClass}`}
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
