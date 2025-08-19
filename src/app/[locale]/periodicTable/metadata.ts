// src/app/[locale]/periodicTable/metadata.ts

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { buildPageMetadata } = await import("@/lib/seo");
  const { getTranslations } = await import("next-intl/server");

  const t = await getTranslations({ locale: params.locale, namespace: "periodicTable" });

  return buildPageMetadata({
    locale: params.locale,
    path: "/periodicTable",
    title: t("title"),
    description: t("description"),
  });
}
