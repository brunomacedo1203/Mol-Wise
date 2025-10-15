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
  <div
    className="
      flex flex-col items-center justify-center
      min-h-[calc(100vh-8rem)]
      w-full
      text-center
      px-6 sm:px-8 md:px-12
    "
  >
    <div
      className="
        max-w-4xl w-full
        flex flex-col items-center
        gap-4
      "
    >
      <HomeClient
        welcome={t("welcome")}
        subtitle={t("subtitle")}
        chooseTool={commonT("chooseTool")}
      />
    </div>
  </div>
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
