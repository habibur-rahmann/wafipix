import { NextFunction, Response } from "express";
import { RequestWithUser } from "../../types/types";
import { asyncHandler } from "./async-handler";
import { UserModel } from "../models/user.model";
import { ApiError } from "../lib/custom-api-error-class";

export const adminRoute = asyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userSub = req.userSub;

      const isExist = await UserModel.findOne({ sub: userSub }).exec();

      if (!isExist) throw new ApiError("User not found!", 404);

      const isAdmin = process.env.ADMIN_MAILS?.includes(isExist?.email);

      if (!isAdmin) throw new ApiError(`This is reserve for ADMIN`, 404);

      req.user = { ...isExist.toObject(), role: "ADMIN" } as any;

      next();
    } catch (error) {
      next(error);
    }
  }
);
