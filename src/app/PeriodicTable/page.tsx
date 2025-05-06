import PeriodicTableCards from "@/features/periodic-table/components/PeriodicTableCards";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";

export default function PeriodicTablePage() {
  return (
    <SubtitleProvider subtitle="Hover over an element to see details">
      <PeriodicTableCards />
    </SubtitleProvider>
  );
}
