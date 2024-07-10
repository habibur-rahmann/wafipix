import { Request } from "express";

export const heroBannerToViewAggregation = (req: Request) => {
  const aggregation = [
    { $match: { active: true } },
    {
      $lookup: {
        from: "portfolios",
        localField: "portfolio",
        foreignField: "_id",
        as: "portfolio",
      },
    },
    {
      $lookup: {
        from: "media",
        localField: "portfolio.profile_image",
        foreignField: "_id",
        as: "profile_image",
      },
    },
    { $unwind: "$portfolio" },
    { $unwind: "$profile_image" },
    {
      $addFields: {
        title: "$portfolio.title",
        slug: "$portfolio.slug",
        short_description: "$portfolio.short_description",
        image_url: "$profile_image.secure_url",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
        short_description: 1,
        active: 1,
        config: 1,
        image_url: 1,
      },
    },
  ];

  return aggregation;
};
