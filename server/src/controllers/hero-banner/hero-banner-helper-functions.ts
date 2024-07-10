import { ApiError } from "../../lib/custom-api-error-class";
import { HeroBannerModel } from "../../models/hero-banner.model";
import { PortfolioModel } from "../../models/portfolio.model";

interface bannerUpdateProps {
  id: string;
  config: {
    active: boolean;
    backgroundColor: string;
    headingTextColor: string;
    descriptionTextColor: string;
    linkTextColor: string;
    imageQuality: number;
  };
}

export const getAllHeroBanner = async () => {
  return await HeroBannerModel.find().populate({
    path: "portfolio",
    select: "title slug profile_image",
    populate: { path: "profile_image", select: "secure_url" },
  });
};

export const getHeroBanner = async (id: string) => {
  if (!id) throw new Error("Id is required to get a hero banner");
  const banner = await HeroBannerModel.findById(id).populate({
    path: "portfolio",
    select: "title slug profile_image",
    populate: { path: "profile_image", select: "secure_url" },
  });

  if (!banner) throw new ApiError("Hero banner not found", 404);

  return banner;
};

export const createHeroBanner = async (portfolio_id: string) => {
  if (!portfolio_id)
    throw new ApiError("Portfolio id is required to create a hero banner", 404);

  const isExist = await PortfolioModel.findById(portfolio_id);
  if (!isExist) throw new ApiError("Portfolio not found!", 400);

  const alreadyExist = await HeroBannerModel.findOne({
    portfolio: portfolio_id,
  });

  if (alreadyExist)
    throw new ApiError("Hero banner already exist for this portfolio", 400);

  const banner = await HeroBannerModel.create({
    portfolio: portfolio_id,
  });

  return {
    _id: banner._id,
    portfolio_id: portfolio_id,
    title: isExist.title,
    slug: isExist.slug,
  };
};

export const updateHeroBannerTexts = async ({
  id,
  config,
}: bannerUpdateProps) => {
  if (!id) throw new ApiError("Hero banner ID is required to update", 404);

  const banner = await HeroBannerModel.findById(id);

  if (!banner) throw new ApiError("Hero banner not found", 404);

  (banner.active = config?.active),
    (banner.config = {
      backgroundColor: config.backgroundColor,
      headingTextColor: config.headingTextColor,
      descriptionTextColor: config.descriptionTextColor,
      linkTextColor: config.linkTextColor,
      imageQuality: config.imageQuality,
    });

  return await banner.save();
};

export const removeHeroBanner = async (id: string) => {
  if (!id) throw new ApiError("Id is required to remove a hero banner", 404);

  const banner = await HeroBannerModel.findById(id);

  if (!banner) throw new ApiError("Hero banner not found", 404);

  return await HeroBannerModel.findByIdAndDelete(id).exec();
};
