import { Task } from '@domain/entities/Task';

export interface TaskRepository {
  findById(id: number): Promise<Task | null>;
  findByPhaseId(phaseId: number): Promise<Task[]>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: number): Promise<void>;
  list(phaseId: number, page: number, limit: number): Promise<Task[]>;
  listByUser(userId: number, page: number, limit: number): Promise<Task[]>;
  count(phaseId: number): Promise<number>;
  countByUser(userId: number): Promise<number>;
}