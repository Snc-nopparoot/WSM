import { User } from "@domain/entities/User";

export class AuthorizationService {
    canCreateProject(user: User): boolean {
      const allowedRoles = ['admin', 'manager', 'project_lead'];
      return user.hasAnyRole(allowedRoles);
    }
  
    canEditProject(user: User): boolean {
      return user.hasAnyRole(['admin', 'manager', 'project_lead', 'developer']);
    }
  
    canDeleteProject(user: User): boolean {
      return user.hasRole('admin');
    }
  }