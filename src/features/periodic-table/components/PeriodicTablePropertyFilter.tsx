"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { usePeriodicTableStore } from "../store/periodicTableStore";
import {
  periodicPropertyOptions,
  type PeriodicPropertyId,
} from "../config/propertyFilterOptions";

export default function PeriodicTablePropertyFilter() {
  const t = useTranslations("periodicTable");
  const activeProperty = usePeriodicTableStore(
    (state) => state.activePropertyFilter
  );
  const setActiveProperty = usePeriodicTableStore(
    (state) => state.setActivePropertyFilter
  );

  const handleChange = (value: string) => {
    if (!value || value === "none") {
      setActiveProperty(null);
      return;
    }

    setActiveProperty(value as PeriodicPropertyId);
  };

  const selectValue = activeProperty ?? "none";

  return (
    <div className="p-4">
      <label className="px-1 text-lg font-medium text-zinc-800 dark:text-zinc-200 block">
        <strong>{t("periodicProperties.label")}</strong>
      </label>
      <Select value={selectValue} onValueChange={handleChange}>
        <SelectTrigger className="mt-2 w-full md:w-auto min-w-[240px]">
          <SelectValue placeholder={t("periodicProperties.placeholder")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">
            {t("periodicProperties.clearOption")}
          </SelectItem>
          {periodicPropertyOptions.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.unitKey
                ? `${t(option.labelKey)} (${t(option.unitKey)})`
                : t(option.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
