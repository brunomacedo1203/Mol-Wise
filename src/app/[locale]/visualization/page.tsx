import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import VisualizationClient from "./VisualizationClient";

export default function VisualizationPage() {
  return <VisualizationClient />;
}

// ✅ Geração de metadados dinâmicos
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "visualization" });

  return buildPageMetadata({
    locale,
    path: "visualization",
    title: t("title"),
    description: t("description"),
  });
}
