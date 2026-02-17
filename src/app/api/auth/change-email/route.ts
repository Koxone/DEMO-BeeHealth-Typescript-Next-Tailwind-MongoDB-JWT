import { NextResponse } from 'next/server';

import { ChangeEmail } from '@/application/use-cases/auth/ChangeEmail';

import { MongooseUserRepository } from '@/infrastructure/repositories/user/MongooseUserRepository';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const userId = typeof body.userId === 'string' ? body.userId : '';
    const newEmail = typeof body.newEmail === 'string' ? body.newEmail : '';

    const userRepository = new MongooseUserRepository();
    const changeEmail = new ChangeEmail(userRepository);

    await changeEmail.execute({ userId, newEmail });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message }, { status: 400 });
  }
}
