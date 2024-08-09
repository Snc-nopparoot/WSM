import { Milestone } from '@domain/entities/Milestone';

export interface MilestoneRepository {
  findById(id: number): Promise<Milestone | null>;
  findByProjectId(projectId: number): Promise<Milestone[]>;
  create(milestone: Milestone): Promise<Milestone>;
  update(milestone: Milestone): Promise<Milestone>;
  delete(id: number): Promise<void>;
  list(projectId: number, page: number, limit: number): Promise<Milestone[]>;
  count(projectId: number): Promise<number>;
}