import { Phase } from './Phase';
export class Project {
  private phases: Phase[] = [];

  constructor(
    public readonly id: number,
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
