import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";
import { io } from "../index";

import { Readable } from "stream";

import env from "dotenv";
env.config({ path: ".env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFileToCloudinary = ({
  file,
  folder,
  progress_event_name,
}: {
  file: Express.Multer.File | undefined;
  folder: string;
  progress_event_name: string;
}) => {
  if (!file) throw new Error("File is required.");

  return new Promise<UploadApiResponse | UploadApiErrorResponse>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as UploadApiResponse);
        }
      );

      let writeBytes = 0;
      let chunkSize = 100;
      const totalBytes = file.size;

      const readStream = new Readable();

      for (let i = 0; i < file.buffer.length; i = i + chunkSize) {
        readStream.push(file.buffer.subarray(i, i + chunkSize));
      }

      readStream.push(null);

      readStream.on("data", (chunk) => {
        writeBytes += chunk.length;
        const progress = Math.floor((writeBytes / totalBytes) * 100);
        
        io.emit(progress_event_name, { progress });
      });

      readStream.pipe(stream);
    }
  );
};

export const deleteFileFromCloudinary = async (public_id: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};
