// ✅ Arquivo: src/app/[locale]/layout.tsx

import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
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
      const themeStorage = localStorage.getItem("theme-storage");
      let theme = null;

      if (themeStorage) {
        const parsed = JSON.parse(themeStorage);
        theme = parsed.state?.theme;
      }

      if (!theme) {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        theme = systemPrefersDark ? "dark" : "light";
      }

      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      root.setAttribute("data-theme", theme);
    } catch (error) {
      console.warn("Erro ao aplicar tema inicial:", error);
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  await setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        {/* Script do tema antes da renderização */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
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
