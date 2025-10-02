"use client";

import Page from "@/shared/components/layout/Page";
import { VisualizationPageContent } from "@/features/visualization/components/VisualizationPageContent";
import { useEffect } from "react";
import { useSubtitleStore } from "@/shared/store/subtitleStore";
import { useTranslations } from "next-intl";

export default function VisualizationClient() {
  const t = useTranslations("visualization");
  const setSubtitle = useSubtitleStore((s) => s.setSubtitle);

  useEffect(() => {
    setSubtitle(t("subtitle"));
    return () => setSubtitle("");
  }, [setSubtitle, t]);

  return (
    <Page title={t("title")}>
      <VisualizationPageContent />
    </Page>
  );
}
