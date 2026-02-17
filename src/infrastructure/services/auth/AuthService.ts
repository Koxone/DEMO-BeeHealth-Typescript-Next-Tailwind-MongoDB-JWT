import { AuthTokenExtractor } from './AuthTokenExtractor';
import { JwtTokenService } from './JwtTokenService';
import { MongooseUserRepository } from '@/infrastructure/repositories/user/MongooseUserRepository';
import { GetAuthenticatedUser } from '@/application/use-cases/auth/GetAuthenticatedUser';
import { AuthRequiredError } from '@/domain/errors/AuthRequiredError';

export class AuthService {
  private extractor = new AuthTokenExtractor();
  private tokenService = new JwtTokenService();

  async authenticate(req: Request) {
    const token = this.extractor.extract(req);

    if (!token) {
      throw new AuthRequiredError();
    }

    const { userId } = this.tokenService.verify(token);

    const useCase = new GetAuthenticatedUser(new MongooseUserRepository());

    return useCase.execute(userId);
  }
}
