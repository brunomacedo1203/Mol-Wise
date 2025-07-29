import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { TableColumnKey } from "../../domain/types/TableColumnKey";
import { extractLabelText } from "../../utils/extractLabelText";

interface ColumnsDropdownProps {
  allColumns: { key: TableColumnKey; label: React.ReactNode }[];
  visibleColumns: Record<TableColumnKey, boolean>;
  toggleColumn: (col: TableColumnKey) => void;
  columnsMenuOpen: boolean;
  setColumnsMenuOpen: (open: boolean) => void;
  t: (key: string) => string;
}

export function ColumnsDropdown({
  allColumns,
  visibleColumns,
  toggleColumn,
  columnsMenuOpen,
  setColumnsMenuOpen,
  t,
}: ColumnsDropdownProps) {
  const visibleCount = Object.values(visibleColumns).filter(Boolean).length;
  const totalCount = allColumns.length;

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
        {t("compoundTable.columns")}
      </label>
      <DropdownMenu open={columnsMenuOpen} onOpenChange={setColumnsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`
              w-full justify-between
              bg-white dark:bg-zinc-900
              border-2 border-border dark:border-zinc-400
              text-gray-700 dark:text-zinc-200
              hover:bg-gray-50 dark:hover:bg-zinc-800
              transition rounded-lg
            `}
          >
            <span className="text-sm">
              {visibleCount === totalCount
                ? t("compoundTable.columns")
                : `${visibleCount}/${totalCount} ${t("compoundTable.columns")}`}
            </span>
            <ChevronDown className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={`
            w-64
            bg-white dark:bg-zinc-900
            border border-zinc-300 dark:border-zinc-600
            rounded-lg shadow-lg
            p-0
          `}
          align="start"
        >
          {/* Header com Select All */}
          <div className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => {
                const allVisible = visibleCount === totalCount;
                allColumns.forEach(({ key }) => {
                  if (allVisible) {
                    // Desmarcar todas
                    if (visibleColumns[key]) {
                      toggleColumn(key);
                    }
                  } else {
                    // Marcar todas
                    if (!visibleColumns[key]) {
                      toggleColumn(key);
                    }
                  }
                });
              }}
              className={`
                w-full text-left text-sm px-2 py-1.5 rounded
                hover:bg-gray-100 dark:hover:bg-zinc-800
                transition
                ${
                  visibleCount === totalCount
                    ? "text-red-600 dark:text-red-400"
                    : "text-blue-600 dark:text-blue-400"
                }
              `}
            >
              {visibleCount === totalCount ? "(Deselect All)" : "(Select All)"}
            </button>
          </div>

          {/* Lista de colunas */}
          <div className="max-h-60 overflow-y-auto">
            {allColumns.map(({ key, label }) => {
              const isSelected = visibleColumns[key];
              const labelText =
                typeof label === "string" ? label : extractLabelText(label);

              return (
                <button
                  key={key}
                  onClick={() => toggleColumn(key)}
                  className={`
                    w-full text-left px-3 py-2 text-sm
                    hover:bg-gray-100 dark:hover:bg-zinc-800
                    transition flex items-center gap-2
                    ${
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-zinc-200"
                    }
                  `}
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <span className="flex-1">{labelText}</span>
                </button>
              );
            })}
          </div>

          {/* Footer com Close */}
          <div className="px-3 py-2 border-t border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setColumnsMenuOpen(false)}
              className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Close
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
