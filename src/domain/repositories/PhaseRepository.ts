import { Phase } from '@domain/entities/Phase';

export interface PhaseRepository {
  findById(id: number): Promise<Phase | null>;
  findByProjectId(projectId: number): Promise<Phase[]>;
  create(phase: Phase): Promise<Phase>;
  update(phase: Phase): Promise<Phase>;
  delete(id: number): Promise<void>;
  list(projectId: number, page: number, limit: number): Promise<Phase[]>;
  count(projectId: number): Promise<number>;
}