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
}

export function CompoundTableHeader({
  allColumns,
  visibleColumns,
  sortColumn,
  sortOrder,
  handleSort,
  centerAlignedColumns,
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
                  "cursor-pointer select-none font-bold leading-tight bg-zinc-100 text-black dark:bg-zinc-800 dark:text-zinc-200",
                  // Padding responsivo
                  "px-1 py-2 sm:px-2 md:px-3",
                  // Tamanhos responsivos de fonte - mais agressivo
                  "text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm",
                  // Largura mínima para mobile
                  "min-w-[60px] sm:min-w-[80px] md:min-w-0",
                  // Quebra de palavra
                  "break-words hyphens-auto",
                  key === "solubilityNumeric"
                    ? "text-right"
                    : centerAlignedColumns.includes(key) && "text-center"
                )}
                onClick={() => handleSort(key)}
              >
                {tooltipText &&
                !tooltipText.startsWith("catalog.tableHeaderDescriptions") ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <span className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm leading-tight">
                          {typeof label === "string"
                            ? label
                            : extractLabelText(label)}
                        </span>
                        {sortColumn === key ? (
                          sortOrder === "asc" ? (
                            <ArrowUp className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
                          ) : (
                            <ArrowDown className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-2 h-2 sm:w-3 sm:h-3 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      {tooltipText}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <span className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm leading-tight">
                      {typeof label === "string"
                        ? label
                        : extractLabelText(label)}
                    </span>
                    {sortColumn === key ? (
                      sortOrder === "asc" ? (
                        <ArrowUp className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
                      ) : (
                        <ArrowDown className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
                      )
                    ) : (
                      <ChevronsUpDown className="w-2 h-2 sm:w-3 sm:h-3 text-muted-foreground flex-shrink-0" />
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