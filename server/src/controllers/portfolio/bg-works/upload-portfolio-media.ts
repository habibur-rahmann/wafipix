import { io } from "../../..";
import { uploadFileToCloudinary } from "../../../lib/cloudinary";
import { MediaModel } from "../../../models/media.model";
import { PortfolioModel } from "../../../models/portfolio.model";

export const bg_works_add_media = async ({
  portfolio_id,
  jobId,
  media,
}: {
  portfolio_id: string;
  jobId: string;
  media: { file: Express.Multer.File; view_size: string };
}) => {
  let folderPath: string;

  media.file.mimetype.includes("image")
    ? (folderPath = process.env.CLOUDINARY_PORTFOLIO_MEDIA_IMAGE_FOLDER!)
    : (folderPath = process.env.CLOUDINARY_PORTFOLIO_MEDIA_VIDEO_FOLDER!);

  const uploadedMedia = await uploadFileToCloudinary({
    file: media.file,
    folder: folderPath,
    progress_event_name: `progress:${jobId}`,
  });

  if (!uploadedMedia) io.emit(`status:${jobId}`, { status: "failed" });

  // create a media
  const newMedia = await MediaModel.create({
    fileName: media.file.filename,
    originalName: media.file.originalname,
    size: media.file.size,
    content_type: media.file.mimetype,
    secure_url: uploadedMedia.secure_url,
    public_id: uploadedMedia.public_id,
    hieght: uploadedMedia.height,
    widht: uploadedMedia.width,
  });

  const mediaData = {
    media: newMedia,
    view_size: media.view_size,
  };

  // add the media to the portfolio
  const updatedPortfolio = await PortfolioModel.findByIdAndUpdate(
    portfolio_id,
    {
      $push: {
        medias: mediaData,
      },
    },
    { new: true }
  );
  io.emit(`status:${jobId}`, { status: "success" });
};
