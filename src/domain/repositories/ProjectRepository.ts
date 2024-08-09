import { Project } from '@domain/entities/Project';

export interface ProjectRepository {
  findById(id: number): Promise<Project | null>;
  create(project: Project): Promise<Project>;
  update(project: Project): Promise<Project>;
  delete(id: number): Promise<void>;
  list(page: number, limit: number): Promise<Project[]>;
  listByUser(userId: number, page: number, limit: number): Promise<Project[]>;
  count(): Promise<number>;
  countByUser(userId: number): Promise<number>;
}