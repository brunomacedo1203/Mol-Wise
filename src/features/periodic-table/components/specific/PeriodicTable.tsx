import { PeriodicTableContainer } from "../common/PeriodicTableContainer";
import { PeriodicTableHeader } from "../common/PeriodicTableHeader";
import { PeriodicTableLegend } from "../common/PeriodicTableLegend";
import { ElementCardsGrid } from "./cards/ElementCardsGrid";
import { ElementDetailsPanel } from "./details/ElementDetailsPanel";
import { usePeriodicTable } from "../../hooks/usePeriodicTable";
import { elements } from "../../data/elements";
import { PeriodicTableProps } from "../../domain/types/table";
import { Element } from "../../domain/types/element";

/**
 * Componente principal da tabela periódica
 */
export function PeriodicTable({
  onElementSelect,
  onConfigChange,
}: PeriodicTableProps) {
  const { selectedElement, setSelectedElement } = usePeriodicTable();

  const handleElementSelect = (element: Element | null) => {
    setSelectedElement(element);
    onElementSelect?.(element);
  };

  const handleCloseDetails = () => {
    setSelectedElement(null);
  };

  return (
    <PeriodicTableContainer
      onElementSelect={onElementSelect}
      onConfigChange={onConfigChange}
    >
      <div className="space-y-4">
        <PeriodicTableHeader />
        <PeriodicTableLegend />
        <ElementCardsGrid
          elements={elements}
          onElementSelect={handleElementSelect}
        />
        <ElementDetailsPanel
          element={selectedElement}
          onClose={handleCloseDetails}
        />
      </div>
    </PeriodicTableContainer>
  );
}
