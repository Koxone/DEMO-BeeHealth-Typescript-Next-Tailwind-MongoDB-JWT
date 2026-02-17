import { NextResponse } from 'next/server';

import { AuthService } from '@/infrastructure/services/auth/AuthService';
import { JwtTokenService } from '@/infrastructure/services/auth/JwtTokenService';

import { UserNotFoundError } from '@/domain/errors/UserNotFoundError';
import { AuthRequiredError } from '@/domain/errors/AuthRequiredError';
import { JwtPayload } from '@/domain/enums/';

export async function POST(req: Request) {
  try {
    const authService = new AuthService();
    const user = await authService.authenticate(req);

    const tokenService = new JwtTokenService();

    const payload: JwtPayload = {
      id: user.getId(),
      email: user.getEmail(),
      role: user.getRole(),
      fullName: user.getFullName(),
    };

    const accessToken = tokenService.signAccess(payload);
    const refreshToken = tokenService.signRefresh(payload);

    const res = NextResponse.json({ token: accessToken }, { status: 200 });

    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 });
    }

    if (error instanceof UserNotFoundError) {
      return NextResponse.json({ error: 'USER_NOT_FOUND' }, { status: 404 });
    }

    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
