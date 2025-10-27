"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { MultiSelect } from "@/components/ui/multi-select";
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

  const multiSelectOptions = periodicPropertyOptions.map((option) => ({
    label: option.unitKey
      ? `${t(option.labelKey)} (${t(option.unitKey)})`
      : t(option.labelKey),
    value: option.id,
  }));

  const handleChange = (values: string[]) => {
    if (!values.length) {
      setActiveProperty(null);
      return;
    }

    const lastValue = values[values.length - 1] as PeriodicPropertyId;
    setActiveProperty(lastValue);
  };

  const selectedValues = activeProperty ? [activeProperty] : [];

  return (
    <div className="p-4 space-y-2">
      <label className="px-1 text-lg font-medium text-zinc-800 dark:text-zinc-200 block">
        <strong>{t("periodicProperties.label")}</strong>
      </label>
      <MultiSelect
        id="periodic-property-filter"
        options={multiSelectOptions}
        value={selectedValues}
        defaultValue={selectedValues}
        onValueChange={handleChange}
        placeholder={t("periodicProperties.placeholder")}
        maxCount={1}
        className="w-auto"
        customConfig={{
          maxDisplayCount: 1,
          allowSelectAll: false,
          showCount: false,
        }}
      />
    </div>
  );
}
