import React from "react";
import { Element } from "../types/element";

interface ElementDetailsPanelProps {
  element: Element | null;
}

export default function ElementDetailsPanel({
  element,
}: ElementDetailsPanelProps) {
  if (!element) {
    return null;
  }
  return (
    <div className="w-[500px] h-auto bg-white border-2 border-cyan-600 rounded-lg shadow-lg flex overflow-hidden">
      {/* Coluna do símbolo */}
      <div className="flex flex-col items-center justify-center w-[120px] bg-cyan-50 border-r border-cyan-200 py-4">
        <span className="text-5xl font-extrabold text-cyan-600 leading-none">
          {element.symbol}
        </span>
        <span className="text-sm text-zinc-700 font-semibold mt-2">
          {element.name}
        </span>
      </div>
      {/* Coluna das informações */}
      <div className="flex-1 flex flex-col justify-center px-4 py-2 text-zinc-800 text-[15px]">
        <ul className="flex flex-col gap-y-0.5">
          {element.symbol && (
            <li>
              <span className="font-semibold">Symbol:</span> {element.symbol}
            </li>
          )}
          {element.name && (
            <li>
              <span className="font-semibold">Name:</span> {element.name}
            </li>
          )}
          {element.atomicNumber !== undefined && (
            <li>
              <span className="font-semibold">Atomic number:</span>{" "}
              {element.atomicNumber}
            </li>
          )}
          {element.molarMass !== undefined && (
            <li>
              <span className="font-semibold">Molar mass:</span>{" "}
              {element.molarMass}
            </li>
          )}
          {element.category && (
            <li>
              <span className="font-semibold">Category:</span>{" "}
              {element.category}
            </li>
          )}
          {element.standardState && (
            <li>
              <span className="font-semibold">Standard state:</span>{" "}
              {element.standardState}
            </li>
          )}
          {element.electronConfiguration && (
            <li>
              <span className="font-semibold">Electron configuration:</span>{" "}
              <span className="break-all">{element.electronConfiguration}</span>
            </li>
          )}
          {element.oxidationStates && (
            <li>
              <span className="font-semibold">Oxidation states:</span>{" "}
              {element.oxidationStates}
            </li>
          )}
          {element.group !== undefined && (
            <li>
              <span className="font-semibold">Group:</span> {element.group}
            </li>
          )}
          {element.period !== undefined && (
            <li>
              <span className="font-semibold">Period:</span> {element.period}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
