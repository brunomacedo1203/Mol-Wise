// i18n/routing.js
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pt', 'en', 'fr', 'es', 'de', 'zh', 'hi', 'ar', 'ru', 'bn', 'id'],
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
  // Configura a detecção de locale
  localeDetection: true,
});

// Helper para verificar se um locale é válido
export function isValidLocale(locale: string): locale is typeof routing.locales[number] {
  return (routing.locales as readonly string[]).includes(locale);
}