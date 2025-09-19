"use client";

import Page from "@/shared/components/layout/Page";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ThirdPartyService {
  name: string;
  purpose: string;
  provider: string;
  responsibility: string;
}

export default function PrivacyPolicyClient() {
  const t = useTranslations("privacy");

  const lastUpdateDate = "12 de setembro de 2025";

  return (
    <Page title={t("title")}>
      <div className="w-full mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {t("title")}
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400">
            {t("lastUpdated", { date: lastUpdateDate })}
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
            <p>{t("content.definitions.controller")}</p>
            <p>{t("content.definitions.contact")}</p>
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

            <p>{t("content.dataCollection.cookies.analytics")}</p>
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
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 ">
              <p>
                <strong>
                  {t("content.dataCollection.cookies.disclaimer")}
                </strong>
              </p>
            </div>
            <p>
              <strong>
                {t("content.dataCollection.cookies.analyticsBasis")}
              </strong>
            </p>
            <p>
              <strong>{t("content.dataCollection.cookies.purpose")}</strong>
            </p>
            <p>{t("content.dataCollection.cookies.consent")}</p>
            <p className="mt-4">
              <strong>Gerenciamento:</strong>{" "}
              {t("content.dataCollection.cookies.management")}
            </p>

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

            <h5>
              {t("content.dataCollection.minorsData.generalPolicy.title")}
            </h5>
            <ul>
              {(Array.isArray(
                t.raw("content.dataCollection.minorsData.generalPolicy.items")
              )
                ? t.raw("content.dataCollection.minorsData.generalPolicy.items")
                : []
              ).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Período de Retenção */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.retention")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("content.retention.intro")}</p>
            <ul>
              {(Array.isArray(t.raw("content.retention.items"))
                ? t.raw("content.retention.items")
                : []
              ).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{t("content.retention.note")}</p>
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
            <div className="space-y-4">
              {(Array.isArray(t.raw("content.thirdParty.services"))
                ? t.raw("content.thirdParty.services")
                : []
              ).map((service: ThirdPartyService, index: number) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4">
                  <h5 className="font-semibold text-lg">{service.name}</h5>
                  <p>
                    <strong>Provedor:</strong> {service.provider}
                  </p>
                  <p>
                    <strong>Finalidade:</strong> {service.purpose}
                  </p>

                  <p>
                    <strong>Responsabilidade:</strong> {service.responsibility}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6">
              <strong>{t("content.thirdParty.legalBasis")}</strong>
            </p>
            <p>
              <strong>{t("content.thirdParty.control")}</strong>
            </p>
            <p className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <strong>{t("content.thirdParty.disclaimer")}</strong>
            </p>

            <p className="mt-4 font-medium">
              {t("content.thirdParty.userAction")}
            </p>
          </CardContent>
        </Card>

        {/* Alterações */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.changes")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("content.changes.intro")}</p>
            <ul>
              {(Array.isArray(t.raw("content.changes.items"))
                ? t.raw("content.changes.items")
                : []
              ).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Contato e Ouvidoria */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.contact")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              <strong>{t("contactSection.emailLabel")}</strong>{" "}
              {t("contactSection.email")}
            </p>
            <p>
              <strong>{t("contactSection.subjectLabel")}</strong> &ldquo;
              {t("contactSection.subjectText")}&rdquo;
            </p>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
