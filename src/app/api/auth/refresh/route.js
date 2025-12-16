import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// @route    GET api/auth/refresh
// @desc     Refresh Current User Token
// @access   Private
export async function POST(req) {
  try {
    const cookieStore = await cookies();
    let refresh = cookieStore.get('refreshToken')?.value || null;

    if (!refresh) {
      const auth = req.headers.get('authorization') || '';
      const [scheme, token] = auth.split(' ');
      if (scheme?.toLowerCase() === 'bearer' && token) refresh = token;
    }

    if (!refresh) {
      return NextResponse.json({ error: 'Missing refresh token' }, { status: 401 });
    }

    let payload;
    try {
      payload = jwt.verify(refresh, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }

    const accessToken = jwt.sign(
      { id: payload.id, email: payload.email, role: payload.role, fullName: payload.fullName },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    const newRefresh = jwt.sign(
      { id: payload.id, email: payload.email, role: payload.role, fullName: payload.fullName },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const res = NextResponse.json({ token: accessToken }, { status: 200 });

    res.cookies.set('refreshToken', newRefresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Refresh failed' }, { status: 500 });
  }
}
