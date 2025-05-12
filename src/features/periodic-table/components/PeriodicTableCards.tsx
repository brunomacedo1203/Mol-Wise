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
  // Estado agora é sempre um elemento, nunca null
  const [selectedElement, setSelectedElement] = useState<Element>(
    defaultElement!
  );
  const matrix = generatePeriodicTableMatrix();

  return (
    <div className="relative overflow-x-auto dark:bg-black dark:text-white">
      {/* Renderiza os números das colunas (grupos) no topo da tabela */}
      <div className="grid grid-cols-[repeat(18,80px)] gap-0 min-w-[1440px]">
        {Array.from({ length: 18 }, (_, i) => (
          <div
            key={`colnum-${i}`}
            className="w-[80px] h-[30px] flex items-center justify-center text-cyan-600 text-lg font-bold bg-zinc-100 dark:bg-zinc-800 dark:text-white"
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Painel sempre visível */}
      <div className="absolute left-[22%] top-9 z-50 w-[500px] flex justify-center">
        <ElementDetailsPanel element={selectedElement} />
      </div>
      {/* Grid principal da tabela periódica */}
      <div className="grid grid-cols-[repeat(18,80px)] gap-0 min-w-[1440px] mt-4">
        {matrix.flat().map((element, idx) =>
          // Renderiza o card de legenda no canto inferior esquerdo
          isLegendCard(element) ? (
            <LegendCard key={`legend-${idx}`} />
          ) : // Renderiza o card de lantanídeos na posição apropriada
          isLanthanidesLabel(element) ? (
            <LanthanidesLabelCard key={`lanthanides-${idx}`} />
          ) : // Renderiza o card de actinídeos na posição apropriada
          isActinidesLabel(element) ? (
            <ActinidesLabelCard key={`actinides-${idx}`} />
          ) : // Não renderiza nada para placeholders de legenda
          isLegendPlaceholder(element) ? null : isElementCard(element) ? ( // Renderiza o card de elemento químico padrão
            <ElementCardWrapper
              key={element.atomicNumber}
              element={element}
              setSelectedElement={setSelectedElement}
            />
          ) : (
            // Renderiza um espaço vazio para células sem conteúdo
            <div
              key={`empty-${idx}`}
              className="w-[80px] h-[80px] dark:bg-zinc-800"
            />
          )
        )}
      </div>
    </div>
  );
}
