import { usePeriodicTable } from "../../../hooks/usePeriodicTable";
import { ElementCard } from "./ElementCard";
import { ElementCardsGridProps } from "../../../domain/types/table";

/**
 * Grid de cards dos elementos químicos
 */
export function ElementCardsGrid({
  elements,
  onElementSelect,
}: ElementCardsGridProps) {
  const { selectedElement } = usePeriodicTable();

  const handleCardClick = (atomicNumber: number) => {
    const element = elements.find((e) => e.atomicNumber === atomicNumber);
    onElementSelect?.(element || null);
  };

  return (
    <div className="grid grid-cols-18 gap-1 p-4">
      {elements.map((element) => (
        <div
          key={element.atomicNumber}
          className={`
            aspect-square
            ${element.period === 6 && element.group >= 3 ? "col-start-3" : ""}
            ${element.period === 7 && element.group >= 3 ? "col-start-3" : ""}
            ${element.atomicNumber === 57 ? "col-start-3" : ""}
            ${element.atomicNumber === 89 ? "col-start-3" : ""}
          `}
        >
          <ElementCard
            element={element}
            isSelected={selectedElement?.atomicNumber === element.atomicNumber}
            onClick={handleCardClick}
          />
        </div>
      ))}
    </div>
  );
}
