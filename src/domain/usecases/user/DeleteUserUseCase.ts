
import { User } from "@domain/entities/User";
import { UserRepository } from "@domain/repositories/UserRepository";
import { DatabaseTransactionManager } from "@domain/services/DatabaseTransaction";
import { ERROR_CODES } from "@infrastructure/utils/errorCode";
import { DatabaseError, NotFoundError } from "@infrastructure/utils/errors";

export class DeleteUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private transactionManager: DatabaseTransactionManager
    ) {}

    async execute(id: number): Promise<User> {
        const transactionManager = await this.transactionManager.startTransaction();
        try {
            const existingUser = await this.userRepository.findById(id);
            if (!existingUser) {
                throw new NotFoundError(ERROR_CODES.NF_001);
            }

            const user = new User (
                existingUser.id,
                existingUser.email,
                existingUser.name,
                existingUser.email,
                existingUser.password,
                existingUser.createdAt,
                existingUser.updatedAt,
                new Date()
            )

            const deleteUser = await this.userRepository.delete(user);
            await transactionManager.commit();
            return deleteUser;
        } catch (error) {
            transactionManager.rollback();
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError(ERROR_CODES.DB_001);
        }
    }
}