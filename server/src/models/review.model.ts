import mongoose from "mongoose";
import { User } from "./user.model";
import { ReviewComment } from "./review-comment.model";

export interface Review extends mongoose.Document {
  user: mongoose.Types.ObjectId | User;
  star: number;
  text: string;
  comment: mongoose.Types.ObjectId | ReviewComment;
  featured: boolean;
  active: boolean;
}

export interface ReviewPopulated extends Review {
  user: User;
  comment: ReviewComment;
}

const ReviewSchema = new mongoose.Schema<Review>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    star: { type: Number, required: true },
    text: { type: String, required: true },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "ReviewComment" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const ReviewModel = mongoose.model<Review>("Review", ReviewSchema);
