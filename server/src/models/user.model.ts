import mongoose, { Schema } from "mongoose";
import { Review } from "./review.model";

export interface User extends mongoose.Document {
  sub: string;
  name: string;
  picture: string;
  email: string;
  email_verified?: boolean;
  phone?: string;
  reviews: mongoose.Types.ObjectId | Review[];
  role: "USER" | "ADMIN" | "MODERATOR";
  // will be add many user things...
}

export interface UserPopulated extends User {
  reviews: Review[];
}

const UserSchema = new mongoose.Schema<User>(
  {
    sub: { type: String, required: true },
    name: { type: String },
    picture: String,
    email: { type: String, required: true },
    email_verified: { type: Boolean, default: false },
    phone: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    role: {
      type: String,
      enum: ["USER", "ADMIN", "MODERATOR"],
      default: "USER",
    },
    // will be add many user things...
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<User>("User", UserSchema);
