"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import type { BasicAdvancedFilters } from "../../domain/types/ChemicalCompound";

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

  const handlePhysicalFormToggle = (form: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      physicalForms: prev.physicalForms.includes(form)
        ? prev.physicalForms.filter((f) => f !== form)
        : [...prev.physicalForms, form],
    }));
  };

  const handleSolubilityToggle = (type: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      solubilityTypes: prev.solubilityTypes.includes(type)
        ? prev.solubilityTypes.filter((t) => t !== type)
        : [...prev.solubilityTypes, type],
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

  return (
    <div className="mb-2 border rounded-lg bg-background dark:bg-zinc-900 dark:border-zinc-700">
      <div className="p-4 border-b dark:border-zinc-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <h3 className="text-lg font-semibold">
              {t("catalog.advancedFilters.title")}
            </h3>
            {isActive && activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} {t("catalog.advancedFilters.active")}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isActive && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                {t("catalog.advancedFilters.reset")}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="p-1"
            >
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 space-y-6">
          {/* Faixas de Valores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ponto de Fusão */}
            <div className="space-y-2">
              <Label className="text-sm font-bold">
                {t("catalog.advancedFilters.meltingPoint")} (°C)
              </Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder={t("catalog.advancedFilters.min")}
                  value={localFilters.meltingPoint.min ?? ""}
                  onChange={(e) =>
                    handleRangeChange("meltingPoint", "min", e.target.value)
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder={t("catalog.advancedFilters.max")}
                  value={localFilters.meltingPoint.max ?? ""}
                  onChange={(e) =>
                    handleRangeChange("meltingPoint", "max", e.target.value)
                  }
                  className="flex-1"
                />
              </div>
            </div>

            {/* Ponto de Ebulição */}
            <div className="space-y-2">
              <Label className="text-sm font-bold">
                {t("catalog.advancedFilters.boilingPoint")} (°C)
              </Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder={t("catalog.advancedFilters.min")}
                  value={localFilters.boilingPoint.min ?? ""}
                  onChange={(e) =>
                    handleRangeChange("boilingPoint", "min", e.target.value)
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder={t("catalog.advancedFilters.max")}
                  value={localFilters.boilingPoint.max ?? ""}
                  onChange={(e) =>
                    handleRangeChange("boilingPoint", "max", e.target.value)
                  }
                  className="flex-1"
                />
              </div>
            </div>

            {/* Densidade */}
            <div className="space-y-2">
              <Label className="text-sm font-bold">
                {t("catalog.advancedFilters.density")} (g/cm³)
              </Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.01"
                  placeholder={t("catalog.advancedFilters.min")}
                  value={localFilters.density.min ?? ""}
                  onChange={(e) =>
                    handleRangeChange("density", "min", e.target.value)
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder={t("catalog.advancedFilters.max")}
                  value={localFilters.density.max ?? ""}
                  onChange={(e) =>
                    handleRangeChange("density", "max", e.target.value)
                  }
                  className="flex-1"
                />
              </div>
            </div>

            {/* Massa Molar */}
            <div className="space-y-2">
              <Label className="text-sm font-bold">
                {t("catalog.advancedFilters.molarMass")} (g/mol)
              </Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder={t("catalog.advancedFilters.min")}
                  value={localFilters.molarMass.min ?? ""}
                  onChange={(e) =>
                    handleRangeChange("molarMass", "min", e.target.value)
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder={t("catalog.advancedFilters.max")}
                  value={localFilters.molarMass.max ?? ""}
                  onChange={(e) =>
                    handleRangeChange("molarMass", "max", e.target.value)
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Formas Físicas */}
          <div className="space-y-3">
            <Label className="text-sm font-bold">
              {t("catalog.advancedFilters.physicalForms")}
            </Label>
            <div className="flex flex-wrap gap-x-8 gap-y-1">
              {["Solid", "Crystals", "Liquid", "Powder", "Gas", "Solution"].map(
                (form) => (
                  <div
                    key={form}
                    className="flex items-center space-x-2 min-w-[120px]"
                  >
                    <Checkbox
                      id={`physical-${form}`}
                      checked={localFilters.physicalForms.includes(form)}
                      onCheckedChange={() => handlePhysicalFormToggle(form)}
                    />
                    <Label
                      htmlFor={`physical-${form}`}
                      className="text-sm cursor-pointer"
                    >
                      {t(`physicalFormTerms.${form}`)}
                    </Label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Tipos de Solubilidade */}
          <div className="space-y-3">
            <Label className="text-sm font-bold">
              {t("catalog.advancedFilters.solubilityTypes")}
            </Label>
            <div className="flex flex-wrap gap-x-8 gap-y-1">
              {[
                "Soluble",
                "Insoluble",
                "Sparingly",
                "Highly",
                "Miscible",
                "Reacts",
              ].map((type) => (
                <div
                  key={type}
                  className="flex items-center space-x-2 min-w-[180px]"
                >
                  <Checkbox
                    id={`solubility-${type}`}
                    checked={localFilters.solubilityTypes.includes(type)}
                    onCheckedChange={() => handleSolubilityToggle(type)}
                  />
                  <Label
                    htmlFor={`solubility-${type}`}
                    className="text-sm cursor-pointer"
                  >
                    {t(`solubilityTerms.${type}`)}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-2 pt-4 border-t dark:border-zinc-700">
            <Button variant="outline" onClick={handleReset} size="sm">
              {t("catalog.advancedFilters.reset")}
            </Button>
            <Button onClick={handleApply} size="sm">
              {t("catalog.advancedFilters.apply")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
