import { NextFunction, Response } from "express";
import { RequestWithUser } from "../../types/types";
import { asyncHandler } from "./async-handler";
import { UserModel } from "../models/user.model";
import { ApiError } from "../lib/custom-api-error-class";

export const takeUser = asyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userSub = req.userSub;
      const user = await UserModel.findOne({ sub: userSub }).exec();

      if (!user) throw new ApiError("User not found!", 404);
      req.user = user;

      next();
    } catch (error) {
      console.log({ errorFromTakeUserMiddleware: error });
      throw error;
    }
  }
);
