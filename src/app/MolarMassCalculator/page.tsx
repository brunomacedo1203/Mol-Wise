import MolarMassCalculator from "@/features/calculators/components/MolarMassCalculator";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";

export default function MolarMassCalculatorPage() {
  return (
    <SubtitleProvider subtitle="Enter a chemical formula or element symbol">
      <MolarMassCalculator />
    </SubtitleProvider>
  );
}
