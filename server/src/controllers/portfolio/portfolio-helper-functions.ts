import { ApiError } from "../../lib/custom-api-error-class";
import {
  PortfolioModel,
  PortfolioPopulated,
} from "../../models/portfolio.model";
import { ServiceModel } from "../../models/service.model";
import { bgWorker, getSlug } from "../../lib/utils";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../../lib/cloudinary";
import { MediaModel } from "../../models/media.model";
import { PortfolioMediaModel } from "../../models/portfolio-media.model";
import { ObjectId } from "mongoose";
import shortId from "shortid";
import { io } from "../..";
import { bg_works_add_media } from "./bg-works/upload-portfolio-media";

// CREATE PORTFOLIO
export const createInitialPortfolio = async (title: string) => {
  if (!title) throw new ApiError("Title is Requiredddd.", 404);

  // isExist
  const isExist = await PortfolioModel.findOne({ title })
    .select([title])
    .exec();

  if (isExist) throw new ApiError("This name is exist.", 404);

  const slug = getSlug(title);

  // create
  const portfolio = await PortfolioModel.create({ title, slug: slug });

  return portfolio;
};

// UPDATE PORTFOLIO TITLE, DESCRIPTION & FEATURED
export const updatePortfolioTexts = async ({
  id,
  title,
  description,
  short_description,
  featured,
  active,
}: {
  id: string;
  title: string;
  description: string;
  short_description: string;
  featured: boolean;
  active: boolean;
}) => {
  if (!id) throw new ApiError("Id is required.", 404);

  if (!title) throw new ApiError("Title is required.", 404);

  const newData: any = {
    title,
    slug: getSlug(title),
    description,
    short_description,
    featured: featured || false,
    active: active || false,
  };

  const updatedPortfolio = await PortfolioModel.findByIdAndUpdate(id, newData, {
    new: true,
  }).exec();

  if (!updatedPortfolio) throw new ApiError("Portfolio update failed!", 404);

  return updatedPortfolio;
};

// ADD MEDIA
export const addPortfolioMedia = async ({
  id,
  media,
  view_size,
}: {
  id: string;
  media: Express.Multer.File | undefined;
  view_size: "full" | "half" | "quarter" | "three-fourth";
}) => {
  const view_sizes = ["full", "half", "quarter", "three-fourth"];

  if (!id) throw new ApiError("Id is required.", 404);

  if (!media) throw new ApiError("Media is required.", 404);

  // media must be video or image
  if (!media.mimetype.includes("image")) {
    if (!media.mimetype.includes("video"))
      throw new ApiError("Invalid media!", 404);
  }

  if (!view_sizes?.includes(view_size))
    throw new ApiError(
      "view_size must be 'full' or 'half' or 'quarter' or 'three-fourth'.",
      404
    );

  // is exist
  const portfolio = await PortfolioModel.findById(id).exec();

  if (!portfolio) throw new ApiError("Portfolio not found!", 404);

  // upload media file to cloudinary in bg
  // generate a jobId
  const jobId = shortId.generate();
  bgWorker(
    async () =>
      bg_works_add_media({
        portfolio_id: id,
        jobId,
        media: { file: media, view_size },
      }),
    100
  );
  return jobId;
};

// DELETE MEDIA
export const removePortfolioMedia = async ({
  id,
  medias_item_id,
}: {
  id: string;
  medias_item_id: string;
}) => {
  if (!id) throw new ApiError("Id is required.", 404);
  if (!medias_item_id) throw new ApiError("Medias item id is required.", 404);

  const portfolio = await PortfolioModel.findById(id).exec();

  if (!portfolio) throw new ApiError("Portfolio not found!", 404);

  const mediaItem = portfolio.medias.find(
    (item: any) => (item._id as ObjectId).toString() === medias_item_id
  );

  if (!mediaItem)
    throw new ApiError("No such Portfolio media item found!", 404);

  // remove media doc, cloudinary media.***

  const newPortfolioMedias = portfolio.medias.filter(
    (item: any) => (item._id as ObjectId).toString() !== medias_item_id
  );

  portfolio.medias = newPortfolioMedias;

  // delete portfolio media, delete media, delete cloudinary image,
  bgWorker(async () => {
    // get media
    const media = await MediaModel.findById(mediaItem.media).exec();

    if (!media?.public_id) return;

    const mediaPublicId = media?.public_id;
    // delete promises
    const deletePromises = [
      MediaModel.findByIdAndDelete(media?._id),
      deleteFileFromCloudinary(mediaPublicId),
    ];
    await Promise.all(deletePromises);
  }, 200);

  return await portfolio.save();
};

