export class ScheduleChange {
    constructor(
      public readonly id: number,
      public readonly projectId: number,
      public readonly taskId: number | null,
      public changeDate: Date,
      public description: string | null,
      public oldStartDate: Date | null,
      public newStartDate: Date | null,
      public oldDueDate: Date | null,
      public newDueDate: Date | null,
      public reason: string | null,
      public readonly createdAt: Date,
      public updatedAt: Date | null,
      public deletedAt: Date | null
    ) {}
  
    updateDescription(newDescription: string): void {
      this.description = newDescription;
      this.updatedAt = new Date();
    }
  
    updateReason(newReason: string): void {
      this.reason = newReason;
      this.updatedAt = new Date();
    }
  
    isValid(): boolean {
      return (this.oldStartDate !== null && this.newStartDate !== null) ||
             (this.oldDueDate !== null && this.newDueDate !== null);
    }
  
    getDurationChange(): number {
      const oldDuration = this.calculateDuration(this.oldStartDate, this.oldDueDate);
      const newDuration = this.calculateDuration(this.newStartDate, this.newDueDate);
      return newDuration - oldDuration;
    }
  
    private calculateDuration(start: Date | null, end: Date | null): number {
      if (!start || !end) return 0;
      return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24); // Duration in days
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