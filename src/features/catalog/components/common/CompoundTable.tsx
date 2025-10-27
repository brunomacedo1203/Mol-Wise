"use client";
import { Table } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import type { ExtendedCompound } from "@/features/catalog/hooks/common/useCompoundData";
import { TablePagination } from "@/features/catalog/components/common/TablePagination";

import { CompoundTableToolbar } from "./CompoundTableToolbar";
import { CompoundTableHeader } from "./CompoundTableHeader";
import { CompoundTableRows } from "./CompoundTableRows";
import { AdvancedFiltersPanel } from "./AdvancedFiltersPanel";
import { useCompoundTableHandlers } from "../../hooks/common/useCompoundTableHandlers";

interface CompoundTableProps {
  data: ExtendedCompound[];
}

export function CompoundTable({ data: _data }: CompoundTableProps) {
  const t = useTranslations();

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
    advancedFilters,
    setSearchTerm,
    setSelectedCategories,
    setCurrentPage,
    setRowsPerPage: _setRowsPerPage,
    toggleColumn,
    visibleColumns,
    columnsMenuOpen,
    setColumnsMenuOpen,
    allColumns,
    getCellValueForWidth,
    columnWidths,
    handleSafeSort,
    handleAdvancedFiltersChange,
    handleAdvancedFiltersReset,
    handleAdvancedFiltersToggle,
  } = useCompoundTableHandlers();

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
        w-full max-w-8xl mx-auto my-4 md:my-10 px-2 md:px-8 py-4 md:py-6
        border border-border dark:border-zinc-700
        rounded-xl shadow-md bg-background dark:bg-zinc-900
        space-y-4 md:space-y-6
      `}
    >
      {/* Toolbar + Filtros basicos */}
      <div className="space-y-4">
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
        />

        {/* Painel de Filtros Avançados */}
        <AdvancedFiltersPanel
          filters={advancedFilters.filters}
          onFiltersChange={handleAdvancedFiltersChange}
          onReset={handleAdvancedFiltersReset}
          isOpen={advancedFilters.isOpen}
          onToggle={handleAdvancedFiltersToggle}
          isActive={advancedFilters.isActive}
        />
      </div>

      {/* Tabela com scroll horizontal */}
      <div className="overflow-x-auto -mx-2 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <Table className="min-w-full table-auto md:table-fixed">
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
        </div>
      </div>

      {/* Paginação */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            {t("compoundTable.rowsPerPage")}
          </span>
          <select
            value={_rowsPerPage}
            onChange={(e) => _setRowsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1 text-xs sm:text-sm bg-background dark:bg-zinc-800 dark:border-zinc-700"
          >
            {[5, 10, 20, 50].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
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