// i18n/routing.js
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pt', 'en'], // Temporariamente desabilitados: 'fr', 'es', 'de', 'zh', 'hi', 'ar', 'ru'
  defaultLocale: 'pt',
  localePrefix: 'as-needed'
});