import { User } from "@domain/entities/User";
import { UserRepository } from "@domain/repositories/UserRepository";
import { DatabaseTransactionManager } from "@domain/services/DatabaseTransaction";
import { ERROR_CODES } from "@infrastructure/utils/errorCode";
import { DatabaseError, NotFoundError } from "@infrastructure/utils/errors";
import { hashPassword } from "@infrastructure/utils/hasher";

export class UpdateUserUseCase {
    constructor(
       private userRepository: UserRepository,
       private transactionManager: DatabaseTransactionManager 
    ) {}

    async execute(userData: {id: number, name: string, password: string}): Promise<User> {
        const transactionManager = await this.transactionManager.startTransaction();
        try {
            const existingUser = await this.userRepository.findById(userData.id);
            if (!existingUser) {
                throw new NotFoundError(ERROR_CODES.NF_001);
            }

            const user = new User (
                existingUser.id,
                existingUser.email,
                userData.name,
                existingUser.email,
                await hashPassword(userData.password),
                existingUser.createdAt,
                new Date(),
                null
            )

            const updatedUser = await this.userRepository.update(user);
            await transactionManager.commit();
            return updatedUser;
        } catch (error) {
            transactionManager.rollback();
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError(ERROR_CODES.DB_001);
        }
    }
}