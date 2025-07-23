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

// 1. Options do filtro (usando nomes ORIGINAIS)
const filterOptions = [
  { value: "ALL", label: "Todos" },
  { value: "Alkali metal", label: "Metal Alcalino" },
  { value: "Alkaline earth metal", label: "Metal Alcalino-terroso" },
  { value: "Transition metal", label: "Metal de Transição" },
  { value: "Post-transition metal", label: "Metal Pós-transição" },
  { value: "Metalloid", label: "Semimetal" },
  { value: "Nonmetal", label: "Não-metal" },
  { value: "Halogen", label: "Halogênio" },
  { value: "Noble gas", label: "Gás Nobre" },
  { value: "Lanthanide", label: "Lantanídeo" },
  { value: "Actinide", label: "Actinídeo" },
];

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

  // Handler para seleção de categorias, incluindo "Todos"
  function handleFilterChange(values: string[]) {
    // Se o usuário clicou em "Todos" e nem tudo estava selecionado, seleciona tudo
    if (values.includes("ALL") && filters.length !== filterOptions.length - 1) {
      setFilters(
        filterOptions
          .filter((opt) => opt.value !== "ALL")
          .map((opt) => opt.value)
      );
    }
    // Se o usuário desmarcou "Todos" (clicando no X do chip "Todos" e só ele foi removido)
    else if (
      filters.length === filterOptions.length - 1 &&
      !values.includes("ALL") &&
      values.length === filterOptions.length - 1
    ) {
      setFilters([]);
    }
    // Se o usuário desmarcou uma opção individual após selecionar "Todos"
    else {
      setFilters(values.filter((v) => v !== "ALL"));
    }
  }

  return (
    <div className="relative overflow-x-auto w-full dark:bg-transparent dark:text-white">
      <div className="flex flex-col items-center min-w-[1440px] mx-auto mt-3 relative">
        {/* Dropdown absoluto, sobrepondo a tabela */}
        <div className="absolute top-1 left-4 z-50">
          <label className="px-1 text-lg font-medium text-zinc-800 dark:text-zinc-200 block">
            <strong>Classificação</strong>
          </label>
          <PeriodicTableFilterDropdown
            options={filterOptions}
            values={
              filters.length === filterOptions.length - 1
                ? ["ALL", ...filters]
                : filters
            }
            onChange={handleFilterChange}
          />
        </div>

        <div className="h-[90px]" />
        <div className="w-full flex justify-center absolute top-[130px] left-0 z-40 pointer-events-none">
          <div className="pointer-events-auto max-w-[650px] w-full flex justify-center ml-[-300px]">
            <ElementDetailsPanel element={selectedElement} />
          </div>
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
                  highlightedCategories={filters}
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
