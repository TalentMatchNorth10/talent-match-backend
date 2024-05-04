import { NextFunction } from 'express';
import { AppError } from './types/error.interface';

const appError = (
  httpStatus: number,
  errMessage: string,
  next: NextFunction
) => {
  const error = new Error(errMessage) as AppError;
  error.statusCode = httpStatus;
  error.isOperational = true;
  next(error);
};

export default appError;
