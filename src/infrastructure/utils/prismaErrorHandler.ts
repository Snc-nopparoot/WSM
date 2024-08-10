import { PrismaClient } from '@prisma/client';
import { DatabaseError, ConflictError, NotFoundError } from './errors';

export const handlePrismaError = (error: any): never => {
  if (error instanceof PrismaClient.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        throw new ConflictError('Unique constraint violation');
      case 'P2025':
        throw new NotFoundError('Record not found');
      default:
        throw new DatabaseError(`Database error: ${error.message}`, error);
    }
  }
  if (error instanceof PrismaClient.PrismaClientValidationError) {
    throw new DatabaseError('Database validation error', error);
  }
  throw new DatabaseError('Unexpected database error', error as Error);
};