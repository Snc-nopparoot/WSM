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
      public deletedAt: Date | null
    ) {}
  
    get status(): string {
      return this._status;
    }
  
    updateStatus(newStatus: string): void {
      const validStatuses = ['Not Started', 'In Progress', 'On Hold', 'Completed'];
      if (!validStatuses.includes(newStatus)) {
        throw new Error('Invalid task status');
      }
      this._status = newStatus;
      if (newStatus === 'Completed') {
        this.actualEndDate = new Date();
      }
      this.updatedAt = new Date();
    }
  
    updateDates(newStartDate: Date, newDueDate: Date): void {
      if (newStartDate > newDueDate) {
        throw new Error('Start date cannot be after due date');
      }
      this.startDate = newStartDate;
      this.dueDate = newDueDate;
      this.updatedAt = new Date();
    }
  
    updatePriority(newPriority: string): void {
      const validPriorities = ['Low', 'Medium', 'High', 'Critical'];
      if (!validPriorities.includes(newPriority)) {
        throw new Error('Invalid priority');
      }
      this.priority = newPriority;
      this.updatedAt = new Date();
    }
  
    updateEstimatedHours(hours: number): void {
      if (hours < 0) {
        throw new Error('Estimated hours cannot be negative');
      }
      this.estimatedHours = hours;
      this.updatedAt = new Date();
    }
  
    isOverdue(): boolean {
      return new Date() > this.dueDate && this._status !== 'Completed';
    }
  
    calculateProgress(hoursSpent: number): number {
      if (!this.estimatedHours) return 0;
      return Math.min((hoursSpent / this.estimatedHours) * 100, 100);
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