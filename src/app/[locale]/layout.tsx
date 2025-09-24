// ✅ src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Script from "next/script";
import { ThemeEffectProvider } from "@/shared/components/theme/ThemeEffectProvider";
import CookieConsentBanner from "@/shared/components/cookies/CookieConsentBanner";
import AnalyticsManager from "@/shared/components/analytics/AnalyticsManager";

const inter = Inter({ subsets: ["latin"] });

// ✅ Script para aplicar tema antes da hidratação
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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

  await setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/kekule@latest/dist/themes/default/kekule.css"
        />
      </head>
      <body className={inter.className}>
        {/* ✅ Scripts globais */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />

        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.0.4/3Dmol-min.js"
          strategy="beforeInteractive"
        />

        <Script
          id="kekule-cdn"
          src="https://unpkg.com/kekule@latest/dist/kekule.min.js?modules=chemWidget,io,io-smiles"
          strategy="beforeInteractive"
        />

        {/* Scripts de analytics e Clarity condicionados ao consentimento */}
        <AnalyticsManager />

        <ThemeEffectProvider>
          <NextIntlClientProvider locale={locale}>
            {children}
            <CookieConsentBanner />
          </NextIntlClientProvider>
        </ThemeEffectProvider>
      </body>
    </html>
  );
}
