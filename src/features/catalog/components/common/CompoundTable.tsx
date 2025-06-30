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
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { ChemicalCompound } from "@/features/catalog/domain/types/ChemicalCompound";
import { useMemo, useCallback } from "react";

// Definir tipo para as colunas extras
type ExtraColumn = "solubilityNumeric" | "solubilityQualitative";
type TableColumnKey = keyof ChemicalCompound | ExtraColumn;

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
    sortColumn,
    sortOrder,
    handleSort,
  } = useCompoundTable({ data: compounds });

  const allColumns = useMemo(
    () => [
      { key: "id" as TableColumnKey, label: t("catalog.tableHeaders.no") },
      { key: "name" as TableColumnKey, label: t("catalog.tableHeaders.name") },
      {
        key: "formula" as TableColumnKey,
        label: t("catalog.tableHeaders.formula"),
      },
      {
        key: "casNumber" as TableColumnKey,
        label: t("catalog.tableHeaders.casNumber"),
      },
      {
        key: "molarMass" as TableColumnKey,
        label: t("catalog.tableHeaders.molarMass"),
      },
      {
        key: "physicalForm" as TableColumnKey,
        label: t("catalog.tableHeaders.physicalForm"),
      },
      {
        key: "meltingPoint" as TableColumnKey,
        label: t("catalog.tableHeaders.meltingPoint"),
      },
      {
        key: "boilingPoint" as TableColumnKey,
        label: t("catalog.tableHeaders.boilingPoint"),
      },
      {
        key: "density" as TableColumnKey,
        label: t("catalog.tableHeaders.density"),
      },
      {
        key: "solubilityNumeric" as TableColumnKey,
        label: t("catalog.tableHeaders.solubilityNumeric"),
      },
      {
        key: "solubilityQualitative" as TableColumnKey,
        label: t("catalog.tableHeaders.solubilityQualitative"),
      },
    ],
    [t]
  );

  const getCompoundName = useCallback(
    (formula: string, fallback: string) => {
      try {
        const translated = t(`catalog.compoundNames.${formula}`);
        return translated || fallback;
      } catch {
        return fallback;
      }
    },
    [t]
  );

  const getCompoundSynonym = useCallback(
    (formula: string, fallback: string) => {
      try {
        const translated = t(`catalog.compoundSynonyms.${formula}`);
        return translated || fallback;
      } catch {
        return fallback;
      }
    },
    [t]
  );

  const getSolubilityTranslation = useCallback(
    (solubility: string) => {
      try {
        const translated = t(`solubilityTerms.${solubility}`);
        return translated || solubility;
      } catch {
        return solubility;
      }
    },
    [t]
  );

  const getPhysicalFormTranslation = useCallback(
    (physicalForm: string | undefined) => {
      if (!physicalForm) return "";
      try {
        const translated = t(`physicalFormTerms.${physicalForm}`);
        return translated || physicalForm;
      } catch {
        return physicalForm;
      }
    },
    [t]
  );

  // Atualizar getCellValue para definir extractSolubilityQualitative dentro do useCallback
  const getCellValue = useCallback(
    (compound: ChemicalCompound, key: TableColumnKey) => {
      // Função local para extrair valor qualitativo de solubilidade
      function extractSolubilityQualitative(solubility: string) {
        // Se não for valor numérico, retorna o texto original traduzido
        if (!/([\d,.]+)\s*g\/(?:100\s*(?:mL|g))\s*water/i.test(solubility)) {
          return getSolubilityTranslation(solubility);
        }
        return "";
      }
      switch (key) {
        case "id":
          return compound.id?.toString() || "";
        case "name":
          return getCompoundName(compound.formula, compound.name ?? "");
        case "synonym":
          return getCompoundSynonym(compound.formula, compound.synonym ?? "");
        case "formula":
          return compound.formula || "";
        case "casNumber":
          return compound.casNumber || "";
        case "molarMass":
          return compound.molarMass?.toString() || "";
        case "physicalForm":
          return getPhysicalFormTranslation(compound.physicalForm);
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
          return getSolubilityTranslation(compound.solubility);
        default:
          return "";
      }
    },
    [
      getCompoundName,
      getCompoundSynonym,
      getPhysicalFormTranslation,
      getSolubilityTranslation,
    ]
  );

  // Atualizar columnWidths para aceitar TableColumnKey
  const columnWidths = useMemo(() => {
    const widths: Partial<Record<TableColumnKey, number>> = {};

    allColumns.forEach(({ key }) => {
      let maxWidth = 0;

      // Verificar largura do cabeçalho
      const headerText = allColumns.find((col) => col.key === key)?.label || "";
      maxWidth = Math.max(maxWidth, headerText.length * 8 + 40); // 8px por caractere + padding

      // Verificar largura dos dados
      compounds.forEach((compound) => {
        const cellValue = getCellValue(compound, key);
        maxWidth = Math.max(maxWidth, cellValue.length * 8 + 20); // 8px por caractere + padding
      });

      // Largura mínima e máxima
      widths[key] = Math.min(Math.max(maxWidth, 80), 300); // Mínimo 80px, máximo 300px
    });

    return widths;
  }, [compounds, allColumns, getCellValue]);

  // Atualizar toggleColumn para aceitar TableColumnKey
  const toggleColumn = (col: TableColumnKey) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [col]: !prev[col],
    }));
  };

  // Atualizar handleSort para aceitar apenas colunas do tipo keyof ChemicalCompound
  const handleSafeSort = (key: TableColumnKey) => {
    // Só permite ordenação para colunas do tipo ChemicalCompound
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
    <div className="w-full max-w-[1400px] mx-auto my-10 space-y-4 p-4 border border-border rounded-lg bg-background shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <Input
          placeholder={t("compoundTable.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-72"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {t("compoundTable.columns")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {allColumns.map(({ key, label }) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={visibleColumns[key]}
                onCheckedChange={() => toggleColumn(key)}
              >
                {label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabela */}
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            {allColumns.map(({ key, label }) =>
              visibleColumns[key] ? (
                <TableHead
                  key={key}
                  className="cursor-pointer select-none font-bold text-black whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ width: `${columnWidths[key] || 100}px` }}
                  onClick={() => handleSafeSort(key)}
                >
                  <div className="flex items-center gap-1">
                    {label}
                    {sortColumn === key ? (
                      sortOrder === "asc" ? (
                        <ArrowUp className="w-3 h-3 flex-shrink-0" />
                      ) : (
                        <ArrowDown className="w-3 h-3 flex-shrink-0" />
                      )
                    ) : (
                      <ChevronsUpDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                </TableHead>
              ) : null
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length ? (
            paginatedData.map((compound) => (
              <TableRow key={compound.id}>
                {allColumns.map(({ key }) =>
                  visibleColumns[key] ? (
                    <TableCell
                      key={key}
                      className="whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ width: `${columnWidths[key] || 100}px` }}
                    >
                      {getCellValue(compound, key)}
                    </TableCell>
                  ) : null
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={
                  allColumns.filter((col) => visibleColumns[col.key]).length
                }
                className="text-center py-6"
              >
                {t("compoundTable.noResults")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginação */}
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
