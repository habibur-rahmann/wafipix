import { NextFunction, Request, Response } from "express";
import { ApiError } from "./custom-api-error-class";
import { MongooseError } from "mongoose";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("error stack", err.stack);

  if (err instanceof MongooseError) {
    if ((err as any).code === 11000) {
      return res
        .status(400)
        .json({ message: "This name is exist.", statusCode: 400 });
    } else if ((err as any).name === "ValidationError") {
      return res.status(400).json({ message: err.message, statusCode: 400 });
    } else if ((err as any).name === "CastError") {
      return res.status(400).json({ message: "Invalid id", statusCode: 400 });
    } else {
      return res.status(400).json({ message: err.message, statusCode: 400 });
    }
  } else if (err instanceof ApiError) {
    console.log({ ApirError: err });
    return res
      .status(err.statusCode)
      .json({
        success: false,
        message: err.message,
        statusCode: err.statusCode,
      });
  } else if (err instanceof MongooseError) {
    console.log({ MongooseError: err });
    return res
      .status(400)
      .json({ success: false, message: err.message, statusCode: 400 });
  } else {
    console.log({ Error: err });
    return res
      .status(err.statusCode || 500)
      .json({
        success: false,
        message: err.message || "internal server error",
      });
  }
};
