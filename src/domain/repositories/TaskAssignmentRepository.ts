import { TaskAssignment } from '@domain/entities/TaskAssignment';

export interface TaskAssignmentRepository {
  findById(id: number): Promise<TaskAssignment | null>;
  findByTaskId(taskId: number): Promise<TaskAssignment[]>;
  findByUserId(userId: number): Promise<TaskAssignment[]>;
  create(assignment: TaskAssignment): Promise<TaskAssignment>;
  update(assignment: TaskAssignment): Promise<TaskAssignment>;
  delete(id: number): Promise<void>;
  list(taskId: number): Promise<TaskAssignment[]>;
}