import mongoose from "mongoose";
import { Media } from "./portfolio.model";

export interface ReviewSocial extends mongoose.Document {
  screen_shot: mongoose.Types.ObjectId | Media;
}

export interface ReviewSocialPopulated extends ReviewSocial {
  screen_shot: Media;
}

const ReviewSocialSchema = new mongoose.Schema<ReviewSocial>(
  {
    screen_shot: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export const ReviewSocialModel = mongoose.model<ReviewSocial>(
  "ReviewSocial",
  ReviewSocialSchema
);
