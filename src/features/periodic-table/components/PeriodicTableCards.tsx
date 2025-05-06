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

export default function PeriodicTableCards() {
  // Gera a matriz da tabela periódica, incluindo elementos, legendas e placeholders
  const matrix = generatePeriodicTableMatrix();
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);

  return (
    <div className="relative overflow-x-auto">
      {/* Renderiza os números das colunas (grupos) no topo da tabela */}
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

      {/* Painel de detalhes do elemento, exibido ao passar o mouse ou focar em um card */}
      {hoveredElement && (
        <div className="absolute left-[22%] top-9 z-50 w-[500px] flex justify-center">
          <ElementDetailsPanel element={hoveredElement} />
        </div>
      )}
      {/* Grid principal da tabela periódica */}
      <div className="grid grid-cols-[repeat(18,80px)] gap-0 min-w-[1440px]">
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
              hoveredElement={hoveredElement}
              setHoveredElement={setHoveredElement}
            />
          ) : (
            // Renderiza um espaço vazio para células sem conteúdo
            <div key={`empty-${idx}`} className="w-[80px] h-[80px]" />
          )
        )}
      </div>
    </div>
  );
}
