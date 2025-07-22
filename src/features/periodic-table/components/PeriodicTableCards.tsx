// src/features/periodic-table/components/PeriodicTableCards.tsx
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
import { Element } from "../domain/types/element";
import LegendCard from "./cards/LegendCard";
import LanthanidesLabelCard from "./cards/LanthanidesLabelCard";
import ActinidesLabelCard from "./cards/ActinidesLabelCard";
import ElementCardWrapper from "./cards/ElementCardWrapper";
import elementsData from "../data/elementsData";
import PeriodicTableFilterDropdown from "../components/common/PeriodicTableFilterDropdown";
import { usePeriodicTableStore } from "../store/periodicTableStore";

// Elemento padrão: Hidrogênio
const defaultElement = elementsData.find((e) => e.symbol === "H") as Element;
if (!defaultElement)
  throw new Error("Elemento padrão (Hidrogênio) não encontrado!");

export default function PeriodicTableCards() {
  const [selectedElement, setSelectedElement] =
    useState<Element>(defaultElement);
  const filters = usePeriodicTableStore((state) => state.filters);
  const setFilters = usePeriodicTableStore((state) => state.setFilters);
  const matrix = generatePeriodicTableMatrix();

  return (
    <div className="relative overflow-x-auto w-full dark:bg-transparent dark:text-white">
      <div className="flex flex-col items-center min-w-[1440px] mx-auto mt-3 relative">
        {/* Dropdown absoluto, sobrepondo a tabela */}
        <div className="absolute top-1 left-4 z-50">
          <label className="px-1  text-lg font-medium text-zinc-800 dark:text-zinc-200 block">
            <strong>Classificação</strong>
          </label>
          <PeriodicTableFilterDropdown
            options={[
              { value: "metal", label: "Metais" },
              { value: "nonmetal", label: "Não-metais" },
              { value: "metalloid", label: "Semi-metais" },
              { value: "nobleGas", label: "Gases Nobres" },
              // ...adicione outros filtros
            ]}
            values={filters}
            onChange={setFilters}
          />
        </div>

        {/* Espaço para garantir visualização limpa (ajuste se precisar) */}
        <div className="h-[110px]" />

        {/* Painel de detalhes */}
        <div className="absolute top-[142px] left-1/2 transform -translate-x-[78%] z-40 w-[500px] flex justify-center">
          <ElementDetailsPanel element={selectedElement} />
        </div>

        {/* Números das colunas */}
        <div className="grid grid-cols-[repeat(18,80px)] gap-0">
          {Array.from({ length: 18 }, (_, i) => (
            <div
              key={`colnum-${i}`}
              className="w-[80px] h-[30px] flex items-center justify-center text-cyan-600 text-lg font-bold bg-zinc-100 dark:bg-neutral-950 dark:text-white"
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Tabela periódica */}
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
                  element={element as Element}
                  setSelectedElement={setSelectedElement}
                />
              ) : (
                <div
                  key={`empty-${idx}`}
                  className="w-[80px] h-[80px] dark:bg-neutral-950"
                />
              )
            )}
        </div>
      </div>
    </div>
  );
}
