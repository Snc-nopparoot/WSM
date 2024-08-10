export class TaskDependency {
  constructor(
    public readonly id: number,
    public readonly predecessorTaskId: number,
    public readonly successorTaskId: number,
    private _dependencyType: string,
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
  ) {}
}
