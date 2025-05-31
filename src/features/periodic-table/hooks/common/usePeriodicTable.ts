import { useCallback } from "react";
import { usePeriodicTable as usePeriodicTableContext } from "../../contexts/PeriodicTableContext";
import { Element } from "../../domain/types/element";
import { PeriodicTableConfig } from "../../domain/types/table";

export function usePeriodicTable() {
  const {
    state,
    setConfig,
    selectElement,
    setFilteredElements,
    setSearchTerm,
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
      selectElement(element);
    },
    [selectElement]
  );

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
    },
    [setSearchTerm]
  );

  const handleFilter = useCallback(
    (elements: Element[]) => {
      setFilteredElements(elements);
    },
    [setFilteredElements]
  );

  return {
    // Estado
    config: state.config,
    selectedElement: state.selectedElement,
    filteredElements: state.filteredElements,
    searchTerm: state.searchTerm,

    // Handlers
    handleConfigChange,
    handleElementSelect,
    handleSearch,
    handleFilter,
  };
} 