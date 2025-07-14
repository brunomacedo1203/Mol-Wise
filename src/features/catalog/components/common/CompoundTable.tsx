"use client";
import { Table } from "@/components/ui/table";
import { useCompoundData } from "@/features/catalog/hooks/common/useCompoundData";
import { useCompoundTable } from "@/features/catalog/hooks/common/useCompoundTable";
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
  const { compounds, isLoading, error } = useCompoundData();

  // Adiciona controle manual de abertura do DropdownMenu
  const [columnsMenuOpen, setColumnsMenuOpen] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    paginatedData,
    visibleColumns,
    setVisibleColumns,
    sortColumn,
    sortOrder,
    handleSort,
    selectedCategories,
    setSelectedCategories,
  } = useCompoundTable({ data: compounds });

  const centerAlignedColumns: TableColumnKey[] = ["solubilityNumeric"];

  const allColumns = useCompoundColumns();

  const cellValueGetter = useCallback(
    (compound: ExtendedCompound, key: TableColumnKey) =>
      getCellValue(compound, key, t),
    [t]
  );

  const columnWidths = useColumnWidths(
    compounds as ExtendedCompound[],
    allColumns,
    cellValueGetter
  );

  const toggleColumn = (col: TableColumnKey) => {
    setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  const handleSafeSort = (key: TableColumnKey) => {
    if (
      typeof key === "string" &&
      [
        "id",
        "name",
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
      handleSort(key as keyof ExtendedCompound);
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
    <div className="w-full max-w-[1400px] mx-auto my-10 space-y-4 p-4 border border-border rounded-lg bg-background shadow-sm dark:bg-zinc-900 dark:border-zinc-700">
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

      <Table className="w-full table-fixed shadow-xl ">
        <CompoundTableHeader
          allColumns={allColumns}
          visibleColumns={visibleColumns}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          handleSort={handleSafeSort}
          centerAlignedColumns={centerAlignedColumns}
          columnWidths={columnWidths}
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
