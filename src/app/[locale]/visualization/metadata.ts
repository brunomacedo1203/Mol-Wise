import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "visualization" });

  return buildPageMetadata({
    locale: params.locale,
    path: "visualization",
    title: t("title"),
    description: t("description"),
  });
}
