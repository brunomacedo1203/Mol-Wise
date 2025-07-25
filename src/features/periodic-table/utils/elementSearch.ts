import { useTranslations } from "next-intl";
import elementsData from "../data/elementsData";
import { Element } from "../domain/types/element";

export function normalize(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}


export function useElementSearch() {
  const tElements = useTranslations("periodicTable.elements");

  function searchElement(term: string): Element | undefined {
    const normalized = normalize(term);
    if (!normalized) return undefined;

    // Busca por símbolo (qualquer parte)
    let found = elementsData.find((el) =>
      normalize(el.symbol).includes(normalized)
    ) as unknown as Element | undefined;
    if (found) return found;

    // Busca por nome em inglês (qualquer parte)
    found = elementsData.find((el) =>
      normalize(el.name).includes(normalized)
    ) as unknown as Element | undefined;
    if (found) return found;

    // Busca por nome traduzido (qualquer parte)
    for (const el of elementsData) {
      const ptName = tElements(el.symbol);
      if (ptName && normalize(ptName).includes(normalized)) {
        return el as unknown as Element;
      }
    }

    return undefined;
  }

  return searchElement;
} 