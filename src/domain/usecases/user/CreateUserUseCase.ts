import { User } from '@domain/entities/User';
import { UserRepository } from '@domain/repositories/UserRepository';
import { DatabaseTransactionManager } from '@domain/services/DatabaseTransaction';
import { ValidationError, DatabaseError } from '@infrastructure/utils/errors';
import { ERROR_CODES } from '@infrastructure/utils/errorCode';
import { hashPassword } from '@infrastructure/utils/hasher';

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private transactionManager: DatabaseTransactionManager,
  ) {}

  async execute(userData: { email: string; name: string; role: string; password: string }): Promise<User> {
    const transactionManager = await this.transactionManager.startTransaction();
    try {
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser) {
        throw new ValidationError(ERROR_CODES.EXIS_001);
      }

      const user = new User(0, userData.email, userData.name, userData.role, await hashPassword(userData.password), new Date(), null, null);

      const newUser = await this.userRepository.create(user);
      await transactionManager.commit();
      return newUser;
    } catch (error) {
      await transactionManager.rollback();
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new DatabaseError(ERROR_CODES.DB_001);
    }
  }
}
