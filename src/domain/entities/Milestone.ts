export class Milestone {
  constructor(
    public readonly id: number,
    public readonly projectId: number,
    public name: string,
    public description: string | null,
    public dueDate: Date,
    private _status: string,
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
  ) {}
}
