import { Request, Response, NextFunction } from 'express';
import { AppError } from 'infrastructure/utils/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  // Handle other types of errors
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};