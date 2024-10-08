export class User {
  constructor(
    public readonly id: number,
    public email: string,
    public name: string,
    public role: string,
    public password: string,
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
  ) {}
}
