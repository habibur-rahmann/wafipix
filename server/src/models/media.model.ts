import mongoose from "mongoose";

export interface Media extends mongoose.Document {
  fileName: string;
  originalName: string;
  size: number;
  content_type: string;
  secure_url: string;
  public_id: string;
  hieght?: number;
  width?: number;
  format?: string;
}

export const MediaSchema = new mongoose.Schema<Media>({
  fileName: String,
  originalName: String,
  size: Number,
  content_type: String,
  secure_url: String,
  public_id: String,
  hieght: Number,
  width: Number,
  format: String,
},{timestamps: true});

export const MediaModel = mongoose.model<Media>("Media", MediaSchema);
