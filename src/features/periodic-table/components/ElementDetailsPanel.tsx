import React, { useState } from "react";
import { Element } from "../domain/types/element";
import elementsData from "../data/elementsData";
import { formatWithSup } from "@/shared/utils/formatWithSup";
import { useTranslations } from "next-intl";

const ptNameToSymbol: Record<string, string> = {
  hidrogenio: "H",
  helio: "He",
  litio: "Li",
  berilio: "Be",
  boro: "B",
  carbono: "C",
  nitrogenio: "N",
  oxigenio: "O",
  fluor: "F",
  neonio: "Ne",
  sodio: "Na",
  magnesio: "Mg",
  aluminio: "Al",
  silicio: "Si",
  fosforo: "P",
  enxofre: "S",
  cloro: "Cl",
  argonio: "Ar",
  potassio: "K",
  calcio: "Ca",
  ferro: "Fe",
  cobre: "Cu",
  zinco: "Zn",
  prata: "Ag",
  ouro: "Au",
  chumbo: "Pb",
  mercurio: "Hg",
  estanho: "Sn",
  iodo: "I",
  bromo: "Br",
  manganes: "Mn",
  niquel: "Ni",
  cobalto: "Co",
};

function normalize(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function searchElement(term: string): Element | undefined {
  const normalized = normalize(term);
  if (!normalized) return undefined;

  let found = elementsData.find((el) =>
    normalize(el.symbol).startsWith(normalized)
  ) as Element | undefined;
  if (found) return found;

  found = elementsData.find((el) => normalize(el.name).includes(normalized)) as
    | Element
    | undefined;
  if (found) return found;

  const symbol = ptNameToSymbol[normalized];
  if (symbol) {
    found = elementsData.find((el) => el.symbol === symbol) as
      | Element
      | undefined;
    if (found) return found;
  }

  return undefined;
}

// Helper function to convert a string to camelCase matching JSON keys
function toCamelCase(str: string): string {
  // Convert to lowercase first
  let s = str.toLowerCase();
  // Replace spaces and hyphens with a single uppercase letter
  s = s.replace(/[-\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  // Ensure the very first character is lowercase
  return s.charAt(0).toLowerCase() + s.slice(1);
}

interface ElementDetailsPanelProps {
  element: Element | null;
}

export default function ElementDetailsPanel({
  element,
}: ElementDetailsPanelProps) {
  const [search, setSearch] = useState("");
  const searchedElement = searchElement(search);
  const elementToShow = searchedElement || element;
  const t = useTranslations("periodicTable");

  if (!elementToShow) return null;

  // LOG para depuração do valor da configuração eletrônica
  console.log("DADO NO PAINEL:", elementToShow.electronConfiguration);

  const fields: { label: string; value?: React.ReactNode }[] = [
    { label: t("element.atomicNumber"), value: elementToShow.atomicNumber },
    {
      label: t("element.molarMass"),
      value:
        elementToShow.molarMass !== undefined
          ? `${Number(elementToShow.molarMass).toFixed(2)} g/mol`
          : undefined,
    },
    {
      label: t("element.category"),
      value: elementToShow.category
        ? t(`element.categories.${toCamelCase(elementToShow.category)}`)
        : undefined,
    },
    {
      label: t("element.standardState"),
      value: elementToShow.standardState
        ? t(
            `element.standardStates.${elementToShow.standardState.toLowerCase()}`
          )
        : undefined,
    },
    {
      label: t("element.electronConfiguration"),
      value: (
        <span
          className="break-all"
          dangerouslySetInnerHTML={{
            __html: formatWithSup(elementToShow.electronConfiguration || ""),
          }}
        />
      ),
    },
    {
      label: t("element.oxidationStates"),
      value: elementToShow.oxidationStates,
    },
    { label: "Group", value: elementToShow.group },
    { label: "Period", value: elementToShow.period },
  ];

  return (
    <div
      className="
        w-[500px] h-auto bg-white border-2 border-cyan-500 rounded-lg shadow-lg flex overflow-hidden flex-col 
        dark:border-white/35 dark:bg-neutral-800/90
      "
    >
      {/* Campo de pesquisa no topo */}
      <div
        className="
          w-full px-4 pt-1 pb-1 bg-white border-b border-cyan-100 
          dark:border-white/20 dark:bg-neutral-800/90
        "
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("subtitle")}
          className="
            w-full px-3  border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 
            text-base text-black bg-white 
            dark:text-zinc-100 dark:bg-neutral-950/60 dark:border-white/20
          "
        />
      </div>
      <div
        className="
          flex flex-row flex-1 overflow-hidden 
          dark:border-white/10 dark:bg-neutral-800/90
        "
      >
        {/* Coluna do símbolo */}
        <div
          className="
            flex flex-col items-center justify-center w-[120px] bg-cyan-50 border-r border-cyan-200 py-4 
            dark:border-white/20 dark:bg-neutral-800/90
          "
        >
          <span className="text-5xl font-extrabold text-cyan-600 leading-none ">
            {elementToShow.symbol}
          </span>
          <span className="text-sm text-zinc-700 font-semibold mt-2 dark:text-zinc-100">
            {t(`elements.${elementToShow.symbol}`)}
          </span>
        </div>
        {/* Coluna das informações */}
        <div
          className="
            flex-1 flex flex-col justify-center px-4 py-2 text-zinc-800 text-[15px]
            dark:border-white/10 dark:bg-neutral-800/90 dark:text-zinc-100
          "
        >
          <ul className="flex flex-col gap-y-0 leading-tight">
            {fields.map(
              ({ label, value }) =>
                value !== undefined &&
                value !== "" && (
                  <li key={label}>
                    <span className="font-semibold">{label}:</span> {value}
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
