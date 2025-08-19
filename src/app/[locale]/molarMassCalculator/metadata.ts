// src/app/[locale]/molarMassCalculator/metadata.ts

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { buildPageMetadata } = await import("@/lib/seo");
  const { getTranslations } = await import("next-intl/server");

  const t = await getTranslations({ locale: params.locale, namespace: "molarMassCalculator" });

  return buildPageMetadata({
    locale: params.locale,
    path: "/molarMass",
    title: t("title"),
    description: t("description"),
  });
}
