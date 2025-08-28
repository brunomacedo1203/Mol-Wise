import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import PeriodicTableClient from "./PeriodicTableClient";

export default function PeriodicTablePage() {
  return <PeriodicTableClient />;
}

// ✅ Geração de metadados dinâmicos
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "periodicTable" });

  return buildPageMetadata({
    locale,
    path: "periodicTable",
    title: t("title"),
    description: t("description"),
  });
}
