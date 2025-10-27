"use client";

import React from "react";
import { useTranslations } from "next-intl";
import PeriodicTableFilterDropdown from "./common/PeriodicTableFilterDropdown";
import { usePeriodicTableStore } from "../store/periodicTableStore";
import { getFilterOptions } from "../config/filterOptions";
import { handleFilterChangeFactory } from "../utils/filterHandlers";

export default function PeriodicTableFilter() {
  const t = useTranslations("periodicTable");
  const filters = usePeriodicTableStore((state) => state.filters);
  const setFilters = usePeriodicTableStore((state) => state.setFilters);
  
  const filterOptions = getFilterOptions(t);
  const handleFilterChange = handleFilterChangeFactory(
    filterOptions,
    setFilters,
    filters
  );

  return (
    <div className="px-4 pt-2 pb-4 space-y-1">
      <label className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
        {t("periodicClassification")}
      </label>
      <PeriodicTableFilterDropdown
        options={filterOptions}
        values={
          filters.length === filterOptions.length - 1
            ? ["ALL", ...filters]
            : filters
        }
        onChange={handleFilterChange}
        placeholder={t("filterPlaceholder")}
      />
    </div>
  );
}
