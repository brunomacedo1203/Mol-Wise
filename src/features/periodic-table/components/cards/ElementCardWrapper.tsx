import SingleCardPeriodicTable from "../SingleCardPeriodicTable";
import { Element } from "../../domain/types/element";
import React from "react";
import { useTranslations } from "next-intl";
import {
  CATEGORY_COLOR_MAP,
  RARE_EARTHS_LABEL,
  RARE_EARTHS_COLOR,
  // ===== Novas famílias =====
  BORON_FAMILY_LABEL,
  CARBON_FAMILY_LABEL,
  NITROGEN_FAMILY_LABEL,
  OXYGEN_FAMILY_LABEL,
  // use as cores diretamente para simplificar
  BORON_FAMILY_COLOR,
  CARBON_FAMILY_COLOR,
  NITROGEN_FAMILY_COLOR,
  OXYGEN_FAMILY_COLOR,
} from "../../domain/types/elementCategories";

interface ElementCardWrapperProps {
  element: Element;
  setHighlight: (
    e: Element | null,
    source: "hover" | "search" | "click" | null
  ) => void;
  highlightedElement?: Element;
  highlightSource?: "hover" | "search" | "click" | null;
  highlightedCategories?: string[];
}

export default function ElementCardWrapper({
  element,
  setHighlight,
  highlightedElement,
  highlightSource,
  highlightedCategories = [],
}: ElementCardWrapperProps) {
  const t = useTranslations("periodicTable");
  const translatedElementName = t(`elements.${element.symbol}`);

  // Casos especiais existentes
  const terrasRarasAtiva = highlightedCategories.includes(RARE_EARTHS_LABEL);
  const isTerraRara = !!element.isRareEarth;

  // --- FIX: verificar cada família separadamente (sem "escolher uma só") ---
  const boronAtiva = highlightedCategories.includes(BORON_FAMILY_LABEL);
  const carbonAtiva = highlightedCategories.includes(CARBON_FAMILY_LABEL);
  const nitrogenAtiva = highlightedCategories.includes(NITROGEN_FAMILY_LABEL);
  const oxygenAtiva = highlightedCategories.includes(OXYGEN_FAMILY_LABEL);

  let highlightClass = "";
  if (terrasRarasAtiva && isTerraRara) {
    // 1) Terras Raras tem prioridade quando selecionado
    highlightClass = RARE_EARTHS_COLOR;

    // 2) Famílias novas usando os booleanos do elementsData (cada uma independente)
  } else if (boronAtiva && element.isBoronFamily) {
    highlightClass = BORON_FAMILY_COLOR;
  } else if (carbonAtiva && element.isCarbonFamily) {
    highlightClass = CARBON_FAMILY_COLOR;
  } else if (nitrogenAtiva && element.isNitrogenFamily) {
    highlightClass = NITROGEN_FAMILY_COLOR;
  } else if (oxygenAtiva && element.isOxygenFamily) {
    highlightClass = OXYGEN_FAMILY_COLOR;

    // 3) Fallback para as categorias padrão
  } else if (highlightedCategories.includes(element.category)) {
    highlightClass = CATEGORY_COLOR_MAP[element.category] || "";
  }

  const isHighlighted =
    highlightedElement?.atomicNumber === element.atomicNumber;

  const ringHighlightClass =
    isHighlighted && highlightSource === "search"
      ? "ring-[6px] ring-yellow-300 dark:ring-yellow-200 scale-[1.15] z-20 shadow-2xl transition-transform duration-300"
      : isHighlighted && highlightSource === "click"
      ? "ring-4 ring-yellow-400 dark:ring-yellow-300 scale-105 z-30 shadow-xl transition-transform duration-200"
      : isHighlighted && highlightSource === "hover"
      ? "ring-4 ring-yellow-500 dark:ring-yellow-100 z-20 shadow-md transition-transform duration-200"
      : "";

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={t("ariaLabel", {
        name: translatedElementName,
        symbol: element.symbol,
        atomicNumber: element.atomicNumber,
      })}
      onMouseEnter={() => {
        if (highlightSource !== "search") {
          setHighlight(element, "hover");
        }
      }}
      onFocus={() => {
        if (highlightSource !== "search") {
          setHighlight(element, "hover");
        }
      }}
      onMouseLeave={() => {
        if (highlightSource === "hover") {
          setHighlight(null, null);
        }
      }}
      onClick={() => {
        const isSame =
          highlightedElement?.atomicNumber === element.atomicNumber;
        const isClick = highlightSource === "click";

        if (isSame && isClick) {
          setHighlight(null, null);
        } else {
          setHighlight(element, "click");
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setHighlight(element, "click");
        }
      }}
      className={`focus:outline-none focus:ring-0 transition-all duration-150 ${highlightClass} ${ringHighlightClass}`}
    >
      <SingleCardPeriodicTable
        atomicNumber={element.atomicNumber}
        symbol={element.symbol}
        name={translatedElementName}
        molarMass={element.molarMass}
        showColummNumber={element.showColumnNumber}
        highlightClass={highlightClass}
      />
    </div>
  );
}
