import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Lista de todos os idiomas suportados
  locales: ['pt', 'en', 'fr', 'es', 'de', 'zh', 'hi', 'ar', 'ru'],
  
  // Idioma padrão quando nenhum idioma corresponde
  defaultLocale: 'pt'
}); 