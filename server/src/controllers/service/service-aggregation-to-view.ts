import { Request } from "express";

export const getServiceAggregationToView = (req: Request) => {
  const { slug } = req.params as { slug: string };
  const aggregation = [
    {
      $match: { active: true, slug },
    },

    {
      $lookup: {
        from: "services",
        localField: "related_services",
        foreignField: "_id",
        as: "related_services",
      },
    },

    {
      $addFields: {
        related_services: {
          $map: {
            input: "$related_services",
            as: "related_service",
            in: {
              _id: "$$related_service._id",
              title: "$$related_service.title",
              slug: "$$related_service.slug",
            },
          },
        },
      },
    },

    {
      $lookup: {
        from: "portfolios",
        localField: "related_portfolios",
        foreignField: "_id",
        as: "related_portfolios",
      },
    },
    {
      $addFields: {
        related_portfolios: {
          $map: {
            input: "$related_portfolios",
            as: "related_portfolio",
            in: {
              _id: "$$related_portfolio._id",
              title: "$$related_portfolio.title",
              slug: "$$related_portfolio.slug",
            },
          },
        },
      },
    },

    {
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
        short_description: 1,
        description: 1,
        active: 1,
        related_services: 1,
        related_portfolios: 1,
      },
    },
  ];

  return aggregation;
};
