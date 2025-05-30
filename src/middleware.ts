import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Corresponde a todos os caminhos exceto:
  // - Se começarem com `/api`, `/trpc`, `/_next` ou `/_vercel`
  // - Os que contêm um ponto (ex: `favicon.ico`)
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
}; 