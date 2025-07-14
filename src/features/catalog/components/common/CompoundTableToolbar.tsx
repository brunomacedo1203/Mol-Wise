"use client";

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
import { CategoryTagsSelector } from "../CategoryTagsSelector";
import { CATEGORY_TAGS } from "../../domain/categoryTags";
import type { CompoundCategory } from "@/features/catalog/domain/types/ChemicalCompound";

interface CompoundTableToolbarProps {
  selectedCategories: CompoundCategory[];
  setSelectedCategories: (cats: CompoundCategory[]) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  columnsMenuOpen: boolean;
  setColumnsMenuOpen: (open: boolean) => void;
  allColumns: { key: TableColumnKey; label: React.ReactNode }[];
  visibleColumns: Record<TableColumnKey, boolean>;
  toggleColumn: (col: TableColumnKey) => void;
  t: (key: string) => string;
}

export { CategoryTagsSelector };

export function CompoundTableToolbar({
  selectedCategories,
  setSelectedCategories,
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
    <div
      className={`
        w-full max-w-6xl mx-auto
        bg-background dark:bg-zinc-900
        border border-border dark:border-zinc-700
        p-4 rounded-lg shadow mb-6
      `}
    >
      <div
        className={`
          w-full flex flex-col gap-4
          md:flex-row md:items-center md:justify-between
        `}
      >
        {/* Campo de busca */}
        <div className="flex-1 min-w-[200px] flex justify-center md:justify-start">
          <Input
            placeholder={t("compoundTable.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              w-full md:w-72
              bg-white dark:bg-zinc-900
              border-2 border-border dark:border-zinc-400
              rounded-md shadow-sm
              focus:ring-2 focus:ring-primary/30
              transition
            `}
          />
        </div>

        {/* Filtro por categoria */}
        <div className="flex-1 min-w-[250px] flex justify-center">
          <CategoryTagsSelector
            tags={CATEGORY_TAGS}
            selected={selectedCategories}
            onChange={setSelectedCategories}
          />
        </div>

        {/* Botão de colunas */}
        <div className="flex-1 min-w-[120px] flex justify-center md:justify-end">
          <DropdownMenu
            open={columnsMenuOpen}
            onOpenChange={setColumnsMenuOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`
                  border-2 border-border dark:border-zinc-400
                  bg-gray-50 dark:bg-zinc-800
                  text-gray-700 dark:text-zinc-200
                  hover:bg-gray-100 dark:hover:bg-zinc-700
                  transition
                `}
              >
                {t("compoundTable.columns")}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className={`
                w-48
                bg-white dark:bg-zinc-900
                border border-border dark:border-zinc-400
                rounded-md shadow-lg
              `}
            >
              {allColumns.map(({ key, label }) => (
                <DropdownMenuCheckboxItem
                  key={key}
                  checked={visibleColumns[key]}
                  onCheckedChange={() => toggleColumn(key)}
                  onSelect={(e) => e.preventDefault()}
                  className={`
                    text-gray-700 dark:text-zinc-200
                    hover:bg-gray-100 dark:hover:bg-zinc-800
                    rounded
                  `}
                >
                  {typeof label === "string" ? label : extractLabelText(label)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
