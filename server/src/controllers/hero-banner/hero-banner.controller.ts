import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { cache, cacheKeys } from "../../lib/node-cache";
import {
  createHeroBanner,
  getHeroBanner,
  removeHeroBanner,
  updateHeroBannerTexts,
} from "./hero-banner-helper-functions";
import { HeroBannerModel } from "../../models/hero-banner.model";
import { heroBannerAggregation } from "./hero-banner-aggreagation";
import { heroBannerToViewAggregation } from "./hero-banner-to-view-aggregation";
import { Types } from "mongoose";

export const heroBannerController = {
  getHeroBanners: asyncHandler(async (req: Request, res: Response) => {
    // const banners = await getAllHeroBanner();
    const banners = await HeroBannerModel.aggregate(heroBannerAggregation(req));

    res.status(200).json({ success: true, banners });
  }),

  getHeroBannersToView: asyncHandler(async (req: Request, res: Response) => {
    const banners = await HeroBannerModel.aggregate(
      heroBannerToViewAggregation(req)
    );

    res.status(200).json({ success: true, banners });
  }),

  getHeroBannersToViewCard: asyncHandler(
    async (req: Request, res: Response) => {
      const banners = await HeroBannerModel.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "portfolios",
            localField: "portfolio",
            foreignField: "_id",
            as: "portfolio",
          },
        },
        { $unwind: "$portfolio" },
        {
          $addFields: {
            portfolio_id: "$portfolio._id",
            title: "$portfolio.title",
            slug: "$portfolio.slug",
          },
        },
        {
          $project: {
            _id: 1,
            portfolio_id: 1,
            title: 1,
            slug: 1,
            active: 1,
          },
        },
      ]);

      res.status(200).json({ success: true, banners });
    }
  ),

  getHeroBannerConfig: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const config = (
      await HeroBannerModel.aggregate([
        { $match: { _id: new Types.ObjectId(id) } },

        {
          $addFields: {
            backgroundColor: "$config.backgroundColor",
            headingTextColor: "$config.headingTextColor",
            descriptionTextColor: "$config.descriptionTextColor",
            linkTextColor: "$config.linkTextColor",
            imageQuality: "$config.imageQuality",
          },
        },
        {
          $project: {
            _id: 1,
            backgroundColor: 1,
            headingTextColor: 1,
            descriptionTextColor: 1,
            linkTextColor: 1,
            imageQuality: 1,
            active: 1,
          },
        },
      ])
    )[0];

    res.status(200).json({ success: true, config });
  }),

  getHeroBanner: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const cacheBanner = cache.get(cacheKeys.getSingleHeroBannerKey(id));
    if (cacheBanner) {
      return res.status(200).json({ success: true, banner: cacheBanner });
    }
    const banner = await getHeroBanner(id);

    res.status(200).json({ success: true, banner });

    await cache.heroBanner.refreshHeroBanner(id);
  }),

  createHeroBanner: asyncHandler(async (req: Request, res: Response) => {
    const { portfolio_id } = req.body;
    const banner = await createHeroBanner(portfolio_id);

    res.status(201).json({ success: true, banner });
  }),

  updateHeroBanner: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {  config } = req.body;

    const banner = await updateHeroBannerTexts({ id, config });

    res.status(200).json({ success: true, banner });
  }),

  removeHeroBanner: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const banner = await removeHeroBanner(id);

    res.status(200).json({ success: true, banner });
  }),
};
