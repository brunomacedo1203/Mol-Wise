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
        <span className="block text-center leading-[1.2] text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm">
          <div className="whitespace-nowrap">{title}</div>
          {subtitle && <div className="whitespace-nowrap">{subtitle}</div>}
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