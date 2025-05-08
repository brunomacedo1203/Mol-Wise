import MolarMassCalculator from "@/features/calculators/components/MolarMassCalculator";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";
import Page from "@/shared/components/Page";

export default function MolarMassCalculatorPage() {
  return (
    <SubtitleProvider subtitle="Enter a chemical formula or element symbol">
      <Page title="Molar Mass Calculator">
        <MolarMassCalculator />
      </Page>
    </SubtitleProvider>
  );
}
