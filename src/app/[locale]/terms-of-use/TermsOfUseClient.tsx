"use client";

import Page from "@/shared/components/layout/Page";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, AlertTriangle, Shield, Gavel, Mail } from "lucide-react";

export default function TermsOfUseClient() {
  const t = useTranslations("terms");
  const locale = useLocale();

  const currentDate = new Date().toLocaleDateString(
    locale === "pt" ? "pt-BR" : "en-US",
    {
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Page title={t("title")}>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Gavel className="h-16 w-16 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {t("title")}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("lastUpdated", { date: currentDate })}
          </p>
        </div>

        {/* Definições e Identificação */}
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

        {/* Aceitação dos Termos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              {t("sections.acceptance")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Ao acessar e utilizar o Mol Class, você concorda em cumprir e estar vinculado
              a estes Termos de Uso. Se você não concordar com qualquer parte destes termos,
              não deve usar nosso serviço.
            </p>
            <p>
              Estes termos se aplicam a todos os visitantes, usuários e outras pessoas que
              acessam ou usam o serviço.
            </p>
          </CardContent>
        </Card>

        {/* Uso do Serviço */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              {t("sections.usage")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              O Mol Class é uma plataforma educacional gratuita que oferece ferramentas
              para o estudo de química, incluindo calculadoras, visualizadores moleculares
              e recursos educacionais.
            </p>
            <h4>Recursos Disponíveis:</h4>
            <ul>
              <li>Calculadoras químicas e físicas</li>
              <li>Visualizador de moléculas interativo</li>
              <li>Tabela periódica interativa</li>
              <li>Catálogo de compostos químicos</li>
              <li>Jogos educacionais</li>
            </ul>
          </CardContent>
        </Card>

        {/* Uso Aceitável */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              {t("sections.acceptableUse")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Você concorda em usar o Mol Class apenas para fins educacionais e legais.
            </p>
            <h4>É Permitido:</h4>
            <ul>
              <li>Usar as ferramentas para estudos e pesquisas educacionais</li>
              <li>Compartilhar links para recursos específicos</li>
              <li>Usar os resultados dos cálculos para fins acadêmicos</li>
            </ul>
            <h4>É Proibido:</h4>
            <ul>
              <li>Usar o serviço para atividades ilegais ou prejudiciais</li>
              <li>Tentar hackear, sobrecarregar ou danificar o sistema</li>
              <li>Reproduzir, duplicar ou copiar o serviço sem autorização</li>
              <li>Usar bots ou scripts automatizados sem permissão</li>
            </ul>
          </CardContent>
        </Card>

        {/* Propriedade Intelectual */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              {t("sections.intellectualProperty")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              O serviço e seu conteúdo original, recursos e funcionalidades são e
              permanecerão propriedade exclusiva do Mol Class e seus licenciadores.
            </p>
            <p>
              O serviço é protegido por direitos autorais, marcas registradas e outras leis.
              Nossos direitos de marca registrada e comercial não podem ser usados em
              conexão com qualquer produto ou serviço sem nossa permissão prévia por escrito.
            </p>
          </CardContent>
        </Card>

        {/* Precisão dos Dados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              {t("sections.accuracy")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Embora nos esforcemos para fornecer informações precisas e atualizadas,
              não garantimos a exatidão, completude ou atualidade de qualquer informação
              no serviço.
            </p>
            <h4>Importante:</h4>
            <ul>
              <li>Sempre verifique cálculos críticos com fontes adicionais</li>
              <li>Use os resultados como referência educacional</li>
              <li>Consulte literatura científica para aplicações profissionais</li>
              <li>Não somos responsáveis por decisões baseadas em nossos cálculos</li>
            </ul>
          </CardContent>
        </Card>

        {/* Limitação de Responsabilidade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              {t("sections.liability")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Em nenhuma circunstância o Mol Class, nem seus diretores, funcionários,
              parceiros, agentes, fornecedores ou afiliados, serão responsáveis por
              qualquer dano indireto, incidental, especial, consequencial ou punitivo.
            </p>
            <h4>Limitações:</h4>
            <ul>
              <li>Não garantimos disponibilidade contínua do serviço</li>
              <li>Não somos responsáveis por decisões baseadas em nossos cálculos</li>
              <li>Limitamos nossa responsabilidade ao máximo permitido por lei</li>
            </ul>
            <p>
              Em nenhuma circunstância nossa responsabilidade total excederá o valor
              pago por você pelos serviços (que atualmente são gratuitos).
            </p>
          </CardContent>
        </Card>

        {/* Modificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              {t("sections.modifications")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Reservamo-nos o direito de modificar ou substituir estes Termos de Uso
              a qualquer momento, a nosso exclusivo critério.
            </p>
            <h4>Processo de Alteração:</h4>
            <ul>
              <li>Alterações significativas serão notificadas com antecedência</li>
              <li>A data da última atualização será sempre indicada</li>
              <li>O uso continuado após alterações constitui aceitação</li>
              <li>Recomendamos revisar periodicamente estes termos</li>
            </ul>
          </CardContent>
        </Card>

        {/* Lei Aplicável */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gavel className="h-5 w-5 text-blue-600" />
              {t("sections.governingLaw")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Estes Termos de Uso são regidos e interpretados de acordo com as leis
              da República Federativa do Brasil.
            </p>
            <h4>Resolução de Disputas:</h4>
            <ul>
              <li>Tentaremos resolver disputas de forma amigável</li>
              <li>Foro competente: comarca onde está sediado o Mol Class</li>
              <li>Aplicação da legislação brasileira de proteção ao consumidor</li>
              <li>Conformidade com a LGPD e demais regulamentações aplicáveis</li>
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
              Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
            </p>
            <ul>
              <li><strong>Email:</strong> molclassapp@gmail.com</li>
              <li><strong>Assunto:</strong> &ldquo;Termos de Uso&rdquo;</li>
            </ul>
            <p>
              Faremos o possível para responder às suas perguntas dentro de um prazo razoável.
            </p>
          </CardContent>
        </Card>

        {/* Aviso Final */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Última Atualização:</strong> {currentDate}. Ao continuar usando
              o Mol Class após esta data, você concorda com estes termos atualizados.
            </p>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}