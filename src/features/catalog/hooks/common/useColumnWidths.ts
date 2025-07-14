import { useMemo } from "react";
import { TableColumnKey } from "@/features/catalog/domain/types/TableColumnKey";
import { ChemicalCompound } from "@/features/catalog/domain/types/ChemicalCompound";
import React from "react";
import { extractLabelText } from "@/features/catalog/utils/extractLabelText";

export function useColumnWidths<T extends ChemicalCompound>(
  compounds: T[],
  allColumns: { key: TableColumnKey; label: React.ReactNode }[],
  getCellValue: (compound: T, key: TableColumnKey) => string
) {
  return useMemo(() => {
    const widths: Partial<Record<TableColumnKey, number>> = {};
    allColumns.forEach(({ key }) => {
      let maxWidth = 0;
      const rawLabel = allColumns.find((col) => col.key === key)?.label;
      const labelText = extractLabelText(rawLabel);
      maxWidth = Math.max(maxWidth, labelText.length * 8 + 40);
      compounds.forEach((compound) => {
        const cellValue = getCellValue(compound, key);
        maxWidth = Math.max(maxWidth, cellValue.length * 8 + 20);
      });
      widths[key] =
        key === "solubilityNumeric"
          ? Math.min(Math.max(maxWidth, 140), 300)
          : Math.min(Math.max(maxWidth, 80), 300);
    });
    return widths;
  }, [compounds, allColumns, getCellValue]);
} 