"use client";

import Page from "@/shared/components/layout/Page";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfUseClient() {
  const t = useTranslations("terms");

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

        {/* Definições e Identificação */}
        <Card>
          <CardHeader>
            <CardTitle>1. {t("sections.definitions.title")}</CardTitle>
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

        {/* Aceitação dos Termos */}
        <Card>
          <CardHeader>
            <CardTitle>2. {t("sections.acceptance.title")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("sections.acceptance.content.agreement")}</p>
            <p>{t("sections.acceptance.content.scope")}</p>
          </CardContent>
        </Card>

        {/* Descrição do Serviço */}
        <Card>
          <CardHeader>
            <CardTitle>3. {t("sections.serviceDescription.title")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("sections.serviceDescription.content.description")}</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">
              {t("sections.serviceDescription.content.featuresTitle")}
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("sections.serviceDescription.content.features.0")}</li>
              <li>{t("sections.serviceDescription.content.features.1")}</li>
              <li>{t("sections.serviceDescription.content.features.2")}</li>
              <li>{t("sections.serviceDescription.content.features.3")}</li>
              <li>{t("sections.serviceDescription.content.features.4")}</li>
              <li>{t("sections.serviceDescription.content.features.5")}</li>
              <li>{t("sections.serviceDescription.content.features.6")}</li>
              <li>{t("sections.serviceDescription.content.features.7")}</li>
              <li>{t("sections.serviceDescription.content.features.8")}</li>
            </ul>
            <h4 className="text-lg font-semibold mt-6 mb-2">
              {t("sections.serviceDescription.content.evolutionTitle")}
            </h4>
            <p>{t("sections.serviceDescription.content.evolutionText")}</p>
          </CardContent>
        </Card>

        {/* Uso Aceitável */}
        <Card>
          <CardHeader>
            <CardTitle>4. {t("sections.acceptableUse.title")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("sections.acceptableUse.content.agreement")}</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">
              {t("sections.acceptableUse.content.permittedTitle")}
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("sections.acceptableUse.content.permitted.0")}</li>
              <li>{t("sections.acceptableUse.content.permitted.1")}</li>
              <li>{t("sections.acceptableUse.content.permitted.2")}</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">
              {t("sections.acceptableUse.content.prohibitedTitle")}
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("sections.acceptableUse.content.prohibited.0")}</li>
              <li>{t("sections.acceptableUse.content.prohibited.1")}</li>
              <li>{t("sections.acceptableUse.content.prohibited.2")}</li>
              <li>{t("sections.acceptableUse.content.prohibited.3")}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Propriedade Intelectual */}
        <Card>
          <CardHeader>
            <CardTitle>5. {t("sections.intellectualProperty.title")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h4 className="text-lg font-semibold mt-4 mb-2">
              {t("sections.intellectualProperty.content.rightsTitle")}
            </h4>
            <p>{t("sections.intellectualProperty.content.rightsText")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("sections.intellectualProperty.content.rights.0")}</li>
              <li>{t("sections.intellectualProperty.content.rights.1")}</li>
              <li>{t("sections.intellectualProperty.content.rights.2")}</li>
              <li>{t("sections.intellectualProperty.content.rights.3")}</li>
            </ul>
            <h4 className="text-lg font-semibold mt-6 mb-2">
              {t("sections.intellectualProperty.content.sourcesTitle")}
            </h4>
            <p>{t("sections.intellectualProperty.content.sourcesText")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("sections.intellectualProperty.content.sources.0")}</li>
              <li>{t("sections.intellectualProperty.content.sources.1")}</li>
              <li>{t("sections.intellectualProperty.content.sources.2")}</li>
              <li>{t("sections.intellectualProperty.content.sources.3")}</li>
              <li>{t("sections.intellectualProperty.content.sources.4")}</li>
            </ul>
            <h4 className="text-lg font-semibold mt-6 mb-2">
              {t("sections.intellectualProperty.content.commitmentTitle")}
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("sections.intellectualProperty.content.commitment.0")}</li>
              <li>{t("sections.intellectualProperty.content.commitment.1")}</li>
              <li>{t("sections.intellectualProperty.content.commitment.2")}</li>
              <li>{t("sections.intellectualProperty.content.commitment.3")}</li>
            </ul>
            <h4 className="text-lg font-semibold mt-6 mb-2">
              {t("sections.intellectualProperty.content.userContentTitle")}
            </h4>
            <p>{t("sections.intellectualProperty.content.userContentText")}</p>
            <h4 className="text-lg font-semibold mt-6 mb-2">
              {t("sections.intellectualProperty.content.fairUseTitle")}
            </h4>
            <p>{t("sections.intellectualProperty.content.fairUseText")}</p>
          </CardContent>
        </Card>

        {/* Informações Químicas */}
        <Card>
          <CardHeader>
            <CardTitle>6. {t("sections.chemicalInformation.title")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("sections.chemicalInformation.content.disclaimer")}</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">
              {t("sections.chemicalInformation.content.importantTitle")}
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("sections.chemicalInformation.content.important.0")}</li>
              <li>{t("sections.chemicalInformation.content.important.1")}</li>
              <li>{t("sections.chemicalInformation.content.important.2")}</li>
              <li>{t("sections.chemicalInformation.content.important.3")}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Limitação de Responsabilidade */}
        <Card>
          <CardHeader>
            <CardTitle>7. {t("sections.liability.title")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("sections.liability.content.disclaimer")}</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">
              {t("sections.liability.content.exclusionsTitle")}
            </h4>
            <p>{t("sections.liability.content.exclusionsText")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("sections.liability.content.exclusions.0")}</li>
              <li>{t("sections.liability.content.exclusions.1")}</li>
              <li>{t("sections.liability.content.exclusions.2")}</li>
              <li>{t("sections.liability.content.exclusions.3")}</li>
              <li>{t("sections.liability.content.exclusions.4")}</li>
              <li>{t("sections.liability.content.exclusions.5")}</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">
              {t("sections.liability.content.userResponsibilityTitle")}
            </h4>
            <p>{t("sections.liability.content.userResponsibilityText")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("sections.liability.content.userResponsibilities.0")}</li>
              <li>{t("sections.liability.content.userResponsibilities.1")}</li>
              <li>{t("sections.liability.content.userResponsibilities.2")}</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">
              {t("sections.liability.content.paidServicesTitle")}
            </h4>
            <p>{t("sections.liability.content.paidServicesText")}</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">
              {t("sections.liability.content.exceptionsTitle")}
            </h4>
            <p>{t("sections.liability.content.exceptionsText")}</p>
          </CardContent>
        </Card>

        {/* Modificações dos Termos */}
        <Card>
          <CardHeader>
            <CardTitle>8. {t("sections.modifications.title")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("sections.modifications.content.right")}</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">
              {t("sections.modifications.content.processTitle")}
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("sections.modifications.content.process.0")}</li>
              <li>{t("sections.modifications.content.process.1")}</li>
              <li>{t("sections.modifications.content.process.2")}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Lei Aplicável */}
        <Card>
          <CardHeader>
            <CardTitle>9. {t("sections.governingLaw.title")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{t("sections.governingLaw.content.law")}</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">
              {t("sections.governingLaw.content.disputesTitle")}
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("sections.governingLaw.content.disputes.0")}</li>
              <li>{t("sections.governingLaw.content.disputes.1")}</li>
              <li>{t("sections.governingLaw.content.disputes.2")}</li>
              <li>{t("sections.governingLaw.content.disputes.3")}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contato */}
        <Card>
          <CardHeader>
            <CardTitle>10. {t("sections.contact.title")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              <strong>{t("sections.contact.content.emailLabel")}</strong>{" "}
              {t("sections.contact.content.email")}
            </p>
            <p>
              <strong>{t("sections.contact.content.subjectLabel")}</strong>{" "}
              &ldquo;{t("sections.contact.content.subject")}&rdquo;
            </p>
          </CardContent>
        </Card>

        {/* Aviso Final */}
        <Card>
          <CardHeader>
            <CardTitle>11. {t("sections.finalNotice.title")}</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              {t("sections.finalNotice.content.lastUpdate", {
                date: lastUpdateDate,
              })}
            </p>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
