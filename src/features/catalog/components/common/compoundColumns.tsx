import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { TableColumnKey } from "@/features/catalog/domain/types/TableColumnKey";

export function useCompoundColumns() {
  const t = useTranslations();

  return useMemo(() => {
    const renderSplitLabel = (translationKey: string) => {
      const translatedText = t(translationKey);
      const [title, subtitle] = translatedText.split("\n");
      return (
        <span className="block text-center leading-tight">
          <div>{title}</div>
          {subtitle && <div>{subtitle}</div>}
        </span>
      );
    };

    return [
      { key: "id" as TableColumnKey, label: t("catalog.tableHeaders.no") },
      { key: "name" as TableColumnKey, label: t("catalog.tableHeaders.name") },
      {
        key: "commonName" as TableColumnKey,
        label: t("catalog.tableHeaders.commonName"),
      },

      {
        key: "formula" as TableColumnKey,
        label: t("catalog.tableHeaders.formula"),
      },
      {
        key: "casNumber" as TableColumnKey,
        label: t("catalog.tableHeaders.casNumber"),
      },
      {
        key: "molarMass" as TableColumnKey,
        label: t("catalog.tableHeaders.molarMass"),
      },
      {
        key: "physicalForm" as TableColumnKey,
        label: t("catalog.tableHeaders.physicalForm"),
      },
      {
        key: "meltingPoint" as TableColumnKey,
        label: t("catalog.tableHeaders.meltingPoint"),
      },
      {
        key: "boilingPoint" as TableColumnKey,
        label: t("catalog.tableHeaders.boilingPoint"),
      },
      {
        key: "density" as TableColumnKey,
        label: renderSplitLabel("catalog.tableHeaders.density"),
      },
      {
        key: "solubilityNumeric" as TableColumnKey,
        label: renderSplitLabel("catalog.tableHeaders.solubilityNumeric"),
      },
      {
        key: "solubilityQualitative" as TableColumnKey,
        label: renderSplitLabel("catalog.tableHeaders.solubilityQualitative"),
      },
    ];
  }, [t]);
}
