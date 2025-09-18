// i18n/routing.js
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pt', 'en', 'fr', 'es', 'de', 'zh', 'hi', 'ar', 'ru', 'bn',  'id'],
  defaultLocale: 'pt',
  localePrefix: 'as-needed'
});