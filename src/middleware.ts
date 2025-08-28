import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Se está acessando a página inicial (/) sem idioma na URL
  if (pathname === '/') {
    // Verifica o cookie NEXT_LOCALE primeiro
    const savedLocale = request.cookies.get('NEXT_LOCALE')?.value;
    const userLocale = request.cookies.get('user-locale')?.value;
    
    // Tenta primeiro o user-locale, depois o NEXT_LOCALE
    const localeToUse = userLocale || savedLocale;
    
    // Se há um idioma salvo e não é português, redireciona
    if (localeToUse && 
        (routing.locales as readonly string[]).includes(localeToUse) && 
        localeToUse !== routing.defaultLocale) {
      
      const url = request.nextUrl.clone();
      url.pathname = `/${localeToUse}`;
      return NextResponse.redirect(url);
    }
  }
  
  // Para todos os outros casos, usa o middleware padrão do next-intl
  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};