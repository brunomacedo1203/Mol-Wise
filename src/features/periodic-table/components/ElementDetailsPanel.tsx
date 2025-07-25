// src/features/periodic-table/components/ElementDetailsPanel.tsx

import React, { useState, useEffect } from "react";
import { Element } from "../domain/types/element";
import { formatWithSup } from "@/shared/utils/formatWithSup";
import { useTranslations } from "next-intl";
import { usePeriodicTableStore } from "../store/periodicTableStore";
import { useElementSearch } from "../utils/elementSearch";
import { toCamelCase } from "@/shared/utils/stringUtils";

interface ElementDetailsPanelProps {
  element: Element | null;
}

export default function ElementDetailsPanel({
  element,
}: ElementDetailsPanelProps) {
  const [search, setSearch] = useState("");
  const searchElement = useElementSearch();
  const searchedElement = searchElement(search);
  const elementToShow = searchedElement || element;
  const t = useTranslations("periodicTable");
  const setHighlight = usePeriodicTableStore((state) => state.setHighlight);

  useEffect(() => {
    if (searchedElement) {
      setHighlight(searchedElement, "search");
    } else {
      setHighlight(null, null);
    }
  }, [searchedElement, setHighlight]);

  if (!elementToShow) return null;

  const generalFields = [
    {
      label: t("element.atomicNumber"),
      value: elementToShow.atomicNumber,
    },
    {
      label: t("element.molarMass"),
      value: `${Number(elementToShow.molarMass).toFixed(2)} g/mol`,
    },
    {
      label: t("element.category"),
      value: t(`element.categories.${toCamelCase(elementToShow.category)}`),
    },
    {
      label: t("element.standardState"),
      value: t(
        `element.standardStates.${elementToShow.standardState.toLowerCase()}`
      ),
    },
  ];

  const extraFields = [
    {
      label: t("element.electronegativity"),
      value: elementToShow.electronegativity,
    },
    { label: t("element.atomicRadius"), value: elementToShow.atomicRadius },
    {
      label: t("element.ionizationEnergy"),
      value: elementToShow.ionizationEnergy,
    },
    {
      label: t("element.electronAffinity"),
      value: elementToShow.electronAffinity,
    },
    { label: t("element.meltingPoint"), value: elementToShow.meltingPoint },
    { label: t("element.boilingPoint"), value: elementToShow.boilingPoint },
    { label: t("element.density"), value: elementToShow.density },
    { label: t("element.yearDiscovered"), value: elementToShow.yearDiscovered },
    { label: t("element.group"), value: elementToShow.group },
    { label: t("element.period"), value: elementToShow.period },
  ];

  return (
    <div className="bg-white border-2 border-cyan-400 dark:border-white/35 dark:bg-neutral-800/90 rounded-sm shadow min-w-[340px] max-w-[95vw]">
      {/* Search bar */}
      <div className="w-full px-4 pt-1 pb-1 bg-white border-b border-cyan-100 dark:border-white/20 dark:bg-neutral-800/90">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("subtitle")}
          className={`
            w-full px-2 border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 
            text-base text-black bg-white dark:text-zinc-100 dark:bg-neutral-950/60 dark:border-white/20
            `}
        />
      </div>

      {/* Card layout */}
      <div className="flex gap-4 px-4 py-3">
        {/* Symbol and name */}
        <div className="flex flex-col items-center justify-center min-w-[80px]">
          <p className="text-4xl font-bold text-cyan-700 dark:text-cyan-200">
            {elementToShow.symbol}
          </p>
          <p className="text-sm text-gray-700 dark:text-zinc-100">
            {t(`elements.${elementToShow.symbol}`)}
          </p>
        </div>

        {/* General and extra data */}
        <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-zinc-800 dark:text-zinc-100">
          {generalFields.map(({ label, value }) => (
            <div key={label}>
              <span className="font-semibold">{label}:</span> {value}
            </div>
          ))}
          {extraFields.map(
            ({ label, value }) =>
              value && (
                <div key={label}>
                  <span className="font-semibold">{label}:</span> {value}
                </div>
              )
          )}
        </div>
      </div>

      {/* Bottom section: Electron config and Oxidation states */}
      <div className="px-4 pb-3 pt-1 text-sm text-zinc-800 dark:text-zinc-100 border-t border-cyan-200 dark:border-white/20">
        <div className="mb-1">
          <span className="font-semibold">
            {t("element.electronConfiguration")}:
          </span>{" "}
          <span
            className="break-words"
            dangerouslySetInnerHTML={{
              __html: formatWithSup(elementToShow.electronConfiguration || ""),
            }}
          />
        </div>
        <div>
          <span className="font-semibold">{t("element.oxidationStates")}:</span>{" "}
          {elementToShow.oxidationStates}
        </div>
      </div>
    </div>
  );
}
