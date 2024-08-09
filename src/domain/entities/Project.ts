import { Phase } from "./Phase";
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
      public deletedAt: Date | null
    ) {}
  
    get status(): string {
      return this._status;
    }
  
    updateStatus(newStatus: string): void {
      const validStatuses = ['Planning', 'In Progress', 'On Hold', 'Completed', 'Cancelled'];
      if (!validStatuses.includes(newStatus)) {
        throw new Error('Invalid project status');
      }
      this._status = newStatus;
      this.updatedAt = new Date();
    }
  
    addPhase(phase: Phase): void {
      this.phases.push(phase);
    }
  
    getPhases(): Phase[] {
      return [...this.phases];
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
      if (this.phases.length === 0) return 0;
      const totalProgress = this.phases.reduce((sum, phase) => sum + phase.calculateProgress(), 0);
      return totalProgress / this.phases.length;
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