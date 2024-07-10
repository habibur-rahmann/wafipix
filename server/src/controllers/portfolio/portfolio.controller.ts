import { Request, Response } from "express";
import { ApiError } from "../../lib/custom-api-error-class";
import {
  addPortfolioMedia,
  addRelatedPortfoliosToPortfolio,
  addRelatedServicesToPortfolio,
  createInitialPortfolio,
  deletePortfolio,
  removePortfolioMedia,
  removeRelatedPortfolioFromPortfolio,
  removeRelatedServiceFromPortfolio,
  updatePortfolioTexts,
} from "./portfolio-helper-functions";
import { asyncHandler } from "../../middlewares/async-handler";
import { cache, cacheKeys } from "../../lib/node-cache";
import { PortfolioModel } from "../../models/portfolio.model";
import { getPortfolioAggregation } from "./portfolio-aggregation";
import { getPortfolioAggregationFeatured } from "./get-portfolio-aggregation-featured";
import { getPortfoliosAggregationForCard } from "./get-portfolio-aggregation-for-card";
import { getPortfolioAggregationForRelatedPortfolios } from "./get-portfolio-aggregation-for-related-portfolios";
import { ObjectId } from "mongoose";
import { ServiceModel } from "../../models/service.model";
import { getServiceAggregationToGetServicesByIdsForCard } from "../service/service-aggregation-to-get-services-by-ids-for-card";
import shortId from "shortid";
import { bgWorker } from "../../lib/utils";
import { bg_works_update_portfolio_image } from "./bg-works/upload-portfolio-profile-image";

