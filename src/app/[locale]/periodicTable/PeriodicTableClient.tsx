"use client";

import PeriodicTableCards from "@/features/periodic-table/components/PeriodicTableCards";
import { useEffect } from "react";
import { useSubtitleStore } from "@/shared/store/subtitleStore";
import Page from "@/shared/components/layout/Page";
import { useTranslations } from "next-intl";

export default function PeriodicTableClient() {
  const t = useTranslations("periodicTable");
  const setSubtitle = useSubtitleStore((state) => state.setSubtitle);

  useEffect(() => {
    setSubtitle(t("subtitle"));
    return () => setSubtitle("");
  }, [setSubtitle, t]);

  return (
    <Page title={t("title")}>
      <PeriodicTableCards />
    </Page>
  );
}