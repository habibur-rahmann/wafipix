import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../../types/types";

export const asyncHandler = (
  fn: (
    req: Request | RequestWithUser| any,
    res: Response,
    next: NextFunction
  ) => Promise<any>
) => {
  return async (
    req: Request | RequestWithUser| any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); // Pass the error to the next middleware (errorHandler)
    }
  };
};
