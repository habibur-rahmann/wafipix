import mongoose from "mongoose";
import { ApiError } from "./custom-api-error-class";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const MONGODB_URL = process.env.MONGODB_URL!;

export const connectMongoose = async () => {
  try {
    if (!MONGODB_URL) {
      throw new Error("MONGODB_URL not found");
    }

    return await mongoose.connect(MONGODB_URL);
  } catch (error: any) {
    throw new ApiError("Failed to connect to MongoDB" + error.message, 500);
  }
};
