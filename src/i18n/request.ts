// i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Agora todos os idiomas carregam a partir de i18n/messages/<locale>/index
  const messages = (await import(`./messages/${locale}/index`)).default;

  return {
    locale,
    messages
  };
});
