import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableColumnKey } from "@/features/catalog/domain/types/TableColumnKey";
import React from "react";
import { extractLabelText } from "@/features/catalog/utils/extractLabelText";

interface CompoundTableToolbarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  columnsMenuOpen: boolean;
  setColumnsMenuOpen: (open: boolean) => void;
  allColumns: { key: TableColumnKey; label: React.ReactNode }[];
  visibleColumns: Record<TableColumnKey, boolean>;
  toggleColumn: (col: TableColumnKey) => void;
  t: (key: string) => string;
}

export function CompoundTableToolbar({
  searchTerm,
  setSearchTerm,
  columnsMenuOpen,
  setColumnsMenuOpen,
  allColumns,
  visibleColumns,
  toggleColumn,
  t,
}: CompoundTableToolbarProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
      <Input
        placeholder={t("compoundTable.searchPlaceholder")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-72"
      />
      <DropdownMenu open={columnsMenuOpen} onOpenChange={setColumnsMenuOpen}>
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
              onCheckedChange={() => {
                toggleColumn(key);
              }}
              onSelect={(e) => e.preventDefault()}
            >
              {typeof label === "string" ? label : extractLabelText(label)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
