import { NextResponse } from 'next/server';

import { ChangePassword } from '@/application/use-cases/auth/ChangePassword';

import { MongooseUserRepository } from '@/infrastructure/repositories/user/MongooseUserRepository';
import { MongooseUserPasswordHistoryRepository } from '@/infrastructure/repositories/user/MongoUserPasswordHistoryRepository';
import { BcryptPasswordHasher } from '@/infrastructure/services/BcryptPasswordHasher';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const userId = typeof body.userId === 'string' ? body.userId : '';
    const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword : '';
    const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';

    const userRepository = new MongooseUserRepository();
    const passwordHasher = new BcryptPasswordHasher();
    const passwordHistoryRepository = new MongooseUserPasswordHistoryRepository();

    const changePassword = new ChangePassword(
      userRepository,
      passwordHasher,
      passwordHistoryRepository
    );

    await changePassword.execute({
      userId,
      currentPassword,
      newPassword,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message }, { status: 400 });
  }
}
