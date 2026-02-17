import { NextResponse } from 'next/server';
import { z } from 'zod';

import { RegisterUser } from '@/application/use-cases/auth/RegisterUser';
import { UserSpecialty, UserRole } from '@/domain/enums/';

import { MongooseUserRepository } from '@/infrastructure/repositories/user/MongooseUserRepository';
import { BcryptPasswordHasher } from '@/infrastructure/services/BcryptPasswordHasher';

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().regex(/^[0-9]{7,15}$/),
  specialty: z.enum(['weight', 'dental', 'stetic']),
});

const specialtyMap = {
  weight: UserSpecialty.WEIGHT,
  dental: UserSpecialty.DENTAL,
  stetic: UserSpecialty.STETIC,
} as const;

// @route    POST api/auth/signup
// @desc     Create a new user with role patient
// @access   Public
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = registerSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    const { email, password, name, lastName, phone, specialty: specialtyKey } = parseResult.data;

    const specialty = specialtyMap[specialtyKey];
    const role = UserRole.PATIENT;

    const userRepository = new MongooseUserRepository();
    const passwordHasher = new BcryptPasswordHasher();

    const registerUser = new RegisterUser(userRepository, passwordHasher);

    await registerUser.execute({
      email,
      password,
      name,
      lastName,
      phone,
      role,
      specialty,
    });

    return NextResponse.json(
      {
        message: 'User registered successfully',
        data: {
          email,
          name,
          lastName,
          phone,
          role,
          specialty,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message }, { status: 400 });
  }
}
