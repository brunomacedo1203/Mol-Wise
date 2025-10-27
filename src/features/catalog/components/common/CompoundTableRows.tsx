import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { TableColumnKey } from "@/features/catalog/domain/types/TableColumnKey";
import type { ExtendedCompound } from "@/features/catalog/hooks/common/useCompoundData";
import React from "react";
import { formatWithSub } from "@/shared/utils/formatWithSub";
import { trackCompoundView } from "../../events/catalogEvents";

interface CompoundTableRowsProps {
  paginatedData: ExtendedCompound[];
  allColumns: { key: TableColumnKey; label: React.ReactNode }[];
  visibleColumns: Record<TableColumnKey, boolean>;
  columnWidths: Partial<Record<TableColumnKey, number>>;
  getCellValue: (compound: ExtendedCompound, key: TableColumnKey) => string;
  centerAlignedColumns: TableColumnKey[];
  t: (key: string) => string;
}

export function CompoundTableRows({
  paginatedData,
  allColumns,
  visibleColumns,
  columnWidths,
  getCellValue,
  centerAlignedColumns,
  t,
}: CompoundTableRowsProps) {
  return (
    <TableBody>
      {paginatedData.length ? (
        paginatedData.map((compound) => (
          <TableRow
            key={compound.id}
            className="hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            onClick={() => {
              // Tracking de visualização de composto
              trackCompoundView({
                compound_id: compound.id.toString(),
                compound_name:
                  compound.name || compound.commonName || "Unknown",
                compound_formula: compound.formula,
                compound_category: compound.category,
              });
            }}
          >
            {allColumns.map(({ key }) =>
              visibleColumns[key] ? (
                <TableCell
                  key={key}
                  className={
                    "bg-white text-black dark:bg-zinc-900 dark:text-zinc-200 " +
                    // Padding responsivo
                    "px-1 py-2 sm:px-2 md:px-3 " +
                    // Tamanhos responsivos de fonte - mais agressivo
                    "text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm " +
                    // Quebra de palavra e linha
                    "break-words hyphens-auto leading-tight " +
                    // Largura mínima
                    "min-w-[60px] sm:min-w-[80px] md:min-w-0 " +
                    (centerAlignedColumns.includes(key) ? "text-center" : "")
                  }
                  style={{ 
                    width: `${columnWidths[key] || 100}px`,
                    maxWidth: `${columnWidths[key] || 100}px`
                  }}
                >
                  {key === "formula" ? (
                    <span
                      className="inline-block max-w-full overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: formatWithSub(getCellValue(compound, key)),
                      }}
                    />
                  ) : (
                    <span className="inline-block max-w-full overflow-hidden">
                      {getCellValue(compound, key)}
                    </span>
                  )}
                </TableCell>
              ) : null
            )}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={allColumns.filter((col) => visibleColumns[col.key]).length}
            className="text-center py-6 bg-white text-black dark:bg-zinc-900 dark:text-zinc-200 text-xs sm:text-sm md:text-base"
          >
            {t("compoundTable.noResults")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}