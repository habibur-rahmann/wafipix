import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { UserModel } from "../../models/user.model";
import { ApiError } from "../../lib/custom-api-error-class";

export const userController = {
  saveUser: asyncHandler(async (req: Request, res: Response) => {
    const { user } = req.body as {
      user: {
        given_name: string;
        family_name: string;
        email: string;
        sub: string;
        picture: string;
      };
    };

    if (!user) throw new ApiError("User not found", 404);

    const isExist = await UserModel.findOne({ sub: user.sub });

    if (isExist) return res.status(200);

    // save user to database
    const savedUser = await UserModel.create({
      sub: user?.sub,
      name: `${user?.given_name} ${user?.family_name}`,
      email: user?.email,
      picture: user?.picture,
    });

    res.status(201).json({ user: savedUser });
  }),
};
