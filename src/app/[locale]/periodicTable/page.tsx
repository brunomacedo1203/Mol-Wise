import PeriodicTableCards from "@/features/periodic-table/components/PeriodicTableCards";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";
import Page from "@/shared/components/layout/Page";
import { useTranslations } from "next-intl";

export default function PeriodicTablePage() {
  const t = useTranslations("periodicTable");

  return (
    <SubtitleProvider subtitle={t("subtitle")}>
      <Page title={t("title")}>
        <PeriodicTableCards />
      </Page>
    </SubtitleProvider>
  );
}
