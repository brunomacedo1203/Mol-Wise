import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "home" });

  return buildPageMetadata({
    locale: params.locale,
    path: "",
    title: t("title"),
    description: t("description"),
  });
}
