// src/lib/seo.ts

type MetadataParams = {
  locale: string;
  path?: string;
  title?: string;
  description?: string;
};

const BASE_URL = "https://molclass.com";
const DEFAULT_TITLE = "Mol Class";
const DEFAULT_DESCRIPTION =
  "Este aplicativo foi projetado para ajudar estudantes e professores com cálculos químicos, visualização de dados e organização de conteúdo.";

export function buildPageMetadata({
  locale,
  path = "",
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}: MetadataParams) {
  const url = `${BASE_URL}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": `${BASE_URL}/pt${path}`,
        "en-US": `${BASE_URL}/en${path}`,
        "fr-FR": `${BASE_URL}/fr${path}`,
        "es-ES": `${BASE_URL}/es${path}`,
        "de-DE": `${BASE_URL}/de${path}`,
        "zh-CN": `${BASE_URL}/zh${path}`,
        "hi-IN": `${BASE_URL}/hi${path}`,
        "ar-SA": `${BASE_URL}/ar${path}`,
        "ru-RU": `${BASE_URL}/ru${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Mol Class",
      locale,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Mol Class",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
