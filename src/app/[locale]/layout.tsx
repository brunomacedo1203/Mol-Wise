import GoogleAnalytics from "@/shared/components/GoogleAnalytics";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Script from "next/script";
import { ThemeEffectProvider } from "@/shared/components/theme/ThemeEffectProvider";
import { GA_TRACKING_ID } from "@/lib/gtag";

const inter = Inter({ subsets: ["latin"] });

// Script para evitar flash de tema incorreto
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

// Script do Google Analytics
const googleAnalyticsScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_TRACKING_ID}', {
    page_path: window.location.pathname,
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });
`;

// Função que informa ao Next.js quais locales devem ser pré-renderizados
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Função que gera metadados dinâmicos baseados no locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: {
      template: "%s | Mol Wise",
      default: "Mol Wise",
    },
    description: t("description", {
      defaultValue:
        "This application is designed to help students and teachers with chemical calculations, data visualization, and content organization.",
    }),
    metadataBase: new URL("https://molwise.vercel.app"),
    alternates: {
      languages: {
        "pt-BR": "/pt",
        "en-US": "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Garante que o locale recebido é válido
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        {/* Script de Tema */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />

        {/* Google Analytics - Script principal */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />

        {/* Google Analytics - Configuração */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: googleAnalyticsScript }}
        />
      </head>
      <body className={inter.className}>
        <ThemeEffectProvider>
          <NextIntlClientProvider locale={locale}>
            <GoogleAnalytics />
            {children}
          </NextIntlClientProvider>
        </ThemeEffectProvider>
      </body>
    </html>
  );
}
