import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "catalog" });

  return buildPageMetadata({
    locale: params.locale,
    path: "catalog",
    title: t("title"),
    description: t("description"),
  });
}
