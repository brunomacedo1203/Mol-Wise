import { Element } from "../../../domain/types/element";
import { cn } from "@/lib/utils";
import React from "react";

export interface UnifiedElementCardProps {
  element: Element;
  isSelected?: boolean;
  onClick?: (atomicNumber: number) => void;
  highlightClass?: string;
  showColummNumber?: number;
  asButton?: boolean;
}

export function ElementCard({
  element,
  isSelected,
  onClick,
  highlightClass = "",
  showColummNumber,
  asButton = true,
}: UnifiedElementCardProps) {
  const columnNumberClass = showColummNumber
    ? "before:content-[attr(data-columm-number)] before:absolute before:top-[-35px] before:w-full before:text-center before:text-cyan-600"
    : "";

  // Cor de fundo: prioridade para highlightClass
  const bgColor =
    highlightClass && highlightClass.length > 0
      ? highlightClass
      : getCategoryColor(element.category);

  function getCategoryColor(category: Element["category"]) {
    switch (category) {
      case "Alkali metal":
        return "bg-red-100 hover:bg-red-200";
      case "Alkaline earth metal":
        return "bg-orange-100 hover:bg-orange-200";
      case "Transition metal":
        return "bg-yellow-100 hover:bg-yellow-200";
      case "Post-transition metal":
        return "bg-green-100 hover:bg-green-200";
      case "Metalloid":
        return "bg-teal-100 hover:bg-teal-200";
      case "Nonmetal":
        return "bg-blue-100 hover:bg-blue-200";
      case "Halogen":
        return "bg-indigo-100 hover:bg-indigo-200";
      case "Noble gas":
        return "bg-purple-100 hover:bg-purple-200";
      case "Lanthanide":
        return "bg-pink-100 hover:bg-pink-200";
      case "Actinide":
        return "bg-rose-100 hover:bg-rose-200";
      default:
        return "bg-gray-100 hover:bg-gray-200";
    }
  }

  function getPhaseColor(state: Element["standardState"]) {
    switch (state) {
      case "gas":
        return "bg-red-100";
      case "liquid":
        return "bg-blue-100";
      case "solid":
        return "bg-gray-100";
      default:
        return "bg-gray-100";
    }
  }

  const content = (
    <div
      data-columm-number={showColummNumber}
      className={cn(
        columnNumberClass,
        "relative w-[80px] h-[80px] border-2 border-black flex flex-col items-center justify-center text-center overflow-hidden text-xs",
        bgColor,
        isSelected && "ring-2 ring-primary ring-offset-2"
      )}
    >
      <span className="absolute top-0.5 left-1 text-black dark:text-white text-xs font-bold">
        {element.atomicNumber}
      </span>
      <div className="flex flex-col items-center justify-center h-full px-1 mt-1">
        <span className="text-2xl font-bold text-black dark:text-white">
          {element.symbol}
        </span>
        <span
          className="text-[12px] text-zinc-800 dark:text-zinc-200 truncate w-full leading-tight"
          title={element.name}
        >
          {element.name}
        </span>
        <span className="font-bold text-[10px] text-black dark:text-white mt-1">
          {element.molarMass?.toFixed(2)}
        </span>
      </div>
      <div
        className={cn(
          "absolute bottom-1 right-1 w-2 h-2 rounded-full",
          getPhaseColor(element.standardState)
        )}
      />
    </div>
  );

  if (asButton) {
    return (
      <button
        onClick={() => onClick && onClick(element.atomicNumber)}
        className="focus:outline-none"
        tabIndex={0}
        aria-label={element.name}
        type="button"
      >
        {content}
      </button>
    );
  }
  return content;
}
