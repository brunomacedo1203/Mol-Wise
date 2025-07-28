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
import { ChevronDown } from "lucide-react";

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
        w-full max-w-8xl mx-auto
        border border-zinc-300 dark:border-zinc-600
        bg-background dark:bg-zinc-900
        p-6 rounded-lg shadow-sm mb-6
      `}
    >
      <div
        className={`
          w-full grid grid-cols-1 lg:grid-cols-3 gap-6
          items-start lg:items-center
        `}
      >
        {/* Campo de busca - Esquerda */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
            {t("compoundTable.searchPlaceholder")}
          </label>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              w-full
              bg-white dark:bg-zinc-900
              border-2 border-border dark:border-zinc-400
              rounded-lg shadow-sm
              focus:ring-2 focus:ring-primary/30
              transition
            `}
          />
        </div>

        {/* Filtro por categoria - Centro */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900 dark:text-zinc-200">
            {t("catalog.categoryTags.placeholder")}
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`
                  w-full justify-between min-h-[40px]
                  bg-white dark:bg-zinc-900
                  border-2 border-border dark:border-zinc-400
                  text-gray-700 dark:text-zinc-200
                  hover:bg-gray-50 dark:hover:bg-zinc-800
                  transition rounded-lg
                `}
              >
                <div className="flex items-center gap-2 flex-wrap flex-1">
                  {selectedCategories.length === 0 ? (
                    <span className="text-sm text-gray-400"></span>
                  ) : (
                    <div className="flex items-center gap-1 flex-wrap">
                      {selectedCategories.map((category) => (
                        <span
                          key={category}
                          className={`
                            inline-flex items-center px-2 py-1 rounded-full text-xs
                            bg-gray-100 dark:bg-zinc-800
                            text-gray-700 dark:text-zinc-200
                            border border-gray-200 dark:border-zinc-700
                          `}
                        >
                          {t(`catalog.categoryTags.${category}`)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <ChevronDown className="h-4 w-4 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={`
                w-80
                bg-white dark:bg-zinc-900
                border border-border dark:border-zinc-400
                rounded-lg shadow-lg
              `}
            >
              {/* Opção Limpar todas */}
              {selectedCategories.length > 0 && (
                <div className="px-2 py-1.5 border-b border-gray-200 dark:border-zinc-700">
                  <button
                    onClick={() => setSelectedCategories([])}
                    className={`
                      w-full text-left text-sm text-red-600 dark:text-red-400
                      hover:bg-red-50 dark:hover:bg-red-900/20
                      px-2 py-1 rounded
                      transition
                    `}
                  >
                    {t("catalog.categoryTags.clearAll")}
                  </button>
                </div>
              )}

              {CATEGORY_TAGS.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag.id}
                  checked={selectedCategories.includes(tag.id)}
                  onCheckedChange={() => {
                    if (selectedCategories.includes(tag.id)) {
                      setSelectedCategories(
                        selectedCategories.filter((cat) => cat !== tag.id)
                      );
                    } else {
                      setSelectedCategories([...selectedCategories, tag.id]);
                    }
                  }}
                  onSelect={(e) => e.preventDefault()}
                  className={`
                    text-gray-700 dark:text-zinc-200
                    hover:bg-gray-100 dark:hover:bg-zinc-800
                    rounded
                  `}
                >
                  {t(`catalog.categoryTags.${tag.id}`)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Botão de colunas - Direita */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
            {t("compoundTable.columns")}
          </label>
          <DropdownMenu
            open={columnsMenuOpen}
            onOpenChange={setColumnsMenuOpen}
          >
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
                <span className="text-sm">{t("compoundTable.columns")}</span>
                <ChevronDown className="h-4 w-4 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className={`
                w-48
                bg-white dark:bg-zinc-900
                border border-border dark:border-zinc-400
                rounded-lg shadow-lg
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
