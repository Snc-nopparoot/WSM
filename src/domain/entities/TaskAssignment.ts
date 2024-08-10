export class TaskAssignment {
  constructor(
    public readonly id: number,
    public readonly taskId: number,
    public readonly userId: number,
    public assignedDate: Date,
    public role: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
  ) {}
}
