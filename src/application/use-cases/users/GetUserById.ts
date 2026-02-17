import { UserRepository } from "@/domain/repositories/user/UserRepository";

export class GetUserByIdUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(userId: string) {
        return this.userRepository.findById(userId);
    }
}