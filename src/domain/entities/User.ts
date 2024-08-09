export class User {
    constructor(
      public readonly id: number,
      public email: string,
      public name: string,
      public role: string,
      private passwordHash: string,
      public readonly createdAt: Date,
      public updatedAt: Date | null,
      public deletedAt: Date | null
    ) {}

    getEmail(): string {
      return this.email;
    }
  
    getName(): string {
      return this.name;
    }
  
    getRole(): string {
      return this.role;
    }
  
    setRole(newRole: string): void {
      this.role = newRole;
      this.updatedAt = new Date();
    }
  
    updateEmail(newEmail: string): void {
      if (!this.isValidEmail(newEmail)) {
        throw new Error('Invalid email format');
      }
      this.email = newEmail;
      this.updatedAt = new Date();
    }

    canCreateProject(): boolean {
      // ตรวจสอบตาม role
      return ['admin', 'manager', 'project_lead'].includes(this.role);
    }
  
    updateName(newName: string): void {
      if (newName.trim().length === 0) {
        throw new Error('Name cannot be empty');
      }
      this.name = newName;
      this.updatedAt = new Date();
    }
  
    verifyPassword(password: string): boolean {
      // ในการใช้งานจริง ควรใช้ library เช่น bcrypt เพื่อเปรียบเทียบ hash
      return this.passwordHash === password;
    }
  
    changePassword(currentPassword: string, newPassword: string): void {
      if (!this.verifyPassword(currentPassword)) {
        throw new Error('Current password is incorrect');
      }
      if (newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters long');
      }
      this.passwordHash = newPassword; // ในการใช้งานจริง ควร hash password ก่อนเก็บ
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
  
    private isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    hasRole(role: string): boolean {
      return this.role === role;
    }
  
    hasAnyRole(roles: string[]): boolean {
      return roles.includes(this.role);
    }
  }