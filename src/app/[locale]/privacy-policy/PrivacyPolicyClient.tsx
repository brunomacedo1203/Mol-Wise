"use client";

import Page from "@/shared/components/layout/Page";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyClient() {
  const t = useTranslations("privacy");
  const locale = useLocale();

  const currentDate = new Date().toLocaleDateString(
    locale === "pt" ? "pt-BR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Page title={t("title")}>
      <div className="w-full mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {t("title")}
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400">
            {t("lastUpdated", { date: currentDate })}
          </p>
        </div>

        {/* Introdução */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.introduction")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("content.introduction.paragraph1")}</p>
            <p>{t("content.introduction.paragraph2")}</p>
          </CardContent>
        </Card>

        {/* Definições e Identificação do Controlador */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.definitions")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              <strong>Controlador dos Dados:</strong> Mol Class
            </p>
            <p>
              <strong>Contato do Responsável:</strong> molclassapp@gmail.com
            </p>
          </CardContent>
        </Card>

        {/* Dados Coletados e Base Legal */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.dataCollection")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            {/* Dados Técnicos */}
            <h4>{t("content.dataCollection.technicalData.title")}</h4>
            <p>
              <strong>{t("content.dataCollection.technicalData.types")}</strong>
            </p>
            <ul>
              {(Array.isArray(
                t.raw("content.dataCollection.technicalData.typesList")
              )
                ? t.raw("content.dataCollection.technicalData.typesList")
                : []
              ).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>
              <strong>
                {t("content.dataCollection.technicalData.legalBasis")}
              </strong>
            </p>
            <p>
              <strong>
                {t("content.dataCollection.technicalData.purpose")}
              </strong>
            </p>

            {/* Dados Educacionais */}
            <h4>{t("content.dataCollection.educationalData.title")}</h4>
            <p>
              <strong>
                {t("content.dataCollection.educationalData.types")}
              </strong>
            </p>
            <ul>
              {(Array.isArray(
                t.raw("content.dataCollection.educationalData.typesList")
              )
                ? t.raw("content.dataCollection.educationalData.typesList")
                : []
              ).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>
              <strong>
                {t("content.dataCollection.educationalData.legalBasis")}
              </strong>
            </p>
            <p>
              <strong>
                {t("content.dataCollection.educationalData.purpose")}
              </strong>
            </p>

            {/* Cookies */}
            <h4>{t("content.dataCollection.cookies.title")}</h4>
            <p>
              <strong>{t("content.dataCollection.cookies.essential")}</strong>
            </p>
            <ul>
              {(Array.isArray(
                t.raw("content.dataCollection.cookies.essentialList")
              )
                ? t.raw("content.dataCollection.cookies.essentialList")
                : []
              ).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>
              <strong>
                {t("content.dataCollection.cookies.essentialBasis")}
              </strong>
            </p>

            <p>
              <strong>{t("content.dataCollection.cookies.analytics")}</strong>
            </p>
            <ul>
              {(Array.isArray(
                t.raw("content.dataCollection.cookies.analyticsList")
              )
                ? t.raw("content.dataCollection.cookies.analyticsList")
                : []
              ).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>
              <strong>
                {t("content.dataCollection.cookies.analyticsBasis")}
              </strong>
            </p>
            <p>
              <strong>{t("content.dataCollection.cookies.purpose")}</strong>
            </p>
            <p>{t("content.dataCollection.cookies.consent")}</p>

            {/* Dados Cadastrais */}
            <h4>{t("content.dataCollection.registrationData.title")}</h4>
            <p>
              <strong>
                {t("content.dataCollection.registrationData.types")}
              </strong>
            </p>
            <ul>
              {(Array.isArray(
                t.raw("content.dataCollection.registrationData.typesList")
              )
                ? t.raw("content.dataCollection.registrationData.typesList")
                : []
              ).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>
              <strong>
                {t("content.dataCollection.registrationData.legalBasis")}
              </strong>
            </p>
            <p>
              <strong>
                {t("content.dataCollection.registrationData.purpose")}
              </strong>
            </p>

            {/* Menores de Idade */}
            <h4>{t("content.dataCollection.minorsData.title")}</h4>
            <p>{t("content.dataCollection.minorsData.policy")}</p>
            <p>{t("content.dataCollection.minorsData.recommendation")}</p>
          </CardContent>
        </Card>

        {/* Período de Retenção */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.retention")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <ul>
              <li>{t("content.retention.cookies")}</li>
              <li>{t("content.retention.technical")}</li>
              <li>{t("content.retention.educational")}</li>
              <li>{t("content.retention.registration")}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Direitos dos Usuários */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.rights")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h4>{t("content.rights.lgpdGdpr")}</h4>
            <ul>
              {(Array.isArray(t.raw("content.rights.list"))
                ? t.raw("content.rights.list")
                : []
              ).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h4>{t("content.rights.howToExercise")}</h4>
            <p>{t("content.rights.contact")}</p>
            <p>
              <strong>{t("contactSection.emailLabel")}</strong>{" "}
              {t("contactSection.email")}
            </p>
            <p>
              <strong>{t("contactSection.subjectLabel")}</strong> &ldquo;
              {t("contactSection.subjectText")}&rdquo;
            </p>
            <p>{t("content.rights.response")}</p>
          </CardContent>
        </Card>

        {/* Gestão de Cookies */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.cookies")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h4>{t("content.cookieManagement.banner.title")}</h4>
            <p>{t("content.cookieManagement.banner.intro")}</p>
            <ul>
              {(Array.isArray(t.raw("content.cookieManagement.banner.list"))
                ? t.raw("content.cookieManagement.banner.list")
                : []
              ).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Compartilhamento com Terceiros */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.thirdParty")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("content.thirdParty.intro")}</p>
            <ul>
              <li>{t("content.thirdParty.google")}</li>
              <li>{t("content.thirdParty.microsoft")}</li>
            </ul>
            <p>{t("content.thirdParty.note")}</p>
          </CardContent>
        </Card>

        {/* Transferências Internacionais */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.transfers")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("content.transfers.intro")}</p>
            <p>{t("content.transfers.safeguards")}</p>
            <p>{t("content.transfers.anpd")}</p>
          </CardContent>
        </Card>

        {/* Conformidade Internacional */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.compliance")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("content.compliance.intro")}</p>
            <ul>
              {(Array.isArray(t.raw("content.compliance.list"))
                ? t.raw("content.compliance.list")
                : []
              ).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Alterações */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.changes")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("content.changes.info")}</p>
            <p>{t("content.changes.date")}</p>
          </CardContent>
        </Card>

        {/* Contato e Ouvidoria */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.contact")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              <strong>E-mail:</strong> molclassapp@gmail.com
            </p>
            <p>
              <strong>Assunto:</strong> &ldquo;Privacidade e Proteção de
              Dados&rdquo;
            </p>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
