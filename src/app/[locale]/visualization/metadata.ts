import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "visualization" });

  return buildPageMetadata({
    locale,
    path: "visualization",
    title: t("title"),
    description: t("description"),
  });
}
