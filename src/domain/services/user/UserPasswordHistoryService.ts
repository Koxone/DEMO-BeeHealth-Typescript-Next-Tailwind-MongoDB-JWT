import { UserPasswordHistoryRepository } from "@/domain/repositories/user/UserPasswordHistoryRepository";

export class UserPasswordHistoryService {
  constructor(private readonly repository: UserPasswordHistoryRepository) {}

  async isPasswordReused(userId: string, passwordHash: string): Promise<boolean> {
    return this.repository.existsPasswordHash(userId, passwordHash);
  }
}
