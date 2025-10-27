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
import type { Metadata, Viewport } from "next";
import { ServiceWorkerManager } from "@/shared/components/pwa/ServiceWorkerManager";

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

// (Removido) Injeção direta de GA/Clarity. Passará a ser controlada por consentimento via AnalyticsManager.

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  applicationName: "Mol Class",
  manifest: "/manifest.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mol Class",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/pwa-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/pwa-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/pwa-192.png" }],
  },
};

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

        {/* Scripts de analytics e Clarity condicionados ao consentimento */}
        <AnalyticsManager />
        <ServiceWorkerManager />

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
