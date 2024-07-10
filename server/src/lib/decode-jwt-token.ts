import JWT, { JwtPayload } from "jsonwebtoken";

export const decodeJWT = (token: string) => {
  return JWT.verify(token, process.env.JWT_SECRET!) as JwtPayload;
};
