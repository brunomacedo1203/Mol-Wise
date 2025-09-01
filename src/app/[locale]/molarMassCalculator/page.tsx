import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import MolarMassCalculatorClient from "./MolarMassCalculatorClient";

export default function MolarMassCalculatorPage() {
  return <MolarMassCalculatorClient />;
}

// ✅ Geração de metadados dinâmicos
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "molarMass" });

  return buildPageMetadata({
    locale,
    path: "molarMassCalculator",
    title: t("title"),
    description: t("description"),
  });
}
export const dynamic = "force-static";
