import { Task } from './Task';
export class Phase {
  private tasks: Task[] = [];

  constructor(
    public readonly id: number,
    public readonly projectId: number,
    public name: string,
    public description: string | null,
    public startDate: Date,
    public endDate: Date | null,
    private _status: string,
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
  ) {}
}
