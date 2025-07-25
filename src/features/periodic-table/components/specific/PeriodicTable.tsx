import { PeriodicTableHeader } from "../common/PeriodicTableHeader";
import { PeriodicTableLegend } from "../common/PeriodicTableLegend";
import { ElementCardsGrid } from "./cards/ElementCardsGrid";
import ElementDetailsPanel from "../ElementDetailsPanel";
import { usePeriodicTable } from "../../hooks/usePeriodicTable";
import elementsData from "../../data/elementsData";
import { PeriodicTableProps } from "../../domain/types/table";
import { Element } from "../../domain/types/element";

/**
 * Componente principal da tabela periódica
 */
export function PeriodicTable({ onElementSelect }: PeriodicTableProps) {
  const { selectedElement, setSelectedElement } = usePeriodicTable();

  const handleElementSelect = (element: Element | null) => {
    setSelectedElement(element);
    onElementSelect?.(element);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 relative">
        <div className="space-y-4">
          <PeriodicTableHeader />
          <PeriodicTableLegend />
          <ElementCardsGrid
            elements={elementsData as Element[]}
            onElementSelect={handleElementSelect}
          />
          <ElementDetailsPanel element={selectedElement} />
        </div>
      </div>
    </div>
  );
}
