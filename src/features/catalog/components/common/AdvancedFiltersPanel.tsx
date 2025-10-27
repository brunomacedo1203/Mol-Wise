"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import type { BasicAdvancedFilters } from "../../domain/types/ChemicalCompound";
import { MultiSelect } from "@/components/ui/multi-select";

interface AdvancedFiltersPanelProps {
  filters: BasicAdvancedFilters;
  onFiltersChange: (filters: BasicAdvancedFilters) => void;
  onReset: () => void;
  isOpen: boolean;
  onToggle: () => void;
  isActive: boolean;
}

export function AdvancedFiltersPanel({
  filters,
  onFiltersChange,
  onReset,
  isOpen,
  onToggle,
  isActive,
}: AdvancedFiltersPanelProps) {
  const t = useTranslations();
  const [localFilters, setLocalFilters] =
    useState<BasicAdvancedFilters>(filters);

  // Sincronizar estado local com props quando elas mudarem
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleRangeChange = (
    property: keyof Pick<
      BasicAdvancedFilters,
      "meltingPoint" | "boilingPoint" | "density" | "molarMass"
    >,
    field: "min" | "max",
    value: string
  ) => {
    const numValue = value === "" ? null : parseFloat(value);
    setLocalFilters((prev) => ({
      ...prev,
      [property]: {
        ...prev[property],
        [field]: numValue,
      },
    }));
  };

  const handlePhysicalFormChange = (selected: string[]) => {
    setLocalFilters((prev) => ({
      ...prev,
      physicalForms: selected,
    }));
  };

  const handleSolubilityChange = (selected: string[]) => {
    setLocalFilters((prev) => ({
      ...prev,
      solubilityTypes: selected,
    }));
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
  };

  const handleReset = () => {
    const resetFilters: BasicAdvancedFilters = {
      meltingPoint: { min: null, max: null },
      boilingPoint: { min: null, max: null },
      density: { min: null, max: null },
      molarMass: { min: null, max: null },
      physicalForms: [],
      solubilityTypes: [],
    };
    setLocalFilters(resetFilters);
    onReset();
  };

  const activeFiltersCount = [
    filters.meltingPoint.min !== null || filters.meltingPoint.max !== null,
    filters.boilingPoint.min !== null || filters.boilingPoint.max !== null,
    filters.density.min !== null || filters.density.max !== null,
    filters.molarMass.min !== null || filters.molarMass.max !== null,
    filters.physicalForms.length > 0,
    filters.solubilityTypes.length > 0,
  ].filter(Boolean).length;

  // Opções para os multi-selects
  const physicalFormOptions = [
    "Solid",
    "Crystals",
    "Liquid",
    "Powder",
    "Gas",
    "Solution",
  ].map((form) => ({
    label: t(`physicalFormTerms.${form}`),
    value: form,
  }));

  const solubilityOptions = [
    "Soluble",
    "Insoluble",
    "Sparingly",
    "Highly",
    "Miscible",
    "Reacts",
  ].map((type) => ({
    label: t(`solubilityTerms.${type}`),
    value: type,
  }));

  return (
    <div className="mb-2 border border-zinc-400 dark:border-zinc-700 rounded-lg bg-background dark:bg-zinc-900">
      <div
        className={`px-4 py-2 ${isOpen ? "border-b border-zinc-400 dark:border-zinc-700" : ""} cursor-pointer`}
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <h3 className="text-sm font-semibold">
              {t("catalog.advancedFilters.title")}
            </h3>
            {isActive && activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} {t("catalog.advancedFilters.active")}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {isOpen && (
        <>
          <div className="px-4 py-1 space-y-1 mb-2">
            {/* Faixas de Valores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(
                [
                  {
                    key: "meltingPoint",
                    label: `${t("catalog.advancedFilters.meltingPoint")} (°C)`,
                  },
                  {
                    key: "boilingPoint",
                    label: `${t("catalog.advancedFilters.boilingPoint")} (°C)`,
                  },
                  {
                    key: "density",
                    label: `${t("catalog.advancedFilters.density")} (g/cm³)`,
                    step: "0.01",
                  },
                  {
                    key: "molarMass",
                    label: `${t("catalog.advancedFilters.molarMass")} (g/mol)`,
                  },
                ] as {
                  key: keyof Pick<
                    BasicAdvancedFilters,
                    "meltingPoint" | "boilingPoint" | "density" | "molarMass"
                  >;
                  label: string;
                  step?: string;
                }[]
              ).map(({ key, label, step }) => (
                <div key={key} className="space-y-1">
                  <Label className="text-sm font-bold">{label}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      step={step}
                      placeholder={t("catalog.advancedFilters.min")}
                      value={localFilters[key].min ?? ""}
                      onChange={(e) =>
                        handleRangeChange(key, "min", e.target.value)
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      step={step}
                      placeholder={t("catalog.advancedFilters.max")}
                      value={localFilters[key].max ?? ""}
                      onChange={(e) =>
                        handleRangeChange(key, "max", e.target.value)
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Formas Físicas */}
            <div className="space-y-2">
              <Label className="text-sm font-bold">
                {t("catalog.advancedFilters.physicalForms")}
              </Label>
              <MultiSelect
                id="physical-forms-filter"
                options={physicalFormOptions}
                onValueChange={handlePhysicalFormChange}
                defaultValue={localFilters.physicalForms}
                componentId="advanced-filters-physical-forms"
                customConfig={{
                  maxDisplayCount: 2,
                  showCount: true,
                }}
              />
            </div>

            {/* Tipos de Solubilidade */}
            <div className="space-y-2">
              <Label className="text-sm font-bold">
                {t("catalog.advancedFilters.solubilityTypes")}
              </Label>
              <MultiSelect
                id="solubility-types-filter"
                options={solubilityOptions}
                onValueChange={handleSolubilityChange}
                defaultValue={localFilters.solubilityTypes}
                componentId="advanced-filters-solubility"
                customConfig={{
                  maxDisplayCount: 3,
                  showCount: true,
                }}
              />
            </div>
          </div>

          {/* Botões na parte inferior */}
          <div className="px-4 py-2 border-t border-zinc-400 dark:border-zinc-700">
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="border-zinc-500 hover:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border-zinc-500 dark:hover:border-zinc-400 dark:text-zinc-100"
              >
                {t("catalog.advancedFilters.reset")}
              </Button>
              <Button
                size="sm"
                onClick={handleApply}
                className="dark:bg-zinc-200 dark:hover:bg-zinc-300 dark:text-black"
              >
                {t("catalog.advancedFilters.apply")}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