// DELETE PORTFOLIO
export const deletePortfolio = async (id: string) => {
  if (!id) throw new ApiError("Id is required.", 404);

  const isExist = (await PortfolioModel.findById(id)
    .populate(["profile_image"])
    .exec()) as PortfolioPopulated;

  if (!isExist) throw new ApiError("Portfolio not found!", 404);

  if (isExist.medias.length > 0)
    throw new ApiError("Please delete all media first!", 404);

  const deletedPortfolio = await PortfolioModel.findByIdAndDelete(id).exec();
  if (isExist?.profile_image) {
    bgWorker(async () => {
      await deleteFileFromCloudinary(isExist?.profile_image?.public_id);
    }, 2000);
  }

  return deletedPortfolio;
};

// ADD RELATED PORTFOLIO
export const addRelatedPortfoliosToPortfolio = async ({
  id,
  related_portfolio_ids,
}: {
  id: string;
  related_portfolio_ids: string[];
}) => {
  if (!id) throw new ApiError("Id is required!", 404);

  if (!related_portfolio_ids.length)
    throw new ApiError("Related portfolio id is required!", 404);

  const portfolioPromise = PortfolioModel.findById(id).exec();
  const addedPorfolioPromises = related_portfolio_ids.map((portfolio_id) => {
    return PortfolioModel.findById(portfolio_id).exec();
  });

  const [portfolio, ...addedPortfolios] = await Promise.all([
    portfolioPromise,
    ...addedPorfolioPromises,
  ]);

  if (!portfolio) throw new ApiError("Portfolio not found!", 404);
  if (addedPortfolios.includes(null))
    throw new ApiError("One or more portfolio not found", 404);

  addedPortfolios.map((related_portfolio) => {
    const isAdded = portfolio?.related_portfolios?.find(
      (item) =>
        (item._id as any).toString() ===
        (related_portfolio?._id as any).toString()
    );
    if (!isAdded)
      portfolio.related_portfolios.push(related_portfolio?._id as any);
  });

  return await portfolio.save();
};

// REMOVE RELATED PORTFOLIO
export const removeRelatedPortfolioFromPortfolio = async ({
  id,
  related_portfolio_id,
}: {
  id: string;
  related_portfolio_id: string;
}) => {
  if (!id) throw new ApiError("Id is required!", 404);
  if (!related_portfolio_id)
    throw new ApiError("Related portfolio id is required!", 404);

  const portfolio = await PortfolioModel.findById(id).exec();

  if (!portfolio) throw new ApiError("Portfolio not found!", 404);

  const isExist = portfolio.related_portfolios.find(
    (item) => item.toString() === related_portfolio_id
  );

  if (!isExist)
    throw new ApiError("No Such Id founds in related Portfolios!", 404);

  const updatedRelatedPortfolioIds = portfolio.related_portfolios.filter(
    (item) => item.toString() !== related_portfolio_id
  );

  // set the new related portfolios
  portfolio.related_portfolios = updatedRelatedPortfolioIds as any;

  return await portfolio.save();
};

// ADD RELATED SERVICE
export const addRelatedServicesToPortfolio = async ({
  id,
  related_service_ids,
}: {
  id: string;
  related_service_ids: string[];
}) => {
  if (!id) throw new ApiError("Id is required!", 404);

  if (!related_service_ids.length)
    throw new ApiError("Related service id is required!", 404);

  const portfolioPromise = PortfolioModel.findById(id).exec();
  const addedServicePromises = related_service_ids.map((service_id) => {
    return ServiceModel.findById(service_id).exec();
  });

  const [portfolio, ...addedServices] = await Promise.all([
    portfolioPromise,
    ...addedServicePromises,
  ]);

  if (!portfolio) throw new ApiError("Portfolio not found!", 404);
  if (addedServices.includes(null))
    throw new ApiError("One or more service not found", 404);

  addedServices.map((related_service) => {
    const isAdded = portfolio?.related_services?.find(
      (item) => item._id === related_service?._id
    );
    if (!isAdded) portfolio.related_services.push(related_service?._id as any);
  });

  return await portfolio.save();
};

// REMOVE RELATED SERVICE
export const removeRelatedServiceFromPortfolio = async ({
  id,
  related_service_id,
}: {
  id: string;
  related_service_id: string;
}) => {
  if (!id) throw new ApiError("Id is required!", 404);
  if (!related_service_id)
    throw new ApiError("Related service id is required!", 404);

  const portfolio = await PortfolioModel.findById(id).exec();

  if (!portfolio) throw new ApiError("Portfolio not found!", 404);

  const isExist = portfolio.related_services.find(
    (item) => item.toString() === related_service_id
  );

  if (!isExist)
    throw new ApiError("No Such Id founds in related services!", 404);

  const updatedRelatedServiceIds = portfolio.related_services.filter(
    (item) => item.toString() !== related_service_id
  );

  // set the new related services
  portfolio.related_services = updatedRelatedServiceIds as any;

  return await portfolio.save();
};
