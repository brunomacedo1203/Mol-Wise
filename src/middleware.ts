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

  // Para a página home, NÃO interferir - deixar o next-intl lidar com tudo
  if (pathname === '/') {
    return handleI18nRouting(request);
  }

  // Para outras rotas, também deixar o next-intl lidar
  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};