import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });

  return buildPageMetadata({
    locale,
    path: "catalog",
    title: t("title"),
    description: t("description"),
  });
}
