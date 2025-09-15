"use client";

import { Input } from "@/components/ui/input";
import { TableColumnKey } from "@/features/catalog/domain/types/TableColumnKey";
import React from "react";
import type { CompoundCategory } from "@/features/catalog/domain/types/ChemicalCompound";
import { ColumnsDropdown } from "./ColumnsDropdown";
import { CategoryDropdown } from "./CategoryDropdown";
import { useTranslations } from "next-intl";

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
}

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
}: CompoundTableToolbarProps) {
  const t = useTranslations();
  
  return (
    <div className="p-2 border border-zinc-400 dark:border-zinc-600 rounded-lg bg-background dark:bg-zinc-900">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campo de busca - Esquerda */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
            {t("compoundTable.search")}
          </label>
          <Input
            type="text"
            placeholder={t("compoundTable.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white dark:bg-zinc-900 border-2 border-border dark:border-zinc-400 text-gray-700 dark:text-zinc-200"
          />
        </div>

        {/* Dropdown de categorias - Centro */}
        <CategoryDropdown
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        {/* Dropdown de colunas - Direita */}
        <ColumnsDropdown
          allColumns={allColumns}
          visibleColumns={visibleColumns}
          toggleColumn={toggleColumn}
          columnsMenuOpen={columnsMenuOpen}
          setColumnsMenuOpen={setColumnsMenuOpen}
          t={t}
        />
      </div>
    </div>
  );
}
