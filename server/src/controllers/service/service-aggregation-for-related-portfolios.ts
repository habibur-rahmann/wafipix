import { Request } from "express";
import { ObjectId } from "mongoose";

export const getServiceAggregationForRelatedPortfolios = ({
  related_portfolio_ids,
}: {
  related_portfolio_ids: ObjectId[];
}) => {
  const aggregation: any[] = [
    {
      $match: {
        _id: { $in: related_portfolio_ids },
      },
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
      $unwind: "$profile_image",
    },
    {
      $addFields: {
        image_url: "$profile_image.secure_url",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
        image_url: 1,
      },
    },
  ];

  return aggregation;
};
