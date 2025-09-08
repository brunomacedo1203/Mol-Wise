import Page from "@/shared/components/layout/Page";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Cookie, Users, Mail, FileText } from "lucide-react";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common.privacy" });

  const currentDate = new Date().toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <Page title={t("title")}>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Shield className="h-16 w-16 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("lastUpdated", { date: currentDate })}
          </p>
        </div>

        {/* Introdução */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              {t("sections.introduction")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              {t("content.introduction.paragraph1")}
            </p>
            <p>
              {t("content.introduction.paragraph2")}
            </p>
          </CardContent>
        </Card>

        {/* Coleta de Dados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              {t("sections.dataCollection")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h4>{t("content.dataCollection.automaticData")}</h4>
            <ul>
              {t.raw("content.dataCollection.automaticDataList").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <h4>{t("content.dataCollection.usageData")}</h4>
            <ul>
              {t.raw("content.dataCollection.usageDataList").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <h4>{t("content.dataCollection.notCollected")}</h4>
            <p>
              {t("content.dataCollection.notCollectedText")}
            </p>
          </CardContent>
        </Card>

        {/* Uso dos Dados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              {t("sections.dataUsage")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("content.dataUsage.intro")}</p>
            <ul>
              {t.raw("content.dataUsage.list").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-orange-600" />
              {t("sections.cookies")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h4>{t("content.cookies.types")}</h4>
            
            <h5>{t("content.cookies.essential")}</h5>
            <ul>
              {t.raw("content.cookies.essentialList").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <h5>{t("content.cookies.analytics")}</h5>
            <ul>
              {t.raw("content.cookies.analyticsList").map((item: string, index: number) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item.replace(/^([^:]+):/, '<strong>$1:</strong>') }} />
              ))}
            </ul>
            
            <p>
              {t("content.cookies.management")}
            </p>
          </CardContent>
        </Card>

        {/* Serviços de Terceiros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              {t("sections.thirdParty")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("content.thirdParty.intro")}</p>
            
            <h4>{t("content.thirdParty.googleAnalytics")}</h4>
            <ul>
              {t.raw("content.thirdParty.googleAnalyticsList").map((item: string, index: number) => {
                if (item.includes("Google Privacy Policy")) {
                  return (
                    <li key={index}>
                      Política: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>
                    </li>
                  );
                }
                return <li key={index}>{item}</li>;
              })}
            </ul>
            
            <h4>{t("content.thirdParty.microsoftClarity")}</h4>
            <ul>
              {t.raw("content.thirdParty.microsoftClarityList").map((item: string, index: number) => {
                if (item.includes("Microsoft Privacy Statement")) {
                  return (
                    <li key={index}>
                      Política: <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft Privacy Statement</a>
                    </li>
                  );
                }
                return <li key={index}>{item}</li>;
              })}
            </ul>
          </CardContent>
        </Card>

        {/* Seus Direitos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              {t("sections.rights")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("content.rights.intro")}</p>
            <ul>
              {t.raw("content.rights.list").map((item: string, index: number) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item.replace(/^([^:]+):/, '<strong>$1:</strong>') }} />
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Contato */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-green-600" />
              {t("sections.contact")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              {t("content.contact.intro")}
            </p>
            <ul>
              <li><strong>{t("content.contact.email").split(': ')[0]}:</strong> {t("content.contact.email").split(': ')[1]}</li>
              <li><strong>{t("content.contact.subject").split(': ')[0]}:</strong> &ldquo;{t("content.contact.subject").split('"')[1]}&rdquo;</li>
            </ul>
            <p>
              {t("content.contact.response")}
            </p>
          </CardContent>
        </Card>

        {/* Alterações */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>{t("content.changes").split(': ')[0]}:</strong> {t("content.changes").split(': ')[1]}
            </p>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}

// Metadados da página
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common.privacy" });

  return buildPageMetadata({
    locale,
    path: "/privacy-policy",
    title: t("title"),
    description: t("metadata.description"),
  });
}