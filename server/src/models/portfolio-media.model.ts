import mongoose from "mongoose";
import { Media } from "./media.model";

export interface PortfolioMedia extends mongoose.Document {
  media: mongoose.Types.ObjectId | Media;
  viewSize: "full" | "half" | "quarter" | "three-fourth";
}

export interface PortfolioMediaPopulated extends PortfolioMedia {
  media: Media;
  viewSize: "full" | "half" | "quarter" | "three-fourth";
}

const PortfolioMediaSchema = new mongoose.Schema<PortfolioMedia>(
  {
    media: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
    viewSize: {
      type: String,
      enum: ["full", "half", "quarter", "three-fourth"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PortfolioMediaModel = mongoose.model<PortfolioMedia>(
  "PortfolioMedia",
  PortfolioMediaSchema
);
