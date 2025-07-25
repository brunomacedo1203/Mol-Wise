import { PeriodicTableContainerProps } from "../../domain/types/table";

export function PeriodicTableContainer({
  children,
  onElementSelect: _onElementSelect,
  onConfigChange: _onConfigChange,
}: PeriodicTableContainerProps) {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Header será adicionado aqui */}
      <div className="flex-1 relative">{children}</div>
    </div>
  );
}
