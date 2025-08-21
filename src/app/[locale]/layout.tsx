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

// Script para aplicar tema antes da hidratação
const themeScript = `
  (function () {
    try {
      // Tenta ler do localStorage do zustand
      const themeStorage = localStorage.getItem("theme-storage");
      let theme = null;
      
      if (themeStorage) {
        const parsed = JSON.parse(themeStorage);
        theme = parsed.state?.theme;
      }
      
      // Se não encontrar, usa preferência do sistema
      if (!theme) {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        theme = systemPrefersDark ? "dark" : "light";
      }
      
      // Aplica o tema imediatamente
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      root.setAttribute("data-theme", theme);
      
    } catch (error) {
      console.warn("Erro ao aplicar tema inicial:", error);
      // Fallback para tema claro
      document.documentElement.classList.add("light");
    }
  })();
`;

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: {
      template: "%s | MolClass",
      default: "MolClass",
    },
    description: t("description", {
      defaultValue:
        "This application is designed to help students and teachers with chemical calculations, data visualization, and content organization.",
    }),
    metadataBase: new URL("https://molclass.com"),
    icons: {
      icon: [
        { url: "/favicon-green.ico", sizes: "any" },
        { url: "/favicon-green.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/favicon-green.png", sizes: "180x180", type: "image/png" },
      ],
    },
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

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        {/* Script para aplicar tema ANTES de qualquer coisa */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />

        {/* 3Dmol.js */}
        <Script
          src="https://3Dmol.org/build/3Dmol-min.js"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{ __html: googleAnalyticsScript }}
            />
          </>
        )}
      </head>
      <body className={inter.className}>
        <ThemeEffectProvider>
          <NextIntlClientProvider locale={locale}>
            {children}
          </NextIntlClientProvider>
        </ThemeEffectProvider>
      </body>
    </html>
  );
}
