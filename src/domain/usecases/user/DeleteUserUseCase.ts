
import { UserRepository } from "@domain/repositories/UserRepository";
import { DatabaseTransactionManager } from "@domain/services/DatabaseTransaction";
import { ERROR_CODES } from "@infrastructure/utils/errorCode";
import { DatabaseError, NotFoundError } from "@infrastructure/utils/errors";

export class DeleteUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private transactionManager: DatabaseTransactionManager
    ) {}

    async execute(id: number): Promise<void> {
        const transactionManager = await this.transactionManager.startTransaction();
        try {
            const existingUser = await this.userRepository.findById(id);
            if (!existingUser) {
                throw new NotFoundError(ERROR_CODES.NF_001);
            }

            await this.userRepository.delete(id);
            transactionManager.commit();
        } catch (error) {
            transactionManager.rollback();
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError(ERROR_CODES.DB_001);
        }
    }
}