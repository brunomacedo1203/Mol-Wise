"use client";

import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableColumnKey } from "@/features/catalog/domain/types/TableColumnKey";
import React from "react";
import { extractLabelText } from "@/features/catalog/utils/extractLabelText";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

interface CompoundTableHeaderProps {
  allColumns: { key: TableColumnKey; label: React.ReactNode }[];
  visibleColumns: Record<TableColumnKey, boolean>;
  sortColumn: TableColumnKey;
  sortOrder: "asc" | "desc";
  handleSort: (key: TableColumnKey) => void;
  centerAlignedColumns: TableColumnKey[];
  columnWidths: Partial<Record<TableColumnKey, number>>;
}

export function CompoundTableHeader({
  allColumns,
  visibleColumns,
  sortColumn,
  sortOrder,
  handleSort,
  centerAlignedColumns,
  columnWidths,
}: CompoundTableHeaderProps) {
  const t = useTranslations();

  return (
    <TooltipProvider>
      <TableHeader>
        <TableRow className="dark:hover:bg-zinc-800 transition-colors">
          {allColumns.map(({ key, label }) => {
            const tooltipText = t(`catalog.tableHeaderDescriptions.${key}`);
            return visibleColumns[key] ? (
              <TableHead
                key={key}
                className={cn(
                  "cursor-pointer select-none font-bold break-words text-xs leading-tight px-2 bg-zinc-100 text-black dark:bg-zinc-800 dark:text-zinc-200",
                  key === "solubilityNumeric"
                    ? "text-right"
                    : centerAlignedColumns.includes(key) && "text-center"
                )}
                style={{ width: `${columnWidths[key] || 100}px` }}
                onClick={() => handleSort(key)}
              >
                {tooltipText &&
                !tooltipText.startsWith("catalog.tableHeaderDescriptions") ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        {typeof label === "string"
                          ? label
                          : extractLabelText(label)}
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
                    </TooltipTrigger>
                    <TooltipContent side="bottom">{tooltipText}</TooltipContent>
                  </Tooltip>
                ) : (
                  <div className="flex items-center gap-1">
                    {typeof label === "string"
                      ? label
                      : extractLabelText(label)}
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
                )}
              </TableHead>
            ) : null;
          })}
        </TableRow>
      </TableHeader>
    </TooltipProvider>
  );
}
