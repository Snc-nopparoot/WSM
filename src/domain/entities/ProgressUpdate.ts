export class ProgressUpdate {
    constructor(
      public readonly id: number,
      public readonly taskId: number,
      public readonly userId: number,
      public updateDate: Date,
      public description: string | null,
      public percentageComplete: number | null,
      public hoursSpent: number | null,
      public readonly createdAt: Date,
      public updatedAt: Date | null,
      public deletedAt: Date | null
    ) {}
  
    updateProgress(newPercentage: number, newHoursSpent: number): void {
      if (newPercentage < 0 || newPercentage > 100) {
        throw new Error('Percentage complete must be between 0 and 100');
      }
      if (newHoursSpent < 0) {
        throw new Error('Hours spent cannot be negative');
      }
      this.percentageComplete = newPercentage;
      this.hoursSpent = newHoursSpent;
      this.updateDate = new Date();
      this.updatedAt = new Date();
    }
  
    updateDescription(newDescription: string): void {
      this.description = newDescription;
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