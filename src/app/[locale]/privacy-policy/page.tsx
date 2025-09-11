import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}

// Metadados da página
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return buildPageMetadata({
    locale,
    path: "/privacy-policy",
    title: t("title"),
    description: t("metadata.description"),
  });
}
