import { NextFunction, Request, Response } from 'express';
import AppError from './AppError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Internal Server error';

  if (error instanceof AppError) {
    statusCode = error.code;
    message = error.getErrorData().message;
  }

  res.status(statusCode).send({ message });
};

export default errorHandler;
