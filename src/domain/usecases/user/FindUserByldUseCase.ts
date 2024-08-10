import { User } from '@domain/entities/User';
import { UserRepository } from '@domain/repositories/UserRepository';
import { ERROR_CODES } from '@infrastructure/utils/errorCode';
import { NotFoundError, DatabaseError } from '@infrastructure/utils/errors';

export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findById(id);
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
