import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';

  // 🚫 Ignora bots (como Googlebot, Bing, etc.)
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
  if (isBot) {
    return NextResponse.next();
  }

  // Para a página home, verificar se há um locale preferido
  if (pathname === '/') {
    // Primeiro verifica o cookie do next-intl (que é o mais atualizado)
    const nextIntlLocale = request.cookies.get('NEXT_LOCALE')?.value;
    
    if (
      nextIntlLocale &&
      (routing.locales as readonly string[]).includes(nextIntlLocale) &&
      nextIntlLocale !== routing.defaultLocale
    ) {
      const url = request.nextUrl.clone();
      url.pathname = `/${nextIntlLocale}`;
      return NextResponse.redirect(url);
    }
  }

  // Deixa o middleware do next-intl lidar com o resto
  const response = handleI18nRouting(request);

  // Se a resposta for um redirect ou já processada, retorna ela
  if (response.status !== 200) {
    return response;
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};