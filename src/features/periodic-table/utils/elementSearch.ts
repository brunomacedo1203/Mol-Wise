import { useTranslations } from "next-intl";
import elementsData from "../data/elementsData";
import { Element } from "../domain/types/element";

export function normalize(str: string) {
  return str
    .normalize("NFD")
    .replace(/[ -\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export function useElementSearch() {
  const tElements = useTranslations("periodicTable.elements");
  const ptNameToSymbol: Record<string, string> = {};
  elementsData.forEach((el) => {
    const ptName = tElements(el.symbol);
    if (ptName) {
      ptNameToSymbol[normalize(ptName)] = el.symbol;
    }
  });

  function searchElement(term: string): Element | undefined {
    const normalized = normalize(term);
    if (!normalized) return undefined;

    let found = elementsData.find((el) =>
      normalize(el.symbol).startsWith(normalized)
    ) as Element | undefined;
    if (found) return found;

    found = elementsData.find((el) =>
      normalize(el.name).includes(normalized)
    ) as Element | undefined;
    if (found) return found;

    const symbol = ptNameToSymbol[normalized];
    if (symbol) {
      found = elementsData.find((el) => el.symbol === symbol) as Element | undefined;
      if (found) return found;
    }

    return undefined;
  }

  return searchElement;
} 