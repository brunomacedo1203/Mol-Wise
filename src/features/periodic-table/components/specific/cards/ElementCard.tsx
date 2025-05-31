import { ElementCardProps } from "../../../domain/types/table";
import { Element } from "../../../domain/types/element";
import { usePeriodicTable } from "../../../hooks/usePeriodicTable";
import { cn } from "@/lib/utils";

/**
 * Card que representa um elemento químico na tabela periódica
 */
export function ElementCard({
  element,
  isSelected,
  onClick,
}: Omit<ElementCardProps, "config">) {
  const { config } = usePeriodicTable();

  const getCategoryColor = (category: Element["category"]) => {
    switch (category) {
      case "metal":
        return "bg-blue-100 hover:bg-blue-200";
      case "nonmetal":
        return "bg-green-100 hover:bg-green-200";
      case "metalloid":
        return "bg-yellow-100 hover:bg-yellow-200";
      default:
        return "bg-gray-100 hover:bg-gray-200";
    }
  };

  const getPhaseColor = (phase: Element["phase"]) => {
    switch (phase) {
      case "gas":
        return "bg-red-100";
      case "liquid":
        return "bg-blue-100";
      case "solid":
        return "bg-gray-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <button
      onClick={() => onClick(element.atomicNumber)}
      className={cn(
        "relative w-24 h-24 p-2 rounded-lg border transition-colors",
        getCategoryColor(element.category),
        isSelected && "ring-2 ring-primary ring-offset-2"
      )}
    >
      {config.showAtomicNumber && (
        <div className="absolute top-1 left-1 text-xs font-medium">
          {element.atomicNumber}
        </div>
      )}

      <div className="flex flex-col items-center justify-center h-full">
        {config.showElementSymbol && (
          <div className="text-2xl font-bold">{element.symbol}</div>
        )}

        {config.showElementName && (
          <div className="text-xs text-center mt-1">{element.name}</div>
        )}

        {config.showAtomicMass && (
          <div className="text-xs mt-1">{element.atomicMass.toFixed(2)}</div>
        )}
      </div>

      <div
        className={cn(
          "absolute bottom-1 right-1 w-2 h-2 rounded-full",
          getPhaseColor(element.phase)
        )}
      />
    </button>
  );
}
