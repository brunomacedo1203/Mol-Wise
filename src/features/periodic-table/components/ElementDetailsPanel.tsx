import React, { useState } from "react";
import { Element } from "../types/element";
import elementsData from "../services/elementsData";

// Mapeamento de nomes em português para símbolo
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
  // ... adicione outros conforme necessário
};

function normalize(str: string) {
  return str
    .normalize("NFD")
    .replace(/\u0300-\u036f/g, "") // Remove acentos
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ""); // Remove caracteres especiais
}

function searchElement(term: string): Element | undefined {
  const normalized = normalize(term);
  if (!normalized) return undefined;

  // Busca por símbolo (começo)
  let found = elementsData.find((el) =>
    normalize(el.symbol).startsWith(normalized)
  );
  if (found) return found;

  // Busca por nome em inglês (contém)
  found = elementsData.find((el) => normalize(el.name).includes(normalized));
  if (found) return found;

  // Busca por nome em português (mapeado)
  const symbol = ptNameToSymbol[normalized];
  if (symbol) {
    found = elementsData.find((el) => el.symbol === symbol);
    if (found) return found;
  }

  return undefined;
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

  if (!elementToShow) return null;

  // Lista de campos a exibir
  const fields: { label: string; value?: React.ReactNode }[] = [
    { label: "Atomic number", value: elementToShow.atomicNumber },
    {
      label: "Molar mass",
      value:
        elementToShow.molarMass !== undefined
          ? Number(elementToShow.molarMass).toFixed(3)
          : undefined,
    },
    { label: "Category", value: elementToShow.category },
    { label: "Standard state", value: elementToShow.standardState },
    {
      label: "Electron configuration",
      value: (
        <span className="break-all">{elementToShow.electronConfiguration}</span>
      ),
    },
    { label: "Oxidation states", value: elementToShow.oxidationStates },
    { label: "Group", value: elementToShow.group },
    { label: "Period", value: elementToShow.period },
  ];

  return (
    <div className="w-[500px] h-auto bg-white border-2 border-cyan-600 rounded-lg shadow-lg flex overflow-hidden flex-col">
      {/* Campo de pesquisa no topo */}
      <div className="w-full px-4 pt-2 pb-2 bg-white border-b border-cyan-100">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by symbol or name (EN/PT)..."
          className="w-full px-3 py-2 border border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base text-black"
        />
      </div>
      <div className="flex flex-row flex-1 overflow-hidden">
        {/* Coluna do símbolo */}
        <div className="flex flex-col items-center justify-center w-[120px] bg-cyan-50 border-r border-cyan-200 py-4">
          <span className="text-5xl font-extrabold text-cyan-600 leading-none">
            {elementToShow.symbol}
          </span>
          <span className="text-sm text-zinc-700 font-semibold mt-2">
            {elementToShow.name}
          </span>
        </div>
        {/* Coluna das informações */}
        <div className="flex-1 flex flex-col justify-center px-4 py-2 text-zinc-800 text-[15px]">
          <ul className="flex flex-col gap-y-0.5">
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
