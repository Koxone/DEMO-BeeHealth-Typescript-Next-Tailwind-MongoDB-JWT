import { UserPasswordHistory } from "@/domain/entities/user/UserPasswordHistory";

export interface UserPasswordHistoryRepository {
  save(history: UserPasswordHistory): Promise<void>;
  findByUserId(userId: string): Promise<UserPasswordHistory[]>;
  existsPasswordHash(userId: string, passwordHash: string): Promise<boolean>;
}
