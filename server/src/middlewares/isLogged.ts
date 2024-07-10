import { NextFunction, Response } from "express";
import { decodeJWT } from "../lib/decode-jwt-token";
import { ApiError } from "../lib/custom-api-error-class";
import { RequestWithUser } from "../../types/types";

export const isLogged = (
  req: RequestWithUser | any,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) throw new ApiError("token not found!", 404);
  const decode = decodeJWT(accessToken);

  if (!decode) throw new ApiError("Unauthorized", 401);

  req.userSub = decode.sub;

  next();
};
