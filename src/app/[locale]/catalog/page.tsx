"use client";

import { CompoundTable } from "@/features/catalog/components/common/CompoundTable";
import { useEffect } from "react";
import { useSubtitleStore } from "@/shared/store/subtitleStore";
import Page from "@/shared/components/layout/Page";
import { useTranslations } from "next-intl";

export default function CatalogPage() {
  const t = useTranslations("catalog");
  const setSubtitle = useSubtitleStore((state) => state.setSubtitle);

  useEffect(() => {
    setSubtitle(t("subtitle"));
    return () => setSubtitle("");
  }, [setSubtitle, t]);

  return (
    <Page title={t("title")}>
      <div className="w-full overflow-x-auto flex-1">
        <CompoundTable data={[]} />
      </div>
    </Page>
  );
}
