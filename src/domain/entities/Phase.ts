import { Task } from "./Task";
export class Phase {
    private tasks: Task[] = [];
  
    constructor(
      public readonly id: number,
      public readonly projectId: number,
      public name: string,
      public description: string | null,
      public startDate: Date,
      public endDate: Date | null,
      private _status: string,
      public readonly createdAt: Date,
      public updatedAt: Date | null,
      public deletedAt: Date | null
    ) {}
  
    get status(): string {
      return this._status;
    }
  
    updateStatus(newStatus: string): void {
      const validStatuses = ['Planning', 'In Progress', 'On Hold', 'Completed'];
      if (!validStatuses.includes(newStatus)) {
        throw new Error('Invalid phase status');
      }
      this._status = newStatus;
      this.updatedAt = new Date();
    }
  
    addTask(task: Task): void {
      this.tasks.push(task);
    }
  
    getTasks(): Task[] {
      return [...this.tasks];
    }
  
    updateDates(newStartDate: Date, newEndDate: Date | null): void {
      if (newEndDate && newStartDate > newEndDate) {
        throw new Error('Start date cannot be after end date');
      }
      this.startDate = newStartDate;
      this.endDate = newEndDate;
      this.updatedAt = new Date();
    }
  
    calculateProgress(): number {
      if (this.tasks.length === 0) return 0;
      const completedTasks = this.tasks.filter(task => task.status === 'Completed').length;
      return (completedTasks / this.tasks.length) * 100;
    }
  
    isOverdue(): boolean {
      return this.endDate ? new Date() > this.endDate && this._status !== 'Completed' : false;
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