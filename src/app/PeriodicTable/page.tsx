import PeriodicTableCards from "@/features/periodic-table/components/PeriodicTableCards";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";
import Page from "@/shared/components/Page";

export default function PeriodicTablePage() {
  return (
    <SubtitleProvider subtitle="Hover over an element to see details">
      <Page title="Periodic Table">
        <PeriodicTableCards />
      </Page>
    </SubtitleProvider>
  );
}
