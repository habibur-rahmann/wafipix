import mongoose from "mongoose";
import { User } from "./user.model";

export interface ReviewComment extends mongoose.Document {
  user: mongoose.Types.ObjectId | User;
  text: string;
}

export interface ReviewCommentPopulated extends ReviewComment {
  user: User;
}

const ReviewCommentSchema = new mongoose.Schema<ReviewComment>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const ReviewCommentModel = mongoose.model<ReviewComment>("ReviewComment", ReviewCommentSchema);
