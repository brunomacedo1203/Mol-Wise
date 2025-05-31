"use client";
import { CalculatorPageContent } from "@/features/calculators/components/common/CalculatorPageContent";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";
import Page from "@/shared/components/Page";
import { useTranslations } from "next-intl";

export default function MolarMassCalculatorPage() {
  const t = useTranslations("calculators");

  return (
    <SubtitleProvider subtitle={t("molarMass.subtitle")}>
      <Page title={t("molarMass.title")}>
        <CalculatorPageContent calculatorType="molar-mass" />
      </Page>
    </SubtitleProvider>
  );
}
