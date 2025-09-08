import { buildPageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import CalculatorsClient from "./CalculatorsClient";

export default function CalculatorsPage() {
  return (
    <Suspense fallback={null}>
      <CalculatorsClient />
    </Suspense>
  );
}

// ✅ Geração de metadados dinâmicos
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "calculators" });

  return buildPageMetadata({
    locale,
    path: "calculators",
    title: t("title"),
    description: t("description"),
  });
}
