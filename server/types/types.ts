import { Request } from "express";
import { User } from "../src/models/user.model";

export interface RequestWithUser extends Request {
  user: User | undefined | null;
  userSub: string | undefined | null;
}
