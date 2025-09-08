import Page from "@/shared/components/layout/Page";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, AlertTriangle, Shield, Gavel, Mail } from "lucide-react";

export default async function TermsOfUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common.terms" });

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
            <Gavel className="h-16 w-16 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("lastUpdated", { date: currentDate })}
          </p>
        </div>

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
              não deve utilizar nosso site ou serviços.
            </p>
            <p>
              Estes termos se aplicam a todos os visitantes, usuários e outras pessoas que 
              acessam ou usam o serviço.
            </p>
          </CardContent>
        </Card>

        {/* Descrição do Serviço */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              {t("sections.service")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              O Mol Class é uma plataforma educacional gratuita que oferece:
            </p>
            <ul>
              <li>Calculadoras químicas para massa molar e outros cálculos</li>
              <li>Ferramentas de visualização molecular</li>
              <li>Recursos educacionais de química</li>
              <li>Conteúdo científico e acadêmico</li>
            </ul>
            <p>
              Nossos serviços são destinados para fins educacionais e de pesquisa, 
              sendo adequados para estudantes, professores e profissionais da área química.
            </p>
          </CardContent>
        </Card>

        {/* Uso Aceitável */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              {t("sections.acceptableUse")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h4>Você concorda em:</h4>
            <ul>
              <li>Usar o serviço apenas para fins legais e educacionais</li>
              <li>Não interferir ou interromper o serviço ou servidores</li>
              <li>Não tentar obter acesso não autorizado ao sistema</li>
              <li>Respeitar os direitos de propriedade intelectual</li>
              <li>Fornecer informações precisas quando solicitado</li>
            </ul>
            
            <h4>É proibido:</h4>
            <ul>
              <li>Usar o serviço para atividades ilegais ou prejudiciais</li>
              <li>Transmitir vírus, malware ou código malicioso</li>
              <li>Fazer engenharia reversa do software</li>
              <li>Copiar, distribuir ou modificar o conteúdo sem autorização</li>
              <li>Sobrecarregar o sistema com solicitações excessivas</li>
            </ul>
          </CardContent>
        </Card>

        {/* Propriedade Intelectual */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              {t("sections.intellectualProperty")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              O conteúdo do Mol Class, incluindo mas não limitado a textos, gráficos, 
              logotipos, ícones, imagens, clipes de áudio, downloads digitais e software, 
              é propriedade do Mol Class ou de seus fornecedores de conteúdo.
            </p>
            
            <h4>Licença de Uso:</h4>
            <ul>
              <li>Concedemos uma licença limitada, não exclusiva e revogável</li>
              <li>Para uso pessoal e educacional do conteúdo</li>
              <li>Não é permitida a redistribuição comercial</li>
              <li>Atribuição adequada deve ser fornecida quando aplicável</li>
            </ul>
          </CardContent>
        </Card>

        {/* Precisão das Informações */}
        <Card className="border-yellow-200 dark:border-yellow-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              {t("sections.accuracy")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-200 mb-0">
                <strong>Aviso Importante:</strong> Embora nos esforcemos para fornecer 
                informações precisas e atualizadas, o Mol Class não garante a exatidão, 
                completude ou adequação das informações para qualquer propósito específico.
              </p>
            </div>
            
            <h4>Responsabilidade do Usuário:</h4>
            <ul>
              <li>Verificar a precisão dos cálculos para uso crítico</li>
              <li>Consultar fontes adicionais para validação</li>
              <li>Usar o bom senso científico na interpretação dos resultados</li>
              <li>Não confiar exclusivamente em nossos cálculos para decisões importantes</li>
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
              O Mol Class é fornecido &ldquo;como está&rdquo; e &ldquo;conforme disponível&rdquo;, sem garantias 
              de qualquer tipo, expressas ou implícitas.
            </p>
            
            <h4>Isenção de Responsabilidade:</h4>
            <ul>
              <li>Não nos responsabilizamos por danos diretos ou indiretos</li>
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
              <li><strong>Email:</strong> legal@molclass.com</li>
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

// Metadados da página
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common.terms" });

  return buildPageMetadata({
    locale,
    path: "/terms-of-use",
    title: t("title"),
    description: "Termos de Uso do Mol Class - Condições e diretrizes para utilização da plataforma educacional de química.",
  });
}