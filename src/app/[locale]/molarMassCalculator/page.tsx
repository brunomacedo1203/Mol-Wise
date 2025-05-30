import MolarMassCalculator from "@/features/calculators/components/MolarMassCalculator";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";
import Page from "@/shared/components/Page";
import { useTranslations } from "next-intl";

export default function MolarMassCalculatorPage() {
  const t = useTranslations("calculators");

  return (
    <SubtitleProvider subtitle={t("molarMass")}>
      <Page title={t("molarMass")}>
        <MolarMassCalculator />
      </Page>
    </SubtitleProvider>
  );
}
