import { PeriodicTableProvider } from "../../contexts/PeriodicTableContext";
import { PeriodicTableContainerProps } from "../../domain/types/table";

/**
 * Container da tabela periódica que fornece o contexto
 */
export function PeriodicTableContainer({
  children,
  onElementSelect: _onElementSelect,
  onConfigChange: _onConfigChange,
}: PeriodicTableContainerProps) {
  return (
    <PeriodicTableProvider>
      <div className="w-full h-full flex flex-col">
        {/* Header será adicionado aqui */}
        <div className="flex-1 relative">{children}</div>
      </div>
    </PeriodicTableProvider>
  );
}
