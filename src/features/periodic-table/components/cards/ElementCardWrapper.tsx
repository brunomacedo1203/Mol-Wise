import SingleCardPeriodicTable from "../SingleCardPeriodicTable";
import { Element } from "../../types/element";
import React from "react";
import { useTranslations } from "next-intl";

interface ElementCardWrapperProps {
  element: Element;
  setSelectedElement: (e: Element) => void;
}

export default function ElementCardWrapper({
  element,
  setSelectedElement,
}: ElementCardWrapperProps) {
  const t = useTranslations("periodicTable");
  const translatedElementName = t(`elements.${element.symbol}`);

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
      className="focus:outline-none focus:ring-2 focus:ring-cyan-600"
    >
      <SingleCardPeriodicTable
        atomicNumber={element.atomicNumber}
        symbol={element.symbol}
        name={translatedElementName}
        molarMass={element.molarMass}
        showColummNumber={element.showColummNumber}
      />
    </div>
  );
}
