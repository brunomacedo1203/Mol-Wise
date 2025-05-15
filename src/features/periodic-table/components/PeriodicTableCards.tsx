"use client";
import React, { useState } from "react";
import { generatePeriodicTableMatrix } from "@/features/periodic-table/utils/periodicTableMatrix";
import ElementDetailsPanel from "./ElementDetailsPanel";
import {
  isLegendCard,
  isLanthanidesLabel,
  isActinidesLabel,
  isLegendPlaceholder,
  isElementCard,
} from "../utils/periodicTableUtils";
import { Element } from "../types/element";
import LegendCard from "./cards/LegendCard";
import LanthanidesLabelCard from "./cards/LanthanidesLabelCard";
import ActinidesLabelCard from "./cards/ActinidesLabelCard";
import ElementCardWrapper from "./cards/ElementCardWrapper";
import elementsData from "../services/elementsData";

// Elemento padrão: Hidrogênio
const defaultElement = elementsData.find((e) => e.symbol === "H");
if (!defaultElement)
  throw new Error("Elemento padrão (Hidrogênio) não encontrado!");

export default function PeriodicTableCards() {
  const [selectedElement, setSelectedElement] = useState<Element>(
    defaultElement!
  );
  const matrix = generatePeriodicTableMatrix();

  return (
    <div className="relative overflow-x-auto w-full dark:bg-zinc-800 dark:text-white">
      <div className="flex flex-col items-center min-w-[1440px] mx-auto mt-4 relative">
        {/* Details Panel*/}
        <div className="absolute top-8 left-1/2 transform -translate-x-[78%] z-50 w-[500px] flex justify-center">
          <ElementDetailsPanel element={selectedElement} />
        </div>

        {/* Column numbers */}
        <div className="grid grid-cols-[repeat(18,80px)] gap-0">
          {Array.from({ length: 18 }, (_, i) => (
            <div
              key={`colnum-${i}`}
              className="w-[80px] h-[30px] flex items-center justify-center text-cyan-600 text-lg font-bold bg-zinc-100 dark:bg-zinc-800 dark:text-white"
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Periodic table */}
        <div className="grid grid-cols-[repeat(18,80px)] gap-0">
          {matrix
            .flat()
            .map((element, idx) =>
              isLegendCard(element) ? (
                <LegendCard key={`legend-${idx}`} />
              ) : isLanthanidesLabel(element) ? (
                <LanthanidesLabelCard key={`lanthanides-${idx}`} />
              ) : isActinidesLabel(element) ? (
                <ActinidesLabelCard key={`actinides-${idx}`} />
              ) : isLegendPlaceholder(element) ? null : isElementCard(
                  element
                ) ? (
                <ElementCardWrapper
                  key={element.atomicNumber}
                  element={element}
                  setSelectedElement={setSelectedElement}
                />
              ) : (
                <div
                  key={`empty-${idx}`}
                  className="w-[80px] h-[80px] dark:bg-zinc-800"
                />
              )
            )}
        </div>
      </div>
    </div>
  );
}
