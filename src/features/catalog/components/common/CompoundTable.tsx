"use client";
import { Table } from "@/components/ui/table";
import { useCatalogData } from "@/features/catalog/hooks/common/useCatalogData";
import { useCatalogStore } from "@/features/catalog/store/catalogStore";
import { useTranslations } from "next-intl";
import type { ExtendedCompound } from "@/features/catalog/hooks/common/useCompoundData";
import { useCallback, useState } from "react";
import { useCompoundColumns } from "./compoundColumns";
import { useColumnWidths } from "@/features/catalog/hooks/common/useColumnWidths";
import { TablePagination } from "@/features/catalog/components/common/TablePagination";

import { getCellValue } from "@/features/catalog/utils/getCellValue";
import { CompoundTableToolbar } from "./CompoundTableToolbar";
import { CompoundTableHeader } from "./CompoundTableHeader";
import { CompoundTableRows } from "./CompoundTableRows";
import { AdvancedFiltersPanel } from "./AdvancedFiltersPanel";
import { TableColumnKey } from "@/features/catalog/domain/types/TableColumnKey";
import type { BasicAdvancedFilters } from "@/features/catalog/domain/types/ChemicalCompound";

interface CompoundTableProps {
  data: ExtendedCompound[];
}

export function CompoundTable({ data: _data }: CompoundTableProps) {
  const t = useTranslations();

  // Usa o novo hook que integra com o store
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">{t("compoundTable.loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg text-red-600">
          {t("compoundTable.errorLoading")}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
         w-full max-w-8xl mx-auto my-10 space-y-4 px-4 md:px-8 py-4 border 
    border-border rounded-lg bg-background shadow-sm 
    dark:bg-zinc-900 dark:border-zinc-700 
      `}
    >
      {/* Painel de Filtros Avançados */}
      <AdvancedFiltersPanel
        filters={advancedFilters.filters}
        onFiltersChange={handleAdvancedFiltersChange}
        onReset={handleAdvancedFiltersReset}
        isOpen={advancedFilters.isOpen}
        onToggle={handleAdvancedFiltersToggle}
        isActive={advancedFilters.isActive}
      />

      {/* Toolbar com busca e filtros básicos */}
      <CompoundTableToolbar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        columnsMenuOpen={columnsMenuOpen}
        setColumnsMenuOpen={setColumnsMenuOpen}
        allColumns={allColumns}
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
        t={t}
      />

      {/* Scroll horizontal só quando necessário */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-full table-fixed shadow-xl">
          <CompoundTableHeader
            allColumns={allColumns}
            visibleColumns={visibleColumns}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
            handleSort={handleSafeSort}
            centerAlignedColumns={["solubilityNumeric"]}
          />
          <CompoundTableRows
            paginatedData={paginatedData}
            allColumns={allColumns}
            visibleColumns={visibleColumns}
            columnWidths={columnWidths}
            getCellValue={getCellValueForWidth}
            centerAlignedColumns={["solubilityNumeric"]}
            t={t}
          />
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {t("compoundTable.rowsPerPage")}
          </span>
          <select
            value={_rowsPerPage}
            onChange={(e) => _setRowsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm bg-background dark:bg-zinc-800 dark:border-zinc-700"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
