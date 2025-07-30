import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { useCatalogData } from "./useCatalogData";
import { useCatalogStore } from "../../store/catalogStore";
import { useCompoundColumns } from "../../components/common/compoundColumns";
import { useColumnWidths } from "./useColumnWidths";
import { getCellValue } from "../../utils/getCellValue";
import type { ExtendedCompound } from "./useCompoundData";
import type { TableColumnKey } from "../../domain/types/TableColumnKey";
import type { BasicAdvancedFilters } from "../../domain/types/ChemicalCompound";

export function useCompoundTableHandlers() {
  const t = useTranslations();

  // Dados do store
  const {
    paginatedData,
    isLoading,
    error,
    currentPage,
    rowsPerPage: _rowsPerPage,
    totalPages,
    searchTerm,
    selectedCategories,
    sortColumn,
    sortOrder,
    totalCompounds: _totalCompounds,
    filteredCount: _filteredCount,
    advancedFilters,
  } = useCatalogData();

  // Actions do store
  const {
    setSearchTerm,
    setSelectedCategories,
    setCurrentPage,
    setRowsPerPage: _setRowsPerPage,
    setSortColumn,
    toggleSortOrder,
    setAdvancedFiltersOpen,
    setAdvancedFilters,
    resetAdvancedFilters,
    toggleColumn,
    visibleColumns,
  } = useCatalogStore();

  // Estado local para colunas
  const [columnsMenuOpen, setColumnsMenuOpen] = useState(false);
  const allColumns = useCompoundColumns();

  // Função para obter valor da célula
  const getCellValueForWidth = useCallback(
    (compound: ExtendedCompound, key: TableColumnKey) => {
      return getCellValue(compound, key, t);
    },
    [t]
  );

  const columnWidths = useColumnWidths(
    paginatedData,
    allColumns,
    getCellValueForWidth
  );

  // Handlers
  const handleSafeSort = (key: TableColumnKey) => {
    if (
      typeof key === "string" &&
      [
        "id",
        "name",
        "commonName",
        "synonym",
        "formula",
        "casNumber",
        "molarMass",
        "physicalForm",
        "meltingPoint",
        "boilingPoint",
        "density",
        "refractiveIndex",
        "solubility",
        "solubilityNumeric",
        "solubilityQualitative",
      ].includes(key)
    ) {
      if (sortColumn === key) {
        toggleSortOrder();
      } else {
        setSortColumn(key as keyof ExtendedCompound);
      }
    }
  };

  const handleAdvancedFiltersChange = useCallback(
    (filters: BasicAdvancedFilters) => {
      setAdvancedFilters(filters);
    },
    [setAdvancedFilters]
  );

  const handleAdvancedFiltersReset = useCallback(() => {
    resetAdvancedFilters();
  }, [resetAdvancedFilters]);

  const handleAdvancedFiltersToggle = useCallback(() => {
    setAdvancedFiltersOpen(!advancedFilters.isOpen);
  }, [advancedFilters.isOpen, setAdvancedFiltersOpen]);

  return {
    // Dados
    paginatedData,
    isLoading,
    error,
    currentPage,
    rowsPerPage: _rowsPerPage,
    totalPages,
    searchTerm,
    selectedCategories,
    sortColumn,
    sortOrder,
    totalCompounds: _totalCompounds,
    filteredCount: _filteredCount,
    advancedFilters,
    
    // Actions
    setSearchTerm,
    setSelectedCategories,
    setCurrentPage,
    setRowsPerPage: _setRowsPerPage,
    setSortColumn,
    toggleSortOrder,
    setAdvancedFiltersOpen,
    setAdvancedFilters,
    resetAdvancedFilters,
    toggleColumn,
    visibleColumns,
    
    // Estado local
    columnsMenuOpen,
    setColumnsMenuOpen,
    allColumns,
    
    // Utilitários
    getCellValueForWidth,
    columnWidths,
    
    // Handlers
    handleSafeSort,
    handleAdvancedFiltersChange,
    handleAdvancedFiltersReset,
    handleAdvancedFiltersToggle,
  };
} 