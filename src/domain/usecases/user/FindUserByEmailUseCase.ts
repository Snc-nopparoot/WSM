import { User } from '@domain/entities/User';
import { UserRepository } from '@domain/repositories/UserRepository';
import { ERROR_CODES } from '@infrastructure/utils/errorCode';
import { NotFoundError, DatabaseError } from '@infrastructure/utils/errors';

export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundError(ERROR_CODES.NF_001);
      }
      return user;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new DatabaseError(ERROR_CODES.DB_001);
    }
  }
}
