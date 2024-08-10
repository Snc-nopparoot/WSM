export class ScheduleChange {
  constructor(
    public readonly id: number,
    public readonly projectId: number,
    public readonly taskId: number | null,
    public changeDate: Date,
    public description: string | null,
    public oldStartDate: Date | null,
    public newStartDate: Date | null,
    public oldDueDate: Date | null,
    public newDueDate: Date | null,
    public reason: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
  ) {}
}
