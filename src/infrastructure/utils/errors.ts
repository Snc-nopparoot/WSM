// Base Error class
export class AppError extends Error {
    constructor(public message: string, public statusCode: number = 500) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Use Case Errors
  export class ValidationError extends AppError {
    constructor(message: string) {
      super(message, 400);
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(message: string) {
      super(message, 404);
    }
  }
  
  export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized') {
      super(message, 401);
    }
  }
  
  export class ForbiddenError extends AppError {
    constructor(message: string = 'Forbidden') {
      super(message, 403);
    }
  }
  
  export class ConflictError extends AppError {
    constructor(message: string) {
      super(message, 409);
    }
  }
  
  // Prisma specific error
  export class DatabaseError extends AppError {
    constructor(message: string, public originalError?: Error) {
      super(message, 500);
    }
  }