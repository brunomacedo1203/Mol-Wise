import SingleCardPeriodicTable from "../SingleCardPeriodicTable";
import { Element } from "../../types/element";
import React from "react";

interface ElementCardWrapperProps {
  element: Element;
  hoveredElement: Element | null;
  setHoveredElement: (e: Element | null) => void;
}

export default function ElementCardWrapper({
  element,
  hoveredElement,
  setHoveredElement,
}: ElementCardWrapperProps) {
  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`Elemento ${element.name}, símbolo ${element.symbol}, número atômico ${element.atomicNumber}`}
      onMouseEnter={() => setHoveredElement(element)}
      onMouseLeave={() => setHoveredElement(null)}
      onFocus={() => setHoveredElement(element)}
      onBlur={() => setHoveredElement(null)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setHoveredElement(hoveredElement ? null : element);
        }
      }}
      className="focus:outline-none focus:ring-2 focus:ring-cyan-600"
    >
      <SingleCardPeriodicTable
        atomicNumber={element.atomicNumber}
        symbol={element.symbol}
        name={element.name}
        molarMass={element.molarMass}
        showColummNumber={element.showColummNumber}
      />
    </div>
  );
}
