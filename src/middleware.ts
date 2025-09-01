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

 if (pathname === '/') {
    const savedLocale = request.cookies.get('NEXT_LOCALE')?.value;
    const userLocale = request.cookies.get('user-locale')?.value;
    const localeToUse = userLocale || savedLocale;

    if (
      localeToUse &&
      (routing.locales as readonly string[]).includes(localeToUse) &&
      localeToUse !== routing.defaultLocale
    ) {
      const url = request.nextUrl.clone();
      url.pathname = `/${localeToUse}`;
      return NextResponse.redirect(url);
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};
