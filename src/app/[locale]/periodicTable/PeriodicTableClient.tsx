"use client";

import { useEffect } from "react";
import { useSubtitleStore } from "@/shared/store/subtitleStore";
import Page from "@/shared/components/layout/Page";
import { useTranslations } from "next-intl";
import PeriodicTableCards from "@/features/periodic-table/components/PeriodicTableCards";
import PeriodicTableFilter from "@/features/periodic-table/components/PeriodicTableFilter";

export default function PeriodicTableClient() {
  const t = useTranslations("periodicTable");
  const setSubtitle = useSubtitleStore((state) => state.setSubtitle);

  useEffect(() => {
    setSubtitle(t("subtitle"));
    return () => setSubtitle("");
  }, [setSubtitle, t]);

  return (
    <Page title={t("title")}>
      <div className="relative h-full flex flex-col">
        {/* Filtro fixo no topo */}
        <div className="fixed z-50 bg-white dark:bg-neutral-950 border-b border-zinc-200 dark:border-neutral-800">
          <PeriodicTableFilter />
        </div>
        
        {/* Conteúdo com scroll */}
        <div className="flex-1 overflow-y-auto">
          <PeriodicTableCards />
        </div>
      </div>
    </Page>
  );
}
