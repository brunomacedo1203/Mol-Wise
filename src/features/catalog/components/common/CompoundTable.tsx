"use client";
import { Table } from "@/components/ui/table";
import { useCompoundData } from "@/features/catalog/hooks/common/useCompoundData";
import { useCompoundTable } from "@/features/catalog/hooks/common/useCompoundTable";
import { useTranslations } from "next-intl";
import { ChemicalCompound } from "@/features/catalog/domain/types/ChemicalCompound";
import { useCallback, useState } from "react";
import { useCompoundColumns } from "./compoundColumns";
import { useColumnWidths } from "@/features/catalog/hooks/common/useColumnWidths";
import { TablePagination } from "@/features/catalog/components/common/TablePagination";
import {
  getCompoundName,
  getCompoundSynonym,
  getSolubilityTranslation,
  getPhysicalFormTranslation,
} from "@/features/catalog/utils/compoundFormatters";
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
  } = useCompoundTable({ data: compounds });

  const centerAlignedColumns: TableColumnKey[] = ["solubilityNumeric"];

  const allColumns = useCompoundColumns();

  const getCellValue = useCallback(
    (compound: ChemicalCompound, key: TableColumnKey) => {
      function extractSolubilityQualitative(solubility: string) {
        if (!/([\d,.]+)\s*g\/(?:100\s*(?:mL|g))\s*water/i.test(solubility)) {
          return getSolubilityTranslation(t, solubility);
        }
        return "";
      }
      switch (key) {
        case "id":
          return compound.id?.toString() || "";
        case "name":
          return getCompoundName(t, compound.formula, compound.name ?? "");
        case "synonym":
          return getCompoundSynonym(
            t,
            compound.formula,
            compound.synonym ?? ""
          );
        case "formula":
          return compound.formula || "";
        case "casNumber":
          return compound.casNumber || "";
        case "molarMass":
          return compound.molarMass?.toString() || "";
        case "physicalForm":
          return getPhysicalFormTranslation(t, compound.physicalForm);
        case "meltingPoint":
          return compound.meltingPoint?.toString() || "";
        case "boilingPoint":
          return compound.boilingPoint?.toString() || "";
        case "density":
          return compound.density?.toString() || "";
        case "refractiveIndex":
          return compound.refractiveIndex?.toString() || "";
        case "solubilityNumeric":
          return compound.solubilityNumeric || "";
        case "solubilityQualitative":
          return extractSolubilityQualitative(compound.solubility);
        case "solubility":
          return getSolubilityTranslation(t, compound.solubility);
        default:
          return "";
      }
    },
    [t]
  );

  const columnWidths = useColumnWidths(compounds, allColumns, getCellValue);

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
      handleSort(key as keyof ChemicalCompound);
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
          getCellValue={getCellValue}
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
