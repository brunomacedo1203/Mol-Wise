"use client";
import React, { useState } from "react";
import SingleCardPeriodicTable from "./SingleCardPeriodicTable";
import { generatePeriodicTableMatrix } from "@/features/periodic-table/utils/periodicTableMatrix";
import ElementDetailsPanel from "./ElementDetailsPanel";

function LegendCard() {
  return (
    <div className="w-[160px] h-[160px] col-span-2 row-span-2 border-2 border-black bg-white flex flex-col justify-between p-2">
      <div className="flex w-full">
        <span className="font-normal text-[14px] leading-tight text-black">
          ATOMIC NUMBER
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <span className="font-bold text-2xl text-black">SYMBOL</span>
        <span className="text-black text-sm text-center mt-1">NAME</span>
      </div>
      <div className="flex w-full items-end justify-center">
        <span className="font-normal text-[14px] leading-tight text-center text-black">
          ATOMIC MASS
        </span>
      </div>
    </div>
  );
}

function LanthanidesLabelCard() {
  return (
    <div className="w-[80px] h-[80px] flex items-center justify-center border-2 border-black bg-white text-xs text-black text-center">
      lantanídeos
    </div>
  );
}
function ActinidesLabelCard() {
  return (
    <div className="w-[80px] h-[80px] flex items-center justify-center border-2 border-black bg-white text-xs text-black text-center">
      actinídeos
    </div>
  );
}
function isLegendCard(element: any): element is { type: "legend" } {
  return element && element.type === "legend";
}
function isLanthanidesLabel(
  element: any
): element is { type: "lanthanides-label" } {
  return element && element.type === "lanthanides-label";
}
function isActinidesLabel(
  element: any
): element is { type: "actinides-label" } {
  return element && element.type === "actinides-label";
}
function isLegendPlaceholder(
  element: any
): element is { type: "legend-placeholder" } {
  return element && element.type === "legend-placeholder";
}
function isElementCard(element: any): element is {
  atomicNumber: number;
  symbol: string;
  name: string;
  molarMass: number;
  showColummNumber?: number;
} {
  return element && typeof element.atomicNumber === "number";
}

export default function PeriodicTableCards() {
  const matrix = generatePeriodicTableMatrix();
  const [hoveredElement, setHoveredElement] = useState<null | {
    symbol: string;
    name: string;
    atomicNumber: number;
    molarMass: number;
  }>(null);

  return (
    <div className="relative overflow-x-auto">
      <div className="grid grid-cols-[repeat(18,80px)] gap-0 min-w-[1440px]">
        {Array.from({ length: 18 }, (_, i) => (
          <div
            key={`colnum-${i}`}
            className="w-[80px] h-[30px] flex items-center justify-center text-cyan-600 text-lg font-bold bg-zinc-100"
          >
            {i + 1}
          </div>
        ))}
      </div>

      {hoveredElement && (
        <div className="flex justify-center w-full min-w-[1440px]">
          <ElementDetailsPanel element={hoveredElement} />
        </div>
      )}
      <div className="grid grid-cols-[repeat(18,80px)] gap-0 min-w-[1440px]">
        {matrix.flat().map((element, idx) =>
          isLegendCard(element) ? (
            <LegendCard key={`legend-${idx}`} />
          ) : isLanthanidesLabel(element) ? (
            <LanthanidesLabelCard key={`lanthanides-${idx}`} />
          ) : isActinidesLabel(element) ? (
            <ActinidesLabelCard key={`actinides-${idx}`} />
          ) : isLegendPlaceholder(element) ? null : isElementCard(element) ? (
            <div
              key={element.atomicNumber}
              onMouseEnter={() => setHoveredElement(element)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <SingleCardPeriodicTable
                atomicNumber={element.atomicNumber}
                symbol={element.symbol}
                name={element.name}
                molarMass={element.molarMass}
                showColummNumber={element.showColummNumber}
              />
            </div>
          ) : (
            <div key={`empty-${idx}`} className="w-[80px] h-[80px]" />
          )
        )}
      </div>
    </div>
  );
}
