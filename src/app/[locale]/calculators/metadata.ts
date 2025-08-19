// src/app/[locale]/calculators/metadata.ts

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { buildPageMetadata } = await import("@/lib/seo");
  const { getTranslations } = await import("next-intl/server");

  const t = await getTranslations({ locale: params.locale, namespace: "calculators" });

  return buildPageMetadata({
    locale: params.locale,
    path: "/calculators",
    title: t("title"),
    description: t("description"),
  });
}
