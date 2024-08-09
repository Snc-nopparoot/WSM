import { ScheduleChange } from '@domain/entities/ScheduleChange';

export interface ScheduleChangeRepository {
  findById(id: number): Promise<ScheduleChange | null>;
  findByProjectId(projectId: number): Promise<ScheduleChange[]>;
  findByTaskId(taskId: number): Promise<ScheduleChange[]>;
  create(change: ScheduleChange): Promise<ScheduleChange>;
  update(change: ScheduleChange): Promise<ScheduleChange>;
  delete(id: number): Promise<void>;
  list(projectId: number, page: number, limit: number): Promise<ScheduleChange[]>;
  count(projectId: number): Promise<number>;
}