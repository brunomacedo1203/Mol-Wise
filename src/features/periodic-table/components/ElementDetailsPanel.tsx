import React from "react";

interface ElementDetailsPanelProps {
  element: {
    symbol: string;
    name: string;
    atomicNumber: number;
    molarMass: number;
  } | null;
}

export default function ElementDetailsPanel({
  element,
}: ElementDetailsPanelProps) {
  if (!element) {
    return (
      <div className="w-[1440px] h-[120px] flex items-center justify-center text-zinc-400 text-xl mb-4">
        Hover over an element to see details
      </div>
    );
  }
  return (
    <div className="w-full h-[120px] flex items-center justify-center bg-white border-2 border-cyan-600 mb-4">
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold text-black">{element.symbol}</span>
        <span className="text-lg text-black">{element.name}</span>
        <span className="text-black">
          Atomic Number: {element.atomicNumber}
        </span>
        <span className="text-black">Atomic Mass: {element.molarMass}</span>
      </div>
    </div>
  );
}
