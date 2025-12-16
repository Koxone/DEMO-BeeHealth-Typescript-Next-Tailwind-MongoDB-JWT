import { NextResponse } from 'next/server';

// @route    POST api/auth/logout
// @desc     Logout user and clear refresh token
// @access   Public
export async function POST() {
  try {
    // Crear respuesta
    const res = NextResponse.json({ message: 'Logout successful' }, { status: 200 });

    // Eliminar cookie refreshToken
    res.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0), // expira inmediatamente
    });

    return res;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Error logging out' }, { status: 500 });
  }
}
