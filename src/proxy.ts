import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt } from 'jose';
import { UserRole } from './domain/enums/';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('refreshToken')?.value;

  if (pathname === '/auth/login') {
    return NextResponse.next();
  }

  if (
    pathname.startsWith('/public') ||
    pathname.startsWith('/api') ||
    pathname === '/site.webmanifest'
  ) {
    return NextResponse.next();
  }

  if (pathname === '/') {
    if (!token) return NextResponse.next();

    try {
      const payload = decodeJwt(token) as { role?: UserRole };
      if (!payload?.role) return NextResponse.next();

      return NextResponse.redirect(new URL(`/${payload.role}/dashboard`, request.url));
    } catch {
      const res = NextResponse.next();
      res.cookies.set('refreshToken', '', { path: '/', maxAge: 0 });
      return res;
    }
  }

  if (pathname.startsWith('/auth')) {
    if (!token) return NextResponse.next();

    try {
      const payload = decodeJwt(token) as { role?: UserRole };
      if (!payload?.role) return NextResponse.next();

      return NextResponse.redirect(new URL(`/${payload.role}/dashboard`, request.url));
    } catch {
      const res = NextResponse.next();
      res.cookies.set('refreshToken', '', { path: '/', maxAge: 0 });
      return res;
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    const payload = decodeJwt(token) as { role?: UserRole };
    const role = payload?.role;

    if (!role) {
      const res = NextResponse.redirect(new URL('/auth/login', request.url));
      res.cookies.set('refreshToken', '', { path: '/', maxAge: 0 });
      return res;
    }

    if (pathname === `/${role}` || pathname === `/${role}/`) {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }

    const firstSegment = pathname.split('/')[1];
    const validRoles = ['patient', 'doctor', 'employee', 'admin'];

    if (validRoles.includes(firstSegment) && firstSegment !== role) {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }

    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL('/auth/login', request.url));
    res.cookies.set('refreshToken', '', { path: '/', maxAge: 0 });
    return res;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)'],
};
