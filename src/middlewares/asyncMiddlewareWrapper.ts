/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from 'express';

const asyncMiddlewareWrapper =
  (middleware: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await middleware(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default asyncMiddlewareWrapper;
