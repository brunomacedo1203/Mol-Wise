import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import CatalogClient from "./CatalogClient";

export default function CatalogPage() {
  return <CatalogClient />;
}

// ✅ Geração de metadados dinâmicos
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });

  return buildPageMetadata({
    locale,
    path: "catalog",
    title: t("title"),
    description: t("description"),
  });
}
