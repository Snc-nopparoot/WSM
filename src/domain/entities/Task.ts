export class Task {
  constructor(
    public readonly id: number,
    public readonly phaseId: number,
    public name: string,
    public description: string | null,
    public startDate: Date,
    public dueDate: Date,
    public actualEndDate: Date | null,
    private _status: string,
    public priority: string | null,
    public estimatedHours: number | null,
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
  ) {}
}
