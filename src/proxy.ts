import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes
  if (
    pathname === '/' ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/public') ||
    pathname.startsWith('/api') ||
    pathname === '/site.webmanifest'
  ) {
    return NextResponse.next();
  }

  // Private routes require session
  const token = request.cookies.get('refreshToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)'],
};
