import { ProgressUpdate } from '@domain/entities/ProgressUpdate';

export interface ProgressUpdateRepository {
  findById(id: number): Promise<ProgressUpdate | null>;
  findByTaskId(taskId: number): Promise<ProgressUpdate[]>;
  create(update: ProgressUpdate): Promise<ProgressUpdate>;
  update(update: ProgressUpdate): Promise<ProgressUpdate>;
  delete(id: number): Promise<void>;
  list(taskId: number, page: number, limit: number): Promise<ProgressUpdate[]>;
  count(taskId: number): Promise<number>;
}