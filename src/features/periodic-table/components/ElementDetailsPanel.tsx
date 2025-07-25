// src/features/periodic-table/components/ElementDetailsPanel.tsx

import React, { useState, useEffect } from "react";
import { Element } from "../domain/types/element";
import { formatWithSup } from "@/shared/utils/formatWithSup";
import { useTranslations } from "next-intl";
import { usePeriodicTableStore } from "../store/periodicTableStore";
import { useElementSearch } from "../utils/elementSearch";
import { getElementFields } from "../utils/elementFields";

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

  const { generalFields, extraFields } = getElementFields(elementToShow, t);

  return (
    <div className="bg-white border-2 border-cyan-400 dark:border-white/35 dark:bg-neutral-800/90 rounded-sm shadow min-w-[340px] max-w-[95vw]">
      {/* barra de input */}
      <div className="w-full px-4 pt-1 pb-1 bg-white border-b border-cyan-100 dark:border-white/20 dark:bg-neutral-800/90">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("subtitle")}
          className={`
            w-full px-2 py-1 h-10 border-cyan-500 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 
            text-sm text-black bg-white dark:text-zinc-100 dark:bg-neutral-950/60 dark:border-white/20
          `}
        />
      </div>

      {/* Card layout */}
      <div className="flex gap-4 px-4 py-1">
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
          <div className="flex flex-col gap-y-1">
            {generalFields
              .filter(
                ({ value }) =>
                  value !== undefined && value !== null && value !== ""
              )
              .map(({ label, value }) => (
                <div key={label}>
                  <span className="font-semibold">{label}:</span> {value}
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-y-1">
            {extraFields
              .filter(
                ({ value }) =>
                  value !== undefined && value !== null && value !== ""
              )
              .map(({ label, value }) => (
                <div key={label}>
                  <span className="font-semibold">{label}:</span> {value}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom section: Electron config and Oxidation states */}
      <div className="px-4 pb-1 pt-1 text-sm text-zinc-800 dark:text-zinc-100 border-t border-cyan-200 dark:border-white/20">
        <div>
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
