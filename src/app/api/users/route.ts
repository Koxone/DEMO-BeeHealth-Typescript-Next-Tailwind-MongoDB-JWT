import { NextResponse } from 'next/server';

import { GetUsersByRoleAndSpecialty } from '@/application/use-cases/users/GetUsersByRoleAndSpecialty';
import { MongooseUserRepository } from '@/infrastructure/repositories/user/MongooseUserRepository';
import { UserRole, UserSpecialty } from '@/domain/enums/';

import { z } from 'zod';

const querySchema = z.object({
  role: z.enum(UserRole),
  specialty: z.enum(UserSpecialty),
});

export async function GET(req: Request) {
  // Parse query
  const { searchParams } = new URL(req.url);

  const parseResult = querySchema.safeParse({
    role: searchParams.get('role'),
    specialty: searchParams.get('specialty'),
  });

  if (!parseResult.success) {
    return NextResponse.json({ message: 'Invalid role or specialty' }, { status: 400 });
  }

  const { role, specialty } = parseResult.data;

  const useCase = new GetUsersByRoleAndSpecialty(new MongooseUserRepository());

  const users = await useCase.execute(role, specialty);

  return NextResponse.json(
    users.map((user) => ({
      id: user.getId(),
      fullName: user.getFullName(),
      phone: user.getPhone(),
      avatar: user.getAvatar(),
      email: user.getEmail(),
      role: user.getRole(),
      specialty: user.getSpecialty(),
      isActive: user.getIsActive(),
      updatedAt: user.getUpdatedAt(),
    }))
  );
}

// Usage example: /api/users?role=patient&specialty=weight
// This will return all users with the role 'patient' and specialty 'weight'
