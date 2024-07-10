import mongoose from "mongoose";
import { Portfolio } from "./portfolio.model";

export interface Service extends mongoose.Document {
  title: string;
  short_description: string;
  description: string;
  slug: string;
  active: boolean;
  featured: boolean;
  related_services: mongoose.Types.ObjectId[] | Service[];
  related_portfolios: mongoose.Types.ObjectId[] | Portfolio[];
}

export interface ServicePopulated extends Service {
  related_services: Service[];
  related_portfolios: Portfolio[];
}

const ServiceSchema = new mongoose.Schema<Service>(
  {
    title: { type: String, required: true },
    short_description: String,
    description: String,
    slug: { type: String, required: true },
    active: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
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

export const ServiceModel = mongoose.model<Service>("Service", ServiceSchema);
