import { io } from "../../..";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../../../lib/cloudinary";
import { bgWorker } from "../../../lib/utils";
import { Media, MediaModel } from "../../../models/media.model";
import { PortfolioModel } from "../../../models/portfolio.model";

export const bg_works_update_portfolio_image = async ({
  portfolio_id,
  jobId,
  profile_image,
}: {
  portfolio_id: string;
  jobId: string;
  profile_image: Express.Multer.File;
}) => {
  // find portfolio & upload image together promise.all
  const portfolioPromise =
    PortfolioModel.findById(portfolio_id).populate("profile_image");

  const uplaodProfileImagePromise = uploadFileToCloudinary({
    file: profile_image,
    folder: process.env.CLOUDINARY_PORTFOLIO_PROFILE_IMAGE_FOLDER!,
    progress_event_name: `progress:${jobId}`,
  });

  const [portfolio, uploadedProfileImage] = await Promise.all([
    portfolioPromise,
    uplaodProfileImagePromise,
  ]);

  if (!portfolio) return io.emit(`status:${jobId}`, { status: "failed" });
  if (!uploadedProfileImage)
    return io.emit(`status:${jobId}`, { status: "failed" });

  // if portfolio has profile image already then remove old one and update with new ones data
  const existeProfileImage = portfolio?.profile_image as Media;

  if (existeProfileImage) {
    const oldImagePublicId = existeProfileImage?.public_id;

    const updated = await MediaModel.findByIdAndUpdate(existeProfileImage._id, {
      fileName: profile_image?.filename!,
      originalName: profile_image?.originalname!,
      size: profile_image?.size!,
      content_type: profile_image?.mimetype!,
      secure_url: uploadedProfileImage.secure_url,
      public_id: uploadedProfileImage.public_id,
      format: uploadedProfileImage.format,
      hieght: uploadedProfileImage.height,
      widht: uploadedProfileImage.width,
    });
    if (!updated) io.emit(`status:${jobId}`, { status: "failed" });
    if (oldImagePublicId)
      bgWorker(async () => {
        await deleteFileFromCloudinary(oldImagePublicId);
      }, 200);

    return io.emit(`status:${jobId}`, { status: "success" });
  }

  // if portfolio profile is empty then create new media and update

  // create a media
  const newMedia = await MediaModel.create({
    fileName: profile_image?.filename!,
    originalName: profile_image?.originalname!,
    size: profile_image?.size!,
    content_type: profile_image?.mimetype!,
    secure_url: uploadedProfileImage.secure_url,
    public_id: uploadedProfileImage.public_id,
    format: uploadedProfileImage.format,
    hieght: uploadedProfileImage.height,
    widht: uploadedProfileImage.width,
  });

  // add the media to the portfolio
  const updatedPortfolio = await PortfolioModel.findByIdAndUpdate(
    portfolio_id,
    {
      $set: { profile_image: newMedia },
    },
    { new: true }
  );

  if (!updatedPortfolio)
    return io.emit(`status:${jobId}`, { status: "failed" });
  return io.emit(`status:${jobId}`, { status: "success" });
};
