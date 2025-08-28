import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "molarMass" });

  return buildPageMetadata({
    locale,
    path: "molarMassCalculator",
    title: t("title"),
    description: t("description"),
  });
}
