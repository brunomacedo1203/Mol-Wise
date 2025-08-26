type MetadataParams = {
  locale: string;
  path?: string;
  title?: string; 
  description?: string; 
};

export const BASE_URL = "https://molclass.com";
export const SITE_NAME = "Mol Class";

const DEFAULT_TITLE = SITE_NAME;
const DEFAULT_DESCRIPTION =
  "Este aplicativo foi projetado para ajudar estudantes e professores com cálculos químicos, visualização de dados e organização de conteúdo.";

function normalizePath(p?: string): string {
  if (!p) return "";
  return p.startsWith("/") ? p : `/${p}`;
}

export function buildPageMetadata({
  locale,
  path = "",
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}: MetadataParams) {
  const normPath = normalizePath(path);
  const url = `${BASE_URL}/${locale}${normPath}`;

  // Força padrão "<page> | Mol Class" (home fica só "Mol Class")
  const pageTitle =
    title && title !== DEFAULT_TITLE ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    metadataBase: new URL(BASE_URL),
    title: pageTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": `${BASE_URL}/pt${normPath}`,
        "en-US": `${BASE_URL}/en${normPath}`,
        "fr-FR": `${BASE_URL}/fr${normPath}`,
        "es-ES": `${BASE_URL}/es${normPath}`,
        "de-DE": `${BASE_URL}/de${normPath}`,
        "zh-CN": `${BASE_URL}/zh${normPath}`,
        "hi-IN": `${BASE_URL}/hi${normPath}`,
        "ar-SA": `${BASE_URL}/ar${normPath}`,
        "ru-RU": `${BASE_URL}/ru${normPath}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  } as const;
}
