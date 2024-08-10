import { User } from '@domain/entities/User';

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserRepository {
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(user: User): Promise<User>; //soft dalete
  list(options: PaginationOptions): Promise<PaginatedResult<User>>;
  count(): Promise<number>;
}