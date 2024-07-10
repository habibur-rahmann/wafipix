import { Request } from "express";
interface ServiceAggregationOptions {
  single?: boolean;
}
export const getServiceAggregation = (
  req: Request,
  options?: ServiceAggregationOptions
) => {
  const {
    populate,
    select,
    match,
    match_id,
    match_field,
    match_value,
    limit,
    skip,
  } = req.query as {
    populate: string; // string,string,string
    select: string; // string,string,string
    match: string; // string,string,string
    match_field: string;
    match_id: string;
    match_value: string;
    limit: string;
    skip: string;
  };

  const populateFields = populate ? populate.split(",") : [];
  const selectFields = select ? select.split(",") : [];

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

  // select stage
  if (select && selectFields.length > 0) {
    selectFields.forEach((field) => {
      if (field.length > 0) {
        projectStage[field] = 1;
      }
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

  if (Object.keys(projectStage).length > 0) {
    aggregation.push({
      $project: projectStage,
    });
  }

  return aggregation;
};
