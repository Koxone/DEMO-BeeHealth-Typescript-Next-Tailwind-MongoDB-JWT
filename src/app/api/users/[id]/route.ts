import { NextResponse } from 'next/server';
import { z } from 'zod';
import { MongooseUserRepository } from '@/infrastructure/repositories/user/MongooseUserRepository';
import { UserResponseDTO } from '@/application/dto/user/UserResponseDTO';
import { GetUserByIdUseCase } from '@/application/use-cases/users/GetUserById';

// @route    GET /api/users/:id
// @desc     Get user by id
// @access   Private
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const userRepository = new MongooseUserRepository();
  const getUserById = new GetUserByIdUseCase(userRepository);

  const user = await getUserById.execute(id);

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(UserResponseDTO.fromDomain(user), { status: 200 });
}
