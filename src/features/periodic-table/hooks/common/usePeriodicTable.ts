// DEPRECATED: Este hook foi unificado em ../usePeriodicTable.ts. Não use mais este arquivo.
import { useCallback } from "react";
import { usePeriodicTable as usePeriodicTableContext } from "../../hooks/usePeriodicTable";
import { Element } from "../../domain/types/element";
import { PeriodicTableConfig } from "../../domain/types/config";

export function usePeriodicTable() {
  const {
    selectedElement,
    setSelectedElement,
    config,
    setConfig,
  } = usePeriodicTableContext();

  // Handlers
  const handleConfigChange = useCallback(
    (config: Partial<PeriodicTableConfig>) => {
      setConfig(config);
    },
    [setConfig]
  );

  const handleElementSelect = useCallback(
    (element: Element | null) => {
      setSelectedElement(element);
    },
    [setSelectedElement]
  );

  return {
    // Estado
    config,
    selectedElement,
    setSelectedElement,

    // Handlers
    handleConfigChange,
    handleElementSelect,
  };
} 