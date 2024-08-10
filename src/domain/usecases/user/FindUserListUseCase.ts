import { User } from '@domain/entities/User';
import { UserRepository } from '@domain/repositories/UserRepository';
import { ERROR_CODES } from '@infrastructure/utils/errorCode';
import { DatabaseError } from '@infrastructure/utils/errors';
import { PaginatedResult, PaginationOptions } from '@domain/repositories/UserRepository';

export class FindUserListUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(options: PaginationOptions): Promise<PaginatedResult<User>> {
    try {
      const userList = await this.userRepository.list(options);
      return userList;
    } catch (error) {
        throw new DatabaseError(ERROR_CODES.DB_001);
    }
  }
}
