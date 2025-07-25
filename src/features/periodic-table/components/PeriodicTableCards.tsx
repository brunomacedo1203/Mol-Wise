"use client";
import React from "react";
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
import { useTranslations } from "next-intl";
import { getFilterOptions } from "../config/filterOptions";
import { handleFilterChangeFactory } from "../utils/filterHandlers";

// Elemento padrão: Hidrogênio
const defaultElement = elementsData.find((e) => e.symbol === "H") as Element;
if (!defaultElement)
  throw new Error("Elemento padrão (Hidrogênio) não encontrado!");

export default function PeriodicTableCards() {
  const filters = usePeriodicTableStore((state) => state.filters);
  const setFilters = usePeriodicTableStore((state) => state.setFilters);

  const highlightedElement = usePeriodicTableStore(
    (state) => state.highlightedElement
  );
  const highlightSource = usePeriodicTableStore(
    (state) => state.highlightSource
  );
  const setHighlight = usePeriodicTableStore((state) => state.setHighlight);

  const t = useTranslations("periodicTable");
  const matrix = generatePeriodicTableMatrix();
  const filterOptions = getFilterOptions(t);
  const handleFilterChange = handleFilterChangeFactory(
    filterOptions,
    setFilters,
    filters
  );

  return (
    <div className="relative overflow-x-auto w-full dark:bg-transparent dark:text-white">
      <div
        className="flex flex-col items-center min-w-[1440px] mx-auto mt-3 relative"
        onMouseLeave={() => {
          if (highlightSource === "hover") {
            setHighlight(null, null);
          }
        }}
      >
        {/* Filtro no topo */}
        <div className="absolute top-1 left-4 z-50">
          <label className="px-1 text-lg font-medium text-zinc-800 dark:text-zinc-200 block">
            <strong>{t("filterLabel")}</strong>
          </label>
          <PeriodicTableFilterDropdown
            options={filterOptions}
            values={
              filters.length === filterOptions.length - 1
                ? ["ALL", ...filters]
                : filters
            }
            onChange={handleFilterChange}
            placeholder={t("filterPlaceholder")}
          />
        </div>

        {/* Painel de Detalhes */}
        <div className="h-[90px]" />
        <div className="w-full flex justify-center absolute top-[130px] left-0 z-40 pointer-events-none">
          <div className="pointer-events-auto max-w-[650px] w-full flex justify-center ml-[-300px]">
            <ElementDetailsPanel
              element={highlightedElement || defaultElement}
            />
          </div>
        </div>

        {/* Números das colunas */}
        <div className="grid grid-cols-[repeat(18,80px)] gap-0">
          {Array.from({ length: 18 }, (_, i) => (
            <div
              key={`colnum-${i}`}
              className={`
                w-[80px] h-[30px] flex items-center justify-center text-cyan-600 
                text-xl font-bold bg-zinc-100 dark:bg-neutral-950 dark:text-white
                `}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Tabela Periódica */}
        <div className="grid grid-cols-[repeat(18,80px)] gap-0 mt-8">
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
                  setHighlight={setHighlight}
                  highlightSource={highlightSource}
                  highlightedElement={highlightedElement || undefined}
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
