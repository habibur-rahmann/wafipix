import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { UserModel } from "../../models/user.model";
import { ApiError } from "../../lib/custom-api-error-class";

import JWT from "jsonwebtoken";

export const authControllers = {
  googleUser: asyncHandler(async (req: Request, res: Response) => {
    const { sub, email, name, picture, email_verified } = req.body;

    if (!email) throw new ApiError("Email is required!", 404);

    let isExist = await UserModel.findOne({ email });

    if (!isExist) {
      isExist = await UserModel.create({
        sub,
        email,
        name,
        picture,
        email_verified,
      });
    }

    if (!isExist) throw new ApiError("Failed to create user", 404);

    const token = JWT.sign({ sub, email, name }, process.env.JWT_SECRET!, {
      issuer: "wafipix",
      expiresIn: "7d",
      algorithm: "HS256",
      jwtid: sub,
    });

    res.status(200).json({ token, role: isExist.role });
  }),
};
