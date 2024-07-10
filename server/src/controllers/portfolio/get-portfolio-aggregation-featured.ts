import { Request } from "express";

export const getPortfolioAggregationFeatured = (req: Request) => {
  const aggregation : any = [
    { $match: { featured: true, active: true } },
    {
      $lookup: {
        from: "media",
        localField: "profile_image",
        foreignField: "_id",
        as: "profile_image",
      },
    },
    { $unwind: "$profile_image" },
    {
      $addFields: {
        image_url: "$profile_image.secure_url",
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
        active: 1,
        featured: 1,
        image_url: 1,
      },
    },
  ];

  return aggregation;
};
