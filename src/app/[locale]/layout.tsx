import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/shared/contexts/ThemeContext";
import { CalculatorInstancesProvider } from "@/features/calculators/contexts/CalculatorInstancesContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// Script para evitar flash de tema incorreto
const themeScript = `
  (function() {
    try {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

// Função que informa ao Next.js quais locales devem ser pré-renderizados
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Função que gera metadados dinâmicos baseados no locale
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
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
  params: { locale: string };
}) {
  const { locale } = params;

  // Garante que o locale recebido é válido
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Habilita renderização estática
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale}>
            <CalculatorInstancesProvider>
              {children}
            </CalculatorInstancesProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
