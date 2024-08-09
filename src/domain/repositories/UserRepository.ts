import { User } from '@domain/entities/User';

export interface UserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<void>;
  list(page: number, limit: number): Promise<User[]>;
  count(): Promise<number>;
}