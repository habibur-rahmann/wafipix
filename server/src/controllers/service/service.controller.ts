import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { ApiError } from "../../lib/custom-api-error-class";
import {
  addRelatedPortfoliosToService,
  addRelatedServicesToService,
  createInitialService,
  removeRelatedPortfolioFromService,
  removeRelatedServiceFromService,
  removeService,
  updateServiceTexts,
} from "./service-helper-function";
import { ServiceModel } from "../../models/service.model";
import { getServiceAggregation } from "./service-aggregation";
import { getServiceAggregationToView } from "./service-aggregation-to-view";
import { getServiceAggregationToCardView } from "./service-aggregation-to-card-view";
import { ObjectId } from "mongoose";
import { getServiceAggregationForRelatedPortfolios } from "./service-aggregation-for-related-portfolios";
import { PortfolioModel } from "../../models/portfolio.model";
import { getServiceAggregationTexts } from "./service-aggregation-texts";
import { getServiceAggregationForRelatedServices } from "./service-aggregation-for-related-services";

export const serviceController = {
  getServices: asyncHandler(async (req: Request, res: Response) => {

    // find if cache is null
    const services = await ServiceModel.aggregate(
      getServiceAggregation(req)
    ).exec();

    res.status(200).json({ success: true, services });

  }),

  getService: asyncHandler(async (req: Request, res: Response) => {
    const query = req.query;
    const queryKeys = Object.keys(query);
    const contains =
      queryKeys.includes("match_id") ||
      (queryKeys.includes("match_field") && queryKeys.includes("match_value"));

    if (!contains)
      throw new ApiError(
        "Need match_id or match_field, match_value as query",
        404
      );

    const service = (
      await ServiceModel.aggregate(
        getServiceAggregation(req, { single: true })
      ).exec()
    )[0];

    if (!service) throw new ApiError("Service not found!", 404);

    res.status(200).json({ success: true, service });

  }),

  getServiceToView: asyncHandler(async (req: Request, res: Response) => {
    const service = (
      await ServiceModel.aggregate(getServiceAggregationToView(req))
    )[0];

    res.status(200).json({ success: true, service });
  }),

  getServiceTexts: asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params as { slug: string };

    const service = (
      await ServiceModel.aggregate(getServiceAggregationTexts(slug))
    )[0];

    res.status(200).json({ success: true, service });
  }),

  getServiceToCardView: asyncHandler(async (req: Request, res: Response) => {
    const services = await ServiceModel.aggregate(
      getServiceAggregationToCardView()
    );

    res.status(200).json({ success: true, services });
  }),

  getrelatedPortfolios: asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const isExist = await ServiceModel.findOne({ slug });
    if (!isExist) throw new ApiError("Service not found!", 404);

    const related_portfolio_ids = isExist.related_portfolios;
    if (!related_portfolio_ids.length)
      return res.status(200).json({ success: true, related_portfolios: [] });

    const related_portfolios = await PortfolioModel.aggregate(
      getServiceAggregationForRelatedPortfolios({
        related_portfolio_ids: related_portfolio_ids as unknown as ObjectId[],
      })
    );
    res.status(200).json({ success: true, related_portfolios });
  }),

  getrelatedServices: asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const isExist = await ServiceModel.findOne({ slug });
    if (!isExist) throw new ApiError("Service not found!", 404);

    const related_services_ids = isExist.related_services;
    if (!related_services_ids.length)
      return res.status(200).json({ success: true, related_services: [] });

    const related_services = await ServiceModel.aggregate(
      getServiceAggregationForRelatedServices({
        related_service_ids: related_services_ids as unknown as ObjectId[],
      })
    );
    res.status(200).json({ success: true, related_services });
  }),

  createService: asyncHandler(async (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title) throw new ApiError("Title is Required.", 404);

    const service = await createInitialService(title);

    res.status(201).json({ success: true, service });
  }),

  updateService: asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const { type } = req.query;
    const { title, short_description, description, active, featured } =
      req.body;

    if (!slug) throw new ApiError("Service slug is required.", 404);
    if (!type) throw new ApiError("Type is required.", 404);

    const isExist = await ServiceModel.findOne({ slug })
      .select(["slug"])
      .exec();

    if (!isExist) throw new ApiError("Service not found!", 404);

    let updatedservice: any;
    
    switch (type) {
      case "texts":
        updatedservice = await updateServiceTexts({
          id: isExist._id as string,
          title,
          short_description,
          description,
          active,
          featured,
        });
        break;

      case "add_related_services":
        updatedservice = await addRelatedServicesToService({
          id: isExist._id as string,
          related_service_ids: req.body.related_service_ids,
        });
        break;

      case "remove_related_service":
        updatedservice = await removeRelatedServiceFromService({
          id: isExist._id as string,
          related_service_id: req.body.related_service_id,
        });
        break;

      case "add_related_portfolios":
        updatedservice = await addRelatedPortfoliosToService({
          id: isExist._id as string,
          related_portfolio_ids: req.body.related_portfolio_ids,
        });
        break;

      case "remove_related_portfolio":
        updatedservice = await removeRelatedPortfolioFromService({
          id: isExist._id as string,
          related_portfolio_id: req.body.related_portfolio_id,
        });
        break;

      default:
        throw new ApiError("Invalid type", 404);
    }

    if (!updatedservice) throw new ApiError("Service update failed!", 404);

    res.status(200).json({ success: true, service: updatedservice });

  }),

  deleteService: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedService = await removeService(id);

    if (!deletedService) throw new ApiError("Service not found!", 404);

    res.status(200).json({ success: true, service: deletedService });
  }),
};
