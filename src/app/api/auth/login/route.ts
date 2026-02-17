import { NextResponse } from 'next/server';

import { LoginUser } from '@/application/use-cases/auth/LoginUser';
import { MongooseUserRepository } from '@/infrastructure/repositories/user/MongooseUserRepository';
import { BcryptPasswordHasher } from '@/infrastructure/services/BcryptPasswordHasher';

// Domain Errors imports
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError';
import { UserInactiveError } from '@/domain/errors/UserInactiveError';

import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    // Body Request
    const body = await req.json();

    // Validations
    const email = typeof body.email === 'string' ? body.email : '';
    const password = typeof body.password === 'string' ? body.password : '';

    // Check required fields
    if (!email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Use case
    const useCase = new LoginUser(new MongooseUserRepository(), new BcryptPasswordHasher());
    const user = await useCase.execute({ email, password });

    // Payload
    const payload = {
      id: user.getId(),
      email: user.getEmail(),
      role: user.getRole(),
      specialty: user.getSpecialty(),
    };

    // Tokens
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '7d' });

    // Response
    const res = NextResponse.json(
      {
        message: 'Login Successful',
        token: accessToken,
      },
      { status: 200 }
    );

    // Cookie
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (error instanceof UserInactiveError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    // Error inesperado
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
