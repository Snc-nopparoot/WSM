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
      public deletedAt: Date | null
    ) {}
  
    get status(): string {
      return this._status;
    }
  
    updateStatus(newStatus: string): void {
      const validStatuses = ['Pending', 'In Progress', 'Completed', 'Delayed'];
      if (!validStatuses.includes(newStatus)) {
        throw new Error('Invalid milestone status');
      }
      this._status = newStatus;
      this.updatedAt = new Date();
    }
  
    updateDueDate(newDueDate: Date): void {
      if (newDueDate < this.createdAt) {
        throw new Error('Due date cannot be before the creation date');
      }
      this.dueDate = newDueDate;
      this.updatedAt = new Date();
    }
  
    isOverdue(): boolean {
      return new Date() > this.dueDate && this._status !== 'Completed';
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