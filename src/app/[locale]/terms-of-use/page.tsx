import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import TermsOfUseClient from "./TermsOfUseClient";

export default async function TermsOfUsePage({
  params: _params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <TermsOfUseClient />;
}

// Metadados da página
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common.terms" });

  return buildPageMetadata({
    locale,
    path: "/terms-of-use",
    title: t("title"),
    description:
      "Termos de Uso do Mol Class - Condições e diretrizes para utilização da plataforma educacional de química.",
  });
}
