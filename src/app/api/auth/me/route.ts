import { NextResponse } from 'next/server';

// Service Imports
import { AuthTokenExtractor } from '@/infrastructure/services/auth/AuthTokenExtractor';
import { JwtTokenService } from '@/infrastructure/services/auth/JwtTokenService';
import { MongooseUserRepository } from '@/infrastructure/repositories/user/MongooseUserRepository';

// Use Case Imports
import { GetAuthenticatedUser } from '@/application/use-cases/auth/GetAuthenticatedUser';

// Error Imports
import { AuthRequiredError } from '@/domain/errors/AuthRequiredError';
import { UserNotFoundError } from '@/domain/errors/UserNotFoundError';

export async function GET(req: Request) {
  try {
    const extractor = new AuthTokenExtractor();
    const tokenService = new JwtTokenService();

    const token = extractor.extract(req);
    if (!token) {
      throw new AuthRequiredError();
    }

    const { id } = tokenService.verify(token);

    const useCase = new GetAuthenticatedUser(new MongooseUserRepository());
    const user = await useCase.execute(id);

    return NextResponse.json(
      {
        user: {
          id: user.getId(),
          name: user.getName(),
          lastName: user.getLastName(),
          email: user.getEmail(),
          phone: user.getPhone(),
          avatar: user.getAvatar(),
          role: user.getRole(),
          specialty: user.getSpecialty(),
          updatedAt: user.getUpdatedAt(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 });
    }

    if (error instanceof UserNotFoundError) {
      return NextResponse.json({ error: 'USER_NOT_FOUND' }, { status: 404 });
    }

    // Fallback error
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
