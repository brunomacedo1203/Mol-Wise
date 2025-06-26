"use client";

import { CompoundTable } from "@/features/catalog/components/common/CompoundTable";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";
import Page from "@/shared/components/layout/Page";
import { useTranslations } from "next-intl";

export default function CatalogPage() {
  const t = useTranslations("catalog");

  return (
    <SubtitleProvider subtitle={t("subtitle")}>
      <Page title={t("title")}>
        <CompoundTable />
      </Page>
    </SubtitleProvider>
  );
}
