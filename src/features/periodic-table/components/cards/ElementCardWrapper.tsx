import SingleCardPeriodicTable from "../SingleCardPeriodicTable";
import { Element } from "../../types/element";
import React from "react";

interface ElementCardWrapperProps {
  element: Element;
  setSelectedElement: (e: Element) => void;
}

export default function ElementCardWrapper({
  element,
  setSelectedElement,
}: ElementCardWrapperProps) {
  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`Elemento ${element.name}, símbolo ${element.symbol}, número atômico ${element.atomicNumber}`}
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
        name={element.name}
        molarMass={element.molarMass}
        showColummNumber={element.showColummNumber}
      />
    </div>
  );
}
