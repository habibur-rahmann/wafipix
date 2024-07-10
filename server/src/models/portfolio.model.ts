import mongoose from "mongoose";
import { Service } from "./service.model";
import { Media } from "./media.model";

export interface Portfolio extends mongoose.Document {
  title: string;
  description: string;
  short_description: string;
  profile_image: mongoose.Types.ObjectId[] | Media;
  slug: string;
  medias: {
    media: mongoose.Types.ObjectId | Media;
    view_size: "full" | "half" | "quarter" | "three-fourth";
  }[];
  featured: boolean;
  active: boolean;
  related_services: mongoose.Types.ObjectId[] | Service[];
  related_portfolios: mongoose.Types.ObjectId[] | Portfolio[];
}

export interface PortfolioPopulated extends Portfolio {
  related_services: Service[];
  related_portfolios: Portfolio[];
  profile_image: Media;
  medias: {
    _id: string;
    media: Media;
    view_size: "full" | "half" | "quarter" | "three-fourth";
  }[];
}

const PortfolioSchema = new mongoose.Schema<Portfolio>(
  {
    title: { type: String, required: true, unique: true },
    description: String,
    short_description: String,
    profile_image: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
    slug: { type: String, required: true },
    medias: [
      {
        media: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
        view_size: {
          type: String,
          enum: ["full", "half", "quarter", "three-fourth"],
          required: true,
        },
      },
    ],
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    related_portfolios: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" },
    ],
    related_services: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    ],
  },
  {
    timestamps: true,
  }
);

export const PortfolioModel = mongoose.model<Portfolio>(
  "Portfolio",
  PortfolioSchema
);
