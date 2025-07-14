import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { TableColumnKey } from "@/features/catalog/domain/types/TableColumnKey";
import type { ExtendedCompound } from "@/features/catalog/hooks/common/useCompoundData";
import React from "react";
import { formatWithSub } from "@/shared/utils/formatWithSub";

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
            className="hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {allColumns.map(({ key }) =>
              visibleColumns[key] ? (
                <TableCell
                  key={key}
                  className={
                    "whitespace-nowrap overflow-hidden text-ellipsis bg-white text-black dark:bg-zinc-900 dark:text-zinc-200" +
                    (centerAlignedColumns.includes(key) ? " text-center" : "")
                  }
                  style={{ width: `${columnWidths[key] || 100}px` }}
                >
                  {key === "formula" ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: formatWithSub(getCellValue(compound, key)),
                      }}
                    />
                  ) : (
                    getCellValue(compound, key)
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
            className="text-center py-6 bg-white text-black dark:bg-zinc-900 dark:text-zinc-200"
          >
            {t("compoundTable.noResults")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
