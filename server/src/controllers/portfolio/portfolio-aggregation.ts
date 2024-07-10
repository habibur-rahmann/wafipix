import { Request } from "express";
interface PortfolioAggregationOptions {
  single?: boolean;
}
export const getPortfolioAggregation = (
  req: Request,
  options?: PortfolioAggregationOptions
) => {
  const {
    populate,
    portfolio_select,
    profile_select,
    media_select,
    match,
    match_id,
    match_field,
    match_value,
    limit,
    skip,
  } = req.query as {
    populate: string; // string,string,string
    portfolio_select: string; // string,string,string
    profile_select: string; // string,string,string
    media_select: string; // string,string,string
    match: string; // string,string,string
    match_field: string;
    match_id: string;
    match_value: string;
    limit: string;
    skip: string;
  };

  const populateFields = populate ? populate.split(",") : [];

  const portfolioSelectFields = portfolio_select
    ? portfolio_select.split(",")
    : [];

  const profileSelectFields = profile_select ? profile_select.split(",") : [];

  const mediaSelectFields = media_select ? media_select.split(",") : [];

  let aggregation: any[] = [];

  // match stage
  const matchStage: any = {};

  if (match_field && match_value) {
    matchStage[match_field] = match_value;
  }

  if (match_id) {
    const expr = {
      $eq: ["$_id", { $toObjectId: match_id }],
    };

    matchStage.$expr = expr;
  }

  aggregation.push({
    $match: matchStage,
  });

  // profile_image populate
  if (populateFields.includes("profile_image")) {
    aggregation.push({
      $lookup: {
        from: "media",
        localField: "profile_image",
        foreignField: "_id",
        as: "profile_image",
      },
    });

    aggregation.push({
      $unwind: {
        path: "$profile_image",
        preserveNullAndEmptyArrays: true, // Set this to true to include documents with empty arrays
      },
    });
  }

  // medias populate
  if (populateFields.includes("medias")) {
    aggregation.push({
      $lookup: {
        from: "media", // Replace with the actual collection name
        localField: "medias.media",
        foreignField: "_id",
        as: "tempMedias",
      },
    });

    // maping over medias and setTempmedias in medias.media with respect to _id,
    aggregation.push({
      $addFields: {
        medias: {
          $map: {
            input: "$medias",
            as: "mediaItem",
            in: {
              media: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$tempMedias",
                      as: "tempItem",
                      cond: { $eq: ["$$tempItem._id", "$$mediaItem.media"] },
                    },
                  },
                  0,
                ],
              },
              view_size: "$$mediaItem.view_size",
            },
          },
        },
      },
    });

    aggregation.push({
      $unset: "tempMedias",
    });
  }

  //related_portfolio populate
  if (populateFields.includes("related_portfolios")) {
    aggregation.push({
      $lookup: {
        from: "portfolios",
        localField: "related_portfolios",
        foreignField: "_id",
        as: "related_portfolios",
      },
    });
  }

  //related_service populate
  if (populateFields.includes("related_services")) {
    aggregation.push({
      $lookup: {
        from: "services",
        localField: "related_services",
        foreignField: "_id",
        as: "related_services",
      },
    });
  }

  // project pipe

  let projectStage: any = {};

  // portfolio select stage
  if (portfolio_select && portfolioSelectFields.length > 0) {
    portfolioSelectFields.forEach((field) => {
      if (field.length > 0) {
        projectStage[field] = 1;
      }
    });
  }

  // profile select stage
  if (profile_select && profileSelectFields.length > 0) {
    let profile_image: any = {};

    profileSelectFields.forEach((field) => {
      if (field.length > 0) {
        profile_image[field] = 1;
      }
    });

    if (Object.keys(profile_image).length > 0) {
      projectStage.profile_image = profile_image;
    }
  }

  // media select stage
  if (media_select && mediaSelectFields.length > 0) {
    let media_select: any = {
      media: {},
    };

    mediaSelectFields.forEach((field) => {
      if (field.length > 0) {
        media_select.media[field] = 1;
      }
    });

    if (Object.keys(media_select).length > 0) {
      projectStage.medias = media_select;
    }
  }

  if (Object.keys(projectStage).length > 0) {
    aggregation.push({
      $project: projectStage,
    });
  }

  if (parseInt(skip)) {
    aggregation.push({
      $skip: parseInt(skip),
    });
  }

  if (parseInt(limit)) {
    aggregation.push({
      $limit: parseInt(limit),
    });
  }

  // if single
  if (options?.single) {
    aggregation.push({
      $limit: 1,
    });
  }

  return aggregation;
};
