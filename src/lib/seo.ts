// ✅ src/lib/seo.ts
import type { Metadata } from "next";

interface BuildPageMetadataProps {
  locale: string;
  path: string;
  title: string;
  description: string;
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: BuildPageMetadataProps): Metadata {
  const baseUrl = "https://molclass.com";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}${path ? `/${path}` : ""}`,
      siteName: "Mol Class",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}${path ? `/${path}` : ""}`,
      languages: {
        "pt-BR": `${baseUrl}/pt`,
        "en-US": `${baseUrl}/en`,
        "fr-FR": `${baseUrl}/fr`,
        "es-ES": `${baseUrl}/es`,
        "de-DE": `${baseUrl}/de`,
        "zh-CN": `${baseUrl}/zh`,
        "hi-IN": `${baseUrl}/hi`,
        "ar-SA": `${baseUrl}/ar`,
        "ru-RU": `${baseUrl}/ru`,
      },
    },
  };
}
