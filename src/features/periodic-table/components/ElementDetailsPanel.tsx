"use client";

import React, { useState, useEffect } from "react";
import { Element } from "../domain/types/element";
import { formatWithSup } from "@/shared/utils/formatWithSup";
import { useTranslations } from "next-intl";
import { usePeriodicTableStore } from "../store/periodicTableStore";
import { useElementSearch } from "../utils/elementSearch";
import { getElementFields } from "../utils/elementFields";
import { trackElementSearch } from "../events/searchEvents";

interface ElementDetailsPanelProps {
  element: Element | null;
}

export default function ElementDetailsPanel({
  element,
}: ElementDetailsPanelProps) {
  const [search, setSearch] = useState("");
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const searchElement = useElementSearch();
  const searchedElement = searchElement(search);
  const elementToShow = searchedElement || element;

  const t = useTranslations("periodicTable");
  const tElements = useTranslations("elements");
  const { setHighlight, setSearchValue } = usePeriodicTableStore();

  // Aguarda o usuário parar de digitar por 500ms antes de enviar a busca
  const handleSearch = (value: string) => {
    setSearch(value);
    setSearchValue(value);

    if (debounceTimer) clearTimeout(debounceTimer);

    if (value.trim() !== "") {
      const timer = setTimeout(() => {
        if (searchElement(value)) {
          trackElementSearch({ search_term: value });
        }
      }, 500);
      setDebounceTimer(timer);
    }
  };

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
    <div
      className={`
        bg-white border-2 border-cyan-400 dark:border-white/35 dark:bg-neutral-800/90 
        rounded-sm shadow min-w-[340px] max-w-[95vw]
      `}
    >
      {/* Campo de busca */}
      <div className="w-full px-4 pt-1 pb-1 bg-white border-b border-cyan-100 dark:border-white/20 dark:bg-neutral-800/90">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={t("subtitle")}
          className={`
            w-full px-2 py-1 h-10 border-cyan-500 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 
            text-lg text-black bg-white dark:text-zinc-100 dark:bg-neutral-950/60 dark:border-white/20
            placeholder:text-gray-400 dark:placeholder:text-zinc-500
          `}
        />
      </div>

      {/* Informações principais */}
      <div className="flex gap-2 px-4 py-1">
        <div className="flex flex-col items-center justify-center min-w-[80px]">
          <p className="text-4xl font-bold text-cyan-700 dark:text-cyan-200">
            {elementToShow.symbol}
          </p>
          <p className="text-sm text-gray-700 dark:text-zinc-100">
            {tElements(elementToShow.symbol)}
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-zinc-800 dark:text-zinc-100 leading-tight">
          <div className="flex flex-col gap-y-1">
            {generalFields.map(
              (field: { label: string; value: string | number }) => (
                <div key={field.label}>
                  <span className="font-semibold">{field.label}:</span>{" "}
                  {field.value}
                </div>
              )
            )}
          </div>
          <div className="flex flex-col gap-y-1">
            {extraFields.map(
              (field: {
                label: string;
                value: string | number | undefined;
              }) => (
                <div key={field.label}>
                  <span className="font-semibold">{field.label}:</span>{" "}
                  {field.value ?? "-"}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Configuração eletrônica e estados de oxidação */}
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
