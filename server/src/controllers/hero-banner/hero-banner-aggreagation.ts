import { Request } from "express";
import { ApiError } from "../../lib/custom-api-error-class";

interface PropOptions {
  single?: boolean;
}

interface ReqQuery {
  populate?: string;
  portfolio_populate?: string;
  select?: string;
  portfolio_select?: string;
  portfolio_profile_image_select?: string;
  match_id?: string;
  match_field?: string;
  match_value?: string;
}

export const heroBannerAggregation = (
  req: Request<{}, {}, {}, ReqQuery>,
  options?: PropOptions
) => {
  // query
  const {
    populate,
    select,
    portfolio_select,
    portfolio_profile_image_select,
    match_field,
    match_id,
    match_value,
  } = req.query;

  const populateFields = populate ? populate.split(",") : [];

  const selectFields = select ? select.split(",") : [];

  const portfolioSelectFields = portfolio_select
    ? portfolio_select?.split(",")
    : [];

  const portfolioProfileImageSelectFields = portfolio_profile_image_select
    ? portfolio_profile_image_select.split(",")
    : [];

  const aggregation: any[] = [];

  aggregation.push({
    $match: {},
  });

  if (match_id) {
    aggregation.push({
      $match: {
        $expr: {
          $eq: ["$_id", { $toObjectId: match_id }],
        },
      },
    });
  }

  if (match_field && match_value) {
    aggregation.push({
      $match: {
        match_field: match_value,
      },
    });
  }

  // populiate portfolio
  if (populateFields.includes("portfolio")) {
    aggregation.push({
      $lookup: {
        from: "portfolios",
        localField: "portfolio",
        foreignField: "_id",
        as: "portfolio",
      },
    });

    aggregation.push({
      $unwind: "$portfolio",
    });
  }

  // populate portfolio Profile
  if (populateFields.includes("portfolio_profile_image")) {
    aggregation.push({
      $lookup: {
        from: "media",
        localField: "portfolio.profile_image",
        foreignField: "_id",
        as: "portfolio.profile_image",
      },
    });
  }

  // project stage

  const projectStage: any = {};

  // select fields
  if (select && selectFields.length > 0) {
    selectFields.forEach((field) => {
      if (field.length > 0) {
        projectStage[field] = 1;
      }
    });
  }
  
  // portfolio select fields
  if (portfolioSelectFields.length > 0) {
    portfolioSelectFields.forEach((field) => {
      if (field.length > 0) {
        projectStage[`portfolio.${field}`] = 1;
      }
    });
  }
  
  // portfolio profile image select fields
  if (portfolioProfileImageSelectFields.length > 0) {
    portfolioProfileImageSelectFields.forEach((field) => {
      if (field.length > 0) {
        projectStage[`portfolio.profile_image.${field}`] = 1;
      }
    });
  }
  
  if (Object.keys(projectStage).length > 0) {
    aggregation.push({
      $project: projectStage,
    });
  }

  return aggregation;
};
