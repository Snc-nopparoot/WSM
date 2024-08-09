import { TaskDependency } from '@domain/entities/TaskDependency';

export interface TaskDependencyRepository {
  findById(id: number): Promise<TaskDependency | null>;
  findByPredecessorTaskId(taskId: number): Promise<TaskDependency[]>;
  findBySuccessorTaskId(taskId: number): Promise<TaskDependency[]>;
  create(dependency: TaskDependency): Promise<TaskDependency>;
  update(dependency: TaskDependency): Promise<TaskDependency>;
  delete(id: number): Promise<void>;
  list(taskId: number): Promise<TaskDependency[]>;
}