export const portfolioController = {
  getPortfolios: asyncHandler(async (req: Request, res: Response) => {
    const cacheKey = `portfolios_${JSON.stringify(req.query)}`;

    // return from cached
    const cachedPorfolios = cache.get(cacheKey);

    if (cachedPorfolios)
      return res
        .status(200)
        .json({ success: true, portfolios: cachedPorfolios });

    // find if cache is null
    const portfolios = await PortfolioModel.aggregate(
      getPortfolioAggregation(req)
    ).exec();

    res.status(200).json({ success: true, portfolios });

    // manage cache after response
    cacheKeys.storeKeys({
      nameOfKeys: cacheKeys.getAllPortfoliosKeysKey(),
      currentKey: cacheKey,
    });

    cache.set({ key: cacheKey, data: portfolios });
  }),

  getPortfolio: asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    if (!slug) throw new ApiError("Slug is required!", 404);

    const portfolio = await PortfolioModel.findOne({ slug }).exec();

    if (!portfolio) throw new ApiError("No portfolio found!", 404);

    res.status(200).json({ success: true, portfolio });
  }),

  getTexts: asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    if (!slug) throw new ApiError("Slug is required!", 404);

    const portfolio = (
      await PortfolioModel.aggregate([
        {
          $match: {
            slug,
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            short_description: 1,
            description: 1,
            featured: 1,
            active: 1,
          },
        },
      ]).exec()
    )[0];

    if (!portfolio) throw new ApiError("No portfolio found!", 404);

    res.status(200).json({ success: true, portfolio });
  }),
  getProfileImage: asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    if (!slug) throw new ApiError("Slug is required!", 404);

    const portfolio = (
      await PortfolioModel.aggregate([
        { $match: { slug } },
        {
          $lookup: {
            from: "media",
            localField: "profile_image",
            foreignField: "_id",
            as: "profile_image",
          },
        },
        {
          $addFields: {
            profile_image: {
              $arrayElemAt: ["$profile_image", 0],
            },
          },
        },
        {
          $project: {
            profile_image: 1,
          },
        },
      ])
    )[0];

    if (!portfolio) throw new ApiError("Portfolio not found!", 404);
    const profile_image = portfolio?.profile_image;

    res.status(200).json({ success: true, profile_image });
  }),

  getMedias: asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    if (!slug) throw new ApiError("Slug is required!", 404);

    const portfolio = (
      await PortfolioModel.aggregate([
        {
          $match: {
            slug,
          },
        },
        {
          $lookup: {
            from: "media",
            localField: "medias.media",
            foreignField: "_id",
            as: "temp_medias",
          },
        },
        {
          $addFields: {
            medias: {
              $map: {
                input: "$medias",
                as: "mediaItem",
                in: {
                  _id: "$$mediaItem._id",
                  view_size: "$$mediaItem.view_size",
                  media: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$temp_medias",
                          as: "tempMediaItem",
                          cond: {
                            $eq: ["$$mediaItem.media", "$$tempMediaItem._id"],
                          },
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            medias: 1,
          },
        },
      ]).exec()
    )[0];

    if (!portfolio) throw new ApiError("No portfolio found!", 404);

    res.status(200).json({ success: true, medias: portfolio.medias });
  }),

  getPortfoliosForCard: asyncHandler(async (req: Request, res: Response) => {
    const portfolios = await PortfolioModel.aggregate(
      getPortfoliosAggregationForCard()
    );

    res.status(200).json({ success: true, portfolios });
  }),

  getPortfoliosForCardAll: asyncHandler(async (req: Request, res: Response) => {
    const portfolios = await PortfolioModel.aggregate([
      {
        $match: {},
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "media",
          localField: "profile_image",
          foreignField: "_id",
          as: "profile_image",
        },
      },
      {
        $unwind: { path: "$profile_image", preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          image_url: "$profile_image.secure_url",
        },
      },
      {
        $project: { _id: 1, title: 1, slug: 1, image_url: 1 },
      },
    ]);

    res.status(200).json({ success: true, portfolios });
  }),

  getFeaturedPortfolios: asyncHandler(async (req: Request, res: Response) => {
    const featuredPortfolios = await PortfolioModel.aggregate(
      getPortfolioAggregationFeatured(req)
    );

    res.status(200).json({ success: true, featuredPortfolios });
  }),

  getRelatedServices: asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const isExist = await PortfolioModel.findOne({ slug });
    if (!isExist) throw new ApiError("Portfolio not found!", 404);

    const related_service_ids = isExist.related_services;
    if (!related_service_ids.length)
      return res.status(200).json({ success: true, related_services: [] });

    const related_services = await ServiceModel.aggregate(
      getServiceAggregationToGetServicesByIdsForCard({
        service_ids: related_service_ids as unknown as ObjectId[],
      })
    );
    res.status(200).json({ success: true, related_services });
  }),

  getRelatedPortfolios: asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const isExist = await PortfolioModel.findOne({ slug });
    if (!isExist) throw new ApiError("Portfolio not found!", 404);

    const related_portfolio_ids = isExist.related_portfolios;
    if (!related_portfolio_ids.length)
      return res.status(200).json({ success: true, related_portfolios: [] });

    const related_portfolios = await PortfolioModel.aggregate(
      getPortfolioAggregationForRelatedPortfolios({
        related_portfolio_ids: related_portfolio_ids as unknown as ObjectId[],
      })
    );
    res.status(200).json({ success: true, related_portfolios });
  }),

  createPortfolio: asyncHandler(async (req: Request, res: Response) => {
    const { title } = req.body;

    const portfolio = await createInitialPortfolio(title);

    if (!portfolio) throw new ApiError("Failed to create portfolio.", 404);

    res.status(201).json({ portfolio });
  }),

  updatePortfolio: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const { type } = req.query as { type: string };

    if (!id) throw new ApiError("Id is required.", 404);
    if (!type) throw new ApiError("Type is required.", 404);

    const isExist = await PortfolioModel.findById(id)
      .select(["title", "slug"])
      .exec();

    if (!isExist) throw new ApiError("Portfolio not found!", 404);

    let updatedPortfolio: any;

    switch (type) {
      case "texts":
        updatedPortfolio = await updatePortfolioTexts({
          id,
          title: req.body.title,
          description: req.body.description,
          short_description: req.body.short_description,
          featured: req.body.featured,
          active: req.body.active,
        });
        break;

      case "add_related_portfolios":
        updatedPortfolio = await addRelatedPortfoliosToPortfolio({
          id,
          related_portfolio_ids: req.body.related_portfolio_ids as string[],
        });
        break;

      case "remove_related_portfolio":
        updatedPortfolio = await removeRelatedPortfolioFromPortfolio({
          id,
          related_portfolio_id: req.body.related_portfolio_id as string,
        });
        break;

      case "add_related_services":
        updatedPortfolio = await addRelatedServicesToPortfolio({
          id,
          related_service_ids: req.body.related_service_ids as string[],
        });
        break;

      case "remove_related_service":
        updatedPortfolio = await removeRelatedServiceFromPortfolio({
          id,
          related_service_id: req.body.related_service_id as string,
        });
        break;

      default:
        throw new ApiError("Invalid field.", 404);
    }

    if (!updatedPortfolio)
      throw new ApiError("Failed to update portfolio.", 404);

    res.status(200).json({ success: true });

    // reset portfoio cache
    cache.portfolios.resetAllPortfolios();
  }),

  updateProfileImage: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const profile_image = req.file;

    if (!id) throw new ApiError("Portfolio id required!", 404);
    if (!profile_image) throw new ApiError("Profile image required!", 404);

    const isExist = await PortfolioModel.findById(id);

    if (!isExist) throw new ApiError("Portfolio not found!", 404);

    const jobId = shortId.generate();

    bgWorker(
      async () =>
        await bg_works_update_portfolio_image({
          portfolio_id: id,
          profile_image,
          jobId,
        }),
      200
    );

    res.status(200).json({ success: true, jobId });

    // reset portfolios cache
    cache.portfolios.resetAllPortfolios();
  }),

  updatePortfolioMedia: {
    add: asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      const { view_size } = req.body as {
        view_size: "full" | "half" | "quarter" | "three-fourth";
      };
      const { file } = req;

      const jobId = await addPortfolioMedia({
        id,
        media: file,
        view_size,
      });

      res.status(200).json({ success: true, jobId });

      // reset portfolios cache
      cache.portfolios.resetAllPortfolios();
    }),

    remove: asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      const { medias_item_id } = req.body as { medias_item_id: string };

      await removePortfolioMedia({
        id,
        medias_item_id,
      });

      res.status(200).json({ success: true });
    }),
  },

  deletePortfolio: asyncHandler(async (req: Request, res: Response) => {
    const deletedPortfolio = await deletePortfolio(req.params.id);

    if (!deletedPortfolio)
      throw new ApiError("Failed to delete portfolio.", 404);

    res.status(200).json({ portfolio: deletedPortfolio });

    // reset portfolios cache
    cache.portfolios.resetAllPortfolios();
  }),
};
