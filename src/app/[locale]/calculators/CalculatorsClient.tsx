"use client";

import { CalculatorPageContent } from "@/features/calculators/components/common/CalculatorPageContent";
import { useEffect } from "react";
import { useSubtitleStore } from "@/shared/store/subtitleStore";
import { useCalculatorInstancesStore } from "@/features/calculators/store/calculatorInstancesStore";
import { useSearchParams } from "next/navigation";
import Page from "@/shared/components/layout/Page";
import { useTranslations } from "next-intl";

export default function CalculatorsClient() {
  const t = useTranslations("calculators");
  const setSubtitle = useSubtitleStore((state) => state.setSubtitle);
  const addCalculator = useCalculatorInstancesStore((state) => state.addCalculator);
  const searchParams = useSearchParams();

  useEffect(() => {
    setSubtitle(t("subtitle"));
    return () => setSubtitle("");
  }, [setSubtitle, t]);

  // Processar parâmetro de query string para abrir calculadora específica
  useEffect(() => {
    const openCalculator = searchParams.get("open");
    if (openCalculator) {
      const position = {
        x: 100 + Math.random() * 100,
        y: 100 + Math.random() * 100,
        width: 750,
      };
      addCalculator(openCalculator as any, position);
    }
  }, [searchParams, addCalculator]);

  return (
    <Page title={t("title")}>
      <CalculatorPageContent />
    </Page>
  );
}