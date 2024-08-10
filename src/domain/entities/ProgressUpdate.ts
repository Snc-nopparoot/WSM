export class ProgressUpdate {
  constructor(
    public readonly id: number,
    public readonly taskId: number,
    public readonly userId: number,
    public updateDate: Date,
    public description: string | null,
    public percentageComplete: number | null,
    public hoursSpent: number | null,
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
  ) {}
}
