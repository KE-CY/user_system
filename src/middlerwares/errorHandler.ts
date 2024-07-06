import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof CustomError) {
      res.status(err.statusCode).json({
          message: err.message
      });
  } else {
      res.status(500).json({
          message: 'Internal Server Error'
      });
  }
}
