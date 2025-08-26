import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "molarMass" });

  return buildPageMetadata({
    locale: params.locale,
    path: "molarMassCalculator",
    title: t("title"),
    description: t("description"),
  });
}
