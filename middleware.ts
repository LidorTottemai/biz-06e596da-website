import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse, type NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const EXEMPT_PREFIXES = ['/_next', '/api', '/favicon.ico', '/unlock'];

function isExempt(pathname: string): boolean {
  return EXEMPT_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    pathname.includes('.');
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isExempt(pathname)) {
    return NextResponse.next();
  }

  const sitePassword = process.env.SITE_PASSWORD;
  if (sitePassword) {
    const authCookie = request.cookies.get('site-auth');
    if (!authCookie || authCookie.value !== sitePassword) {
      const url = request.nextUrl.clone();
      url.pathname = '/unlock';
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
