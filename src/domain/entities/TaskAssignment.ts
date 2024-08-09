export class TaskAssignment {
    constructor(
      public readonly id: number,
      public readonly taskId: number,
      public readonly userId: number,
      public assignedDate: Date,
      public role: string | null,
      public readonly createdAt: Date,
      public updatedAt: Date | null,
      public deletedAt: Date | null
    ) {}
  
    updateRole(newRole: string): void {
      const validRoles = ['Developer', 'Tester', 'Designer', 'Manager'];
      if (!validRoles.includes(newRole)) {
        throw new Error('Invalid role');
      }
      this.role = newRole;
      this.updatedAt = new Date();
    }
  
    reassign(newAssignedDate: Date): void {
      if (newAssignedDate < this.createdAt) {
        throw new Error('Assigned date cannot be before the creation date');
      }
      this.assignedDate = newAssignedDate;
      this.updatedAt = new Date();
    }
  
    softDelete(): void {
      this.deletedAt = new Date();
    }
  
    restore(): void {
      this.deletedAt = null;
    }
  
    isDeleted(): boolean {
      return this.deletedAt !== null;
    }
  }