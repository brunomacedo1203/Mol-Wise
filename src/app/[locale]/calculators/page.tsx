"use client";
import { CalculatorPageContent } from "@/features/calculators/components/common/CalculatorPageContent";
import { useEffect } from "react";
import { useSubtitleStore } from "@/shared/store/subtitleStore";
import Page from "@/shared/components/layout/Page";
import { useTranslations } from "next-intl";

export default function CalculatorsPage() {
  const t = useTranslations("calculators");
  const setSubtitle = useSubtitleStore((state) => state.setSubtitle);
  useEffect(() => {
    setSubtitle(t("subtitle"));
    return () => setSubtitle("");
  }, [setSubtitle, t]);

  return (
    <Page title={t("title")}>
      <CalculatorPageContent />
    </Page>
  );
}
