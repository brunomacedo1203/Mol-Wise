import Page from "@/shared/components/layout/Page";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import HomeClient from "./HomeClient";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const commonT = await getTranslations({ locale, namespace: "common" });

  return (
    <Page title={t("title")}>
      <HomeClient
        welcome={t("welcome")}
        subtitle={t("subtitle")}
        chooseTool={commonT("chooseTool")}
      />
    </Page>
  );
}

// ✅ Geração de metadados dinâmicos
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return buildPageMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("description"),
  });
}
export const dynamic = "force-static";
