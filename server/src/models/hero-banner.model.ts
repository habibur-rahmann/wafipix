import mongoose from "mongoose";
import { Portfolio } from "./portfolio.model";

export interface HeroBanner extends mongoose.Document {
  portfolio: { type: Portfolio };
  active: boolean;
  config: {
    backgroundColor: string;
    headingTextColor: string;
    descriptionTextColor: string;
    linkTextColor: string;
    imageQuality: number;
  };
}

const HeroBannerSchema = new mongoose.Schema<HeroBanner>(
  {
    portfolio: { type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" },
    active: { type: Boolean, default: true },
    config: {
      backgroundColor: { type: String, default: "gray" },
      headingTextColor: { type: String, default: "black" },
      descriptionTextColor: { type: String, default: "black" },
      linkTextColor: { type: String, default: "blue" },
      imageQuality: { type: Number, default: 100 },
    },
  },
  {
    timestamps: true,
  }
);

export const HeroBannerModel = mongoose.model<HeroBanner>(
  "HeroBanner",
  HeroBannerSchema
);
