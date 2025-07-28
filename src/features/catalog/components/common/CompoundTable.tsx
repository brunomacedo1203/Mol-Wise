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
import { TableColumnKey } from "@/features/catalog/domain/types/TableColumnKey";

export function CompoundTable() {
  const t = useTranslations();
  const [columnsMenuOpen, setColumnsMenuOpen] = useState(false);

  // Usa o novo hook que integra com o store
  const {
    paginatedData,
    isLoading,
    error,
    currentPage,
    rowsPerPage,
    totalPages,
    searchTerm,
    selectedCategories,
    sortColumn,
    sortOrder,
    totalCompounds: _totalCompounds,
    filteredCount: _filteredCount,
  } = useCatalogData();

  // Actions do store
  const {
    setSearchTerm,
    setCurrentPage,
    setRowsPerPage,
    setSortColumn,
    toggleSortOrder,
    setSelectedCategories,
    visibleColumns,
    toggleColumn,
  } = useCatalogStore();

  const centerAlignedColumns: TableColumnKey[] = ["solubilityNumeric"];

  const allColumns = useCompoundColumns();

  const cellValueGetter = useCallback(
    (compound: ExtendedCompound, key: TableColumnKey) =>
      getCellValue(compound, key, t),
    [t]
  );

  const columnWidths = useColumnWidths(
    paginatedData as ExtendedCompound[],
    allColumns,
    cellValueGetter
  );

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

  if (isLoading) {
    return <div className="text-center">{t("compoundTable.loading")}</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        {t("compoundTable.errorLoading")}
      </div>
    );
  }

  return (
    <div
      className={`
      w-full max-w-8xl mx-auto my-10 space-y-4 p-4 border 
      border-border rounded-lg bg-background shadow-sm 
      dark:bg-zinc-900 dark:border-zinc-700 
    `}
    >
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
            centerAlignedColumns={centerAlignedColumns}
          />
          <CompoundTableRows
            paginatedData={paginatedData}
            allColumns={allColumns}
            visibleColumns={visibleColumns}
            columnWidths={columnWidths}
            getCellValue={cellValueGetter}
            centerAlignedColumns={centerAlignedColumns}
            t={t}
          />
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {t("compoundTable.rowsPerPage")}
          </span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm bg-background"
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
