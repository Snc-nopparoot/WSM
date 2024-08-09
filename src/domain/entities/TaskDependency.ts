export class TaskDependency {
    constructor(
      public readonly id: number,
      public readonly predecessorTaskId: number,
      public readonly successorTaskId: number,
      private _dependencyType: string,
      public readonly createdAt: Date,
      public updatedAt: Date | null,
      public deletedAt: Date | null
    ) {}
  
    get dependencyType(): string {
      return this._dependencyType;
    }
  
    updateDependencyType(newType: string): void {
      const validTypes = ['Finish-to-Start', 'Start-to-Start', 'Finish-to-Finish', 'Start-to-Finish'];
      if (!validTypes.includes(newType)) {
        throw new Error('Invalid dependency type');
      }
      this._dependencyType = newType;
      this.updatedAt = new Date();
    }
  
    isCircularDependency(allDependencies: TaskDependency[]): boolean {
      const visited = new Set<number>();
      const recursionStack = new Set<number>();
  
      const dfs = (taskId: number): boolean => {
        visited.add(taskId);
        recursionStack.add(taskId);
  
        const dependencies = allDependencies.filter(dep => dep.predecessorTaskId === taskId);
        for (const dependency of dependencies) {
          if (!visited.has(dependency.successorTaskId)) {
            if (dfs(dependency.successorTaskId)) {
              return true;
            }
          } else if (recursionStack.has(dependency.successorTaskId)) {
            return true;
          }
        }
  
        recursionStack.delete(taskId);
        return false;
      };
  
      return dfs(this.predecessorTaskId);
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