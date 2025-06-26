"use client";
import { TablePagination } from "@/features/catalog/components/common/TablePagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCompoundData } from "@/features/catalog/hooks/common/useCompoundData";
import { useCompoundTable } from "@/features/catalog/hooks/common/useCompoundTable";
import { useTranslations } from "next-intl";

export function CompoundTable() {
  const t = useTranslations();
  const { compounds, isLoading, error } = useCompoundData();

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
  } = useCompoundTable({ data: compounds });

  const allColumns = [
    t("catalog.tableHeaders.no"),
    t("catalog.tableHeaders.name"),
    t("catalog.tableHeaders.synonym"),
    t("catalog.tableHeaders.formula"),
    t("catalog.tableHeaders.casNumber"),
    t("catalog.tableHeaders.molarMass"),
    t("catalog.tableHeaders.physicalForm"),
    t("catalog.tableHeaders.meltingPoint"),
    t("catalog.tableHeaders.boilingPoint"),
    t("catalog.tableHeaders.density"),
    t("catalog.tableHeaders.refractiveIndex"),
    t("catalog.tableHeaders.solubility"),
  ] as const;

  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) =>
      prev[col] ? { ...prev, [col]: false } : { ...prev, [col]: true }
    );
  };

  // Função utilitária para buscar tradução de nome/sinônimo
  function getCompoundName(formula: string, fallback: string) {
    try {
      const translated = t(`catalog.compoundNames.${formula}`);
      return translated || fallback;
    } catch {
      return fallback;
    }
  }
  function getCompoundSynonym(formula: string, fallback: string) {
    try {
      const translated = t(`catalog.compoundSynonyms.${formula}`);
      return translated || fallback;
    } catch {
      return fallback;
    }
  }

  if (isLoading)
    return <div className="text-center">{t("compoundTable.loading")}</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        {t("compoundTable.errorLoading")}
      </div>
    );

  return (
    <div className="container my-10 space-y-4 p-4 border border-border rounded-lg bg-background shadow-sm overflow-x-auto">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder={t("compoundTable.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-72"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {t("compoundTable.columns")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {allColumns.map((col) => (
              <DropdownMenuCheckboxItem
                key={col}
                checked={visibleColumns[col]}
                onCheckedChange={() => toggleColumn(col)}
              >
                {col}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabela */}
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {visibleColumns[t("catalog.tableHeaders.no")] && (
              <TableHead>{t("catalog.tableHeaders.no")}</TableHead>
            )}
            {visibleColumns[t("catalog.tableHeaders.name")] && (
              <TableHead>{t("catalog.tableHeaders.name")}</TableHead>
            )}
            {visibleColumns[t("catalog.tableHeaders.synonym")] && (
              <TableHead>{t("catalog.tableHeaders.synonym")}</TableHead>
            )}
            {visibleColumns[t("catalog.tableHeaders.formula")] && (
              <TableHead>{t("catalog.tableHeaders.formula")}</TableHead>
            )}
            {visibleColumns[t("catalog.tableHeaders.casNumber")] && (
              <TableHead>{t("catalog.tableHeaders.casNumber")}</TableHead>
            )}
            {visibleColumns[t("catalog.tableHeaders.molarMass")] && (
              <TableHead>{t("catalog.tableHeaders.molarMass")}</TableHead>
            )}
            {visibleColumns[t("catalog.tableHeaders.physicalForm")] && (
              <TableHead>{t("catalog.tableHeaders.physicalForm")}</TableHead>
            )}
            {visibleColumns[t("catalog.tableHeaders.meltingPoint")] && (
              <TableHead>{t("catalog.tableHeaders.meltingPoint")}</TableHead>
            )}
            {visibleColumns[t("catalog.tableHeaders.boilingPoint")] && (
              <TableHead>{t("catalog.tableHeaders.boilingPoint")}</TableHead>
            )}
            {visibleColumns[t("catalog.tableHeaders.density")] && (
              <TableHead>{t("catalog.tableHeaders.density")}</TableHead>
            )}
            {visibleColumns[t("catalog.tableHeaders.refractiveIndex")] && (
              <TableHead>{t("catalog.tableHeaders.refractiveIndex")}</TableHead>
            )}
            {visibleColumns[t("catalog.tableHeaders.solubility")] && (
              <TableHead>{t("catalog.tableHeaders.solubility")}</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length ? (
            paginatedData.map((compound) => (
              <TableRow key={compound.id}>
                {visibleColumns[t("catalog.tableHeaders.no")] && (
                  <TableCell>{compound.id}</TableCell>
                )}
                {visibleColumns[t("catalog.tableHeaders.name")] && (
                  <TableCell>
                    {getCompoundName(compound.formula, compound.name ?? "")}
                  </TableCell>
                )}
                {visibleColumns[t("catalog.tableHeaders.synonym")] && (
                  <TableCell>
                    {getCompoundSynonym(
                      compound.formula,
                      compound.synonym ?? ""
                    )}
                  </TableCell>
                )}
                {visibleColumns[t("catalog.tableHeaders.formula")] && (
                  <TableCell>{compound.formula}</TableCell>
                )}
                {visibleColumns[t("catalog.tableHeaders.casNumber")] && (
                  <TableCell>{compound.casNumber}</TableCell>
                )}
                {visibleColumns[t("catalog.tableHeaders.molarMass")] && (
                  <TableCell>{compound.molarMass}</TableCell>
                )}
                {visibleColumns[t("catalog.tableHeaders.physicalForm")] && (
                  <TableCell>{compound.physicalForm}</TableCell>
                )}
                {visibleColumns[t("catalog.tableHeaders.meltingPoint")] && (
                  <TableCell>{compound.meltingPoint}</TableCell>
                )}
                {visibleColumns[t("catalog.tableHeaders.boilingPoint")] && (
                  <TableCell>{compound.boilingPoint}</TableCell>
                )}
                {visibleColumns[t("catalog.tableHeaders.density")] && (
                  <TableCell>{compound.density}</TableCell>
                )}
                {visibleColumns[t("catalog.tableHeaders.refractiveIndex")] && (
                  <TableCell>{compound.refractiveIndex}</TableCell>
                )}
                {visibleColumns[t("catalog.tableHeaders.solubility")] && (
                  <TableCell>{compound.solubility}</TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={allColumns.length}
                className="text-center py-6"
              >
                {t("compoundTable.noResults")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Footer - Paginação e Rows per page */}
      <div className="flex items-center justify-between mt-4">
        {/* Rows per page */}
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

        {/* Paginação */}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
