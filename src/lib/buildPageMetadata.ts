import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function buildPageMetadata(
  locale: string,
  pageKey: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `seo.${pageKey}` });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://molclass.com/${locale}`,
      siteName: "Mol Class",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}
